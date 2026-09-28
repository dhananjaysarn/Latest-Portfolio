import type { Technology } from './project'

export interface SocialLink {
  label: string
  url: string
  platform: string
  order: number
}

export interface Profile {
  display_name: string
  headline: string
  summary: string
  location: string
  email: string
  avatar_url: string | null
  resume_url: string | null
  social_links: SocialLink[]
}

export interface Skill {
  name: string
  technology?: string | null
  proficiency: number | null
  order: number
}

export interface SkillCategory {
  name: string
  slug: string
  order: number
  skills: Skill[]
}

export interface Experience {
  role: string
  organization: string
  location: string
  organization_url: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string
  highlights: string[]
}

export interface Education {
  institution: string
  qualification: string
  field_of_study: string
  location: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  description: string
}

export interface Certification {
  name: string
  issuer: string
  credential_id: string
  credential_url: string | null
  issued_on: string | null
  expires_on: string | null
}

export type { Technology }
