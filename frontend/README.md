# Portfolio frontend

React + TypeScript application built with Vite, React Router, Tailwind CSS v4, Axios, and the existing motion/3D dependencies.

## Development

```powershell
npm ci
npm run dev
```

The Vite server proxies `/api/*` to `VITE_API_PROXY_TARGET` (default `http://127.0.0.1:8000`). Set the public API base URL and optional GitHub username in `.env.local`; only browser-safe `VITE_` variables belong here.

## Architecture

- `src/routes`, `layouts`, and `pages` define URL composition.
- `src/sections` is reserved for individual portfolio domains; the current route is only a foundation placeholder.
- `src/components` contains reusable UI, layout, navigation, card, button, and loading primitives.
- `src/services` owns all Django and GitHub requests; UI components should not issue requests directly.
- `src/types` contains the API-facing TypeScript contracts.
- `src/three/data` defines reusable technology objects. Three.js scenes should be lazy-loaded when their section is implemented.
- `src/index.css` defines Tailwind v4 and the initial design tokens; `src/styles` is for future global additions.

Run `npm run typecheck`, `npm run lint`, or `npm run build` to validate changes. For backend/API and deployment flow see [../docs/architecture.md](../docs/architecture.md).
