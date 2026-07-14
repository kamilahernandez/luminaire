"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Input } from "@/components/forms/Input";
import { Checkbox } from "@/components/forms/Checkbox";
import { Button } from "@/components/core/Button";
import { useNewsletterPopup } from "./NewsletterPopupProvider";

export function NewsletterModal() {
  const { isOpen, close } = useNewsletterPopup();
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [promoConsent, setPromoConsent] = useState(false);
  const [privacyAck, setPrivacyAck] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      emailRef.current?.focus();
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timer = setTimeout(() => {
      setShouldRender(false);
      setSubmitted(false);
      setPromoConsent(false);
      setPrivacyAck(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!shouldRender) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        aria-hidden
        onClick={close}
        className={clsx(
          "absolute inset-0 bg-mocha-900/60 backdrop-blur-[2px] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
        className={clsx(
          "relative w-full max-w-[460px] rounded-[28px] bg-cream-50 p-8 shadow-[var(--shadow-lg)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-10",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-mocha-500 transition-colors duration-150 hover:bg-cream-300 hover:text-mocha-900"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className="text-center">
              <span className="font-body text-xs font-medium uppercase tracking-[2.5px] text-gold-700">
                Register and get
              </span>
              <div className="mt-2 font-display font-semibold leading-none tracking-[-1px]">
                <span className="text-[56px] text-gold-700">10%</span>{" "}
                <span className="text-[56px] text-mocha-900">Off</span>
              </div>
              <span className="mt-2 block font-body text-xs font-medium uppercase tracking-[2px] text-mocha-500">
                Any Service
              </span>
              <p className="mx-auto mt-4 max-w-[320px] font-body text-[13px] text-mocha-500">
                Beauty tips &bull; Exclusive offers &bull; Early access to promotions
              </p>
              <p className="mx-auto mt-4 max-w-[360px] font-body text-sm leading-[1.7] text-mocha-600">
                Join our mailing list and enjoy 10% off your first service. Plus
                receive skincare advice, seasonal promotions, and studio updates
                delivered occasionally to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
              <Input
                ref={emailRef}
                type="email"
                required
                placeholder="Enter your email address"
                aria-label="Email address"
              />
              <Button type="submit" variant="primary" size="lg" full disabled={!promoConsent || !privacyAck}>
                Claim my 10% off
              </Button>
              <div className="flex flex-col gap-3 pt-1">
                <Checkbox
                  checked={promoConsent}
                  onChange={setPromoConsent}
                  required
                  label="I agree to receive promotional emails from Lumière Beauty Studio and understand that I may unsubscribe at any time."
                />
                <Checkbox
                  checked={privacyAck}
                  onChange={setPrivacyAck}
                  required
                  label="I acknowledge that I have read the Privacy Policy and Cookie Policy."
                />
              </div>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <span className="font-script text-[40px] text-gold-700">merci</span>
            <h2 className="mt-1.5 font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.5px] text-mocha-900">
              You&rsquo;re on the list
            </h2>
            <p className="mx-auto mt-3 max-w-[320px] font-body text-sm leading-[1.7] text-mocha-500">
              Watch your inbox for your 10% off code, plus the occasional bit of
              beauty inspiration from us.
            </p>
            <div className="mt-6">
              <Button type="button" variant="primary" size="md" onClick={close}>
                Continue browsing
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
