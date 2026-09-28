import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Atom, ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import type { StartupIdea } from '../../types/startup'
import type { startupConcepts } from '../../config/site'
import { ActionButton } from '../../components/common/Button'

interface StartupModalProps {
  idea: StartupIdea | typeof startupConcepts[number] | null
  onClose: () => void
}

export function StartupModal({ idea, onClose }: StartupModalProps) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!idea) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('dialog-open')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('dialog-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose, idea])

  if (!idea) return null

  const name = idea.name
  const summary = 'summary' in idea ? idea.summary : idea.note
  const problem = 'problem' in idea && idea.problem ? idea.problem : `Early exploration identifying user and operational bottlenecks in ${name}.`
  const solution = 'proposed_solution' in idea && idea.proposed_solution ? idea.proposed_solution : `Architectural and UX blueprint designed to unify workflows into a focused ${name} platform.`
  const stage = 'stage' in idea ? idea.stage.replaceAll('_', ' ').toUpperCase() : 'CONCEPT'
  const websiteUrl = 'website_url' in idea ? idea.website_url : null

  return (
    <AnimatePresence>
      <motion.div
        className="project-dialog-backdrop"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.article
          className="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="startup-dialog-title"
          initial={reduceMotion ? false : { y: 24, opacity: 0, scale: 0.985 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 16, opacity: 0, scale: 0.99 }}
        >
          <div className="project-dialog__bar">
            <span><Atom size={14} className="inline mr-1" /> STARTUP UNIVERSE / CONCEPT LAB</span>
            <button className="icon-button" type="button" aria-label="Close concept details" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
          <div className="project-dialog__content">
            <div className="project-dialog__heading">
              <p className="eyebrow">{stage} · PRODUCT DIRECTION</p>
              <h2 id="startup-dialog-title">{name}<span>.</span></h2>
              <p>{summary}</p>
            </div>
            {websiteUrl && (
              <div className="project-dialog__links">
                <a href={websiteUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} /> Prototype Link
                </a>
              </div>
            )}
            <div className="project-dialog__sections">
              <div>
                <span>01 / PROBLEM EXPLORATION</span>
                <p>{problem}</p>
              </div>
              <div>
                <span>02 / PROPOSED ARCHITECTURE & SOLUTION</span>
                <p>{solution}</p>
              </div>
              <div className="project-dialog__status">
                <span>STAGE INTEGRITY</span>
                <p>
                  This item is explicitly classified as a <strong>{stage}</strong>. It represents independent systems exploration and architectural planning rather than an active commercial entity.
                </p>
              </div>
            </div>
            <ActionButton onClick={onClose}>Close overview</ActionButton>
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  )
}
