import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { knowledgeBase } from './knowledge'

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // 10 requests per minute
const MAX_MESSAGE_LENGTH = 1000 // characters
const MAX_CONVERSATION_DEPTH = 20 // total messages
const MAX_HISTORY_SENT = 10 // only send last 10 messages to API

// System prompt with strict restrictions
const SYSTEM_PROMPT = `You are an AI assistant on Matt Kikuchi's personal website. Your ONLY purpose is to answer questions about Matt Kikuchi based on the knowledge base provided below.

STRICT RULES:
1. ONLY answer questions about Matt Kikuchi - his experience, skills, projects, interests, and background
2. If asked about anything unrelated to Matt (e.g., general coding questions, other people, current events), politely redirect: "I'm here to share information about Matt Kikuchi. Ask me about his experience, projects, or background!"
3. If you don't know something about Matt, say "I don't have that information about Matt, but you can reach out to him directly at [contact info]"
4. Be conversational, friendly, and professional
5. Keep responses concise (2-4 sentences unless more detail is requested)
6. Never make up information - only use what's in the knowledge base
7. Don't provide advice or opinions - just share facts about Matt
8. When referencing websites, profiles, or projects, include the full URLs from the knowledge base (they will be automatically converted to clickable links)

FORMATTING:
- Use markdown formatting in your responses to enhance readability
- Use **bold** for emphasis on key terms, company names, or technologies
- Use bullet points (- or *) for lists of items
- Use inline code backticks for technology names (\`React\`, \`TypeScript\`, etc.)
- Use [text](url) format for links
- You may use emojis SPARINGLY (1-2 max per response) to add personality, but don't overdo it:
  - ✅ Acceptable: Career milestones (🚀), achievements (⭐), technologies (💻), contact (📧)
  - ❌ Avoid: Multiple emojis per sentence, decorative emojis, overenthusiastic emoji usage
  - When in doubt, leave it out - professional tone is priority
- Keep formatting clean and not overdone - enhance readability, don't distract

KNOWLEDGE BASE:
${knowledgeBase}

Remember: You represent Matt's professional brand. Be helpful, accurate, and stay on topic.`

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface RequestBody {
  messages: Message[]
}

// Simple in-memory rate limiting (resets on server restart)
// For production, consider using Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(req: Request): string {
  // Try to get real IP from common headers (for proxy/load balancer scenarios)
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIp) {
    return realIp
  }
  
  // Fallback to a generic key if IP can't be determined
  return 'unknown'
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    // New window, reset counter
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false // Rate limit exceeded
  }

  // Increment counter
  record.count++
  return true
}

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function POST(req: Request) {
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(req)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { 
          message: "Too many requests. Please wait a moment before trying again." 
        },
        { status: 429 }
      )
    }

    const body: RequestBody = await req.json()
    const { messages } = body

    // Input validation
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Invalid request format." },
        { status: 400 }
      )
    }

    if (messages.length > MAX_CONVERSATION_DEPTH) {
      return NextResponse.json(
        { message: "Conversation too long. Please start a new conversation." },
        { status: 400 }
      )
    }

    // Validate individual messages
    for (const msg of messages) {
      if (!msg.content || typeof msg.content !== 'string') {
        return NextResponse.json(
          { message: "Invalid message format." },
          { status: 400 }
        )
      }
      
      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json(
          { message: "Message too long. Please keep messages under 1000 characters." },
          { status: 400 }
        )
      }
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { 
          message: "Chat is currently unavailable. Please reach out to Matt directly via GitHub or LinkedIn." 
        },
        { status: 500 }
      )
    }

    // Limit conversation history sent to API (keeps costs down and context focused)
    const recentMessages = messages.slice(-MAX_HISTORY_SENT)

    // Initialize Groq client at runtime
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    })

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant', // Fastest model
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...recentMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500, // Keep responses concise
    })

    const assistantMessage = completion.choices[0].message.content

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { 
        message: "I'm having trouble responding right now. Please try again or reach out to Matt directly." 
      },
      { status: 500 }
    )
  }
}
