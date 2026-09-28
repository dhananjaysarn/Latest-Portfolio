import { env } from './env'
 
export const siteConfig = {
  name: 'Dhananjay Rajan Sarnaik',
  monogram: 'DS',
  roles: ['FULL-STACK DEVELOPER', 'AI BUILDER', 'COMPUTER ENGINEERING STUDENT'],
  headline: 'I build intelligent digital products, full-stack systems and ambitious technology projects.',
  introduction:
    'I’m Dhananjay Rajan Sarnaik — a computer engineering student and full-stack developer based in Sawantwadi, Maharashtra. Drawn to the craft of building useful software, from responsive, high-performance interfaces to dependable systems.',
  location: 'Sawantwadi, Maharashtra, India',
  interests: ['Full-stack web applications', 'AI-focused product building', 'Systems design', 'Developer tooling'],
  education: {
    qualification: 'Diploma in Computer Engineering (K-Scheme)',
    institution: 'Yashwantrao Bhonsale Institute of Technology, Sawantwadi',
    period: '2024–2027',
    percentage: '80%',
  },
  school: {
    qualification: 'Secondary School Certificate (SSC)',
    institution: 'Kalsulkar English School',
    year: '2024',
    percentage: '72.60%',
  },
  links: {
    github: env.githubUrl,
    linkedIn: env.linkedinUrl,
    resume: env.resumeUrl,
  },
  contactEmail: env.contactEmail,
} as const

export const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#technology' },
  { label: 'Projects', href: '#projects' },
  { label: 'Startups', href: '#startups' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
] as const

export const startupConcepts = [
  { name: 'StudentOS', note: 'Student life and learning systems' },
  { name: 'FounderOS', note: 'A workspace for early-stage founders' },
  { name: 'CompanyOS', note: 'Connected operations for teams' },
  { name: 'Local Business OS', note: 'Tools for independent businesses' },
  { name: 'CashFlowOS', note: 'A clearer view of business cash flow' },
  { name: 'GovTech Platform', note: 'More accessible public services' },
  { name: 'ConstructionTech', note: 'Connected construction workflows' },
  { name: 'Export / Import Platform', note: 'Simplifying trade operations' },
] as const
