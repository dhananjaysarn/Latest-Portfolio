import { apiClient } from '../api/client'
import type { Project } from '../../types/project'
import { fallbackProjects } from './fallbackProjects'

export interface Page<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function getProjects(): Promise<Page<Project>> {
  try {
    const { data } = await apiClient.get<Page<Project>>('projects/')
    if (data && data.results && data.results.length > 0) {
      return data
    }
  } catch {
    // Graceful fallback to verified resume projects if API is offline
  }
  return {
    count: fallbackProjects.length,
    next: null,
    previous: null,
    results: fallbackProjects,
  }
}

export async function getProject(slug: string): Promise<Project> {
  const { data } = await apiClient.get<Project>(`projects/${encodeURIComponent(slug)}/`)
  return data
}
