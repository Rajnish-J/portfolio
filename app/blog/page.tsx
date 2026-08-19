import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { posts } from '@/lib/portfolio-data'

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
      <section className="section-wrap posts-list">
        {posts.map((post, index) => (
          <Link className="post-row" href={`/blog/${post.slug}`} key={post.slug}>
            <span className="post-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="project-kind">
                {post.category} · {post.date}
              </p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
            <ArrowUpRight size={19} />
          </Link>
        ))}
      </section>
      <SiteFooter>
        <Link href="/">
          Home <ArrowUpRight size={15} />
        </Link>
      </SiteFooter>
    </main>
  )
}
