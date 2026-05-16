'use client'

import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
            Matt Kikuchi
          </h1>
          <p className="text-terminal-text/80 text-sm md:text-base">
            Chat with an AI about Matt Kikuchi&apos;s experience, projects, and interests
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </div>
  )
}
