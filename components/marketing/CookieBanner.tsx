"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/core/Button";
import { useNewsletterPopup } from "./NewsletterPopupProvider";

const CONSENT_KEY = "lumiere-cookie-consent";

export function CookieBanner() {
  const { newsletterDismissed } = useNewsletterPopup();
  const [hasConsent, setHasConsent] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHasConsent(Boolean(localStorage.getItem(CONSENT_KEY)));
  }, []);

  useEffect(() => {
    const shouldShow = newsletterDismissed && !hasConsent;
    if (shouldShow) {
      setShouldRender(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timer = setTimeout(() => setShouldRender(false), 300);
    return () => clearTimeout(timer);
  }, [newsletterDismissed, hasConsent]);

  function choose(value: "accepted" | "declined") {
    localStorage.setItem(CONSENT_KEY, value);
    setHasConsent(true);
  }

  if (!shouldRender) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-6 z-40 w-[360px] max-w-[calc(100vw-48px)] rounded-[20px] border border-cream-400 bg-cream-50 p-6 shadow-[var(--shadow-lg)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <h2 className="m-0 font-display text-lg font-semibold text-mocha-900">Cookies &amp; Privacy</h2>

      <p className="mt-3 font-body text-[12px] leading-[1.6] text-mocha-600">
        Lumière Beauty Studio and selected service providers may collect information
        as described in our{" "}
        <Link href="/privacy-policy" className="text-gold-700 underline underline-offset-2 hover:text-gold-800">
          Privacy Policy
        </Link>{" "}
        and use cookies or similar technologies for functionality, website
        experience, analytics, and marketing purposes as described in our{" "}
        <Link href="/cookie-policy" className="text-gold-700 underline underline-offset-2 hover:text-gold-800">
          Cookie Policy
        </Link>
        .
      </p>

      <p className="mt-3 font-body text-[12px] leading-[1.6] text-mocha-600">
        You may accept, decline, or withdraw consent at any time. Declining
        optional cookies may limit certain website features.
      </p>

      <p className="mt-3 font-body text-[12px] leading-[1.6] text-mocha-600">
        Use &ldquo;Accept All&rdquo; to consent, or choose &ldquo;Continue Without
        Accepting&rdquo; to proceed using only essential cookies.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <Button type="button" variant="primary" size="sm" full onClick={() => choose("accepted")}>
          Accept All
        </Button>
        <Button type="button" variant="secondary" size="sm" full onClick={() => choose("declined")}>
          Continue Without Accepting
        </Button>
      </div>
    </div>
  );
}
