'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  LayoutGrid,
  Send,
  Server,
  ShieldCheck,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import { contactInfo } from '@/lib/portfolio-data'
import {
  SiClaude,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiGithubcopilot,
  SiGo,
  SiJavascript,
  SiLangchain,
  SiLanggraph,
  SiMysql,
  SiNeon,
  SiNextdotjs,
  SiOpentofu,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si'

export const socialLinks = [
  ['LinkedIn', contactInfo.linkedinUrl, 'in', Send],
  ['GitHub', contactInfo.githubUrl, 'gh', GitBranch],
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
      'Languages',
      'The building blocks, day to day',
      Code2,
      [
        ['Python', 3, SiPython],
        ['TypeScript', 3, SiTypescript],
        ['JavaScript', 2, SiJavascript],
        ['Java', 2, 'JA'],
        ['Go', 1, SiGo],
      ],
    ],
    [
      'Frontend',
      'Interfaces people actually enjoy using',
      LayoutGrid,
      [
        ['React.js', 3, SiReact],
        ['Next.js', 3, SiNextdotjs],
        ['Tailwind CSS', 3, SiTailwindcss],
      ],
    ],
    [
      'Backend',
      'Designing systems that last',
      Server,
      [
        ['FastAPI', 3, SiFastapi],
        ['Spring Boot', 2, SiSpringboot],
        ['REST APIs', 3, 'RS'],
        ['WebSockets', 1, 'WS'],
        ['Microservices', 2, 'MS'],
      ],
    ],
    [
      'AI',
      'Building intelligent, agentic workflows',
      Brain,
      [
        ['Azure AI Foundry', 3, 'AI'],
        ['Azure OpenAI', 3, 'AO'],
        ['LangChain', 2, SiLangchain],
        ['LangGraph', 2, SiLanggraph],
        ['RAG', 3, 'RA'],
        ['MCP', 2, 'MC'],
        ['AI SDK', 2, 'SD'],
        ['Claude Code', 3, SiClaude],
        ['GitHub Copilot', 2, SiGithubcopilot],
        ['Prompt Engineering', 3, 'PE'],
        ['AI Agents', 3, 'AG'],
      ],
    ],
    [
      'Infrastructure',
      'Shipping it and keeping it healthy',
      Cloud,
      [
        ['OpenTofu', 3, SiOpentofu],
        ['Terraform', 2, SiTerraform],
        ['GitHub Actions', 2, SiGithubactions],
        ['Docker', 2, SiDocker],
        ['Git', 3, SiGit],
      ],
    ],
    [
      'Database',
      'Where the state actually lives',
      Database,
      [
        ['PostgreSQL', 3, SiPostgresql],
        ['MySQL', 2, SiMysql],
        ['NeonDB', 2, SiNeon],
      ],
    ],
    [
      'Architecture',
      'The patterns that hold enterprise systems together',
      ShieldCheck,
      [
        ['RBAC', 3, 'RB'],
        ['Authentication', 3, 'AU'],
        ['Authorization', 2, 'AZ'],
        ['Caching', 2, 'CA'],
        ['Multi-Tenant Systems', 2, 'MT'],
        ['System Design', 3, 'SY'],
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
            <Icon className="toolkit-watermark" aria-hidden="true" />
            <div className="toolkit-card-header">
              <div className="toolkit-icon">
                <Icon size={18} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
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
