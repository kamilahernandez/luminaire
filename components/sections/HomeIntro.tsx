import Image from "next/image";
import { Button } from "@/components/core/Button";
import { Reveal } from "@/components/animation/Reveal";
import { STUDIO } from "@/lib/data/studio";

export function HomeIntro() {
  return (
    <section className="bg-cream-200">
      <div className="mx-auto grid max-w-[1240px] items-stretch gap-14 px-6 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-[84px]">
        <Reveal y={0} className="relative min-h-[320px] overflow-hidden rounded-[28px] shadow-[var(--shadow-md)]">
          <Image src="/images/about.jpg" alt="The studio" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
        </Reveal>
        <div className="flex flex-col gap-[18px]">
          <Reveal as="h2" className="font-display text-[40px] font-semibold leading-[1.12] tracking-[-0.5px] text-mocha-900">
            Personalized beauty in a space designed for you
          </Reveal>
          <Reveal delay={0.1} className="max-w-[500px]">
            <p className="m-0 font-body text-lg font-light leading-[1.7] text-mocha-600">
              At Lumière, we believe every client deserves personalized care.
              Our studio combines advanced skin treatments, luxury lash
              services, brow artistry, and laser treatments to create results
              that enhance what already makes you beautiful.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="max-w-[500px]">
            <p className="m-0 font-body text-lg font-light leading-[1.7] text-mocha-600">
              Whether you’re visiting for a relaxing facial, flawless lashes,
              or a complete beauty refresh, our goal is simple: to help you
              leave feeling radiant, confident, and completely cared for.
            </p>
          </Reveal>
          <Reveal delay={0.26} className="mt-1">
            <Button href="/about" variant="secondary" size="md" icon="→">
              More about us
            </Button>
          </Reveal>
          <Reveal delay={0.32} className="mt-[18px] flex flex-wrap gap-7 border-t border-black/[0.08] pt-[22px]">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[2.5px] text-gold-700">Visit Us</span>
              <span className="font-body text-[14.5px] text-mocha-800">{STUDIO.address}</span>
              <a
                href={STUDIO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[13px] text-gold-700 no-underline"
              >
                Get directions →
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[2.5px] text-gold-700">Hours</span>
              <span className="font-body text-[14.5px] text-mocha-800">Tue–Fri 9–7 · Sat 9–5 · Sun 10–3</span>
              <span className="font-body text-[13px] text-mocha-400">Closed Mondays</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
