import type { Metadata } from "next";
import Link from "next/link";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalList } from "@/components/legal/LegalList";

export const metadata: Metadata = {
  title: "Privacy Policy — Lumière",
  description: "How Lumière Beauty Studio collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <LegalHero title="Privacy Policy" subtitle="Last Updated: July 2026" />

      <section className="bg-cream-100">
        <div className="mx-auto max-w-[760px] px-6 py-16 sm:px-8 lg:py-20">
          <LegalSection title="Information We Collect">
            <p className="m-0">We may collect:</p>
            <LegalList
              items={[
                "Name",
                "Email address",
                "Phone number",
                "Appointment information",
                "Service preferences",
                "Messages submitted through forms",
                "Website usage information",
              ]}
            />
          </LegalSection>

          <LegalSection title="How We Use Information">
            <p className="m-0">Information may be used to:</p>
            <LegalList
              items={[
                "Schedule appointments",
                "Respond to inquiries",
                "Send appointment reminders",
                "Improve our services",
                "Send promotions and studio updates when users opt in",
              ]}
            />
          </LegalSection>

          <LegalSection title="Cookies">
            <p className="m-0">Our website may use cookies to:</p>
            <LegalList
              items={[
                "Improve browsing experience",
                "Remember preferences",
                "Measure website usage",
                "Support marketing efforts",
              ]}
            />
            <p className="m-0">
              For more detail, see our{" "}
              <Link href="/cookie-policy" className="text-gold-700 underline underline-offset-2 hover:text-gold-800">
                Cookie Policy
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection title="Third-Party Services">
            <p className="m-0">We may use trusted third-party providers including:</p>
            <LegalList
              items={["Booking platforms", "Email marketing providers", "Analytics providers", "Hosting providers"]}
            />
          </LegalSection>

          <LegalSection title="Data Security">
            <p className="m-0">
              We take reasonable measures to safeguard personal information and
              work with providers that maintain industry-standard security
              practices.
            </p>
          </LegalSection>

          <LegalSection title="Marketing Communications">
            <p className="m-0">
              Users who subscribe to our mailing list may receive promotional
              emails, beauty tips, and studio updates.
            </p>
            <p className="m-0">Users may unsubscribe at any time.</p>
          </LegalSection>

          <LegalSection title="Contact Information">
            <p className="m-0">Lumière Beauty Studio</p>
            <p className="m-0">
              <a href="mailto:hello@lumierestudio.com" className="text-gold-700 underline underline-offset-2 hover:text-gold-800">
                hello@lumierestudio.com
              </a>
            </p>
            <p className="m-0">Boston, Massachusetts</p>
          </LegalSection>
        </div>
      </section>
    </div>
  );
}
