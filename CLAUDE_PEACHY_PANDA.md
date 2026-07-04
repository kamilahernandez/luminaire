# Project Overview — Peachy Panda

Peachy Panda is **Kamila's agency** — the business that sells the beauty
studio booking websites (see the separate `beauty-studio-saas` project) to
real beauty businesses (lash studios, hair salons, nail artists, spas).

**This repo is NOT the beauty studio product itself.** It's the marketing
and lead-capture layer that sells that product. Keep this as a separate
repo with its own Supabase instance — do not connect it to the shared
client-booking backend unless the user explicitly asks for that later (that
would be a deliberate future step, once there's revenue to justify the
extra complexity).

## Current status

**Not started yet.** This is planning-stage only. Build order (see the
`beauty-studio-saas` CLAUDE.md for full context) is:

1. Lumière's backend live (booking capture + instant emails)
2. Delayed automations (reminders + review requests) via Make
3. More client templates (hair, nail, spa)
4. **Then** Peachy Panda — this project

Do not start building Peachy Panda before the above are done, unless the
user explicitly says priorities have changed.

## What Peachy Panda needs to do (MVP scope)

**Marketing only for now** — no client dashboard, no login system, no
billing automation. Keep it simple.

1. **Marketing/landing page** explaining the service (what it is, who it's
   for, why a beauty business would want one).
2. **Application form** for prospective clients to fill out. Should
   capture at minimum: business name, contact email/phone, business type
   (lash / hair / nail / spa — determines which template gets used),
   preferred domain name.
3. That's it for MVP. No payment integration, no dashboard.

## Client acquisition flow (manual for now, by design)

1. Prospect fills out the application form on the Peachy Panda site.
2. Kamila (working in a `beauty-studio-saas` Claude session) has Claude
   generate a draft site using the template matching their business type,
   customized with whatever branding info the prospect provided.
3. Kamila has a touchpoint call/video call with the prospect to walk
   through the draft and confirm they're happy with it.
4. Prospect pays a **flat one-time setup fee of $400**, via **Venmo** —
   no Stripe or other payment processor needed for this MVP. Payment
   happens *after* the draft is approved, not through the website.
5. Once paid, the site gets finalized and deployed as a real client under
   `beauty-studio-saas`.

## Explicitly deferred / not in scope yet

- **Lead-scraping system** to find prospective clients automatically —
  planned as a follow-up *after* the landing page and application form
  exist. Don't build this preemptively.
- **Client dashboard** (so Kamila can see all her clients, billing status,
  etc. in one place) — a "nice to have" for later, once there's enough
  volume to justify it.
- **Stripe/automated billing** — not needed while payment is manual via
  Venmo.
- **Connecting to the beauty-studio-saas backend** — keep fully separate
  for now. Revisit only when there's a concrete reason (e.g. wanting
  Peachy Panda to auto-provision a new client site end-to-end).

## Tech stack

Same general conventions as the rest of Kamila's projects, unless she says
otherwise when we actually start building:
- Next.js (App Router) + TypeScript, Tailwind CSS
- Supabase — its own small, separate project (just for storing leads/
  applications, not booking data)
- Vercel for hosting

## Coding practices (same as Lumière / beauty-studio-saas)

- Explain things in plain English — the user is not a professional
  developer. No unexplained jargon.
- Test before saying "done" — run the build, start the dev server, check
  for console errors, verify manually in the browser.
- Don't over-engineer — this is a lead-gen marketing site, not a product.
  Build exactly what's described above, nothing more, until asked.
- Ask before deleting/renaming files, and before any destructive or
  hard-to-reverse action.
- One change at a time; don't refactor unrelated code while doing a task.
