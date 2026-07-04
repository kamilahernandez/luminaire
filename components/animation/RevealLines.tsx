"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Masked line-by-line text reveal — each line rises out from behind an overflow mask. */
export function RevealLines({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  stagger = 0.08,
  delay = 0,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>("[data-reveal-line]");
    gsap.set(spans, { yPercent: 110 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(spans, { yPercent: 0, duration: 1.05, delay, stagger, ease: "power4.out" });
      },
    });
    return () => st.kill();
  }, [stagger, delay]);

  return (
    <Tag ref={containerRef} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-reveal-line className={clsx("block", lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
