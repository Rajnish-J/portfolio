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
  if (compact) {
    return (
      <div className="recent-repo-list compact">
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

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Repo</th>
            <th scope="col">Language</th>
            <th scope="col">Commits</th>
            <th scope="col">Updated</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.name}>
              <td>
                <a className="data-table-title" href={repo.url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                {repo.description && <p className="data-table-desc">{repo.description}</p>}
              </td>
              <td>
                {repo.language && (
                  <span className="github-lang-mini-row">
                    <span className="language-dot" style={{ background: repo.language.color }} />
                    {repo.language.name}
                  </span>
                )}
              </td>
              <td className="recent-repo-commits">
                {repo.commits} commit{repo.commits === 1 ? '' : 's'}
              </td>
              <td className="recent-repo-time">{formatRelativeTime(repo.pushedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
