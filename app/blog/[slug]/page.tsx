import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { posts, postBodies } from '@/lib/portfolio-data'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)
  return { title: post ? `${post.title} — Rajnish J` : 'Writing — Rajnish J' }
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)
  if (!post) notFound()
  return (
    <main>
      <SiteHeader />
      <article className="article-page section-wrap">
        <p className="eyebrow">
          {post.category} · {post.date}
        </p>
        <BackLink href="/blog" label="All writing" />
        <h1>{post.title}</h1>
        <p className="article-lede">{post.excerpt}</p>
        <div className="article-body">
          {postBodies[post.slug].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
      <SiteFooter>
        <Link href="/blog">
          More notes <ArrowUpRight size={15} />
        </Link>
      </SiteFooter>
    </main>
  )
}
