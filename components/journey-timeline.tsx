import { journeyStory } from '@/lib/journey-story'

export function JourneyTimeline() {
  return (
    <ol className="journey-timeline" aria-label="Career milestones">
      {journeyStory.map((item) => {
        const Icon = item.icon
        return (
          <li className="journey-tl-item" key={item.id}>
            <span className="journey-tl-marker" aria-hidden="true">
              <Icon size={16} />
            </span>
            <div className="journey-tl-body">
              <p className="journey-tl-date">{item.date}</p>
              <h3>{item.role}</h3>
              <p className="journey-tl-company">{item.company}</p>
              <p className="journey-tl-summary">{item.summary}</p>
              {item.details && item.details.length > 0 && (
                <details className="journey-tl-details">
                  <summary>What I worked on</summary>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
