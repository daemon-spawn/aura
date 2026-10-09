import { gsap } from "@/lib/gsap";

/**
 * The gap scene (inside a tall section with a sticky stage):
 *  - [data-gap-frame] grows from small to full size in the centre
 *  - [data-gap-from="left"|"right"] the two halves of the sentence travel in
 *    from either edge and meet on top of the frame ("We connect" + "the dots.")
 *  - [data-gap-caption] fades in once the frame has opened
 * Everything is scrubbed to scroll and reverses on the way back up.
 */
export function closeGap(section: HTMLElement) {
  const frame = section.querySelector<HTMLElement>("[data-gap-frame]");
  const left = section.querySelector<HTMLElement>('[data-gap-from="left"]');
  const right = section.querySelector<HTMLElement>('[data-gap-from="right"]');
  const caption = section.querySelector<HTMLElement>("[data-gap-caption]");
  gsap.set(section, { visibility: "visible" });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.8 },
  });
  if (frame) tl.fromTo(frame, { scale: 0.38 }, { scale: 1 }, 0);
  // Start each half off its own edge of the screen; they meet in the middle.
  if (left) tl.fromTo(left, { x: () => -innerWidth * 0.6, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.8 }, 0);
  if (right) tl.fromTo(right, { x: () => innerWidth * 0.6, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.8 }, 0);
  if (caption) tl.fromTo(caption, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35 }, 0.65);
  return tl;
}
