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
              The turning point came when I discovered the power of <span className="text-terminal-yellow">statistics in baseball</span>. 
              Analyzing player performance, predicting outcomes, and uncovering patterns in data—that's when I realized 
              software could transform information into insights.
            </p>
            <p>
              After graduating from the <span className="text-terminal-green">University of Western Ontario</span> with a Computer Science degree in 2013, 
              I've spent <span className="text-terminal-yellow">13+ years</span> building software across diverse domains—from ATM systems and banking 
              applications to travel platforms and insurance technology.
            </p>
            <p>
              Today, I'm a <span className="text-terminal-green">Senior Full-Stack Engineer at TrackInsight</span>, a France-based fintech startup 
              where I lead development initiatives in the <span className="text-terminal-green">ETF data and analytics space</span>. 
              I'm particularly proud of pioneering <span className="text-terminal-cyan">AI-assisted development</span> across our engineering team, 
              integrating tools like Claude and GitHub Copilot into our daily workflows.
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
              <h3 className="text-terminal-text font-bold">TrackInsight</h3>
              <span className="text-terminal-text/50 text-sm">— Aug 2022 - Present</span>
            </div>
            <p className="text-terminal-text/70 text-sm mb-1">Senior Full-Stack Engineer (Remote)</p>
            <p className="text-terminal-text/60 text-sm mb-2">
              Led development on key features driving 2000+ new users per week and successfully migrating 50,000+ users. 
              Pioneered AI coding assistant adoption across the team.
            </p>
            <p className="text-terminal-text/50 text-xs">
              React • TypeScript • Node.JS • AWS • Terraform
            </p>
          </div>

          <div className="border-l-2 border-terminal-green/30 pl-6 pb-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-terminal-green">▸</span>
              <h3 className="text-terminal-text font-bold">Definity Financial</h3>
              <span className="text-terminal-text/50 text-sm">— Jun 2021 - Aug 2022</span>
            </div>
            <p className="text-terminal-text/70 text-sm mb-1">Senior Full-Stack Engineer</p>
            <p className="text-terminal-text/60 text-sm mb-2">
              Enhanced insurance quoting platform and led modernization efforts. Implemented A/B testing resulting in improved conversion rates.
            </p>
            <p className="text-terminal-text/50 text-xs">
              AngularJS • NextJS • Ruby on Rails • VWO
            </p>
          </div>

          <div className="border-l-2 border-terminal-green/30 pl-6 pb-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-terminal-green">▸</span>
              <h3 className="text-terminal-text font-bold">TripStack</h3>
              <span className="text-terminal-text/50 text-sm">— Oct 2020 - Jun 2021</span>
            </div>
            <p className="text-terminal-text/70 text-sm mb-1">Senior Back-end Engineer</p>
            <p className="text-terminal-text/60 text-sm mb-2">
              Led design of scalable web-scraping application achieving ~80% success rate across major airlines.
            </p>
            <p className="text-terminal-text/50 text-xs">
              C# • JavaScript
            </p>
          </div>

          <div className="border-l-2 border-terminal-green/30 pl-6 pb-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-terminal-green">▸</span>
              <h3 className="text-terminal-text font-bold">Diebold Nixdorf</h3>
              <span className="text-terminal-text/50 text-sm">— Aug 2016 - Oct 2020</span>
            </div>
            <p className="text-terminal-text/70 text-sm mb-1">Software Engineer</p>
            <p className="text-terminal-text/60 text-sm mb-2">
              Reduced ATM transaction times by 50% and implemented NFC/mobile authentication features.
            </p>
            <p className="text-terminal-text/50 text-xs">
              AngularJS • Node • C++ • C#
            </p>
          </div>

          <div className="border-l-2 border-terminal-green/30 pl-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-terminal-green">▸</span>
              <h3 className="text-terminal-text font-bold">Phoenix Interactive</h3>
              <span className="text-terminal-text/50 text-sm">— May 2013 - Jul 2016</span>
            </div>
            <p className="text-terminal-text/70 text-sm mb-1">Software Engineer</p>
            <p className="text-terminal-text/60 text-sm mb-2">
              Developed payments applications for major financial institutions including TD, BMO, and Bank of America.
            </p>
            <p className="text-terminal-text/50 text-xs">
              C++ • HTML
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-terminal-cyan text-xl font-bold mb-6">// Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Frontend</h3>
            <ul className="space-y-1 text-sm text-terminal-text/80">
              <li>• React / TypeScript</li>
              <li>• Next.js</li>
              <li>• AngularJS</li>
              <li>• SCSS / Tailwind</li>
            </ul>
          </div>
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Backend</h3>
            <ul className="space-y-1 text-sm text-terminal-text/80">
              <li>• Node.js</li>
              <li>• Ruby on Rails</li>
              <li>• C# / C++</li>
              <li>• Python</li>
            </ul>
          </div>
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Cloud & Tools</h3>
            <ul className="space-y-1 text-sm text-terminal-text/80">
              <li>• AWS (Lambda, DynamoDB)</li>
              <li>• Terraform / IaC</li>
              <li>• AI Tools (Claude, Copilot)</li>
              <li>• AGILE / CI/CD</li>
            </ul>
          </div>
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Domain Expertise</h3>
            <ul className="space-y-1 text-sm text-terminal-text/80">
              <li>• FinTech & ETF Analytics</li>
              <li>• Banking & Payments</li>
              <li>• Insurance Technology</li>
              <li>• Web Scraping</li>
            </ul>
          </div>
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Leadership</h3>
            <ul className="space-y-1 text-sm text-terminal-text/80">
              <li>• Technical Leadership</li>
              <li>• Mentoring Engineers</li>
              <li>• Code Review</li>
              <li>• Project Planning</li>
            </ul>
          </div>
          <div className="border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/30">
            <h3 className="text-terminal-green text-sm font-bold mb-3">Key Achievements</h3>
            <ul className="space-y-1 text-sm text-terminal-text/80">
              <li>• 50K+ user migration</li>
              <li>• 2000+ weekly users growth</li>
              <li>• 0% → 60% test coverage</li>
              <li>• 50% faster deployments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="mb-16">
        <h2 className="text-terminal-cyan text-xl font-bold mb-6">// Beyond Code</h2>
        <div className="border border-terminal-green/30 rounded-lg p-6 bg-terminal-bg/50">
          <p className="text-terminal-text/80 text-sm leading-relaxed">
            When I'm not coding, you'll find me on the golf course, diving deep into baseball statistics and analytics, 
            or gaming—the hobby that first sparked my interest in programming. Based in <span className="text-terminal-yellow">Toronto, Ontario</span>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border border-terminal-green/30 rounded-lg p-8 bg-terminal-green/5 text-center">
        <h2 className="text-terminal-green text-xl font-bold mb-4">
          $ lets-collaborate.sh
        </h2>
        <p className="text-terminal-text/80 mb-6">
          Interested in collaborating or want to learn more? Let's connect.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:mkiku36@gmail.com"
            className="px-6 py-2 border border-terminal-yellow/50 text-terminal-yellow rounded hover:bg-terminal-yellow/10 transition-colors"
          >
            Email
          </a>
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
