import { SectionHeading } from "@/components/core/SectionHeading";
import { TestimonialCarousel } from "@/components/beauty/TestimonialCarousel";
import { Reveal } from "@/components/animation/Reveal";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function HomeTestimonials() {
  return (
    <section id="reviews" className="bg-blush-200">
      <div className="mx-auto max-w-[1240px] py-[88px]">
        <Reveal className="px-6 sm:px-8">
          <SectionHeading overline="Kind Words" title="What Our Clients Say" />
        </Reveal>
        <div className="mt-11">
          <TestimonialCarousel items={TESTIMONIALS} cardWidth={440} speed={48} />
        </div>
      </div>
    </section>
  );
}
