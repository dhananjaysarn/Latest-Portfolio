import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, Atom, CircleDot, Orbit } from 'lucide-react'
import { SectionHeading } from '../../components/common/SectionHeading'
import { startupConcepts } from '../../config/site'
import { useResource } from '../../hooks/useResource'
import { getStartupIdeas } from '../../services/startups/startupService'
import { StatusMessage } from '../../components/common/StatusMessage'
import type { StartupIdea } from '../../types/startup'
import { StartupModal } from './StartupModal'

const positions = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west']

function stageLabel(stage: string): string {
  return stage.replaceAll('_', ' ').toUpperCase()
}

function ConceptCard({
  idea,
  index,
  onSelect,
}: {
  idea: StartupIdea | typeof startupConcepts[number]
  index: number
  onSelect: (idea: StartupIdea | typeof startupConcepts[number]) => void
}) {
  const stage = 'stage' in idea ? stageLabel(idea.stage) : 'CONCEPT'
  return (
    <motion.article
      className={`universe-node universe-node--${positions[index % positions.length]} cursor-pointer`}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      tabIndex={0}
      role="button"
      onClick={() => onSelect(idea)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(idea)
        }
      }}
    >
      <div className="universe-node__top"><span>IDEA / 0{index + 1}</span><span className="concept-status"><i /> {stage}</span></div>
      <h3>{idea.name}</h3>
      <p>{'summary' in idea ? idea.summary : idea.note}</p>
      <div className="universe-node__bottom"><span><CircleDot size={12} /> Early exploration</span><ArrowDownRight size={16} /></div>
    </motion.article>
  )
}

export function StartupUniverseSection() {
  const ideas = useResource(getStartupIdeas)
  const [selectedIdea, setSelectedIdea] = useState<StartupIdea | typeof startupConcepts[number] | null>(null)
  const apiIdeas = ideas.data?.results ?? []
  const items: (StartupIdea | typeof startupConcepts[number])[] = apiIdeas.length > 0 ? apiIdeas : [...startupConcepts]

  return (
    <section className="section-wrap section section--startups" id="startups">
      <SectionHeading
        eyebrow="Possibility, connected"
        title={<>Startup<br />universe<span>.</span></>}
        description="A map of early product directions. These are concepts to explore, not launched companies or products. Select any node to inspect problem framing and proposed architecture."
        index="04 / IDEAS"
      />
      <div className="universe-note"><Atom size={16} /><span>Each idea is deliberately labelled at its current stage.</span><span>8 NODES <i /></span></div>
      {ideas.error && <StatusMessage error={ideas.error} onRetry={ideas.reload} />}
      <div className="startup-universe">
        <div className="universe-lines" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="universe-core"><Orbit size={20} /><span>PRODUCT<br />UNIVERSE</span></div>
        <div className="universe-nodes">
          {items.map((idea, index) => (
            <ConceptCard
              key={'slug' in idea ? idea.slug : idea.name}
              idea={idea}
              index={index}
              onSelect={setSelectedIdea}
            />
          ))}
        </div>
      </div>
      <StartupModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />
    </section>
  )
}
