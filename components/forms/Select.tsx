"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  options: string[];
};

export function Select({ label, hint, options, id, className, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className="flex w-full flex-col gap-[7px]">
      {label && (
        <label
          htmlFor={inputId}
          className="font-body text-[13px] font-medium tracking-[0.2px] text-mocha-800"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={clsx(
            "h-12 w-full cursor-pointer appearance-none rounded-[14px] border bg-cream-50 px-4 pr-10 font-body text-[15px] text-mocha-900 outline-none transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
            focused ? "border-gold-600 shadow-[0_0_0_3px_var(--gold-300)]" : "border-cream-400",
            className
          )}
          {...rest}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-mocha-500"
        >
          ▾
        </span>
      </div>
      {hint && <span className="font-body text-xs text-mocha-400">{hint}</span>}
    </div>
  );
}
