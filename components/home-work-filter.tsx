'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/portfolio-data'

export function HomeWorkFilter({ projects }: { projects: Project[] }) {
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
            {item === 'all'
              ? 'All work'
              : item === 'personal'
                ? 'Personal Projects'
                : 'Office Work'}
          </button>
        ))}
      </div>
      <div className="home-work-scroll">
        <div className="project-list">
          {visible.map((project) => (
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
      </div>
    </>
  )
}
