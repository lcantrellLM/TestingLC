# Keystone — property risk prototype

Clickable mid-fi web prototype for an HCR-first UK mortgage valuation risk platform.

## Run locally

```bash
cd keystone-prototype
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## What’s inside

- **Login** — prototype sign-in (any non-empty email/password)
- **Company / branch switcher** — switch Meridian or Harbor, then pick a branch desk
- **Dashboard** — case list and counts for the active branch
- **Queue / Case** — valuation route recommendation, override, instruct (scoped to the active branch)
- **HCR** — condition summary, defects, photos, surveyor notes
- **Rules workbench** — sample rules shaped like a VRM Phase 8 draft (A→B→C→D)
- **MI** — illustrative route-mix dashboard
- **Docs / Explore** — design pack and prototype tour

Prototype data only — not connected to live lending systems.
