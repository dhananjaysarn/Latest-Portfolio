from datetime import date
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.profile.models import Profile, SocialLink
from apps.technologies.models import Technology
from apps.skills.models import SkillCategory, Skill
from apps.projects.models import Project, ProjectTechnology
from apps.startups.models import StartupIdea
from apps.education.models import Education
from apps.experience.models import Experience
from apps.certifications.models import Certification


class Command(BaseCommand):
    help = "Seed database with Dhananjay Rajan Sarnaik's truthful resume portfolio data."

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("Seeding portfolio data...")

        # 1. Profile
        Profile.objects.filter(is_active=True).update(is_active=False)
        profile = Profile.objects.create(
            display_name="Dhananjay Rajan Sarnaik",
            headline="Full-Stack Developer · AI Builder · Computer Engineering Student",
            summary=(
                "I’m Dhananjay Rajan Sarnaik — a computer engineering student and full-stack developer "
                "based in Sawantwadi, Maharashtra. Drawn to the craft of building useful software, "
                "from responsive, high-performance interfaces to dependable systems."
            ),
            location="Sawantwadi, Maharashtra, India",
            email="dhananjaysarnaik12@gmail.com",
            resume_url="/Resume.pdf",
            is_active=True,
        )

        SocialLink.objects.update_or_create(
            profile=profile,
            platform="github",
            defaults={"label": "GitHub", "url": "https://github.com/dhananjaysarn", "order": 1},
        )
        SocialLink.objects.update_or_create(
            profile=profile,
            platform="linkedin",
            defaults={
                "label": "LinkedIn",
                "url": "https://www.linkedin.com/in/dhananjay-sarnaik-79748534a/",
                "order": 2,
            },
        )

        # 2. Technologies
        tech_data = [
            ("React", "frontend"),
            ("TypeScript", "frontend"),
            ("JavaScript", "frontend"),
            ("HTML5", "frontend"),
            ("CSS3", "frontend"),
            ("Tailwind CSS", "frontend"),
            ("Bootstrap", "frontend"),
            ("Vite", "frontend"),
            ("Python", "backend"),
            ("Django", "backend"),
            ("Django REST Framework", "backend"),
            ("Node.js", "backend"),
            ("Express.js", "backend"),
            ("REST APIs", "backend"),
            ("SQL", "database"),
            ("MySQL", "database"),
            ("MongoDB", "database"),
            ("PostgreSQL", "database"),
            ("Firebase", "database"),
            ("Docker", "cloud"),
            ("Linux", "cloud"),
            ("AWS Fundamentals", "cloud"),
            ("Git", "tooling"),
            ("GitHub", "tooling"),
            ("Postman", "tooling"),
            ("VS Code", "tooling"),
        ]
        technologies = {}
        for name, category in tech_data:
            tech, _ = Technology.objects.update_or_create(
                name=name,
                defaults={"category": category},
            )
            technologies[name] = tech

        # 3. Skills by Category
        categories_data = [
            ("Programming", 1, ["Python", "JavaScript", "Java", "C", "C++"]),
            ("Frontend", 2, ["React.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap", "Vite", "Responsive Design"]),
            ("Backend", 3, ["Node.js", "Express.js", "Django", "Django REST Framework", "REST APIs"]),
            ("Database", 4, ["SQL", "MySQL", "MongoDB", "PostgreSQL", "Firebase"]),
            ("Cloud & Tools", 5, ["Git", "GitHub", "Postman", "Linux", "Docker", "AWS Fundamentals", "VS Code"]),
            ("Computer Science", 6, ["OOP", "DSA", "DBMS", "Operating Systems", "Computer Networks"]),
        ]
        for cat_name, order, skill_list in categories_data:
            cat, _ = SkillCategory.objects.update_or_create(
                name=cat_name,
                defaults={"order": order},
            )
            for idx, s_name in enumerate(skill_list, start=1):
                tech_match = technologies.get(s_name) or technologies.get(s_name.replace(".js", ""))
                Skill.objects.update_or_create(
                    category=cat,
                    name=s_name,
                    defaults={"order": idx, "technology": tech_match},
                )

        # 4. Projects (Published with truthful status)
        projects_data = [
            {
                "title": "Studify",
                "description": "An AI-powered Student Operating System unifying learning, skills development, opportunities and career readiness workflows into a single cohesive interface.",
                "problem": "Students navigate fragmented tools for curriculum learning, technical skills tracking, hackathon opportunities, and project portfolios without a central hub.",
                "solution": "Designed and engineered Studify as a modular student platform offering intelligent study scheduling, workflow guidance, and practical skill paths.",
                "features": [
                    "Comprehensive student workspace for daily learning and course milestones",
                    "AI-assisted idea and study resource structuring",
                    "Opportunity and hackathon discovery dashboard",
                    "Skill progress tracking tailored to computer engineering curricula",
                ],
                "status": Project.Status.IN_PROGRESS,
                "github_url": "https://github.com/dhananjaysarn/studify-frontend",
                "featured": True,
                "order": 1,
                "techs": ["React", "TypeScript", "Node.js", "Tailwind CSS"],
            },
            {
                "title": "StartupIQ",
                "description": "An AI Startup Operating System engineered for idea validation, structured market research, customer discovery, and founder execution workflows.",
                "problem": "Early-stage founders struggle with structured validation frameworks, turning vague concepts into actionable problem statements and initial product specs.",
                "solution": "Built an interactive founder toolkit combining step-by-step validation questionnaires, competitive breakdown generation, and operational milestones.",
                "features": [
                    "Structured validation canvas and market-need evaluation",
                    "Workflow checklists for prototype planning and MVP scoping",
                    "Interactive ecosystem map connecting customer personas to core features",
                ],
                "status": Project.Status.IN_PROGRESS,
                "github_url": "https://github.com/dhananjaysarn/IdeaGenrator",
                "featured": True,
                "order": 2,
                "techs": ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
            },
            {
                "title": "ProductScope AI",
                "description": "An AI product research platform offering automated recommendation and data-visualization workflows for product analysis.",
                "problem": "Gathering insights across diverse products and market categories is manual, tedious, and lacks intuitive visual breakdowns.",
                "solution": "Constructed an analytical interface delivering automated product intelligence summaries, comparison visualizers, and sentiment breakdown metrics.",
                "features": [
                    "Automated product specification breakdown and feature matrix",
                    "Visual charts and comparative data insights",
                    "Clean search and category filter architecture",
                ],
                "status": Project.Status.IN_PROGRESS,
                "github_url": "https://github.com/dhananjaysarn/ProductScope-AI",
                "featured": True,
                "order": 3,
                "techs": ["Python", "React", "REST APIs"],
            },
            {
                "title": "Cybersecurity Toolkit",
                "description": "Practical security utilities and security-focused learning workflows for vulnerability analysis, network checks, and defensive practices.",
                "problem": "Understanding common web vulnerabilities and defensive security techniques requires hands-on tooling and contextual practical exercises.",
                "solution": "Authored a consolidated repository of network scanning helpers, input validation validators, and secure coding utilities.",
                "features": [
                    "Handy security inspection utilities and port/header testing helpers",
                    "Practical vulnerability test cases with defensive remediation notes",
                    "Demonstrations of secure authentication and session hygiene",
                ],
                "status": Project.Status.IN_PROGRESS,
                "github_url": "https://github.com/dhananjaysarn/Cyber-Security-Toolkit",
                "featured": False,
                "order": 4,
                "techs": ["Python", "Linux"],
            },
            {
                "title": "React IoT Dashboard",
                "description": "Real-time telemetry and device monitoring dashboard tracking hardware sensor data, status alerts, and historical logs.",
                "problem": "IoT hardware telemetry requires fast, low-latency client rendering and responsive graphs without complex configuration overhead.",
                "solution": "Engineered a modern React dashboard connected to Firebase real-time database to monitor live device states and temperature/humidity metrics.",
                "features": [
                    "Live metric graphs and threshold alerting indicators",
                    "Device connection status and uptime monitoring",
                    "Firebase Realtime Database synchronization",
                ],
                "status": Project.Status.IN_PROGRESS,
                "github_url": "https://github.com/dhananjaysarn/React-IOT-Firebase",
                "featured": False,
                "order": 5,
                "techs": ["React", "Firebase", "JavaScript"],
            },
            {
                "title": "College NOC Management System",
                "description": "A digital institutional workflow portal for student No Objection Certificate (NOC) requests, verification, and administrative approvals.",
                "problem": "Paper-based NOC and clearance requests in academic institutions cause administrative delays, lost paperwork, and lack of visibility for students.",
                "solution": "Designed an end-to-end digital approval workflow allowing students to submit clearance requests with real-time status tracking for department heads.",
                "features": [
                    "Role-based clearance dashboard for students and staff",
                    "Digital request tracking with audit stamps and status progression",
                    "Verification checks and automated document status generation",
                ],
                "status": Project.Status.CONCEPT,
                "github_url": "https://github.com/dhananjaysarn/YBIT",
                "featured": False,
                "order": 6,
                "techs": ["React", "Node.js", "MySQL"],
            },
        ]

        for p_info in projects_data:
            tech_names = p_info.pop("techs")
            project, _ = Project.objects.update_or_create(
                title=p_info["title"],
                defaults={**p_info, "is_published": True},
            )
            for t_name in tech_names:
                if t_name in technologies:
                    ProjectTechnology.objects.get_or_create(
                        project=project,
                        technology=technologies[t_name],
                    )

        # 5. Startup Ideas
        startup_data = [
            ("StudentOS", "Student life and learning systems", "Disorganized student resources and lack of integrated workflows.", "Centralized StudentOS combining academics, opportunities, and skills."),
            ("FounderOS", "A workspace for early-stage founders", "Disorganized market validation and milestone execution.", "Guided founder workspace with structured validation tools."),
            ("CompanyOS", "Connected operations for teams", "Disjointed team tooling and operational friction.", "Unified internal OS for streamlined team communication and projects."),
            ("Local Business OS", "Tools for independent businesses", "Independent businesses lack accessible digital inventory and CRM systems.", "Lightweight digital stack tailored for local shops and merchants."),
            ("CashFlowOS", "A clearer view of business cash flow", "Opaque daily ledger flows and late invoice tracking.", "Real-time receivables, payable insights and cashflow forecasting."),
            ("GovTech Platform", "More accessible public services", "Complex administrative citizen procedures and queuing delays.", "Simplified self-service portal for public document workflows."),
            ("ConstructionTech", "Connected construction workflows", "Uncoordinated site logs, vendor deliveries, and contractor timelines.", "Mobile-first site coordination and procurement tracking."),
            ("Export / Import Platform", "Simplifying trade operations", "Complex cross-border paperwork and tracking hurdles.", "Standardized documentation and cargo tracking platform."),
        ]
        for order, (name, summary, problem, solution) in enumerate(startup_data, start=1):
            StartupIdea.objects.update_or_create(
                name=name,
                defaults={
                    "summary": summary,
                    "problem": problem,
                    "proposed_solution": solution,
                    "stage": StartupIdea.Stage.CONCEPT,
                    "is_visible": True,
                    "order": order,
                },
            )

        # 6. Education
        Education.objects.update_or_create(
            qualification="Diploma in Computer Engineering (K-Scheme)",
            institution="Yashwantrao Bhonsale Institute of Technology, Sawantwadi",
            defaults={
                "field_of_study": "Computer Engineering",
                "location": "Sawantwadi, Maharashtra",
                "start_date": date(2024, 6, 1),
                "end_date": date(2027, 5, 31),
                "is_current": True,
                "description": "Current percentage: 80%. Focused on core computer science foundations, algorithms, database systems, and full-stack software development.",
                "order": 1,
            },
        )
        Education.objects.update_or_create(
            qualification="Secondary School Certificate (SSC)",
            institution="Kalsulkar English School",
            defaults={
                "field_of_study": "General Academics",
                "location": "Sawantwadi, Maharashtra",
                "start_date": None,
                "end_date": date(2024, 5, 1),
                "is_current": False,
                "description": "Passed in 2024 with 72.60%.",
                "order": 2,
            },
        )

        # 7. Experience
        Experience.objects.update_or_create(
            role="Full Stack Developer Intern",
            organization="Softmusk",
            defaults={
                "location": "Sawantwadi, Maharashtra",
                "start_date": date(2026, 1, 1),
                "end_date": date(2026, 6, 30),
                "is_current": False,
                "description": "Worked on responsive web applications using React.js and Node.js. Practiced frontend/backend integration, REST API connectivity, and database-driven workflows.",
                "highlights": [
                    "Developed responsive UI components using React.js and modern CSS",
                    "Engineered backend endpoints and REST APIs using Node.js and Express",
                    "Integrated client applications with database queries and verified data flows",
                    "Followed practical software development life cycle (SDLC) and collaborative git workflows",
                ],
                "order": 1,
            },
        )

        # 8. Certifications
        certs = [
            ("Fundamentals of Machine Learning (CS207)", "Saylor University", date(2025, 1, 1)),
            ("Full Stack Web Development", "Technical Certification Program", date(2025, 1, 1)),
            ("Data Structures & Algorithms (DSA)", "Technical Learning Program", date(2025, 1, 1)),
            ("React JS Development", "Technical Skill Certification", date(2025, 1, 1)),
            ("SQL & Database Management", "Database Learning Program", date(2024, 1, 1)),
            ("Power BI Data Analytics", "Data Analytics Certification", date(2024, 1, 1)),
            ("MS-CIT", "MKCL", date(2024, 1, 1)),
            ("Full Stack Developer Internship Completion", "Softmusk", date(2026, 6, 1)),
        ]
        for order, (name, issuer, issue_date) in enumerate(certs, start=1):
            Certification.objects.update_or_create(
                name=name,
                issuer=issuer,
                defaults={"issued_on": issue_date, "order": order},
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Dhananjay's portfolio database."))
