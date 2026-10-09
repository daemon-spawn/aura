# AURA v4 — Layout: MONOLOG, in AURA's colours, logo and voice

Decision: the home page follows **bymonolog.com**'s layout section by section (your stated
direction for the rebuild). The source for each section is the set of MONOLOG screenshots you
shared when AURA was first designed, plus the live site's structure.
Kept from earlier versions: **Satoshi · Lora · DM Mono**, the **navbar** (now About · Work⁰⁴ ·
Services · Process), palette, form, SEO, analytics, content files.
Site-wide: an animated TV texture (grain flicker, faint scanlines, a slow rolling band) —
`components/motion/TvNoise.tsx`, frozen under reduced motion. Arrows are a plain ↗ in a small
square inside buttons (`components/brand/Arrow.tsx`). `/studio` is now `/about` (308 redirect).

| # | MONOLOG section | AURA version | Component |
|---|---|---|---|
| 1 | **Current hero (v5):** left third is a pinned panel with the logo as a faint giant pattern, a short paragraph + call button at the top, and a positioning label at the base; right two-thirds is a very large bold headline, then a full-width image with dated "client wins" cards | Pinned panel with AURA's letterforms as the pattern; paragraph + *Book a discovery call*; "(Digital presence for ambitious companies)"; headline *Websites and systems that match what you've built*; image/film slot with two loader-style client wins (`site.heroWins`) — Big Bee Logistics, then Kane Solutions with its solar drone film (`heroVideo`) | `Hero` |
| 3 | Statement (now after the brands row; pinned while the gap panel rises over it): narrow left panel with a timer bar over ← → arrows and a 01/02 counter cycling stats; right, a large manifesto revealed word by word; founder card | Facts that are true (04 businesses · 1 person); Brand Foundation narrative in first person; *Andrew Mncube, Founder, AURA* | `Statement` |
| 2 | Brands row directly under the hero image: dot label left, centred marks divided by hairlines | "Brands I've helped" + the four clients as wordmarks (no logo files supplied) | `Clients` |
| 4 | Page rises from the bottom over the clients; centred image grows with scroll and changes on a timer; words come in from left and right | "I close" / "that gap" (Brand Foundation: *AURA closes that gap*); the frame cycles the four projects and the caption names each one. No testimonial — none exists yet | `GapReveal`, `GapSlideshow` |
| 5 | Success stories on a light ground: label · large media · counter `SS ← 01/05`, name, description, tags, headline result, *View case study* | Same structure; results are honest outcomes (*3 ways*, *Monthly*, *Since 2015*, *Back online*). Hover plays a screen recording once `video` is set | `SuccessStories`, `StoryMedia` |
| 6 | "What we can help with" — six image cards | "What I can help with" — six capability cards from the Brand Foundation | `HelpCards` |
| 7 | Project process — three steps | Brand Foundation's three steps + real comms (Notion, check-ins, Loom) | `Process` |
| 8 | FAQ "Here's what you need to consider…", pricing in the last answer | Same; investment (R25,000+, most R35,000–R120,000+) is the last answer | `FaqSection` |
| 9 | Founder card "Would like to know if we'd be a good fit?" + large stacked question + button | "Want to know if we'd be a good fit? Book a call with Andrew" + *Ready for a presence that matches what you've built?* | `Contact` |
| 10 | Footer: links, details, local time, back to top, tagline | Same; tagline *Presence shapes perception.* | `Footer` |

Left out because AURA doesn't have it yet (never invented): logo files, awards, stats bands,
testimonials, client quotes.

## To make it fully MONOLOG-grade
- **Success-story devices** (`StoryMedia`, `components/ui/LaptopPlayer.tsx`, `PhoneScroll.tsx`):
  a project with `video` (2:1 desktop recording + poster in `/public/work/<slug>/`) sits on a laptop
  that plays on hover, or in view on touch screens; a project with only `screen` (a full-length
  mobile capture) sits on a phone that scrolls. Case studies get a looping "The live site" block
  (laptop and phone together when both exist). Recordings were cropped to the page viewport
  (browser chrome and taskbar removed) and re-encoded to 1280×640 MP4 + WebM, no audio.
- **Home stories** are chosen in `site.homeStories`; the work page shows every project.
- **Hero slides** → which projects appear is `site.heroWins`. Each slide shows the project's
  `heroVideo` (muted loop, plays only while its card is loading), else `screen` (a full-length
  mobile capture scrolled inside a phone, in step with the card — `components/ui/PhoneScroll.tsx`),
  else `cover`, else the client's mark. Projects with `screen` also get a looping "The live site"
  block on their case study. Kane uses `/public/work/kane-solutions/hero.{webm,mp4}` + `hero-poster.jpg`.
- **Client logos for the win cards** → replace the BH / KS monogram tiles.
- **Project photography/screens** → set `cover`; replaces the material plates everywhere.
- **Founder photo** → set `site.portrait`; replaces the "AM" monogram in the statement and CTA.
- **Client logos** (SVG) → can replace the typographic names in `Clients`.
- **A client quote** → can sit under the gap frame, as on MONOLOG.
