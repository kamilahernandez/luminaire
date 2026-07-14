import type { Metadata } from "next";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSection } from "@/components/legal/LegalSection";

export const metadata: Metadata = {
  title: "Terms & Conditions — Lumière",
  description: "The terms and conditions for booking and visiting Lumière Beauty Studio.",
};

export default function TermsAndConditionsPage() {
  return (
    <div>
      <LegalHero title="Terms & Conditions" />

      <section className="bg-cream-100">
        <div className="mx-auto max-w-[760px] px-6 py-16 sm:px-8 lg:py-20">
          <LegalSection title="Appointments">
            <p className="m-0">Appointments may require a deposit.</p>
          </LegalSection>

          <LegalSection title="Cancellations">
            <p className="m-0">
              Please provide at least 24 hours notice for cancellations or
              appointment changes.
            </p>
          </LegalSection>

          <LegalSection title="Late Arrivals">
            <p className="m-0">
              Clients arriving more than 15 minutes late may need to shorten or
              reschedule their appointment.
            </p>
          </LegalSection>

          <LegalSection title="Refund Policy">
            <p className="m-0">Completed services are non-refundable.</p>
          </LegalSection>

          <LegalSection title="Results Disclaimer">
            <p className="m-0">
              Results may vary based on individual skin type, lifestyle, and
              adherence to aftercare instructions.
            </p>
          </LegalSection>

          <LegalSection title="Promotions & Discounts">
            <p className="m-0">
              Promotional offers cannot be combined unless otherwise stated.
            </p>
            <p className="m-0">
              The 10% first visit offer is available to clients that follow our
              Instagram and subscribe to our newsletter for the first time only.
            </p>
          </LegalSection>
        </div>
      </section>
    </div>
  );
}
