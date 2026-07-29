const projects = [
  {
    title: 'Instagram DM AI Automation System',
    description:
      'Automated Instagram Direct Message workflows using n8n and AI APIs. Designed intelligent conversation flows handling customer inquiries without manual intervention across 2 live Instagram business accounts, delivering real-time, context-aware AI replies.',
    tech: ['n8n', 'Node.js', 'Express.js', 'AI APIs', 'Webhooks', 'JavaScript'],
    github: 'https://github.com/diyorbekMIT',
  },
  {
    title: 'Auto Service CRM System',
    description:
      'Comprehensive customer relationship and management platform designed for auto service centers. Features service scheduling, customer vehicle history tracking, inventory records, and invoice generation.',
    tech: ['Node.js', 'Express.js', 'React', 'MongoDB', 'REST API', 'TailwindCSS'],
    github: 'https://github.com/diyorbekMIT/auto-service-crm',
  },
  {
    title: 'Job Portal Backend Service',
    description:
      'Robust backend REST API service built for a modern job recruitment platform. Handles JWT authentication, employer profiles, job posting search with dynamic filtering, and candidate application workflows.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'TypeScript', 'REST API'],
    github: 'https://github.com/diyorbekMIT/job-portal-backend',
  },
  {
    title: 'AZAN Market E-Commerce Platform',
    description:
      'Full-stack e-commerce marketplace web application featuring interactive product catalog filtering, shopping cart state management, checkout workflows, and user order history.',
    tech: ['React', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS'],
    github: 'https://github.com/diyorbekMIT/AZAN-MARKET',
  },
  {
    title: 'Burak Full-Stack Application',
    description:
      'Full-stack web application implementing scalable RESTful APIs, OOP principles, data structures, and database models using Java, Spring Boot, Node.js, Express, and MongoDB.',
    tech: ['Java', 'Spring Boot', 'Node.js', 'Express.js', 'MongoDB', 'React', 'Redux'],
    github: 'https://github.com/diyorbekMIT/burak',
  },
];

export default function Portfolio() {
  return (
    <div className="container-main py-16">
      <div className="animate-slide-up">
        <div className="max-w-3xl mb-12">
          <h1 className="section-heading">Portfolio</h1>
          <p className="section-subheading">
            A showcase of my full-stack web applications, backend API services, and AI workflow automations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="card p-6 flex flex-col">
              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
