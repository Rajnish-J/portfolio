import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { projects } from '@/lib/portfolio-data'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()
  return (
    <main>
      <SiteHeader />
      <article className="article-page section-wrap">
        <p className="eyebrow">
          {project.number} · {project.kind}
        </p>
        <BackLink href="/work" label="Back to work" />
        <h1>{project.title}</h1>
        <p className="article-lede">{project.summary}</p>
        <div className="project-detail-grid">
          <div>
            <p className="eyebrow">Overview</p>
            <p>{project.overview}</p>
            {'liveUrl' in project && project.liveUrl && (
              <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit project <ArrowUpRight size={15} />
              </a>
            )}
          </div>
          <div>
            <p className="eyebrow">My contribution</p>
            <ul>
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="eyebrow detail-outcome">Outcome</p>
            <p>{project.impact}</p>
          </div>
        </div>
        <div className="tag-list detail-tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </article>
      <SiteFooter>
        <Link href="/work">
          All work <ArrowUpRight size={15} />
        </Link>
      </SiteFooter>
    </main>
  )
}
