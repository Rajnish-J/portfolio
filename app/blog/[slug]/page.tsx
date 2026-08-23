import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { posts, postBodies, getReadingStats } from '@/lib/portfolio-data'
import { renderInline } from '@/lib/render-inline'

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
  const blocks = postBodies[post.slug]
  const stats = getReadingStats(blocks)
  const initials = post.author
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
  return (
    <main className="article-shell">
      <SiteHeader />
      <article className="article-page section-wrap">
        <p className="eyebrow">
          {post.tags.join(' · ')} · {stats.minutes} min read · {stats.words} words
        </p>
        <BackLink href="/blog" label="All writing" />
        <h1>{post.title}</h1>
        <p className="article-lede">{post.excerpt}</p>
        <div className="article-byline">
          <span className="blog-avatar">{initials}</span>
          <div>
            <p>{post.author}</p>
            <p>published {post.date}</p>
          </div>
        </div>
        <div className="article-body">
          {blocks.map((block, index) => {
            switch (block.type) {
              case 'lede':
                return (
                  <blockquote className="article-lede-quote" key={index}>
                    {renderInline(block.text)}
                  </blockquote>
                )
              case 'section':
                return (
                  <div className="article-section" key={index}>
                    <p className="article-section-label">
                      {block.index} — {block.label}
                    </p>
                    <h2 className="article-section-heading">{block.heading}</h2>
                  </div>
                )
              case 'paragraph':
                return <p key={index}>{renderInline(block.text)}</p>
              case 'quote':
                return (
                  <blockquote className="article-quote" key={index}>
                    {renderInline(block.text)}
                  </blockquote>
                )
              case 'image':
                return (
                  <figure className="article-image" key={index}>
                    <img src={block.src} alt={block.alt} />
                    {block.caption && <figcaption>{block.caption}</figcaption>}
                  </figure>
                )
              case 'imageGrid':
                return (
                  <div className="article-image-grid" key={index}>
                    {block.images.map((image) => (
                      <figure className="article-image" key={image.src}>
                        <img src={image.src} alt={image.alt} />
                        {image.caption && <figcaption>{image.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                )
              case 'list':
                return (
                  <ul className="article-list" key={index}>
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{renderInline(item)}</li>
                    ))}
                  </ul>
                )
              case 'code':
                return (
                  <pre className="article-code" key={index}>
                    <code>{block.code}</code>
                  </pre>
                )
              default:
                return null
            }
          })}
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
