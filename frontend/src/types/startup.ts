export type StartupStage = 'concept' | 'prototype' | 'in_development' | 'deployed'

export interface StartupIdea {
  name: string
  slug: string
  summary: string
  problem: string
  proposed_solution: string
  stage: StartupStage
  website_url: string | null
}
