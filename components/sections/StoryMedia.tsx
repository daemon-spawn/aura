"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Project } from "@/content/projects";
import { PhoneScroll } from "@/components/ui/PhoneScroll";
import { LaptopPlayer } from "@/components/ui/LaptopPlayer";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./SuccessStories.module.css";

/** True on screens without hover (phones, tablets): previews play in view instead. */
function useNoHover() {
  const [noHover, setNoHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const on = () => setNoHover(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return noHover;
}

/**
 * MONOLOG pattern: the project sits on a device. Hover the image and the
 * device comes alive — a laptop plays a recording of someone moving through
 * the live site; a phone scrolls the mobile page. On touch screens it plays
 * while the story is in view. Projects without either keep their plate.
 */
export function StoryMedia({ project, children }: { project: Project; children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(true);
  const noHover = useNoHover();
  const live = !still && (hover || (noHover && inView));

  useEffect(() => setStill(prefersReducedMotion()), []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.6), { threshold: [0, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!project.video && !project.screen) return <div className={styles.frameWrap}>{children}</div>;

  const label = project.url ?? project.name;

  return (
    <div
      ref={stage}
      className={`${styles.frameWrap} ${styles.stage} ${live ? styles.live : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-story-stage={project.video ? "laptop" : "phone"}
    >
      {/* Soft wash of the project itself behind the device */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.video?.poster ?? project.screen?.backdrop ?? project.screen?.src} alt="" className={styles.wash} loading="lazy" />

      {project.video ? (
        <LaptopPlayer
          video={project.video}
          alt={`${project.name} website on a laptop`}
          playing={live}
          restart={hover}
          className={styles.device}
        />
      ) : (
        project.screen && (
          <PhoneScroll screen={project.screen} playing={live} loop duration={9000} className={styles.phone} />
        )
      )}

      <span className={styles.hint} aria-hidden="true" data-label={label}>
        {live || noHover ? label : project.video ? "Hover to preview" : "Hover to scroll"}
      </span>
    </div>
  );
}
