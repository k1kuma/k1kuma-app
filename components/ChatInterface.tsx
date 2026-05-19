'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Component to render message content with markdown support
function MessageContent({ content }: { content: string }) {
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
      {content}
    </ReactMarkdown>
  )
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm an AI assistant that can answer questions about Matt Kikuchi. Ask me about his experience, projects, skills, or anything else!",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedQuestions = [
    "What's Matt's current role?",
    "Tell me about Matt's experience with FinTech",
    "What technologies does Matt work with?",
    "What's Matt's background story?",
  ]

  const handleSubmit = async (e: FormEvent | null, question: string | null = null) => {
    e?.preventDefault()
    const userMessage = question || input.trim()
    
    if (!userMessage || isLoading) return

    // Add user message
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[700px] border border-terminal-green/30 rounded-lg bg-terminal-bg/50 backdrop-blur-sm shadow-2xl">
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
                    : 'bg-terminal-bg border border-terminal-cyan/20 text-terminal-text'
                }`}
              >
                {message.role === 'assistant' && (
                  <span className="text-terminal-cyan text-xs font-bold">AI:</span>
                )}
                <div className="text-sm mt-1 whitespace-pre-wrap leading-relaxed">
                  <MessageContent content={message.content} />
                </div>
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
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-terminal-green/20 text-terminal-green rounded border border-terminal-green/30 hover:bg-terminal-green/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
