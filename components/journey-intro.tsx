'use client'

/* The journey page opens on a full-viewport intro. As the reader scrolls it lifts and fades
   while the scene rises into place beneath it — the scene's own ScrollTrigger is untouched,
   since it only starts once .journey-scene reaches the top of the viewport. */

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function JourneyIntro({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.to(ref.current, {
        opacity: 0,
        y: -80,
        ease: 'none', // scrubbed tweens must not carry their own ease
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.4 },
      })
      // webfonts swapping in can shift the intro's height after the trigger is measured
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: ref },
  )

  return (
    <div className="journey-intro" ref={ref}>
      {children}
    </div>
  )
}
