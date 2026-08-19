/* Motion primitives ported from the Journey design composition (animations-v3.jsx).
   Pure functions of authored time T, no engine, no deps. */

export type EaseFn = (t: number) => number

export const Easing = {
  linear: (t: number) => t,
  easeOutCubic: (t: number) => {
    const u = t - 1
    return u * u * u + 1
  },
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
}

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

/* interpolate([0,.5,1], [0,100,50], ease?) -> fn(t). Maps t across keyframes, eased per segment. */
export function interpolate(
  input: number[],
  output: number[],
  ease: EaseFn | EaseFn[] = Easing.linear,
) {
  return (t: number) => {
    if (t <= input[0]) return output[0]
    if (t >= input[input.length - 1]) return output[output.length - 1]
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i]
        const local = span === 0 ? 0 : (t - input[i]) / span
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease
        return output[i] + (output[i + 1] - output[i]) * easeFn(local)
      }
    }
    return output[output.length - 1]
  }
}

/* animate({from,to,start,end,ease})(t) — single segment, clamped at both ends. */
export function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number
  to?: number
  start?: number
  end?: number
  ease?: EaseFn
}) {
  return (t: number) => {
    if (t <= start) return from
    if (t >= end) return to
    return from + (to - from) * ease((t - start) / (end - start))
  }
}

/* smoothstep — the design's `ss` helper, renamed to avoid shadowing. */
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

/* Scene cue table, accumulated from the authored OM_SCENES durations in Journey.dc.html.
   Every scene has dur === nat, so authored time equals play time and the map is linear. */
export const CUES = {
  Begin: 0,
  Forest: 5.4,
  Gateway: 9.7,
  FirstJob: 14.5,
  Storm: 18.7,
  Engineer: 23.5,
  Castle: 27.4,
  Continues: 32,
  ChapterTwo: 36,
  Climb: 40,
  Gate: 46,
  Beyond: 52,
}
export type Cues = typeof CUES

export const TOTAL = 58

/* Shorthand builders used all over the composition. */
export const MOTION = {
  enter: (start: number, dur?: number) =>
    animate({ from: 0, to: 1, start, end: start + (dur || 0.9), ease: Easing.easeOutCubic }),
  rise: (start: number, dur?: number, dist?: number) =>
    animate({
      from: dist == null ? 34 : dist,
      to: 0,
      start,
      end: start + (dur || 0.9),
      ease: Easing.easeOutCubic,
    }),
  pop: (start: number, dur: number, from: number, to: number) =>
    animate({ from, to, start, end: start + (dur || 1.4), ease: Easing.easeInOutCubic }),
}
