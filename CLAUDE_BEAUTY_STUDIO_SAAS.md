# Project Overview — Beauty Studio SaaS

This is a **multi-tenant booking website product** for beauty businesses (lash
studios, hair salons, nail artists, spas). Kamila (the user) runs an agency —
**Peachy Panda** — that sells these sites to individual businesses. Each
business gets its own branded website, but they all share one backend.

**This repo is NOT Peachy Panda.** Peachy Panda is the agency/marketing site
that sells this product — it lives in a separate repo with its own
`CLAUDE.md` (`CLAUDE_PEACHY_PANDA.md`). Do not merge them or share a Supabase
instance between the two unless the user explicitly asks for that later.

## Current status (update this section as things progress)

- **Lumière** (a lash & beauty studio site) is the first real client and the
  reference implementation. Frontend is built, mobile-optimized, and
  performance-tuned (see its own project history/specs for that work).
- **The shared backend is live and tested locally, not deployed yet.**
  Supabase project created (dedicated to this backend), schema applied,
  Resend account created. Booking form saves real rows, sends the studio a
  notification email with Confirm/Decline links, confirming sends a
  calendar-invite email to both parties, declining marks the row cleanly
  with no auto-email. RLS confirmed locking out the public anon key.
  Verified end-to-end with `npm run dev` — not yet deployed to Vercel, so
  everything so far only works on localhost. Reminder (48h) and review
  (1h-after) emails are coded but not yet verified against a real future
  appointment — Vercel Cron isn't live until deployment happens.
- No other client templates (hair, nail, spa) exist yet — only the lash
  template (Lumière).

## Build priority (in order — do not skip ahead)

1. **Get Lumière's backend live first**, as the proof of concept:
   - Booking form saves to Supabase
   - Instant confirmation email to the customer
   - Instant notification email to the studio owner
2. **Wire up the delayed automations** (Make): appointment reminders and
   post-appointment review requests (details below).
3. **Build out more templates** (hair salon, nail artist, spa) once Lumière's
   pattern is proven.
4. **Only then** start on Peachy Panda (the agency/marketing site).

## Who uses this

- **Beauty business owners** (studio owners) — each gets a live site with
  their own branding and domain. They do **not** log into anything for MVP.
  They just receive email notifications. A login/dashboard is a future
  nice-to-have, not required now.
- **Their customers** — book appointments through the site, receive
  confirmation/reminder/review-request emails.
- **Kamila** — builds and manages all client sites and the shared backend.

## Architecture: one shared backend, many frontends

Each client (Lumière, and future clients) gets:
- Their own cloned/customized Next.js frontend
- Their own custom domain
- Their own Vercel deployment

All clients share:
- **One Supabase project** (all client data lives in the same tables, kept
  separate via a `client_id` column + Row-Level Security — not via separate
  database instances)
- **One set of API routes** (handles form submissions for every client,
  keyed by `client_id`)
- **One Make workflow** (checks `client_id` on each booking, routes the
  right email to the right studio and its customers)
- **One Resend account** (sends all transactional email across all clients)

**No client login system for MVP.** Data isolation is handled entirely by
Supabase RLS rules keyed on `client_id` — studio owners never need
credentials, they just get emailed. Only build a login/dashboard if a client
specifically asks for one later.

### Suggested repo structure (not yet created — plan for when we restructure)

```
/templates          → clean, unbranded starting points (lash, hair, nail, spa)
                       never deployed live — staging/reference only
/clients            → live, customer-branded clones (lumiere/, etc.)
                       each deploys independently to its own Vercel project + domain
/backend            → shared API routes, Supabase setup notes, Make workflow notes
/docs               → onboarding checklist, this file, etc.
```

Scale note: one shared Supabase + Make setup comfortably supports 30–50
clients before any technical limit is hit (Supabase storage, Vercel function
volume, Make/Resend free-tier operation counts). Splitting clients onto
separate backends is a *business* decision (e.g. a client wants a custom
dashboard, custom domain-level isolation, or separate billing) — not
something to do preemptively.

## Tech stack

- **Framework:** Next.js (App Router) + TypeScript, Tailwind CSS — same
  conventions as the existing Lumière build
- **Database:** Supabase (Postgres + RLS), one shared project across all
  clients
- **Email:** Resend (chosen for cost — generous free tier, simple API)
- **Delayed/conditional automation:** Make (watches Supabase, triggers
  reminder and review-request emails on a schedule — see below)
- **Hosting:** Vercel, one project per client, each with its own domain

Kept deliberately simple/cheap for now — no Stripe, no SMS provider account,
no client dashboard, no multi-instance database. Add these only when a real
client need (or revenue) justifies the added complexity/cost.

## Core data model (high level — exact schema TBD, not written yet)

- `clients` — one row per beauty business (name, contact email, branding
  info, etc.)
- `bookings` — one row per appointment request, tagged with `client_id`.
  Needs: customer name/email/phone, service, appointment date + time, status
  (pending/completed/cancelled), notes.
- `customers` — one row per unique customer (so studio owners can see how
  many times a given customer has booked — this was explicitly requested).

**Database schema and account setup steps are intentionally not written yet**
— the user wants to talk through the exact table structure and account
creation (Supabase/Vercel/Resend/Make) in a future session before building.
Don't invent a final schema without checking in first.

## Automations required

All service appointments are assumed to be **1 hour long** for MVP timing
purposes (no per-service duration table yet).

1. **Instant, on form submit** (must be synchronous, in the Next.js API
   route — cannot be delayed):
   - Save the booking to Supabase, tagged with the client's `client_id`
   - Email the customer an instant confirmation
   - Email the studio owner an instant new-booking notification
2. **Review request** — sent **1 hour after the appointment's booked time**
   (not after form submission — after the appointment itself), asking the
   customer for a Google review. Handled via Make watching Supabase.
3. **Appointment reminder** — customer requested both email and SMS
   reminders. **Open decision, not yet resolved:** exact timing (default
   assumption discussed was 24 hours before the appointment) and whether SMS
   ships in the Lumière MVP or is Phase 2 (SMS needs a Twilio account +
   per-message cost, which cuts against the "keep it as cheap as possible"
   priority — confirm with the user before building this part).
4. **Studio owners can see repeat-customer counts.** Mechanism not decided
   yet (could be a simple query/report, or a lightweight dashboard later).
5. **Birthday/promo emails and texts** — explicitly **not a priority**,
   deferred indefinitely until the core booking + review-request flow is
   live and working.

## Client onboarding process (once backend exists)

1. Pick the matching template (lash / hair / nail / spa) based on the
   business type.
2. Clone it into `/clients/[client-name]/`.
3. Customize branding: logo, colors, business name, content, images.
4. Add a row for them in the shared `clients` Supabase table.
5. Deploy to Vercel with their custom domain.

## Coding practices (carried over from Lumière's existing rules — still apply)

- Explain things in plain English — the user is not a professional
  developer. No unexplained jargon.
- Test before saying "done" — run the build, start the dev server, check
  for console errors, verify manually in the browser. Never claim success
  without checking.
- Don't over-engineer — build exactly what's needed for the current client
  count, not speculative infrastructure for 500 clients.
- Ask before deleting/renaming files, and before any destructive or
  hard-to-reverse action.
- One change at a time; don't refactor unrelated code while doing a task.
- Never expose Supabase `service_role` key client-side; always use RLS.
