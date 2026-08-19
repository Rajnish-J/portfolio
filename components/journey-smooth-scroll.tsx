'use client'

/* Lenis eases the *real* native scroll position, so position:sticky, anchor links and
   keyboard/accessibility scrolling all keep working and ScrollTrigger reads genuine offsets.
   GSAP's own ScrollSmoother is not usable here: it applies matrix3d() to a content wrapper,
   which creates a containing block and breaks the sticky .journey-stage the scene is built on.

   Mounted only by the journey page — the rest of the site keeps native scrolling. */

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export function JourneySmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1 }) // touch stays native; syncTouch feels wrong on mobile
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    /* Teardown is not optional: without it, navigating away from /journey leaves scrolling
       hijacked on every subsequent page. */
    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33) // gsap's default
      lenis.destroy()
    }
  }, [])

  return null
}
