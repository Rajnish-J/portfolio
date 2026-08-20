import type { LanguageStat } from '@/lib/github'

export function LanguageBar({ languages }: { languages: LanguageStat[] }) {
  return (
    <div>
      <div className="language-bar">
        {languages.map((language) => (
          <span
            className="language-bar-segment"
            key={language.name}
            style={{ width: `${language.percent}%`, background: language.color }}
          />
        ))}
      </div>
      <div className="language-legend">
        {languages.map((language) => (
          <span className="language-legend-item" key={language.name}>
            <span className="language-dot" style={{ background: language.color }} />
            {language.name}
            <span className="github-lang-mini-percent">{Math.round(language.percent)}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}
