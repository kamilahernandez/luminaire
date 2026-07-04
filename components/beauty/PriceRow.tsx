import clsx from "clsx";

export function PriceRow({
  name,
  note,
  price,
  divider = true,
  tone = "light",
}: {
  name: string;
  note?: string;
  price: string;
  divider?: boolean;
  tone?: "light" | "dark";
}) {
  const onDark = tone === "dark";
  return (
    <div
      className="flex items-baseline gap-3.5 py-[13px]"
      style={{
        borderBottom: divider
          ? `1px solid ${onDark ? "rgba(255,255,255,0.12)" : "var(--line-soft)"}`
          : "none",
      }}
    >
      <span
        className={clsx(
          "flex-none font-body text-[15px] font-medium",
          onDark ? "text-cream-100" : "text-mocha-800"
        )}
      >
        {name}
      </span>
      {note && (
        <span className={clsx("font-body text-[13px]", onDark ? "text-cream-400" : "text-mocha-400")}>
          {note}
        </span>
      )}
      <span
        aria-hidden
        className="flex-1 -translate-y-[3px]"
        style={{
          borderBottom: `1px dotted ${onDark ? "rgba(255,255,255,0.22)" : "var(--line-hairline)"}`,
        }}
      />
      <span
        className={clsx(
          "flex-none whitespace-nowrap font-display text-base font-medium",
          onDark ? "text-gold-500" : "text-gold-700"
        )}
      >
        {price}
      </span>
    </div>
  );
}
