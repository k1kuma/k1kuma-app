'use client'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-terminal-bg/90 border-t border-terminal-green/20">
      <div className="flex items-center justify-center space-x-6 h-16">
        <a
          href="https://github.com/k1kuma"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-text/70 hover:text-terminal-accent transition-colors"
          aria-label="GitHub"
        >
          <FaGithub className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/mattkikuchi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-text/70 hover:text-terminal-accent transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>
    </footer>
  )
}
