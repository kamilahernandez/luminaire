export type Testimonial = {
  avatar: string;
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    avatar: "/images/review-kamila.png",
    name: "Kamila Hernandez",
    role: "Eyelash Extensions",
    quote:
      "I've been getting my eyelashes done here for over a year and always leave beyond happy. The quality is amazing, the prices are fair, and she works with incredible speed without ever compromising detail.",
  },
  {
    avatar: "/images/review-sofia.png",
    name: "Sofia R.",
    role: "Signature Facial",
    quote:
      "My skin has never looked this clear and glowing. The studio is calm and the care feels truly personal — I look forward to every visit.",
  },
  {
    avatar: "/images/review-aaliyah.png",
    name: "Aaliyah M.",
    role: "Hydrafacial",
    quote:
      "One of the best spa experiences I've had. Gentle, precise, and the results speak for themselves.",
  },
  {
    avatar: "/images/review-daniela.png",
    name: "Daniela P.",
    role: "Geneo Glow Bundle",
    quote:
      "The bundle was incredible value and I left feeling completely refreshed. I'll definitely be back for more.",
  },
  {
    avatar: "/images/review-mia.png",
    name: "Mia C.",
    role: "Laser Hair Removal",
    quote:
      "Professional, comfortable, and so worth it. Smooth skin and zero stress every single time.",
  },
];
