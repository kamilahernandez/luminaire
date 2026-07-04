const MESSAGE = "Follow us on Instagram for 10% off your first service";

export function AnnouncementBar() {
  const item = (
    <span className="inline-flex items-center">
      <span className="font-body text-[12.5px] font-medium uppercase tracking-[1.2px] text-cream-100">
        {MESSAGE}
      </span>
      <span aria-hidden className="mx-[22px] text-gold-500">
        ✦
      </span>
    </span>
  );
  const copy = Array.from({ length: 6 }, (_, i) => (
    <span key={i}>{item}</span>
  ));

  return (
    <div role="marquee" className="w-full overflow-hidden bg-mocha-900 py-2">
      <div
        className="flex w-max"
        style={{ animation: "lum-marquee-rtl 26s linear infinite" }}
      >
        <div className="flex">{copy}</div>
        <div className="flex">{copy}</div>
      </div>
    </div>
  );
}
