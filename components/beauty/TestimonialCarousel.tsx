"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCarousel({
  items,
  speed = 48,
  cardWidth = 440,
}: {
  items: Testimonial[];
  speed?: number;
  cardWidth?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      xPercent: -50,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    const pause = () => tween.pause();
    const play = () => tween.play();
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", play);
    return () => {
      tween.kill();
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", play);
    };
  }, [speed]);

  return (
    <div className="relative w-full overflow-hidden py-1.5">
      <div ref={trackRef} className="flex w-max gap-6">
        {loop.map((t, i) => (
          <div
            key={i}
            style={{ width: `clamp(270px, 82vw, ${cardWidth}px)` }}
            className="flex flex-none"
          >
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20"
        style={{ background: "linear-gradient(90deg, var(--blush-200) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20"
        style={{ background: "linear-gradient(270deg, var(--blush-200) 0%, transparent 100%)" }}
      />
    </div>
  );
}
