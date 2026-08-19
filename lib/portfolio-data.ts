export const projects = [
  {
    slug: 'task-tracker',
    category: 'personal',
    number: '00',
    title: 'Task Tracker',
    kind: 'Personal productivity application',
    summary:
      'A focused task and project management application for planning work, tracking progress, and keeping daily execution visible.',
    impact: 'A lightweight personal system for turning intent into consistent progress.',
    stack: ['Next.js', 'React', 'TypeScript', 'Vercel'],
    overview:
      'Task Tracker is a personal productivity application designed around clarity: capture work quickly, organize it into meaningful projects, and keep progress visible without unnecessary ceremony.',
    contributions: [
      'Designed the task and project flows around fast capture and focused execution.',
      'Built responsive interfaces that work well on mobile and desktop.',
      'Added clear states for priorities, progress, and completed work.',
      'Deployed the application on Vercel for reliable access.',
    ],
    liveUrl: 'https://task-tracker-gray-mu.vercel.app',
  },
  {
    slug: 'infra0',
    category: 'professional',
    number: '04',
    title: 'Infra0',
    kind: 'Professional infrastructure platform',
    summary:
      'An infrastructure automation platform helping teams provision, govern, and operate cloud environments with confidence.',
    impact:
      'Brings repeatable provisioning, validation, drift awareness, and governance into one workflow.',
    stack: ['Next.js', 'FastAPI', 'Azure', 'OpenTofu', 'PostgreSQL'],
    overview:
      'Infra0 is professional work focused on making infrastructure operations more approachable, reviewable, and repeatable for enterprise teams.',
    contributions: [
      'Built full-stack product experiences for infrastructure provisioning and governance.',
      'Worked across Azure integrations, OpenTofu/Terraform workflows, and backend APIs.',
      'Contributed to validation, drift detection, and Git-based operational workflows.',
      'Shaped documentation, landing pages, and public product surfaces.',
    ],
    liveUrl: 'https://infra0.ai',
  },
  {
    slug: 'infragenie-suite',
    category: 'professional',
    number: '01',
    title: 'InfraGenie Suite',
    kind: 'Enterprise cloud governance',
    summary:
      'A unified platform for repository provisioning, access governance, ticketing, cloud cost oversight, and automated infrastructure workflows.',
    impact: 'Reduced cloud spend by approximately 50% and access turnaround by approximately 80%.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Azure', 'OpenTofu'],
    overview:
      'InfraGenie brought scattered cloud operations into one governed workspace. I worked across product discovery, full-stack implementation, secure APIs, RBAC, provisioning workflows, and the developer-facing experience.',
    contributions: [
      'Designed modular workflow experiences for provisioning and approvals.',
      'Built backend services and integrations around PostgreSQL, Azure, Terraform, and OpenTofu.',
      'Introduced governance patterns that made access, cost, and deployment state easier to understand.',
      'Collaborated across requirements, architecture, proof-of-concepts, and production improvements.',
    ],
  },
  {
    slug: 'agentflow',
    category: 'professional',
    number: '02',
    title: 'AgentFlow',
    kind: 'Agentic workflow platform',
    summary:
      'A flexible foundation for composing intelligent agents, reusable skills, MCP tools, approvals, and human-in-the-loop workflows.',
    impact: 'Turns complex operational workflows into composable, observable systems.',
    stack: ['React', 'Python', 'LangGraph', 'MCP', 'AI SDK'],
    overview:
      'AgentFlow is an internal platform concept for making agent capabilities installable, orchestrated, and governed across web applications and developer tools.',
    contributions: [
      'Mapped agent installation and execution into repeatable workflow primitives.',
      'Worked on orchestration, tool access, approvals, and observability patterns.',
      'Connected AI capabilities to practical engineering and enterprise business processes.',
      'Explored reusable skills and MCP-powered integrations for extensible product surfaces.',
    ],
  },
  {
    slug: 'riskguard-ai',
    category: 'professional',
    number: '03',
    title: 'RiskGuard AI',
    kind: 'AI-assisted underwriting',
    summary:
      'A document intelligence workflow that extracts, evaluates, and routes underwriting signals for faster, more consistent decisions.',
    impact: 'Connects RAG, structured extraction, and review workflows into one clear experience.',
    stack: ['Azure AI', 'FastAPI', 'RAG', 'React', 'PostgreSQL'],
    overview:
      'RiskGuard explored how research and document intelligence could support underwriting teams without hiding the reasoning behind a recommendation.',
    contributions: [
      'Built React interfaces around underwriting tasks and operational review.',
      'Integrated deep research and retrieval workflows for risk analysis.',
      'Structured extracted data so reviewers could move from evidence to decision.',
      'Focused on transparent, maintainable AI-assisted experiences.',
    ],
  },
]

export type Project = (typeof projects)[number]

export const journey = [
  {
    id: 'associate',
    date: 'June 2026 — now',
    role: 'Associate Software Engineer',
    company: 'Synergech Technologies',
    side: 'left',
    summary: 'Enterprise platforms, AI-powered automation, and developer productivity systems.',
    details: [
      'Enhanced the Synfra SaaS platform across cloud governance, infrastructure automation, public applications, landing pages, and documentation portals.',
      'Built full-stack systems using Next.js, React, FastAPI, PostgreSQL, Azure AI, and OpenTofu/Terraform.',
      'Developed an Enterprise AI Platform with account management, usage analytics, executive dashboards, and a Skills & Agents Marketplace.',
      'Created agentic workflow foundations for web applications and VS Code extensions.',
    ],
  },
  {
    id: 'trainee',
    date: 'May 2025 — May 2026',
    role: 'Graduate Engineering Trainee',
    company: 'Synergech Technologies',
    side: 'right',
    summary: 'AI-powered infrastructure, enterprise applications, and scalable backend systems.',
    details: [
      'Built an AI-driven infrastructure provisioning platform that reduced provisioning time by 90–95%.',
      'Implemented automated validation, drift detection, and Git-based workflows with a 95% deployment success rate.',
      'Contributed to document summarization, intelligent extraction, autonomous testing, and insurance underwriting products.',
      'Designed clean APIs, RBAC, caching strategies, and microservices patterns.',
    ],
  },
  {
    id: 'on-job',
    date: 'February 2025 — April 2025',
    role: 'On Job Trainee',
    company: 'Synergech Technologies',
    side: 'left',
    summary: 'Automation and intelligent decision support for enterprise workflows.',
    details: [
      'Contributed to intelligent document extraction and chatbot systems.',
      'Supported an autonomous testing platform that validated UI behavior across environments.',
      'Worked on cloud infrastructure setup, automation workflows, and reliability planning.',
    ],
  },
  {
    id: 'intern',
    date: 'August 2024 — January 2025',
    role: 'Intern',
    company: 'Synergech Technologies',
    side: 'right',
    summary: 'Full-stack foundations, backend services, and clean architecture.',
    details: [
      'Built and deployed full-stack applications with backend services, frontend interfaces, and database integrations.',
      'Applied loosely coupled systems and MVC patterns to real-world projects.',
      'Strengthened foundations in backend development, frontend performance, and clean coding practices.',
    ],
  },
  {
    id: 'education',
    date: '2020 — 2024',
    role: 'Bachelor of Engineering',
    company: 'Panimalar Engineering College',
    side: 'left',
    summary: 'Electrical, Electronics and Communications Engineering · CGPA 8.78',
    details: [
      'Studied engineering fundamentals while building a strong foundation in software development.',
      'Developed an interest in backend systems, application architecture, and practical product engineering.',
    ],
  },
]

export const posts = [
  {
    slug: 'building-with-ai-intent',
    title: 'Building with AI intent',
    date: 'May 18, 2026',
    category: 'AI systems',
    excerpt:
      'What changes when AI is treated as a product capability instead of a feature checkbox?',
  },
  {
    slug: 'from-manual-infrastructure-to-workflows',
    title: 'From manual infrastructure to workflows',
    date: 'April 02, 2026',
    category: 'Infrastructure',
    excerpt:
      'A practical look at reducing operational friction through reviewable, governed automation.',
  },
  {
    slug: 'the-small-details-of-developer-experience',
    title: 'The small details of developer experience',
    date: 'February 14, 2026',
    category: 'Engineering',
    excerpt: 'Why the interfaces around a system matter as much as the system itself.',
  },
]

export const contactInfo = {
  email: 'rajnishofficial02@gmail.com',
  phone: '+91 91769 60600',
  phoneHref: 'tel:+919176960600',
  linkedinHandle: '/in/rajnish7102',
  linkedinUrl: 'https://linkedin.com/in/rajnish7102',
  githubHandle: '@Rajnish-J',
  githubUrl: 'https://github.com/Rajnish-J',
  location: 'Chennai, India · GMT+5:30',
  status: 'Available for new work',
}

export const postBodies: Record<string, string[]> = {
  'building-with-ai-intent': [
    'AI becomes useful when it is connected to a real workflow, a clear responsibility, and a measurable outcome.',
    'The most durable systems I have worked on do not ask people to trust a black box. They make context visible, keep humans in the loop when the stakes require it, and give teams a way to improve the system over time.',
    'That usually means starting with the workflow rather than the model: understand the decision, map the evidence, then choose where intelligence can remove friction.',
  ],
  'from-manual-infrastructure-to-workflows': [
    'Infrastructure work tends to become painful when every environment is a one-off. The work is not just provisioning a resource; it is creating repeatable confidence around the whole lifecycle.',
    'Reviewable plans, clear ownership, drift detection, and small feedback loops can make automation feel less like magic and more like a dependable engineering practice.',
    'The result is not only faster delivery. It is a clearer system for learning from every deployment.',
  ],
  'the-small-details-of-developer-experience': [
    'Developer experience is often described as tooling, but it is really the quality of a series of moments: finding context, understanding state, making a safe change, and knowing what happened next.',
    'The smallest details compound. A useful empty state, a better error, a clear approval step, or a consistent command can save a team more time than a large feature that nobody reaches.',
    'Good internal products respect attention. They make the right path obvious without pretending the underlying work is simple.',
  ],
}
