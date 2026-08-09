# VV Marine Exports (`vss-exports`)

Marketing site and product catalog for **VV Marine Exports** — premium seafood exports (Vannamei, Black Tiger shrimp, fresh fish). Production: [vmarineexport.com](https://vmarineexport.com).

## Repository layout

| Path | Purpose |
|------|---------|
| `frontend/` | React + Vite SPA (HashRouter), Tailwind, product explorer |
| `api/` | Vercel serverless routes: `/api/login`, `/api/inquire`, `/api` health |
| `frontend/api/` | Re-exports root `api/` when Vercel **Root Directory** is `frontend` |
| `shared/api/` | **Single source of truth** for login/inquire business logic |
| `backend/` | Local dev API with **SQLite** (`vss.db`) — same routes as production |
| `vercel.json` | Build `frontend/dist` + deploy root `api/` functions |

## Quick start (local)

**Prerequisites:** Node.js 18+

```bash
npm run install-all
```

**Terminal 1 — backend (SQLite, port 5000):**

```bash
npm run dev:backend
```

**Terminal 2 — frontend (port 5173, proxies `/api` to backend):**

```bash
npm run dev:frontend
```

Open `http://localhost:5173`. Login and contact forms hit `http://localhost:5000/api/*`.

## Production (Vercel)

- Static site from `frontend/dist`
- API routes are serverless functions in `/api` (in-memory store per instance — inquiries are logged; use a database for durable storage)
- Set Vercel **Root Directory** to repo root (recommended). If set to `frontend`, `frontend/api/*` re-exports still work.

**Build command (root `vercel.json`):**

```bash
npm install --prefix frontend && npm run build --prefix frontend
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api` | Health check JSON |
| POST | `/api/login` | Register / returning user (`name`, `email`, `phone`, `company`) |
| POST | `/api/inquire` | Contact, order, newsletter (`email`, `message`, `type`, …) |

## Contact (business)

- WhatsApp: **+91 7674999037**
- Operations: **+91 7032367611**
- Email: **vvmarineexports@gmail.com**

## License

Private — VV Marine Exports.
