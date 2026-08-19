/* Scroll pacing for the journey scene.

   The composition is authored against world landmarks — the gateway sits at SPEED * 11.4,
   the bridge at SPEED * 20.4, the summit at SPEED * 27.4 — so authored time T must not be
   retimed. Instead this warps how much *scroll* buys a second of authored time: the world
   drifts slowly while a beat is legible, and moves on briskly between them.

   It is the dur-vs-nat warp the original composition engine had (ccWarp in animations-v3.jsx),
   which the port dropped because every authored scene had dur === nat. */

import { beats } from '@/lib/journey-beats'
import { CUES, TOTAL, smoothstep } from '@/lib/journey-motion'

const READ_RATE = 0.55 // authored time advances at 55% rate inside a reading window
const EDGE = 0.6 // seconds of smooth ramp at each window edge

/* Every stretch the reader needs time on: each beat, plus the "journey continues" card,
   which stages three items of its own. */
const windows = [
  ...beats.map((b) => ({ at: b.at, out: b.out })),
  { at: CUES.Continues, out: CUES.ChapterTwo },
]

/* dT/dScroll. Lower means more scroll is needed to cross the same authored second.
   smoothstep bumps rather than hard edges — a piecewise-linear map would change scroll
   velocity discontinuously at every beat boundary and read as a jerk. */
function rateAt(T: number) {
  let r = 1
  for (const w of windows) {
    const inside =
      smoothstep(w.at - EDGE, w.at + EDGE, T) * (1 - smoothstep(w.out - EDGE, w.out + EDGE, T))
    r = Math.min(r, 1 - (1 - READ_RATE) * inside)
  }
  return r
}

/* S(T) = ∫ dT / rateAt(T), by midpoint rule, normalised to [0,1]. */
const STEPS = 2048
const dT = TOTAL / STEPS
const cum = new Float64Array(STEPS + 1)
for (let i = 1; i <= STEPS; i++) cum[i] = cum[i - 1] + dT / rateAt(dT * (i - 0.5))
for (let i = 0; i <= STEPS; i++) cum[i] /= cum[STEPS]
cum[STEPS] = 1

/* Resample the inverse onto a uniform progress grid so warp() is an index-and-lerp. */
const LUT = 1024
const table = new Float64Array(LUT + 1)
{
  let j = 0
  for (let k = 0; k <= LUT; k++) {
    const p = k / LUT
    while (j < STEPS && cum[j + 1] < p) j++
    const p0 = cum[j],
      p1 = cum[j + 1]
    table[k] = Math.min(TOTAL, dT * (j + (p1 > p0 ? (p - p0) / (p1 - p0) : 0)))
  }
  table[0] = 0
  table[LUT] = TOTAL
}

/* Scroll progress 0..1 -> authored time 0..TOTAL. Endpoints are exact by construction. */
export function warp(p: number) {
  if (!(p > 0)) return 0
  if (p >= 1) return TOTAL
  const x = p * LUT,
    i = Math.floor(x)
  return table[i] + (table[i + 1] - table[i]) * (x - i)
}

/* The inverse, for tests and tuning: authored time -> scroll progress. */
export function progressForT(T: number) {
  if (!(T > 0)) return 0
  if (T >= TOTAL) return 1
  const x = T / dT,
    i = Math.floor(x)
  return cum[i] + (cum[i + 1] - cum[i]) * (x - i)
}
