import { ArrowDown, ArrowRight, Database, Globe2, Layers3, Server, Workflow } from 'lucide-react'
import { SectionHeading } from '../../components/common/SectionHeading'

const layers = [
  { icon: Globe2, label: 'CLIENT', name: 'React + TypeScript', detail: 'Accessible, responsive interface' },
  { icon: ArrowRight, label: 'TRANSPORT', name: 'Axios · REST /api/v1', detail: 'Versioned JSON requests' },
  { icon: Server, label: 'APPLICATION', name: 'Django REST Framework', detail: 'Validation · serializers · permissions' },
  { icon: Workflow, label: 'DOMAIN', name: 'Django service layer', detail: 'Focused application operations' },
  { icon: Database, label: 'PERSISTENCE', name: 'PostgreSQL via Django ORM', detail: 'Relational data · migrations' },
]

export function ArchitectureSection() {
  return (
    <section className="section-wrap section section--architecture" id="architecture">
      <SectionHeading eyebrow="How the system connects" title={<>Architecture, by<br />design<span>.</span></>} description="The portfolio keeps presentation, domain logic, and persistence in their proper layers." index="06 / SYSTEMS" />
      <div className="architecture-panel">
        <div className="architecture-panel__header"><span><Layers3 size={15} /> SYSTEM MAP / PORTFOLIO API</span><span>BOUNDARIES MATTER <i /></span></div>
        <div className="architecture-flow">
          {layers.map((layer, index) => {
            const Icon = layer.icon
            return (
              <div className="architecture-flow__item" key={layer.label}>
                <div className="architecture-node">
                  <span className="architecture-node__icon"><Icon size={17} /></span>
                  <div><span>{layer.label}</span><h3>{layer.name}</h3><p>{layer.detail}</p></div>
                  <span className="architecture-node__index">0{index + 1}</span>
                </div>
                {index < layers.length - 1 && <div className="architecture-flow__connector"><span /><ArrowDown size={13} /></div>}
              </div>
            )
          })}
        </div>
        <div className="architecture-panel__foot"><span><i /> Frontend does not connect directly to the database.</span><span>API BOUNDARY / VERSIONED</span></div>
      </div>
    </section>
  )
}
