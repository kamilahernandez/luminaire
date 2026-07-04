import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "secondary" | "ghost" | "on-dark";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-mocha-800 text-cream-100 border border-mocha-800 hover:bg-mocha-900",
  gold: "bg-gold-600 text-mocha-900 border border-gold-600 hover:brightness-95",
  secondary:
    "bg-transparent text-mocha-800 border border-mocha-800 hover:bg-mocha-800/5",
  ghost: "bg-transparent text-mocha-800 border border-transparent hover:bg-mocha-800/5",
  "on-dark": "bg-cream-100 text-mocha-900 border border-cream-100 hover:brightness-95",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-[18px] py-[9px] text-[13px]",
  md: "px-[26px] py-[13px] text-sm",
  lg: "px-9 py-[17px] text-[15px]",
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-body font-medium leading-none tracking-[0.5px] transition-[transform,filter] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  full?: boolean;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & { href: string; target?: string; rel?: string };

export function Button(props: AsButton | AsLink) {
  const {
    children,
    variant = "primary",
    size = "md",
    icon,
    full = false,
    className,
    ...rest
  } = props;

  const classes = clsx(
    base,
    variantClasses[variant],
    sizeClasses[size],
    full && "w-full",
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props as AsLink;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
        {icon && (
          <span aria-hidden className="inline-flex text-[1.05em]">
            {icon}
          </span>
        )}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon && (
        <span aria-hidden className="inline-flex text-[1.05em]">
          {icon}
        </span>
      )}
    </button>
  );
}
