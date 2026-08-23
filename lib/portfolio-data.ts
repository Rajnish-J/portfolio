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

const rawPosts = [
  {
    slug: 'cloud-native-summit-kerala-2026',
    title: 'Cloud Native Summit Kerala 2026: Taking Infra0 to the Cloud-Native Community',
    date: 'August 22, 2026',
    category: 'Events',
    tags: ['ai', 'cloud', 'events'],
    excerpt:
      'Representing Synergech as a Silver Sponsor at Cloud Native Summit Kerala 2026 — pitching Infra0 to ~800 cloud, DevOps, and platform engineers, meeting KodeKloud’s Mumshad Mannambeth, and coming back with sharper product feedback.',
    author: 'Rajnish J',
    coverImage: '/blogs/kerala-summit/signage-thumbs-up.webp',
  },
  {
    slug: 'mastering-nextjs-metadata',
    title: 'Why the Next.js Metadata Exists: Mastering Metadata for Scalable Applications',
    date: 'December 18, 2025',
    category: 'Engineering',
    tags: ['seo', 'engineering'],
    excerpt:
      'How layouts and metadata in the Next.js App Router unlock better SEO, cleaner architecture, and enterprise-grade scalability.',
    author: 'Rajnish J',
    coverImage:
      '/blogs/seo/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_6rtf7sjmg4zhimi24lym.webp',
  },
  {
    slug: 'git-conventional-commits',
    title: 'Git Conventional Commits',
    date: 'March 27, 2025',
    category: 'Engineering',
    tags: ['git', 'engineering'],
    excerpt:
      'A structured way of writing commit messages that standardizes version history and automates changelogs and semantic versioning.',
    author: 'Rajnish J',
    coverImage:
      '/blogs/git/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_0cmwb5zfvc9xqa53rnne.webp',
  },
  {
    slug: 'browser-use-agent',
    title: 'Exploring Browser Use Agent: The Future of AI-Powered Web Automation',
    date: 'March 2, 2025',
    category: 'AI systems',
    tags: ['ai', 'automation'],
    excerpt:
      'What Browser Use is, how it lets AI agents navigate and act on real web pages, and how it compares to Selenium, Puppeteer, and Playwright.',
    author: 'Rajnish J',
    coverImage:
      '/blogs/browser use/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_oqoyc4mdu7njqftnv800.webp',
  },
  {
    slug: 'rise-of-low-code-and-no-code',
    title: 'The Rise of Low-Code & No-Code: Should Developers Be Worried?',
    date: 'February 8, 2025',
    category: 'Engineering',
    tags: ['ai', 'engineering'],
    excerpt:
      'What Low-Code and No-Code platforms actually replace, where traditional development still wins, and how developers can adapt.',
    author: 'Rajnish J',
    coverImage:
      '/blogs/rise of low code/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_bkg93puf27pkevy7xnvu.webp',
  },
  {
    slug: 'learning-while-building',
    title: 'Learning While Building: The Best Way to Master Coding',
    date: 'January 29, 2025',
    category: 'Engineering',
    tags: ['engineering'],
    excerpt:
      'Why applying knowledge to real projects builds problem-solving skills and a portfolio that passive tutorials never do.',
    author: 'Rajnish J',
    coverImage:
      '/blogs/learning while building/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_4ebhyodpc2oizwum1yaf.webp',
  },
  {
    slug: 'power-of-apis',
    title: 'The Power of APIs in Modern Software Development',
    date: 'January 26, 2025',
    category: 'Engineering',
    tags: ['api', 'engineering'],
    excerpt:
      'Why APIs are the backbone of modern software, how REST works in practice, and a walkthrough of building one in Spring.',
    author: 'Rajnish J',
    coverImage:
      '/blogs/power of API/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_yj7lpirtvecrui3pkpkn.webp',
  },
]

export const posts = [...rawPosts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

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

export type ArticleBlock =
  | { type: 'lede'; text: string }
  | { type: 'section'; index: string; label: string; heading: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'imageGrid'; images: { src: string; alt: string; caption?: string }[] }
  | { type: 'list'; items: string[] }
  | { type: 'code'; code: string; language?: string }

export function getReadingStats(blocks: ArticleBlock[]) {
  const words = blocks
    .flatMap((block) => {
      if ('text' in block) return [block.text]
      if ('items' in block) return block.items
      return []
    })
    .join(' ')
    .replace(/\*\*/g, '')
    .split(/\s+/)
    .filter(Boolean).length
  return { words, minutes: Math.max(1, Math.round(words / 200)) }
}

export const postBodies: Record<string, ArticleBlock[]> = {
  'cloud-native-summit-kerala-2026': [
    {
      type: 'lede',
      text: 'On 22nd August 2026, our team had the opportunity to represent **Synergech** at **Cloud Native Summit Kerala 2026**, held at **Le Méridien Kochi**. The summit was an important milestone for us because we were there not only as attendees, but also to showcase, pitch, and promote **Infra0**, the AI-powered cloud platform built by our team. As a **Silver Sponsor**, we set up our booth and introduced Infra0 to a wider audience of professionals working across cloud, DevOps, Kubernetes, AI, infrastructure, and platform engineering.',
    },
    {
      type: 'image',
      src: '/blogs/kerala-summit/signage-thumbs-up.webp',
      alt: 'Standing next to the Cloud Native Summit Kerala 2026 sponsor signage at Le Méridien Kochi',
      caption: 'Outside Le Méridien Kochi, ready for day one.',
    },
    {
      type: 'section',
      index: '01',
      label: 'The turnout',
      heading: 'A room full of the right people',
    },
    {
      type: 'paragraph',
      text: 'The event brought together around **800 attendees**, including DevOps Engineers, Software Engineers, Architects, Tech Leads, Managers, developers, and technology enthusiasts. We also had the opportunity to see organizations such as **Red Hat**, **VMware**, and **KodeKloud** represented at the summit. Being surrounded by professionals with different levels of experience and perspectives made the event especially valuable for us.',
    },
    {
      type: 'image',
      src: '/blogs/kerala-summit/team-booth.jpg',
      alt: 'The Infra0 team standing at their booth at Cloud Native Summit Kerala 2026',
      caption: 'Our team at the Infra0 booth — Silver Sponsor of Cloud Native Summit Kerala 2026.',
    },
    { type: 'section', index: '02', label: 'Keynote', heading: 'Meeting Mumshad Mannambeth' },
    {
      type: 'paragraph',
      text: 'One of the biggest highlights was the opportunity to meet **Mumshad Mannambeth**, Founder and CEO of **KodeKloud**, and attend his session. Listening to his experience and insights into the DevOps and cloud-native ecosystem gave us a valuable perspective on how the industry is evolving. We also had conversations with professionals and representatives from companies such as Red Hat, along with architects, managers, and engineers attending the summit.',
    },
    {
      type: 'imageGrid',
      images: [
        {
          src: '/blogs/kerala-summit/mumshad-keynote.jpg',
          alt: 'Mumshad Mannambeth presenting on stage at Cloud Native Summit Kerala 2026',
          caption: 'Mumshad Mannambeth on stage.',
        },
        {
          src: '/blogs/kerala-summit/team-auditorium.jpg',
          alt: 'The team taking a photo in the auditorium with a KodeKloud representative',
          caption: 'With the KodeKloud team after the session.',
        },
      ],
    },
    {
      type: 'section',
      index: '03',
      label: 'At our booth',
      heading: 'Where the real feedback happened',
    },
    {
      type: 'paragraph',
      text: 'For our team, however, the most valuable part of the summit was the interaction at our booth. We demonstrated **Infra0**, explained the problems it is designed to address, and listened to how professionals currently approach similar challenges in their organizations. Many of the people we interacted with were software and DevOps professionals with several years of industry experience, and their questions and feedback helped us look at our product from perspectives that are difficult to get while building entirely within our own team.',
    },
    {
      type: 'quote',
      text: 'Some conversations challenged our existing assumptions, while others gave us new ideas about product capabilities, usability, and areas we could explore further.',
    },
    {
      type: 'paragraph',
      text: 'We also gained a better understanding of what is currently happening in the cloud-native and DevOps market, the challenges teams are facing, and the expectations professionals have from modern infrastructure platforms. Seeing genuine curiosity around Infra0 and having a consistently active booth made the experience even more rewarding. We also enjoyed connecting with attendees through discussions, networking, and Infra0 goodies.',
    },
    {
      type: 'imageGrid',
      images: [
        {
          src: '/blogs/kerala-summit/booth-crowd.jpg',
          alt: 'A crowd of attendees gathered around the Infra0 booth',
          caption: 'Explaining Infra0 to visitors at the booth.',
        },
        {
          src: '/blogs/kerala-summit/team-demo.jpg',
          alt: 'The Infra0 team walking attendees through a live product demo on laptops',
          caption: 'Walking through a live Infra0 demo.',
        },
      ],
    },
    {
      type: 'section',
      index: '04',
      label: 'What we learned',
      heading: 'Sessions, and the gap between building and presenting',
    },
    {
      type: 'paragraph',
      text: 'Beyond showcasing the product, we attended several sessions throughout the summit and gained insights into current technologies, practices, and trends across the cloud-native ecosystem. The combination of technical sessions and direct conversations made the event a valuable learning experience.',
    },
    {
      type: 'image',
      src: '/blogs/kerala-summit/sudheesh-keynote.jpg',
      alt: 'Sudheesh Sudhakaran presenting Platform Engineering 2.0 on stage',
      caption: 'Sudheesh Sudhakaran presenting Platform Engineering 2.0.',
    },
    {
      type: 'paragraph',
      text: 'Most importantly, the summit showed us the difference between building a product within a team and presenting it to people from diverse technical backgrounds and real-world environments. We returned with new connections, practical feedback, fresh perspectives, and a clearer understanding of what we can improve and work towards next.',
    },
    {
      type: 'paragraph',
      text: 'Cloud Native Summit Kerala 2026 was therefore more than an event for us. It was an opportunity to represent **Synergech**, take **Infra0** to the community, learn from experienced professionals, validate our thinking, and understand the market better. It was a memorable experience for our team and an important step in our journey of building and improving Infra0.',
    },
  ],
  'mastering-nextjs-metadata': [
    {
      type: 'lede',
      text: 'Before the App Router, large Next.js applications commonly suffered from repeating `<Head>` logic across pages, authentication checks scattered everywhere, and poor separation between layout, logic, and content. The App Router introduces two primitives to fix that: **layouts** for persistent structure, and **metadata** for declarative, server-side document configuration.',
    },
    {
      type: 'image',
      src: '/blogs/seo/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_6rtf7sjmg4zhimi24lym.webp',
      alt: 'Why the Next.js Metadata Exists: Mastering Metadata for Scalable Applications',
    },
    { type: 'section', index: '01', label: 'The basics', heading: 'What is metadata in Next.js?' },
    {
      type: 'paragraph',
      text: 'In the App Router, `metadata` is a server-side API that declaratively controls everything inside `<head>` — no `<Head>` component, no client-side hydration issues, and it is fully SEO-safe.',
    },
    {
      type: 'code',
      code: 'export const metadata = {\n  title: "Dashboard",\n  description: "User dashboard for managing projects",\n}',
    },
    {
      type: 'list',
      items: [
        '<title> and <meta name="description">',
        'Open Graph tags and Twitter cards',
        'Icons, favicons, and canonical URLs',
        'Robots rules for crawl control',
      ],
    },
    {
      type: 'section',
      index: '02',
      label: 'Cascading',
      heading: 'How metadata inheritance works',
    },
    {
      type: 'paragraph',
      text: 'Metadata follows the same cascading model as layouts: a global `app/layout.tsx` sets the baseline, a nested `app/dashboard/layout.tsx` narrows it, and Next.js automatically merges the two into the final `<head>` output — no string concatenation, no duplication.',
    },
    {
      type: 'code',
      code: '// app/layout.tsx\nexport const metadata = {\n  title: "My Application",\n  description: "A modern web application built with Next.js",\n}\n\n// app/dashboard/layout.tsx\nexport const metadata = {\n  title: "Dashboard",\n}\n\n// Final output: <title>Dashboard | My Application</title>',
    },
    {
      type: 'section',
      index: '03',
      label: 'Beyond UI',
      heading: 'Layouts are structure and logic, not just a wrapper',
    },
    {
      type: 'list',
      items: [
        'Persistent across navigations — mounted once, not re-rendered on route changes',
        'Server-aware, and executed before the page renders',
        'Responsible for structure *and* logic, not just markup',
      ],
    },
    {
      type: 'code',
      code: '// app/layout.tsx\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <Sidebar />\n        <main>{children}</main>\n      </body>\n    </html>\n  )\n}',
    },
    {
      type: 'paragraph',
      text: 'Because it does not remount on navigation, this layout preserves sidebar state, contexts, and even open WebSocket connections between page transitions.',
    },
    {
      type: 'section',
      index: '04',
      label: 'SEO',
      heading: 'Real benefits and hidden wins',
    },
    {
      type: 'paragraph',
      text: '**Crawl efficiency.** Blocking indexing on internal or dashboard routes saves crawl budget and avoids diluting the SEO signal from non-public URLs.',
    },
    {
      type: 'code',
      code: 'export const metadata = {\n  robots: { index: false, follow: false },\n}',
    },
    {
      type: 'paragraph',
      text: '**Dynamic metadata.** `generateMetadata` runs server-side, can read from a database securely, and is fully crawlable and cached — perfect for blogs, documentation, and marketplaces.',
    },
    {
      type: 'code',
      code: 'export async function generateMetadata({ params }) {\n  const article = await getArticle(params.slug)\n\n  return {\n    title: article.title,\n    description: article.excerpt,\n    openGraph: { images: [article.ogImage] },\n  }\n}',
    },
    {
      type: 'paragraph',
      text: '**Route-scoped SEO.** Layouts let you cleanly isolate rules by section — marketing stays indexable, the app itself stays noindexed, admin stays blocked — with no runtime conditionals.',
    },
    {
      type: 'section',
      index: '05',
      label: 'Access control',
      heading: 'Security lives naturally in layouts',
    },
    {
      type: 'code',
      code: '// app/dashboard/layout.tsx\nimport { redirect } from "next/navigation"\n\nexport default async function DashboardLayout({ children }) {\n  const session = await getSession()\n  if (!session) redirect("/login")\n  return <>{children}</>\n}',
    },
    {
      type: 'quote',
      text: 'Layouts control UI access, not API security. Always enforce authorization on the backend.',
    },
    {
      type: 'section',
      index: '06',
      label: 'Trade-offs',
      heading: 'Pros, cons, and when to skip this',
    },
    {
      type: 'list',
      items: [
        'Clean, SEO-first architecture with server-side metadata',
        'Persistent UI that scales well and reduces duplication',
        'Learning curve — over-nesting layouts adds complexity',
        'Metadata merging across layers can confuse newcomers',
      ],
    },
    {
      type: 'paragraph',
      text: 'Skip layouts when the UI is not persistent or the page is a one-off (a modal, a redirect). Skip metadata when content changes too frequently to matter, or SEO has no value at all, as with internal tools.',
    },
    {
      type: 'paragraph',
      text: 'The App Router is not just a routing system — it is an application architecture framework. Layouts define structure, responsibility, and persistence; metadata defines SEO, visibility, and document identity. Adopting both early saves significant refactoring effort later.',
    },
  ],
  'git-conventional-commits': [
    {
      type: 'lede',
      text: 'Git Conventional Commits is a structured way of writing commit messages that follow a specific format. It standardizes how developers describe changes, making version history more readable and automating processes like changelog generation and semantic versioning.',
    },
    {
      type: 'image',
      src: '/blogs/git/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_0cmwb5zfvc9xqa53rnne.webp',
      alt: 'Git Conventional Commits',
    },
    {
      type: 'section',
      index: '01',
      label: 'The format',
      heading: 'What is a conventional commit?',
    },
    {
      type: 'paragraph',
      text: 'A conventional commit message follows a simple pattern: `type(scope): description`.',
    },
    {
      type: 'code',
      code: 'feat(auth): add JWT authentication for secure login\nfix(ui): resolve alignment issue in navbar',
    },
    { type: 'section', index: '02', label: 'Why it matters', heading: 'Why is it important?' },
    {
      type: 'list',
      items: [
        '**Improves readability** — makes it easier to understand what changed and why',
        '**Enhances collaboration** — teammates can scan commits without confusion',
        '**Automates versioning** — semantic-release can identify breaking changes, features, and fixes automatically',
        '**Simplifies release notes** — changelogs generate straight from commit history',
      ],
    },
    {
      type: 'paragraph',
      text: 'Following this format consistently also improves traceability — each commit explains its purpose, which pays off during debugging — and plugs directly into CI/CD tooling like `semantic-release` and `commitizen`.',
    },
    {
      type: 'section',
      index: '03',
      label: 'In practice',
      heading: 'Real-time examples',
    },
    {
      type: 'code',
      code: 'feat(button): add primary button component\nfix(login): resolve incorrect password validation\nrefactor(auth): simplify login function\nperf(api): optimize user search query\ntest(profile): add unit tests for profile updates\ndocs(readme): update installation instructions\nrevert(auth): rollback OAuth2 integration',
    },
    {
      type: 'quote',
      text: 'Using conventional commits makes a developer look more professional and disciplined — employers and team leads value clear documentation in commit history.',
    },
    {
      type: 'paragraph',
      text: 'Adopting Git Conventional Commits improves code quality, collaboration, and automation. It ensures a well-maintained repository with a clear history, making life easier for developers, reviewers, and CI/CD pipelines alike.',
    },
  ],
  'browser-use-agent': [
    {
      type: 'lede',
      text: 'Automation is playing a crucial role in streamlining web interactions — data extraction, form submissions, navigation across multiple pages. One tool making waves in this space is **Browser Use**, an open-source project that lets AI agents interact with web browsers like a human would.',
    },
    {
      type: 'image',
      src: '/blogs/browser use/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_oqoyc4mdu7njqftnv800.webp',
      alt: 'Exploring Browser Use Agent: The Future of AI-Powered Web Automation',
    },
    { type: 'section', index: '01', label: 'What it is', heading: 'What is Browser Use?' },
    {
      type: 'paragraph',
      text: 'Browser Use extracts interactive elements from websites and allows AI to navigate, fill forms, click buttons, and perform complex workflows — combining visual understanding with HTML structure extraction rather than requiring explicit, brittle scripts.',
    },
    {
      type: 'list',
      items: [
        '**Vision + HTML extraction** — combines visual understanding with structural extraction',
        '**Multi-tab management** — handles multiple browser tabs automatically',
        '**Element tracking** — tracks clicked elements’ XPaths for accurate automation',
        '**Self-correction** — intelligent error handling and auto-recovery',
        '**LLM support** — works with models like GPT-4, Claude, and Llama',
      ],
    },
    { type: 'section', index: '02', label: 'Origins', heading: 'Where it came from' },
    {
      type: 'paragraph',
      text: 'Selenium, Puppeteer, and Playwright have long been the industry leaders in web automation, but each requires explicit coding for every interaction. Browser Use simplifies this by integrating AI-driven decision-making, making it far more adaptable to dynamic web pages. Backed by Y Combinator and open-sourced under the MIT License, it has passed 34,000 GitHub stars.',
    },
    {
      type: 'section',
      index: '03',
      label: 'Getting started',
      heading: 'A basic automation example',
    },
    {
      type: 'code',
      code: 'from browser_use import BrowserAgent\n\nagent = BrowserAgent()\nagent.open("https://example.com/login")\nagent.type("input[name=\'username\']", "your_username")\nagent.type("input[name=\'password\']", "your_password")\nagent.click("button[type=\'submit\']")\nprint("Login successful!")',
      language: 'python',
    },
    {
      type: 'paragraph',
      text: 'This eliminates the need for manual interaction entirely: initialize the agent, open the page, fill the fields, click submit — done.',
    },
    {
      type: 'section',
      index: '04',
      label: 'Trade-offs',
      heading: 'Advantages and disadvantages',
    },
    {
      type: 'list',
      items: [
        'AI-powered decision making with no need for extensive scripting',
        'Faster automation that holds up on complex, dynamic websites',
        'Self-healing when a page’s structure shifts',
        'Still early in development, with occasional compatibility issues',
        'Highly dynamic sites can still need fine-tuning',
      ],
    },
    {
      type: 'section',
      index: '05',
      label: 'A fuller example',
      heading: 'Multi-tab extraction in practice',
    },
    {
      type: 'code',
      code: 'from browser_use import BrowserAgent\n\nagent = BrowserAgent()\nagent.open("https://news.ycombinator.com")\ntitles = agent.extract_all(".title a")\n\nfor index, title in enumerate(titles[:5]):\n    print(f"{index + 1}. {title.text}")',
      language: 'python',
    },
    {
      type: 'quote',
      text: 'Browser Use is redefining the way AI interacts with web browsers — removing the need for complex scripts and making web automation more intuitive.',
    },
    {
      type: 'paragraph',
      text: 'As the project evolves, expect it to become a staple in AI-powered automation, extending to more languages and deeper integration with the next generation of LLMs.',
    },
  ],
  'rise-of-low-code-and-no-code': [
    {
      type: 'lede',
      text: 'Low-Code and No-Code platforms let people with little or no programming knowledge build applications using visual interfaces, drag-and-drop tools, and pre-built components. For professional developers, this raises an obvious question: will these platforms replace traditional coding jobs?',
    },
    {
      type: 'image',
      src: '/blogs/rise of low code/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_bkg93puf27pkevy7xnvu.webp',
      alt: 'The Rise of Low-Code & No-Code: Should Developers Be Worried?',
    },
    {
      type: 'section',
      index: '01',
      label: 'Definitions',
      heading: 'What are Low-Code and No-Code platforms?',
    },
    {
      type: 'paragraph',
      text: '**No-Code** platforms are built for non-technical users — business professionals, marketers, entrepreneurs — who want to ship an application without a developer, using tools like Bubble, Wix, and Zapier.',
    },
    {
      type: 'paragraph',
      text: '**Low-Code** platforms target developers who want to move faster by minimizing repetitive coding, while still allowing custom code where it matters — think OutSystems, Mendix, and Microsoft Power Apps.',
    },
    {
      type: 'section',
      index: '02',
      label: 'The upside',
      heading: 'Advantages',
    },
    {
      type: 'list',
      items: [
        '**Faster development** — months of work compressed into weeks or days',
        '**Lower cost** — no need to hire a full development team',
        '**Accessibility** — empowers non-developers to ship real solutions',
        '**Reduced maintenance** — the platform manages most backend operations',
        '**Increased agility** — teams adapt quickly to changing needs',
      ],
    },
    {
      type: 'section',
      index: '03',
      label: 'The catch',
      heading: 'Limitations',
    },
    {
      type: 'list',
      items: [
        '**Limited customization** — predefined templates cap flexibility',
        '**Scalability issues** — complex, high-traffic logic can outgrow the platform',
        '**Security risks** — hosting on third-party infrastructure raises compliance questions',
        '**Vendor lock-in** — migrating off a platform can be costly',
        '**Provider dependency** — a shutdown or pricing change can strand an application',
      ],
    },
    {
      type: 'section',
      index: '04',
      label: 'The real question',
      heading: 'Will these platforms replace developers?',
    },
    {
      type: 'paragraph',
      text: 'Not fully. Enterprise-grade applications with AI, machine learning, or real-time processing still require manual coding. Regulated industries need custom security and compliance work. Legacy integrations and genuinely custom features still need traditional development — and the platforms themselves are built by professional developers.',
    },
    {
      type: 'section',
      index: '05',
      label: 'Adapting',
      heading: 'How developers can respond',
    },
    {
      type: 'list',
      items: [
        'Learn to integrate Low-Code tools into hybrid solutions rather than avoiding them',
        'Specialize in custom software, API development, and cloud computing',
        'Focus on advanced areas — AI, blockchain, DevOps, cybersecurity — that remain out of reach for No-Code tools',
        'Master system design, scalability, and microservices architecture',
        'Collaborate with business users to bridge technical and non-technical needs',
      ],
    },
    {
      type: 'quote',
      text: 'Developers who embrace these tools will stay ahead in the evolving tech landscape.',
    },
    {
      type: 'paragraph',
      text: 'Low-Code and No-Code platforms are not a threat — they are tools that speed up development and free developers to focus on complex problem-solving and innovation instead of repetitive scaffolding.',
    },
  ],
  'learning-while-building': [
    {
      type: 'lede',
      text: 'There is a clear distinction between learning to code and mastering it. Tutorials and courses introduce the concepts, but **learning while building** — applying knowledge to real projects — is what turns that theory into problem-solving skill and a portfolio that actually proves it.',
    },
    {
      type: 'image',
      src: '/blogs/learning while building/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_4ebhyodpc2oizwum1yaf.webp',
      alt: 'Learning While Building: The Best Way to Master Coding',
    },
    {
      type: 'section',
      index: '01',
      label: 'Why it works',
      heading: 'Hands-on experience reinforces learning',
    },
    {
      type: 'paragraph',
      text: 'Reading tutorials or watching videos is a passive experience — it explains the theory but rarely shows how things behave in a real application. Building requires getting your hands dirty and troubleshooting along the way, which is where understanding actually sticks.',
    },
    {
      type: 'paragraph',
      text: 'If you’re learning React, skip the counter-app tutorial. Build a real-time weather app that fetches from an API instead — you’ll pick up asynchronous code, state management, and working with external services along the way.',
    },
    {
      type: 'section',
      index: '02',
      label: 'The real skill',
      heading: 'Developing problem-solving ability',
    },
    {
      type: 'paragraph',
      text: 'Real projects introduce bugs and challenges that are rarely linear. Implementing user authentication looks simple until you hit security, sessions, cookies, and environment differences — and working through those hurdles teaches the "why" behind the solution, not just the "how".',
    },
    {
      type: 'section',
      index: '03',
      label: 'Proof, not promises',
      heading: 'Building a portfolio that actually shows something',
    },
    {
      type: 'paragraph',
      text: 'Employers want to see what you can build, not just a certificate. Every project you finish while learning becomes tangible proof of capability — a full-stack app hosted on GitHub or Vercel says more in an interview than a stack of completed coding challenges.',
    },
    {
      type: 'section',
      index: '04',
      label: 'Past the classroom',
      heading: 'Understanding real-world scenarios',
    },
    {
      type: 'paragraph',
      text: 'Tutorials teach isolated concepts. Real software involves managing multiple systems, structuring databases, calling external APIs, and shipping something production-ready — skills you only build by actually doing them, like handling payments, securing user data, and dealing with pagination at scale.',
    },
    {
      type: 'section',
      index: '05',
      label: 'A path to follow',
      heading: 'How to learn while building',
    },
    {
      type: 'list',
      items: [
        '**Choose a stack based on your goal** — HTML/CSS/JS/React for frontend, Node/Express + Postgres or MongoDB for backend, MERN or MEAN for full-stack',
        '**Start small** — a to-do list, a weather app, a calculator to get comfortable with syntax and structure',
        '**Scale to intermediate projects** — a blog platform with auth, an expense tracker, a real-time chat app with WebSockets',
        '**Push into advanced, production-shaped work** — an e-commerce platform, an appointment system, an AI-powered chatbot',
      ],
    },
    {
      type: 'section',
      index: '06',
      label: 'When you get stuck',
      heading: 'Overcoming challenges while building',
    },
    {
      type: 'list',
      items: [
        'Stuck on a problem? Use documentation, Stack Overflow, and search before giving up',
        'Code not working? Lean on console logs, breakpoints, and DevTools — debugging is the job, not a detour from it',
        'Out of ideas? Browse GitHub, join a hackathon, or build something that solves a problem you actually have',
      ],
    },
    {
      type: 'quote',
      text: 'The more you build, the better you become. Start small, scale up, and keep learning by doing.',
    },
    {
      type: 'paragraph',
      text: 'Learning to code is not memorizing syntax — it is understanding how to solve problems and apply knowledge to something useful. The road isn’t always easy, but hands-on experience is what gets you there.',
    },
  ],
  'power-of-apis': [
    {
      type: 'lede',
      text: 'APIs — Application Programming Interfaces — have become the backbone of modern software systems. They let different applications communicate with one another, breaking down silos and enabling seamless integration across web apps, mobile apps, and third-party services.',
    },
    {
      type: 'image',
      src: '/blogs/power of API/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_yj7lpirtvecrui3pkpkn.webp',
      alt: 'The Power of APIs in Modern Software Development',
    },
    { type: 'section', index: '01', label: 'The concept', heading: 'What is an API?' },
    {
      type: 'paragraph',
      text: 'An API is a set of rules and protocols that lets one piece of software talk to another, abstracting away the complexity of the underlying system. Think of it like a restaurant menu — you don’t need to know how the kitchen works, you just order from the menu.',
    },
    { type: 'section', index: '02', label: 'Everywhere you look', heading: 'Where APIs are used' },
    {
      type: 'list',
      items: [
        '**Web development** — connecting the frontend to backend services for live data and real-time interaction',
        '**Mobile apps** — fetching data, processing transactions, and personalizing experiences',
        '**Cloud services** — managing storage, compute, and databases programmatically',
        '**IoT** — letting smart devices talk to each other and to central servers',
        '**Third-party integrations** — payments, social platforms, and mapping tools',
      ],
    },
    { type: 'section', index: '03', label: 'Why they matter', heading: 'Advantages of APIs' },
    {
      type: 'list',
      items: [
        '**Modularity** — break an application into smaller, manageable components',
        '**Reusability** — integrate existing services instead of reinventing them',
        '**Scalability** — offload heavy tasks like image processing to specialized services',
        '**Interoperability** — connect systems built on entirely different stacks',
      ],
    },
    {
      type: 'section',
      index: '04',
      label: 'The request cycle',
      heading: 'How APIs work on the internet',
    },
    {
      type: 'paragraph',
      text: 'A client sends an HTTP request to an endpoint, the server processes it (often against a database), and sends back a response — usually JSON — with a status code describing the outcome.',
    },
    {
      type: 'list',
      items: [
        '**GET** retrieves data — fetching a list of books from `/api/books`',
        '**POST** creates a resource — adding a new book',
        '**PUT** updates a resource fully, **PATCH** updates it partially',
        '**DELETE** removes a resource',
      ],
    },
    {
      type: 'list',
      items: [
        '**2xx Success** — 200 OK, 201 Created, 204 No Content',
        '**3xx Redirection** — 301 Moved Permanently, 302 Found',
        '**4xx Client error** — 400 Bad Request, 401 Unauthorized, 404 Not Found',
        '**5xx Server error** — 500 Internal Server Error, 503 Service Unavailable',
      ],
    },
    { type: 'section', index: '05', label: 'REST, specifically', heading: 'What is a REST API?' },
    {
      type: 'paragraph',
      text: 'REST is an architectural style built on top of HTTP, defined by statelessness, a clear client-server separation, cacheable responses, and a uniform interface using standard HTTP methods — which is exactly what makes REST APIs simple to build, scale, and integrate.',
    },
    {
      type: 'section',
      index: '06',
      label: 'Building one',
      heading: 'A REST API in Spring: a practical example',
    },
    {
      type: 'paragraph',
      text: 'A minimal bookstore API: an entity, a repository, a service layer, and a controller.',
    },
    {
      type: 'code',
      code: '@Entity\npublic class Book {\n  @Id\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\n  private Long id;\n  private String title;\n  private String author;\n  private Double price;\n  // Getters and Setters\n}\n\n@Repository\npublic interface BookRepository extends JpaRepository<Book, Long> {\n}',
      language: 'java',
    },
    {
      type: 'code',
      code: '@Service\npublic class BookService {\n  private final BookRepository bookRepository;\n\n  @Autowired\n  public BookService(BookRepository bookRepository) {\n    this.bookRepository = bookRepository;\n  }\n\n  public List<Book> getAllBooks() {\n    return bookRepository.findAll();\n  }\n\n  public Book createBook(Book book) {\n    return bookRepository.save(book);\n  }\n}',
      language: 'java',
    },
    {
      type: 'image',
      src: '/blogs/power of API/IMG-20260823-WA0122.jpg',
      alt: 'Working through an API design problem',
      caption: 'From the field.',
    },
    {
      type: 'code',
      code: '@RestController\n@RequestMapping("/api/books")\npublic class BookController {\n  private final BookService bookService;\n\n  @Autowired\n  public BookController(BookService bookService) {\n    this.bookService = bookService;\n  }\n\n  @GetMapping\n  public List<Book> getAllBooks() {\n    return bookService.getAllBooks();\n  }\n\n  @PostMapping\n  public Book createBook(@RequestBody Book book) {\n    return bookService.createBook(book);\n  }\n}',
      language: 'java',
    },
    {
      type: 'quote',
      text: 'APIs are not just tools — they’re the foundation of interconnected, dynamic, and scalable systems that power the digital world.',
    },
    {
      type: 'paragraph',
      text: 'By leveraging APIs, developers can focus on core functionality while relying on external services for authentication, payments, or data processing — building applications that are modular, scalable, and built to integrate.',
    },
  ],
}
