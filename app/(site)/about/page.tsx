import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/core/SectionHeading";
import { Button } from "@/components/core/Button";
import { Reveal, RevealGroup } from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "About Us — Lumière",
  description:
    "Meet Gil, founder of Lumière lash & beauty studio, and learn about our philosophy, the Brazilian Classic lash method, and what makes the studio different.",
};

const PILLARS = [
  {
    title: "Experienced Professionals",
    body: "With more than a decade of experience, our team is dedicated to delivering services with precision, consistency, and attention to detail.",
  },
  {
    title: "Clean & Professional Standards",
    body: "We follow strict sanitation protocols, maintain the highest hygiene standards, and use professional-grade products and salon-quality tools in every service.",
  },
  {
    title: "Warm & Personalized Care",
    body: "Every appointment is designed to feel welcoming, comfortable, and tailored to your unique needs and goals.",
  },
  {
    title: "Quality You Can Trust",
    body: "From advanced techniques to carefully selected products, every detail is chosen to provide beautiful, lasting results.",
  },
];

const BRAZILIAN_POINTS = [
  "Full lash sets completed in under 60 minutes",
  "Customized styling designed for your features",
  "Lightweight lashes for all-day comfort",
  "Seamless application with long-lasting retention",
  "Professional products and techniques that protect your natural lashes",
];

export default function AboutPage() {
  return (
    <div>
      {/* Quote */}
      <section className="bg-mocha-900">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center sm:px-8 lg:py-[100px]">
          <Reveal>
            <span aria-hidden className="block font-display text-[90px] leading-[0.4] text-gold-500">
              &rdquo;
            </span>
          </Reveal>
          <Reveal delay={0.15} as="blockquote" className="mt-7 font-display text-[42px] font-medium italic leading-[1.3] tracking-[-0.5px] text-cream-100">
            Our top priority is to make you feel cared for, confident and
            beautiful.
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:py-[92px]">
        <Reveal>
          <SectionHeading
            overline="Why Choose Us"
            title="Experienced beauty professionals you can trust"
            subtitle="With 10+ years in the beauty industry, we're here to help you feel comfortable, cared for, and confident in your results."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              className="flex items-start gap-5 rounded-[20px] border border-cream-400 bg-white px-[30px] py-7 shadow-[var(--shadow-sm)]"
            >
              <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-cream-300 font-display text-xl font-semibold italic text-gold-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="m-0 mb-2 font-display text-xl font-semibold text-mocha-900">{p.title}</h3>
                <p className="m-0 font-body text-[14.5px] leading-[1.65] text-mocha-600">{p.body}</p>
              </div>
            </article>
          ))}
        </RevealGroup>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:py-[92px]">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal y={0} className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-[var(--shadow-lg)]">
            <Image
              src="/images/about-founder-gil.jpg"
              alt="Gil, founder"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </Reveal>
          <div className="flex flex-col gap-4">
            <Reveal>
              <span className="text-xs uppercase tracking-[2.5px] text-gold-700">About Me</span>
            </Reveal>
            <Reveal delay={0.08} as="h2" className="font-display text-[40px] font-semibold leading-[1.12] tracking-[-0.5px] text-mocha-900">
              Hi there, I&rsquo;m Gil
            </Reveal>
            <RevealGroup className="flex max-w-[560px] flex-col gap-4">
              <p className="m-0 font-body text-base leading-[1.65] text-mocha-600">
                I&rsquo;m a licensed esthetician and the founder of Princess Touch
                Aesthetics. My passion lies in helping women of all backgrounds
                feel beautiful, confident, and cared for — because beauty has no
                single look, and every woman deserves to feel seen.
              </p>
              <p className="m-0 font-body text-base leading-[1.65] text-mocha-600">
                I created this space not just as a spa, but as a sanctuary. In
                today&rsquo;s fast-paced world, women are constantly giving to
                others. I believe it&rsquo;s just as important to give back to
                ourselves — so every service is designed to help you slow down,
                unwind, and reconnect with your sense of self.
              </p>
              <p className="m-0 font-body text-base leading-[1.65] text-mocha-600">
                I specialize in natural-looking lash sets that are as
                long-lasting as they are stunning, with a unique Brazilian Lash
                Extension Technique built for speed and precision. More than
                anything, I want you to leave my chair not just looking amazing,
                but feeling refreshed, empowered, and at peace.
              </p>
            </RevealGroup>
            <Reveal>
              <p className="m-0 font-script text-[38px] leading-none text-gold-700">— Gil</p>
            </Reveal>
            <Reveal className="mt-1.5">
              <Button href="/booking" variant="primary" size="lg" icon="↗">
                Book your appointment
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brazilian Classic */}
      <section className="bg-cream-200">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-[92px]">
          <div className="flex flex-col gap-5">
            <Reveal delay={0.08}>
              <span className="font-script text-[32px] text-gold-700">The Brazilian Classic</span>
            </Reveal>
            <Reveal delay={0.15} as="h2" className="-mt-1.5 font-display text-[40px] font-semibold leading-[1.12] tracking-[-0.5px] text-mocha-900">
              Lashes you&rsquo;ll love
              <br />
              in under an hour
            </Reveal>
            <Reveal delay={0.2}>
              <p className="m-0 font-body text-base leading-[1.65] text-mocha-600">
                We&rsquo;ve perfected our technique to create beautiful,
                customized lash sets in under 60 minutes—giving you the same
                attention to detail, comfort, and long-lasting results in less
                time.
              </p>
            </Reveal>
            <RevealGroup className="flex flex-col gap-3" y={16}>
              {BRAZILIAN_POINTS.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span aria-hidden className="mt-[3px] text-sm text-gold-600">
                    ✦
                  </span>
                  <span className="font-body text-[15px] leading-[1.6] text-mocha-600">{p}</span>
                </div>
              ))}
            </RevealGroup>
            <Reveal className="mt-1">
              <Button href="/booking" variant="primary" size="md" icon="↗">
                Book the Brazilian Classic
              </Button>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { img: "/images/about-brazilian-before.jpg", label: "Before" },
              { img: "/images/about-brazilian-after.jpg", label: "After" },
            ].map(({ img, label }) => (
              <Reveal key={label} as="figure" className="m-0">
                <div className="relative aspect-[7/8] overflow-hidden rounded-[28px] shadow-[var(--shadow-md)]">
                  <Image src={img} alt={label} fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover" />
                </div>
                <figcaption className="mt-2.5 text-center font-body text-xs uppercase tracking-[2px] text-gold-700">
                  {label}
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
