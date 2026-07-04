import clsx from "clsx";

const sizes = { sm: 22, md: 32, lg: 46 } as const;

export function Logo({
  tagline = true,
  tone = "ink",
  size = "md",
  align = "center",
}: {
  tagline?: boolean;
  tone?: "ink" | "light";
  size?: keyof typeof sizes;
  align?: "center" | "left";
}) {
  const markSize = sizes[size];
  const onDark = tone === "light";
  return (
    <div
      className={clsx(
        "inline-flex flex-col gap-[5px] leading-none",
        align === "left" ? "items-start" : "items-center"
      )}
    >
      <span
        className="font-display font-medium"
        style={{
          fontSize: markSize,
          letterSpacing: markSize * 0.06,
          color: onDark ? "var(--cream-100)" : "var(--mocha-900)",
        }}
      >
        LUMIÈRE
      </span>
      {tagline && (
        <>
          <span
            className="my-0.5 h-px bg-gold-600"
            style={{ width: markSize * 1.1 }}
          />
          <span
            className="font-script"
            style={{
              fontSize: markSize * 0.66,
              color: onDark ? "var(--gold-500)" : "var(--gold-700)",
            }}
          >
            lash &amp; beauty studio
          </span>
        </>
      )}
    </div>
  );
}
