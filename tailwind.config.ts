import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0a0e14',
          text: '#b3b1ad',
          green: '#00ff41',
          cyan: '#00e5ff',
          blue: '#5ccfe6',
          purple: '#baa0f8',
          yellow: '#ffb454',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
