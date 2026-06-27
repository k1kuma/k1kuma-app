'use client'

import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-terminal-green/20 bg-terminal-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-4">
          {/* Copyright */}
          <div className="text-terminal-text/60 text-sm">
            © {new Date().getFullYear()} Matt Kikuchi
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/k1kuma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-green hover:scale-110 transition-all duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/mattkikuchi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-cyan hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/k1kuma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-cyan hover:scale-110 transition-all duration-200"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/kiku.mata"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-cyan hover:scale-110 transition-all duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
