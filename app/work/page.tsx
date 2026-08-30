import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { projects } from '@/lib/portfolio-data'
import { WorkFilter } from '@/components/work-filter'

export const metadata = {
  title: 'Selected Work — Rajnish J',
  description: 'Detailed case studies and contributions from Rajnish J.',
}

export default function WorkPage() {
  return (
    <main>
      <SiteHeader />
      <section className="subpage-hero section-wrap">
        <p className="eyebrow">Selected work / case studies</p>
        <BackLink href="/" label="Back home" />
        <h1>
          Systems built for
          <br />
          <em>real work.</em>
        </h1>
        <p className="subpage-lede">
          A closer look at the platforms I&apos;ve shipped at Synergech and the systems I&apos;ve
          built on my own — office work and personal projects, side by side.
        </p>
      </section>
      <section className="section-wrap">
        <WorkFilter projects={projects} />
      </section>
      <SiteFooter>
        <Link href="/journey">
          View the journey <ArrowUpRight size={15} />
        </Link>
      </SiteFooter>
    </main>
  )
}
