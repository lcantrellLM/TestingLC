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

- **Login** — one-click enter into the clickable prototype (optional sign-in form)
- **Company / branch switcher** — click desk chips on the dashboard or use the header switcher
- **Dashboard** — case list and counts for the active branch; click a case to open it
- **Queue / Case** — valuation route recommendation, override, instruct (scoped to the active branch)
- **HCR** — condition summary, defects, photos, surveyor notes
- **Rules workbench** — sample rules shaped like a VRM Phase 8 draft (A→B→C→D)
- **MI** — illustrative route-mix dashboard
- **Docs / Explore** — design pack and prototype tour

Prototype data only — not connected to live lending systems.
