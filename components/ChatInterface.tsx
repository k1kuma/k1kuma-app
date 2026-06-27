'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DOMPurify from 'isomorphic-dompurify'

// Constants
const MAX_MESSAGE_LENGTH = 1000
const REQUEST_TIMEOUT = 30000 // 30 seconds
const STORAGE_KEY = 'chat-messages'

interface Message {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
  errorType?: 'rate-limit' | 'timeout' | 'network' | 'validation'
}

// Component to render message content with markdown support
function MessageContent({ content }: { content: string }) {
  // Sanitize content before rendering
  const sanitizedContent = DOMPurify.sanitize(content)
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom link styling
        a: ({ node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-accent underline hover:text-terminal-green transition-colors"
          />
        ),
        // Custom code block styling
        code: ({ node, className, children, ...props }) => {
          const inline = !className
          return inline ? (
            <code
              {...props}
              className="bg-terminal-green/10 text-terminal-green px-1 py-0.5 rounded text-xs"
            >
              {children}
            </code>
          ) : (
            <code
              {...props}
              className="block bg-terminal-bg/50 border border-terminal-green/20 text-terminal-text p-2 rounded text-xs overflow-x-auto"
            >
              {children}
            </code>
          )
        },
        // Custom list styling
        ul: ({ node, ...props }) => (
          <ul {...props} className="list-disc list-inside space-y-1 my-2" />
        ),
        ol: ({ node, ...props }) => (
          <ol {...props} className="list-decimal list-inside space-y-1 my-2" />
        ),
        // Custom heading styling
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-lg font-bold text-terminal-green mt-3 mb-2" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-base font-bold text-terminal-green mt-2 mb-1" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-sm font-bold text-terminal-cyan mt-2 mb-1" />
        ),
        // Custom paragraph styling
        p: ({ node, ...props }) => (
          <div {...props} className="my-1" />
        ),
        // Custom blockquote styling
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            className="border-l-2 border-terminal-green/50 pl-3 italic text-terminal-text/80 my-2"
          />
        ),
        // Custom table styling
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-2">
            <table {...props} className="border border-terminal-green/20 text-xs" />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th {...props} className="border border-terminal-green/20 px-2 py-1 bg-terminal-green/10" />
        ),
        td: ({ node, ...props }) => (
          <td {...props} className="border border-terminal-green/20 px-2 py-1" />
        ),
      }}
    >
      {sanitizedContent}
    </ReactMarkdown>
  )
}

export default function ChatInterface() {
  const initialMessage: Message = {
    role: 'assistant',
    content: "Hi! I'm an AI assistant that can answer questions about Matt Kikuchi. Ask me about his experience, projects, skills, or anything else!",
  }

  // Load messages from localStorage or use initial message
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          return Array.isArray(parsed) && parsed.length > 0 ? parsed : [initialMessage]
        } catch {
          return [initialMessage]
        }
      }
    }
    return [initialMessage]
  })

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [validationError, setValidationError] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  const suggestedQuestions = [
    "What's Matt's current role?",
    "Tell me about Matt's experience with FinTech",
    "What technologies does Matt work with?",
    "What's Matt's background story?",
  ]

  const clearConversation = () => {
    setMessages([initialMessage])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
    setInput('')
    setValidationError('')
  }

  const getErrorMessage = (errorType: Message['errorType']): string => {
    switch (errorType) {
      case 'rate-limit':
        return "Too many messages sent. Please wait a minute before trying again."
      case 'timeout':
        return "Request timed out. Please check your connection and try again."
      case 'validation':
        return "Message is too long. Please keep it under 1000 characters."
      case 'network':
      default:
        return "Sorry, I encountered an error. Please try again."
    }
  }

  const retryMessage = async (messageIndex: number) => {
    // Find the user message that caused the error
    if (messageIndex === 0 || messages[messageIndex].role !== 'assistant') return

    const userMessage = messages[messageIndex - 1]
    if (userMessage.role !== 'user') return

    // Remove the error message
    const newMessages = messages.slice(0, messageIndex)
    setMessages(newMessages)
    
    // Retry sending the message
    await sendMessage(userMessage.content, newMessages)
  }

  const sendMessage = async (userMessage: string, currentMessages: Message[]) => {
    setIsLoading(true)
    setValidationError('')

    // Create abort controller for timeout
    abortControllerRef.current = new AbortController()
    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort()
    }, REQUEST_TIMEOUT)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: currentMessages,
        }),
        signal: abortControllerRef.current.signal,
      })

      clearTimeout(timeoutId)

      if (response.status === 429) {
        // Rate limit error
        setMessages([
          ...currentMessages,
          {
            role: 'assistant',
            content: getErrorMessage('rate-limit'),
            error: true,
            errorType: 'rate-limit',
          },
        ])
        return
      }

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages([...currentMessages, { role: 'assistant', content: data.message }])
    } catch (error: any) {
      clearTimeout(timeoutId)
      console.error('Error:', error)

      let errorType: Message['errorType'] = 'network'
      if (error.name === 'AbortError') {
        errorType = 'timeout'
      }

      setMessages([
        ...currentMessages,
        {
          role: 'assistant',
          content: getErrorMessage(errorType),
          error: true,
          errorType,
        },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSubmit = async (e: FormEvent | null, question: string | null = null) => {
    e?.preventDefault()
    const userMessage = question || input.trim()

    // Client-side validation
    if (!userMessage) return

    if (userMessage.length > MAX_MESSAGE_LENGTH) {
      setValidationError(`Message too long (${userMessage.length}/${MAX_MESSAGE_LENGTH} characters)`)
      return
    }

    if (isLoading) return

    // Add user message
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setValidationError('')

    await sendMessage(userMessage, newMessages)
  }

  const charCount = input.length
  const isOverLimit = charCount > MAX_MESSAGE_LENGTH
  const charCountColor = isOverLimit
    ? 'text-red-500'
    : charCount > MAX_MESSAGE_LENGTH * 0.9
    ? 'text-terminal-yellow'
    : 'text-terminal-text/40'

  return (
    <div className="flex flex-col h-[600px] border border-terminal-green/30 rounded-lg bg-terminal-bg/50 backdrop-blur-sm shadow-2xl">
      {/* Header with Clear Button */}
      {messages.length > 1 && (
        <div className="border-b border-terminal-green/20 px-4 py-2 flex justify-between items-center">
          <span className="text-xs text-terminal-text/50">
            {messages.length - 1} {messages.length === 2 ? 'message' : 'messages'}
          </span>
          <button
            onClick={clearConversation}
            className="text-xs px-3 py-1 text-terminal-yellow/80 hover:text-terminal-yellow border border-terminal-yellow/30 hover:border-terminal-yellow/50 rounded transition-colors"
          >
            Clear Chat
          </button>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-terminal-green/20 text-terminal-text border border-terminal-green/30'
                    : message.error
                    ? 'bg-red-900/20 text-terminal-text border border-red-500/30'
                    : 'bg-terminal-bg border border-terminal-cyan/20 text-terminal-text'
                }`}
              >
                {message.role === 'assistant' && !message.error && (
                  <span className="text-terminal-cyan text-xs font-bold">AI:</span>
                )}
                {message.error && (
                  <span className="text-red-400 text-xs font-bold">Error:</span>
                )}
                <div className="text-sm mt-1 whitespace-pre-wrap leading-relaxed">
                  <MessageContent content={message.content} />
                </div>
                {/* Retry button for error messages */}
                {message.error && (
                  <button
                    onClick={() => retryMessage(index)}
                    className="mt-2 text-xs px-3 py-1 bg-terminal-yellow/20 text-terminal-yellow border border-terminal-yellow/30 rounded hover:bg-terminal-yellow/30 transition-colors"
                  >
                    Retry
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-terminal-bg border border-terminal-cyan/20 rounded-lg px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-terminal-cyan rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-terminal-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-terminal-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions - Only show at start */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-terminal-text/50 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={(e) => handleSubmit(e, question)}
                className="text-xs px-3 py-1.5 rounded border border-terminal-green/30 text-terminal-green/80 hover:bg-terminal-green/10 hover:text-terminal-green transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-terminal-green/20 p-4">
        {/* Validation error message */}
        {validationError && (
          <div className="mb-2 text-xs text-red-400 bg-red-900/20 border border-red-500/30 rounded px-3 py-1.5">
            {validationError}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-terminal-green text-sm shrink-0">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Matt..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none outline-none text-terminal-text placeholder-terminal-text/30 text-sm disabled:opacity-50"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || isOverLimit}
            className="px-4 py-2 bg-terminal-green/20 text-terminal-green rounded border border-terminal-green/30 hover:bg-terminal-green/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Send
          </button>
        </div>

        {/* Character counter */}
        {input.length > 0 && (
          <div className={`mt-2 text-xs ${charCountColor} text-right`}>
            {charCount}/{MAX_MESSAGE_LENGTH}
          </div>
        )}
      </form>
    </div>
  )
}
