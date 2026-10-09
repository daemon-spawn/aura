"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { serviceList } from "@/content/services";
import { getProject } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/brand/Arrow";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./ServiceList.module.css";

const LINE_MS = 750;
const LINE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/**
 * "What I can help with" — Dash Digital's client list, used for services.
 * Each row: name · what it covers · More + / Less —, opening in place.
 * Under every row sits a faint hairline with a bright line inside it: hover
 * the row and the bright line loads across it left → right; leave and it
 * carries on out to the right. An open row keeps its line full.
 */
export function ServiceList({ id = "services" }: { id?: string }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const anims = useRef<(Animation | null)[]>([]);

  /** Slide the bright line in from the left, or out to the right. */
  const sweep = (i: number, dir: "in" | "out") => {
    const el = lines.current[i];
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.transform = dir === "in" ? "translateX(0)" : "translateX(-101%)";
      return;
    }
    const now = getComputedStyle(el).transform;
    anims.current[i]?.cancel();
    const from = dir === "in" ? (now.startsWith("matrix") && el.dataset.at === "in" ? now : "translateX(-101%)") : now;
    const to = dir === "in" ? "translateX(0)" : "translateX(101%)";
    const a = el.animate([{ transform: from }, { transform: to }], { duration: LINE_MS, easing: LINE_EASE, fill: "forwards" });
    el.dataset.at = dir;
    a.onfinish = () => {
      // Park out-of-sight on the left so the next hover starts from there.
      if (dir === "out") {
        a.cancel();
        el.style.transform = "translateX(-101%)";
      }
    };
    anims.current[i] = a;
  };

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <Reveal as="section" className={`section ${styles.section}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label} data-anim="fade">
            <span className={styles.dot} aria-hidden="true" />
            Services
          </p>
          <h2 id={`${id}-title`} className={styles.title} data-anim="lines">
            What I can help with
          </h2>
        </header>

        <ol className={styles.list}>
          {serviceList.map((s, i) => {
            const isOpen = open.has(i);
            const panelId = `${id}-panel-${i}`;
            const proof = s.proof.map(getProject).filter((p): p is NonNullable<typeof p> => Boolean(p));
            const delay = String((i % 5) * 0.06);
            return (
              <li
                key={s.title}
                className={styles.row}
                data-sound
                data-open={isOpen ? "true" : "false"}
                onMouseEnter={() => sweep(i, "in")}
                onMouseLeave={() => {
                  if (!open.has(i)) sweep(i, "out");
                }}
              >
                <h3 className={styles.heading}>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={(e) => {
                      const hovered = e.currentTarget.closest("li")?.matches(":hover");
                      // Opening fills the line; closing with the pointer elsewhere (keyboard, touch) lets it run out.
                      if (!isOpen) sweep(i, "in");
                      else if (!hovered) sweep(i, "out");
                      toggle(i);
                    }}
                    data-service-toggle
                  >
                    <span className={styles.nameMask}>
                      <span className={styles.name} data-anim="fade" data-anim-delay={delay}>
                        {s.title}
                      </span>
                    </span>
                    <span className={styles.parts} data-anim="fade" data-anim-delay={String(0.08 + (i % 5) * 0.06)}>
                      {s.parts.join(" - ")}
                    </span>
                    <span className={styles.more} data-anim="fade" data-anim-delay={String(0.12 + (i % 5) * 0.06)}>
                      <span className={styles.moreTrack} aria-hidden="true">
                        <span>More +</span>
                        <span>Less —</span>
                      </span>
                      <span className="sr-only">
                        {isOpen ? "Show less" : "Show more"} about {s.title}
                      </span>
                    </span>
                  </button>
                </h3>

                <div id={panelId} className={styles.panel} role="region" aria-label={s.title} inert={!isOpen}>
                  <div className={styles.panelInner}>
                    <p className={styles.partsMobile}>{s.parts.join(" - ")}</p>
                    <p className={styles.body}>{s.body}</p>
                    <div className={styles.links}>
                      {proof.length > 0 && (
                        <p className={styles.proof}>
                          <span className="t-meta">Proven in</span>
                          {proof.map((p) => (
                            <Link key={p.slug} href={`/work/${p.slug}`} className={styles.proofLink}>
                              {p.name}
                            </Link>
                          ))}
                        </p>
                      )}
                      <Link href={`/services#${s.line}`} className={styles.see}>
                        How I work on this <Arrow />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Faint hairline (draws in on scroll) with the bright loading line inside it */}
                <span className={styles.lineMask} aria-hidden="true">
                  <span className={styles.lineLite} data-anim="rule" data-anim-delay={delay}>
                    <span
                      className={styles.lineDark}
                      ref={(el) => {
                        lines.current[i] = el;
                      }}
                      data-service-line
                    />
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Reveal>
  );
}
