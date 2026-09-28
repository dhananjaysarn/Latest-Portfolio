import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, Mail, Send } from 'lucide-react'
import { SectionHeading } from '../../components/common/SectionHeading'
import { submitContactMessage } from '../../services/contact/contactService'
import { getFieldErrors } from '../../services/api/errors'
import { getApiErrorMessage } from '../../services/api/errors'
import type { ContactSubmission } from '../../types/contact'
import { siteConfig } from '../../config/site'
import { useResource } from '../../hooks/useResource'
import { getProfile } from '../../services/portfolio/portfolioService'

const emptyForm: ContactSubmission = { name: '', email: '', subject: '', message: '' }

export function ContactSection() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const profile = useResource(getProfile)
  const contactEmail = profile.data?.email || siteConfig.contactEmail

  const validate = () => {
    const next: Record<string, string> = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.subject.trim().length < 3) next.subject = 'Add a short subject.'
    if (form.message.trim().length < 10) next.message = 'Add a little more detail (at least 10 characters).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(false)
    setSubmitError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      await submitContactMessage({ ...form, name: form.name.trim(), subject: form.subject.trim(), message: form.message.trim() })
      setSubmitted(true)
      setForm(emptyForm)
      setErrors({})
    } catch (error: unknown) {
      setErrors(getFieldErrors(error))
      setSubmitError(getApiErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  const update = (field: keyof ContactSubmission, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  return (
    <section className="section-wrap section section--contact" id="contact">
      <div className="contact-layout">
        <div className="contact-copy">
          <SectionHeading eyebrow="Have something in mind?" title={<>Let’s make<br />it work<span>.</span></>} description="A project, a question, an interesting problem — send a note and I’ll get back to you." index="07 / CONTACT" />
          {contactEmail
            ? <a className="contact-email" href={`mailto:${contactEmail}`}><Mail size={17} /> {contactEmail} <ArrowUpRight size={14} /></a>
            : <a className="contact-email" href="#contact-form"><Mail size={17} /> Use the contact form <ArrowUpRight size={14} /></a>}
          <div className="contact-aside"><span>GOOD CONVERSATIONS START SOMEWHERE.</span><i /></div>
        </div>
        <form className="contact-form" id="contact-form" onSubmit={onSubmit} noValidate>
          <div className="contact-form__top"><span>MESSAGE / 001</span><span><i /> PRIVATE CHANNEL</span></div>
          {submitted && <p className="form-success" role="status"><CheckCircle2 size={17} /> Message received. Thank you for reaching out.</p>}
          {submitError && <p className="form-error" role="alert">{submitError}</p>}
          <div className="form-row">
            <FormField label="Your name" name="name" value={form.name} error={errors.name} placeholder="Name" autoComplete="name" onChange={(value) => update('name', value)} />
            <FormField label="Email address" name="email" type="email" value={form.email} error={errors.email} placeholder="you@example.com" autoComplete="email" onChange={(value) => update('email', value)} />
          </div>
          <FormField label="Subject" name="subject" value={form.subject} error={errors.subject} placeholder="What would you like to talk about?" onChange={(value) => update('subject', value)} />
          <FormField label="Message" name="message" value={form.message} error={errors.message} placeholder="A little context goes a long way..." multiline onChange={(value) => update('message', value)} />
          <div className="contact-form__footer"><p>By sending this message, you agree to be contacted about your inquiry.</p><button className="button button--primary" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send message'}<Send size={14} /></button></div>
        </form>
      </div>
    </section>
  )
}

function FormField({ label, name, value, error, placeholder, type = 'text', autoComplete, multiline = false, onChange }: {
  label: string
  name: keyof ContactSubmission
  value: string
  error?: string | undefined
  placeholder: string
  type?: string | undefined
  autoComplete?: string | undefined
  multiline?: boolean
  onChange: (value: string) => void
}) {
  const fieldId = `contact-${name}`
  const common = {
    id: fieldId,
    name,
    value,
    placeholder,
    autoComplete,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${fieldId}-error` : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  }
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={fieldId}>{label}<span aria-hidden="true">*</span></label>
      {multiline ? <textarea {...common} rows={4} maxLength={5000} /> : <input {...common} type={type} />}
      {error && <span className="form-field__error" id={`${fieldId}-error`}>{error}</span>}
    </div>
  )
}
