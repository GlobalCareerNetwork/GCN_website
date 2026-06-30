# GCN Website — Migration Map
> Stage 0 output. Source of truth for the HTML→Next.js migration.
> Branch: feature-nextjs-migration | Auth: Kesshhavvvv

---

## 1. Source File Inventory

### HTML Pages (6)

| File | Lines | Route → Next.js | Notes |
|------|-------|-----------------|-------|
| index.html | 396 | `app/page.tsx` | Homepage; hero, about, why, stats, testimonials, partners, CTA |
| team.html | 173 | `app/team/page.tsx` | Shell only — all content rendered by team.js at runtime |
| events.html | 401 | `app/events/page.tsx` | Full-page scroll hijack; past + upcoming event slides |
| achievements.html | 402 | `app/achievements/page.tsx` | Mirrors events.html scroll pattern; stats + story cards |
| join.html | 293 | `app/join/page.tsx` | 3-tab form: member / volunteer / corporate partner |
| resources.html | 314 | `app/resources/page.tsx` | 6 resource cards + external links + mentorship CTA |

No 404 page exists in source. Add `app/not-found.tsx` during Stage 1.

---

### CSS Files — Migration Decision Per File

#### MIGRATE → Tailwind + CSS Modules / globals.css

| File | Lines | Decision | Notes |
|------|-------|----------|-------|
| style.css | 2,449 | **Extract tokens → globals.css; replace rules with Tailwind** | Primary design system. All CSS vars migrate to `tailwind.config.ts`. |
| index.css | 1,434 | **Merge into homepage component + Tailwind** | Duplicate/conflicting tokens with style.css. Particle and parallax effects move to client component. |
| team.css | 384 | **Migrate to `app/team/` CSS module** | Card hover reveal logic reproduced as CSS flip card (Stage 4). |
| events.css | 187 | **Migrate to `app/events/` CSS module** | Minimal — mostly basic card grid. Timeline rebuilt from scratch in Stage 5. |
| achievements.css | 491 | **Migrate to `app/achievements/` CSS module** | Full-page scroll system to be replaced with scroll-snap or framer-motion. |
| join.css | 195 | **Migrate to `app/join/` CSS module** | Form tab toggle reproduced as React state. |
| feedback.css | 352 | **Migrate to `components/Feedback/` CSS module** | Floating modal; standalone component. |
| resources.css | — | **Migrate to `app/resources/` CSS module** | (file present in JS refs; styles embedded in style.css) |

#### DEAD CODE — DELETE, DO NOT MIGRATE

| File | Lines | Reason |
|------|-------|--------|
| community.css | 164 | No HTML page, no link reference, no product plan |
| forum.css | 103 | No HTML page, no link reference, no product plan |
| mentorship.css | 111 | No HTML page, no link reference, no product plan |
| volunteer.css | 124 | No HTML page, no link reference, no product plan |
| past_events.css | 205 | No HTML page, no link reference; superseded by unified events timeline |
| upcoming_events.css | 203 | No HTML page, no link reference; superseded by unified events timeline |

#### DEFERRED FEATURE CANDIDATE

**`success_stories.css` (150 lines)**
> **Implied layout:** A 2-column responsive grid of story cards, each with a circular avatar photo (80px, gold border), member name, company/position in gold, and a pull-quote with a left gold border stripe — plus a tag row of maroon pills (e.g. "Resume Help", "Mock Interviews"). A "Share Your Story" CTA section sits below the grid.
> **Recommendation:** This is a natural fit as a `/success-stories` route once GCN has enough alumni placement data to populate it. Flag for consideration in the next academic year. Do not build during this migration.

#### ABANDONED / NEVER WIRED — NOTE DESIGN INTENT, DO NOT MIGRATE AS-IS

**`loading-states.css` (155 lines)**
> Intended UX: A full-screen maroon splash screen (`body:not(.loaded)::before`) with a spinning gold border circle while the page hydrates, fading out once a `.loaded` class is added to `<body>`. Also included a fixed back-to-top button (gold circle, bottom-right, slides in on scroll) and staggered card entrance animations keyed to `.loaded`. The `index.js` comment `// CSS for loading states is now in loading-states.css` confirms this was extracted from inline JS but the `<link>` tag was never added to any HTML — abandoned mid-integration.
> **Design intent worth preserving in Next.js:** The back-to-top button and staggered card entrance animations are solid UX. Implement as proper Next.js client components rather than a CSS class toggle. The full-screen splash is less relevant post-Next.js (App Router handles hydration differently).

**`partners-carousel.css` (178 lines)**
> Intended UX: A different carousel DOM structure than what shipped. Classes `.partners-carousel-container`, `.partners-carousel-track`, `.partner-logo` with grayscale→color hover, a shimmer sweep animation, 3D `rotateY(5deg)` on hover, and a `::after` emoji link indicator (`🔗`). `carousel.js` queries `.partners-carousel-container` but the live HTML uses `.partner-logo-item` — the DOM and CSS never matched. Also included a second track with `animation-direction: reverse` for a dual-row effect.
> **Design intent worth preserving in Next.js:** The grayscale→color reveal on hover and the dual-direction infinite scroll rows are worth implementing in Stage 7 using the correct Next.js carousel structure.

---

### JavaScript Files — Migration Decision Per File

| File | Lines | Decision | Target |
|------|-------|----------|--------|
| main.js | 217 | **Decompose** | Navbar → `components/Navbar.tsx`; scroll reveal → `hooks/useReveal.ts`; stat counter → `components/StatCounter.tsx`; testimonials → `components/TestimonialSlider.tsx`; form tabs → React state in join page |
| index.js | 249 | **Decompose** | Counter animations → `StatCounter`; particles → optional ambient canvas component; testimonial carousel → `TestimonialSlider`; loading state management → irrelevant in Next.js |
| navigation.js | 293 | **Replace** | Full rewrite as `components/Navbar.tsx` (React state, no class-based DOM manipulation) |
| logo3d.js | 77 | **Replace** | Stage 3: react-three-fiber auto-rotating globe replaces this entirely |
| team.js | 276 | **Replace** | Data moves to `lib/data/team.ts`; rendering to `app/team/page.tsx` + `TeamCard` component |
| events.js | 185 | **Replace** | Full scroll-hijack system replaced with keyboard-navigable timeline (Stage 5) |
| achievements.js | 166 | **Replace** | Scroll system replaced; achievements page rebuilt with scroll-snap |
| carousel.js | 48 | **Replace** | Logic moves into `components/SponsorCarousel.tsx`; Netlify Forms removed |
| join.js | 44 | **Replace** | Fade-in → `useReveal`; form logic → React controlled form |
| feedback.js | 337 | **Evaluate at Stage 8+** | Netlify Forms + Cloudflare Worker integration — defer until deployment target confirmed |
| resources.js | 86 | **Replace** | Fade-in → `useReveal`; click tracking → simple analytics event |
| utils.js | 116 | **Keep patterns, rewrite** | `debounce`, `throttle`, device detection → `lib/utils.ts` with TypeScript |

---

## 2. Design Token Resolution

### Conflicting Red Values → Resolved to `#9e221a`

| Source | Variable | Old Value | New Value |
|--------|----------|-----------|-----------|
| style.css | `--red-primary` | `#C8102E` | `#9e221a` |
| style.css | `--red-dark` | `#9A0D22` | `#7a1814` (proportionally darkened) |
| style.css | `--red-light` | `#FFEBED` | `#fde8e7` (adjusted tint) |
| index.css | `--primary-color` | `#8C1D40` | `#9e221a` |
| index.css | `--secondary-color` | `#FFC627` | `#FFC627` (ASU Gold — keep) |
| events.css | `rgba(140,29,64,…)` | maroon shadows | → `rgba(158,34,26,…)` |

### Full Token Map → `tailwind.config.ts`

```ts
colors: {
  brand: {
    red:       '#9e221a',
    'red-dark':'#7a1814',
    'red-light':'#fde8e7',
    gold:      '#FFC627',
  },
  surface: {
    DEFAULT: '#F9FAFC',
    muted:   '#F5F7FA',
    card:    '#141416',
  },
  gray: {
    border:  '#E5E7EB',
    text:    '#4B5563',
    muted:   '#9CA3AF',
  },
}

fontFamily: {
  sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
}

borderRadius: {
  sm: '8px',
  md: '16px',
  lg: '24px',
}

boxShadow: {
  soft:  '0 18px 45px rgba(12,12,14,0.07)',
  hover: '0 26px 70px rgba(12,12,14,0.11)',
}

transitionTimingFunction: {
  fast:   'cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
  slow:   'cubic-bezier(0.16, 1, 0.3, 1)',
}
```

---

## 3. Data Layer Plan

### `lib/data/team.ts`
Source: `static/js/team.js` — `TEAM_DATA` object. 14 members.

**Fields to migrate (existing):** `name`, `role`, `department`, `photo`, `bio`, `hobby`, `linkedin`
**Fields to add (Stage 2):** `major` (string), `year` (string — e.g. `"Junior"`, `"Senior"`, `"Graduate"`), `linkedinUrl` (string, empty string with TODO where missing)

**Members with missing LinkedIn (2):**
- Kendra (Pham) Do — `linkedinUrl: "" // TODO: needs real link`
- Jennifer Phan — `linkedinUrl: "" // TODO: needs real link`

### `lib/data/events.ts`
Source: `static/events.html` — hardcoded slide HTML. 12 events total (8 past, 4 upcoming).

**Fields to migrate (existing):** `name`, `date`, `description`, `attendeeCount`, `location`, `time`, `icon`, `ctaLabel`
**Fields to add (Stage 2):** `status` (`'past' | 'upcoming' | 'tentative'`), `category` (string), `academicYear` (`'25-26' | '26-27'`), `registrationUrl` (empty string with TODO where unknown)

**Registration URLs (all unknown):** 4 upcoming events — all `registrationUrl: "" // TODO: needs real link`

### Zod Schemas
Both schemas validated with Zod at import time. Type errors will surface at build, not runtime.

---

## 4. Component Map

```
app/
├── layout.tsx                  ← shared Navbar + Footer + font provider
├── not-found.tsx               ← new (missing in source)
├── page.tsx                    ← homepage
│   sections:
│   ├── HeroSection             ← Globe3D (Stage 3) + headline + CTAs
│   ├── AboutSection            ← image + copy (next/image for home_page.png)
│   ├── WhySection              ← 4 feature cards
│   ├── StatsSection            ← StatCounter × 4
│   ├── TestimonialSlider       ← client component, auto-rotate
│   ├── SponsorCarousel         ← all logos, dual-row, grayscale→color (Stage 7)
│   └── CTASection
├── team/
│   └── page.tsx                ← OrgTree (Stage 4) + department grids
├── events/
│   └── page.tsx                ← YearToggle + Timeline (Stage 5)
├── achievements/
│   └── page.tsx               
├── join/
│   └── page.tsx                ← 3-tab form (React state)
└── resources/
    └── page.tsx

components/
├── Navbar.tsx                  ← client, mobile hamburger
├── Footer.tsx
├── Globe3D.tsx                 ← client, react-three-fiber (Stage 3)
├── TeamCard.tsx                ← client, CSS flip card (Stage 4)
├── OrgTree.tsx                 ← SVG connectors + TeamCard grid (Stage 4)
├── EventCard.tsx
├── TimelineItem.tsx            ← keyboard-nav (Stage 5)
├── SponsorCarousel.tsx         ← client, CSS animation (Stage 7)
├── StatCounter.tsx             ← client, IntersectionObserver counter
├── TestimonialSlider.tsx       ← client, auto-rotate
└── PhotoScroll.tsx             ← client, marquee (Stage 6)

lib/
├── data/
│   ├── team.ts                 ← Stage 2
│   └── events.ts               ← Stage 2
└── utils.ts                    ← debounce, throttle, device detection
```

---

## 5. Asset Inventory

### Images to Migrate

| Asset | Current Path | Size | Next.js Treatment |
|-------|-------------|------|-------------------|
| home_page.png | static/images/home_page.png | **4.1 MB** | `next/image` with `quality={80}` + WebP conversion (Stage 7) |
| gcn.png (favicon/logo) | static/gcn.png | small | Move to `public/` + `app/favicon.ico` |
| gcn-globe-mark.svg | static/images/gcn-globe-mark.svg | small | Keep as fallback; replaced by Globe3D in Stage 3 |
| 14 team photos | static/images/team/*.{jpg,jpeg,png} | varies | Move to `public/images/team/`; `next/image` in TeamCard |

### Sponsor Logos (14 total, only 8 in live carousel)

All 14 move to `public/images/sponsors/`. Stage 7 includes all of them.

| Logo | File | In Current Carousel |
|------|------|-------------------|
| Intel | intel.png | ✓ |
| Amazon | amazon.png | ✓ |
| NVIDIA | nvidia.png | ✓ |
| TSMC | tsmc.png | ✓ |
| Perplexity | perplexity.png | ✓ |
| Schwab | schwab.png | ✓ |
| PwC | pwc.png | ✓ |
| ACGGO | acggo.png | ✓ |
| Bain | bain.svg | ✗ — add in Stage 7 |
| JP Morgan Chase | jpmc.svg | ✗ — add in Stage 7 |
| Flex Tech | flex-tech.png | ✗ — add in Stage 7 |
| Forage | forage.png | ✗ — add in Stage 7 |
| Shamrock | shamrock.png | ✗ — add in Stage 7 |
| Product Hunt | product-hunt.png | ✗ — add in Stage 7 |

---

## 6. External Dependencies

| Dependency | Source Usage | Next.js Treatment |
|------------|-------------|-------------------|
| Font Awesome 6.4.0 | CDN `<link>` in all HTML heads | Replace with `lucide-react` or inline SVGs. FA CDN is a perf/reliability risk. |
| Plus Jakarta Sans | Google Fonts `@import` | `next/font/google` (Stage 1) |
| Google Fonts CDN | style.css line 5 | Removed — handled by next/font |
| Netlify Forms | feedback.js, join.js | Defer — evaluate at deployment stage; not relevant to Vercel target |
| Cloudflare Worker | feedback.js (`/api/feedback` endpoint) | Stage 8+ — requires credentials |

---

## 7. Accessibility Gaps to Fix During Migration

1. **Events keyboard nav** — scroll-hijack has no arrow key support → fixed in Stage 5 (non-negotiable).
2. **Team card `aria-expanded`** — flip reveal has no ARIA state → fixed in Stage 4.
3. **`#9CA3AF` on white** — ~2.9:1 contrast, fails WCAG AA → all muted text replaced with `#6B7280` minimum or darker.
4. **Missing `aria-label` on SponsorCarousel pause-on-hover** → add in Stage 7.
5. **No skip-to-content link** → add to `app/layout.tsx` in Stage 1.

---

## 8. Stage Execution Order

| Stage | Scope | Status |
|-------|-------|--------|
| 0 | Migration map (this file) | ✅ Complete |
| 1 | Next.js scaffold, Tailwind, design tokens, fonts | ⏳ Next |
| 2 | Data layer: team.ts, events.ts, Zod schemas | — |
| 3 | react-three-fiber globe hero | — |
| 4 | Org tree + CSS flip cards | — |
| 5 | Events timeline with year toggle + keyboard nav | — |
| 6 | Photo scroll marquee | — |
| 7 | All sponsor logos + image optimization | — |
| 8 | Cal.com booking — **STOP, awaiting credentials** | — |
| 9 | CareerLink/goingLOBAL research — **STOP after writing** | — |
