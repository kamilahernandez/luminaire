"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { CheckboxPills } from "@/components/forms/CheckboxPills";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { Reveal } from "@/components/animation/Reveal";
import { BOOKING_SERVICE_OPTIONS, BOOKING_TIME_OPTIONS } from "@/lib/data/services";

export function BookingForm() {
  const [service, setService] = useState(BOOKING_SERVICE_OPTIONS[0]);
  const [time, setTime] = useState(BOOKING_TIME_OPTIONS[1]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <section className="mx-auto max-w-[620px] px-6 py-28 text-center sm:px-8">
        <Reveal>
          <span className="font-script text-[40px] text-gold-700">merci</span>
        </Reveal>
        <Reveal delay={0.1} as="h1" className="mt-1.5 font-display text-[40px] font-semibold leading-[1.12] tracking-[-0.5px] text-mocha-900">
          Your appointment is requested
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-3.5 font-body text-lg font-light leading-[1.7] text-mocha-500">
            We&rsquo;ve received your request for{" "}
            <strong className="font-medium text-mocha-800">{service}</strong> at{" "}
            {time}. You&rsquo;ll receive a confirmation by email shortly. We
            can&rsquo;t wait to see you.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-7">
          <Button href="/" variant="primary" size="lg">
            Back to home
          </Button>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-[1040px] gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:py-24">
      <div>
        <Reveal>
          <span className="text-xs uppercase tracking-[2.5px] text-gold-700">Reserve Your Visit</span>
        </Reveal>
        <Reveal delay={0.08} as="h1" className="mt-2.5 font-display text-[40px] font-semibold leading-[1.12] tracking-[-0.5px] text-mocha-900">
          Book your appointment
        </Reveal>
        <Reveal delay={0.15} className="mt-2.5 max-w-[460px]">
          <p className="m-0 font-body text-base text-mocha-500">
            Tell us a little about what you&rsquo;re looking for and we&rsquo;ll
            take care of the rest.
          </p>
        </Reveal>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setSubmitting(true);

            const form = e.currentTarget;
            const formData = new FormData(form);

            try {
              const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  service,
                  addOns,
                  date: formData.get("date"),
                  time,
                  notes: formData.get("notes"),
                }),
              });

              if (!res.ok) {
                throw new Error("Request failed");
              }

              setDone(true);
            } catch {
              setError("Something went wrong sending your request. Please try again or call us directly.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Reveal delay={0.2} className="mt-[30px] grid grid-cols-1 gap-x-5 gap-y-[18px] sm:grid-cols-2">
            <Input name="name" label="Full name" placeholder="Your name" required />
            <Input name="email" label="Email" type="email" placeholder="you@email.com" required />
            <Input name="phone" label="Phone" type="tel" placeholder="(555) 000-0000" required />
            <Select
              label="Service"
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setAddOns((prev) => prev.filter((a) => a !== e.target.value));
              }}
              options={BOOKING_SERVICE_OPTIONS}
            />
            <Input name="date" label="Preferred date" type="date" required />
            <Select
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              options={BOOKING_TIME_OPTIONS}
            />
            <div className="sm:col-span-2">
              <CheckboxPills
                label="Additional services (optional)"
                options={BOOKING_SERVICE_OPTIONS.filter((o) => o !== service)}
                selected={addOns}
                onChange={setAddOns}
              />
            </div>
            <div className="sm:col-span-2">
              <Textarea name="notes" label="Anything we should know?" rows={3} placeholder="Allergies, preferences, occasion…" />
            </div>
          </Reveal>
          {error && (
            <p className="mt-4 font-body text-sm text-[#b8625a]">{error}</p>
          )}
          <Reveal delay={0.3} className="mt-[26px]">
            <Button type="submit" variant="primary" size="lg" icon="↗" disabled={submitting}>
              {submitting ? "Sending…" : "Request appointment"}
            </Button>
          </Reveal>
        </form>
      </div>

      <Reveal delay={0.15} className="overflow-hidden rounded-[20px] border border-cream-400 bg-white shadow-[var(--shadow-sm)] lg:sticky lg:top-24">
        <div className="relative h-[170px]">
          <Image src="/images/booking.jpg" alt="Studio" fill sizes="360px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-3.5 px-6 py-[22px] pb-[26px]">
          <span className="font-display text-xl font-semibold text-mocha-900">Your visit</span>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-mocha-400">Service</span>
            <Badge variant="gold">{service}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-mocha-400">Time</span>
            <span className="font-body text-sm font-semibold text-mocha-800">{time}</span>
          </div>
          {addOns.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-body text-sm text-mocha-400">Add-ons</span>
              <div className="flex flex-wrap gap-1.5">
                {addOns.map((a) => (
                  <Badge key={a} variant="soft">{a}</Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 border-t border-black/[0.08] pt-3.5">
            <span className="font-body text-[13px] text-mocha-400">The Lumière promise</span>
            <p className="m-0 font-body text-sm text-mocha-500">
              A calming, elevated experience — relax, recharge, and leave
              glowing.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
