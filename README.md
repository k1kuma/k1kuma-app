# Personal Brand Site - AI Chat Edition

A modern personal brand website featuring an AI-powered chat interface that answers questions about your professional experience, built with Next.js 14 and a terminal-inspired aesthetic.

## 🚀 Features

- **AI Chat Interface**: Visitors can ask questions about your experience, projects, and skills
- **Terminal Aesthetic**: Clean, developer-focused design with monospace fonts and terminal styling
- **Restricted AI**: LLM is limited to only answering questions about you (no off-topic responses)
- **Modern Stack**: Next.js 14, Tailwind CSS, Framer Motion
- **Fully Responsive**: Works perfectly on mobile and desktop

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **Animation**: Framer Motion
- **AI**: OpenAI GPT-4o-mini (via API)
- **Font**: JetBrains Mono (Google Fonts)
- **Deployment**: Vercel (recommended)

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from: [OpenAI API Keys](https://platform.openai.com/api-keys)

### 3. Customize Your Content

#### Update Knowledge Base
Edit `/app/api/chat/knowledge.ts` to include your information:
- Work experience
- Technical skills
- Projects
- Contact information
- Personal story

#### Update About Page
Edit `/app/about/page.tsx` to match your narrative and experience.

#### Update Portfolio
Edit `/app/portfolio/page.tsx` to showcase your projects.

#### Update Social Links
Update GitHub/LinkedIn URLs in:
- `/components/TopBar.tsx`
- `/app/about/page.tsx`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 5. Deploy

The easiest way to deploy is with [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Don't forget to add your `OPENAI_API_KEY` environment variable in the Vercel dashboard.

## 💰 Cost Estimates

Using GPT-4o-mini, typical costs are extremely low:
- **Per conversation**: $0.01 - $0.10
- **100 conversations/month**: ~$5-10
- **1000 conversations/month**: ~$50-100

The AI is configured to keep responses concise (max 500 tokens) to minimize costs.

## 🎨 Customization

### Change Colors
Edit the terminal color scheme in `tailwind.config.js`:

```js
colors: {
  terminal: {
    bg: '#0a0e14',      // Background
    text: '#b3b1ad',    // Text
    green: '#00ff41',   // Primary accent
    cyan: '#00e5ff',    // Secondary accent
    // ... more colors
  },
}
```

### Change Font
Replace JetBrains Mono in `/app/layout.tsx`:

```js
import { Fira_Code } from 'next/font/google'
const firaCode = Fira_Code({ subsets: ['latin'] })
```

### Add Blog Section
Create `/app/blog/page.tsx` and add the route to TopBar navigation.

## 🔒 AI Safety Features

The chat API includes multiple safeguards:
- Strict system prompt that refuses off-topic questions
- Only references your knowledge base content
- Graceful error handling
- Rate limiting ready (add if needed)

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with TopBar
│   ├── page.tsx            # Home page with chat
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── portfolio/
│   │   └── page.tsx        # Portfolio page
│   └── api/
│       └── chat/
│           ├── route.ts    # Chat API endpoint
│           └── knowledge.ts # Your information
├── components/
│   ├── TopBar.tsx          # Navigation bar
│   └── ChatInterface.tsx   # Main chat UI
└── public/                 # Static assets
```

## 🚧 TODO

- [ ] Fill out knowledge base with your information ([app/api/chat/knowledge.ts](app/api/chat/knowledge.ts))
- [ ] Update About page content ([app/about/page.tsx](app/about/page.tsx))
- [ ] Add real projects to Portfolio ([app/portfolio/page.tsx](app/portfolio/page.tsx))
- [ ] Add your actual social media links
- [ ] Get OpenAI API key
- [ ] Deploy to production
- [ ] (Optional) Add analytics
- [ ] (Optional) Add blog section

## 📝 License

MIT License - feel free to use this as a template for your own site!

---

Built with ❤️ using Next.js and AI
