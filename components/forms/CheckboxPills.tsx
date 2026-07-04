"use client";

import clsx from "clsx";

export function CheckboxPills({
  label,
  hint,
  options,
  selected,
  onChange,
}: {
  label?: string;
  hint?: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(option: string) {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option]
    );
  }

  return (
    <div className="flex w-full flex-col gap-[7px]">
      {label && (
        <span className="font-body text-[13px] font-medium tracking-[0.2px] text-mocha-800">
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option)}
              className={clsx(
                "rounded-full border px-[13px] py-[7px] font-body text-[13px] font-medium leading-none tracking-[0.2px] transition-[background-color,border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                active
                  ? "border-gold-600 bg-gold-300 text-gold-700"
                  : "border-cream-400 bg-cream-50 text-mocha-500 hover:border-gold-500 hover:text-mocha-800"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {hint && <span className="font-body text-xs text-mocha-400">{hint}</span>}
    </div>
  );
}
