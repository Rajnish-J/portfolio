import type { RecentRepo } from '@/lib/github'

function formatRelativeTime(dateString: string) {
  const days = Math.max(
    0,
    Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24)),
  )
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export function RecentRepos({ repos, compact }: { repos: RecentRepo[]; compact?: boolean }) {
  return (
    <div className={compact ? 'recent-repo-list compact' : 'recent-repo-list'}>
      {repos.map((repo) => (
        <a
          className="recent-repo-item"
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          key={repo.name}
        >
          <div>
            <h3>{repo.name}</h3>
            {!compact && repo.description && <p>{repo.description}</p>}
          </div>
          <div className="recent-repo-meta">
            {repo.language && (
              <span className="github-lang-mini-row">
                <span className="language-dot" style={{ background: repo.language.color }} />
                {repo.language.name}
              </span>
            )}
            <span className="recent-repo-commits">
              {repo.commits} commit{repo.commits === 1 ? '' : 's'}
            </span>
            <span className="recent-repo-time">{formatRelativeTime(repo.pushedAt)}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
