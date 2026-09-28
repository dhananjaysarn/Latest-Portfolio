# Dhananjay Rajan Sarnaik — developer portfolio

A data-driven portfolio foundation with a React + TypeScript frontend and a separately deployed Django REST API. The portfolio is intentionally not populated with invented projects, experience, statistics, or product claims.

## Project map

- `frontend/` — Vite, React Router, Tailwind CSS v4, Axios client, domain types, API and GitHub services, reusable component/section structure.
- `backend/` — Django project with modular apps, DRF endpoints, ORM models, admin, and tests.
- `docs/architecture.md` — request flow, data relationships, responsibility boundaries, and deployment design.
- `docker/`, `docker-compose.yml` — container build definitions and local multi-service topology.
- `nginx/` — SPA fallback and API/admin reverse-proxy configuration.

## Local development

1. Copy `.env.example` to `.env` and update the values. Never commit `.env`.
2. Start PostgreSQL locally or use SQLite for a quick backend-only check (unset `DATABASE_URL` in your shell).
3. Install backend dependencies in a virtual environment with `pip install -r backend/requirements.txt`.
4. In `backend/`, run `python manage.py migrate`, then `python manage.py runserver`.
5. In `frontend/`, run `npm ci` and `npm run dev`. The Vite dev server proxies `/api` to `http://127.0.0.1:8000`.

For a production-like local stack, configure the Compose database values in `.env`, then run `docker compose up --build`. Apply database migrations with `docker compose exec backend python manage.py migrate`.

## Environment

The root `.env.example` lists local and Compose settings. Django production settings require `SECRET_KEY`, `ALLOWED_HOSTS`, and a PostgreSQL `DATABASE_URL`. `frontend/.env.example` lists browser-safe Vite settings; only `VITE_` values are compiled into browser code and must never contain secrets. Set `VITE_API_BASE_URL` to the deployed backend origin and `VITE_SITE_URL` to the canonical site origin for Vercel deployments.

## API

- `GET /api/v1/profile/`
- `GET /api/v1/projects/` and `GET /api/v1/projects/{slug}/`
- `GET /api/v1/technologies/`
- `GET /api/v1/skills/`
- `GET /api/v1/experience/`
- `GET /api/v1/education/`
- `GET /api/v1/certifications/`
- `GET /api/v1/startups/`
- `GET /api/v1/social-links/`
- `POST /api/v1/contact/`

Content endpoints are read-only; use Django admin for curation. Projects are unpublished and startup ideas hidden by default, so authored entries must be explicitly approved before appearing publicly. The contact endpoint validates submissions and applies anonymous rate limiting.

## Validation

```powershell
cd frontend
npm run build
npm run lint
cd ..\backend
python manage.py check
python manage.py test
```

For architecture and data-flow detail, see [docs/architecture.md](docs/architecture.md).
