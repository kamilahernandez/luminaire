# Lumière — Content & Structure Inventory

This is a snapshot of everything on the site that isn't code: copy, data,
photos, and the design tokens that drive the look. Purpose: give a future
"new client template" session everything it needs without having to re-read
this whole codebase — and to make clear what's **Lumière-specific** (swap
per client) versus **reusable pattern** (keep as-is).

---

## 1. What to swap vs. what to keep

**Swap per client (branding layer):**
- `app/globals.css` — the entire color palette, fonts, shadows, radii live
  in ~50 lines of CSS variables (see §7). This is the single biggest lever
  for making a new template look different with minimal work.
- `lib/data/studio.ts` — name, address, phone, Instagram handle, hours,
  map coordinates.
- `components/core/Logo.tsx` — wordmark text ("LUMIÈRE") + script tagline
  ("lash & beauty studio").
- `app/layout.tsx` — page `<title>`/description, Google Fonts imports.
- About page founder bio ("Hi there, I'm Gil...") and the Brazilian Classic
  section (studio-specific service story).
- Footer copyright line, legal page studio name references.

**Keep as-is (structural pattern, proven to work):**
- Every component under `components/` — cards, carousels, the booking
  form, dropdowns, reveal animations. None of it is Lumière-specific code.
- The data-shape pattern in `lib/data/services.ts` (groups → rows →
  bundles → treatments) — just refill with a new service menu.
- Page structure/section order on Home, Services, Deals, About, Booking.
- The actual photos (per your instruction — same main photos, new brand
  wrapper around them).

---

## 2. Brand fundamentals

| | |
|---|---|
| Name | Lumière |
| Tagline | "lash & beauty studio" (script accent under wordmark) |
| Hero line | "Beauty That Feels Like You" |
| Script accent phrase | "naturally radiant" |
| Voice | Warm, elevated, calm — short declarative sentences, occasional French-inflected flourish ("merci"), never salesy or exclamation-heavy |
| Studio promise (booking page) | "A calming, elevated experience — relax, recharge, and leave glowing." |
| Founder | Gil, licensed esthetician, "Princess Touch Aesthetics" |

**Studio record** (`lib/data/studio.ts`):
- Address: 54 Cummings Park, Woburn, MA 01801
- Phone: (857) 353-1849
- Instagram: @princesstouchbeauty
- Hours: Closed Monday; Tue–Fri 9–7; Sat 9–5; Sun 10–3

---

## 3. Site map

`/` Home · `/services` · `/deals` · `/about` · `/booking` (nav label "Contact") · `/privacy-policy` · `/cookie-policy` · `/terms-and-conditions`

---

## 4. Page-by-page content

### Home (`app/(site)/page.tsx`)
Section order: Hero → Instagram strip → Intro → Services (3-card) → Testimonials → Pricing → Location.

- **Hero:** "naturally radiant" / "Beauty That Feels Like You" / "Luxury lashes, brows, facials, and laser treatments designed to enhance your natural features and leave you feeling effortlessly confident." Buttons: "Book your appointment", "View services". Floating badge: "real clients, real results". 8-photo parallax collage (labels: lashes, brows, facials).
- **Instagram strip:** "Follow Along" / handle / "Follow us on Instagram ↗" button, 6-photo grid.
- **Intro:** "Personalized beauty in a space designed for you" — two paragraphs about personalized care and the range of services. "More about us" button. Inline Visit Us + Hours summary.
- **Services (3 cards):** Facials (from $70, badge "Most loved"), Eyelash Extensions (from $100), Laser Hair Removal · IPL (from $80) — each with title/price/description, see §5 for full text.
- **Testimonials:** "Kind Words" / "What Our Clients Say" — scrolling marquee carousel, see §6.
- **Pricing:** "Enhance your natural beauty" / "A glimpse of our menu — see all services for the full list." Accordion preview of Facials/Lashes/Brows/Laser pricing. Buttons: "Book your appointment", "See full menu".
- **Location:** "Visit the studio" / "Tucked into Cummings Park in Woburn — easy to find, easy to relax." Embedded map + address/phone/hours card.

### Services (`app/(site)/services/page.tsx`)
Hero: "our menu" / "Beauty Services" / "From glowing facials to expert lash artistry, every service is thoughtfully designed to help you look refreshed, radiant, and confident."

Four `CategorySection` blocks (alternating image side, every other one on dark `mocha-700` background): **Facials** ("Skin & Glow" / "Targeted treatments for radiant, healthy-looking skin.") → **Eyelash Extensions** ("Lash Artistry" / "Custom sets to lengthen and define, with easy maintenance.") → **Eyebrow Shaping** ("Frame Your Features" / "Define your natural arch with precise shaping and henna.") → **Laser Hair Removal · IPL** ("Smooth & Confident" / "Intense Pulsed Light treatments for lasting, smooth skin.").

Two treatment-carousel sections interleaved (real photos, see §8):
- "Know Your Skin" / "A Closer Look at Our Facials" / "Browse each treatment to understand what it does and find the right fit for you." — 9 facial treatment cards.
- "Find Your Set" / "A Closer Look at Our Lash Sets" / "Browse each set to understand what it offers and find the right fit for you." — 3 lash set cards (Classic/Hybrid/Mega Volume, each with a tagline).

Full price menu data: see §5.

### Deals (`app/(site)/deals/page.tsx`)
Hero: "Lumière Perks" / "Deals" / "Exclusive offers, thoughtful gifts, and curated beauty experiences designed to help you save on your favourite services."

- **Beauty Bundles** (4 cards, moved here from Services) — see §5.
- **Refer a Friend** — "Share Lumière" / "Invite a friend to experience Lumière and receive 10% off your next service when they book their first appointment." CTA emails a pre-filled referral message. Note: "One discount per referral. Cannot be combined with other promotions."
- **Post & Save** — "Share Your Glow" / "Tag us in your results or beauty routine on Instagram and receive 10% off your next service." Handle shown. Note: "One reward redemption per visit."
- **Give the Gift of Self-Care** — "Gift Lumière" / "Share a little luxury with someone special. Lumière gift cards are available in any amount and can be redeemed toward any service." CTA emails a gift card inquiry.
- **Enjoy 10% Off Your First Visit** — "New Clients" / "Join the Lumière List for beauty tips, exclusive offers, and studio updates delivered occasionally to your inbox." CTA opens the newsletter modal.
- **FAQ** (4 items, see §9).

### About (`app/(site)/about/page.tsx`)
- **Quote banner** (dark section): "Our top priority is to make you feel cared for, confident and beautiful."
- **Why Choose Us** — "Experienced beauty professionals you can trust" / "With 10+ years in the beauty industry, we're here to help you feel comfortable, cared for, and confident in your results." Four numbered pillars: Experienced Professionals, Clean & Professional Standards, Warm & Personalized Care, Quality You Can Trust (full body text in source file).
- **Founder** — "Hi there, I'm Gil" — three paragraphs (esthetician background, the "sanctuary not just a spa" philosophy, the Brazilian Lash Extension Technique). Signed "— Gil". Studio-specific; will need a full rewrite per client.
- **The Brazilian Classic** — "Lashes you'll love in under an hour" — five bullet points (60-min full sets, customized styling, lightweight lashes, seamless application, natural-lash-protecting technique) + Before/After photo pair.

### Booking (`app/(site)/booking/page.tsx` → `BookingForm.tsx`)
"Reserve Your Visit" / "Book your appointment" / "Tell us a little about what you're looking for and we'll take care of the rest." Fields: name, email, phone, service (dropdown), date, time, additional services (grouped checkbox dropdown), notes. Sidebar "Your visit" summary card with "The Lumière promise" blurb. Confirmation screen: "merci" / "Your appointment is requested" / confirmation copy.

### Legal pages
Structure only (full legal text is generic boilerplate, safe to regenerate per client with the new studio name swapped in):
- **Privacy Policy:** Information We Collect, How We Use Information, Cookies, Third-Party Services, Data Security, Marketing Communications, Contact Information.
- **Cookie Policy:** What Are Cookies, How We Use Cookies, Managing Cookies, Contact.
- **Terms & Conditions:** Appointments, Cancellations, Late Arrivals, Refund Policy, Results Disclaimer, Promotions & Discounts.

---

## 5. Service menu data (`lib/data/services.ts`)

**Facials** — Signature Facial $80 · Facial with LED Light Therapy $100 · Hydra Gloss Lips Treatment $70 · Dermaplaning $100 · Image Skincare Peel $120 · Rose de Mer Peel $150 · Microneedling $150 · Geneo Facial $120 · Hydrafacial with LED Light Therapy $175.

**Lashes** — Full Set: Classic $100 · Hybrid $120 · Mega Volume $150. Maintenance (every 15 days): Classic $50 · Hybrid $60 · Mega Volume $70.

**Brows** — Eyebrow Shaping $25 · Eyebrow Shaping with Henna $35.

**Laser** — IPL Treatment $150 · Full Body $300 · Full Legs $120 · Arms $100 · Bikini Area $100 · Underarms $80.

**Bundles** — Glow & Define $195 (featured) · Smooth & Clean $175 · Geneo Glow $215 · Peel & Perfect $185 (each bundles 3 services at a value discount — see source for line items).

**Facial treatment descriptions** (used in the "Closer Look" carousel) and **lash set descriptions/taglines** — full text already captured in the CategorySection/TreatmentCarousel content above; see `lib/data/services.ts` `FACIAL_TREATMENTS` / `LASH_TREATMENTS` for verbatim copy if rewriting.

---

## 6. Testimonials (`lib/data/testimonials.ts`)

5 reviews — Kamila Hernandez (Eyelash Extensions), Sofia R. (Signature Facial), Aaliyah M. (Hydrafacial), Daniela P. (Geneo Glow Bundle), Mia C. (Laser Hair Removal). Full quotes in source file.

---

## 7. Design tokens (`app/globals.css`)

Current palette — "warm-luxury: cream/ivory canvas, espresso-mocha ink, champagne gold accent, blush rose":

- Cream/Sand: `#fdfbf7` → `#ddcfba` (5 steps)
- Espresso/Mocha: `#2a2018` → `#b9aea0` (7 steps)
- Champagne Gold: `#9a7b4f` → `#e6d3b3` (4 steps)
- Blush Rose: `#cf9a8a` → `#f3e2da` (3 steps)

Fonts: **Playfair Display** (display/headings), **Poppins** (body), **Pinyon Script** (cursive accents like "naturally radiant", "merci", "— Gil").

Shadows/radii are also tokenized (xs→2xl radius scale, xs→lg + gold shadow scale) — a new template can keep the same *system* (radius scale, shadow scale, motion easing) and only swap the color values and fonts for a completely different feel with almost no component changes.

---

## 8. Photo inventory (`public/images/`)

**Reusable across templates (per your note — same main photos):**
- `treatment-facial-*.jpg` (9) — facial treatment carousel photos
- `treatment-lash-*.jpg` (3) — lash set carousel photos
- `deals-*.jpg` (4) — Refer a Friend / Post & Save / Self-Care / First-Visit
- `service-*.jpg` (4) — Home services cards + Services page category heroes
- `hero-collage-*.jpg` (8) — homepage hero collage
- `instagram-*.jpg` (6) — homepage Instagram strip
- `pricing-collage-v2.jpg` — homepage pricing section
- `about.jpg`, `booking.jpg` — generic studio/interior shots

**Lumière/studio-specific (likely swap or drop for a different real client):**
- `about-founder-gil.jpg` — Gil's photo
- `about-brazilian-before/after.jpg` — Brazilian Classic technique demo

Each `.jpg` has a matching full-resolution `.png` original alongside it (same base name) — that's the established pattern for this project; keep it when adding new photos.

---

## 9. Deals page FAQ (`app/(site)/deals/page.tsx`)

1. "Can promotions be combined?" → "Promotions cannot be combined unless otherwise stated."
2. "Do gift cards expire?" → "Gift cards never expire."
3. "How do referral rewards work?" → "Receive 10% off your next service after your referral completes their first appointment."
4. "How do I redeem my Instagram reward?" → "Tag @lumierestudio in your post or story and mention it during your next visit." *(note: handle here doesn't match the real `@princesstouchbeauty` in `studio.ts` — pre-existing inconsistency, worth fixing whenever this is touched next)*

---

## 10. Marketing popups

- **Newsletter modal:** "Register and get 10% Off Any Service" / "Beauty tips • Exclusive offers • Early access to promotions" / "Join our mailing list and enjoy 10% off your first service..." Two required consent checkboxes (promo emails, privacy/cookie ack). Success state: "merci" / "You're on the list".
- **Announcement bar (ticker):** "Follow us on Instagram for 10% off your first service" — clicking opens the newsletter modal.
- **Cookie banner:** "Cookies & Privacy" — appears after the newsletter modal is dismissed, links to Privacy/Cookie policy, Accept All / Continue Without Accepting.
