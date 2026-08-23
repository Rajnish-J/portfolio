import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ContactSection } from '@/components/contact-section'
import { DocumentDownload } from '@/components/document-download'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingRole, Toolkit, TypewriterHeadline } from '@/components/portfolio-enhancements'
import { GithubStatGrid } from '@/components/github-stat-grid'
import { RecentRepos } from '@/components/recent-repos'
import { projects, contactInfo } from '@/lib/portfolio-data'
import { getGithubDashboard } from '@/lib/github'

const journey = [
  [
    'May 2025 — now',
    'Software Engineer',
    'Promoted at Synergech Technologies. Building enterprise platforms, agentic workflows, and AI-assisted products.',
  ],
  [
    'Feb 2025 — Apr 2025',
    'Software Engineer Intern',
    'Built document processing, workflow automation, and backend integrations for enterprise proof-of-concepts.',
  ],
  [
    'Aug 2024 — Jan 2025',
    'Graduate Engineer Trainee',
    'Developed Spring Boot and React applications while sharpening systems and architecture fundamentals.',
  ],
  [
    '2020 — 2024',
    'Engineering journey',
    'Studied Electronics & Communication Engineering at Panimalar Engineering College. CGPA: 8.78.',
  ],
]

export default async function Page() {
  const githubStats = await getGithubDashboard('Rajnish-J')
  return (
    <main>
      <SiteHeader variant="home" />

      <section id="top" className="hero section-wrap">
        <div className="hero-copy reveal">
          <p className="eyebrow">
            <span className="status-dot" /> Available for thoughtful work
          </p>
          <TypewriterHeadline />
          <p className="hero-lede">
            I&apos;m Rajnish, an AI engineer shaping AI-powered platforms, developer tools, and
            infrastructure workflows that make complex work feel simple.
          </p>
          <div className="hero-actions">
            <DocumentDownload />
            <a className="text-link" href="mailto:rajnishofficial02@gmail.com">
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-meta">
            <span>Based in Chennai, India</span>
            <span>AI Engineer · 2025—now</span>
          </div>
        </div>
        <div className="hero-portrait reveal reveal-delay">
          <div className="portrait-frame">
            <Image
              src="/rajnish-portrait.png"
              alt="Rajnish J in a suit, smiling outdoors"
              fill
              priority
              sizes="(max-width: 800px) 92vw, 430px"
            />
          </div>
          <span className="portrait-note">
            01 / 01
            <br />
            <span>current chapter</span>
          </span>
          <FloatingRole />
        </div>
      </section>

      <section className="marquee" aria-label="Areas of practice">
        <div className="marquee-track">
          <span>AI systems</span>
          <i>✳</i>
          <span>Product engineering</span>
          <i>✳</i>
          <span>Infrastructure</span>
          <i>✳</i>
          <span>Developer experience</span>
          <i>✳</i>
          <span>AI systems</span>
        </div>
      </section>

      <section id="work" className="section-wrap section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>
              Built for the
              <br />
              <em>real world.</em>
            </h2>
          </div>
          <p className="section-intro">
            The best work sits at the intersection of a hard problem, a clear product instinct, and
            engineering that holds up under pressure.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <a className="project-row" key={project.slug} href={`/projects/${project.slug}`}>
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <p className="project-kind">{project.kind}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-list">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-impact">
                <p className="eyebrow">Outcome</p>
                <p>{project.impact}</p>
                <ArrowUpRight size={19} />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="status-band">
        <div className="section-wrap status-grid">
          <div>
            <p className="eyebrow">Right now</p>
            <h2>
              Making the
              <br />
              <em>complicated</em> useful.
            </h2>
          </div>
          <div className="status-items">
            <div>
              <span className="status-index">01</span>
              <p>Building AI-assisted enterprise software at Synergech Technologies.</p>
            </div>
            <div>
              <span className="status-index">02</span>
              <p>Going deeper on agentic systems, MCP integrations, and AI-native workflows.</p>
            </div>
            <div>
              <span className="status-index">03</span>
              <p>Always open to a good conversation about ambitious technical products.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-wrap section-block about-grid">
        <div>
          <p className="eyebrow">A little context</p>
          <h2>
            Engineer by craft.
            <br />
            <em>Curious by default.</em>
          </h2>
        </div>
        <div className="about-copy">
          <p className="large-copy">
            I&apos;m interested in the space where product thinking, systems design, and emerging
            technology meet.
          </p>
          <p>
            My work spans full-stack applications, cloud governance, infrastructure automation, and
            AI-powered workflow orchestration. I care about clean abstractions, useful interfaces,
            and the small details that help teams move with confidence.
          </p>
          <a className="text-link" href="mailto:rajnishofficial02@gmail.com">
            Start a conversation <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section id="toolkit" className="section-wrap section-block toolkit">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Toolkit</p>
            <h2>
              Tools for
              <br />
              <em>making things.</em>
            </h2>
          </div>
          <p className="section-intro">
            A practical stack, always evolving. I reach for the right level of abstraction for the
            problem at hand.
          </p>
        </div>
        <Toolkit />
      </section>

      <section id="github" className="section-wrap section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Open source</p>
            <h2>
              Still
              <br />
              <em>shipping.</em>
            </h2>
          </div>
          <p className="section-intro">
            A live pull from {contactInfo.githubHandle} — the public slice of what I build.
          </p>
        </div>
        {githubStats ? (
          <>
            <GithubStatGrid stats={githubStats} />
            {githubStats.recentRepos.length > 0 && (
              <RecentRepos repos={githubStats.recentRepos.slice(0, 3)} compact />
            )}
            <a className="text-link github-cta" href="/github">
              See the full dashboard <ArrowUpRight size={16} />
            </a>
          </>
        ) : (
          <p className="section-intro">
            Stats aren&apos;t connected yet.{' '}
            <a className="text-link" href={contactInfo.githubUrl} target="_blank" rel="noreferrer">
              View the profile directly <ArrowUpRight size={16} />
            </a>
          </p>
        )}
      </section>

      <section id="journey" className="section-wrap section-block journey">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The journey</p>
            <h2>
              Still in
              <br />
              <em>motion.</em>
            </h2>
          </div>
          <p className="section-intro">
            A few chapters so far — each one adding a new lens for solving problems and building
            with care.
          </p>
        </div>
        <div className="timeline">
          {journey.map(([date, role, description]) => (
            <div className="timeline-row" key={date}>
              <span>{date}</span>
              <div>
                <h3>{role}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section section-block">
        <div className="section-wrap">
          <p className="eyebrow">Have a good problem?</p>
          <h2>
            Let&apos;s make
            <br />
            <em>something useful.</em>
          </h2>
          <p className="contact-lede">
            Whether you&apos;re building a product, untangling a system, or just want to compare
            notes — my inbox is open.
          </p>
          <ContactSection />
        </div>
      </section>

      <SiteFooter>
        <span>Designed &amp; built with intent.</span>
      </SiteFooter>
    </main>
  )
}
