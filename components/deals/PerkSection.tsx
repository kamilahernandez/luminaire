import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";

export function PerkSection({
  eyebrow,
  title,
  description,
  handle,
  cta,
  note,
  icon,
  image,
  bg = "cream-100",
  flip = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  handle?: string;
  cta: ReactNode;
  note?: string;
  icon: ReactNode;
  image?: string;
  bg?: "cream-100" | "cream-200";
  flip?: boolean;
}) {
  return (
    <section className={bg === "cream-200" ? "bg-cream-200" : "bg-cream-100"}>
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:items-stretch lg:gap-14 lg:py-20">
        <div className={flip ? "lg:order-2" : ""}>
          <Reveal className="flex h-full flex-col items-start justify-center gap-4 rounded-[28px] border border-cream-400 bg-white px-8 py-12 shadow-[var(--shadow-sm)] sm:px-12 lg:px-14">
            <span className="font-body text-xs font-medium uppercase tracking-[2.5px] text-gold-700">
              {eyebrow}
            </span>
            <h2 className="m-0 font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.5px] text-mocha-900 sm:text-[36px]">
              {title}
            </h2>
            <p className="m-0 max-w-[440px] font-body text-base leading-[1.7] text-mocha-600">
              {description}
            </p>
            {handle && (
              <span className="font-display text-xl font-semibold italic text-gold-700">{handle}</span>
            )}
            <div className="mt-2">{cta}</div>
            {note && <p className="m-0 mt-1 font-body text-xs text-mocha-400">{note}</p>}
          </Reveal>
        </div>

        <div className={flip ? "lg:order-1" : ""}>
          {image ? (
            <Reveal y={0} className="relative h-full min-h-[340px] w-full overflow-hidden rounded-[28px] shadow-[var(--shadow-md)]">
              <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </Reveal>
          ) : (
            <Reveal
              y={0}
              className="relative flex h-full min-h-[340px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[28px] bg-gradient-to-br from-cream-300 to-cream-200 shadow-[var(--shadow-md)]"
            >
              {icon}
              <span className="font-body text-[11px] font-medium uppercase tracking-[2px] text-mocha-400">
                Image Placeholder
              </span>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
