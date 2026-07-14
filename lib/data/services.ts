export type PriceRowData = { name: string; note?: string; price: string };
export type PriceGroup = { label?: string; rows: PriceRowData[] };

export const FACIALS: PriceGroup[] = [
  {
    rows: [
      { name: "Signature Facial", price: "$80" },
      { name: "Facial with LED Light Therapy", price: "$100" },
      { name: "Hydra Gloss Lips Treatment", price: "$70" },
      { name: "Dermaplaning", price: "$100" },
      { name: "Image Skincare Peel", price: "$120" },
      { name: "Rose de Mer Peel", price: "$150" },
      { name: "Microneedling", price: "$150" },
      { name: "Geneo Facial", price: "$120" },
      { name: "Hydrafacial with LED Light Therapy", price: "$175" },
    ],
  },
];

export type Treatment = { name: string; description: string; tagline?: string; image?: string };

export const FACIAL_TREATMENTS: Treatment[] = [
  {
    name: "Signature Facial",
    description:
      "A personalized facial that cleanses, hydrates, and refreshes the skin. Ideal when your skin needs a reset or regular maintenance glow.",
    image: "/images/treatment-facial-signature.jpg",
  },
  {
    name: "Facial with LED Light Therapy",
    description:
      "A calming facial paired with LED light to support clearer, healthier-looking skin. Great for acne-prone, sensitive, inflamed, or tired skin.",
    image: "/images/treatment-facial-led-light-therapy.jpg",
  },
  {
    name: "Hydra Gloss Lips Treatment",
    description:
      "A smoothing lip treatment that exfoliates, hydrates, and restores softness. Perfect for dry, dull, or chapped lips.",
    image: "/images/treatment-facial-hydra-gloss-lips.jpg",
  },
  {
    name: "Dermaplaning",
    description:
      "A gentle exfoliating treatment that removes peach fuzz and dead skin buildup. Great for dull skin, rough texture, or smoother makeup application.",
    image: "/images/treatment-facial-dermaplaning.jpg",
  },
  {
    name: "Image Skincare Peel",
    description:
      "A professional peel that helps improve tone, texture, breakouts, and dullness. Great for uneven skin, congestion, pigmentation, or early signs of aging.",
    image: "/images/treatment-facial-image-skincare-peel.jpg",
  },
  {
    name: "Rose de Mer Peel",
    description:
      "A natural resurfacing peel designed to renew and refine the skin. Great for acne scars, discoloration, rough texture, and uneven tone.",
    image: "/images/treatment-facial-rose-de-mer-peel.jpg",
  },
  {
    name: "Microneedling",
    description:
      "A collagen-stimulating treatment that helps improve scars, fine lines, and texture. Great for smoother, firmer-looking skin over time.",
    image: "/images/treatment-facial-microneedling.jpg",
  },
  {
    name: "Geneo Facial",
    description:
      "A glow-focused facial that exfoliates, oxygenates, and nourishes the skin. Great for dull, tired, or dehydrated skin.",
    image: "/images/treatment-facial-geneo.jpg",
  },
  {
    name: "HydraFacial with LED Light Therapy",
    description:
      "A deep-cleansing, hydrating facial paired with LED light therapy. Great for congestion, dryness, dullness, and skin that needs an instant glow.",
    image: "/images/treatment-facial-hydrafacial.jpg",
  },
];

export const LASH_TREATMENTS: Treatment[] = [
  {
    name: "Classic",
    description:
      "A one-to-one extension technique that enhances your natural lashes with soft length and definition.",
    tagline: "Natural coverage • Everyday enhancement",
    image: "/images/treatment-lash-classic.jpg",
  },
  {
    name: "Hybrid",
    description:
      "A blend of classic and volume lashes that creates balanced fullness with added texture.",
    tagline: "Soft glam • Most requested style",
    image: "/images/treatment-lash-hybrid.jpg",
  },
  {
    name: "Mega Volume",
    description:
      "A high-density lash set designed to deliver maximum fullness, depth, and drama.",
    tagline: "Bold definition • Most dramatic result",
    image: "/images/treatment-lash-mega-volume.jpg",
  },
];

export const LASHES: PriceGroup[] = [
  {
    label: "Full Set",
    rows: [
      { name: "Classic", price: "$100" },
      { name: "Hybrid", price: "$120" },
      { name: "Mega Volume", price: "$150" },
    ],
  },
  {
    label: "Maintenance",
    rows: [
      { name: "Classic", note: "(every 15 days)", price: "$50" },
      { name: "Hybrid", note: "(every 15 days)", price: "$60" },
      { name: "Mega Volume", note: "(every 15 days)", price: "$70" },
    ],
  },
];

export const BROWS: PriceGroup[] = [
  {
    rows: [
      { name: "Eyebrow Shaping", price: "$25" },
      { name: "Eyebrow Shaping with Henna", price: "$35" },
    ],
  },
];

export const LASER: PriceGroup[] = [
  {
    rows: [
      { name: "IPL Treatment", note: "(Intense Pulsed Light)", price: "$150" },
      { name: "Full Body", price: "$300" },
      { name: "Full Legs", price: "$120" },
      { name: "Arms", price: "$100" },
      { name: "Bikini Area", price: "$100" },
      { name: "Underarms", price: "$80" },
    ],
  },
];

export type Bundle = {
  name: string;
  price: string;
  featured?: boolean;
  items: { label: string; value: string }[];
};

export const BUNDLES: Bundle[] = [
  {
    name: "Glow & Define",
    price: "$195",
    featured: true,
    items: [
      { label: "Facial with LED Light Therapy", value: "$100 value" },
      { label: "Hydra Gloss Lips", value: "$70 value" },
      { label: "Eyebrow Shaping with Henna", value: "$35 value" },
    ],
  },
  {
    name: "Smooth & Clean",
    price: "$175",
    items: [
      { label: "Signature Facial", value: "$80 value" },
      { label: "Dermaplaning", value: "$100 value" },
      { label: "Eyebrow Shaping", value: "$25 value" },
    ],
  },
  {
    name: "Geneo Glow",
    price: "$215",
    items: [
      { label: "Geneo Facial", value: "$120 value" },
      { label: "Classic Eyelash Set", value: "$100 value" },
      { label: "Eyebrow Shaping", value: "$25 value" },
    ],
  },
  {
    name: "Peel & Perfect",
    price: "$185",
    items: [
      { label: "Image Skincare Peel", value: "$120 value" },
      { label: "Hydra Gloss Lips", value: "$70 value" },
      { label: "Eyebrow Shaping", value: "$25 value" },
    ],
  },
];

export const BOOKING_SERVICE_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Facials",
    options: [
      "Signature Facial",
      "Facial with LED Light Therapy",
      "Hydra Gloss Lips",
      "Dermaplaning",
      "Image Skincare Peel",
      "Rose de Mer Peel",
      "Microneedling",
      "Geneo Facial",
      "Hydrafacial with LED",
    ],
  },
  {
    label: "Lashes & Brows",
    options: [
      "Eyelash Extensions — Classic",
      "Eyelash Extensions — Hybrid",
      "Eyelash Extensions — Mega Volume",
      "Lash Maintenance",
      "Eyebrow Shaping",
      "Eyebrow Shaping with Henna",
    ],
  },
  {
    label: "Laser & Bundles",
    options: [
      "Laser Hair Removal (IPL)",
      "Bundle — Glow & Define",
      "Bundle — Smooth & Clean",
      "Bundle — Geneo Glow",
      "Bundle — Peel & Perfect",
    ],
  },
];

export const BOOKING_SERVICE_OPTIONS = BOOKING_SERVICE_GROUPS.flatMap((g) => g.options);

export const BOOKING_TIME_OPTIONS = [
  "9:00 AM",
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];
