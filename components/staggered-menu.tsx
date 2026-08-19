'use client'

/* Mobile nav menu, adapted from React Bits' StaggeredMenu (https://reactbits.dev) for this
   codebase. Differences from the upstream component:
   - No internal `<header>`/logo row — the site's own wordmark stays put; this renders only
     the toggle button (placed inline by the caller, e.g. next to ThemeToggle) and the sliding
     panel (portalled to <body>, same trick components/site-header.tsx already used for its old
     nav-drawer, and for the same reason: a `position: fixed` panel must never sit inside a
     transformed ancestor like the GSAP-animated /journey intro).
   - Because the panel portals to <body> with its own z-index stack, it paints above the inline
     toggle button once open (same issue the old nav-drawer had) — so the panel carries its own
     close (X) button rather than relying on the now-covered toggle.
   - No menuButtonColor/openMenuButtonColor/changeMenuColorOnOpen — the toggle is styled by
     plain CSS (var(--foreground)) like every other control on the site, not JS color tweens.
   - Exposes an imperative `close()` handle so the caller can dismiss the menu on route change,
     Escape, or click-away, matching how the old nav-drawer's `open` state worked. */

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ArrowUpRight, X } from 'lucide-react'

export interface StaggeredMenuItem {
  label: string
  ariaLabel: string
  link: string
  active?: boolean
}

export interface StaggeredMenuSocialItem {
  label: string
  link: string
}

export interface StaggeredMenuHandle {
  close: () => void
  focusToggle: () => void
}

interface StaggeredMenuProps {
  position?: 'left' | 'right'
  colors?: string[]
  items?: StaggeredMenuItem[]
  socialItems?: StaggeredMenuSocialItem[]
  displaySocials?: boolean
  displayItemNumbering?: boolean
  accentColor?: string
  /** Extra content rendered above the socials row, e.g. a contact CTA. */
  footer?: React.ReactNode
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

export const StaggeredMenu = forwardRef<StaggeredMenuHandle, StaggeredMenuProps>(
  function StaggeredMenu(
    {
      position = 'right',
      colors = ['var(--line)', 'var(--dark)'],
      items = [],
      socialItems = [],
      displaySocials = true,
      displayItemNumbering = true,
      accentColor = 'var(--green)',
      footer,
      onMenuOpen,
      onMenuClose,
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const openRef = useRef(false)
    const panelRef = useRef<HTMLDivElement>(null)
    const preLayersRef = useRef<HTMLDivElement>(null)
    const preLayerElsRef = useRef<HTMLDivElement[]>([])
    const textInnerRef = useRef<HTMLSpanElement>(null)
    const toggleBtnRef = useRef<HTMLButtonElement>(null)
    const [textLines, setTextLines] = useState(['Menu', 'Close'])

    const openTlRef = useRef<gsap.core.Timeline | null>(null)
    const closeTweenRef = useRef<gsap.core.Tween | null>(null)
    const textCycleAnimRef = useRef<gsap.core.Tween | null>(null)
    const busyRef = useRef(false)

    useLayoutEffect(() => setMounted(true), [])

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const panel = panelRef.current
        const preContainer = preLayersRef.current
        const textInner = textInnerRef.current
        if (!panel || !textInner) return

        const preLayers = preContainer
          ? Array.from(preContainer.querySelectorAll<HTMLDivElement>('.sm-prelayer'))
          : []
        preLayerElsRef.current = preLayers

        const offscreen = position === 'left' ? -100 : 100
        gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 })
        if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 })
        gsap.set(textInner, { yPercent: 0 })
      })
      return () => ctx.revert()
    }, [position, mounted])

    const buildOpenTimeline = useCallback(() => {
      const panel = panelRef.current
      const layers = preLayerElsRef.current
      if (!panel) return null

      openTlRef.current?.kill()
      closeTweenRef.current?.kill()
      closeTweenRef.current = null

      const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'))
      const numberEls = Array.from(
        panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
      )
      const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title')
      const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'))

      const offscreen = position === 'left' ? -100 : 100
      const layerStates = layers.map((el) => ({ el, start: offscreen }))
      const panelStart = offscreen

      if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
      if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 })
      if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
      if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

      const tl = gsap.timeline({ paused: true })

      layerStates.forEach((ls, i) => {
        tl.fromTo(
          ls.el,
          { xPercent: ls.start },
          { xPercent: 0, duration: 0.5, ease: 'power4.out' },
          i * 0.07,
        )
      })
      const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0
      const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0)
      const panelDuration = 0.65
      tl.fromTo(
        panel,
        { xPercent: panelStart },
        { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
        panelInsertTime,
      )

      if (itemEls.length) {
        const itemsStart = panelInsertTime + panelDuration * 0.15
        tl.to(
          itemEls,
          {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: { each: 0.1, from: 'start' },
          },
          itemsStart,
        )
        if (numberEls.length) {
          tl.to(
            numberEls,
            {
              duration: 0.6,
              ease: 'power2.out',
              '--sm-num-opacity': 1,
              stagger: { each: 0.08, from: 'start' },
            },
            itemsStart + 0.1,
          )
        }
      }

      if (socialTitle || socialLinks.length) {
        const socialsStart = panelInsertTime + panelDuration * 0.4
        if (socialTitle) {
          tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart)
        }
        if (socialLinks.length) {
          tl.to(
            socialLinks,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              stagger: { each: 0.08, from: 'start' },
              onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
            },
            socialsStart + 0.04,
          )
        }
      }

      openTlRef.current = tl
      return tl
    }, [position])

    const playOpen = useCallback(() => {
      if (busyRef.current) return
      busyRef.current = true
      const tl = buildOpenTimeline()
      if (tl) {
        tl.eventCallback('onComplete', () => {
          busyRef.current = false
        })
        tl.play(0)
      } else {
        busyRef.current = false
      }
    }, [buildOpenTimeline])

    const playClose = useCallback(() => {
      openTlRef.current?.kill()
      openTlRef.current = null

      const panel = panelRef.current
      const layers = preLayerElsRef.current
      if (!panel) return

      const all = [...layers, panel]
      closeTweenRef.current?.kill()
      const offscreen = position === 'left' ? -100 : 100
      closeTweenRef.current = gsap.to(all, {
        xPercent: offscreen,
        duration: 0.32,
        ease: 'power3.in',
        overwrite: 'auto',
        onComplete: () => {
          const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'))
          if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
          const numberEls = Array.from(
            panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
          )
          if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 })
          const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title')
          const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'))
          if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
          if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })
          busyRef.current = false
        },
      })
    }, [position])

    const animateText = useCallback((opening: boolean) => {
      const inner = textInnerRef.current
      if (!inner) return
      textCycleAnimRef.current?.kill()

      const currentLabel = opening ? 'Menu' : 'Close'
      const targetLabel = opening ? 'Close' : 'Menu'
      const cycles = 3
      const seq = [currentLabel]
      let last = currentLabel
      for (let i = 0; i < cycles; i++) {
        last = last === 'Menu' ? 'Close' : 'Menu'
        seq.push(last)
      }
      if (last !== targetLabel) seq.push(targetLabel)
      seq.push(targetLabel)
      setTextLines(seq)

      gsap.set(inner, { yPercent: 0 })
      const lineCount = seq.length
      const finalShift = ((lineCount - 1) / lineCount) * 100
      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.5 + lineCount * 0.07,
        ease: 'power4.out',
      })
    }, [])

    const doClose = useCallback(() => {
      if (!openRef.current) return
      openRef.current = false
      setOpen(false)
      onMenuClose?.()
      playClose()
      animateText(false)
    }, [playClose, animateText, onMenuClose])

    useImperativeHandle(
      ref,
      () => ({
        close: doClose,
        focusToggle: () => toggleBtnRef.current?.focus(),
      }),
      [doClose],
    )

    const toggleMenu = useCallback(() => {
      const target = !openRef.current
      openRef.current = target
      setOpen(target)
      if (target) {
        onMenuOpen?.()
        playOpen()
      } else {
        onMenuClose?.()
        playClose()
      }
      animateText(target)
    }, [playOpen, playClose, animateText, onMenuOpen, onMenuClose])

    const prelayerColors = (() => {
      const raw = colors && colors.length ? colors.slice(0, 4) : ['var(--line)', 'var(--dark)']
      const arr = [...raw]
      if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1)
      return arr
    })()

    const panel = (
      <div
        className={open ? 'staggered-menu-wrapper is-open' : 'staggered-menu-wrapper'}
        data-position={position}
      >
        <div className="sm-scrim" onClick={doClose} aria-hidden="true" />
        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          {prelayerColors.map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c }} />
          ))}
        </div>
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel"
          aria-hidden={!open}
          style={
            accentColor
              ? ({ ['--sm-accent' as string]: accentColor } as React.CSSProperties)
              : undefined
          }
        >
          <div className="sm-panel-head">
            <button
              type="button"
              className="sm-panel-close"
              aria-label="Close menu"
              onClick={doClose}
            >
              <X size={18} />
            </button>
          </div>
          <div className="sm-panel-inner">
            {items.length > 0 && (
              <ul
                className="sm-panel-list"
                role="list"
                data-numbering={displayItemNumbering || undefined}
              >
                {items.map((it, idx) => (
                  <li className="sm-panel-itemWrap" key={it.label + idx}>
                    <a
                      className={it.active ? 'sm-panel-item is-active' : 'sm-panel-item'}
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={doClose}
                    >
                      <span className="sm-panel-itemLabel">{it.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {(footer || (displaySocials && socialItems.length > 0)) && (
              <div className="sm-panel-foot">
                {footer}
                {displaySocials && socialItems.length > 0 && (
                  <div className="sm-socials" aria-label="Social links">
                    <h3 className="sm-socials-title">Socials</h3>
                    <ul className="sm-socials-list" role="list">
                      {socialItems.map((s, i) => (
                        <li key={s.label + i} className="sm-socials-item">
                          <a
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sm-socials-link"
                          >
                            {s.label}
                            <ArrowUpRight size={18} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    )

    return (
      <>
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
        </button>
        {mounted ? createPortal(panel, document.body) : null}
      </>
    )
  },
)
