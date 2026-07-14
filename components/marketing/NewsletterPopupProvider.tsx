"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type NewsletterPopupContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** True once the popup has been shown and closed at least once (or was already handled earlier this session). */
  newsletterDismissed: boolean;
};

const NewsletterPopupContext = createContext<NewsletterPopupContextValue | null>(null);

const SESSION_KEY = "lumiere-newsletter-shown";
const AUTO_OPEN_DELAY_MS = 1200;

export function NewsletterPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newsletterDismissed, setNewsletterDismissed] = useState(false);
  const hasOpenedRef = useRef(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      // Already shown (and necessarily closed) on an earlier page this session.
      setNewsletterDismissed(true);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    const timer = setTimeout(() => setIsOpen(true), AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
    } else if (hasOpenedRef.current) {
      setNewsletterDismissed(true);
    }
  }, [isOpen]);

  return (
    <NewsletterPopupContext.Provider value={{ isOpen, open, close, newsletterDismissed }}>
      {children}
    </NewsletterPopupContext.Provider>
  );
}

export function useNewsletterPopup() {
  const ctx = useContext(NewsletterPopupContext);
  if (!ctx) {
    throw new Error("useNewsletterPopup must be used within a NewsletterPopupProvider");
  }
  return ctx;
}
