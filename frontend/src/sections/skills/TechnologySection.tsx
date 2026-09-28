import { lazy, Suspense, useState } from 'react'
import { SectionHeading } from '../../components/common/SectionHeading'
import { StatusMessage } from '../../components/common/StatusMessage'
import { useResource } from '../../hooks/useResource'
import { getProjects } from '../../services/projects/projectService'
import { getSkillCategories } from '../../services/portfolio/portfolioService'
import type { Project } from '../../types/project'
import type { GlobeTechnology } from '../../three/data/technologies'

const TechnologyGlobe = lazy(() => import('../../three/components/TechnologyGlobe').then((module) => ({ default: module.TechnologyGlobe })))

export function TechnologySection() {
  const [selectedTechnology, setSelectedTechnology] = useState<GlobeTechnology | null>(null)
  const projects = useResource(getProjects)
  const skills = useResource(getSkillCategories)
  const projectList: Project[] = projects.data?.results ?? []

  return (
    <section className="section-wrap section section--technology" id="technology">
      <SectionHeading
        eyebrow="The tools I explore"
        title={<>Technology<br />universe.</>}
        description="An evolving map of the technologies I’m learning and using. Select a node to explore its place in the stack."
        index="02 / TOOLKIT"
      />
      <div className="technology-section__body">
        <Suspense fallback={<div className="globe-loading">Preparing the technology field…</div>}>
          <TechnologyGlobe projects={projectList} onTechnologySelect={setSelectedTechnology} />
        </Suspense>
      </div>
      {skills.data?.results?.length ? (
        <div className="skill-groups">
          <div className="skill-groups__heading"><span className="eyebrow">CORE TECHNICAL DOMAINS</span><span>Organized by discipline</span></div>
          {skills.data.results.map((category) => (
            <div className="skill-group" key={category.slug}>
              <h3>{category.name}</h3>
              <div>{category.skills.map((skill) => <span key={skill.name}>{skill.name}<i>{skill.proficiency === null ? 'Learning' : 'Experienced'}</i></span>)}</div>
            </div>
          ))}
        </div>
      ) : skills.error ? (
        <StatusMessage error={skills.error} onRetry={skills.reload} />
      ) : null}
      {selectedTechnology && <span className="sr-only" aria-live="polite">Selected technology: {selectedTechnology.name}</span>}
    </section>
  )
}
