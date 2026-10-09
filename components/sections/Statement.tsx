"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useReveal } from "@/components/motion/useReveal";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./Statement.module.css";

const DURATION = 6000;

/**
 * Left: facts that rotate on a timer bar (pauses on hover/focus or with the
 * button; never auto-rotates for reduced-motion visitors).
 * Right: the manifesto, read word by word, signed by the founder.
 */
export function Statement({ stackUnder = false }: { stackUnder?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [auto, setAuto] = useState(false);
  useReveal(root);

  useEffect(() => setAuto(!prefersReducedMotion()), []);

  // When the next panel rises over this section, pin it by its bottom edge
  // (top = viewport − own height) so nothing of it is hidden before it's read.
  useEffect(() => {
    const el = root.current;
    if (!stackUnder || !el) return;
    const place = () => (el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`);
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    window.addEventListener("resize", place);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [stackUnder]);

  const n = site.stats.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const running = auto && !paused && !held;
  const stat = site.stats[i];
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section
      ref={root}
      className={`${styles.section} ${stackUnder ? styles.stack : ""}`}
      id="why"
      aria-labelledby="statement-title"
    >
      <h2 id="statement-title" className="sr-only">Why AURA</h2>
      <div className={styles.grid}>
        <aside
          className={styles.left}
          aria-label="Studio facts"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
        >
          <div className={styles.track} aria-hidden="true">
            {auto && (
              <span
                key={i}
                className={styles.bar}
                style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? "running" : "paused" }}
                onAnimationEnd={() => go(1)}
              />
            )}
          </div>
          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Previous fact">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next fact">
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className={styles.counterWrap}>
              {auto && (
                <button
                  type="button"
                  className={styles.pause}
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Resume rotating facts" : "Pause rotating facts"}
                >
                  {paused ? "Play" : "Pause"}
                </button>
              )}
              <span className={`t-meta ${styles.counter}`}>
                {pad(i + 1)}/{pad(n)}
              </span>
            </div>
          </div>
          <div className={styles.stat} key={stat.value}>
            <p className={styles.value}>{stat.value}</p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        </aside>

        <div className={styles.right}>
          <p className={styles.manifesto} data-anim="words">
            Most companies spend years building exceptional products, strong teams and meaningful businesses. Yet
            their digital presence often tells a smaller story. That gap costs trust, perceived value and
            opportunities. My work is to align what people see with what you&rsquo;ve actually built.
          </p>
          <div className={styles.founder} data-anim="fade">
            <span className={`serif ${styles.avatar}`} aria-hidden="true">AM</span>
            <span>
              <span className={styles.name}>{site.founder}</span>
              <span className={styles.role}>Founder, AURA</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
