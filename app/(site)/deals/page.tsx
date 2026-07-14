import type { Metadata } from "next";
import { SectionHeading } from "@/components/core/SectionHeading";
import { Button } from "@/components/core/Button";
import { Accordion } from "@/components/beauty/Accordion";
import { BundleCard } from "@/components/beauty/BundleCard";
import { PerkSection } from "@/components/deals/PerkSection";
import { NewsletterCTAButton } from "@/components/deals/NewsletterCTAButton";
import { ReferIcon, CameraIcon, GiftIcon, PercentIcon } from "@/components/deals/PerkIcons";
import { Reveal, RevealGroup } from "@/components/animation/Reveal";
import { BUNDLES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Deals — Lumière",
  description:
    "Beauty bundles, referral rewards, gift cards, and exclusive offers at Lumière lash & beauty studio.",
};

const FAQS = [
  {
    q: "Can promotions be combined?",
    a: "Promotions cannot be combined unless otherwise stated.",
  },
  {
    q: "Do gift cards expire?",
    a: "Gift cards never expire.",
  },
  {
    q: "How do referral rewards work?",
    a: "Receive 10% off your next service after your referral completes their first appointment.",
  },
  {
    q: "How do I redeem my Instagram reward?",
    a: "Tag @lumierestudio in your post or story and mention it during your next visit.",
  },
];

export default function DealsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="font-body text-xs font-medium uppercase tracking-[2.5px] text-gold-700">
              Lumière Perks
            </span>
          </Reveal>
          <Reveal
            delay={0.1}
            as="h1"
            className="mt-2 font-display text-[54px] font-semibold leading-[1.08] tracking-[-1px] text-mocha-900"
          >
            Deals
          </Reveal>
          <Reveal delay={0.2} className="mx-auto mt-4 max-w-[620px]">
            <p className="m-0 font-body text-lg font-light leading-[1.7] text-mocha-500">
              Exclusive offers, thoughtful gifts, and curated beauty experiences
              designed to help you save on your favourite services.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Beauty Bundles — moved verbatim from the Services page, unchanged */}
      <section className="bg-cream-200">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:py-[88px]">
          <Reveal>
            <SectionHeading
              overline="Save More"
              title="Beauty Bundles"
              subtitle="Pair your favourites and save — curated packages for a complete glow."
            />
          </Reveal>
          <RevealGroup className="mt-11 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {BUNDLES.map((b) => (
              <BundleCard key={b.name} {...b} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <PerkSection
        bg="cream-100"
        flip={false}
        icon={<ReferIcon />}
        image="/images/deals-refer-a-friend.jpg"
        eyebrow="Share Lumière"
        title="Refer a Friend"
        description="Invite a friend to experience Lumière and receive 10% off your next service when they book their first appointment."
        cta={
          <Button
            href="mailto:?subject=You%20have%20to%20try%20Lumi%C3%A8re%20Beauty%20Studio&body=I%20wanted%20to%20share%20Lumi%C3%A8re%20Beauty%20Studio%20with%20you%20%E2%80%94%20a%20lash%20%26%20beauty%20studio%20I%20love.%20Use%20my%20referral%20to%20get%2010%25%20off%20your%20first%20visit!"
            variant="primary"
            size="md"
          >
            Refer a Friend
          </Button>
        }
        note="One discount per referral. Cannot be combined with other promotions."
      />

      <PerkSection
        bg="cream-200"
        flip={true}
        icon={<CameraIcon />}
        image="/images/deals-post-and-save.jpg"
        eyebrow="Share Your Glow"
        title="Post & Save"
        description="Tag us in your results or beauty routine on Instagram and receive 10% off your next service."
        handle="@lumierestudio"
        cta={
          <Button href="#faq" variant="secondary" size="md">
            Learn More
          </Button>
        }
        note="One reward redemption per visit."
      />

      <PerkSection
        bg="cream-100"
        flip={false}
        icon={<GiftIcon />}
        image="/images/deals-self-care.jpg"
        eyebrow="Gift Lumière"
        title="Give the Gift of Self-Care"
        description="Share a little luxury with someone special. Lumière gift cards are available in any amount and can be redeemed toward any service."
        cta={
          <Button href="mailto:hello@lumierestudio.com?subject=Gift%20Card%20Inquiry" variant="primary" size="md">
            Purchase a Gift Card
          </Button>
        }
      />

      <PerkSection
        bg="cream-200"
        flip={true}
        icon={<PercentIcon />}
        image="/images/deals-first-visit.jpg"
        eyebrow="New Clients"
        title="Enjoy 10% Off Your First Visit"
        description="Join the Lumière List for beauty tips, exclusive offers, and studio updates delivered occasionally to your inbox."
        cta={<NewsletterCTAButton label="Join the Lumière List" />}
      />

      {/* FAQ */}
      <section id="faq" className="bg-cream-100">
        <div className="mx-auto max-w-[760px] px-6 py-16 sm:px-8 lg:py-20">
          <Reveal>
            <SectionHeading title="Frequently Asked Questions" />
          </Reveal>
          <RevealGroup className="mt-10 flex flex-col gap-3">
            {FAQS.map((f) => (
              <Accordion key={f.q} title={f.q}>
                {f.a}
              </Accordion>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}
