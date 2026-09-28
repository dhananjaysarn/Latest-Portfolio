import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowUpRight, Award, BookOpen, BriefcaseBusiness, CalendarDays, GraduationCap } from 'lucide-react'
import { SectionHeading } from '../../components/common/SectionHeading'
import { StatusMessage } from '../../components/common/StatusMessage'
import { siteConfig } from '../../config/site'
import { useResource } from '../../hooks/useResource'
import { getCertifications, getEducation, getExperience } from '../../services/portfolio/portfolioService'
import type { Certification, Education, Experience } from '../../types/portfolio'

function dateRange(start?: string | null, end?: string | null, current = false): string {
  const format = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en', { month: 'short', year: 'numeric' })
  if (!start && !end) return 'Dates not supplied'
  return `${start ? format(start) : '—'} — ${current ? 'Present' : end ? format(end) : '—'}`
}

function TimelineEntry({ icon, label, title, subtitle, description, dates, href }: {
  icon: ReactNode
  label: string
  title: string
  subtitle: string
  description?: string | undefined
  dates: string
  href?: string | null | undefined
}) {
  return (
    <article className="timeline-entry">
      <span className="timeline-entry__pin">{icon}</span>
      <div className="timeline-entry__content">
        <div className="timeline-entry__meta"><span>{label}</span><span><CalendarDays size={12} />{dates}</span></div>
        <h3>{title}</h3>
        <p className="timeline-entry__subtitle">{subtitle}{href && <a href={href} target="_blank" rel="noreferrer" aria-label={`Visit ${subtitle}`}><ArrowUpRight size={13} /></a>}</p>
        {description && <p className="timeline-entry__description">{description}</p>}
      </div>
    </article>
  )
}

export function JourneySection() {
  const experiences = useResource(getExperience)
  const education = useResource(getEducation)
  const certifications = useResource(getCertifications)
  const [showAllCerts, setShowAllCerts] = useState(false)
  const educationItems: Education[] = education.data?.results.length
    ? education.data.results
    : [
        {
          institution: siteConfig.education.institution,
          qualification: siteConfig.education.qualification,
          field_of_study: 'Computer Engineering',
          location: 'Sawantwadi, Maharashtra',
          start_date: '2024-06-01',
          end_date: '2027-05-31',
          is_current: true,
          description: `Current percentage: ${siteConfig.education.percentage}. Core studies in algorithms, operating systems, DBMS, and full-stack software development.`,
        },
        {
          institution: siteConfig.school.institution,
          qualification: siteConfig.school.qualification,
          field_of_study: 'General Academics',
          location: 'Sawantwadi, Maharashtra',
          start_date: null,
          end_date: '2024-05-01',
          is_current: false,
          description: `Passed in ${siteConfig.school.year} with ${siteConfig.school.percentage}.`,
        },
      ]
  const experienceItems: Experience[] = experiences.data?.results ?? []
  const certificateItems: Certification[] = certifications.data?.results ?? []

  return (
    <section className="section-wrap section section--journey" id="journey">
      <SectionHeading
        eyebrow="Learning in public"
        title={<>The engineering<br />journey<span>.</span></>}
        description="A record of study, experience, and the work that shapes how I build. No invented milestones."
        index="05 / JOURNEY"
      />
      <div className="journey-grid">
        <div className="journey-timeline">
          <div className="timeline-heading"><BookOpen size={16} /><span>EDUCATION & EXPERIENCE</span><i /></div>
          {educationItems.map((item) => (
            <TimelineEntry
              key={`${item.institution}-${item.qualification}`}
              icon={<GraduationCap size={16} />}
              label="EDUCATION"
              title={item.qualification}
              subtitle={item.institution}
              description={item.description || undefined}
              dates={dateRange(item.start_date, item.end_date, item.is_current)}
            />
          ))}
          {experiences.loading && <StatusMessage loading />}
          {experiences.error && <StatusMessage error={experiences.error} onRetry={experiences.reload} />}
          {experienceItems.map((item) => (
            <TimelineEntry
              key={`${item.organization}-${item.role}-${item.start_date}`}
              icon={<BriefcaseBusiness size={15} />}
              label="EXPERIENCE"
              title={item.role}
              subtitle={`${item.organization}${item.location ? ` · ${item.location}` : ''}`}
              description={item.description || item.highlights.join(' · ') || undefined}
              dates={dateRange(item.start_date, item.end_date, item.is_current)}
              href={item.organization_url}
            />
          ))}
          {!experiences.loading && !experiences.error && experienceItems.length === 0 && (
            <p className="timeline-empty">Experience entries will be added here when there is verified work to share.</p>
          )}
        </div>
        <div className="certification-panel">
          <div className="timeline-heading"><Award size={16} /><span>CERTIFICATIONS</span><i /></div>
          {certifications.loading && <StatusMessage loading />}
          {certifications.error && <StatusMessage error={certifications.error} onRetry={certifications.reload} />}
          {!certifications.loading && !certifications.error && certificateItems.length === 0 && (
            <div className="certification-empty"><Award size={19} /><p>No certificates published yet.</p><span>Verified credentials will appear here.</span></div>
          )}
          <div className="certification-list">
            {(showAllCerts ? certificateItems : certificateItems.slice(0, 4)).map((certificate) => (
              <article className="certification-card" key={`${certificate.issuer}-${certificate.name}`}>
                <span className="certification-card__icon"><Award size={16} /></span>
                <div><h3>{certificate.name}</h3><p>{certificate.issuer}</p><span>{certificate.issued_on ? dateRange(certificate.issued_on) : 'Issue date not supplied'}{certificate.credential_id && ` · ${certificate.credential_id}`}</span></div>
                {certificate.credential_url && <a href={certificate.credential_url} target="_blank" rel="noreferrer" aria-label={`Verify ${certificate.name}`}><ArrowUpRight size={15} /></a>}
              </article>
            ))}
          </div>
          {certificateItems.length > 4 && <button className="text-link" type="button" onClick={() => setShowAllCerts((current) => !current)}>{showAllCerts ? 'Show less' : 'Show all credentials'} <ArrowUpRight size={14} /></button>}
          <div className="journey-note"><span>THE PROCESS</span><p>Learn something. Build with it. Understand what could be better.</p></div>
        </div>
      </div>
    </section>
  )
}
