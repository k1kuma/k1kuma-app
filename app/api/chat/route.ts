import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { knowledgeBase } from './knowledge'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json()
    const { messages } = body

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          message: "Chat is currently unavailable. Please reach out to Matt directly via GitHub or LinkedIn." 
        },
        { status: 500 }
      )
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective model
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(msg => ({
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
