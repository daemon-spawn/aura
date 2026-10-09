"use client";

import { useEffect } from "react";
import { playHover, playToggle, unlockSound } from "@/lib/sound";

/** What ticks on hover. Images and video only count when they aren't inside a link/card already. */
const INTERACTIVE = 'a[href], button, summary, [role="button"], [data-sound]';
const MEDIA = "img, video";

/**
 * One delegated listener for the whole site: a tick when the mouse enters a
 * link, button, FAQ question, card or image, and a pop when an FAQ opens or
 * closes. Mouse only — touch has no hover. Opt an area out with `data-sound-off`.
 */
export function SoundFx() {
  useEffect(() => {
    let last: Element | null = null;

    const unlock = () => unlockSound();

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = e.target as Element;
      const el = t.closest(INTERACTIVE) ?? t.closest(MEDIA);
      if (el === last) return;
      const prev = last;
      last = el;
      if (!el || el.closest("[data-sound-off]")) return;
      // Moving from a button back out onto its card shouldn't tick twice.
      if (prev && el.contains(prev)) return;
      playHover();
    };

    // <details> fires a non-bubbling `toggle`, so listen in the capture phase.
    const onToggle = (e: Event) => {
      if (e.target instanceof HTMLDetailsElement) playToggle(e.target.open);
    };

    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("keydown", unlock, true);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return null;
}
