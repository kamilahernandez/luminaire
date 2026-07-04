"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export function Textarea({ label, hint, rows = 4, id, className, ...rest }: Props) {
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
      <textarea
        id={inputId}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={clsx(
          "w-full resize-y rounded-[14px] border bg-cream-50 px-4 py-[13px] font-body text-[15px] text-mocha-900 outline-none transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
          focused ? "border-gold-600 shadow-[0_0_0_3px_var(--gold-300)]" : "border-cream-400",
          className
        )}
        {...rest}
      />
      {hint && <span className="font-body text-xs text-mocha-400">{hint}</span>}
    </div>
  );
}
