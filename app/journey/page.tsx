import { ArrowDown } from 'lucide-react'
import { Instrument_Serif, Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { BackLink } from '@/components/back-link'
import { JourneyIntro } from '@/components/journey-intro'
import { JourneySmoothScroll } from '@/components/journey-smooth-scroll'
import { JourneyScene } from '@/components/journey-scene'

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--j-serif',
  display: 'swap',
})
const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--j-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Journey — Rajnish J',
  description: 'Rajnish J career journey and engineering milestones.',
}

export default function JourneyPage() {
  return (
    <main className={`${serif.variable} ${sans.variable}`}>
      <JourneySmoothScroll />
      <JourneyIntro>
        <SiteHeader />
        <section className="subpage-hero section-wrap">
          <p className="eyebrow">The journey / an ongoing story</p>
          <BackLink href="/" label="Back home" />
          <h1>
            Finding the
            <br />
            <em>next horizon.</em>
          </h1>
          <p className="subpage-lede">
            A small explorer, a long path, and a career built one useful system at a time. Scroll
            through the chapters and follow the road.
          </p>
        </section>
        <p className="journey-cue section-wrap">
          Scroll to begin{' '}
          <span>
            <ArrowDown size={14} />
          </span>
        </p>
      </JourneyIntro>
      <JourneyScene />
    </main>
  )
}
