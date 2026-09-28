import { env } from '../../config/env'
import { githubClient } from './client'

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  pushed_at: string
}

const fallbackRepositories: GitHubRepository[] = [
  {
    id: 1,
    name: 'studify-frontend',
    full_name: 'dhananjaysarn/studify-frontend',
    description: 'AI-powered Student Operating System frontend covering learning, skills and career readiness workflows.',
    html_url: 'https://github.com/dhananjaysarn/studify-frontend',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: 'TypeScript',
    pushed_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'ProductScope-AI',
    full_name: 'dhananjaysarn/ProductScope-AI',
    description: 'AI-focused product research application with recommendation and data-visualization workflows.',
    html_url: 'https://github.com/dhananjaysarn/ProductScope-AI',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    pushed_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Cyber-Security-Toolkit',
    full_name: 'dhananjaysarn/Cyber-Security-Toolkit',
    description: 'Practical cybersecurity utilities and security-focused learning workflows.',
    html_url: 'https://github.com/dhananjaysarn/Cyber-Security-Toolkit',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    pushed_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'React-IOT-Firebase',
    full_name: 'dhananjaysarn/React-IOT-Firebase',
    description: 'React-based telemetry dashboard for monitoring IoT device and sensor data via Firebase.',
    html_url: 'https://github.com/dhananjaysarn/React-IOT-Firebase',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: 'JavaScript',
    pushed_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'IdeaGenrator',
    full_name: 'dhananjaysarn/IdeaGenrator',
    description: 'StartupIQ idea generation and concept validation tools for early-stage builders.',
    html_url: 'https://github.com/dhananjaysarn/IdeaGenrator',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: 'JavaScript',
    pushed_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'YBIT',
    full_name: 'dhananjaysarn/YBIT',
    description: 'College clearance and NOC management system for academic approvals.',
    html_url: 'https://github.com/dhananjaysarn/YBIT',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    language: 'JavaScript',
    pushed_at: new Date().toISOString(),
  },
]

export async function getRepositories(): Promise<GitHubRepository[]> {
  if (!env.githubUsername) {
    return fallbackRepositories
  }
  try {
    const { data } = await githubClient.get<GitHubRepository[]>(
      `/users/${encodeURIComponent(env.githubUsername)}/repos`,
      { params: { sort: 'updated', per_page: 100 } },
    )
    if (data && data.length > 0) {
      return data
    }
  } catch {
    // Graceful fallback to verified repositories if GitHub API rate-limits
  }
  return fallbackRepositories
}

export async function getRepositoryLanguages(owner: string, repository: string): Promise<Record<string, number>> {
  const { data } = await githubClient.get<Record<string, number>>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/languages`,
  )
  return data
}
