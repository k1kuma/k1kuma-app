export default function Portfolio() {
  // Placeholder projects - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: 'Project Name 1',
      description: 'Brief description of what this project does and the problem it solves.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      link: '#',
      status: 'Live',
    },
    {
      id: 2,
      title: 'Project Name 2',
      description: 'Another project showcasing your skills and experience.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      link: '#',
      status: 'In Progress',
    },
    // Add more projects
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Terminal Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
          $ ls projects/
        </h1>
        <p className="text-terminal-text/60 mt-4">
          A collection of projects I've built and contributed to.
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
              <span className={`text-xs px-2 py-1 rounded ${
                project.status === 'Live' 
                  ? 'bg-terminal-green/20 text-terminal-green' 
                  : 'bg-terminal-yellow/20 text-terminal-yellow'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-terminal-text/80 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

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
                <span>View Project</span>
                <span>→</span>
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="border border-terminal-green/30 rounded-lg p-8 bg-terminal-bg/30 text-center">
        <div className="text-terminal-yellow text-4xl mb-4">⚡</div>
        <h2 className="text-terminal-cyan text-xl font-bold mb-2">
          More Projects Coming Soon
        </h2>
        <p className="text-terminal-text/60 text-sm">
          Currently working on some exciting new things. Check back later or ask the AI assistant about my ongoing work!
        </p>
      </div>

      {/* Placeholder Instructions (Remove in production) */}
      <div className="mt-12 border border-terminal-yellow/30 rounded-lg p-6 bg-terminal-yellow/5">
        <h3 className="text-terminal-yellow text-sm font-bold mb-3">
          📝 TODO: Update Portfolio Content
        </h3>
        <ul className="text-terminal-text/70 text-sm space-y-1">
          <li>• Replace placeholder projects with your actual work</li>
          <li>• Add project screenshots or demos</li>
          <li>• Include GitHub links or live demo URLs</li>
          <li>• Showcase 3-5 of your best projects</li>
          <li>• Consider adding open source contributions section</li>
        </ul>
      </div>
    </div>
  )
}
