import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Terminal Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
          $ cat about.md
        </h1>
        <div className="h-0.5 w-24 bg-terminal-green/50"></div>
      </div>

      {/* Story Section */}
      <section className="mb-16 space-y-6">
        <div className="border border-terminal-green/30 rounded-lg p-6 bg-terminal-bg/50">
          <h2 className="text-terminal-cyan text-xl font-bold mb-4">// The Journey</h2>
          <div className="space-y-4 text-terminal-text/90 leading-relaxed">
            <p>
              My path to software engineering started in an unexpected place: <span className="text-terminal-yellow">gaming</span>. 
              What began as a curiosity about how games worked evolved into a passion for programming.
            </p>
            <p>
              The turning point came when I discovered the power of <span className="text-terminal-yellow">statistics in professional sports</span>. 
              Analyzing player performance, predicting outcomes, and uncovering patterns in data—that's when I realized 
              software could transform information into insights.
            </p>
            <p>
              Today, I'm a <span className="text-terminal-green">Software Engineer at TrackInsight ETF</span>, a France-based startup 
              where I build solutions for complex problems in the <span className="text-terminal-green">FinTech and web3 space</span>. 
              With over 10 years of experience, I've worked across domains from banking systems to blockchain, always driven 
              by the challenge of making complicated systems elegant.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mb-16">
        <h2 className="text-terminal-cyan text-xl font-bold mb-6">// Experience</h2>
        <div className="space-y-4">
          <div className="border-l-2 border-terminal-green/30 pl-6 pb-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-terminal-green">▸</span>
              <h3 className="text-terminal-text font-bold">TrackInsight ETF</h3>
              <span className="text-terminal-text/50 text-sm">— Present</span>
            </div>
            <p className="text-terminal-text/70 text-sm mb-1">Software Engineer</p>
            <p className="text-terminal-text/60 text-sm">
              Building ETF data and analytics infrastructure. Focus on FinTech and web3 solutions.
            </p>
          </div>

          <div className="border-l-2 border-terminal-green/30 pl-6 pb-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-terminal-green">▸</span>
              <h3 className="text-terminal-text font-bold">Diebold Nixdorf</h3>
            </div>
            <p className="text-terminal-text/70 text-sm mb-1">Software Developer</p>
            <p className="text-terminal-text/60 text-sm">
              Developed banking and payments applications.
            </p>
          </div>

          {/* Add more experiences as needed */}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-terminal-cyan text-xl font-bold mb-6">// Skills & Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Domains</h3>
            <ul className="space-y-2 text-sm text-terminal-text/80">
              <li>• FinTech & Financial Infrastructure</li>
              <li>• Web3 & Blockchain</li>
              <li>• Data Engineering & Analytics</li>
              <li>• Banking & Payments Systems</li>
            </ul>
          </div>
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Experience</h3>
            <ul className="space-y-2 text-sm text-terminal-text/80">
              <li>• 10+ Years in Software Engineering</li>
              <li>• Full-Stack Development</li>
              <li>• System Architecture</li>
              <li>• Data-Driven Solutions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border border-terminal-green/30 rounded-lg p-8 bg-terminal-green/5 text-center">
        <h2 className="text-terminal-green text-xl font-bold mb-4">
          $ lets-collaborate.sh
        </h2>
        <p className="text-terminal-text/80 mb-6">
          Interested in collaborating on a project? Let's connect.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/k1kuma"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-terminal-green/50 text-terminal-green rounded hover:bg-terminal-green/10 transition-colors inline-flex items-center gap-2"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mattkikuchi/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-terminal-cyan/50 text-terminal-cyan rounded hover:bg-terminal-cyan/10 transition-colors inline-flex items-center gap-2"
          >
            <FaLinkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}
