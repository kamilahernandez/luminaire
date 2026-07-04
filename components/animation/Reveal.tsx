"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Scroll-triggered fade + rise, fires once when the element enters the viewport. */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
        });
      },
    });
    return () => st.kill();
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Staggers the reveal of each direct child as the group enters the viewport. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children);
    gsap.set(items, { opacity: 0, y });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: "power3.out",
        });
      },
    });
    return () => st.kill();
  }, [stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
