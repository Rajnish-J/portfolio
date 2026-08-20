import type { ContributionWeek } from '@/lib/github'

const WEEKDAY_LABELS: Record<number, string> = { 1: 'mon', 3: 'wed', 5: 'fri', 0: 'sun' }

export function ContributionHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  return (
    <div className="contribution-heatmap">
      <div className="heatmap-labels">
        {[1, 3, 5, 0].map((weekday) => (
          <span key={weekday}>{WEEKDAY_LABELS[weekday]}</span>
        ))}
      </div>
      <div className="heatmap-grid">
        {weeks.map((week, weekIndex) => (
          <div className="heatmap-week" key={weekIndex}>
            {week.days.map((day) => (
              <span
                className="heatmap-cell"
                key={day.date}
                data-level={day.level}
                title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
