// Server-only: reads GITHUB_TOKEN. Never import this from a 'use client' file.

export type ContributionDay = {
  date: string
  count: number
  weekday: number
  level: 0 | 1 | 2 | 3 | 4
}
export type ContributionWeek = { days: ContributionDay[] }
export type LanguageStat = { name: string; color: string; bytes: number; percent: number }
export type RepoStat = {
  name: string
  url: string
  description: string | null
  stars: number
  language: { name: string; color: string } | null
}
export type RecentRepo = {
  name: string
  url: string
  description: string | null
  commits: number
  pushedAt: string
  language: { name: string; color: string } | null
}
export type ActivityTotals = {
  commits: number
  pullRequests: number
  issues: number
  reviews: number
  repositoriesContributedTo: number
}
export type Streak = { current: number; longest: number }
export type ProfileStats = { followers: number; following: number; memberSince: number }
export type GithubDashboard = {
  totalContributions: number
  weeks: ContributionWeek[]
  publicRepoCount: number
  totalStars: number
  languages: LanguageStat[]
  topRepos: RepoStat[]
  recentRepos: RecentRepo[]
  activity: ActivityTotals
  streak: Streak
  profile: ProfileStats
}

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      followers {
        totalCount
      }
      following {
        totalCount
      }
      createdAt
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            url
            description
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
        commitContributionsByRepository(maxRepositories: 6) {
          repository {
            name
            url
            description
            pushedAt
            primaryLanguage {
              name
              color
            }
          }
          contributions {
            totalCount
          }
        }
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          url
          description
          stargazerCount
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`

type GraphqlLanguage = { name: string; color: string }
type GraphqlRepoNode = {
  name: string
  url: string
  description: string | null
  stargazerCount: number
  primaryLanguage: GraphqlLanguage | null
  languages: { edges: { size: number; node: GraphqlLanguage }[] }
}
type GraphqlPinnedRepo = {
  name: string
  url: string
  description: string | null
  stargazerCount: number
  primaryLanguage: GraphqlLanguage | null
}
type GraphqlCommitContribution = {
  repository: {
    name: string
    url: string
    description: string | null
    pushedAt: string
    primaryLanguage: GraphqlLanguage | null
  }
  contributions: { totalCount: number }
}

type GraphqlResponse = {
  data?: {
    user: {
      followers: { totalCount: number }
      following: { totalCount: number }
      createdAt: string
      pinnedItems: { nodes: GraphqlPinnedRepo[] }
      contributionsCollection: {
        totalCommitContributions: number
        totalIssueContributions: number
        totalPullRequestContributions: number
        totalPullRequestReviewContributions: number
        totalRepositoriesWithContributedCommits: number
        contributionCalendar: {
          totalContributions: number
          weeks: {
            contributionDays: { date: string; contributionCount: number; weekday: number }[]
          }[]
        }
        commitContributionsByRepository: GraphqlCommitContribution[]
      }
      repositories: { totalCount: number; nodes: GraphqlRepoNode[] }
    } | null
  }
  errors?: unknown[]
}

function buildWeeks(
  rawWeeks: { contributionDays: { date: string; contributionCount: number; weekday: number }[] }[],
): { weeks: ContributionWeek[]; totalContributions: number } {
  const allDays = rawWeeks.flatMap((week) => week.contributionDays)
  const max = Math.max(0, ...allDays.map((day) => day.contributionCount))
  const level = (count: number): ContributionDay['level'] => {
    if (count === 0 || max === 0) return 0
    if (count <= max * 0.25) return 1
    if (count <= max * 0.5) return 2
    if (count <= max * 0.75) return 3
    return 4
  }
  const weeks = rawWeeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      weekday: day.weekday,
      level: level(day.contributionCount),
    })),
  }))
  const totalContributions = allDays.reduce((sum, day) => sum + day.contributionCount, 0)
  return { weeks, totalContributions }
}

function buildStreak(weeks: ContributionWeek[]): Streak {
  const days = weeks.flatMap((week) => week.days)
  let longest = 0
  let running = 0
  for (const day of days) {
    running = day.count > 0 ? running + 1 : 0
    longest = Math.max(longest, running)
  }
  let current = 0
  for (let i = days.length - 1; i >= 0 && days[i].count > 0; i -= 1) current += 1
  return { current, longest }
}

function buildLanguages(nodes: GraphqlRepoNode[]): LanguageStat[] {
  const byLanguage = new Map<string, { color: string; bytes: number }>()
  for (const repo of nodes) {
    for (const edge of repo.languages.edges) {
      const existing = byLanguage.get(edge.node.name)
      if (existing) existing.bytes += edge.size
      else byLanguage.set(edge.node.name, { color: edge.node.color, bytes: edge.size })
    }
  }
  const totalBytes = [...byLanguage.values()].reduce((sum, entry) => sum + entry.bytes, 0)
  return [...byLanguage.entries()]
    .map(([name, { color, bytes }]) => ({
      name,
      color,
      bytes,
      percent: totalBytes === 0 ? 0 : (bytes / totalBytes) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6)
}

function buildStarredRepos(nodes: GraphqlRepoNode[]): RepoStat[] {
  return [...nodes]
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      stars: repo.stargazerCount,
      language: repo.primaryLanguage,
    }))
}

function buildTopRepos(pinned: GraphqlPinnedRepo[], repoNodes: GraphqlRepoNode[]): RepoStat[] {
  if (pinned.length > 0)
    return pinned.map((repo) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      stars: repo.stargazerCount,
      language: repo.primaryLanguage,
    }))
  return buildStarredRepos(repoNodes)
}

function buildRecentRepos(entries: GraphqlCommitContribution[]): RecentRepo[] {
  return [...entries]
    .sort((a, b) => b.contributions.totalCount - a.contributions.totalCount)
    .slice(0, 5)
    .map((entry) => ({
      name: entry.repository.name,
      url: entry.repository.url,
      description: entry.repository.description,
      commits: entry.contributions.totalCount,
      pushedAt: entry.repository.pushedAt,
      language: entry.repository.primaryLanguage,
    }))
}

// repositories(first: 100) covers this account's current scale; revisit with pagination if it grows past that.
export async function getGithubDashboard(username: string): Promise<GithubDashboard | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: username } }),
      next: { revalidate: 3600 },
    })
    if (!response.ok) {
      console.error('GitHub GraphQL request failed', response.status)
      return null
    }
    const payload = (await response.json()) as GraphqlResponse
    if (payload.errors || !payload.data?.user) {
      console.error('GitHub GraphQL response error', payload.errors)
      return null
    }

    const { contributionsCollection, repositories, pinnedItems, followers, following, createdAt } =
      payload.data.user
    const { weeks, totalContributions } = buildWeeks(
      contributionsCollection.contributionCalendar.weeks,
    )

    return {
      totalContributions,
      weeks,
      publicRepoCount: repositories.totalCount,
      totalStars: repositories.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0),
      languages: buildLanguages(repositories.nodes),
      topRepos: buildTopRepos(pinnedItems.nodes, repositories.nodes),
      recentRepos: buildRecentRepos(contributionsCollection.commitContributionsByRepository),
      activity: {
        commits: contributionsCollection.totalCommitContributions,
        pullRequests: contributionsCollection.totalPullRequestContributions,
        issues: contributionsCollection.totalIssueContributions,
        reviews: contributionsCollection.totalPullRequestReviewContributions,
        repositoriesContributedTo: contributionsCollection.totalRepositoriesWithContributedCommits,
      },
      streak: buildStreak(weeks),
      profile: {
        followers: followers.totalCount,
        following: following.totalCount,
        memberSince: new Date(createdAt).getFullYear(),
      },
    }
  } catch (error) {
    console.error('GitHub dashboard fetch failed', error)
    return null
  }
}
