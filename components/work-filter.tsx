'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/portfolio-data'

export function WorkFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<'all' | 'personal' | 'professional'>('all')
  const visible = projects.filter((project) => filter === 'all' || project.category === filter)
  return (
    <>
      <div className="work-tabs" role="tablist" aria-label="Filter work">
        {(['all', 'personal', 'professional'] as const).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            className={filter === item ? 'active' : ''}
            onClick={() => setFilter(item)}
          >
            {item === 'all' ? 'All work' : item === 'personal' ? 'Personal' : 'Professional'}
          </button>
        ))}
      </div>
      <div className="case-list">
        {visible.map((project) => (
          <article className="case-study" key={project.slug} id={project.slug}>
            <div className="case-index">{project.number}</div>
            <div className="case-content">
              <p className="project-kind">{project.kind}</p>
              <h2>{project.title}</h2>
              <p className="case-summary">{project.summary}</p>
              <div className="case-columns">
                <div>
                  <p className="eyebrow">Overview</p>
                  <p>{project.overview}</p>
                </div>
                <div>
                  <p className="eyebrow">My contribution</p>
                  <ul>
                    {project.contributions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="case-bottom">
                <p>
                  <strong>Outcome</strong>
                  {project.impact}
                </p>
                <Link className="text-link" href={`/projects/${project.slug}`}>
                  Open project <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
