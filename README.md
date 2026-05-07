# ⚔ GitHub Battle Arena

A production-quality React application to search GitHub profiles and battle developers head-to-head.

## Features

- **Search Mode** — Search any GitHub user and view their profile, stats, and top repositories
- **Battle Mode** — Compare two developers across followers and total stars, with a clear winner
- **Dark/Light Mode** — Toggleable theme, persisted in localStorage (dark by default)
- **Responsive** — Works beautifully on mobile and desktop
- **Error Handling** — Graceful 404 and network error states, no crashes

## Tech Stack

- React 18 (Functional Components + Hooks)
- Vite (build tool)
- Fetch API (no Axios)
- Plain CSS (`style.css`, no Tailwind/Bootstrap)
- GitHub REST API v3

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx     — Username input with submit
│   ├── ProfileCard.jsx   — User profile display card
│   ├── RepoList.jsx      — Top 5 repos by last updated
│   ├── Battle.jsx        — Dual-user battle mode
│   └── ThemeToggle.jsx   — Dark/light mode switcher
├── services/
│   └── api.js            — GitHub API fetch functions
├── utils/
│   └── helpers.js        — Date formatting, number formatting, star calc
├── App.jsx               — Root component, mode/theme state
├── main.jsx              — React entry point
└── style.css             — All styling, CSS variables, responsive
```

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## Battle Logic

- Fetches both users with `Promise.all()`
- Scores compared on: **Followers** + **Total Stars** (from all public repos)
- Winner: most points (max 2). Tie possible.
- Winner highlighted in green, loser in red

## Design

- Aesthetic: Cyberpunk terminal / dark arena
- Typography: Syne (display) + Space Mono (data/code)
- Accent: `#00e6b8` teal / green
- Fully custom CSS with CSS variables for theming

🌐 Deployment

This project deployed on 🌐 Deployment

This project can be deployed easily on: vercel
live link : https://git-hub-battle-arena-efiw.vercel.app/

Clone Repo : 
 
