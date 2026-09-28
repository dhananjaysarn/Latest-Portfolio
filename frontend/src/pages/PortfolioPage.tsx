import { useEffect } from 'react'
import { AboutSection } from '../sections/about/AboutSection'
import { ArchitectureSection } from '../sections/architecture/ArchitectureSection'
import { ContactSection } from '../sections/contact/ContactSection'
import { JourneySection } from '../sections/experience/JourneySection'
import { GitHubSection } from '../sections/github/GitHubSection'
import { HeroSection } from '../sections/hero/HeroSection'
import { ProjectLabSection } from '../sections/projects/ProjectLabSection'
import { StartupUniverseSection } from '../sections/startups/StartupUniverseSection'
import { TechnologySection } from '../sections/skills/TechnologySection'
import { env } from '../config/env'
import { usePageMetadata } from '../hooks/usePageMetadata'

export function PortfolioPage() {
  usePageMetadata({
    title: 'Dhananjay Rajan Sarnaik — Full-stack developer & builder',
    description: 'Explore the engineering work, technology interests, and product concepts of Dhananjay Rajan Sarnaik.',
    path: '/',
  })

  useEffect(() => {
    if (!env.siteUrl) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.portfolioPerson = 'true'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dhananjay Rajan Sarnaik',
      url: env.siteUrl,
      jobTitle: 'Full-stack developer',
      description: 'Engineering student and builder exploring full-stack product engineering.',
      sameAs: [env.githubUsername ? `https://github.com/${encodeURIComponent(env.githubUsername)}` : null].filter(Boolean),
    })
    document.head.append(script)
    return () => script.remove()
  }, [])

  return (
    <main id="main-content" className="site-main">
      <HeroSection />
      <AboutSection />
      <TechnologySection />
      <ProjectLabSection />
      <StartupUniverseSection />
      <JourneySection />
      <ArchitectureSection />
      <GitHubSection />
      <ContactSection />
    </main>
  )
}
