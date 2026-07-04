import { SectionHeading } from "@/components/core/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { STUDIO } from "@/lib/data/studio";
import clsx from "clsx";

export function HomeLocation() {
  return (
    <section className="bg-cream-200">
      <div className="mx-auto max-w-[1240px] px-6 py-[92px] sm:px-8">
        <Reveal>
          <SectionHeading
            overline="Find Us"
            title="Visit the studio"
            subtitle="Tucked into Cummings Park in Woburn — easy to find, easy to relax."
          />
        </Reveal>
        <div className="mt-12 grid gap-7 lg:grid-cols-[1.45fr_0.85fr]">
          <Reveal className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-cream-400 shadow-[var(--shadow-md)]">
            <iframe
              title="Lumière location"
              src={STUDIO.mapEmbed}
              loading="lazy"
              className="block h-full min-h-[420px] w-full border-0"
              style={{ filter: "saturate(0.92)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-600"
              style={{
                background: "color-mix(in srgb, var(--gold-600) 22%, transparent)",
                boxShadow: "0 0 0 6px color-mix(in srgb, var(--gold-600) 12%, transparent)",
              }}
            />
            <a
              href={STUDIO.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 rounded-full bg-mocha-800 px-[18px] py-2.5 font-body text-[13px] font-medium text-cream-100 no-underline shadow-[var(--shadow-sm)]"
            >
              Open in maps ↗
            </a>
          </Reveal>
          <Reveal className="flex flex-col gap-[22px] rounded-[28px] border border-cream-400 bg-white px-8 py-[30px] shadow-[var(--shadow-sm)]">
            <div>
              <span className="text-xs uppercase tracking-[2.5px] text-gold-700">Address</span>
              <p className="m-0 mt-2 font-display text-xl leading-[1.4] text-mocha-900">
                {STUDIO.address}
              </p>
              <p className="m-0 mt-2 font-body text-[14.5px] text-mocha-600">{STUDIO.phone}</p>
            </div>
            <div className="flex flex-col gap-[9px] border-t border-black/[0.08] pt-5">
              <span className="text-xs uppercase tracking-[2.5px] text-gold-700">
                Hours of Operation
              </span>
              {STUDIO.hours.map((h) => (
                <div key={h.day} className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="font-body text-sm text-mocha-600">{h.day}</span>
                  <span
                    className={clsx(
                      "font-body text-sm font-medium",
                      h.closed ? "text-mocha-400" : "text-mocha-800"
                    )}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
