import { ArrowDown, ArrowRight, Github, Linkedin, MoveUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useRef, type PointerEvent } from 'react'
import { ActionLink } from '../../components/common/Button'
import { siteConfig } from '../../config/site'

const stars = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  delay: `${(index % 9) * 0.45}s`,
}))

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const portrait = useRef<HTMLDivElement>(null)
  const movePortraitLight = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse' || !portrait.current) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    portrait.current.style.setProperty('--spot-x', `${Math.round(x * 100)}%`)
    portrait.current.style.setProperty('--spot-y', `${Math.round(y * 100)}%`)
    portrait.current.style.setProperty('--tilt-x', `${((y - 0.5) * -2.5).toFixed(2)}deg`)
    portrait.current.style.setProperty('--tilt-y', `${((x - 0.5) * 3).toFixed(2)}deg`)
  }
  const resetPortraitLight = () => {
    if (!portrait.current) return
    portrait.current.style.setProperty('--spot-x', '50%')
    portrait.current.style.setProperty('--spot-y', '42%')
    portrait.current.style.setProperty('--tilt-x', '0deg')
    portrait.current.style.setProperty('--tilt-y', '0deg')
  }
  return (
    <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true">
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
        <div className="hero__grid" />
        {stars.map((star, index) => (
          <span key={index} className="hero__star" style={{ left: star.left, top: star.top, animationDelay: star.delay }} />
        ))}
      </div>
      <div className="hero__inner">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__overline"><span className="availability-dot" /> Independent builder · Computer engineering</p>
          <h1 id="hero-title">
            <span>Dhananjay</span>
            <span className="hero__surname">Rajan <em>Sarnaik.</em></span>
          </h1>
          <div className="hero__role-list" aria-label="Full-stack developer, engineering student, and builder">
            {siteConfig.roles.map((role, index) => <span key={role}>{role}{index < siteConfig.roles.length - 1 && <i />}</span>)}
          </div>
          <p className="hero__statement">{siteConfig.headline}</p>
          <div className="hero__actions">
            <ActionLink href="#projects" icon>Explore my work</ActionLink>
            {siteConfig.links.resume
              ? <ActionLink href={siteConfig.links.resume} variant="secondary" download>Download resume</ActionLink>
              : <button className="button button--secondary" type="button" disabled title="Resume link has not been configured yet">Resume unavailable</button>}
          </div>
          <div className="hero__socials" aria-label="Professional links">
            {siteConfig.links.github && <a href={siteConfig.links.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <MoveUpRight size={12} /></a>}
            {siteConfig.links.linkedIn && <a href={siteConfig.links.linkedIn} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <MoveUpRight size={12} /></a>}
            {!siteConfig.links.github && !siteConfig.links.linkedIn && <span className="hero__social-note">Professional profiles can be connected in <code>site.ts</code></span>}
          </div>
        </motion.div>
        <motion.div
          className="hero__visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.12 }}
          aria-label="Abstract orbital illustration representing interconnected software systems"
        >
          <div className="hero__portrait-frame" ref={portrait} onPointerMove={movePortraitLight} onPointerLeave={resetPortraitLight}>
            <div className="hero__portrait-glow" />
            <div className="hero__portrait-grid" />
            <div className="hero__monogram" aria-hidden="true">DS<span>_</span></div>
            <span className="hero__portrait-label">DIGITAL IDENTITY <b>01 / 04</b></span>
            <div className="hero__orbit hero__orbit--outer" />
            <div className="hero__orbit hero__orbit--inner" />
            <div className="hero__orbit-core"><span>BUILD<br />WITH INTENT</span></div>
            <span className="hero__orbit-node hero__orbit-node--a" />
            <span className="hero__orbit-node hero__orbit-node--b" />
            <span className="hero__orbit-node hero__orbit-node--c" />
            <span className="hero__float-label hero__float-label--api"><i /> FULL-STACK · AI</span>
            <span className="hero__float-label hero__float-label--design">SYSTEMS ↗</span>
            <span className="hero__portrait-placeholder">ENGINEERING IDENTITY · MAHARASHTRA, IN</span>
          </div>
          <p className="hero__visual-caption"><span>SYSTEM MATRIX</span> A disciplined engineering approach to digital products.</p>
        </motion.div>
      </div>
      <a className="hero__scroll" href="#about"><span>Scroll to explore</span><ArrowDown size={15} /></a>
      <a className="hero__side-index" href="#technology">01 <i /> 06</a>
      <span className="hero__edge-mark" aria-hidden="true">PORTFOLIO / 2026</span>
      <span className="hero__inline-arrow" aria-hidden="true"><ArrowRight size={14} /></span>
    </section>
  )
}
