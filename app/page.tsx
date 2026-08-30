import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ContactSection } from '@/components/contact-section'
import { DocumentDownload } from '@/components/document-download'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingRole, Toolkit, TypewriterHeadline } from '@/components/portfolio-enhancements'
import { HomeWorkFilter } from '@/components/home-work-filter'
import { GithubStatGrid } from '@/components/github-stat-grid'
import { RecentRepos } from '@/components/recent-repos'
import { projects, journey, achievements, certifications, contactInfo } from '@/lib/portfolio-data'
import { getGithubDashboard } from '@/lib/github'

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
            I&apos;m Rajnish, a Software Engineer specializing in AI-powered enterprise platforms,
            developer productivity, infrastructure automation, and intelligent workflow
            orchestration — using Python, FastAPI, Next.js, React, Azure AI, and multi-agent
            architectures.
          </p>
          <div className="hero-actions">
            <DocumentDownload />
            <a className="text-link" href={`mailto:${contactInfo.email}`}>
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
        <HomeWorkFilter projects={projects} />
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
              <p>
                Building the Enterprise AI Platform and Agents Marketplace at Synergech
                Technologies.
              </p>
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
            AI-powered workflow orchestration — designing scalable systems with Python, FastAPI,
            Next.js, React, Azure AI, OpenTofu/Terraform, LLMs, RAG, and multi-agent architectures,
            with a strong background in RBAC, system design, and developer experience.
          </p>
          <p>
            I&apos;m an advanced user of Claude Code and GitHub Copilot in enterprise settings —
            Agent Mode, Edit Mode, Planning Mode, and approval-based AI-driven development workflows
            for building, documenting, testing, and reviewing code — and I pick the right model for
            the job based on reasoning complexity, speed, and context requirements.
          </p>
          <a className="text-link" href={`mailto:${contactInfo.email}`}>
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
          {journey.map((item) => (
            <div className="timeline-row" key={item.id}>
              <span>{item.date}</span>
              <div>
                <h3>{item.role}</h3>
                <p>{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="credentials" className="section-wrap section-block credentials">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recognition</p>
            <h2>
              Achievements
              <br />
              <em>& certifications.</em>
            </h2>
          </div>
          <p className="section-intro">
            A few markers along the way — recognition at work and continued learning through
            structured courses.
          </p>
        </div>
        <div className="credentials-grid">
          <div className="credential-card">
            <p className="eyebrow">Achievements</p>
            <ul className="credential-list">
              {achievements.map((item) => (
                <li key={item.title}>
                  <span>{item.title}</span>
                  <span className="credential-meta">
                    {item.org} · {item.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="credential-card">
            <p className="eyebrow">Certifications & courses</p>
            <ul className="credential-list">
              {certifications.map((item) => (
                <li key={item.title}>
                  <span>{item.title}</span>
                  <span className="credential-meta">
                    {item.issuer}
                    {'status' in item && item.status ? ` · ${item.status}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>
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
