import clsx from "clsx";
import { Button } from "@/components/core/Button";
import type { Bundle } from "@/lib/data/services";

export function BundleCard({ name, price, items, featured = false }: Bundle) {
  return (
    <article
      className={clsx(
        "flex h-full flex-col gap-4 rounded-[20px] px-[26px] pb-6 pt-[26px]",
        featured
          ? "bg-mocha-700 shadow-[var(--shadow-md)]"
          : "border border-cream-400 bg-white shadow-[var(--shadow-sm)]"
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3
          className={clsx(
            "m-0 font-display text-[22px] font-semibold",
            featured ? "text-cream-100" : "text-mocha-900"
          )}
        >
          {name}
        </h3>
        <span
          className={clsx(
            "whitespace-nowrap font-display text-2xl font-semibold",
            featured ? "text-gold-500" : "text-gold-700"
          )}
        >
          {price}
        </span>
      </div>
      <ul className="m-0 flex flex-col gap-2.5 p-0">
        {items.map((it) => (
          <li key={it.label} className="flex items-baseline justify-between gap-3">
            <span className="flex items-baseline gap-2">
              <span aria-hidden className="text-[13px] text-gold-600">
                ✦
              </span>
              <span
                className={clsx(
                  "font-body text-sm",
                  featured ? "text-cream-400" : "text-mocha-600"
                )}
              >
                {it.label}
              </span>
            </span>
            <span
              className={clsx(
                "whitespace-nowrap font-body text-[12.5px]",
                featured ? "text-gold-500" : "text-mocha-400"
              )}
            >
              {it.value}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-1">
        <Button href="/booking" variant={featured ? "on-dark" : "secondary"} size="sm" full>
          Book this bundle
        </Button>
      </div>
    </article>
  );
}
