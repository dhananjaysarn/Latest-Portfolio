import { apiClient } from '../api/client'
import type { Page } from '../projects/projectService'
import type { StartupIdea } from '../../types/startup'
import { startupConcepts } from '../../config/site'

const fallbackStartupIdeas: StartupIdea[] = startupConcepts.map((item, index) => ({
  name: item.name,
  slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  summary: item.note,
  problem: `Addressing key workflows and usability bottlenecks in ${item.name}.`,
  proposed_solution: `Designing an integrated platform for ${item.name} with modern web technology and streamlined user experience.`,
  stage: 'concept',
  website_url: null,
  order: index + 1,
}))

export async function getStartupIdeas(): Promise<Page<StartupIdea>> {
  try {
    const { data } = await apiClient.get<Page<StartupIdea>>('startups/')
    if (data && data.results && data.results.length > 0) {
      return data
    }
  } catch {
    // API unavailable
  }
  return {
    count: fallbackStartupIdeas.length,
    next: null,
    previous: null,
    results: fallbackStartupIdeas,
  }
}
