interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  link?: string
  status: 'Live' | 'In Progress' | 'Completed'
  impact?: string
}

export default function Portfolio() {
  const projects: Project[] = [
    {
      id: 1,
      title: 'TrackInsight Fund Comparison Tool',
      description: 'Led development of an ETF fund comparison feature that allows users to analyze and compare multiple funds side-by-side with comprehensive metrics and visualizations.',
      tech: ['React', 'TypeScript', 'Node.js', 'AWS'],
      link: 'https://trackinsight.com',
      status: 'Live',
      impact: '2000+ new users per week',
    },
    {
      id: 2,
      title: 'Portfolio Management System',
      description: 'Co-led development of a comprehensive portfolio management feature that successfully migrated users from legacy TrackInsight Classic to the modern platform.',
      tech: ['React', 'TypeScript', 'AWS Lambda', 'DynamoDB'],
      link: 'https://trackinsight.com',
      status: 'Live',
      impact: '50,000+ users migrated',
    },
    {
      id: 3,
      title: 'Enterprise B2B Platform',
      description: 'Co-led transformation of core B2C features into a B2B SAAS product, opening new revenue streams for TrackInsight enterprise clients.',
      tech: ['React', 'TypeScript', 'Node.js', 'Terraform', 'AWS'],
      status: 'Live',
      impact: 'Significant new revenue streams',
    },
    {
      id: 4,
      title: 'ATM Transaction Optimization',
      description: 'Implemented features for hardware and software pre-authorization including offline PIN entry and NFC card input, dramatically reducing transaction times at Diebold Nixdorf.',
      tech: ['AngularJS', 'C++', 'C#', 'Node.js'],
      status: 'Completed',
      impact: '50% reduction in transaction time (60s → 30-45s)',
    },
    {
      id: 5,
      title: 'Web Scraping Platform',
      description: 'Led end-to-end design of a scalable web-scraping application at TripStack that crawls airline websites to generate flight itinerary data across major carriers.',
      tech: ['C#', 'JavaScript'],
      status: 'Completed',
      impact: '~80% success rate on scrape attempts',
    },
    {
      id: 6,
      title: 'AI-Assisted Development Initiative',
      description: 'Pioneered adoption of AI coding assistants (Claude, GitHub Copilot) across the TrackInsight engineering team, transforming development workflows and accelerating feature delivery.',
      tech: ['Claude', 'GitHub Copilot', 'AI Integration'],
      status: 'Live',
      impact: 'Team-wide productivity boost',
    },
    {
      id: 7,
      title: 'Sonnet Insurance Quoting Platform',
      description: 'Developed and enhanced the home and auto insurance quoting application at Definity Financial, implementing A/B testing and improving conversion rates through user experience optimizations.',
      tech: ['AngularJS', 'NextJS', 'Ruby on Rails', 'VWO'],
      link: 'https://www.sonnet.ca',
      status: 'Live',
      impact: 'Improved transaction rates through A/B testing',
    },
    {
      id: 8,
      title: 'Vaughan Physiotherapy',
      description: 'Built a professional website for a local GTA physiotherapy clinic featuring service information, appointment booking, and responsive design for optimal patient experience.',
      tech: ['React', 'Next.js', 'Tailwind CSS'],
      link: 'https://www.vaughanphysiotherapy.com',
      status: 'Live',
    },
    {
      id: 9,
      title: 'Tiger Den Labs',
      description: 'Developed a Chinese and Western astrology application combining traditional and modern astrological systems for personalized insights and readings.',
      tech: ['React', 'TypeScript', 'Next.js'],
      link: 'https://www.tigerdenlabs.com',
      status: 'Live',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Terminal Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
          $ ls projects/
        </h1>
        <p className="text-terminal-text/60 mt-4">
          Key projects and achievements from my 13+ years in software engineering—from FinTech platforms to AI adoption initiatives.
        </p>
        <div className="h-0.5 w-24 bg-terminal-green/50 mt-4"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-terminal-green/30 rounded-lg p-6 bg-terminal-bg/50 hover:bg-terminal-bg/70 transition-all hover:border-terminal-green/50 group"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-terminal-green text-lg font-bold group-hover:text-terminal-cyan transition-colors">
                {project.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                project.status === 'Live' 
                  ? 'bg-terminal-green/20 text-terminal-green' 
                  : project.status === 'In Progress'
                  ? 'bg-terminal-yellow/20 text-terminal-yellow'
                  : 'bg-terminal-cyan/20 text-terminal-cyan'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-terminal-text/80 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Impact */}
            {project.impact && (
              <div className="mb-4 text-xs text-terminal-yellow">
                <span className="font-bold">Impact:</span> {project.impact}
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-terminal-cyan/10 text-terminal-cyan border border-terminal-cyan/30 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green text-sm hover:text-terminal-cyan transition-colors inline-flex items-center space-x-1"
              >
                <span>View Live</span>
                <span>→</span>
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30 text-center">
          <div className="text-2xl font-bold text-terminal-green mb-1">50K+</div>
          <div className="text-xs text-terminal-text/60">Users Migrated</div>
        </div>
        <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30 text-center">
          <div className="text-2xl font-bold text-terminal-cyan mb-1">2K+</div>
          <div className="text-xs text-terminal-text/60">Weekly New Users</div>
        </div>
        <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30 text-center">
          <div className="text-2xl font-bold text-terminal-yellow mb-1">60%</div>
          <div className="text-xs text-terminal-text/60">Test Coverage Increase</div>
        </div>
        <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30 text-center">
          <div className="text-2xl font-bold text-terminal-green mb-1">50%</div>
          <div className="text-xs text-terminal-text/60">Faster Transaction Times</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="border border-terminal-green/30 rounded-lg p-8 bg-terminal-bg/30 text-center">
        <div className="text-terminal-cyan text-4xl mb-4">💬</div>
        <h2 className="text-terminal-cyan text-xl font-bold mb-2">
          Want to Know More?
        </h2>
        <p className="text-terminal-text/60 text-sm mb-4">
          Ask the AI assistant about any of these projects, or check out the About page for more details on my experience and skills.
        </p>
        <a 
          href="/"
          className="inline-block px-6 py-2 border border-terminal-green/50 text-terminal-green rounded hover:bg-terminal-green/10 transition-colors"
        >
          Chat with AI
        </a>
      </div>
    </div>
  )
}
