import { ArrowUpRight, GitFork, Github, Star } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { env } from '../../config/env'
import { useResource } from '../../hooks/useResource'
import { StatusMessage } from '../../components/common/StatusMessage'
import { getRepositories } from '../../services/github/githubService'
import { getRecentActivity } from '../../services/github/activity'
import type { GitHubActivity } from '../../services/github/activity'
import type { GitHubRepository } from '../../services/github/githubService'

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(date))
}

export function GitHubSection() {
  const username = env.githubUsername
  const repositories = useResource(() => username ? getRepositories() : Promise.resolve([]), [username])
  const activity = useResource(() => username ? getRecentActivity(username) : Promise.resolve([]), [username])
  const sorted: GitHubRepository[] = [...(repositories.data ?? [])].sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
  const languages = [...new Set(sorted.map((repository) => repository.language).filter((language): language is string => Boolean(language)))].slice(0, 8)

  return (
    <section className="section-wrap section section--github" id="github">
      <div className="github-section__heading">
        <div><span className="eyebrow">Open source, in the open</span><h2>GitHub<br />activity<span>.</span></h2><p>Public repositories and recent activity from the configured GitHub account.</p></div>
        {siteConfig.links.github && <a className="github-profile-link" href={siteConfig.links.github} target="_blank" rel="noreferrer"><Github size={17} /> View profile <ArrowUpRight size={14} /></a>}
      </div>
      {!username ? (
        <div className="github-setup"><Github size={21} /><div><span className="eyebrow">PUBLIC DATA NOT CONNECTED</span><p>Set <code>VITE_GITHUB_USERNAME</code> to load real repositories and activity. No sample metrics are shown.</p></div></div>
      ) : (
        <>
          <div className="github-stats">
            <div><span>PUBLIC REPOSITORIES</span><strong>{repositories.data ? repositories.data.length : '—'}</strong></div>
            <div><span>LANGUAGES IN REPOS</span><strong>{repositories.data ? languages.length : '—'}</strong></div>
            <div><span>RECENT PUBLIC EVENTS</span><strong>{activity.data ? activity.data.length : '—'}</strong></div>
            <a href={`https://github.com/${encodeURIComponent(username)}`} target="_blank" rel="noreferrer"><span>ACCOUNT</span><strong>@{username}<ArrowUpRight size={17} /></strong></a>
          </div>
          <div className="github-content-grid">
            <div className="github-repositories">
              <div className="github-panel-heading"><span>RECENTLY UPDATED</span><i /></div>
              {repositories.loading || repositories.error ? <StatusMessage loading={repositories.loading} error={repositories.error} onRetry={repositories.reload} /> : sorted.length ? (
                sorted.slice(0, 6).map((repository) => (
                  <a className="repo-row" key={repository.id} href={repository.html_url} target="_blank" rel="noreferrer">
                    <div><h3>{repository.name}<ArrowUpRight size={13} /></h3><p>{repository.description || 'No description provided.'}</p><span>{repository.language && <i />}{repository.language || 'Language not specified'} · Updated {formatDate(repository.pushed_at)}</span></div>
                    <span className="repo-row__metrics"><span><Star size={13} />{repository.stargazers_count}</span><span><GitFork size={13} />{repository.forks_count}</span></span>
                  </a>
                ))
              ) : <p className="github-empty">No public repositories were returned for this account.</p>}
            </div>
            <div className="github-activity">
              <div className="github-panel-heading"><span>PUBLIC ACTIVITY</span><i /></div>
              {activity.loading || activity.error ? <StatusMessage loading={activity.loading} error={activity.error} onRetry={activity.reload} /> : activity.data?.length ? activity.data.slice(0, 7).map((event) => <ActivityRow key={event.id} event={event} />) : <p className="github-empty">No recent public events returned. Private contributions are not available through this API.</p>}
              <p className="github-activity__note">Public events only. This feed is not a contribution-count metric.</p>
            </div>
          </div>
          <div className="github-languages"><span>LANGUAGES SEEN IN PUBLIC REPOSITORIES</span>{languages.length ? languages.map((language) => <i key={language}>{language}</i>) : <small>Not available</small>}</div>
        </>
      )}
    </section>
  )
}

function ActivityRow({ event }: { event: GitHubActivity }) {
  return (
    <a className="activity-row" href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer">
      <span className="activity-row__dot" />
      <span><b>{event.type.replace('Event', '')}</b><small>{event.repo.name}</small></span>
      <time dateTime={event.created_at}>{formatDate(event.created_at)}</time>
    </a>
  )
}
