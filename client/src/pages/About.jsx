const skills = {
  'Backend Skills': ['NodeJs', 'ExpressJs', 'JavaScript / TypeScript', 'Java / Spring', 'MongoDB', 'SQL', 'n8n', 'Git / Linux'],
  'Frontend Skills': ['React', 'Redux Toolkit', 'RTK Query', 'TailwindCSS', 'TypeScript', 'HTML5 / CSS3'],
  'Education': ['Inha University in South Korea', 'Integrated Systems Engineering in Computer Science', 'March 2023 - October 2025', 'OOP, Data Structures, Software Engineering'],
  'Languages': ['English — C1 (Advanced)', 'Russian — B2 (Upper-Intermediate)', 'Uzbek — Native'],
};

const workExperience = [
  {
    role: 'Backend Engineer (Self-Employed)',
    period: 'October 2025 - March 2026',
    tech: 'JavaScript / n8n / AI APIs',
    bullets: [
      'Automated Instagram Direct Message workflows using n8n and AI APIs, designing intelligent conversation flows to handle customer inquiries without manual intervention.',
      'Deployed and tested the automation system across 2 live Instagram business accounts, integrating AI-driven response generation to deliver context-aware replies in real time.',
      'Reduced response time and manual workload by streamlining chat handling through no-code/low-code automation architecture, combining n8n workflows with third-party AI APIs for natural language understanding.',
    ],
  },
  {
    role: 'Full Stack Developer Intern — devex.uz',
    period: 'April 2024 - November 2024',
    tech: 'South Korea (Remote)',
    bullets: [
      'Enhanced user experience by developing responsive web designs for seamless cross-device compatibility.',
      'Developed, coded, modified and debugged application programs of varying degree of complexity with full independence.',
      'Worked with senior developers and designers to implement nestar.uz using HTML, CSS, JavaScript and NodeJs.',
      'Wrote production-ready code with fluency in modern front-end and back-end frameworks.',
      'Optimized website performance through efficient code refactoring and implementing best practices in coding standards.',
    ],
  },
];

export default function About() {
  return (
    <div className="container-main py-16">
      <div className="animate-slide-up">
        {/* Bio Section */}
        <div className="mb-16">
          <h1 className="section-heading">About Me</h1>
          <div className="w-16 h-1 bg-accent-500 rounded-full mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                I am <strong>Mamajonov Diyorbek</strong>, a Software Engineer & Full-Stack Engineer studying Integrated Systems Engineering in Computer Science at Inha University in South Korea.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                My core focus spans backend architecture with Node.js, Express, Java/Spring, and MongoDB/SQL, modern frontend engineering with React, TypeScript, and TailwindCSS, as well as designing AI-driven workflow automations using n8n and LLM APIs.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-60 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-4 ring-accent-100 bg-slate-100">
                <img
                  src="/profile.jpg"
                  alt="Mamajonov Diyorbek"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Work Experience</h2>
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.role} className="card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-100 gap-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-accent-600 uppercase tracking-wide">{exp.tech}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{exp.period}</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Details Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Skills & Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="card p-6">
                <h3 className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-4">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CV PDF Viewer */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Curriculum Vitae</h2>
          <div className="card overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Mamajonov_Diyorbek_CV.pdf</span>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
              >
                Open in new tab ↗
              </a>
            </div>
            <iframe
              src="/cv.pdf"
              title="Mamajonov Diyorbek CV"
              className="w-full border-0"
              style={{ height: '80vh' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
