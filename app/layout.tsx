import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata = {
  title: 'Matt Kikuchi | Software Engineer',
  description: 'Building solutions to complex problems in the FinTech and web3 space',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-terminal-bg text-terminal-text font-mono antialiased flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
