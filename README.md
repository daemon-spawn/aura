# AURA — byaura.co.za (v2: merged build)

Next.js 16 · TypeScript · GSAP (ScrollTrigger, SplitText) · Lenis.
Strategy, sitemap, design tokens and interaction rules are in **STRATEGY.md** — read that first.

v2 builds on the original `aura-premium-site` foundation. Kept from it: the folder layout
(`app/`, `components/{sections,motion,ui}`, `styles/`), the skewed surface plane and travelling
horizon line in the hero, the asymmetric work composition with material-toned plates, the
contour statement band, the surface-coloured process band, mono labels and rectangular buttons.
Replaced: the provisional construction copy (AURA is a web studio) with verified AURA content,
the single page with a full sitemap, the deprecated `@studio-freight/lenis` with `lenis`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                      routes (App Router) + sitemap, robots, OG image, icons
  api/enquiry/            discovery-call form endpoint
content/                  ALL copy — site, projects, services, process, faq
components/
  brand/                  Wordmark, PeakMark (Λ), Chevron (Λ arrow)
  sections/               one file per section (Navigation, Hero, Introduction,
                          WorkShowcase, Services, Process, MaterialStatement,
                          FaqSection, Contact, Footer, PageIntro, WorkList, …)
    case/                 case-study sections
  motion/                 ALL motion: SmoothScroll (Lenis ↔ GSAP), Reveal,
                          useReveal, HeroMotion, animations/* (lines, fade,
                          rule, words, peak, parallax)
  ui/                     Button, SectionIntro, Plate, Accordion
  Analytics.tsx
lib/                      gsap registration, analytics, enquiry validation
styles/globals.css        tokens, grid, type roles, motion gate
```

### How motion works
Sections are plain (mostly server) components. Elements opt in with attributes:

```tsx
<h2 data-anim="lines">…</h2>             // masked line reveal on scroll
<p data-anim="fade" data-anim-delay="0.1">  // fade-up
<hr className="rule" data-anim="rule" />    // hairline draws in
<p data-anim="words">…</p>                  // scroll-scrubbed reading (use once)
data-anim-immediate                         // play on load (above the fold)
```

The nearest `<Reveal>` wrapper runs `useReveal`, which calls the modules in `components/motion/animations/`. Tune timing site-wide in `components/motion/animations/config.ts`. Visitors with *reduce motion* get final states immediately and native scrolling.

**Why no Locomotive Scroll (also the original build's conclusion):** Locomotive v5 is a wrapper around Lenis. Running both means two scroll engines fighting over the same page; Lenis + ScrollTrigger covers everything Locomotive would add here.

## Editing content
- **Projects:** `content/projects.ts`. Add screenshots to `public/work/<slug>/` and set:
  ```ts
  cover: { src: "/work/kane-solutions/cover.webp", alt: "Kane Solutions homepage" },
  gallery: [{ src: "/work/kane-solutions/01.webp", alt: "…" }],
  ```
  With a `cover`, lists show the real screen and the case-study page shows it full width.
- **FAQ / pricing:** `content/faq.ts` (items with `key: true` also show on Home and Contact).
- **Email, URL, CTA:** `content/site.ts`.

## Before launch — things to confirm
1. **Pricing answer** in `faq.ts` (marked `CONFIRM`) — replace with your own copy.
2. **Public email** in `site.ts` — currently your billing Gmail.
3. **Client screenshots** for each project.
4. **Env vars** (see `.env.example`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` (a sender on a domain verified in Resend).
   Without Resend the form doesn't pretend to send — it offers the visitor a pre-filled email instead.

## Fonts
- **Satoshi** loads from Fontshare (`layout.tsx`). To self-host: download the woff2 files from fontshare.com, put them in `fonts/`, and swap the `<link>` for `next/font/local` with `variable: "--font-sans"`.
- **Lora** (italic, editorial phrases only) is self-hosted via `@fontsource-variable/lora`.
- **DM Mono** (labels, indices, metadata — kept from the original build) is self-hosted via `@fontsource/dm-mono`.

## Analytics events
`book_call_click` (any CTA to /contact), `enquiry_attempt`, `enquiry_submit`. Add `data-track="name"` to any element to track it.
