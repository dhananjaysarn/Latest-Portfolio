import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, ExternalLink, Github, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '../../types/project'
import { ActionButton } from '../../components/common/Button'

interface ProjectDetailsProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('dialog-open')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('dialog-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose, project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.article
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={reduceMotion ? false : { y: 24, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 16, opacity: 0, scale: 0.99 }}
          >
            <div className="project-dialog__bar"><span><i /> PROJECT CASE FILE / {project.slug.toUpperCase()}</span><button className="icon-button" type="button" aria-label="Close project details" onClick={onClose}><X size={18} /></button></div>
            <div className="project-dialog__content">
              <div className="project-dialog__heading"><p className="eyebrow">{project.status.replaceAll('_', ' ').toUpperCase()}</p><h2 id="project-dialog-title">{project.title}<span>.</span></h2><p>{project.description}</p></div>
              <div className="project-dialog__links">
                {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer"><Github size={15} /> Source <ArrowUpRight size={13} /></a>}
                {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Live product <ArrowUpRight size={13} /></a>}
                {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Demo <ArrowUpRight size={13} /></a>}
              </div>
              <div className="project-dialog__sections">
                {project.problem && <div><span>01 / PROBLEM</span><p>{project.problem}</p></div>}
                {project.solution && <div><span>02 / APPROACH</span><p>{project.solution}</p></div>}
                {project.features.length > 0 && <div><span>03 / KEY FEATURES</span><ul>{project.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul></div>}
                <div className="project-dialog__technology"><span>TECHNOLOGY</span><div>{project.technologies.map((technology) => <span key={technology.slug}>{technology.name}</span>)}</div></div>
                {project.images.length > 0 && <div className="project-dialog__gallery"><span>PROJECT MEDIA</span><div>{project.images.map((image) => <figure key={`${image.image_url}-${image.order}`}><img src={image.image_url} alt={image.alt_text} loading="lazy" /><figcaption>{image.caption || image.alt_text}</figcaption></figure>)}</div></div>}
                <div className="project-dialog__status"><span>STATUS</span><p>{project.status.replaceAll('_', ' ')}{project.featured && ' · Featured work'}</p></div>
              </div>
              <ActionButton onClick={onClose}>Close case study</ActionButton>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
