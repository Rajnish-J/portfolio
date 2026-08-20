import type { GithubDashboard } from '@/lib/github'

export function GithubStatGrid({ stats }: { stats: GithubDashboard }) {
  const topLanguages = stats.languages.slice(0, 3)
  return (
    <div className="github-stat-grid">
      <div className="github-stat-card">
        <p className="github-stat-label">Contributions / 12mo</p>
        <p className="github-stat-value">{stats.totalContributions}</p>
      </div>
      <div className="github-stat-card">
        <p className="github-stat-label">Public repos</p>
        <p className="github-stat-value">{stats.publicRepoCount}</p>
      </div>
      <div className="github-stat-card">
        <p className="github-stat-label">Stars earned</p>
        <p className="github-stat-value">{stats.totalStars}</p>
      </div>
      <div className="github-stat-card">
        <p className="github-stat-label">Top languages</p>
        <div className="github-lang-mini">
          {topLanguages.map((language) => (
            <div className="github-lang-mini-row" key={language.name}>
              <span className="language-dot" style={{ background: language.color }} />
              <span>{language.name}</span>
              <span className="github-lang-mini-percent">{Math.round(language.percent)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
