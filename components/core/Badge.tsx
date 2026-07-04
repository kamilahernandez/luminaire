import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "soft" | "gold" | "outline" | "blush" | "dark";

const variantClasses: Record<Variant, string> = {
  soft: "bg-cream-300 text-mocha-800 border border-transparent",
  gold: "bg-gold-300 text-gold-700 border border-transparent",
  outline: "bg-transparent text-gold-700 border border-gold-500",
  blush: "bg-blush-200 text-blush-600 border border-transparent",
  dark: "bg-mocha-900 text-cream-100 border border-transparent",
};

export function Badge({
  children,
  variant = "soft",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-[13px] py-[6px] font-body text-xs font-medium leading-none tracking-[0.3px]",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
