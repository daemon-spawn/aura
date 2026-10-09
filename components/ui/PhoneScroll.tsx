"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectScreen } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./PhoneScroll.module.css";

/** Phone screen proportions (CSS px, iPhone-class): 390 × 845. */
const SCREEN_RATIO = 845 / 390;
/** Status-bar height as a share of screen width (matches .page margin-top). */
const STATUS = 0.13;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/**
 * Builds a "someone scrolling the site" timeline: hold on a section, glide to
 * the next, hold again. Offsets are spread so holds weigh 1 and glides 0.9.
 */
function timeline(screen: ProjectScreen, loop: boolean): Keyframe[] {
  const max = screen.h - screen.w * (SCREEN_RATIO - STATUS);
  const ys = screen.stops.map((s) => Math.min(Math.max(s, 0), max));
  if (loop) ys.push(0);
  const pct = (y: number) => `translateY(${(-100 * y) / screen.h}%)`;
  const HOLD = 1;
  const MOVE = 0.9;
  const total = (loop ? ys.length - 1 : ys.length) * HOLD + (ys.length - 1) * MOVE;
  const frames: Keyframe[] = [];
  let t = 0;
  ys.forEach((y, i) => {
    frames.push({ offset: t / total, transform: pct(y), easing: "linear" });
    const last = i === ys.length - 1;
    if (!(loop && last)) {
      t += HOLD;
      frames.push({ offset: Math.min(t / total, 1), transform: pct(y), easing: last ? "linear" : EASE });
    }
    if (!last) t += MOVE;
  });
  frames[frames.length - 1].offset = 1;
  return frames;
}

type Props = {
  screen: ProjectScreen;
  /**
   * Scroll runs while true. Without `loop` it resets to the top when it turns
   * false (hero); with `loop` it pauses in place (hover previews). Leave it
   * undefined with `loop` to run whenever the phone is on screen (case study).
   */
  playing?: boolean;
  /** Freeze in place (e.g. while a hero card is hovered). */
  paused?: boolean;
  /** Length of one pass, in ms. */
  duration: number;
  /** Loop the pass (back to the top at the end) instead of holding at the bottom. */
  loop?: boolean;
  eager?: boolean;
  className?: string;
};

/**
 * A phone, drawn in the AURA palette, with a client's real mobile page
 * scrolling inside it. Reduced-motion visitors see the top of the page.
 */
export function PhoneScroll({ screen, playing, paused = false, duration, loop = false, eager, className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLImageElement>(null);
  const anim = useRef<Animation | null>(null);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(true);

  useEffect(() => setStill(prefersReducedMotion()), []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mode = !loop ? "hero" : playing === undefined ? "loop" : "hover";
  const run = !still && (playing === undefined ? inView : playing);

  useEffect(() => {
    const img = page.current;
    if (!img) return;
    if (!run && mode === "hover") {
      anim.current?.pause();
      return;
    }
    if (!run) {
      // Let the slide fade out on the frame it ended on, then reset to the top.
      const id = window.setTimeout(() => {
        anim.current?.cancel();
        anim.current = null;
      }, loop ? 0 : 1000);
      return () => window.clearTimeout(id);
    }
    if (anim.current && anim.current.playState === "finished") {
      anim.current.cancel();
      anim.current = null;
    }
    if (anim.current && anim.current.playState === "paused" && !paused) {
      anim.current.play();
    }
    if (!anim.current) {
      anim.current = img.animate(timeline(screen, loop), {
        duration,
        iterations: loop ? Infinity : 1,
        fill: "forwards",
      });
    }
  }, [run, screen, loop, duration, mode, paused]);

  // Hero: keep the phone in step with its loader card — pause only while the card is held.
  useEffect(() => {
    const a = anim.current;
    if (!a) return;
    if (paused) a.pause();
    else if (a.playState === "paused") a.play();
  }, [paused, run]);

  useEffect(() => () => anim.current?.cancel(), []);

  return (
    <div
      ref={host}
      className={`${styles.phone} ${className ?? ""}`}
      data-phone={mode}
      data-stops={screen.stops.join(",")}
      data-w={screen.w}
      data-h={screen.h}
      data-duration={duration}
    >
      <div className={styles.screen}>
        {/* eslint-disable-next-line @next/next/no-img-element -- tall capture; next/image adds nothing here */}
        <img
          ref={page}
          src={screen.src}
          alt={screen.alt}
          width={screen.w}
          height={screen.h}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={styles.page}
        />
        <span className={styles.island} aria-hidden="true" />
      </div>
    </div>
  );
}
