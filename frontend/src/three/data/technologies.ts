export type TechnologyCategory = 'frontend' | 'backend' | 'database' | 'cloud' | 'tools'

export interface GlobeTechnology {
  name: string
  category: TechnologyCategory
}

export const technologyCategories: { id: TechnologyCategory; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'tools', label: 'Tools' },
]

export const globeTechnologies: GlobeTechnology[] = [
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Bootstrap', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Python', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'Django REST Framework', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'JWT', category: 'backend' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Supabase', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'AWS', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },
  { name: 'Kubernetes', category: 'cloud' },
  { name: 'Terraform', category: 'cloud' },
  { name: 'Linux', category: 'cloud' },
  { name: 'Nginx', category: 'cloud' },
  { name: 'PM2', category: 'cloud' },
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'GitLab', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Chrome DevTools', category: 'tools' },
  { name: 'Vercel', category: 'tools' },
  { name: 'Netlify', category: 'tools' },
]
