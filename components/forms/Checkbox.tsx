"use client";

import { useId } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";

export function Checkbox({
  label,
  checked,
  onChange,
  required,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}) {
  const id = useId();

  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        required={required}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden
        className={clsx(
          "mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[6px] border transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
          checked ? "border-gold-600 bg-gold-600" : "border-cream-400 bg-cream-50"
        )}
      >
        {checked && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" aria-hidden>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="font-body text-[12.5px] leading-[1.55] text-mocha-600">{label}</span>
    </label>
  );
}
