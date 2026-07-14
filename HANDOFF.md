# Handoff — Peachy Panda Beauty Studio SaaS

Paste this at the start of a new chat (or drop this file into a new client
project's folder) so Claude has the essentials without re-discovering them.

## What exists today
- **Lumière** (this repo) is live at https://lumiare-template.vercel.app —
  the first client and the reference implementation for the pattern below.
- **Shared backend:** one Supabase project (tables `clients` and `bookings`,
  RLS on with no public policies) and one Resend account, both working.
- **Booking flow:** customer submits form → saved to Supabase → studio
  emails a Confirm/Decline link → confirming sends the customer + studio a
  calendar-invite email → Vercel Cron checks once daily for 48-hour-before
  reminders and 1-hour-after review requests.

## ⚠️ Uncommitted work — read this first
A large frontend session just happened locally. **Nothing from it is
committed or deployed.** `git status` shows ~24 changed/new files; the last
real commit is `96eb074`. Before building more, either commit this work or
confirm with Kamila what should happen to it first (she hasn't asked for a
commit or push yet).

## What was just built (local only, not in production)
- **Services page:** two new "browse treatments" horizontal carousels
  (Facials, Lash Sets) below their sections — arrow-controlled, auto-fills
  the row when there are few items or scrolls when there are many. Hero
  retitled "Spa Services" → "Beauty Services", copy resized to fit.
- **Newsletter popup:** a "GET 10% OFF" side tab + modal. Auto-opens once
  per browser session; also opens from the top Instagram ticker. UI only —
  no email is actually captured/stored anywhere yet.
- **Cookie banner + legal pages:** bottom-left banner (appears only after
  the newsletter popup is dismissed; choice stored permanently in
  localStorage) + `/privacy-policy`, `/cookie-policy`,
  `/terms-and-conditions` — footer-only links, not in main nav.
- **About page:** "The Brazilian Classic" section moved to below the
  "Hi there, I'm Gil" founder section (was above it).
- **New `/deals` page**, added to main nav: Beauty Bundles moved here
  verbatim from Services (no longer on Services); plus Refer a Friend /
  Post & Save / Gift Cards / First-Visit-Offer sections in an alternating
  two-column split layout with placeholder imagery; plus an FAQ accordion.

## Known gotchas — don't re-debug these
- Resend is sandboxed — customer-facing emails don't deliver until a
  custom domain is verified. Studio notifications work fine already.
- Vercel Hobby plan only runs Cron once a day (`vercel.json`: `0 13 * * *`).
- `~/Desktop` syncs to iCloud, which corrupts `.git`/`.next` mid-write —
  fixed via `xattr -w com.apple.fileprovider.ignore#P 1` on `.git`,
  `.next`, `node_modules`. Do this for any new project folder too.
- Resend SDK returns `{ data, error }` instead of throwing — always check
  `.error`.
- IDE diagnostics shown immediately after an Edit can be stale (fired
  mid-way through a multi-edit sequence) — re-Read the file or run
  `npx tsc --noEmit` before trusting one.

## What's next
Decide what to do with the uncommitted work above. After that: Kamila
still wants more client templates (hair salon, nail studio, spa) on this
same shared backend — new row in `clients`, not a new Supabase project.

## Where the full detail lives
`project_specs.md` and `CLAUDE_BEAUTY_STUDIO_SAAS.md` in this repo have the
complete architecture and every decision made along the way.
