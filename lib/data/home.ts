export const INSTAGRAM_POSTS = [1, 2, 3, 4, 5, 6].map((n) => ({
  image: `/images/instagram-${n}.jpg`,
}));

export type HeroCollageImage = {
  col: 0 | 1 | 2;
  src: string;
  aspect: string;
  label?: string;
  alt: string;
};

export const HERO_COLLAGE: HeroCollageImage[] = [
  { col: 0, src: "/images/hero-collage-1.jpg", aspect: "3/4", label: "lashes", alt: "Client after eyelash extensions" },
  { col: 0, src: "/images/hero-collage-5.jpg", aspect: "1/1", alt: "Client after a facial" },
  { col: 0, src: "/images/hero-collage-8b.jpg", aspect: "4/5", alt: "Client relaxing after a treatment" },
  { col: 1, src: "/images/hero-collage-3.jpg", aspect: "3/4", label: "brows", alt: "Client after eyebrow shaping" },
  { col: 1, src: "/images/hero-collage-6.jpg", aspect: "1/1", alt: "Client after a brow and lash appointment" },
  { col: 1, src: "/images/hero-collage-2b.jpg", aspect: "4/5", alt: "Client after a facial" },
  { col: 2, src: "/images/hero-collage-4b.jpg", aspect: "4/5", label: "facials", alt: "Client during a hydrafacial" },
  { col: 2, src: "/images/hero-collage-7.jpg", aspect: "3/4", alt: "Client after a facial" },
];
