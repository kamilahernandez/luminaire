import Image from "next/image";
import type { Treatment } from "@/lib/data/services";

export function TreatmentCard({ name, description, tagline, image }: Treatment) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-cream-400 bg-white shadow-[var(--shadow-sm)] transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]">
      {image ? (
        <div className="relative h-[200px] w-full bg-cream-300">
          <Image src={image} alt={name} fill sizes="(max-width: 640px) 70vw, 300px" className="object-cover" />
        </div>
      ) : (
        <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2.5 bg-cream-300">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            className="text-mocha-400"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2.12 0L4 19" />
          </svg>
          <span className="font-body text-[11px] font-medium uppercase tracking-[2px] text-mocha-400">
            Image Placeholder
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="m-0 font-display text-lg font-semibold leading-tight text-mocha-900">
          {name}
        </h3>
        {tagline && (
          <span className="font-body text-[11px] font-medium uppercase tracking-[1.5px] text-gold-700">
            {tagline}
          </span>
        )}
        <p className="m-0 font-body text-sm leading-[1.6] text-mocha-600">{description}</p>
      </div>
    </article>
  );
}
