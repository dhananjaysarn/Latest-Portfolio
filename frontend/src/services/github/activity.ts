import { githubClient } from './client'

export interface GitHubActivity {
  id: string
  type: string
  created_at: string
  repo: { name: string; url: string }
}

export async function getRecentActivity(username: string): Promise<GitHubActivity[]> {
  if (!username) return []
  try {
    const { data } = await githubClient.get<GitHubActivity[]>(
      `/users/${encodeURIComponent(username)}/events/public`,
      { params: { per_page: 30 } },
    )
    return data || []
  } catch {
    return []
  }
}
