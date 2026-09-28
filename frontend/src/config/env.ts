function readEnv(name: string, fallback: string): string {
  const value = import.meta.env[name]
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

export const env = {
  apiBaseUrl: readEnv('VITE_API_BASE_URL', '/api/v1'),
  githubUsername: readEnv('VITE_GITHUB_USERNAME', 'dhananjaysarn'),
  siteUrl: readEnv('VITE_SITE_URL', ''),
  githubUrl: readEnv('VITE_GITHUB_URL', 'https://github.com/dhananjaysarn'),
  linkedinUrl: readEnv('VITE_LINKEDIN_URL', 'https://www.linkedin.com/in/dhananjay-sarnaik-79748534a/'),
  resumeUrl: readEnv('VITE_RESUME_URL', '/Resume.pdf'),
  contactEmail: readEnv('VITE_CONTACT_EMAIL', 'dhananjaysarnaik12@gmail.com'),
} as const
