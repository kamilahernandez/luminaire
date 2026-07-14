import clsx from "clsx";
import type { ReactNode } from "react";

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  tone = "ink",
  size = "lg",
  maxWidth = "640px",
}: {
  overline?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "ink" | "light";
  size?: "md" | "lg";
  maxWidth?: string;
}) {
  const onDark = tone === "light";
  return (
    <div
      style={{ maxWidth }}
      className={clsx(
        "flex flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left"
      )}
    >
      {overline && (
        <span
          className={clsx(
            "font-body text-xs font-medium uppercase tracking-[2.5px]",
            onDark ? "text-gold-500" : "text-gold-700"
          )}
        >
          {overline}
        </span>
      )}
      <h2
        className={clsx(
          "m-0 font-display font-semibold leading-[1.12] tracking-[-0.5px]",
          size === "md" ? "text-[30px]" : "text-[40px]",
          onDark ? "text-cream-100" : "text-mocha-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "m-0 font-body text-lg font-light leading-[1.7]",
            onDark ? "text-cream-400" : "text-mocha-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
