"use client";

import { useEffect, useRef } from "react";

const TILE = 160; // tile size in px
const DOT = 2; // size of one "pixel" of static
const FRAMES = 8;
const FPS = 14; // calm, not frantic

/**
 * No-signal TV static over the whole site — random grey pixels that change a
 * few times a second, kept just under the threshold of noticing.
 * A handful of tiles are generated once, then cycled (cheap: no per-frame
 * drawing). Frozen on one frame for reduced-motion visitors.
 */
export function TvNoise() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = TILE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames: string[] = [];
    for (let f = 0; f < FRAMES; f++) {
      const img = ctx.createImageData(TILE, TILE);
      for (let y = 0; y < TILE; y += DOT) {
        for (let x = 0; x < TILE; x += DOT) {
          const v = Math.random() * 255;
          const a = Math.random() < 0.55 ? 255 : 0; // gaps keep it airy
          for (let dy = 0; dy < DOT; dy++) {
            for (let dx = 0; dx < DOT; dx++) {
              const i = ((y + dy) * TILE + (x + dx)) * 4;
              img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
              img.data[i + 3] = a;
            }
          }
        }
      }
      ctx.putImageData(img, 0, 0);
      frames.push(`url(${canvas.toDataURL("image/png")})`);
    }

    el.style.backgroundImage = frames[0];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % FRAMES;
      el.style.backgroundImage = frames[i];
      el.style.backgroundPosition = `${Math.floor(Math.random() * TILE)}px ${Math.floor(Math.random() * TILE)}px`;
    }, 1000 / FPS);
    return () => window.clearInterval(id);
  }, []);

  return <div ref={ref} className="tv" aria-hidden="true" />;
}
