# Project Specs — Lumière Website

## What it is
A production Next.js marketing website for **Lumière**, a luxury lash & beauty
studio (real business: Princess Touch Beauty Center, 54 Cummings Park, Woburn MA).
Ported from a supplied Claude Design system (`Lumière Design System/`) — tokens,
components, and a full HTML/JSX UI kit — into a real, typed, Tailwind-based
Next.js app with GSAP animation throughout. Public marketing site, no auth.

## Who uses it
Prospective and returning studio clients browsing services, pricing, and the
studio story, and booking an appointment. No admin/dashboard — out of scope.

## Tech stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS, extended with the design system's exact tokens
  (colors, type, radius, shadow) as CSS variables imported globally
- **Animation:** GSAP + ScrollTrigger (scroll-scrubbed canvas image sequences,
  scroll-triggered reveals) + Lenis (smooth scroll, pairs with ScrollTrigger)
- **Data / auth:** Supabase (Postgres + RLS) for storing bookings. No user
  accounts/login for anyone — the studio owner confirms bookings via a
  one-time secure link in email, not a dashboard. See "Booking Backend"
  section below for the full design.
- **Email:** Resend — sends every email in the booking flow.
- **Deployment:** Vercel, with a scheduled Cron Job for reminder/review
  emails.

## Pages
- **`/`** — Cinematic scroll homepage. Full-bleed canvas-scrubbed image
  sequences (Act I: lash close-ups, Act II: facial glow), masked text reveals,
  "Rituals" service list, Instagram strip, Audre Lorde philosophy quote band,
  auto-scrolling client testimonials, dark-mocha pricing accordion, studio
  location/hours, glass finale CTA. This is the heaviest animation surface.
- **`/services`** — Full priced menu: Facials, Eyelash Extensions, Eyebrow
  Shaping, Laser Hair Removal (IPL), Beauty Bundles. Alternating image/menu
  bands, scroll-reveal per section.
- **`/about`** — Studio philosophy quote, "Why Choose Us" pillars, Brazilian
  Classic lash method (before/after), founder Gil's bio.
- **`/booking`** — Two-column booking form (service/date/time picker) with a
  sticky summary card. Submits to a local "request received" confirmation
  state — no backend call.

`/services`, `/about`, `/booking` share a standard chrome (announcement ticker
+ sticky nav + footer). `/` has its own full-bleed cinematic nav, matching the
source design's split between the "cinematic front door" and the "functional
site."

## Data
All content (services, prices, testimonials, studio hours/address, bundle
packages) is static TypeScript data in `/lib/data/*` — no database. This
mirrors the source design exactly (real Princess Touch menu/pricing).

## Assets
Photography + the 2 cinematic frame sequences (76 JPGs total) copied from the
design system into `/public`, served via `next/image` (auto-optimized) for
photography and raw `<img>`/canvas draws for the frame-sequence scrubbing
(canvas needs raw decoded images, not Next's image loader). Raw source videos,
uploads/, slides/, and scraps/ are not copied — unused by the site.

## Booking Backend

Lumière is the proof-of-concept for Peachy Panda's shared multi-tenant
backend (see `CLAUDE_BEAUTY_STUDIO_SAAS.md`). Tables are built with a
`client_id` from day one so future studios can share this same backend, even
though only Lumière exists as a client right now.

### Flow
1. Customer submits the booking form → saved to Supabase as `pending` →
   instant email to the studio (`beautysolutionstech@gmail.com`) with
   **Confirm** / **Decline** buttons.
2. Studio owner clicks one (no login — each link is a unique one-time token
   tied to that booking):
   - **Confirm** → status → `confirmed`. Customer and studio both get a
     confirmation email with a `.ics` calendar file attached (opens in
     Google Calendar, Apple Calendar, Outlook — no account connection
     needed).
   - **Decline** → status → `declined`. No automatic email to the customer —
     the studio follows up with them directly for now.
3. **48 hours before** the appointment → automatic reminder email to the
   customer (Vercel Cron, checks Supabase on a schedule).
4. **1 hour after** the appointment → automatic "please leave a review"
   email to the customer, linking to a placeholder Google review link
   (no real business listing yet — swap in the real link later).

Not built yet, deferred on purpose: SMS reminders, real-time availability
blocking (the studio owner just checks her own calendar before confirming),
and repeat-customer tracking. All can be added later without reworking this.

### Data model
- **`clients`** — `id`, `name`, `notification_email`, `timezone`,
  `review_link`, `created_at`. One row for Lumière now; more rows as more
  studios onboard.
- **`bookings`** — `id`, `client_id` (FK), `customer_name`,
  `customer_email`, `customer_phone`, `service`, `appointment_at`
  (timestamptz), `duration_minutes` (default `60`), `notes`, `status`
  (`pending` / `confirmed` / `declined`), `confirm_token` (unique, random),
  `reminder_sent_at`, `review_sent_at`, `created_at`.

### Accounts / services
- **Supabase** — a **new, dedicated project** for this backend (not reusing
  or mixing tables into any other project already in the account). SQL to
  create the tables lives in `/supabase/schema.sql`, run once in the
  Supabase SQL editor.
- **Resend** — new account needed (none exists yet); free tier is enough
  for now.
- **Vercel** — Lumière isn't deployed yet. Plan is to deploy to the free
  auto-generated `*.vercel.app` URL first (no domain purchase required to
  make the flow work); a custom domain can be connected later with no
  rework.
- **Notification email:** `beautysolutionstech@gmail.com` (all instant,
  reminder, and review emails reference this as the studio contact for now).
- **Timezone:** US Eastern, for all appointment times, reminders, and
  calendar invites.

### Environment variables (`.env.local`)
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (server-only), `RESEND_API_KEY`,
`STUDIO_NOTIFICATION_EMAIL`, `SITE_URL` (the deployed URL, used to build
confirm/decline links and calendar invites), `CRON_SECRET` (so only Vercel's
scheduler can trigger the reminder route, not the open internet).

### New files/routes
- `app/api/bookings/route.ts` — creates a booking, emails the studio
- `app/api/bookings/confirm/route.ts` — marks confirmed, emails both parties
  with `.ics` attached
- `app/api/bookings/decline/route.ts` — marks declined
- `app/api/cron/reminders/route.ts` — run by Vercel Cron; sends 48-hr
  reminders and 1-hr-after review requests
- `lib/supabase/server.ts` — server-side Supabase client
- `lib/email/` — Resend send functions + `.ics` file generator
- `supabase/schema.sql` — table creation SQL
- `vercel.json` — cron schedule

### Flagged — domain now a real blocker, not just cosmetic
- **Confirmed by testing:** without a verified custom domain in Resend, it
  will only deliver to the email address that signed up for the Resend
  account (`beautysolutionstech@gmail.com`) — every send to an actual
  customer address is rejected. This means customer confirmation, reminder,
  and review emails **cannot work for real customers** until a domain is
  bought and verified in Resend. Studio-facing notification emails work
  fine already since they go to the Resend account's own address.
- **Confirmed by deploying:** Vercel's free "Hobby" plan only allows Cron
  Jobs to run once per day, not hourly. Resolved by switching
  `vercel.json` to run once daily at 13:00 UTC (~8-9am Eastern depending on
  daylight saving). The 48-hour reminder is unaffected; the "leave a
  review" email (meant to go out 1 hour after the appointment) may now go
  out later the same day instead of exactly 1 hour after, depending on
  when in the day the appointment was.

## What "done" looks like
- `npm run build` succeeds with no TypeScript errors
- `npm run dev` runs with no console errors
- All 4 routes render with the correct content, images, and copy from the
  design system
- GSAP-driven scroll animations run smoothly on `/`: canvas sequences scrub
  with scroll, text reveals fire once per section, marquees loop
- Reduced-motion / small-viewport users get the static fallback (no canvas
  scrubbing) — matches source design's accessibility behavior
- Booking form saves a real row to Supabase (no more local-only state)
- Studio gets a notification email with working Confirm/Decline links
- Confirming sends both parties a confirmation email with a working
  calendar attachment; declining marks the booking declined cleanly
- Verified manually end-to-end in the browser, not just build/typecheck
