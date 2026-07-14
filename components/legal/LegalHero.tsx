import { Reveal } from "@/components/animation/Reveal";

export function LegalHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-cream-200">
      <div className="mx-auto max-w-[1240px] px-6 py-16 text-center sm:px-8 lg:py-20">
        <Reveal
          as="h1"
          className="font-display text-[44px] font-semibold leading-[1.08] tracking-[-1px] text-mocha-900 sm:text-[56px]"
        >
          {title}
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1} className="mt-3">
            <p className="m-0 font-body text-[13px] font-medium uppercase tracking-[1.5px] text-mocha-500">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
