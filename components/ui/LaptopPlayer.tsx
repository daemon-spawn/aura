"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./LaptopPlayer.module.css";

type Props = {
  video: NonNullable<Project["video"]>;
  alt: string;
  /** Plays while true (restarting from the top each time). Leave undefined to play whenever it's on screen. */
  playing?: boolean;
  /** Restart from the beginning each time playback starts. */
  restart?: boolean;
  className?: string;
};

/**
 * A laptop with a client's site on its screen: the poster frame at rest, the
 * screen recording while playing. Reduced-motion visitors keep the poster.
 */
export function LaptopPlayer({ video, alt, playing, restart = true, className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const el = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(true);
  const on = !still && (playing === undefined ? inView : playing);

  useEffect(() => setStill(prefersReducedMotion()), []);

  useEffect(() => {
    if (playing !== undefined || !host.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(host.current);
    return () => io.disconnect();
  }, [playing]);

  useEffect(() => {
    const v = el.current;
    if (!v) return;
    if (on) {
      if (restart) v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [on, restart]);

  return (
    <div
      ref={host}
      className={`${styles.laptop} ${on ? styles.playing : ""} ${className ?? ""}`}
      data-laptop={playing === undefined ? "view" : "controlled"}
    >
      <div className={styles.lid}>
        <div className={styles.screen}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.poster} alt={alt} className={styles.poster} loading="lazy" />
          <video
            ref={el}
            className={styles.video}
            muted
            loop
            playsInline
            preload="none"
            poster={video.poster}
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
          >
            {video.webm && <source src={video.webm} type="video/webm" />}
            <source src={video.src} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className={styles.base} aria-hidden="true" />
    </div>
  );
}
