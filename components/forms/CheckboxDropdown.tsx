"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Checkbox } from "@/components/forms/Checkbox";

export function CheckboxDropdown({
  label,
  hint,
  placeholder = "Select services",
  groups,
  selected,
  onChange,
  onOpenChange,
}: {
  label?: string;
  hint?: string;
  placeholder?: string;
  groups: { label: string; options: string[] }[];
  selected: string[];
  onChange: (next: string[]) => void;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpenState] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function setOpen(next: boolean) {
    setOpenState(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function toggle(option: string) {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option]
    );
  }

  return (
    <div ref={containerRef} className="relative flex w-full flex-col gap-[7px]">
      {label && (
        <span className="font-body text-[13px] font-medium tracking-[0.2px] text-mocha-800">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={clsx(
          "flex h-12 w-full items-center justify-between rounded-[14px] border bg-cream-50 px-4 font-body text-[15px] outline-none transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "border-gold-600 shadow-[0_0_0_3px_var(--gold-300)]" : "border-cream-400"
        )}
      >
        <span className={selected.length ? "text-mocha-900" : "text-mocha-400"}>
          {selected.length ? `${selected.length} selected` : placeholder}
        </span>
        <span
          aria-hidden
          className={clsx(
            "text-xs text-mocha-500 transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open && "rotate-180"
          )}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-[360px] w-full overflow-y-auto rounded-[14px] border border-cream-400 bg-white shadow-[var(--shadow-lg)]">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-cream-400 bg-white px-4 py-3">
            <button
              type="button"
              onClick={() => onChange([])}
              className={clsx(
                "font-body text-xs font-medium text-gold-700 hover:underline",
                selected.length === 0 && "invisible"
              )}
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-mocha-800 px-4 py-[7px] font-body text-xs font-medium leading-none text-cream-100 transition-colors duration-150 hover:bg-mocha-900"
            >
              Done
            </button>
          </div>
          <div className="flex flex-col gap-4 p-4">
            {groups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2.5">
                <span className="font-body text-[11px] font-semibold uppercase tracking-[1px] text-mocha-400">
                  {group.label}
                </span>
                <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                  {group.options.map((option) => (
                    <Checkbox
                      key={option}
                      label={option}
                      checked={selected.includes(option)}
                      onChange={() => toggle(option)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {hint && <span className="font-body text-xs text-mocha-400">{hint}</span>}
    </div>
  );
}
