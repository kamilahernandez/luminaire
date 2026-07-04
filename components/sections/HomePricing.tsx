import Image from "next/image";
import { SectionHeading } from "@/components/core/SectionHeading";
import { Accordion } from "@/components/beauty/Accordion";
import { PriceRow } from "@/components/beauty/PriceRow";
import { Button } from "@/components/core/Button";
import { Reveal, RevealGroup } from "@/components/animation/Reveal";
import { FACIALS, LASHES, BROWS, LASER } from "@/lib/data/services";
import type { PriceGroup } from "@/lib/data/services";

function Rows({ group }: { group: PriceGroup }) {
  return (
    <>
      {group.rows.map((r, i, arr) => (
        <PriceRow key={r.name} tone="dark" divider={i < arr.length - 1} {...r} />
      ))}
    </>
  );
}

export function HomePricing() {
  return (
    <section className="bg-mocha-700">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-[84px]">
        <Reveal y={0} className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[var(--shadow-lg)]">
          <Image
            src="/images/pricing-collage-v2.jpg"
            alt="Clients relaxing at Lumière"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </Reveal>
        <div className="flex flex-col gap-[22px]">
          <Reveal>
            <SectionHeading
              align="left"
              tone="light"
              overline="Our Pricing"
              title="Enhance your natural beauty"
              subtitle="A glimpse of our menu — see all services for the full list."
            />
          </Reveal>
          <RevealGroup className="flex flex-col gap-3">
            <Accordion tone="dark" title="Facials" defaultOpen>
              <Rows group={FACIALS[0]} />
            </Accordion>
            <Accordion tone="dark" title="Eyelash Extensions">
              <Rows group={LASHES[0]} />
            </Accordion>
            <Accordion tone="dark" title="Eyebrows">
              <Rows group={BROWS[0]} />
            </Accordion>
            <Accordion tone="dark" title="Laser Hair Removal · IPL">
              <Rows group={LASER[0]} />
            </Accordion>
          </RevealGroup>
          <Reveal className="flex flex-wrap gap-3">
            <Button href="/booking" variant="gold" size="lg" icon="↗">
              Book your appointment
            </Button>
            <Button href="/services" variant="on-dark" size="lg">
              See full menu
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
