# AURA — Site Strategy & Design System

Governing framework: *The Premium Website Engineering Manual* (Editions 01–05).
This file is the set of intermediate artefacts the manual requires before code
(strategy → architecture → wireframe → visual system → conversion → ownership → launch).

---

## 1. Strategy gate

| Field | Decision |
|---|---|
| **Business result** | Booked discovery calls. AURA's bottleneck is demand — every client so far came through referral. The site has to turn a referral or a cold visit into a conversation. |
| **One-sentence test** | *The primary thing we want a visitor to do is book a discovery call.* |
| **Primary visitor** | Owner of an established South African business whose website (and often the admin behind it) hasn't caught up with the business itself. Usually arrives from a referral, already half-trusting. |
| **What they already know** | Roughly what they want ("a proper website", "something to replace the spreadsheet"). Not what it costs, how the process works, or whether one person can deliver it. |
| **Visitor job** | Decide whether Andrew is credible and whether it's worth a call. |
| **Differentiator** | One person who designs *and* engineers — websites and the software behind them — and stays on to run them. Real systems shipped (fees management, invoicing + bank reconciliation), not just marketing pages. |
| **Objections** | Cost · "it's just one person" · will I be able to update it · what happens after launch · is this for businesses like mine. |
| **Proof (approved, real)** | KRDF ProSuite · Bee-Hill College · Mazhwetu General Works · Kane Solutions. No testimonials exist yet → none are shown. |
| **Primary CTA** | **Book a discovery call** → `/contact` (same destination everywhere). |
| **Secondary route** | See the work → `/work`. |
| **Voice** | First person (Andrew). Direct, warm, plain. No agency "we". |
| **Buyer risk** | Medium–high (R25k+ decision, multi-week project) → pages carry process, scope and pricing detail rather than hiding behind minimalism (Ed. 03 §05). |

### Unknowns (deliberately not invented)
- Client screenshots → case-study plates are typographic until images are dropped into `/public/work/<slug>/`.
- Testimonials / quotes → none shown.
- Pricing copy → FAQ uses figures from an earlier AURA page draft; marked `CONFIRM` in `content/faq.ts`.
- Public contact email, phone/WhatsApp → set in `content/site.ts`.

## 2. Architecture gate

```
/                 Home        — orient, prove, explain, handle objections, convert
/work             Work index  — all proof in one scannable list
/work/[slug]      Case study  — situation → what I built → key decisions → status
/services         Services    — three offers, what's included, full FAQ (pricing lives here)
/studio           Studio      — who's behind AURA, how I work, principles, stack
/contact          Contact     — discovery-call request form + direct email + what happens next
```
Navigation: Work · Services · Studio · [Book a call]. Footer repeats all routes + email + final CTA.
Internal links: every case study links to the next case + Contact; every service links to its proof.

## 3. Wireframe gate (Home)

| # | Section | Job |
|---|---|---|
| 1 | Hero | What / who / why + primary CTA. Λ mark draws once — identity, not spectacle. |
| 2 | Selected work | Proof immediately after the claim. |
| 3 | Statement | The problem in the client's terms (scroll-scrubbed reading, one per site). |
| 4 | What I build | Three offers, each linked to proof. |
| 5 | How I work | Process removes the "what happens next" fear. |
| 6 | Questions | Price, solo-studio, editability — objections before the ask. |
| 7 | Closing CTA | Natural conclusion. |

## 4. Visual system

**Colour** (60/30/10 → black / graphite+grays / off-white)

| Token | Value | Job |
|---|---|---|
| `--bg` | `#0A0A0A` | Warm matte black base |
| `--surface` | `#141414` | Lifted surface (plates, inputs, menu) |
| `--surface-2` | `#1C1C1B` | Hover surface |
| `--graphite` | `#2A2A28` | Large quiet shapes |
| `--steel` | `#8E8D88` | Meta text (≥ 5.9:1 on bg) |
| `--gray` | `#B4B2AC` | Secondary text (≥ 9:1 on bg) |
| `--ink` | `#EEECE7` | Primary text + the only "accent": primary actions |
| `--line` | `rgba(238,236,231,.10)` | Hairlines |

**Type** — 3 families, each with one job. Satoshi (Fontshare) = display/body/UI. Lora (self-hosted) = italic editorial moments only (one phrase per heading max). DM Mono (self-hosted, from the original build) = labels, indices, metadata.
Roles: Display · H2 · H3 · Lead · Body · Meta (uppercase, +0.14em) · Action. Fluid `clamp()` scale in `globals.css`.

**Grid** — 12 col, fluid margin `clamp(1.25rem, 4vw, 3.5rem)`. Two power lines repeat on every page: the content edge, and the start of column 5 (where body copy and lists align).

**Brand device** — the Λ peak. Drawn once in the hero; rotated 90° it becomes the chevron in every CTA; used as the list marker. Nothing else is decorative.

**Imagery** — no stock. Projects show the client's real screens when supplied; until then, an art-directed typographic plate (index numeral, sector, spec lines).

## 5. Interaction language

| Motion | Use |
|---|---|
| Line mask reveal | Headings, once on enter |
| Fade-up 16px | Body, meta, cards |
| Hairline draw (scaleX) | Section rules |
| Peak stroke draw | Hero mark, once |
| Scroll-scrubbed word opacity | The single home statement |
| Row dim + cursor plate | Work list, pointer devices only |
| Lenis smooth scroll | Global, disabled under reduced motion |

No preloader, no scroll hijacking, no page-transition delay. `prefers-reduced-motion` → final states rendered immediately.

## 6. Conversion gate

| CTA | Proof before it | Objection handled | Destination |
|---|---|---|---|
| Hero "Book a discovery call" | Positioning + location | "Is this for me" | `/contact` |
| After FAQ | Work + process + pricing | Cost, solo, ownership | `/contact` |
| Case study end | That case | "Can he do mine" | `/contact` |
| Header button | — | Always reachable | `/contact` |

## 7. Ownership & launch gates
- All copy lives in `content/*` — edit text, projects, FAQ without touching components.
- Adding a project = one object in `content/projects.ts` (+ optional images).
- Enquiries: `/api/enquiry` → Resend if `RESEND_API_KEY` set; otherwise the form falls back to a pre-filled email so no lead is lost.
- SEO: per-page metadata, canonical, OG image, `sitemap.xml`, `robots.txt`, `ProfessionalService` JSON-LD.
- Analytics: GA4 via `NEXT_PUBLIC_GA_ID`; events `book_call_click`, `enquiry_submit`.
