/**
 * Interface sounds, synthesised with Web Audio (no files to load).
 * Browsers only allow audio after a user gesture, so the context is created
 * lazily and resumed on the first pointerdown/keydown (see SoundFx).
 * The on/off choice is remembered per visitor.
 */
const KEY = "aura-sound";
const listeners = new Set<() => void>();

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = true;
let loaded = false;
let lastAt = 0;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    enabled = localStorage.getItem(KEY) !== "off";
  } catch {}
}

export function isSoundOn() {
  load();
  return enabled;
}

export function setSoundOn(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l());
}

export function subscribeSound(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Creates/resumes the audio context. Call from a user gesture. */
export function unlockSound() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    ctx = new Ctx();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
}

/** One enveloped sine blip. */
function blip(from: number, to: number, peak: number, length: number, delay = 0) {
  if (!ctx || !master) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + length);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + length);
  osc.connect(gain).connect(master);
  osc.start(t);
  osc.stop(t + length + 0.02);
}

function ready(minGap: number) {
  if (!isSoundOn() || !ctx || ctx.state !== "running") return false;
  // Touch screens have no hover and no visible switch: stay silent there.
  if (!window.matchMedia("(hover: hover)").matches) return false;
  const now = performance.now();
  if (now - lastAt < minGap) return false;
  lastAt = now;
  return true;
}

/** A soft, short tick — hovering links, buttons, images and cards. */
export function playHover() {
  if (!ready(45)) return;
  const f = 1500 * (0.96 + Math.random() * 0.08);
  blip(f, f * 0.6, 0.06, 0.05);
}

/** A rounder two-note pop — opening (rising) or closing (falling). */
export function playToggle(open = true) {
  if (!ready(0)) return;
  const [a, b] = open ? [520, 780] : [780, 520];
  blip(a, a * 0.9, 0.09, 0.09);
  blip(b, b * 0.9, 0.07, 0.12, 0.06);
}
