# GCN Website — Migration & Build Protocol

## Identity & Branch Rules
- GitHub account must be Kesshhavvvv. Confirm this before any session begins — if wrong, stop immediately.
- Active branch: `feature-nextjs-migration`. **Never commit to main.**
- Brand primary color: `#9e221a` — resolve any conflicting red token to this single value.

---

## Tech Stack
- **Framework**: Next.js (App Router, Turbopack, static prerendering)
- **Language**: TypeScript strict mode
- **Styling**: Tailwind v4 — `@theme inline` in `app/globals.css`, **no** `tailwind.config.ts`
- **TypeScript check**: `node node_modules/typescript/bin/tsc --noEmit --project tsconfig.json`

---

## Design System — Newspaper Editorial Aesthetic

### Typography (4 fonts — each has a specific role, do not mix them up)
| Font | Variable | Load method | Role |
|---|---|---|---|
| General Sans | `--font-sans` / `--font-display` | Fontshare `<link>` in layout.tsx | UI, nav, labels, body fallback |
| Plus Jakarta Sans | `--font-plus-jakarta-sans` | `next/font/google` | Variable font, fallback in sans stack |
| Playfair Display | `--font-serif` / `--font-playfair` | `next/font/google` | **Section headings, editorial h2/h3** |
| UnifrakturMaguntia | `--font-blackletter` | Google Fonts `<link>` in layout.tsx | **Page masthead h1s ONLY** — never body/nav/subheadings |

**Rule**: Blackletter (`--font-blackletter`) is used exclusively on major masthead h1 titles at display size (≥2rem). Playfair Display (`--font-serif`) is used for all other editorial headings. Never swap these.

### GCN Brand Colors (use ONLY these — no vivid blues, greens, oranges, violets)
```
--color-brand-red:        #9e221a
--color-brand-red-dark:   #7a1814
--color-brand-red-light:  #f9dedd
--color-surface:          #F5F1E8   (warm cream — page background)
--color-surface-muted:    #EDE9DC
--color-surface-white:    #FDFBF7
--color-surface-card:     #141416
--color-black-soft:       #0C0C0E
--color-stats-ink:        #3D3926   (deep olive — StatsBlock only)
--color-gray-border:      #DDD9CE
--color-gray-text:        #4B5563
--color-gray-muted:       #6B7280
```

### Newspaper CSS Utilities (defined in `app/globals.css`)
- `.gcn-body-col` — justified body text, 14.5px, hyphens: auto
- `.gcn-double-rule` — 6px div: 2px thick rule + 3px gap + 1px thin rule (major section breaks)
- `.gcn-rule-full` — 1px full-width hairline (minor dividers)
- `.gcn-grain-overlay` — absolute positioned noise texture (add as child div to any section)
- `.gcn-halftone-overlay` — absolute positioned dot grid, mix-blend-mode: multiply (sits over photos)
- `.gcn-stats-tile` — hover filter on stats tiles
- `.gcn-marquee-fade` — edge fade mask on scrolling marquees

### Paper Texture
Body has 5 warm radial gradient blotches in `background-image` (simulates foxing/aging). Keep these — they are intentional.

---

## Component Map (Server / Client boundaries)
| Component | Boundary | Notes |
|---|---|---|
| HeroSection | **Server** | Globe is loaded via GlobeWrapper (client, ssr:false) |
| GlobeWrapper | **Client** | `dynamic(() => ..., { ssr: false })` — must stay client |
| WhoWeAre | **Server** | |
| StatsBlock | **Client** | Animated counters, uses IntersectionObserver |
| PhotoMarquee | **Client** | Marquee animation, pause-on-hover |
| SponsorLogoWall | **Client** | Marquee animation |
| Reveal | **Client** | Scroll-triggered fade-in wrapper |
| Navbar | **Client** | Scroll state, mobile menu |
| TeamCard | **Client** | Flip animation on hover |
| OrgTree | **Server** | |
| EventsTimeline | **Client** | Year filter, keyboard nav, IntersectionObserver |
| Footer | **Server** | |

---

## Key Pages & Their Page-Level Components
- `/` → HeroSection, WhoWeAre, StatsBlock, PhotoMarquee, SponsorLogoWall
- `/team` → OrgTree (contains TeamCard)
- `/events` → EventsTimeline
- `/sponsor` → `app/sponsor/page.tsx` (server component, all inline)

---

## Screenshot / Preview Workaround
The headless preview browser shows **blank** due to CSS animation delays (`fill-mode: both`). Always do this before screenshotting the home page:
```js
document.querySelectorAll('.hero-anim, .hero-fade, .hero-word').forEach(el => {
  el.style.animation = 'none'; el.style.opacity = '1'; el.style.transform = 'none';
});
```
For content below the fold, Reveal components are also hidden. Use `preview_snapshot` (DOM snapshot) as the reliable content verification method. Preview server ID: `9845dffe-5207-4c07-b65e-38576a65465c`, port 3000.

---

## Current State (as of last commit `0cc2a5f`)
All visual work through two major passes is complete and pushed:
1. **Pass 1** (`bc13b0e`) — Full newspaper editorial redesign: Playfair Display, masthead layouts, multi-column grids with vertical hairline rules, justified body text, eyebrow labels, classified sponsor tiers, team ordering fix (Angel Rosas before Henry Tran in Operations), headshot sizing fix.
2. **Pass 2** (`0cc2a5f`) — Newspaper authenticity refinement: UnifrakturMaguntia blackletter on masthead h1s, double rules under mastheads, paper texture on body background, halftone dot overlay + sepia filter on team headshots and PhotoMarquee.

---

## Known Pending Items (do not implement without explicit instruction)
- **Stage 8 HARD STOP** — Cal.com booking integration: awaiting `CAL_COM_API_KEY` + booking slug credentials. Do not implement booking UI until user provides these.
- **LinkedIn URLs**: Kendra (Pham) Do and Jennifer Phan — currently empty strings marked TODO in `lib/data/team.ts`
- **Testimonials**: 3 placeholder cards in the codebase marked TODO — awaiting real content
- **`major`/`year` fields**: Assumed values for Keshava and Bao — confirm with user if accuracy matters

---

## Self-Check Protocol (run after every stage, before every commit)
1. `node node_modules/typescript/bin/tsc --noEmit --project tsconfig.json` — zero type errors
2. No browser console errors (`preview_console_logs` level: error)
3. All modified routes render correctly in preview
4. Server/client boundary audit — no async client components
5. WCAG AA contrast confirmed on any new text/background combinations
6. No vivid accent colors introduced (blue/violet/teal/orange/emerald)
7. Blackletter font used only on masthead h1s (not subheadings, not nav, not body)
8. Confirm GitHub auth is Kesshhavvvv before any push

## Self-Healing Rule
If any check fails, fix it and restart from step 1. Never commit until all 8 pass.

## Hard Stop Conditions
Stop immediately and wait for explicit user input if you encounter:
- Missing credentials (Cal.com API key, external accounts)
- Any destructive operation
- 3 consecutive failed self-checks on the same stage
- Any task prompt that explicitly says STOP

## Stage Structure Template
1. Read all relevant files first
2. State the plan before writing code
3. Write code
4. Run all 8 self-checks
5. Commit with descriptive message
6. Push to `feature-nextjs-migration`
7. Report what changed + check results

## Commit Message Format
```
feat: [what was added]
fix: [what was fixed]
perf: [performance improvement]
chore: [maintenance]
```
