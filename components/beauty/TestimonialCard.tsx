import Image from "next/image";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({ quote, name, role, avatar }: Testimonial) {
  return (
    <figure className="relative m-0 flex h-full flex-col gap-[18px] rounded-[20px] border border-cream-400 bg-white px-[30px] py-7 shadow-[var(--shadow-sm)]">
      <span
        aria-hidden
        className="absolute right-[26px] top-[18px] font-display text-[64px] font-bold leading-none text-gold-300"
      >
        &rdquo;
      </span>
      <blockquote className="m-0 max-w-[92%] flex-1 font-body text-base italic leading-[1.7] text-mocha-600">
        {quote}
      </blockquote>
      <figcaption className="flex items-center gap-[13px]">
        <div className="h-12 w-12 flex-none overflow-hidden rounded-full bg-mocha-900">
          {avatar && (
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-[17px] font-semibold text-mocha-900">
            {name}
          </span>
          {role && <span className="font-body text-[12.5px] text-mocha-400">{role}</span>}
        </div>
      </figcaption>
    </figure>
  );
}
