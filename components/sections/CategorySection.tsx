import Image from "next/image";
import clsx from "clsx";
import { SectionHeading } from "@/components/core/SectionHeading";
import { PriceRow } from "@/components/beauty/PriceRow";
import { Button } from "@/components/core/Button";
import { Reveal, RevealGroup } from "@/components/animation/Reveal";
import type { PriceGroup } from "@/lib/data/services";

export function CategorySection({
  overline,
  title,
  blurb,
  image,
  flip = false,
  dark = false,
  groups,
}: {
  overline: string;
  title: string;
  blurb: string;
  image: string;
  flip?: boolean;
  dark?: boolean;
  groups: PriceGroup[];
}) {
  const imageEl = (
    <Reveal y={0} className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[var(--shadow-lg)]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-cover"
      />
    </Reveal>
  );

  const menuEl = (
    <div className="flex flex-col gap-[22px]">
      <Reveal>
        <SectionHeading
          align="left"
          tone={dark ? "light" : "ink"}
          overline={overline}
          title={title}
          subtitle={blurb}
        />
      </Reveal>
      <RevealGroup className="flex flex-col gap-[18px]">
        {groups.map((g) => (
          <div key={g.label ?? "main"} className="flex flex-col gap-0.5">
            {g.label && (
              <span
                className={clsx(
                  "mb-1.5 text-xs font-medium uppercase tracking-[1.5px]",
                  dark ? "text-gold-500" : "text-gold-700"
                )}
              >
                {g.label}
              </span>
            )}
            {g.rows.map((r, i, arr) => (
              <PriceRow key={r.name} tone={dark ? "dark" : "light"} divider={i < arr.length - 1} {...r} />
            ))}
          </div>
        ))}
      </RevealGroup>
      <Reveal>
        <Button href="/booking" variant={dark ? "gold" : "primary"} size="md" icon="↗">
          Book now
        </Button>
      </Reveal>
    </div>
  );

  return (
    <section className={dark ? "bg-mocha-700" : "bg-cream-100"}>
      <div
        className={clsx(
          "mx-auto grid max-w-[1240px] gap-14 px-6 py-16 sm:px-8 lg:items-center lg:py-[84px]",
          flip ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.15fr]"
        )}
      >
        {flip ? (
          <>
            {menuEl}
            {imageEl}
          </>
        ) : (
          <>
            {imageEl}
            {menuEl}
          </>
        )}
      </div>
    </section>
  );
}
