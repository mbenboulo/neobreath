# NeoBreath

Wearable monitoring and intervention, in development for **apnea of prematurity**.

NeoBreath is a research and development project at prototype stage. It combines a respiratory
sensing belt that interprets signals on board, a foot-worn module for oxygen saturation and heart
rate, and a mobile app for the caregiver. It is being developed at KNUST with the DIPPER Lab.

This repository is the project's website: a six-act narrative with three custom animations that
explain the mechanism, the false-alarm problem, and the research direction.

> **Status.** Research and development at prototype stage. NeoBreath is not a medical device, it has
> not been clinically validated yet, and it is not a replacement for professional care.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Motion | Framer Motion |
| Animations | Remotion 4 — rendered to MP4 and committed under `public/animations/` |
| Deploy | Vercel |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Configuration is by environment variable, documented in `.env.example`. `NEXT_PUBLIC_SITE_URL` is
required in production: canonical URLs, social cards and `sitemap.xml` all derive from it.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run verify` | Quality gates: source encoding, asset paths, WCAG contrast, generated-file drift |
| `npm run metadata:report` | Per-route canonical, Open Graph and Twitter tags, read from the build output |
| `npm run audit:contrast` | WCAG AA check for every colour pair in the design system |
| `npm run shoot` | Render the site in headless Chrome and assert no layout overflow |

## Project structure

```
app/            routes — the story, technology, research, evidence, about
components/
  brand/        design-system primitives (Section, ClaimBadge, StatusChip, VitalCard, StoryVideo)
  sections/     the six acts of the home page, one component each
content/        all prose and claims, as typed modules the components consume
design/         design tokens — the single source of truth for colour, type and elevation
lib/            waveform geometry, analytics, metadata helpers
public/         animations (MP4 and posters), conference recordings, logos
remotion/       source for the three animations
scripts/        checks and tooling
```

### How the copy works

Prose lives in `content/`, not inside the components, so wording is reviewable in one place and
cannot drift from what renders.

Capability statements carry a confidence tier — `TODAY`, `IN DEVELOPMENT` or `RESEARCH` — which
renders as a visible badge, and any qualifier travels with the claim. Nothing on the site claims
more than the project has demonstrated.

## Notes for contributors

The animation tooling mirrors files between `remotion/` (in this repository) and a sibling Remotion
project outside it, which is where the renders are produced. `npm run anim:sync` performs that
mirror. `npm run verify` and `npm run shoot` therefore expect that sibling project to be present;
they work on the development setup rather than in a bare clone. The committed MP4s are complete —
building and deploying this repository needs none of that tooling.

## License

© NeoBreath. All rights reserved.
