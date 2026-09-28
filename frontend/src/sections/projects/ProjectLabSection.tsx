import { useCallback, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ExternalLink, FolderGit2, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { ActionLink } from '../../components/common/Button'
import { SectionHeading } from '../../components/common/SectionHeading'
import { StatusMessage } from '../../components/common/StatusMessage'
import { useResource } from '../../hooks/useResource'
import { getProjects } from '../../services/projects/projectService'
import type { Project } from '../../types/project'
import { ProjectDetails } from './ProjectDetails'

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (project: Project) => void }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="project-card__visual">
        {project.images[0] ? <img src={project.images[0].image_url} alt={project.images[0].alt_text} loading="lazy" /> : (
          <div className="project-card__no-visual"><FolderGit2 size={23} /><span>PROJECT VISUAL<br />NOT ADDED</span></div>
        )}
        <span className="project-card__number">PROJECT / 0{index + 1}</span>
        <span className={`project-status project-status--${project.status}`}>{project.status.replaceAll('_', ' ')}</span>
      </div>
      <div className="project-card__body">
        <button className="project-card__title" type="button" onClick={() => onSelect(project)}>{project.title}<ArrowUpRight size={18} /></button>
        <p>{project.description}</p>
        <div className="project-card__tech">{project.technologies.slice(0, 4).map((technology) => <span key={technology.slug}>{technology.name}</span>)}</div>
        <div className="project-card__footer">
          <button type="button" onClick={() => onSelect(project)}>Read case study <ArrowDownRight size={14} /></button>
          <div>
            {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}><Github size={15} /></a>}
            {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" aria-label={`${project.title} live`}><ExternalLink size={15} /></a>}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectLabSection() {
  const projects = useResource(getProjects)
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const sortedProjects = useMemo(
    () => [...(projects.data?.results ?? [])].sort((first, second) => Number(second.featured) - Number(first.featured)),
    [projects.data],
  )

  return (
    <section className="section-wrap section section--projects" id="projects">
      <SectionHeading
        eyebrow="Selected explorations"
        title={<>Project<br />lab<span>.</span></>}
        description="A closer look at what I’ve been making, testing, and learning. Only work published from the portfolio API appears here."
        index="03 / WORK"
      />
      <div className="project-lab__toolbar">
        <span><i /> {projects.data ? `${projects.data.count.toString().padStart(2, '0')} PUBLISHED PROJECTS` : 'LIVE PORTFOLIO DATA'}</span>
        <span>CASE FILES · API CONNECTED</span>
      </div>
      {projects.loading || projects.error ? <StatusMessage loading={projects.loading} error={projects.error} onRetry={projects.reload} /> : (
        sortedProjects.length ? (
          <div className="project-grid">
            {sortedProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onSelect={setSelected} />)}
          </div>
        ) : (
          <div className="project-empty">
            <div className="project-empty__icon"><FolderGit2 size={23} /></div>
            <div><span className="eyebrow">NO PUBLIC CASE FILES YET</span><h3>Space for work worth sharing.</h3><p>Projects are intentionally kept out of the public portfolio until their details have been reviewed and published in Django admin.</p></div>
            <ActionLink href="#contact" variant="text" icon>Start a conversation</ActionLink>
          </div>
        )
      )}
      <ProjectDetails project={selected} onClose={close} />
    </section>
  )
}
