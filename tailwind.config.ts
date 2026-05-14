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
          bg: '#000000',
          text: '#b3b1ad',
          green: '#C9B896', // Primary - matches k1kuma logo
          cyan: '#D4C5B0', // Secondary beige
          blue: '#B8A88A',
          purple: '#A69478',
          yellow: '#E6D5B8',
          accent: '#C9B896', // k1kuma brand color
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
