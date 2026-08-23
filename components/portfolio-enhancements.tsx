'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Brain,
  Cloud,
  Code2,
  GitBranch,
  LayoutGrid,
  Send,
  Server,
  Wrench,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiDocker,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJira,
  SiLangchain,
  SiLanggraph,
  SiLinux,
  SiNextdotjs,
  SiNotion,
  SiOpentofu,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si'

export const socialLinks = [
  ['LinkedIn', 'https://linkedin.com/in/rajnish7102', 'in', Send],
  ['GitHub', 'https://github.com/Rajnish-J', 'gh', GitBranch],
  ['Instagram', 'https://instagram.com/_rajnish_07', 'ig', null],
  ['LeetCode', 'https://leetcode.com/u/Rajnish_2002', 'lc', Code2],
  ['X', 'https://x.com/RAJNISH65432447', 'x', Send],
] as const

const PHRASES = ['agentic tools.', 'AI systems.', 'useful products.']

function InstagramMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'social-links compact' : 'social-links'}>
      {socialLinks.map(([label, href, mark, Icon]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={`Open ${label}`}
        >
          <span className="social-mark">
            {label === 'Instagram' ? (
              <InstagramMark />
            ) : Icon ? (
              <Icon size={compact ? 15 : 17} />
            ) : (
              mark
            )}
          </span>
          <span>{compact ? '' : label}</span>
        </a>
      ))}
    </div>
  )
}

export function TypewriterHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const phrase = PHRASES[phraseIndex]
  const paused = !deleting && text === phrase
  useEffect(() => {
    if (!deleting && text === phrase) {
      const hold = window.setTimeout(() => {
        setDeleting(true)
      }, 1200)
      return () => window.clearTimeout(hold)
    }
    if (deleting && text === '') {
      // Timer-driven state transition (advance to the next phrase), not a derivable value —
      // there's no pure computation for "should we start typing the next phrase now".
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false)
      setPhraseIndex((index) => (index + 1) % PHRASES.length)
      return
    }
    const timer = window.setTimeout(
      () => setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1)),
      deleting ? 48 : 86,
    )
    return () => window.clearTimeout(timer)
  }, [deleting, phrase, phraseIndex, text])
  return (
    <h1>
      I build 
      <br />
      <em className="typewriter-word">
        {text}
        <span
          className={paused ? 'typewriter-caret is-blinking' : 'typewriter-caret'}
          aria-hidden="true"
        />
      </em>
    </h1>
  )
}

const TIERS = { 3: 'core', 2: 'working', 1: 'familiar' } as const

function TierDots({ tier }: { tier: 1 | 2 | 3 }) {
  return (
    <span className="tool-dots" aria-hidden="true">
      {[1, 2, 3].map((dot) => (
        <i key={dot} className={dot <= tier ? 'is-filled' : ''} />
      ))}
    </span>
  )
}

function SkillBadge({ icon }: { icon: IconType | string }) {
  if (typeof icon === 'string') return <span className="tool-badge">{icon}</span>
  const Icon = icon
  return (
    <span className="tool-badge">
      <Icon size={13} />
    </span>
  )
}

export function Toolkit() {
  const groups = [
    [
      'AI',
      'Building intelligent, agentic workflows',
      Brain,
      [
        ['Azure AI', 3, 'AI'],
        ['Azure OpenAI', 3, 'AO'],
        ['LangChain', 2, SiLangchain],
        ['LangGraph', 2, SiLanggraph],
        ['RAG', 3, 'RA'],
        ['MCP', 2, 'MC'],
      ],
    ],
    [
      'Backend',
      'Designing systems that last',
      Server,
      [
        ['Python', 3, SiPython],
        ['FastAPI', 3, SiFastapi],
        ['Java', 2, 'JA'],
        ['Spring Boot', 2, SiSpringboot],
        ['PostgreSQL', 2, SiPostgresql],
        ['REST APIs', 3, 'RS'],
      ],
    ],
    [
      'Product',
      'Across web and developer surfaces',
      LayoutGrid,
      [
        ['React', 3, SiReact],
        ['Next.js', 3, SiNextdotjs],
        ['TypeScript', 2, SiTypescript],
        ['Tailwind', 2, SiTailwindcss],
        ['WebSockets', 1, 'WS'],
        ['HTML/CSS', 3, SiHtml5],
      ],
    ],
    [
      'Infrastructure',
      'Shipping it and keeping it healthy',
      Cloud,
      [
        ['Azure', 2, 'AZ'],
        ['OpenTofu', 2, SiOpentofu],
        ['Terraform', 2, SiTerraform],
        ['Docker', 2, SiDocker],
        ['GitHub Actions', 2, SiGithubactions],
        ['Git', 3, SiGit],
      ],
    ],
    [
      'Tools',
      'The day-to-day workbench',
      Wrench,
      [
        ['VS Code', 3, 'VS'],
        ['Postman', 3, SiPostman],
        ['Linux', 2, SiLinux],
        ['Figma', 1, SiFigma],
        ['Jira', 2, SiJira],
        ['Notion', 2, SiNotion],
      ],
    ],
  ] as const
  return (
    <>
      <div className="toolkit-legend">
        {([3, 2, 1] as const).map((tier) => (
          <span key={tier}>
            <TierDots tier={tier} /> {TIERS[tier]}
          </span>
        ))}
      </div>
      <div className="toolkit-grid">
        {groups.map(([title, description, Icon, items], index) => (
          <article className={`toolkit-card toolkit-${index}`} key={title}>
            <div className="toolkit-icon">
              <Icon size={18} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="tool-pills">
              {items.map(([item, tier, icon]) => (
                <span key={item} title={`${item} — ${TIERS[tier]}`}>
                  <SkillBadge icon={icon} />
                  <span className="tool-name">{item}</span>
                  <TierDots tier={tier} />
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export function FloatingRole() {
  return (
    <div className="floating-role" aria-label="AI Engineer">
      <span className="status-dot" /> AI Engineer
    </div>
  )
}
export function ThemeAwareSocials() {
  return <SocialLinks compact />
}
export function DownloadIndividual({ href, label }: { href: string; label: string }) {
  return (
    <a className="document-individual" href={href} download>
      {label}
      <ArrowUpRight size={14} />
    </a>
  )
}
