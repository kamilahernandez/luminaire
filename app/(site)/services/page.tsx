import type { Metadata } from "next";
import { SectionHeading } from "@/components/core/SectionHeading";
import { CategorySection } from "@/components/sections/CategorySection";
import { TreatmentCarousel } from "@/components/beauty/TreatmentCarousel";
import { Reveal } from "@/components/animation/Reveal";
import { FACIALS, LASHES, BROWS, LASER, FACIAL_TREATMENTS, LASH_TREATMENTS } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Spa Services — Lumière",
  description:
    "Facials, eyelash extensions, eyebrow shaping, laser hair removal, and beauty bundles at Lumière lash & beauty studio.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-cream-200">
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="font-script text-[32px] text-gold-700">our menu</span>
          </Reveal>
          <Reveal delay={0.1} as="h1" className="mt-2 font-display text-[64px] font-semibold leading-[1.08] tracking-[-1px] text-mocha-900">
            Beauty Services
          </Reveal>
          <Reveal delay={0.2} className="mx-auto mt-4 max-w-[720px]">
            <p className="m-0 font-body text-lg font-light leading-[1.7] text-mocha-500">
              From glowing facials to expert lash artistry, every service is
              thoughtfully designed to help you look refreshed, radiant, and
              confident.
            </p>
          </Reveal>
        </div>
      </section>

      <CategorySection
        overline="Skin & Glow"
        title="Facials"
        blurb="Targeted treatments for radiant, healthy-looking skin."
        image="/images/service-facials-v6.jpg"
        groups={FACIALS}
      />
      <section className="bg-cream-200">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              overline="Know Your Skin"
              title="A Closer Look at Our Facials"
              subtitle="Browse each treatment to understand what it does and find the right fit for you."
              maxWidth="800px"
            />
          </Reveal>
          <div className="mt-11">
            <TreatmentCarousel items={FACIAL_TREATMENTS} />
          </div>
        </div>
      </section>

      <CategorySection
        flip
        dark
        overline="Lash Artistry"
        title="Eyelash Extensions"
        blurb="Custom sets to lengthen and define, with easy maintenance."
        image="/images/service-eyelash-v7.jpg"
        groups={LASHES}
      />
      <section className="bg-cream-200">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              overline="Find Your Set"
              title="A Closer Look at Our Lash Sets"
              subtitle="Browse each set to understand what it offers and find the right fit for you."
              maxWidth="800px"
            />
          </Reveal>
          <div className="mt-11">
            <TreatmentCarousel items={LASH_TREATMENTS} />
          </div>
        </div>
      </section>

      <CategorySection
        overline="Frame Your Features"
        title="Eyebrow Shaping"
        blurb="Define your natural arch with precise shaping and henna."
        image="/images/service-eyebrows-v3.jpg"
        groups={BROWS}
      />
      <CategorySection
        flip
        dark
        overline="Smooth & Confident"
        title="Laser Hair Removal · IPL"
        blurb="Intense Pulsed Light treatments for lasting, smooth skin."
        image="/images/service-laser-v5.jpg"
        groups={LASER}
      />
    </div>
  );
}
