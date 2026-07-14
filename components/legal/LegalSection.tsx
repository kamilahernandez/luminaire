import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/Reveal";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal
      as="section"
      className="border-t border-cream-400 py-10 first:border-t-0 first:pt-0"
    >
      <h2 className="m-0 font-display text-2xl font-semibold text-mocha-900">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 font-body text-[15px] leading-[1.75] text-mocha-600">
        {children}
      </div>
    </Reveal>
  );
}
