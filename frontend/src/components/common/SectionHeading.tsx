import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  index?: string
}

export function SectionHeading({ eyebrow, title, description, index }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__meta">
        <span className="eyebrow">{eyebrow}</span>
        {index && <span className="section-heading__index">{index}</span>}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
