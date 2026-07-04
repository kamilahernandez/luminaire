"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/core/Button";
import { RevealLines } from "@/components/animation/RevealLines";
import { Reveal } from "@/components/animation/Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HERO_COLLAGE } from "@/lib/data/home";

// One drift speed per column (px). Images within a column always move together,
// so their tight 12px gaps never collapse — only the three columns drift apart
// from each other, which is what actually reads as depth.
const COLUMN_SPEEDS = [-22, 28, -16];

function HeroCollage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", root);
    const columns = gsap.utils.toArray<HTMLElement>("[data-col]", root);

    gsap.set(tiles, { opacity: 0, y: 30, scale: 0.96 });
    const entrance = ScrollTrigger.create({
      trigger: root,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(tiles, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        });
      },
    });

    const parallaxTweens = columns.map((col, i) =>
      gsap.to(col, {
        y: COLUMN_SPEEDS[i % COLUMN_SPEEDS.length],
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      })
    );

    return () => {
      entrance.kill();
      parallaxTweens.forEach((t) => t.scrollTrigger?.kill());
    };
  }, []);

  const column = (col: 0 | 1 | 2, offset: number) => (
    <div data-col className="flex flex-col gap-3 will-change-transform" style={{ marginTop: offset }}>
      {HERO_COLLAGE.filter((p) => p.col === col).map((p, i) => (
        <div
          key={p.src}
          data-tile
          className="relative overflow-hidden rounded-[20px] shadow-[var(--shadow-md)] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
          style={{ aspectRatio: p.aspect }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width: 1024px) 33vw, 22vw"
            className="object-cover"
            priority={i === 0}
          />
          {p.label && (
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-cream-100/86 px-[11px] py-1 font-body text-[11.5px] font-medium tracking-[0.06em] text-mocha-900 shadow-[var(--shadow-sm)] backdrop-blur-sm">
              {p.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className="grid grid-cols-3 items-start gap-3">
      {column(0, 0)}
      {column(1, 34)}
      {column(2, 14)}
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-[84px]">
      <div className="flex flex-col gap-[22px]">
        <Reveal>
          <span className="font-script text-3xl text-gold-700">naturally radiant</span>
        </Reveal>
        <RevealLines
          as="h1"
          delay={0.08}
          lines={["Beauty That", "Feels Like You"]}
          lineClassName="font-display text-[56px] font-semibold leading-[1.02] tracking-[-2px] text-mocha-900 sm:text-[80px]"
          className="m-0"
        />
        <Reveal delay={0.25} className="max-w-[500px]">
          <p className="m-0 font-body text-xl font-light leading-[1.65] text-mocha-600">
            Luxury lashes, brows, facials, and laser treatments designed to
            enhance your natural features and leave you feeling effortlessly
            confident.
          </p>
        </Reveal>
        <Reveal delay={0.35} className="mt-1.5 flex flex-wrap gap-3.5">
          <Button href="/booking" variant="primary" size="lg" icon="↗">
            Book your appointment
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            View services
          </Button>
        </Reveal>
      </div>
      <div className="relative py-2">
        <HeroCollage />
        <Reveal delay={1.3} className="absolute -bottom-2 -left-2.5">
          <span className="rounded-full bg-cream-100 px-4 py-1.5 font-script text-2xl text-gold-700 shadow-[var(--shadow-sm)]">
            real clients, real results
          </span>
        </Reveal>
      </div>
    </section>
  );
}
