'use client'

import { useEffect, useRef } from 'react'

const FALLBACK: [number, number, number, number] = [107, 114, 128, 0.12]

/** Resolve any CSS color (hex, rgb, hsl, oklch, ...) to [r, g, b, a] via a 1x1 probe canvas. */
function parseColor(color: string): [number, number, number, number] {
  if (!color) return FALLBACK
  const probe = document.createElement('canvas')
  probe.width = 1
  probe.height = 1
  const ctx = probe.getContext('2d')
  if (!ctx) return FALLBACK
  // An invalid value leaves fillStyle at its previous setting rather than throwing,
  // so seed with a known color to detect that case.
  ctx.fillStyle = '#000'
  ctx.fillStyle = color
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  return [r, g, b, a / 255]
}

interface GlyphMatrixProps {
  glyphs?: string
  cellSize?: number
  mutationRate?: number
  interval?: number
  fadeBottom?: number
  className?: string
  style?: React.CSSProperties
}

export function GlyphMatrix({
  glyphs = '01·+*/\\<>=',
  cellSize = 18,
  mutationRate = 0.03,
  interval = 110,
  fadeBottom = 0.6,
  className = '',
  style,
}: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let cols = 0
    let rows = 0
    let size = cellSize
    let rate = mutationRate
    let cells: string[] = []
    let alphas: number[] = []
    let raf = 0
    let last = 0
    let stopped = false

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { clientWidth: w, clientHeight: h } = canvas

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Smaller glyphs on phones so the field reads as fine texture rather than
      // large characters competing with the content.
      size = w <= 800 ? cellSize - 6 : cellSize
      rate = w <= 800 ? mutationRate * 0.6 : mutationRate

      cols = Math.ceil(w / size)
      rows = Math.ceil(h / size)

      cells = new Array(cols * rows)
        .fill(0)
        .map(() => glyphs[Math.floor(Math.random() * glyphs.length)])
      alphas = new Array(cols * rows).fill(0).map(() => 0.05 + Math.random() * 0.35)
    }

    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      const color = getComputedStyle(canvas).getPropertyValue('--glyph-matrix-color').trim()
      // Split the token into channels so its alpha can be folded into each cell's own
      // alpha. Setting globalAlpha on top of an rgba() fill would multiply the two and
      // render the field almost invisible.
      const [cr, cg, cb, ca] = parseColor(color)

      ctx.clearRect(0, 0, w, h)
      ctx.font = `${size - 2}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textBaseline = 'top'

      for (let y = 0; y < rows; y++) {
        const fade = fadeBottom > 0 ? 1 - (y / rows) * fadeBottom : 1
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alphas[i] * fade * ca})`
          ctx.fillText(cells[i], x * size, y * size)
        }
      }
    }

    const tick = (t: number) => {
      if (stopped) return
      if (t - last >= interval) {
        last = t
        const total = cols * rows
        const mutations = Math.max(1, Math.floor(total * rate))
        for (let n = 0; n < mutations; n++) {
          const i = Math.floor(Math.random() * total)
          cells[i] = glyphs[Math.floor(Math.random() * glyphs.length)]
          alphas[i] = 0.05 + Math.random() * 0.45
        }
        draw()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    draw()
    if (!reduceMotion) raf = requestAnimationFrame(tick)

    const redraw = () => {
      resize()
      draw()
    }

    const ro = new ResizeObserver(redraw)
    ro.observe(canvas)

    const themeObserver = new MutationObserver(draw)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      stopped = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      themeObserver.disconnect()
    }
  }, [glyphs, cellSize, mutationRate, interval, fadeBottom])

  return (
    <div className={`glyph-matrix ${className}`} style={style}>
      <canvas ref={canvasRef} className="glyph-matrix__canvas" aria-hidden="true" />
    </div>
  )
}
