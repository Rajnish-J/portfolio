import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { GithubStatGrid } from '@/components/github-stat-grid'
import { RecentRepos } from '@/components/recent-repos'
import { ContributionHeatmap } from '@/components/contribution-heatmap'
import { LanguageBar } from '@/components/language-bar'
import { RepoList } from '@/components/repo-list'
import { contactInfo } from '@/lib/portfolio-data'
import { getGithubDashboard } from '@/lib/github'

export const metadata = {
  title: 'GitHub — Rajnish J',
  description: 'Public commits, quantified — a live pull from Rajnish J’s GitHub profile.',
}

export default async function GithubPage() {
  const stats = await getGithubDashboard('Rajnish-J')

  return (
    <main>
      <SiteHeader />
      <section className="subpage-hero section-wrap">
        <p className="eyebrow">Public commits, quantified</p>
        <BackLink href="/" label="Back home" />
        <h1>
          The honest
          <br />
          <em>signal.</em>
        </h1>
        <p className="subpage-lede">
          A dashboard pulled live from {contactInfo.githubHandle} — the public slice of it, anyway.
        </p>
        {stats && (
          <p className="profile-caption">
            {stats.profile.followers} followers · {stats.profile.following} following · Building in
            public since {stats.profile.memberSince}
          </p>
        )}
      </section>

      {stats ? (
        <>
          <section className="section-wrap">
            <GithubStatGrid stats={stats} />
          </section>

          <section className="section-wrap section-block-tight">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Activity</p>
                <h2>
                  Past
                  <br />
                  <em>12 months.</em>
                </h2>
              </div>
              <p className="section-intro">
                Commits, pull requests, reviews, and issues across every repo I&apos;ve touched.
              </p>
            </div>
            <div className="activity-grid">
              <div className="github-stat-card">
                <p className="github-stat-value">{stats.activity.commits}</p>
                <p className="github-stat-label">Commits</p>
              </div>
              <div className="github-stat-card">
                <p className="github-stat-value">{stats.activity.pullRequests}</p>
                <p className="github-stat-label">Pull requests</p>
              </div>
              <div className="github-stat-card">
                <p className="github-stat-value">{stats.activity.issues}</p>
                <p className="github-stat-label">Issues</p>
              </div>
              <div className="github-stat-card">
                <p className="github-stat-value">{stats.activity.reviews}</p>
                <p className="github-stat-label">Reviews</p>
              </div>
              <div className="github-stat-card">
                <p className="github-stat-value">{stats.activity.repositoriesContributedTo}</p>
                <p className="github-stat-label">Repos touched</p>
              </div>
            </div>

            {stats.recentRepos.length > 0 && (
              <>
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Right now</p>
                    <h2>
                      Actively
                      <br />
                      <em>working on.</em>
                    </h2>
                  </div>
                  <p className="section-intro">
                    Repos with the most commits in the last 12 months, most recent first.
                  </p>
                </div>
                <RecentRepos repos={stats.recentRepos} />
              </>
            )}
          </section>

          <section className="section-wrap section-block-tight">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Contribution heatmap</p>
                <h2>
                  Last
                  <br />
                  <em>12 months.</em>
                </h2>
              </div>
              <p className="section-intro">
                {stats.totalContributions === 0
                  ? 'Quiet on the public graph — most of my day-to-day work lives in private and enterprise repos.'
                  : `Current streak: ${stats.streak.current} day${stats.streak.current === 1 ? '' : 's'} · Longest: ${stats.streak.longest} day${stats.streak.longest === 1 ? '' : 's'}.`}
              </p>
            </div>
            <ContributionHeatmap weeks={stats.weeks} />
          </section>

          <section className="section-wrap section-block-tight">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Languages</p>
                <h2>
                  Weighted by
                  <br />
                  <em>bytes.</em>
                </h2>
              </div>
              <p className="section-intro">
                Aggregated across my public repositories, largest first.
              </p>
            </div>
            <LanguageBar languages={stats.languages} />
          </section>

          <section className="section-wrap section-block-tight">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Featured</p>
                <h2>
                  Repos worth
                  <br />
                  <em>a look.</em>
                </h2>
              </div>
              <a
                className="text-link"
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                View full profile on GitHub <ArrowUpRight size={16} />
              </a>
            </div>
            <RepoList repos={stats.topRepos} />
          </section>
        </>
      ) : (
        <section className="section-wrap section-block-tight">
          <p className="section-intro">
            GitHub stats aren&apos;t available right now.{' '}
            <a className="text-link" href={contactInfo.githubUrl} target="_blank" rel="noreferrer">
              View the profile directly <ArrowUpRight size={16} />
            </a>
          </p>
        </section>
      )}

      <SiteFooter>
        <Link href="/work">
          See the work <ArrowUpRight size={15} />
        </Link>
      </SiteFooter>
    </main>
  )
}
