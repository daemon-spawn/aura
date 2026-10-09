"use client";

import { useSyncExternalStore } from "react";
import { isSoundOn, playToggle, setSoundOn, subscribeSound, unlockSound } from "@/lib/sound";
import styles from "./SoundToggle.module.css";

/** Speaker button for the interface sounds; the choice is remembered. */
export function SoundToggle({ className }: { className?: string }) {
  const on = useSyncExternalStore(subscribeSound, isSoundOn, () => true);

  const toggle = () => {
    unlockSound();
    setSoundOn(!on);
    if (!on) playToggle(true);
  };

  return (
    <button
      type="button"
      className={[styles.btn, className].filter(Boolean).join(" ")}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      title={on ? "Sound on" : "Sound off"}
      onClick={toggle}
    >
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
        <path d="M3 7.5 H6 L10.5 3.5 V16.5 L6 12.5 H3 Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        {on ? (
          <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className={styles.waves}>
            <path d="M13.5 7.5 Q15 10 13.5 12.5" />
            <path d="M15.75 5.25 Q18.5 10 15.75 14.75" />
          </g>
        ) : (
          <path d="M13.5 7.5 L18 12.5 M18 7.5 L13.5 12.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
