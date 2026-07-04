import Image from "next/image";
import { STUDIO } from "@/lib/data/studio";

export function InstagramStrip({ posts }: { posts: { image: string }[] }) {
  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <span className="font-body text-xs font-medium uppercase tracking-[2.5px] text-gold-700">
            Follow Along
          </span>
          <h2 className="m-0 font-display text-[30px] font-semibold text-mocha-900">
            {STUDIO.handle}
          </h2>
        </div>
        <a
          href={STUDIO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-mocha-800 px-[26px] py-[13px] font-body text-sm font-medium tracking-[0.5px] text-cream-100 no-underline transition-colors hover:bg-mocha-900"
        >
          Follow us on Instagram <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {posts.map((p, i) => (
          <a
            key={i}
            href={STUDIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-[14px] no-underline transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]"
          >
            <Image
              src={p.image}
              alt={STUDIO.handle}
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-mocha-900/55 font-script text-[26px] text-cream-100 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
              view
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
