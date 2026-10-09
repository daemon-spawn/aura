"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { clientFor, clientLogo } from "@/content/clients";
import { prefersReducedMotion } from "@/lib/gsap";
import { PhoneScroll } from "@/components/ui/PhoneScroll";
import styles from "./Hero.module.css";

const DURATION = 6500;

/**
 * Hero image + "client wins" as loaders (MONOLOG pattern): the active card
 * fills bottom → top while the image shows that project; when the fill
 * reaches the top, the next card takes over and the image changes with it.
 * Hover or focus pauses; reduced-motion visitors get a still first card.
 */
export function HeroWins({ wins }: { wins: Project[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [auto, setAuto] = useState(false);
  useEffect(() => setAuto(!prefersReducedMotion() && wins.length > 1), [wins.length]);

  return (
    <figure
      className={styles.media}
      data-anim="fade"
      data-anim-immediate
      data-anim-delay="0.55"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className={styles.slides}>
        {wins.map((p, i) => {
          const client = clientFor(p.slug);
          return (
            <div key={p.slug} className={`${styles.slide} ${i === active ? styles.slideOn : ""}`} aria-hidden={i !== active}>
              {p.heroVideo ? (
                <HeroFilm film={p.heroVideo} active={i === active} label={`${p.name} — ${p.sector}`} />
              ) : p.screen ? (
                <div className={styles.device}>
                  {p.screen.backdrop && (
                    <img src={p.screen.backdrop} alt="" className={styles.deviceBackdrop} loading={i === 0 ? "eager" : "lazy"} />
                  )}
                  <PhoneScroll
                    screen={p.screen}
                    playing={i === active && auto}
                    paused={held}
                    duration={DURATION}
                    eager={i === 0}
                    className={styles.devicePhone}
                  />
                  <span className={styles.posterCap}>{p.url ?? p.name}</span>
                </div>
              ) : p.cover ? (
                <Image src={p.cover.src} alt={p.cover.alt} fill priority={i === 0} sizes="(min-width: 900px) 66vw, 100vw" className={styles.img} />
              ) : (
                <div className={styles.poster} data-tone={i % 3}>
                  {client?.logo && (
                    <img src={clientLogo(client.id)} alt="" className={styles.posterLogo} loading={i === 0 ? "eager" : "lazy"} />
                  )}
                  <span className={styles.posterCap}>
                    {p.name} — {p.code}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ul className={styles.wins} aria-label="Client wins">
        {wins.map((p, i) => {
          const client = clientFor(p.slug);
          const on = i === active;
          return (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className={`${styles.win} ${on ? styles.winOn : ""} ${on && !auto ? styles.winFull : ""}`}
                aria-current={on ? "true" : undefined}
              >
                <span
                  key={`${p.slug}-${on ? active : "off"}`}
                  className={styles.fill}
                  aria-hidden="true"
                  style={
                    on && auto
                      ? { animationDuration: `${DURATION}ms`, animationPlayState: held ? "paused" : "running" }
                      : undefined
                  }
                  onAnimationEnd={() => setActive((v) => (v + 1) % wins.length)}
                />
                <span className={styles.tile} aria-hidden="true">
                  {client?.logo ? (
                    <img src={clientLogo(client.id, client.tile ? "tile" : "color")} alt="" className={styles.tileLogo} />
                  ) : (
                    p.initials
                  )}
                </span>
                <span className={styles.winText}>
                  <span className={styles.winLine}>{p.win}</span>
                  <span className={styles.winMeta}>Client wins · {p.date}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

/**
 * A muted looping film for one slide. It plays only while its slide is the
 * active one and the hero is on screen, restarting each time the slide comes
 * round. Reduced-motion visitors see the poster frame instead.
 */
function HeroFilm({
  film,
  active,
  label,
}: {
  film: NonNullable<Project["heroVideo"]>;
  active: boolean;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(true);

  useEffect(() => setStill(prefersReducedMotion()), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    if (active && visible) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active, visible, still]);

  // Each time the slide comes round, start the film from the top.
  useEffect(() => {
    const el = ref.current;
    if (el && active && !still) el.currentTime = 0;
  }, [active, still]);

  return (
    <video
      ref={ref}
      className={styles.film}
      poster={film.poster}
      muted
      loop
      playsInline
      preload={active ? "auto" : "metadata"}
      aria-label={label}
      disablePictureInPicture
    >
      {film.webm && <source src={film.webm} type="video/webm" />}
      <source src={film.src} type="video/mp4" />
    </video>
  );
}
