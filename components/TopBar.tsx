'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

interface NavItem {
  name: string
  path: string
}

export default function TopBar() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-terminal-bg/90 border-b border-terminal-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="k1kuma logo" 
                fill
                sizes="32px"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <span className="text-terminal-text font-bold hover:text-terminal-accent transition-colors">
              k1kuma
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'text-terminal-green bg-terminal-green/10'
                      : 'text-terminal-text/70 hover:text-terminal-green hover:bg-terminal-green/5'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/k1kuma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-accent transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mattkikuchi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
