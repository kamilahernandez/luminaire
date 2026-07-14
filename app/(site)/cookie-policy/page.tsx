import type { Metadata } from "next";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalList } from "@/components/legal/LegalList";

export const metadata: Metadata = {
  title: "Cookie Policy — Lumière",
  description: "How Lumière Beauty Studio uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div>
      <LegalHero title="Cookie Policy" />

      <section className="bg-cream-100">
        <div className="mx-auto max-w-[760px] px-6 py-16 sm:px-8 lg:py-20">
          <LegalSection title="What Are Cookies">
            <p className="m-0">
              Cookies are small files used to improve browsing experience and
              remember preferences.
            </p>
          </LegalSection>

          <LegalSection title="How We Use Cookies">
            <p className="m-0">Cookies may be used to:</p>
            <LegalList
              items={[
                "Remember preferences",
                "Improve website functionality",
                "Understand visitor interactions",
                "Analyze website performance",
                "Support marketing efforts",
              ]}
            />
          </LegalSection>

          <LegalSection title="Managing Cookies">
            <p className="m-0">
              Visitors may accept all cookies or continue browsing using only
              essential cookies.
            </p>
            <p className="m-0">
              Some features of the website may function differently when
              optional cookies are disabled.
            </p>
          </LegalSection>

          <LegalSection title="Contact">
            <p className="m-0">
              <a href="mailto:hello@lumierestudio.com" className="text-gold-700 underline underline-offset-2 hover:text-gold-800">
                hello@lumierestudio.com
              </a>
            </p>
          </LegalSection>
        </div>
      </section>
    </div>
  );
}
