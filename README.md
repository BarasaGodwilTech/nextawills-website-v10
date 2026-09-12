# Nextawills Technologies Website

A practical IT-services site — system development, website design, hosting & VPS,
business automation, IT support, and domains — built as static HTML/CSS/JS
(no build step required).

## Before you launch — action items

1. **WhatsApp number.** The floating WhatsApp button (bottom-right, every page),
   the WhatsApp link on the Contact page, and the WhatsApp line in every
   page's footer contact block all currently point to the placeholder
   `+256 700 000 000`. Replace `256700000000` in `js/main.js`
   (`initWhatsAppButton`), `pages/contact.html`, and the `footer__contact`
   block repeated in every page's `<footer>` before going live.
2. **Contact form.** The form currently opens a pre-filled `mailto:` to
   `hello@nextawills.com`. Swap this for a real backend/form endpoint
   (`initContactForm` in `js/main.js`) when one is available.
3. **Domain.** Meta tags, canonical URLs and the sitemap assume
   `https://www.nextawills.com/`. Update if the live domain differs.
4. **Brand links.** The "Our Brands" cards on the homepage (Will's Tech
   Store and NextaStore) are shown as logo + description only, with no
   outbound link, since no live URL was supplied. Once those sites are
   live, turn `.brand-card` back into an `<a>` in `index.html` pointing at
   the real domain.

## Latest pass — hero rewrite, Font Awesome, brands & clients, Mbale

- **Font Awesome 6** (via cdnjs) is now loaded on every page and used for
  the service-card icons, the theme toggle, the hero scroll cue, hero
  button/pill icons, and the new footer contact icons — replacing the
  old Unicode glyph icons (⌘ ▣ ↺ etc.).
- **Homepage hero rewritten**: sharper headline and copy, icons added to
  the CTA buttons and proof pills.
- **A new floating "back to top" button** appears on every page once you
  scroll down, positioned directly above the WhatsApp button (see
  `initBackToTop` in `js/main.js` and `.back-to-top` in `styles.css`).
- **Location switched from Kampala to Mbale** across every page (nav
  status pill, footer, meta tags). The nav clock still uses the
  `Africa/Kampala` IANA timezone identifier internally — that's the only
  valid zone id for Uganda and still returns the correct Mbale time, only
  the *displayed* city label changed.
- **A 7th service, "Internet Services,"** was added to the homepage and
  services page grids, with matching footer links.
- **Two new homepage sections**: "Our Brands" (Will's Tech Store and
  NextaStore, using the logos in `assets/brands/`) and "Some of the
  people we've worked with" (client logos in `assets/clients/` — GPCO,
  Wampewo Green Pasture Primary School, and Green Pasture Sec. & Voc.
  School).
- **Footer overhaul**: every page's footer now has a contact block with
  WhatsApp, email and location (with icons), plus new links to Internet
  Services and to the homepage's Brands & Clients section.

## Hero redesign (latest pass)

- **Every interior page hero was rebuilt** from a flat text-only block into
  a two-column layout: headline + a real call-to-action pair on the left,
  and a highlight panel on the right (decorated with the same orbit-ring
  motif as the homepage) that surfaces 3–4 facts pulled straight from that
  page's own content — nothing invented.
- On **FAQ** and **Pricing**, that panel doubles as real jump navigation
  (Getting started / Billing / Reliability / Software; Hosting / Domains /
  Websites & Systems) — anchors were added to the matching sections so
  those links actually work.
- Every interior hero now has a primary CTA (mostly → Contact, or a
  WhatsApp link on Support/Contact) plus a secondary link that jumps
  further down the same page.
- The **homepage hero** got a subtle radial glow behind the video panel,
  an animated scroll cue at the bottom (hidden on mobile), and the "Web
  design / System development / IT services" pills were swapped for
  actual differentiators already stated elsewhere on the site (flat
  renewal pricing, round-the-clock monitoring, 1-business-day reply).

## What's in this refresh

- **Dark theme is now the default** for every visitor. Theme is applied
  before first paint (an inline snippet in each page's `<head>` reads the
  saved preference or falls back to dark), so there's no flash of the wrong
  theme. The toggle in the nav remembers the visitor's choice via
  `localStorage`.
- **Every section and form was audited for dark-mode contrast.** A few
  components (the contact form, the WhatsApp/email contact cards, the 404
  diagnostic panel, the timeline markers) had hardcoded white/light
  backgrounds that turned unreadable in dark mode — all now use the shared
  theme variables, including a dedicated `--input-bg` token for form fields.
- **The custom cursor from the original build is back** — a small dot with a
  trailing ring that swells over links, buttons, and cards — rebuilt to
  respect the current accent color in both themes, and skipped automatically
  on touch devices and for people who prefer reduced motion.
- **A WhatsApp button now floats on every page**, generated once from
  `js/main.js` rather than hand-copied into each HTML file, so it can never
  drift out of sync across pages.
- **404.html was fully rebuilt** — it had been left behind on the old font
  stack and color variables from an earlier version and didn't match the
  rest of the site.
- **Navigation polish:** the current page is now highlighted in the primary
  nav, a thin scroll-progress bar tracks reading position, and a skip-to-
  content link was added for keyboard/screen-reader users.
- **SEO/sharing polish:** canonical links, Open Graph, and Twitter Card tags
  were added to every page (previously missing), using each page's own
  title/description so links shared on social or WhatsApp show a proper
  preview card.
- **Small delight, kept subtle:** primary buttons have a gentle magnetic
  pull toward the cursor on fine-pointer devices, matching the original
  build's interaction style — always off for touch and reduced-motion.

## Structure

```
index.html
404.html
css/styles.css       — single stylesheet; theme tokens + dark overrides live at the bottom
js/main.js            — single script; every page loads the same file
pages/*.html           — interior pages (services, pricing, process, about, contact, hosting, domains, help, faq, studio)
assets/                — favicon, hero video
```

No build tools, bundlers or frameworks — edit the HTML/CSS/JS directly and
re-upload.
