# Divora Technology

Marketing website for **Divora Technology** — a Noida-based product studio that designs and engineers full-stack web applications.

Built as a single-page React app with a custom-animated, no-framework UI (cursor follower, particle hero, scroll progress, tilt cards, reveal-on-scroll, rotating headline, animated counters).

---
Test
## ✨ Features

- **Interactive Hero Section**: Dynamic rotating taglines ("scales beautifully", "ships fast", "feels effortless", "drives revenue") with animated particle background
- **Statistics Dashboard**: Animated counters showing 40+ projects shipped, 25+ happy clients, 8 years in tech, and 12 technologies mastered
- **Services Showcase**: Six service cards with 3D tilt effects and spotlight animations
- **Technology Stack Display**: Organized pills showing expertise in Frontend, Backend, and Data & Infra technologies
- **Portfolio Gallery**: Showcase of completed work and projects
- **Development Process**: Step-by-step overview of the engineering methodology
- **About Section**: Company background, values, and mission
- **Contact Integration**: Client-side validated contact form that opens mail client with pre-filled message
- **Responsive Design**: Fully responsive layout optimized for all screen sizes
- **Accessibility Features**: Respects `prefers-reduced-motion` for inclusive user experience
- **Custom Cursor**: Interactive cursor that follows mouse movement on fine-pointer devices
- **Scroll Progress Indicator**: Visual progress bar at the top of the page
- **Back to Top Button**: Smooth scroll to top functionality
- **Reveal Animations**: Elements animate into view as they scroll into viewport
- **No External Dependencies**: Pure CSS animations and effects, no UI frameworks

---

## Tech stack

- **React 19** + **TypeScript 5.7** (strict)
- **Vite 6** for dev server and production build
- **Plain CSS** in [src/styles.css](src/styles.css) — no UI framework, no CSS-in-JS
- Google Fonts: Space Grotesk, Inter, JetBrains Mono (loaded via [index.html](index.html))

No router, no state library, no backend — the contact form opens the user's mail client via `mailto:`.

---

## Project structure

```
divoratechnology/
├── index.html              # HTML shell + font preconnects + meta description
├── package.json            # Scripts and deps (React 19, Vite 6)
├── vite.config.ts          # Vite config — dev server on port 5173, auto-open
├── tsconfig*.json          # Split TS configs (app / node)
└── src/
    ├── main.tsx            # React root, StrictMode
    ├── App.tsx             # Page composition (sections in order)
    ├── styles.css          # All styling
    ├── components/         # One component per section + UI primitives
    │   ├── Header.tsx
    │   ├── Hero.tsx            # Rotating headline, particles, code card, counters
    │   ├── Marquee.tsx
    │   ├── Services.tsx        # 6 service cards w/ tilt + spotlight
    │   ├── TechStack.tsx       # Backend / Frontend / Data & Infra pills
    │   ├── Work.tsx
    │   ├── Process.tsx
    │   ├── About.tsx
    │   ├── Contact.tsx         # Form -> mailto:info@divoratechnology.com
    │   ├── Footer.tsx
    │   ├── Cursor.tsx          # Custom cursor for fine pointers
    │   ├── ScrollProgress.tsx  # Top scroll bar
    │   ├── BackToTop.tsx
    │   ├── ParticleCanvas.tsx  # Hero background particles
    │   └── Reveal.tsx          # Reveal-on-scroll wrapper
    └── hooks/
        ├── useCounter.ts       # Animated number counter (intersection-triggered)
        ├── useReveal.ts        # Reveal-on-scroll observer
        └── useTilt.ts          # 3D tilt on mouse move
```

The page is composed in [src/App.tsx](src/App.tsx) in this order: `Hero → Marquee → Services → TechStack → Work → Process → About → Contact → Footer`.

---

## Getting started

Requirements: **Node.js 18+** and npm.

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173, auto-opens browser)
npm run dev

# Type-check only (no emit)
npm run lint

# Type-check + production build into /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## Scripts reference

| Script           | What it does                                                |
| ---------------- | ----------------------------------------------------------- |
| `npm run dev`     | Start Vite dev server on port 5173 with HMR (auto-opens).  |
| `npm run build`   | Run `tsc -b` for type-checking, then `vite build` to `dist`. |
| `npm run preview` | Serve the built `dist/` for a smoke test.                  |
| `npm run lint`    | TypeScript-only check (`tsc -b --noEmit`).                 |

---

## Behavior notes

- **Reduced motion:** every animated effect (rotating headline, counters, smooth scroll, particles, tilt, reveals) checks `prefers-reduced-motion` and degrades gracefully.
- **Fine-pointer features:** the custom cursor, card tilt, and spotlight only activate on devices with `(hover: hover) and (pointer: fine)`.
- **Contact form:** validates name/email/topic/message client-side and opens the user's default mail client with a pre-filled message to `info@divoratechnology.com`. No backend required.
- **SEO:** description and Open Graph-friendly title set in [index.html](index.html).

---

## Contact / business info

The contact details rendered on the site (kept here for convenience):

- **Office:** F-1004, Amrapali Platinum, Sector 119, Noida 201301, Uttar Pradesh, India
- **Phone:** +91 96677 51771
- **Email:** info@divoratechnology.com · support@divoratechnology.com · account@divoratechnology.com
- **Hours:** Mon – Sat · 10:00 – 19:00 IST

---

## License

Private — © Divora Technology. All rights reserved.
