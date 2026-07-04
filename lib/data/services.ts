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

export const BOOKING_SERVICE_OPTIONS = [
  "Signature Facial",
  "Facial with LED Light Therapy",
  "Hydra Gloss Lips",
  "Dermaplaning",
  "Image Skincare Peel",
  "Rose de Mer Peel",
  "Microneedling",
  "Geneo Facial",
  "Hydrafacial with LED",
  "Eyelash Extensions — Classic",
  "Eyelash Extensions — Hybrid",
  "Eyelash Extensions — Mega Volume",
  "Lash Maintenance",
  "Eyebrow Shaping",
  "Eyebrow Shaping with Henna",
  "Laser Hair Removal (IPL)",
  "Bundle — Glow & Define",
  "Bundle — Smooth & Clean",
  "Bundle — Geneo Glow",
  "Bundle — Peel & Perfect",
];

export const BOOKING_TIME_OPTIONS = [
  "9:00 AM",
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];
