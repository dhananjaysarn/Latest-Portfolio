import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Orbit } from 'lucide-react'
import type { Project } from '../../types/project'
import { globeTechnologies, technologyCategories, type GlobeTechnology } from '../data/technologies'

interface TechnologyGlobeProps {
  projects: Project[]
  onTechnologySelect?: (technology: GlobeTechnology) => void
}

function getSpherePosition(index: number, total: number): [number, number, number] {
  const y = 1 - (index / (total - 1)) * 2
  const radius = Math.sqrt(1 - y * y)
  const angle = Math.PI * (3 - Math.sqrt(5)) * index
  return [Math.cos(angle) * radius * 2.05, y * 2.05, Math.sin(angle) * radius * 2.05]
}

function GlobeNodes({ selected, onSelect }: { selected: string; onSelect: (technology: GlobeTechnology) => void }) {
  const technologies = useMemo(() => globeTechnologies, [])
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.86, 40, 40]} />
        <meshBasicMaterial color="#74e6c5" wireframe transparent opacity={0.105} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.68, 32, 32]} />
        <meshBasicMaterial color="#0c1720" transparent opacity={0.64} />
      </mesh>
      {technologies.map((technology, index) => {
        const position = getSpherePosition(index, technologies.length)
        const isSelected = selected === technology.name
        return (
          <group key={technology.name} position={position}>
            <mesh
              onClick={(event) => { event.stopPropagation(); onSelect(technology) }}
              onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { document.body.style.cursor = '' }}
              aria-label={technology.name}
            >
              <sphereGeometry args={[isSelected ? 0.075 : 0.045, 12, 12]} />
              <meshBasicMaterial color={isSelected ? '#ffffff' : '#83f1d0'} />
            </mesh>
            <Html distanceFactor={8} position={[0.08, 0.01, 0]} center transform={false} occlude>
              <button
                className={`globe-label ${isSelected ? 'is-selected' : ''}`}
                type="button"
                onClick={() => onSelect(technology)}
                aria-label={`Show ${technology.name} details`}
              >
                {technology.name}
              </button>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

export function TechnologyGlobe({ projects, onTechnologySelect }: TechnologyGlobeProps) {
  const [selected, setSelected] = useState(globeTechnologies.find((technology) => technology.name === 'React')!)
  const [activeCategory, setActiveCategory] = useState('all')
  const relatedProjects = projects.filter((project) =>
    project.technologies.some((technology) => technology.name.toLowerCase() === selected.name.toLowerCase()),
  )
  const filtered = activeCategory === 'all'
    ? globeTechnologies
    : globeTechnologies.filter((technology) => technology.category === activeCategory)

  const select = (technology: GlobeTechnology) => {
    setSelected(technology)
    onTechnologySelect?.(technology)
  }

  return (
    <div className="technology-universe">
      <div className="technology-universe__visual">
        <div className="technology-universe__topline"><span><Orbit size={14} /> INTERACTIVE SYSTEM MAP</span><span>DRAG TO ROTATE <i /></span></div>
        <div className="technology-globe">
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 7.5], fov: 43 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
            fallback={<div className="globe-fallback">Interactive 3D is unavailable in this browser. Explore the technology list below.</div>}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.55} />
              <pointLight position={[4, 4, 5]} intensity={1.3} color="#83f1d0" />
              <Stars radius={35} depth={30} count={220} factor={1.7} saturation={0} fade speed={0.15} />
              <GlobeNodes selected={selected.name} onSelect={select} />
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                rotateSpeed={0.45}
                autoRotate
                autoRotateSpeed={0.22}
                minPolarAngle={Math.PI * 0.2}
                maxPolarAngle={Math.PI * 0.8}
              />
            </Suspense>
          </Canvas>
        </div>
        <div className="globe-guide"><span>◌</span> Drag to explore <span>·</span> Select a node to inspect</div>
      </div>
      <div className="technology-universe__info">
        <p className="eyebrow">SELECTED NODE / 0{technologyCategories.findIndex((category) => category.id === selected.category) + 1}</p>
        <motion.div key={selected.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h3>{selected.name}<span>.</span></h3>
          <p className="technology-universe__category">{technologyCategories.find((category) => category.id === selected.category)?.label}</p>
          <p className="technology-universe__description">Part of the evolving toolkit I use to explore and build digital products.</p>
          <div className="technology-universe__related">
            <h4>APPEARS IN</h4>
            {relatedProjects.length > 0 ? relatedProjects.map((project) => <a href="#projects" key={project.slug}>{project.title}<ArrowRight size={13} /></a>) : <p>Related projects will appear here as they are added to the portfolio.</p>}
          </div>
        </motion.div>
        <div className="technology-universe__legend">
          {technologyCategories.map((category) => <span key={category.id}><i className={`legend-dot legend-dot--${category.id}`} />{category.label}</span>)}
        </div>
      </div>
      <div className="technology-index">
        <div className="technology-index__filters" role="group" aria-label="Filter technologies">
          <button className={activeCategory === 'all' ? 'is-active' : ''} onClick={() => setActiveCategory('all')}>All / 35</button>
          {technologyCategories.map((category) => <button className={activeCategory === category.id ? 'is-active' : ''} onClick={() => setActiveCategory(category.id)} key={category.id}>{category.label}</button>)}
        </div>
        <div className="technology-index__list">
          {filtered.map((technology, index) => (
            <button
              className={`technology-chip ${selected.name === technology.name ? 'is-selected' : ''}`}
              type="button"
              key={technology.name}
              onClick={() => select(technology)}
            >
              <span>0{index + 1}</span>{technology.name}<i />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
