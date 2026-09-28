import { ArrowDownRight, Compass, Cpu, Layers3 } from 'lucide-react'
import { SectionHeading } from '../../components/common/SectionHeading'
import { siteConfig } from '../../config/site'
import { useResource } from '../../hooks/useResource'
import { getProfile } from '../../services/portfolio/portfolioService'

export function AboutSection() {
  const profile = useResource(getProfile)
  const name = profile.data?.display_name || siteConfig.name
  const summary = profile.data?.summary || siteConfig.introduction

  return (
    <section className="section-wrap section section--about" id="about">
      <SectionHeading eyebrow="A little about me" title={<>Curious by nature.<br />Intentional by design.</>} index="01 / IDENTITY" />
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-copy__lead">{summary}</p>
          <p className="about-copy__detail">
            My focus is the space where product thinking meets engineering — understanding a problem, shaping a useful solution, then building the pieces that make it work end to end.
          </p>
          <p className="about-copy__detail">
            I’m currently learning through hands-on projects and formal study, with an interest in full-stack systems, applied AI and the infrastructure behind reliable products.
          </p>
          <a className="text-link" href="#journey">Explore my journey <ArrowDownRight size={15} /></a>
        </div>
        <div className="identity-panel">
          <div className="identity-panel__top"><span>IDENTITY / 001</span><span className="availability-dot" /></div>
          <div className="identity-panel__monogram">{siteConfig.monogram}<span>.</span></div>
          <p>{name}</p>
          <div className="identity-panel__rule" />
          <div className="identity-panel__detail"><span>STUDYING</span><b>{siteConfig.education.qualification}</b></div>
          <div className="identity-panel__detail"><span>INSTITUTION</span><b>{siteConfig.education.institution}</b></div>
          <div className="identity-panel__detail"><span>EXPLORING</span><b>Products, systems & emerging tech</b></div>
          <span className="identity-panel__seal"><Compass size={16} /> OPEN TO WHAT’S NEXT</span>
        </div>
      </div>
      <div className="interest-row">
        <span className="eyebrow">CURRENT CURIOSITIES</span>
        {siteConfig.interests.map((interest, index) => (
          <span className="interest-item" key={interest}><i>0{index + 1}</i>{interest}</span>
        ))}
      </div>
      <div className="about-principles">
        <div><Layers3 size={19} /><span>END TO END</span><p>From the first sketch to a system that ships.</p></div>
        <div><Cpu size={19} /><span>ENGINEERED</span><p>Clarity in the interface. Thought in the architecture.</p></div>
        <div><Compass size={19} /><span>ALWAYS LEARNING</span><p>Build, reflect, improve, repeat.</p></div>
      </div>
    </section>
  )
}
