"use client";

import { forwardRef, useId, useState } from "react";
import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, hint, error, icon, id, className, ...rest },
  ref
) {
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
      <div
        className={clsx(
          "flex h-12 items-center gap-2.5 rounded-[14px] border bg-cream-50 px-4 transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
          error
            ? "border-[#b8625a]"
            : focused
              ? "border-gold-600 shadow-[0_0_0_3px_var(--gold-300)]"
              : "border-cream-400"
        )}
      >
        {icon && <span aria-hidden className="inline-flex text-mocha-400">{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={clsx(
            "h-full w-full flex-1 border-none bg-transparent font-body text-[15px] text-mocha-900 outline-none",
            className
          )}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span className={clsx("font-body text-xs", error ? "text-[#b8625a]" : "text-mocha-400")}>
          {error || hint}
        </span>
      )}
    </div>
  );
});
