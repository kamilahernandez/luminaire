"use client";

import { useNewsletterPopup } from "./NewsletterPopupProvider";

export function NewsletterTab() {
  const { open } = useNewsletterPopup();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open newsletter signup for 10% off"
      className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-r-[14px] bg-mocha-900 py-4 pl-2.5 pr-3 shadow-[var(--shadow-md)] transition-[background-color,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-mocha-800 hover:pr-4"
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-500" aria-hidden>
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className="font-body text-[11px] font-medium uppercase tracking-[2px] text-cream-100"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Get 10% Off
      </span>
    </button>
  );
}
