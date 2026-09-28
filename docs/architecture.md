# Architecture overview

## Runtime boundaries

```text
Browser
  └── React + TypeScript (Vite, Router, Tailwind)
        ├── Axios → /api/v1/* → Django REST Framework
        │                         └── app services → Django ORM → PostgreSQL
        └── GitHub service → public GitHub REST API

Internet → Nginx → static frontend
                    ├── /api/*, /admin/* → Django / Gunicorn
                    └── Django ORM → PostgreSQL
```

The browser never opens a PostgreSQL connection. `VITE_API_BASE_URL` points to the versioned API; Vite proxies `/api` to Django during development and Nginx routes it in the container topology. GitHub data is an optional, public API integration isolated in the frontend service layer. No access token is required or exposed.

## Frontend boundaries

- `components/common/`, `layout/`, `navigation/`, `buttons/`, `cards/`, `loaders/`, and `ui/` hold reusable presentation primitives. `sections/hero`, `about`, `skills`, `projects`, `startups`, `experience`, `education`, `certifications`, `github`, and `contact` compose their respective portfolio domains.
- `pages/`, `layouts/`, and `routes/` own URL-level rendering rather than content or database logic.
- `services/api/`, `services/contact/`, and `services/github/` isolate network access from React views.
- `types/` defines API-shaped profile, skill, experience, education, certification, project, startup, and contact contracts. Content is sourced from Django, not embedded in JSX.
- `three/data/` stores reusable technology definitions; scene components can consume this data lazily when the 3D sections are implemented.
- `config/` reads public `VITE_` settings. Secrets do not belong in a Vite bundle.
- `hooks/`, `context/`, `constants/`, and `utils/` hold reusable behavior, app-wide state, stable values, and pure helpers; `animations/` centralizes motion recipes.
- `assets/` contains static frontend assets. `styles/` is reserved for additional global design tokens; Tailwind v4 tokens begin in `src/index.css`.
- `usePageMetadata` updates route title, description, Open Graph/Twitter metadata, and a canonical link when the site origin is configured. Structured profile metadata and a sitemap should be added once the real domain/profile data is approved.

The `three/` boundary is split into reusable scenes, components, models, materials, and data so future 3D work remains lazy-loadable and doesn't inflate the initial route.

## Backend boundaries

`apps/` contains one Django app per content domain. Each app owns its models, DRF serializers/views/URLs, admin registration, services, and tests. `common/` contains shared abstract model behavior; `config/` owns settings profiles, API routing, and Django entry points; `requirements/base.txt` is the pinned backend runtime dependency set, included by the compatibility `requirements.txt`.

## Backend and API flow

`config/settings/base.py` contains shared Django, DRF, CORS, storage, and database setup. `development.py` provides a convenient SQLite fallback when `DATABASE_URL` is absent and generates an ephemeral local-only secret if none is set; production explicitly requires a PostgreSQL URL and secret. Apps expose read-only `ModelViewSet`s for portfolio content, with serializers controlling API output. Projects are unpublished and startup ideas hidden until explicitly approved in admin. Contact is an explicit validated, rate-limited POST endpoint whose persistence is delegated to a service. Django admin remains the content-authoring interface.

API paths use `/api/v1/`. Collection endpoints are paginated; project and other slug-addressable resources use router detail routes. Validation errors use DRF's standard structured 400 response. A missing profile returns 404 rather than a fabricated profile.

The public GitHub REST service provides repositories, language totals, repository statistics, and public recent events. That API does not expose a pinned-repository list; featured portfolio projects are therefore curated with the backend `Project.featured` flag rather than represented by fabricated pin data.

## Data relationships

- `Profile` is the authored identity record; `SocialLink` belongs to a profile.
- `Project` relates to `Technology` through `ProjectTechnology`; a project owns ordered `ProjectImage` records.
- `Skill` belongs to `SkillCategory` and may optionally refer to a canonical `Technology`.
- `Experience`, `Education`, `Certification`, `StartupIdea`, and `ContactMessage` are independent records.
- All domain records inherit UUID identity and created/updated timestamps from `TimestampedModel`.
- Uniqueness, valid date ranges, and skill proficiency bounds are enforced at the database layer as well as by API validation where appropriate.

## Deployment

`docker-compose.yml` runs PostgreSQL, Django/Gunicorn, and an Nginx-served Vite build. PostgreSQL data and uploaded media use named volumes. Apply migrations explicitly before deploying a schema change:

```powershell
docker compose exec backend python manage.py migrate
```

Set environment variables from `.env.example`; never place production secrets in source control or frontend variables. The frontend can be deployed independently to Vercel with `VITE_API_BASE_URL` set to the hosted API origin/path. Django can run on Render or AWS with PostgreSQL, Gunicorn, and a configured storage backend; `nginx/default.conf` documents the reverse-proxy route if Nginx is used.

## Deliberate next steps

This foundation does not add invented work history, projects, metrics, startup claims, or GitHub activity. Populate Django admin with verified records, then build one portfolio section at a time using its API service and domain types. Add JWT authentication only for future protected authoring workflows; public portfolio reads remain public.
