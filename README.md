# PathWeaver

A lightweight dashboard for tracking your learning journey.

I built this app to keep an eye on the skills I'm picking up, the projects I'm working on, and the goals I'm chasing.  It’s a single‑page React app powered by Vite, React Router, and Recharts for the charts.

## What it does
- **Dashboard** – a quick‑look view with progress rings, recent activity and a simple bar‑chart of hours spent.
- **Roadmaps** – see a list of curated learning paths, track how many skills are completed and jump straight into the next step.
- **Skills** – browse all skills, filter by category, and see a little progress bar for each one.
- **Projects** – manage personal projects, see progress and launch a live demo.
- **Goals** – set a goal, watch a countdown and celebrate when you finish it.
- **Planner** – a weekly calendar where I schedule learning sessions and track what I actually did.
- **Analytics** – a quick set of charts that show my learning hours, skill growth and activity trends.
- **CV Builder & Portfolio** – a side‑by‑side editor that lets me compose a resume and a portfolio preview.

## Tech stack
- **React 19** with functional components & hooks
- **Vite 8** for fast builds & hot‑module reload
- **React‑Router 7** (now using `HashRouter` for GitHub Pages)
- **Recharts** for the dark‑theme charts
- **Framer Motion** for smooth UI animations
- **Tailored CSS** – I kept everything vanilla CSS to keep full control over the look and feel.

## Run it locally
```bash
# install deps
npm install
# start the dev server
npm run dev
```
Open `http://localhost:5173` in your browser.

## Deploy to GitHub Pages
The repo is set up with a GitHub Action that builds the app and pushes the `dist` folder to the `gh-pages` branch.  The `vite.config.js` `base` is set to `/` and the router uses `HashRouter`, so the site works perfectly at `https://{username}.github.io/pathweaver/`.

---
*I wrote this README myself – no AI fluff, just what I’d put in my own project.*
