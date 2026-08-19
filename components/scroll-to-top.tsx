'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* The button is fixed bottom-left and would otherwise sit on top of the footer, which is
     why the footer used to carry extra bottom padding. Hiding it here keeps the footer tight.
     Re-run per route: each page renders its own footer, and /journey has none. */
  useEffect(() => {
    setAtFooter(false)
    const footer = document.querySelector('footer.footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting))
    observer.observe(footer)
    return () => observer.disconnect()
  }, [pathname])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scroll-to-top ${visible && !atFooter ? 'visible' : ''}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}
