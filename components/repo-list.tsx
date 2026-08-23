import { Star } from 'lucide-react'
import type { RepoStat } from '@/lib/github'

export function RepoList({ repos }: { repos: RepoStat[] }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Repo</th>
            <th scope="col">Language</th>
            <th scope="col">Stars</th>
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
              <td>
                <span className="repo-star-count">
                  <Star size={14} /> {repo.stars}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
