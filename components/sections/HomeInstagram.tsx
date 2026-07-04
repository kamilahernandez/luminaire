import { InstagramStrip } from "@/components/marketing/InstagramStrip";
import { Reveal } from "@/components/animation/Reveal";
import { INSTAGRAM_POSTS } from "@/lib/data/home";

export function HomeInstagram() {
  return (
    <section className="bg-cream-100">
      <Reveal className="mx-auto max-w-[1240px] px-6 py-20 sm:px-8">
        <InstagramStrip posts={[...INSTAGRAM_POSTS]} />
      </Reveal>
    </section>
  );
}
