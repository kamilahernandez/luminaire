"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { gsap } from "@/lib/gsap";

export function Accordion({
  title,
  children,
  defaultOpen = false,
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const onDark = tone === "dark";

  const toggle = () => {
    const next = !open;
    setOpen(next);
    const el = bodyRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (next) {
      gsap.set(el, { height: "auto" });
      const h = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: 0 },
        { height: h, duration: 0.4, ease: "power2.out", clearProps: "height" }
      );
    } else {
      gsap.to(el, { height: 0, duration: 0.32, ease: "power2.in" });
    }
  };

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[14px] border",
        onDark ? "border-white/10 bg-white/5" : "border-cream-400 bg-white"
      )}
    >
      <button
        onClick={toggle}
        aria-expanded={open}
        className={clsx(
          "flex w-full items-center justify-between gap-3 px-[18px] py-[15px] text-left font-body text-[15px] font-medium",
          onDark ? "text-cream-100" : "text-mocha-800"
        )}
      >
        <span>{title}</span>
        <span
          aria-hidden
          className={clsx(
            "flex-none text-[13px] text-gold-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open && "rotate-180"
          )}
        >
          ▾
        </span>
      </button>
      <div ref={bodyRef} className="overflow-hidden" style={{ height: defaultOpen ? "auto" : 0 }}>
        <div
          className={clsx(
            "px-[18px] pb-4 font-body text-sm leading-[1.65]",
            onDark ? "text-cream-400" : "text-mocha-600"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
