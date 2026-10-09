"use client";

import { useEffect, useRef } from "react";
import { featuredClients } from "@/content/featured";
import { clients, clientLogo } from "@/content/clients";
import { getProject } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { MorphButton } from "@/components/ui/MorphButton";
import styles from "./FeaturedClients.module.css";

/**
 * Featured clients — Dash Digital's section, in AURA's paper tones: a large
 * uppercase title, then four open columns (no boxes) — the client's mark, one
 * paragraph on the work, and a small case-study pill that opens on hover.
 * Below desktop the columns become a row you can drag or swipe.
 */
export function FeaturedClients() {
  const track = useRef<HTMLDivElement>(null);

  const cards = featuredClients
    .map((f) => {
      const c = clients.find((x) => x.id === f.client);
      const p = c?.project ? getProject(c.project) : undefined;
      return c && p ? { ...f, c, p } : null;
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    // Mouse drag-to-scroll (touch and trackpads scroll natively).
    let down = false;
    let moved = false;
    let x0 = 0;
    let s0 = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.classList.add(styles.dragging);
      }
      if (moved) el.scrollLeft = s0 - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove(styles.dragging);
      if (moved) {
        // Settle on the nearest card.
        const items = Array.from(el.children) as HTMLElement[];
        const base = items[0].offsetLeft;
        const target = items.reduce((best, it) =>
          Math.abs(it.offsetLeft - base - el.scrollLeft) < Math.abs(best.offsetLeft - base - el.scrollLeft) ? it : best,
        );
        el.scrollTo({ left: target.offsetLeft - base, behavior: "smooth" });
      }
    };
    // A drag must not also click the card's link.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <Reveal as="section" className={`section paper ${styles.section}`} id="clients-featured" aria-labelledby="featured-title">
      <div className="container">
        <h2 id="featured-title" className={styles.title} data-anim="lines">
          Featured clients
        </h2>
      </div>

      <div
        ref={track}
        className={styles.track}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured clients"
        tabIndex={0}
        data-featured-track
      >
        {cards.map(({ c, p, text, quote }, i) => (
          <article
            key={c.id}
            className={styles.card}
            aria-label={c.name}
            data-anim="fade"
            data-anim-delay={String(Math.min(i, 3) * 0.08)}
          >
            <div className={styles.logoWrap}>
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={clientLogo(c.id, "ink")}
                  alt={c.name}
                  width={c.logo.w}
                  height={c.logo.h}
                  className={styles.logo}
                  // Equal visual weight: same area for every mark, capped for tall badges.
                  style={{ height: `${Math.min(Math.sqrt((17 * c.logo.h) / c.logo.w), 3.2)}rem` }}
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <span className={styles.wordmark}>{c.name}</span>
              )}
            </div>
            <div className={styles.cardInner}>
              {quote && (
                <blockquote className={styles.quote}>
                  <p>&ldquo;{quote.text}&rdquo;</p>
                  <footer className="t-meta">
                    {quote.name}
                    {quote.role ? `, ${quote.role}` : ""}
                  </footer>
                </blockquote>
              )}
              <p className={styles.paragraph}>{text}</p>
              <MorphButton href={`/work/${p.slug}`} label="View case study" hoverLabel={`Read about ${p.name}`} size="sm" />
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
