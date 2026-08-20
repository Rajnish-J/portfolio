'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'

interface DotGridProps {
  dotSize?: number
  gap?: number
  className?: string
  style?: React.CSSProperties
}

interface Dot {
  cx: number
  cy: number
}

export function DotGrid({ dotSize = 3, gap = 24, className = '', style }: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null
    const path = new window.Path2D()
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return path
  }, [dotSize])

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)

    const cell = dotSize + gap
    const cols = Math.floor((width + gap) / cell)
    const rows = Math.floor((height + gap) / cell)
    const gridW = cell * cols - gap
    const gridH = cell * rows - gap
    const startX = (width - gridW) / 2 + dotSize / 2
    const startY = (height - gridH) / 2 + dotSize / 2

    const dots: Dot[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({ cx: startX + x * cell, cy: startY + y * cell })
      }
    }
    dotsRef.current = dots
  }, [dotSize, gap])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !circlePath) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const color = getComputedStyle(canvas).getPropertyValue('--dot-grid-color').trim()

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = color || 'rgba(0, 0, 0, 0.06)'
    for (const dot of dotsRef.current) {
      ctx.save()
      ctx.translate(dot.cx, dot.cy)
      ctx.fill(circlePath)
      ctx.restore()
    }
  }, [circlePath])

  useEffect(() => {
    buildGrid()
    draw()

    const redraw = () => {
      buildGrid()
      draw()
    }

    let ro: ResizeObserver | null = null
    if ('ResizeObserver' in window && wrapperRef.current) {
      ro = new ResizeObserver(redraw)
      ro.observe(wrapperRef.current)
    } else {
      window.addEventListener('resize', redraw)
    }

    const themeObserver = new MutationObserver(draw)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', redraw)
      themeObserver.disconnect()
    }
  }, [buildGrid, draw])

  return (
    <div ref={wrapperRef} className={`dot-grid ${className}`} style={style}>
      <canvas ref={canvasRef} className="dot-grid__canvas" />
    </div>
  )
}
