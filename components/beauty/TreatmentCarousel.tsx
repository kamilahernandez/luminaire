"use client";

import { useEffect, useRef, useState } from "react";
import { TreatmentCard } from "./TreatmentCard";
import type { Treatment } from "@/lib/data/services";

const GAP = 24;

export function TreatmentCarousel({ items }: { items: Treatment[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map((t) => (
          <div key={t.name} data-card className="flex-[1_0_240px] snap-start">
            <TreatmentCard {...t} />
          </div>
        ))}
      </div>

      {canLeft && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16"
          style={{ background: "linear-gradient(90deg, var(--cream-200) 0%, transparent 100%)" }}
        />
      )}
      {canRight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16"
          style={{ background: "linear-gradient(270deg, var(--cream-200) 0%, transparent 100%)" }}
        />
      )}

      <button
        type="button"
        aria-label="Previous treatment"
        onClick={() => scrollByCard(-1)}
        disabled={!canLeft}
        className="absolute left-2 top-[100px] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream-400 bg-white/90 text-mocha-800 shadow-[var(--shadow-sm)] backdrop-blur-sm transition-[opacity,background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gold-300 disabled:pointer-events-none disabled:opacity-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next treatment"
        onClick={() => scrollByCard(1)}
        disabled={!canRight}
        className="absolute right-2 top-[100px] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream-400 bg-white/90 text-mocha-800 shadow-[var(--shadow-sm)] backdrop-blur-sm transition-[opacity,background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gold-300 disabled:pointer-events-none disabled:opacity-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
