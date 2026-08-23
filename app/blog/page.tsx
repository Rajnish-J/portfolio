import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { posts } from '@/lib/portfolio-data'
import { BlogFilter } from '@/components/blog-filter'

export const metadata = {
  title: 'Writing — Rajnish J',
  description: 'Notes on AI systems, infrastructure, and developer experience.',
}
export default function BlogPage() {
  return (
    <main>
      <SiteHeader />
      <section className="subpage-hero section-wrap">
        <p className="eyebrow">Notes / writing</p>
        <BackLink href="/" label="Back home" />
        <h1>
          Ideas in
          <br />
          <em>progress.</em>
        </h1>
        <p className="subpage-lede">
          Short notes on building intelligent systems, reducing operational friction, and making
          developer tools feel more human.
        </p>
      </section>
      <section className="section-wrap">
        <BlogFilter posts={posts} />
      </section>
      <SiteFooter>
        <Link href="/">
          Home <ArrowUpRight size={15} />
        </Link>
      </SiteFooter>
    </main>
  )
}
