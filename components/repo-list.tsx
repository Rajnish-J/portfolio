import { Star } from 'lucide-react'
import type { RepoStat } from '@/lib/github'

export function RepoList({ repos }: { repos: RepoStat[] }) {
  return (
    <div className="repo-list">
      {repos.map((repo) => (
        <a
          className="repo-list-item"
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          key={repo.name}
        >
          <div>
            <h3>{repo.name}</h3>
            {repo.description && <p>{repo.description}</p>}
          </div>
          <div className="repo-list-meta">
            {repo.language && (
              <span className="github-lang-mini-row">
                <span className="language-dot" style={{ background: repo.language.color }} />
                {repo.language.name}
              </span>
            )}
            <span className="repo-star-count">
              <Star size={14} /> {repo.stars}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
