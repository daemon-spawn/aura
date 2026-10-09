"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./GapReveal.module.css";

type Slide = { src: string; alt: string };

/** Cycles the "connecting the dots" images inside the growing frame. */
export function GapSlideshow({ images }: { images: Slide[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || images.length < 2) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % images.length), 3200);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className={styles.slides}>
      {images.map((img, j) => (
        <div key={img.src} className={`${styles.slide} ${j === i ? styles.on : ""}`} aria-hidden={j !== i}>
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 900px) 52vw, 86vw" className={styles.img} />
        </div>
      ))}
    </div>
  );
}
