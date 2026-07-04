import { SectionHeading } from "@/components/core/SectionHeading";
import { ServiceCard } from "@/components/beauty/ServiceCard";
import { Reveal, RevealGroup } from "@/components/animation/Reveal";

const SERVICES = [
  {
    image: "/images/service-facials-v6.jpg",
    title: "Facials",
    price: "from $70",
    badge: "Most loved",
    description:
      "Signature, LED, dermaplaning, peels, microneedling, Geneo, and Hydrafacial treatments for radiant skin.",
  },
  {
    image: "/images/service-eyelash-v7.jpg",
    title: "Eyelash Extensions",
    price: "from $100",
    description:
      "Classic, hybrid, and mega-volume full sets, with easy 15-day maintenance refills.",
  },
  {
    image: "/images/service-laser-v5.jpg",
    title: "Laser Hair Removal · IPL",
    price: "from $80",
    description:
      "Intense Pulsed Light treatments for smooth, confident skin — from underarms to full body.",
  },
];

export function HomeServices() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:py-[92px]">
      <Reveal>
        <SectionHeading
          overline="What We Offer"
          title="Our Services"
          subtitle="Expertly crafted treatments designed to enhance your natural beauty."
        />
      </Reveal>
      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {SERVICES.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </RevealGroup>
    </section>
  );
}
