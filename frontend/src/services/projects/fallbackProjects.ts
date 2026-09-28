import type { Project } from '../../types/project'

export const fallbackProjects: Project[] = [
  {
    title: 'Studify',
    slug: 'studify',
    description: 'An AI-powered Student Operating System unifying learning, skills development, opportunities and career readiness workflows into a single cohesive interface.',
    problem: 'Students navigate fragmented tools for curriculum learning, technical skills tracking, hackathon opportunities, and project portfolios without a central hub.',
    solution: 'Designed and engineered Studify as a modular student platform offering intelligent study scheduling, workflow guidance, and practical skill paths.',
    features: [
      'Comprehensive student workspace for daily learning and course milestones',
      'AI-assisted idea and study resource structuring',
      'Opportunity and hackathon discovery dashboard',
      'Skill progress tracking tailored to computer engineering curricula'
    ],
    status: 'in_progress',
    technologies: [
      { name: 'React', slug: 'react', category: 'frontend', icon_url: null },
      { name: 'TypeScript', slug: 'typescript', category: 'frontend', icon_url: null },
      { name: 'Node.js', slug: 'nodejs', category: 'backend', icon_url: null },
      { name: 'Tailwind CSS', slug: 'tailwind-css', category: 'frontend', icon_url: null }
    ],
    github_url: 'https://github.com/dhananjaysarn/studify-frontend',
    live_url: null,
    demo_url: null,
    images: [],
    featured: true
  },
  {
    title: 'StartupIQ',
    slug: 'startupiq',
    description: 'An AI Startup Operating System engineered for idea validation, structured market research, customer discovery, and founder execution workflows.',
    problem: 'Early-stage founders struggle with structured validation frameworks, turning vague concepts into actionable problem statements and initial product specs.',
    solution: 'Built an interactive founder toolkit combining step-by-step validation questionnaires, competitive breakdown generation, and operational milestones.',
    features: [
      'Structured validation canvas and market-need evaluation',
      'Workflow checklists for prototype planning and MVP scoping',
      'Interactive ecosystem map connecting customer personas to core features'
    ],
    status: 'in_progress',
    technologies: [
      { name: 'React', slug: 'react', category: 'frontend', icon_url: null },
      { name: 'JavaScript', slug: 'javascript', category: 'frontend', icon_url: null },
      { name: 'Tailwind CSS', slug: 'tailwind-css', category: 'frontend', icon_url: null },
      { name: 'REST APIs', slug: 'rest-apis', category: 'backend', icon_url: null }
    ],
    github_url: 'https://github.com/dhananjaysarn/IdeaGenrator',
    live_url: null,
    demo_url: null,
    images: [],
    featured: true
  },
  {
    title: 'ProductScope AI',
    slug: 'productscope-ai',
    description: 'An AI product research platform offering automated recommendation and data-visualization workflows for product analysis.',
    problem: 'Gathering insights across diverse products and market categories is manual, tedious, and lacks intuitive visual breakdowns.',
    solution: 'Constructed an analytical interface delivering automated product intelligence summaries, comparison visualizers, and sentiment breakdown metrics.',
    features: [
      'Automated product specification breakdown and feature matrix',
      'Visual charts and comparative data insights',
      'Clean search and category filter architecture'
    ],
    status: 'in_progress',
    technologies: [
      { name: 'Python', slug: 'python', category: 'backend', icon_url: null },
      { name: 'React', slug: 'react', category: 'frontend', icon_url: null },
      { name: 'REST APIs', slug: 'rest-apis', category: 'backend', icon_url: null }
    ],
    github_url: 'https://github.com/dhananjaysarn/ProductScope-AI',
    live_url: null,
    demo_url: null,
    images: [],
    featured: true
  },
  {
    title: 'Cybersecurity Toolkit',
    slug: 'cybersecurity-toolkit',
    description: 'Practical security utilities and security-focused learning workflows for vulnerability analysis, network checks, and defensive practices.',
    problem: 'Understanding common web vulnerabilities and defensive security techniques requires hands-on tooling and contextual practical exercises.',
    solution: 'Authored a consolidated repository of network scanning helpers, input validation validators, and secure coding utilities.',
    features: [
      'Handy security inspection utilities and port/header testing helpers',
      'Practical vulnerability test cases with defensive remediation notes',
      'Demonstrations of secure authentication and session hygiene'
    ],
    status: 'in_progress',
    technologies: [
      { name: 'Python', slug: 'python', category: 'backend', icon_url: null },
      { name: 'Linux', slug: 'linux', category: 'cloud', icon_url: null }
    ],
    github_url: 'https://github.com/dhananjaysarn/Cyber-Security-Toolkit',
    live_url: null,
    demo_url: null,
    images: [],
    featured: false
  },
  {
    title: 'React IoT Dashboard',
    slug: 'react-iot-dashboard',
    description: 'Real-time telemetry and device monitoring dashboard tracking hardware sensor data, status alerts, and historical logs.',
    problem: 'IoT hardware telemetry requires fast, low-latency client rendering and responsive graphs without complex configuration overhead.',
    solution: 'Engineered a modern React dashboard connected to Firebase real-time database to monitor live device states and temperature/humidity metrics.',
    features: [
      'Live metric graphs and threshold alerting indicators',
      'Device connection status and uptime monitoring',
      'Firebase Realtime Database synchronization'
    ],
    status: 'in_progress',
    technologies: [
      { name: 'React', slug: 'react', category: 'frontend', icon_url: null },
      { name: 'Firebase', slug: 'firebase', category: 'database', icon_url: null },
      { name: 'JavaScript', slug: 'javascript', category: 'frontend', icon_url: null }
    ],
    github_url: 'https://github.com/dhananjaysarn/React-IOT-Firebase',
    live_url: null,
    demo_url: null,
    images: [],
    featured: false
  },
  {
    title: 'College NOC Management System',
    slug: 'college-noc-management-system',
    description: 'A digital institutional workflow portal for student No Objection Certificate (NOC) requests, verification, and administrative approvals.',
    problem: 'Paper-based NOC and clearance requests in academic institutions cause administrative delays, lost paperwork, and lack of visibility for students.',
    solution: 'Designed an end-to-end digital approval workflow allowing students to submit clearance requests with real-time status tracking for department heads.',
    features: [
      'Role-based clearance dashboard for students and staff',
      'Digital request tracking with audit stamps and status progression',
      'Verification checks and automated document status generation'
    ],
    status: 'concept',
    technologies: [
      { name: 'React', slug: 'react', category: 'frontend', icon_url: null },
      { name: 'Node.js', slug: 'nodejs', category: 'backend', icon_url: null },
      { name: 'MySQL', slug: 'mysql', category: 'database', icon_url: null }
    ],
    github_url: 'https://github.com/dhananjaysarn/YBIT',
    live_url: null,
    demo_url: null,
    images: [],
    featured: false
  }
]
