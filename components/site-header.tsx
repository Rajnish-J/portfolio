'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { socialLinks } from '@/components/portfolio-enhancements'
import { StaggeredMenu, type StaggeredMenuHandle } from '@/components/staggered-menu'

export const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/#about' },
  { label: 'Toolkit', href: '/#toolkit' },
  { label: 'Journey', href: '/journey' },
  { label: 'Writing', href: '/blog' },
  { label: 'GitHub', href: '/github' },
  { label: 'Contact', href: '/contact' },
]

const menuSocialItems = socialLinks.map(([label, href]) => ({ label, link: href }))

function routeLabel(pathname: string) {
  if (pathname.startsWith('/work') || pathname.startsWith('/projects')) return 'Work'
  if (pathname.startsWith('/journey')) return 'Journey'
  if (pathname.startsWith('/blog')) return 'Writing'
  if (pathname.startsWith('/github')) return 'GitHub'
  if (pathname.startsWith('/contact')) return 'Contact'
  return ''
}

export function SiteHeader({ variant = 'subpage' }: { variant?: 'home' | 'subpage' }) {
  const pathname = usePathname()
  const [section, setSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<StaggeredMenuHandle>(null)
  const isHome = variant === 'home'
  const active = (isHome ? section : '') || routeLabel(pathname)

  useEffect(() => {
    menuRef.current?.close()
  }, [pathname])

  useEffect(() => {
    if (!isHome) return
    const sections = ['about', 'toolkit']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setSection(visible.target.id === 'about' ? 'About' : 'Toolkit')
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    if (!menuOpen) return
    const root = document.documentElement
    const previousOverflow = document.body.style.overflow
    const previousRootOverflow = root.style.overflow
    document.body.style.overflow = 'hidden'
    root.style.overflow = 'hidden'
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        menuRef.current?.close()
        menuRef.current?.focusToggle()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      root.style.overflow = previousRootOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const wordmark = (
    <Link className="wordmark" href="/" aria-label="Rajnish J home">
      <span className="wordmark-initial">
        R<span>J.</span>
      </span>
      <strong>Rajnish J</strong>
    </Link>
  )

  return (
    <header className={isHome ? 'site-header' : 'subpage-header section-wrap'}>
      {wordmark}
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.label} className={active === item.label ? 'active' : ''} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
      </div>
      <StaggeredMenu
        ref={menuRef}
        items={navItems.map((item) => ({
          label: item.label,
          ariaLabel: `Go to ${item.label}`,
          link: item.href,
          active: active === item.label,
        }))}
        socialItems={menuSocialItems}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        footer={
          <Link
            className="button button-dark sm-panel-cta"
            href="/contact"
            onClick={() => menuRef.current?.close()}
          >
            Let&apos;s talk <ArrowUpRight size={16} />
          </Link>
        }
      />
    </header>
  )
}
