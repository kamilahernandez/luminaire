"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "@/components/core/Logo";
import { Button } from "@/components/core/Button";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/booking" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu automatically whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="border-b border-black/[0.08] bg-cream-100/88 backdrop-blur-sm backdrop-saturate-150">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4">
        <Link href="/" aria-label="Lumière home" className="inline-flex">
          <Logo size="sm" tagline={false} align="left" />
        </Link>

        <nav className="hidden gap-[30px] md:flex">
          {LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={clsx(
                  "border-b pb-[3px] font-body text-sm tracking-[0.3px] transition-colors duration-150",
                  isActive
                    ? "border-gold-600 font-medium text-mocha-900"
                    : "border-transparent text-mocha-500 hover:text-mocha-800"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/booking" variant="primary" size="sm">
            Book your appointment
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative flex h-9 w-9 flex-none items-center justify-center md:hidden"
        >
          <span
            aria-hidden
            className={clsx(
              "absolute h-px w-5 bg-mocha-900 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
            )}
          />
          <span
            aria-hidden
            className={clsx(
              "absolute h-px w-5 bg-mocha-900 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
            )}
          />
        </button>
      </div>

      <div
        className={clsx(
          "overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          open ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-5 pb-5 pt-1">
          {LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={clsx(
                  "rounded-[10px] px-3 py-2.5 font-body text-[15px] tracking-[0.2px] transition-colors duration-150",
                  isActive ? "bg-cream-300 font-medium text-mocha-900" : "text-mocha-600 hover:bg-cream-200"
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <Button href="/booking" variant="primary" size="md" full className="mt-2">
            Book your appointment
          </Button>
        </nav>
      </div>
    </header>
  );
}
