import Link from "next/link";
import { Logo } from "@/components/core/Logo";
import { STUDIO } from "@/lib/data/studio";

const COLUMNS = [
  {
    heading: "Services",
    items: [
      { label: "Facials", href: "/services" },
      { label: "Eyelash Extensions", href: "/services" },
      { label: "Eyebrow Shaping", href: "/services" },
      { label: "Laser Hair Removal", href: "/services" },
      { label: "Beauty Bundles", href: "/services" },
    ],
  },
  {
    heading: "Studio",
    items: [
      { label: "About", href: "/about" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Beauty Bundles", href: "/services" },
      { label: "Book Online", href: "/booking" },
    ],
  },
  {
    heading: "Visit",
    items: [
      { label: "Book Online", href: "/booking" },
      { label: STUDIO.address, href: STUDIO.mapLink },
      { label: STUDIO.phone, href: `tel:${STUDIO.phone.replace(/\D/g, "")}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-cream-200 px-8 py-16 pb-8">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3.5">
          <Logo size="md" align="left" />
          <p className="m-0 max-w-[260px] font-body text-[13.5px] leading-[1.7] text-mocha-500">
            A luxury lash &amp; beauty studio designed for women who appreciate
            effortless beauty and personalized care.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <span className="font-body text-[11px] font-medium uppercase tracking-[1.5px] text-gold-700">
              {col.heading}
            </span>
            {col.items.map((it) => (
              <Link
                key={it.label}
                href={it.href}
                className="font-body text-sm text-mocha-600 no-underline hover:text-gold-700"
              >
                {it.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-[1240px] flex-col items-center gap-4 border-t border-black/[0.08] pt-[22px] font-body text-[12.5px] text-mocha-400 sm:flex-row sm:flex-wrap sm:justify-between">
        <span>© 2026 Lumière Lash &amp; Beauty Studio</span>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/privacy-policy" className="text-mocha-400 no-underline hover:text-gold-700">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="text-mocha-400 no-underline hover:text-gold-700">
            Cookie Policy
          </Link>
          <Link href="/terms-and-conditions" className="text-mocha-400 no-underline hover:text-gold-700">
            Terms &amp; Conditions
          </Link>
        </div>
        <span>
          {STUDIO.address} · {STUDIO.phone}
        </span>
      </div>
    </footer>
  );
}
