import type { Certification, Education, Experience, Profile, SkillCategory } from '../../types/portfolio'
import { siteConfig } from '../../config/site'

export const fallbackProfile: Profile = {
  display_name: 'Dhananjay Rajan Sarnaik',
  headline: 'Full-Stack Developer · AI Builder · Computer Engineering Student',
  summary: siteConfig.introduction,
  location: 'Sawantwadi, Maharashtra, India',
  email: siteConfig.contactEmail,
  avatar_url: null,
  resume_url: siteConfig.links.resume || null,
  social_links: [
    { label: 'GitHub', url: siteConfig.links.github, platform: 'github', order: 1 },
    { label: 'LinkedIn', url: siteConfig.links.linkedIn, platform: 'linkedin', order: 2 },
  ],
}

export const fallbackSkillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    slug: 'programming',
    order: 1,
    skills: [
      { name: 'Python', proficiency: null, order: 1 },
      { name: 'JavaScript', proficiency: null, order: 2 },
      { name: 'Java', proficiency: null, order: 3 },
      { name: 'C', proficiency: null, order: 4 },
      { name: 'C++', proficiency: null, order: 5 },
    ],
  },
  {
    name: 'Frontend',
    slug: 'frontend',
    order: 2,
    skills: [
      { name: 'React.js', proficiency: null, order: 1 },
      { name: 'TypeScript', proficiency: null, order: 2 },
      { name: 'Tailwind CSS', proficiency: null, order: 3 },
      { name: 'HTML5', proficiency: null, order: 4 },
      { name: 'CSS3', proficiency: null, order: 5 },
      { name: 'Bootstrap', proficiency: null, order: 6 },
      { name: 'Vite', proficiency: null, order: 7 },
      { name: 'Responsive Design', proficiency: null, order: 8 },
    ],
  },
  {
    name: 'Backend',
    slug: 'backend',
    order: 3,
    skills: [
      { name: 'Node.js', proficiency: null, order: 1 },
      { name: 'Express.js', proficiency: null, order: 2 },
      { name: 'Django', proficiency: null, order: 3 },
      { name: 'Django REST Framework', proficiency: null, order: 4 },
      { name: 'REST APIs', proficiency: null, order: 5 },
    ],
  },
  {
    name: 'Database',
    slug: 'database',
    order: 4,
    skills: [
      { name: 'SQL', proficiency: null, order: 1 },
      { name: 'MySQL', proficiency: null, order: 2 },
      { name: 'MongoDB', proficiency: null, order: 3 },
      { name: 'PostgreSQL', proficiency: null, order: 4 },
      { name: 'Firebase', proficiency: null, order: 5 },
    ],
  },
  {
    name: 'Cloud & Tools',
    slug: 'cloud-tools',
    order: 5,
    skills: [
      { name: 'Git', proficiency: null, order: 1 },
      { name: 'GitHub', proficiency: null, order: 2 },
      { name: 'Postman', proficiency: null, order: 3 },
      { name: 'Linux', proficiency: null, order: 4 },
      { name: 'Docker', proficiency: null, order: 5 },
      { name: 'AWS Fundamentals', proficiency: null, order: 6 },
      { name: 'VS Code', proficiency: null, order: 7 },
    ],
  },
  {
    name: 'Computer Science',
    slug: 'computer-science',
    order: 6,
    skills: [
      { name: 'OOP', proficiency: null, order: 1 },
      { name: 'DSA', proficiency: null, order: 2 },
      { name: 'DBMS', proficiency: null, order: 3 },
      { name: 'Operating Systems', proficiency: null, order: 4 },
      { name: 'Computer Networks', proficiency: null, order: 5 },
    ],
  },
]

export const fallbackEducation: Education[] = [
  {
    institution: 'Yashwantrao Bhonsale Institute of Technology, Sawantwadi',
    qualification: 'Diploma in Computer Engineering (K-Scheme)',
    field_of_study: 'Computer Engineering',
    location: 'Sawantwadi, Maharashtra',
    start_date: '2024-06-01',
    end_date: '2027-05-31',
    is_current: true,
    description: 'Current percentage: 80%. Focused on core computer science foundations, algorithms, database systems, and full-stack software development.',
  },
  {
    institution: 'Kalsulkar English School',
    qualification: 'Secondary School Certificate (SSC)',
    field_of_study: 'General Academics',
    location: 'Sawantwadi, Maharashtra',
    start_date: null,
    end_date: '2024-05-01',
    is_current: false,
    description: 'Passed in 2024 with 72.60%.',
  },
]

export const fallbackExperience: Experience[] = [
  {
    role: 'Full Stack Developer Intern',
    organization: 'Softmusk',
    location: 'Sawantwadi, Maharashtra',
    organization_url: null,
    start_date: '2026-01-01',
    end_date: '2026-06-30',
    is_current: false,
    description: 'Worked on responsive web applications using React.js and Node.js. Practiced frontend/backend integration, REST API connectivity, and database-driven workflows.',
    highlights: [
      'Developed responsive UI components using React.js and modern CSS',
      'Engineered backend endpoints and REST APIs using Node.js and Express',
      'Integrated client applications with database queries and verified data flows',
      'Followed practical software development life cycle (SDLC) and collaborative git workflows',
    ],
  },
]

export const fallbackCertifications: Certification[] = [
  {
    name: 'Fundamentals of Machine Learning (CS207)',
    issuer: 'Saylor University',
    credential_id: '',
    credential_url: null,
    issued_on: '2025-01-01',
    expires_on: null,
  },
  {
    name: 'Full Stack Web Development',
    issuer: 'Technical Certification Program',
    credential_id: '',
    credential_url: null,
    issued_on: '2025-01-01',
    expires_on: null,
  },
  {
    name: 'Data Structures & Algorithms (DSA)',
    issuer: 'Technical Learning Program',
    credential_id: '',
    credential_url: null,
    issued_on: '2025-01-01',
    expires_on: null,
  },
  {
    name: 'React JS Development',
    issuer: 'Technical Skill Certification',
    credential_id: '',
    credential_url: null,
    issued_on: '2025-01-01',
    expires_on: null,
  },
  {
    name: 'SQL & Database Management',
    issuer: 'Database Learning Program',
    credential_id: '',
    credential_url: null,
    issued_on: '2024-01-01',
    expires_on: null,
  },
  {
    name: 'Power BI Data Analytics',
    issuer: 'Data Analytics Certification',
    credential_id: '',
    credential_url: null,
    issued_on: '2024-01-01',
    expires_on: null,
  },
  {
    name: 'MS-CIT',
    issuer: 'MKCL',
    credential_id: '',
    credential_url: null,
    issued_on: '2024-01-01',
    expires_on: null,
  },
  {
    name: 'Full Stack Developer Internship Completion',
    issuer: 'Softmusk',
    credential_id: '',
    credential_url: null,
    issued_on: '2026-06-01',
    expires_on: null,
  },
]
