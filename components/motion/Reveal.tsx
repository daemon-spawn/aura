"use client";

import { useRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { useReveal } from "@/components/motion/useReveal";

type RevealProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Animation scope. Any `data-anim` descendant is revealed by /animations.
 * Lets sections stay server components with plain markup.
 */
export function Reveal<T extends ElementType = "div">({ as, ...rest }: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const Tag = (as ?? "div") as ElementType;
  return <Tag ref={ref} {...rest} />;
}
