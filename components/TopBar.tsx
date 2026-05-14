'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-terminal-green text-xl">$</span>
            <span className="text-terminal-text font-bold hover:text-terminal-green transition-colors">
              matt.kikuchi
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
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/mattkikuchi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-green transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mattkikuchi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/70 hover:text-terminal-green transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
