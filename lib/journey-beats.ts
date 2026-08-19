/* The merged journey script: the design composition's authored beat timings carrying
   the real career facts from lib/journey-story.ts.

   Timings are hand-tuned to world landmarks (gateway at SPEED*11.4, bridge at SPEED*20.4,
   summit at SPEED*27.4) — retiming a beat desynchronises its copy from the scenery. */

import { journeyStory, type JourneyStep } from '@/lib/journey-story'

/* journeyStory splices in `journey` from portfolio-data, which is reverse-chronological.
   Look milestones up by id so the forward-walking scene stays in true order. */
const byId = new Map(journeyStory.map((s) => [s.id, s]))
const step = (id: string): JourneyStep => {
  const found = byId.get(id)
  if (!found) throw new Error(`journey-beats: unknown milestone "${id}"`)
  return found
}

export type Beat = {
  at: number
  out: number
  eyebrow?: string
  title: string[]
  body?: string
  side?: 'left' | 'right'
  align?: 'center'
  italic?: boolean
  fade?: boolean
  size?: number
  here?: boolean
  /* milestone ids this beat speaks for — drives the accessible transcript */
  ids?: string[]
}

const facts = (id: string) => {
  const s = step(id)
  return { eyebrow: `${s.date} · ${s.company}`, body: s.summary, ids: [id] }
}

const beginning = step('beginning')
const foundation = step('foundation')

export const beats: Beat[] = [
  {
    at: 0.7,
    out: 4.5,
    eyebrow: `${beginning.date} — ${foundation.date} · ${beginning.company}`,
    title: ['The first step.'],
    body: `${beginning.summary} ${foundation.summary}`,
    ids: ['beginning', 'foundation'],
  },

  { at: 5.4, out: 8.5, ...facts('higher-secondary'), title: ['Learning to find', 'my way.'] },

  { at: 9.7, out: 13.4, ...facts('engineering'), side: 'right', title: ['A new world opens.'] },

  { at: 14.5, out: 17.6, ...facts('innovation'), title: ['The real adventure', 'begins.'] },

  {
    at: 18.7,
    out: 22.5,
    ...facts('skills'),
    fade: true,
    title: ['Every obstacle became', 'another lesson.'],
  },

  { at: 23.5, out: 26.6, ...facts('graduate'), title: ['I found my direction.'] },

  /* Chapter-one coda — poetry only. The camera holds from T=27.4 to 36 (cameraX drifts just
     300px), so these two carry no landmark coupling and their gap can be widened freely. */
  {
    at: 27.9,
    out: 29.7,
    title: ['Closer than before.', 'Still not there.'],
    align: 'center',
    fade: true,
    size: 100,
  },
  {
    at: 30.7,
    out: 31.9,
    title: ['And that\u2019s the point.'],
    align: 'center',
    italic: true,
    size: 76,
  },

  /* — the white "journey continues" card holds from T 32 to 36 — */

  { at: 36.9, out: 40.1, ...facts('intern'), title: ['The path did not end.'] },

  { at: 40.9, out: 45.6, ...facts('on-job'), title: ['Higher ground,', 'the same restless feet.'] },

  {
    at: 46.6,
    out: 51.4,
    ...facts('trainee'),
    fade: true,
    title: ['The castle is real now —', 'and still a long way up.'],
  },

  {
    at: 52.7,
    out: 55.3,
    ...facts('associate'),
    here: true,
    size: 88,
    title: ['Every ridge he crests', 'shows him one more.'],
  },

  {
    at: 56.4,
    out: 58,
    ...facts('future'),
    italic: true,
    size: 78,
    title: ['So he keeps climbing.'],
  },
]

/* The white card between the two chapters — kept verbatim from the design. */
export const continuesCard = {
  title: 'The journey continues.',
  lede: 'Still building, still learning, still moving toward the life I imagine.',
  items: [
    ['Build', 'Creating meaningful software and products.'],
    ['Learn', 'Growing deeper in engineering, AI and systems.'],
    ['Become', 'Independence, stability, a life I\u2019m proud of.'],
  ] as [string, string][],
}

export const chapterOneLabel = 'Chapter one · still being written'
export const chapterTwoLabel = 'Chapter two · the road ahead'
