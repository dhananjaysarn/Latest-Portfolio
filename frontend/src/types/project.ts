export type ProjectStatus = 'concept' | 'in_progress' | 'deployed' | 'archived'

export interface Technology {
  name: string
  slug: string
  category: string
  icon_url: string | null
}

export interface ProjectImage {
  image_url: string
  alt_text: string
  caption: string
  order: number
}

export interface Project {
  title: string
  slug: string
  description: string
  problem: string
  solution: string
  features: string[]
  status: ProjectStatus
  technologies: Technology[]
  github_url: string | null
  live_url: string | null
  demo_url: string | null
  images: ProjectImage[]
  featured: boolean
}
