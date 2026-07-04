import Image from "next/image";

export function ServiceCard({
  image,
  title,
  price,
  description,
  badge,
}: {
  image: string;
  title: string;
  price?: string;
  description?: string;
  badge?: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[20px] border border-cream-400 bg-white shadow-[var(--shadow-sm)] transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]">
      <div className="relative h-[180px] w-full bg-cream-300">
        <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="m-0 font-display text-lg font-semibold leading-tight text-mocha-900">{title}</h3>
          {price && (
            <span className="whitespace-nowrap font-body text-sm font-medium text-gold-700">{price}</span>
          )}
        </div>
        {badge && (
          <span className="self-start rounded-full bg-cream-300 px-2.5 py-1 font-body text-[11px] tracking-[0.3px] text-mocha-800">
            {badge}
          </span>
        )}
        {description && (
          <p className="m-0 font-body text-sm leading-[1.6] text-mocha-600">{description}</p>
        )}
      </div>
    </article>
  );
}
