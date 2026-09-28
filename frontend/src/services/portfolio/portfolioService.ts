import { apiClient } from '../api/client'
import type { Page } from '../projects/projectService'
import type {
  Certification,
  Education,
  Experience,
  Profile,
  SkillCategory,
  SocialLink,
} from '../../types/portfolio'
import type { Technology } from '../../types/project'
import {
  fallbackCertifications,
  fallbackEducation,
  fallbackExperience,
  fallbackProfile,
  fallbackSkillCategories,
} from './fallbackData'

async function getPageWithFallback<T>(resource: string, fallbackItems: T[]): Promise<Page<T>> {
  try {
    const { data } = await apiClient.get<Page<T>>(`${resource}/`)
    if (data && data.results && data.results.length > 0) {
      return data
    }
  } catch {
    // API is unavailable; gracefully return verified fallback
  }
  return {
    count: fallbackItems.length,
    next: null,
    previous: null,
    results: fallbackItems,
  }
}

export async function getProfile(): Promise<Profile> {
  try {
    const { data } = await apiClient.get<Profile>('profile/')
    if (data && data.display_name) {
      return data
    }
  } catch {
    // Graceful fallback to verified profile
  }
  return fallbackProfile
}

export const getSocialLinks = () => getPageWithFallback<SocialLink>('social-links', fallbackProfile.social_links)
export const getTechnologies = () => getPageWithFallback<Technology>('technologies', [])
export const getSkillCategories = () => getPageWithFallback<SkillCategory>('skills', fallbackSkillCategories)
export const getExperience = () => getPageWithFallback<Experience>('experience', fallbackExperience)
export const getEducation = () => getPageWithFallback<Education>('education', fallbackEducation)
export const getCertifications = () => getPageWithFallback<Certification>('certifications', fallbackCertifications)

