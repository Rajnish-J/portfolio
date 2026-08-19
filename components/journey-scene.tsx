'use client'

/* The Journey — the design composition (Journey section/journey.jsx) driven by scroll
   instead of a clock. Every mark in the piece is a pure function of authored time T,
   so GSAP ScrollTrigger scrubs T from 0 to TOTAL and the whole world moves with the page. */

import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  CUES,
  Easing,
  MOTION,
  TOTAL,
  clamp,
  interpolate,
  smoothstep as ss,
  type Cues,
} from '@/lib/journey-motion'
import {
  beats,
  chapterOneLabel,
  chapterTwoLabel,
  continuesCard,
  type Beat as BeatItem,
} from '@/lib/journey-beats'
import { warp } from '@/lib/journey-pacing'
import { journeyStory } from '@/lib/journey-story'
import { JourneyTimeline } from '@/components/journey-timeline'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const W = 1920,
  H = 1080
const SPEED = 320 // world px per authored second
const FOLIAGE = 1

/* ---------- palette ----------
   Every colour in the piece is a pure grey except the warm lamp/window glow, so dark mode
   is a compressed photographic negative: relationships hold, nothing needs hand-tuning. */
const WARM_LIGHT = '#E8DFCF',
  WARM_DARK = '#C79B4E'
const darkCache = new Map<string, string>()
function toDark(hex: string) {
  const hit = darkCache.get(hex)
  if (hit) return hit
  let out: string
  if (hex.toUpperCase() === WARM_LIGHT) out = WARM_DARK
  else {
    let h = hex.slice(1)
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    const v = parseInt(h.slice(0, 2), 16)
    const s = Math.max(8, Math.min(240, 252 - v))
      .toString(16)
      .padStart(2, '0')
    out = `#${s}${s}${s}`
  }
  darkCache.set(hex, out)
  return out
}
type Ink = (hex: string) => string
const INK = '#0A0A0A',
  DEEP = '#141414',
  MID = '#C2C2C2',
  FAR = '#E1E1E1',
  HAZE = '#EFEFEF'
const SUB = '#6F6F6F',
  WARM = WARM_LIGHT

const rnd = (i: number) => {
  const s = Math.sin(i * 127.1 + 31.73) * 43758.5453
  return s - Math.floor(s)
}

const WX = {
  gateway: SPEED * 11.4,
  colonnade: SPEED * 24.4,
  bridge: SPEED * 20.4,
  peak: SPEED * 27.4,
  castle: 2900,
}

function terrainY(x: number) {
  let y = 800 + Math.sin(x * 0.00085) * 30 + Math.sin(x * 0.0026 + 1.1) * 11
  y -= 60 * ss(SPEED * 9, SPEED * 13, x)
  y -= 330 * ss(SPEED * 18, SPEED * 27.2, x)
  y += 170 * Math.exp(-Math.pow((x - WX.bridge) / 230, 2))
  y += 230 * ss(9600, 11400, x) // chapter two: down from the summit
  y -= 150 * ss(12100, 18200, x) // the long ascent toward the castle mountain
  return y
}
const bridgeSpan = 330
function deckY(x: number) {
  const a = WX.bridge - bridgeSpan,
    b = WX.bridge + bridgeSpan
  if (x < a || x > b) return Infinity
  return terrainY(a) + (terrainY(b) - terrainY(a)) * ((x - a) / (b - a))
}
const walkY = (x: number) => Math.min(terrainY(x), deckY(x))

function cameraX(T: number, C: Cues) {
  if (T <= C.Castle) return SPEED * T
  const hold = SPEED * C.Castle + 300 * Easing.easeOutCubic(clamp((T - C.Castle) / 4.2, 0, 1))
  if (!isFinite(C.ChapterTwo) || T <= C.ChapterTwo) return hold
  const t2 = T - C.ChapterTwo,
    ramp = 2.2
  const dist = t2 <= ramp ? (SPEED * (t2 * t2)) / (2 * ramp) : SPEED * (ramp / 2 + (t2 - ramp))
  return hold + dist
}

/* ---------- landscape pieces (all mounted always, keyed to T) ---------- */

function Ridge({
  cam,
  p,
  amp,
  base,
  color,
  phase,
  opacity,
}: {
  cam: number
  p: number
  amp: number
  base: number
  color: string
  phase: number
  opacity: number
}) {
  const off = cam * p
  let d = `M -40 ${H}`
  for (let sx = -40; sx <= W + 40; sx += 40) {
    const wx = (off + sx) * 0.6 + phase
    const y = base + Math.sin(wx * 0.0011) * amp + Math.sin(wx * 0.0031 + 2.2) * amp * 0.35
    d += ` L ${sx} ${y}`
  }
  d += ` L ${W + 40} ${H} Z`
  return <path d={d} fill={color} opacity={opacity} />
}

function Conifer({
  x,
  y,
  h,
  w,
  color,
  r,
  r2,
  texture,
  shade,
}: {
  x: number
  y: number
  h: number
  w: number
  color: string
  r: number
  r2: number
  texture?: boolean
  shade: string
}) {
  // tapered trunk + 6-9 branch tiers, each tier jittered so no two trees repeat
  const tiers = 7 + Math.floor(r2 * 3)
  const lean = (r - 0.5) * w * 0.09
  const spike = 1.0 + r2 * 0.22 // fuller, calmer conifers
  const parts = []
  const trunkW = Math.max(1.1, w * 0.085)
  parts.push(
    <polygon
      key="t"
      points={`${x - trunkW},${y} ${x + trunkW},${y} ${x + trunkW * 0.55 + lean},${y - h * 0.72} ${x - trunkW * 0.55 + lean},${y - h * 0.72}`}
      fill={color}
    />,
  )
  for (let t = 0; t < tiers; t++) {
    const f = t / (tiers - 1) // 0 = ground tier, 1 = crown
    const cy = y - h * (0.12 + 0.86 * f)
    const jx = x + lean * f + (rnd(x * 0.07 + t * 2.3) - 0.5) * w * 0.04
    const half = (w / 2) * Math.pow(1 - f, 0.78) * spike + w * 0.06
    const drop = h * (0.105 + 0.03 * rnd(t * 5.1 + x * 0.013))
    const droopL = drop * (0.9 + 0.2 * rnd(t * 1.7))
    const droopR = drop * (0.9 + 0.2 * rnd(t * 3.1 + 0.4))
    parts.push(
      <path
        key={t}
        d={`M ${jx} ${cy - drop * 0.95}           C ${jx - half * 0.45} ${cy - drop * 0.2}, ${jx - half * 0.8} ${cy + droopL * 0.35}, ${jx - half} ${cy + droopL}           L ${jx - half * 0.34} ${cy + droopL * 0.42}           L ${jx} ${cy + drop * 0.16}           L ${jx + half * 0.34} ${cy + droopR * 0.42}           L ${jx + half} ${cy + droopR}           C ${jx + half * 0.8} ${cy + droopR * 0.35}, ${jx + half * 0.45} ${cy - drop * 0.2}, ${jx} ${cy - drop * 0.95} Z`}
        fill={color}
      />,
    )
    if (texture) {
      const sh = half * 0.52
      parts.push(
        <path
          key={'sh' + t}
          opacity="0.5"
          d={`M ${jx - w * 0.05} ${cy - drop * 0.7}
             C ${jx - sh * 0.5} ${cy - drop * 0.1}, ${jx - sh * 0.85} ${cy + droopL * 0.3}, ${jx - sh} ${cy + droopL * 0.86}
             L ${jx - sh * 0.3} ${cy + droopL * 0.36}
             L ${jx - w * 0.05} ${cy + drop * 0.12} Z`}
          fill={shade}
        />,
      )
    }
  }
  return <g>{parts}</g>
}

function TreeBand({
  cam,
  p,
  spacing,
  color,
  hMin,
  hMax,
  baseY,
  seed,
  opacity,
  density,
  texture,
  filter,
  shade,
}: {
  cam: number
  p: number
  spacing: number
  color: string
  hMin: number
  hMax: number
  baseY: number
  seed: number
  opacity: number
  density: number
  texture?: boolean
  filter?: string
  shade: string
}) {
  const off = cam * p
  const i0 = Math.floor(off / spacing) - 2,
    i1 = i0 + Math.ceil(W / spacing) + 4
  const items = []
  for (let i = i0; i < i1; i++) {
    const r = rnd(i + seed),
      r2 = rnd(i * 3.7 + seed * 1.9),
      r3 = rnd(i * 7.1 + seed * 0.6)
    if (r2 > density) continue
    const x = i * spacing + r * spacing * 0.75 - off
    const h = (hMin + (hMax - hMin) * r) * (0.9 + r3 * 0.2)
    const w = h * (0.44 + r3 * 0.12)
    const y = baseY + r2 * 14
    items.push(
      <Conifer
        key={i}
        x={x}
        y={y}
        h={h}
        w={w}
        color={color}
        r={r}
        r2={r2}
        texture={texture}
        shade={shade}
      />,
    )
    if (texture && r3 > 0.86) {
      // near band only: pale bands turned these into stray lines
      const sh = h * 0.55,
        sx = x + w * 0.85
      items.push(
        <g key={'s' + i} opacity="0.8">
          <polygon
            points={`${sx - 1.6},${y} ${sx + 1.6},${y} ${sx + 0.8},${y - sh}`}
            fill={color}
          />
          <line
            x1={sx}
            y1={y - sh * 0.66}
            x2={sx + sh * 0.2}
            y2={y - sh * 0.82}
            stroke={color}
            strokeWidth="1.4"
          />
          <line
            x1={sx}
            y1={y - sh * 0.5}
            x2={sx - sh * 0.18}
            y2={y - sh * 0.68}
            stroke={color}
            strokeWidth="1.4"
          />
        </g>,
      )
    }
  }
  return (
    <g opacity={opacity} filter={filter}>
      {items}
    </g>
  )
}

function Ground({ cam, c }: { cam: number; c: Ink }) {
  let d = `M -20 ${H + 20}`
  for (let sx = -20; sx <= W + 20; sx += 22) d += ` L ${sx} ${walkY(cam + sx)}`
  d += ` L ${W + 20} ${H + 20} Z`
  let ravine = `M -20 ${H + 20}`
  for (let sx = -20; sx <= W + 20; sx += 22) ravine += ` L ${sx} ${terrainY(cam + sx)}`
  ravine += ` L ${W + 20} ${H + 20} Z`
  return (
    <g>
      <path d={ravine} fill={c(DEEP)} />
      <path d={d} fill="none" stroke={c(INK)} strokeWidth="2.5" opacity="0.5" />
    </g>
  )
}

function Bridge({ cam, T, cue, c }: { cam: number; T: number; cue: number; c: Ink }) {
  const a = WX.bridge - bridgeSpan,
    b = WX.bridge + bridgeSpan
  const x0 = a - cam,
    x1 = b - cam
  if (x1 < -200 || x0 > W + 200) return null
  const y0 = terrainY(a),
    y1 = terrainY(b)
  const struts = []
  for (let i = 1; i < 10; i++) {
    const t = i / 10,
      sx = x0 + (x1 - x0) * t,
      sy = y0 + (y1 - y0) * t
    struts.push(
      <line
        key={i}
        x1={sx}
        y1={sy}
        x2={sx}
        y2={sy + 40 + 90 * Math.sin(t * Math.PI)}
        stroke={c(INK)}
        strokeWidth="3"
        opacity="0.75"
      />,
    )
  }
  return (
    <g opacity={MOTION.enter(cue - 1.2, 1)(T)}>
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={c(INK)} strokeWidth="7" />
      <line
        x1={x0}
        y1={y0 - 66}
        x2={x1}
        y2={y1 - 66}
        stroke={c(INK)}
        strokeWidth="2"
        opacity="0.55"
      />
      {struts}
    </g>
  )
}

function Gateway({ cam, c }: { cam: number; c: Ink }) {
  const x = WX.gateway - cam
  if (x < -700 || x > W + 700) return null
  const h = 430,
    gap = 300,
    pw = 74
  const li = x - gap / 2,
    ri = x + gap / 2 // inner faces of the two piers
  // each pier is footed on the terrain under ITS OWN world x, not one shared height
  const wL = WX.gateway - gap / 2 - pw / 2,
    wR = WX.gateway + gap / 2 + pw / 2
  const yL = terrainY(wL),
    yR = terrainY(wR)
  const capY = Math.min(yL, yR) - h // lintel stays level across the slope
  const ink = c(INK)
  return (
    <g>
      <ellipse cx={li - pw / 2} cy={yL + 4} rx={pw * 1.5} ry={11} fill={ink} opacity="0.16" />
      <ellipse cx={ri + pw / 2} cy={yR + 4} rx={pw * 1.5} ry={11} fill={ink} opacity="0.16" />
      {(
        [
          [li - pw, yL],
          [ri, yR],
        ] as [number, number][]
      ).map(([ox, gy], i) => (
        <g key={i}>
          <path
            d={`M ${ox - 14} ${gy + 4} L ${ox + pw + 14} ${gy + 4} L ${ox + pw + 4} ${gy - 26} L ${ox - 4} ${gy - 26} Z`}
            fill={ink}
          />
          <path
            d={`M ${ox - 4} ${gy - 26} L ${ox + pw + 4} ${gy - 26} L ${ox + pw - 3} ${capY} L ${ox + 3} ${capY} Z`}
            fill={ink}
          />
          <path
            d={`M ${ox + pw - 3} ${capY} L ${ox + pw + 4} ${gy - 26} L ${ox + pw - 16} ${gy - 40} L ${ox + pw - 20} ${capY + 20} Z`}
            fill={c('#2E2E2E')}
          />
          {[0.18, 0.34, 0.5, 0.66, 0.82].map((f, j) => {
            const ly = capY + (gy - 26 - capY) * f
            return (
              <line
                key={j}
                x1={ox + 2}
                y1={ly}
                x2={ox + pw - 2}
                y2={ly - (j % 2 ? 3 : -3)}
                stroke={c('#FFFFFF')}
                strokeWidth="2"
                opacity="0.13"
              />
            )
          })}
        </g>
      ))}
      <path
        d={`M ${li - pw - 30} ${capY} L ${ri + pw + 30} ${capY} L ${ri + pw + 20} ${capY - 46} L ${li - pw - 20} ${capY - 46} Z`}
        fill={ink}
      />
      <path
        d={`M ${li - pw - 20} ${capY - 46} L ${ri + pw + 20} ${capY - 46} L ${ri + pw + 6} ${capY - 68} L ${li - pw - 6} ${capY - 68} Z`}
        fill={ink}
      />
      <path
        d={`M ${li - pw - 6} ${capY - 68} L ${ri + pw + 6} ${capY - 68} L ${ri + 34} ${capY - 86} L ${li - 34} ${capY - 86} Z`}
        fill={ink}
        opacity="0.9"
      />
      <line
        x1={li - pw - 24}
        y1={capY - 24}
        x2={ri + pw + 24}
        y2={capY - 24}
        stroke={c('#FFFFFF')}
        strokeWidth="2"
        opacity="0.12"
      />
      <path d={`M ${li} ${capY} L ${li + 46} ${capY} L ${li} ${capY + 58} Z`} fill={ink} />
      <path d={`M ${ri} ${capY} L ${ri - 46} ${capY} L ${ri} ${capY + 58} Z`} fill={ink} />
    </g>
  )
}

function Colonnade({ cam, T, cue, c }: { cam: number; T: number; cue: number; c: Ink }) {
  const cols = []
  const o = MOTION.enter(cue - 2.4, 1.6)(T)
  const mid = c(MID)
  for (let i = 0; i < 26; i++) {
    const wx = WX.colonnade + i * 240
    const x = wx - cam * 0.72
    if (x < -80 || x > W + 80) continue
    const y = terrainY(wx) - 120 - (i % 3) * 40
    cols.push(
      <line
        key={i}
        x1={x}
        y1={y}
        x2={x}
        y2={y - 210 - (i % 4) * 60}
        stroke={mid}
        strokeWidth="2"
      />,
    )
    cols.push(<circle key={'c' + i} cx={x} cy={y - 210 - (i % 4) * 60} r="4" fill={mid} />)
  }
  return <g opacity={o * 0.9}>{cols}</g>
}

function Network({ cam, T, cue, c }: { cam: number; T: number; cue: number; c: Ink }) {
  const o = MOTION.enter(cue - 0.6, 1.8)(T)
  if (o <= 0.001) return null
  const ink = c(INK)
  const nodes = []
  for (let i = 0; i < 44; i++) {
    const wx = SPEED * 14 + i * 300 + rnd(i) * 160
    const x = wx - cam * 0.9
    if (x < -60 || x > W + 60) continue
    const y = terrainY(wx) - 90 - rnd(i * 2.3) * 320
    const pulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(T * 1.6 + i))
    nodes.push(<circle key={i} cx={x} cy={y} r={2.6} fill={ink} opacity={0.18 + 0.42 * pulse} />)
    const nx = wx + 300 - cam * 0.9,
      ny = terrainY(wx + 300) - 90 - rnd((i + 1) * 2.3) * 320
    nodes.push(
      <line
        key={'l' + i}
        x1={x}
        y1={y}
        x2={nx}
        y2={ny}
        stroke={ink}
        strokeWidth="1"
        opacity={0.07 + 0.08 * pulse}
      />,
    )
  }
  const dashOffset = -(cam * 0.35) % 40
  let d = `M -20 ${walkY(cam - 20) - 6}`
  for (let sx = -20; sx <= W + 20; sx += 24) d += ` L ${sx} ${walkY(cam + sx) - 6}`
  return (
    <g opacity={o}>
      <path
        d={d}
        fill="none"
        stroke={c('#FFFFFF')}
        strokeWidth="2.5"
        strokeDasharray="14 26"
        strokeDashoffset={dashOffset}
        opacity="0.8"
      />
      {nodes}
    </g>
  )
}

function Storm({ T, cue, end, c }: { T: number; cue: number; end: number; c: Ink }) {
  const o = Math.min(MOTION.enter(cue - 0.8, 1.4)(T), 1 - MOTION.enter(end - 1.2, 1.8)(T))
  if (o <= 0.001) return null
  const ink = c(INK)
  const streaks = []
  for (let i = 0; i < 130; i++) {
    const sx = ((rnd(i) * 2400 + T * 620 * (0.8 + rnd(i * 5) * 0.5)) % 2400) - 240
    const sy = ((rnd(i * 3.1) * 1200 + T * 1500) % 1200) - 60
    streaks.push(
      <line
        key={i}
        x1={sx}
        y1={sy}
        x2={sx - 16}
        y2={sy + 54}
        stroke={ink}
        strokeWidth="1.2"
        opacity={0.1 + rnd(i * 7) * 0.16}
      />,
    )
  }
  return (
    <g opacity={o}>
      <rect x="0" y="0" width={W} height={H} fill={c('#9B9B9B')} opacity="0.22" />
      {streaks}
    </g>
  )
}

function Castle({ T, cue, c }: { T: number; cue: Cues; c: Ink }) {
  const span = 30
  const s = MOTION.pop(0, span, 0.3, 1.0)(T)
  const fade = 1 - MOTION.enter(cue.Continues - 0.6, 1.6)(T)
  const o = interpolate([0, 11, 23, 30], [0.14, 0.3, 0.62, 0.85], Easing.easeInOutSine)(T) * fade
  if (o <= 0.001) return null
  const x = 1420 - 90 * (T / span)
  const y = interpolate([0, 18, 27.4], [640, 600, 512], Easing.easeInOutSine)(T)
  const mid = c(MID)
  const towers: [number, number, number][] = [
    [-150, 210, 54],
    [-70, 300, 46],
    [10, 380, 62],
    [96, 286, 44],
    [172, 196, 50],
  ]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx="10" cy="30" rx="360" ry="70" fill={c(WARM)} opacity="0.55" />
      <rect x="-210" y="-70" width="430" height="100" fill={mid} />
      {towers.map(([tx, th, tw], i) => (
        <g key={i}>
          <rect x={tx} y={-th} width={tw} height={th} fill={mid} />
          <polygon
            points={`${tx - 8},${-th} ${tx + tw + 8},${-th} ${tx + tw / 2},${-th - 62}`}
            fill={mid}
          />
        </g>
      ))}
      <rect x="-230" y="26" width="470" height="8" fill={mid} opacity="0.7" />
    </g>
  )
}

function RealCastle({ T, cam, cue, c }: { T: number; cam: number; cue: Cues; c: Ink }) {
  const o = MOTION.enter(cue.Climb - 1.4, 2.4)(T)
  if (o <= 0.001) return null
  // he closes on it: the mountain sweeps in and the gate ends up right in his path
  const drift = interpolate(
    [cue.Climb, cue.Gate, cue.Beyond, cue.Beyond + 4.4, cue.Beyond + 6],
    [0.13, 0.3, 0.42, 0.52, 0.56],
    Easing.easeInOutSine,
  )(T)
  const camAt = SPEED * cue.Castle + 300 + SPEED * (cue.Climb - cue.ChapterTwo - 1.1)
  const travelling = 1560 - (cam - camAt) * drift * 0.42
  const sx = Math.max(travelling, 1210) // it draws nearer but always stays ahead of him
  const k = interpolate(
    [cue.Climb, cue.Gate, cue.Beyond, cue.Beyond + 4.4, cue.Beyond + 6],
    [0.15, 0.19, 0.24, 0.28, 0.3],
    Easing.easeInOutSine,
  )(T)
  // stays high on its mountain, well above the ground he is walking
  const summit = interpolate(
    [cue.Climb, cue.Gate, cue.Beyond, cue.Beyond + 6],
    [352, 330, 312, 300],
    Easing.easeInOutSine,
  )(T)
  const glow = Math.min(
    0.75,
    MOTION.enter(cue.Gate - 0.6, 2.6)(T) * 0.5 + MOTION.enter(cue.Beyond, 3.4)(T) * 0.5,
  )
  const haze = 0.66 + 0.24 * MOTION.enter(cue.Beyond - 1, 3)(T)
  const warm = c(WARM)
  const towers = [
    { tx: -300, h: 300, w: 74, cap: 96, band: true },
    { tx: -130, h: 236, w: 62, cap: 74 },
    { tx: 40, h: 470, w: 104, cap: 150, band: true, donjon: true },
    { tx: 214, h: 262, w: 66, cap: 82 },
    { tx: 352, h: 336, w: 78, cap: 104, band: true },
  ]
  const merlons = []
  for (let i = 0; i < 22; i++)
    merlons.push(<rect key={i} x={-330 + i * 34} y={-236} width={20} height={26} fill={c(INK)} />)
  const windows: React.ReactNode[] = []
  towers.forEach((t2, ti) => {
    for (let r = 0; r < 3; r++) {
      if (t2.h < 240 + r * 90) continue
      windows.push(
        <rect
          key={ti + '-' + r}
          x={t2.tx + t2.w * 0.36}
          y={-t2.h + 52 + r * 78}
          width={t2.w * 0.28}
          height={t2.w * 0.5}
          rx={t2.w * 0.14}
          fill={warm}
          opacity={0.35 + 0.55 * glow}
        />,
      )
    }
  })
  const skirt = 300 / Math.max(k, 0.08) // meets the visible ground, no further
  return (
    <g opacity={o * haze}>
      <g transform={`translate(${sx} ${summit}) scale(${k})`}>
        <path
          d={`M ${-1500} ${skirt}
          C -1180 ${skirt * 0.5}, -1010 -70, -860 -196
          C -742 -296, -640 -300, -520 -372
          C -404 -442, -330 -556, -212 -672
          C -128 -756, -66 -812, 34 -868
          C 122 -916, 196 -872, 286 -806
          C 400 -722, 470 -604, 596 -486
          C 700 -390, 818 -336, 946 -232
          C 1074 -128, 1180 -60, ${1500} ${skirt} Z`}
          fill={c('#BDBDBD')}
        />
        <path
          d={`M 34 -868 C 122 -916, 196 -872, 286 -806
          C 400 -722, 470 -604, 596 -486 C 700 -390, 818 -336, 946 -232
          C 1074 -128, 1180 -60, ${1500} ${skirt} L ${330} ${skirt}
          C 210 -240, 60 -520, 34 -868 Z`}
          fill={c('#9C9C9C')}
        />
        <path
          d="M 34 -868 C -30 -800, -104 -742, -212 -672 C -300 -580, -372 -470, -470 -398 L -300 -366 C -186 -450, -96 -560, -14 -676 Z"
          fill={c('#D8D8D8')}
          opacity="0.85"
        />
        <path
          d="M 34 -868 C 96 -906, 158 -880, 226 -830 L 150 -742 C 108 -790, 74 -820, 20 -808 Z"
          fill={c('#FFFFFF')}
          opacity="0.7"
        />
        <path
          d="M -520 -372 C -430 -300, -330 -262, -218 -232 L -246 -186 C -372 -222, -470 -272, -560 -340 Z"
          fill={c('#8E8E8E')}
          opacity="0.55"
        />
        <path
          d="M 596 -486 C 660 -418, 742 -366, 840 -318 L 812 -272 C 700 -320, 618 -382, 552 -450 Z"
          fill={c('#8E8E8E')}
          opacity="0.45"
        />
        <path
          d={`M -860 -196 C -700 -150, -520 -120, -300 -104 C -60 -88, 240 -96, 520 -128 C 800 -160, 1060 -140, 1180 -84 L ${1500} ${skirt} L ${-1500} ${skirt} Z`}
          fill="url(#j-mist)"
          opacity="0.5"
        />
      </g>
      <g transform={`translate(${sx} ${summit}) scale(${k})`}>
        {/* shadow the keep throws down the sunless right flank */}
        <path
          d="M 120 -6 C 300 40, 470 130, 596 268 L 300 300 C 220 190, 150 96, 60 24 Z"
          fill={c('#6E6E6E')}
          opacity="0.4"
        />

        {/* curtain wall: lit left face, body, shadowed right return */}
        <path d="M -330 6 L -330 -210 L 418 -210 L 418 6 Z" fill={c('#2C2C2C')} />
        <path d="M -330 6 L -330 -210 L -252 -210 L -252 6 Z" fill={c('#454545')} />
        <path d="M 340 -210 L 418 -210 L 418 6 L 340 6 Z" fill={c('#171717')} />
        {merlons}
        <rect x="-354" y="-224" width="796" height="10" fill={c('#3A3A3A')} />

        {towers.map((t2, i) => (
          <g key={i}>
            <rect x={t2.tx} y={-t2.h} width={t2.w} height={t2.h + 10} fill={c('#2C2C2C')} />
            <rect x={t2.tx} y={-t2.h} width={t2.w * 0.3} height={t2.h + 10} fill={c('#4A4A4A')} />
            <rect
              x={t2.tx + t2.w * 0.74}
              y={-t2.h}
              width={t2.w * 0.26}
              height={t2.h + 10}
              fill={c('#171717')}
            />
            <polygon
              points={`${t2.tx - t2.w * 0.22},${-t2.h} ${t2.tx + t2.w * 1.22},${-t2.h} ${t2.tx + t2.w / 2},${-t2.h - t2.cap}`}
              fill={c('#232323')}
            />
            <polygon
              points={`${t2.tx - t2.w * 0.22},${-t2.h} ${t2.tx + t2.w / 2},${-t2.h} ${t2.tx + t2.w / 2},${-t2.h - t2.cap}`}
              fill={c('#3E3E3E')}
            />
            {t2.band ? (
              <rect
                x={t2.tx - t2.w * 0.12}
                y={-t2.h - 10}
                width={t2.w * 1.24}
                height={12}
                fill={c('#3A3A3A')}
              />
            ) : null}
            {t2.donjon ? (
              <g>
                <line
                  x1={t2.tx + t2.w / 2}
                  y1={-t2.h - t2.cap}
                  x2={t2.tx + t2.w / 2}
                  y2={-t2.h - t2.cap - 58}
                  stroke={c('#3A3A3A')}
                  strokeWidth="5"
                />
                <polygon
                  points={`${t2.tx + t2.w / 2},${-t2.h - t2.cap - 58} ${t2.tx + t2.w / 2 + 74},${-t2.h - t2.cap - 42} ${t2.tx + t2.w / 2},${-t2.h - t2.cap - 26}`}
                  fill={c('#2C2C2C')}
                />
              </g>
            ) : null}
          </g>
        ))}

        <rect x="-64" y="-158" width="128" height="168" fill={c('#232323')} />
        <path
          d="M -36 6 L -36 -100 A 36 36 0 0 1 36 -100 L 36 6 Z"
          fill={warm}
          opacity={0.28 + 0.66 * glow}
        />
        <ellipse cx="0" cy="8" rx="110" ry="16" fill={warm} opacity={glow * 0.45} />
        {windows}

        {/* rock spurs of the summit rising IN FRONT of the footings — the keep is set into the crag */}
        <path
          d="M -600 190 L -470 96 L -412 34 L -356 12 L -300 30 L -246 8 L -190 26 L -120 6 L -60 22 L 10 4 L 76 20 L 140 2 L 210 24 L 280 8 L 348 34 L 404 18 L 470 70 L 536 124 L 600 190 L 600 240 L -600 240 Z"
          fill={c('#BDBDBD')}
        />
        <path
          d="M 140 2 L 210 24 L 280 8 L 348 34 L 404 18 L 470 70 L 536 124 L 600 190 L 600 240 L 230 240 Z"
          fill={c('#9C9C9C')}
        />
        <path
          d="M -412 34 L -356 12 L -300 30 L -246 8 L -190 26 L -166 40 L -240 70 L -330 58 L -420 92 Z"
          fill={c('#CBCBCB')}
          opacity="0.55"
        />
      </g>
    </g>
  )
}

function Horizon({ T, cam, cue, c }: { T: number; cam: number; cue: Cues; c: Ink }) {
  const o = MOTION.enter(cue.Gate + 1.4, 3)(T) * 0.8 * (1 - MOTION.enter(cue.Beyond, 2.4)(T))
  if (o <= 0.001) return null
  const tone = c('#B9B9B9')
  const items = []
  for (let i = 0; i < 9; i++) {
    const wx = WX.castle + 1600 + i * 900 + rnd(i * 4.1) * 400
    const x = wx - cam * 0.16
    if (x < -160 || x > W + 160) continue
    const base = terrainY(cam + W * 0.5) - 120 - rnd(i * 2.7) * 90
    const h = 90 + rnd(i * 1.3) * 140,
      w = 26 + rnd(i * 5.9) * 22
    items.push(
      <g key={i} opacity={0.35 + rnd(i * 7.7) * 0.3}>
        <rect x={x} y={base - h} width={w} height={h} fill={tone} />
        <polygon
          points={`${x - 5},${base - h} ${x + w + 5},${base - h} ${x + w / 2},${base - h - 34}`}
          fill={tone}
        />
      </g>,
    )
  }
  return <g opacity={o}>{items}</g>
}

function Walker({ T, cam, cue, c }: { T: number; cam: number; cue: Cues; c: Ink }) {
  const h = 44 + 34 * ss(0, 29, T)
  const screenX = interpolate(
    [
      0,
      cue.Castle,
      cue.Castle + 3,
      cue.ChapterTwo,
      cue.ChapterTwo + 2.4,
      cue.Gate + 0.6,
      cue.Gate + 4.4,
      cue.Beyond + 2.4,
      cue.Beyond + 5.2,
    ],
    [W * 0.4, W * 0.4, W * 0.31, W * 0.31, W * 0.345, W * 0.36, W * 0.38, W * 0.4, W * 0.415],
    Easing.easeInOutCubic,
  )(T)
  const stride = clamp(
    1 -
      ss(cue.Castle + 0.4, cue.Castle + 2.4, T) +
      ss(cue.ChapterTwo - 0.4, cue.ChapterTwo + 1.6, T),
    0.12,
    1,
  )
  const swing = Math.sin(T * 6.4) * stride
  const bob = Math.sin(T * 12.8) * 1.4 * stride
  const lean = interpolate(
    [0, 18, 24, 29, cue.ChapterTwo, cue.Climb + 2, cue.Gate + 3, cue.Beyond + 5.4],
    [7, 5, 2, 0.5, 0.5, 4.5, 3.5, 1],
    Easing.easeInOutSine,
  )(T)
  const packMorph = ss(14, 24, T)
  const y = walkY(cam + screenX) + 2
  const s = h / 100
  const compass = 1 - ss(11, 14, T)
  const ink = c(INK)
  return (
    <g transform={`translate(${screenX} ${y + bob}) scale(${s})`}>
      <g stroke={ink} strokeLinecap="round" fill={ink}>
        <line x1="0" y1="-38" x2={swing * 15} y2="0" strokeWidth="8" />
        <line x1="0" y1="-38" x2={-swing * 15} y2="0" strokeWidth="8" />
        <line x1={lean * 0.4} y1="-40" x2={lean} y2="-78" strokeWidth="15" />
        <line
          x1={lean * 0.7}
          y1="-70"
          x2={lean - swing * 12}
          y2={-46 + Math.abs(swing) * 3}
          strokeWidth="6"
        />
        <circle cx={lean * 1.2} cy="-90" r="10.5" />
        <rect
          x={lean - 20 - packMorph * 2}
          y={-78 + packMorph * 4}
          width={13 + packMorph * 5}
          height={24 - packMorph * 4}
          rx={4 - packMorph * 3}
        />
        <circle
          cx={lean - swing * 12}
          cy={-44 + Math.abs(swing) * 3}
          r="4"
          opacity={compass}
          fill="none"
          strokeWidth="2"
        />
      </g>
    </g>
  )
}

/* ---------- typography ----------
   `stage` places type in the authored 1920x1080 space (scaled with the artwork);
   `flow` reflows it responsively for narrow viewports where cover-scaling crops. */

type Layout = 'stage' | 'flow'

function Beat({ T, b, layout, c }: { T: number; b: BeatItem; layout: Layout; c: Ink }) {
  /* Short beats need short fades: at the authored 1.1s in / 0.7s out, a 1.2s beat spends its
     whole life cross-fading and never reaches full opacity. */
  const dur = b.out - b.at
  const fadeIn = Math.min(1.1, dur * 0.28)
  const fadeOut = Math.min(0.7, dur * 0.2)
  const o = Math.min(MOTION.enter(b.at, fadeIn)(T), 1 - MOTION.enter(b.out, fadeOut)(T))
  if (o <= 0.001) return null
  const dy = MOTION.rise(b.at, fadeIn * 1.1, 30)(T) // lift matches the fade
  const centered = b.align === 'center'
  const flow = layout === 'flow'
  const box: React.CSSProperties = flow
    ? {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '11vh',
        padding: '0 22px',
        textAlign: centered ? 'center' : 'left',
      }
    : {
        position: 'absolute',
        left: centered ? 0 : b.side === 'right' ? 1000 : 132,
        right: centered ? 0 : 'auto',
        top: centered ? 196 : 140,
        width: centered ? '100%' : b.side === 'right' ? 800 : 860,
        textAlign: centered ? 'center' : 'left',
      }
  return (
    <div
      style={{
        ...box,
        opacity: o,
        transform: `translateY(${dy}px)`,
        willChange: 'opacity, transform',
      }}
    >
      {b.eyebrow ? (
        <div className="j-eyebrow" style={{ color: c(SUB), marginBottom: flow ? 14 : 22 }}>
          {b.eyebrow}
        </div>
      ) : null}
      <div
        className="j-title"
        style={{
          fontStyle: b.italic ? 'italic' : 'normal',
          fontSize: flow ? undefined : b.size || 92,
          color: c(INK),
        }}
      >
        {b.title.map((l, i) => (
          <div key={i} style={{ color: i > 0 && b.fade ? c(SUB) : c(INK) }}>
            {l}
          </div>
        ))}
      </div>
      {b.body ? (
        <div
          className="j-body"
          style={{
            color: c(SUB),
            marginTop: flow ? 18 : 28,
            maxWidth: flow ? undefined : 560,
            marginLeft: centered ? 'auto' : 0,
            marginRight: centered ? 'auto' : 0,
          }}
        >
          {b.body}
        </div>
      ) : null}
      {b.here ? (
        <mark className="j-here" style={{ color: c(SUB) }}>
          You are here
        </mark>
      ) : null}
    </div>
  )
}

function Continues({
  T,
  cue,
  next,
  layout,
  c,
}: {
  T: number
  cue: number
  next: number
  layout: Layout
  c: Ink
}) {
  const veil = Math.min(MOTION.enter(cue, 1.3)(T), 1 - MOTION.enter(next - 2.4, 2.4)(T))
  const out = MOTION.enter(next - 1.9, 1.5)(T)
  if (veil <= 0.001) return null
  const flow = layout === 'flow'
  return (
    <div style={{ position: 'absolute', inset: 0, background: c('#FFFFFF'), opacity: veil }}>
      <div
        style={
          flow
            ? {
                position: 'absolute',
                left: 0,
                right: 0,
                top: '12vh',
                padding: '0 22px',
                opacity: Math.min(MOTION.enter(cue + 0.5, 1.1)(T), 1 - out),
              }
            : {
                position: 'absolute',
                left: 132,
                top: 232,
                opacity: Math.min(MOTION.enter(cue + 0.5, 1.1)(T), 1 - out),
              }
        }
      >
        <div className="j-title" style={{ fontSize: flow ? undefined : 104, color: c(INK) }}>
          {continuesCard.title}
        </div>
        <div
          className="j-body"
          style={{ color: c(SUB), marginTop: 30, maxWidth: flow ? undefined : 620 }}
        >
          {continuesCard.lede}
        </div>
      </div>
      <div
        style={
          flow
            ? {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '12vh',
                padding: '0 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }
            : { position: 'absolute', left: 132, right: 132, top: 660, display: 'flex', gap: 96 }
        }
      >
        {continuesCard.items.map(([k, v], i) => (
          <div
            key={k}
            style={{
              flex: 1,
              opacity: Math.min(MOTION.enter(cue + 1.3 + i * 0.32, 0.9)(T), 1 - out),
              transform: `translateY(${MOTION.rise(cue + 1.3 + i * 0.32, 1, 22)(T)}px)`,
            }}
          >
            <div className="j-card-key" style={{ color: c(INK) }}>
              {k}
            </div>
            <div style={{ height: 1, background: c('#EAEAEA'), margin: '14px 0 18px' }} />
            <div className="j-card-val" style={{ color: c(SUB) }}>
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- the piece ---------- */

function World({
  T,
  dark,
  c,
  heavyFilters,
}: {
  T: number
  dark: boolean
  c: Ink
  heavyFilters: boolean
}) {
  const cam = cameraX(T, CUES)
  const baseY = terrainY(cam + W * 0.5)
  /* The whole frame re-rasterises every scrolled pixel, and path count — not React — is what
     costs. Narrow/low-power viewports thin the bands and drop the per-tier shadow paths. */
  const density = heavyFilters ? FOLIAGE : FOLIAGE * 0.6
  const texture = heavyFilters
  const shade = c('#000000')

  const light = interpolate(
    [0, 9, 18, 23, 27.4, 31, 36, 44, 50, 58],
    [0.2, 0.13, 0.26, 0.06, 0, 0, 0.05, 0.11, 0.02, 0],
    Easing.easeInOutSine,
  )(T)
  const warmth = interpolate(
    [18, 24, 27.4, 31, 36, 46, 50, 58],
    [0, 0.18, 0.42, 0.42, 0.28, 0.34, 0.52, 0.46],
    Easing.easeInOutSine,
  )(T)

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="j-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c('#FFFFFF')} />
          <stop offset="0.62" stopColor={c('#FBFBFB')} />
          <stop offset="1" stopColor={c(HAZE)} />
        </linearGradient>
        <filter id="j-bark-far" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09"
            numOctaves="2"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="2.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="j-bark-mid" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.055"
            numOctaves="3"
            seed="19"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="2.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="j-bark-near" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.07"
            numOctaves="2"
            seed="31"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="3.4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="d"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="2"
            seed="5"
            result="g"
          />
          <feColorMatrix in="g" type="saturate" values="0" result="gm" />
          <feComposite in="gm" in2="d" operator="in" result="grain" />
          <feBlend in="d" in2="grain" mode="multiply" />
        </filter>
        <linearGradient id="j-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c('#FFFFFF')} stopOpacity="0" />
          <stop offset="1" stopColor={c('#FFFFFF')} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#j-sky)" />

      <Ridge
        cam={cam}
        p={0.1}
        amp={70}
        base={baseY - 60}
        color={c('#EFEFEF')}
        phase={0}
        opacity={1}
      />
      <Castle T={T} cue={CUES} c={c} />
      <Ridge cam={cam} p={0.2} amp={90} base={baseY + 10} color={c(FAR)} phase={1400} opacity={1} />
      <TreeBand
        cam={cam}
        p={0.3}
        spacing={90}
        color={c('#DCDCDC')}
        hMin={90}
        hMax={190}
        baseY={baseY + 40}
        seed={3}
        opacity={1}
        density={density}
        shade={shade}
        filter={heavyFilters ? 'url(#j-bark-far)' : undefined}
      />
      <Ridge
        cam={cam}
        p={0.42}
        amp={64}
        base={baseY + 86}
        color={c('#CFCFCF')}
        phase={620}
        opacity={1}
      />
      <TreeBand
        cam={cam}
        p={0.58}
        spacing={120}
        color={c(MID)}
        hMin={150}
        hMax={290}
        baseY={baseY + 130}
        seed={11}
        opacity={1}
        density={density}
        shade={shade}
        filter={heavyFilters ? 'url(#j-bark-far)' : undefined}
      />
      <rect x="0" y={baseY - 60} width={W} height={340} fill="url(#j-mist)" opacity="0.7" />
      <TreeBand
        cam={cam}
        p={0.82}
        spacing={190}
        color={c('#9A9A9A')}
        hMin={210}
        hMax={330}
        baseY={baseY + 230}
        seed={23}
        opacity={1}
        density={density}
        texture={texture}
        shade={shade}
        filter={heavyFilters ? 'url(#j-bark-mid)' : undefined}
      />

      <RealCastle T={T} cam={cam} cue={CUES} c={c} />
      <Horizon T={T} cam={cam} cue={CUES} c={c} />
      <Colonnade cam={cam} T={T} cue={CUES.Engineer} c={c} />
      <Gateway cam={cam} c={c} />
      <Ground cam={cam} c={c} />
      <Bridge cam={cam} T={T} cue={CUES.Storm} c={c} />
      <Network cam={cam} T={T} cue={CUES.FirstJob} c={c} />
      <Walker T={T} cam={cam} cue={CUES} c={c} />

      <Storm T={T} cue={CUES.Storm} end={CUES.Engineer} c={c} />
      <TreeBand
        cam={cam}
        p={1.32}
        spacing={520}
        color={c('#3C3C3C')}
        hMin={360}
        hMax={560}
        baseY={H + 120}
        seed={41}
        opacity={1}
        density={density * 0.85}
        texture={texture}
        shade={shade}
        filter={heavyFilters ? 'url(#j-bark-near)' : undefined}
      />

      <rect x="0" y="0" width={W} height={H} fill={c('#B7B7B7')} opacity={light} />
      {/* Golden-hour grade. Multiply warms a paper-white scene; inverted it has to be a much
            gentler soft-light or the whole frame goes olive. */}
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        fill={c(WARM)}
        opacity={dark ? warmth * 0.42 : warmth}
        style={{ mixBlendMode: dark ? 'soft-light' : 'multiply' }}
      />
    </svg>
  )
}

/* Typography lives in its own layer: cover-scaled alongside the artwork on wide screens,
   reflowed in viewport units on narrow ones where that scaling would crop it off-screen. */
function Typography({ T, c, layout }: { T: number; c: Ink; layout: Layout }) {
  return (
    <>
      {beats.map((b, i) => (
        <Beat key={i} T={T} b={b} layout={layout} c={c} />
      ))}
      <Continues T={T} cue={CUES.Continues} next={CUES.ChapterTwo} layout={layout} c={c} />

      <div
        className="j-chapter"
        style={{
          color: c('#C9C9C9'),
          opacity: Math.min(
            MOTION.enter(1.4, 1.4)(T),
            1 - MOTION.enter(CUES.Continues - 0.6, 0.8)(T),
          ),
        }}
      >
        {chapterOneLabel}
      </div>
      <div
        className="j-chapter"
        style={{
          color: c('#C9C9C9'),
          opacity: Math.min(
            MOTION.enter(CUES.ChapterTwo + 1.4, 1.4)(T),
            1 - MOTION.enter(TOTAL - 1.6, 1)(T),
          ),
        }}
      >
        {chapterTwoLabel}
      </div>
    </>
  )
}

/* ---------- scroll host ---------- */

const stepsById = new Map(journeyStory.map((s) => [s.id, s]))

export function JourneyScene() {
  const rootRef = useRef<HTMLElement>(null)
  const [T, setT] = useState(0)
  const [dark, setDark] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [flow, setFlow] = useState(false)
  const [mounted, setMounted] = useState(false)

  /* Theme, viewport and motion preference all come from the document — read after mount
     so SSR emits the transcript only and hydration never mismatches. */
  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const sync = () => setDark(root.classList.contains('dark'))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const narrow = window.matchMedia('(max-width: 800px)')
    const onMotion = () => setReduced(motion.matches)
    const onNarrow = () => setFlow(narrow.matches)
    onMotion()
    onNarrow()
    motion.addEventListener('change', onMotion)
    narrow.addEventListener('change', onNarrow)
    return () => {
      obs.disconnect()
      motion.removeEventListener('change', onMotion)
      narrow.removeEventListener('change', onNarrow)
    }
  }, [])

  /* Cover-scale the authored 1920x1080 composition to the viewport. Artwork and type live
     in the same box, so scaling them together keeps them locked to each other. */
  useEffect(() => {
    if (!mounted || reduced) return
    const el = rootRef.current
    if (!el) return
    const fit = () => {
      const w = window.innerWidth,
        h = window.innerHeight
      el.style.setProperty('--j-scale', String(Math.max(w / W, h / H)))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [mounted, reduced])

  const c = useMemo<Ink>(() => (dark ? toDark : (hex: string) => hex), [dark])

  useGSAP(
    () => {
      if (!mounted || reduced) return
      const proxy = { p: 0 }
      gsap.to(proxy, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1, // longer settle; Lenis feeds this a continuous position
          invalidateOnRefresh: true,
        },
        // warp() buys more scroll for the stretches carrying text; quantise skips duplicate renders
        onUpdate: () => setT(Math.round(warp(proxy.p) * 60) / 60),
      })
    },
    { scope: rootRef, dependencies: [mounted, reduced] },
  )

  const transcript = (
    <ol className="j-transcript">
      {beats.flatMap((b) =>
        (b.ids || []).map((id) => {
          const s = stepsById.get(id)
          if (!s) return null
          return (
            <li key={id}>
              <strong>{s.date}</strong> — {s.role}, {s.company}. {s.summary}
            </li>
          )
        }),
      )}
    </ol>
  )

  if (mounted && reduced)
    return (
      <div className="journey-reduced">
        {transcript}
        <JourneyTimeline />
      </div>
    )

  return (
    <section ref={rootRef} className="journey-scene" aria-label="Scroll-driven career journey">
      <div className="journey-stage">
        <div className="journey-canvas">
          {mounted ? <World T={T} dark={dark} c={c} heavyFilters={!flow} /> : null}
        </div>
        <div className="journey-type" data-flow={flow ? '' : undefined}>
          {mounted ? <Typography T={T} c={c} layout={flow ? 'flow' : 'stage'} /> : null}
        </div>
      </div>
      {transcript}
    </section>
  )
}
