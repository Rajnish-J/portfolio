'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { posts as postsType } from '@/lib/portfolio-data'
import { postBodies, getReadingStats } from '@/lib/portfolio-data'

type Post = (typeof postsType)[number]

function initials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function yearOf(date: string) {
  return date.split(', ').pop() ?? date
}

function shortDate(date: string) {
  const [month, day] = date.split(' ')
  return `${month.slice(0, 3)} ${day.replace(',', '')}`
}

export function BlogFilter({ posts }: { posts: Post[] }) {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)))
  const [filter, setFilter] = useState('all')

  const visible = posts.filter((post) => filter === 'all' || post.tags.includes(filter))
  const featured = posts[0]

  const years = Array.from(new Set(visible.map((post) => yearOf(post.date))))

  return (
    <>
      <div className="blog-tabs" role="tablist" aria-label="Filter writing">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          all {posts.length}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={filter === tag}
            className={filter === tag ? 'active' : ''}
            onClick={() => setFilter(tag)}
          >
            {tag} {posts.filter((post) => post.tags.includes(tag)).length}
          </button>
        ))}
      </div>

      {filter === 'all' && featured && (
        <section className="blog-featured">
          <p className="blog-featured-label">$ featured · latest essay</p>
          <Link className="blog-featured-card" href={`/blog/${featured.slug}`}>
            <div className="blog-featured-content">
              <p className="blog-featured-meta">
                {featured.tags.join(' · ')} · {getReadingStats(postBodies[featured.slug]).minutes}{' '}
                min read
              </p>
              <h2>{featured.title}</h2>
              <p className="blog-featured-excerpt">{featured.excerpt}</p>
              <div className="blog-featured-byline">
                <span className="blog-avatar">{initials(featured.author)}</span>
                <span>
                  by {featured.author} · {featured.date}
                </span>
              </div>
            </div>
            {featured.coverImage && (
              <img className="blog-featured-image" src={featured.coverImage} alt={featured.title} />
            )}
          </Link>
        </section>
      )}

      {years.map((year) => {
        const yearPosts = visible.filter((post) => yearOf(post.date) === year)
        return (
          <section className="section-wrap posts-list" key={year}>
            <h2 className="blog-year-heading">
              {year} <span>— {yearPosts.length} posts this year</span>
            </h2>
            {yearPosts.map((post) => (
              <Link className="post-row" href={`/blog/${post.slug}`} key={post.slug}>
                {post.coverImage && (
                  <img className="post-row-image" src={post.coverImage} alt={post.title} />
                )}
                <span className="post-number">{shortDate(post.date)}</span>
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </div>
                <div className="post-row-meta">
                  <div className="post-row-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="post-row-time">
                    {getReadingStats(postBodies[post.slug]).minutes} min
                  </span>
                </div>
                <ArrowUpRight size={19} />
              </Link>
            ))}
          </section>
        )
      })}
    </>
  )
}
