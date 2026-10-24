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

## v10 pass — portfolio, SEO clean-up, visual content

- **New page: `pages/portfolio.html`** (nav + footer + sitemap). It shows the two products you build and run
  (Will's Tech Store, NextaStore) as project cards, the client logos, and four illustrated "starting point" tiles.
  The homepage "Our own brands" block now uses the same project cards with a "See all our work" link.
  The covers are stylised device illustrations (made in code), **not real screenshots** — to use a real one,
  put an `<img>` inside `.work-card__media` in place of the `<svg class="work-art">`.
  To add a project, copy one `<article class="work-card">` (see `work_card` markup in `portfolio.html`).
- **SEO**: every page has a unique, keyword-first title (<= 60 chars) and a unique description (120-160 chars);
  Open Graph / Twitter tags are rebuilt on every page with a proper 1200x630 share image
  (`assets/og/og-default.jpg`) instead of the old video poster; JSON-LD added (organisation + website on the
  homepage, breadcrumbs on every inner page, FAQ markup on the FAQ page); canonical URLs everywhere; the 404 is
  `noindex`; the sitemap gained the portfolio and `lastmod` dates. Phone number is deliberately NOT in the
  structured data while it is still a placeholder.
- **Visual content**: an illustration at the top of every inner-page hero card (animated, light/dark aware),
  a layered-stack diagram on the homepage (replaces the 01-04 strip; hover a row to light up its layer),
  project covers, and a looping video reel on the portfolio page (`assets/video/reel.mp4`, silent, plays only
  while visible, has a pause button, and shows the poster for visitors who prefer reduced motion).
- Housekeeping: the old `hero-core.mp4` was replaced by the silent `reel.mp4`; six nav links now fit down to
  801px (the nav button hides between 801-960px).

## v9 pass — site-wide layout polish (CSS only, see the "v9" block in `css/styles.css`)

- **One left/right edge**: nav, hero, section headings, cards and footer now line up (the nav
  and hero used to sit ~40px off the rest of the page on desktop).
- **Headings** no longer wrap into 3–4 short lines; the clients heading is truly centred.
- **Services grid** is 3 + 4 cards instead of 6 + one orphan; the "01–04" strip is now a quiet
  pillar band (numbers are small amber markers, the labels are the headline).
- **FAQ** is two columns on desktop (heading left, questions right) on the homepage, FAQ page
  and contact page. **Timelines** (About, Process) run across the page on desktop.
- **Rhythm**: sections alternate between page and raised backgrounds (interior pages and the
  homepage process / FAQ blocks), and light-theme cards get a soft shadow for depth.
- Fixed the CTA-band headline line height and a hard-edged glow behind the homepage FAQ.

## v8 pass — new mobile menu, nav polish, interior page heroes

- **Mobile menu rebuilt** (`initNavToggle` in `js/main.js`, "v8" block in `css/styles.css`):
  the hamburger is now a 44px button that animates into an X; the menu is a floating panel
  with large tap targets, the current page highlighted, a **Get started** button, WhatsApp /
  email shortcuts and the support-hours line. It dims the page behind it, locks background
  scroll, and closes on Esc, outside tap, link tap, or when the window grows to desktop.
  The menu footer is built in JS from each page's existing nav/footer links, so **no HTML
  needed editing** (and the WhatsApp number only has to be changed in the places listed above).
- **Desktop nav**: pill hover/active states, a solid "Get started" button, and a soft shadow
  once the page scrolls.
- **Interior page heroes** (all 10 pages, CSS only): breadcrumb and page label restyled so they
  no longer compete, smaller balanced headline, faint grid texture, and the highlight panel is
  now a card with an accent top edge, check-mark rows and (on FAQ / Pricing) arrow links.
  On phones the buttons go full-width and the heroes are noticeably shorter.
- **Small touches**: in-page jump links no longer hide under the sticky nav, balanced headline
  line breaks, 46px minimum button height, and the CTA bands pick up the orbit motif.

## v7 pass — mobile hero fix, readable text, two-row footer, theme contrast

- **Mobile hero was wider than the screen.** The hero grid used `1fr` and the brand
  marquee inside it is `width:max-content`, so the column stretched to ~580px and the
  headline, lede and status card were clipped on the right. Fixed with
  `minmax(0,1fr)` + `min-width:0` (see section 1 at the bottom of `css/styles.css`).
- **Type floor.** Labels, tags, eyebrows, footer and form text were 9–11px. Nothing
  readable is now under 11.5px (labels 12px+) and running text is 14px+. Form inputs
  are 16px on phones so iOS doesn't zoom on focus.
- **Footer on phones/tablets** now lays the link columns out in two rows: Services |
  Company, then Start here as tappable chips. Extra bottom padding keeps the floating
  WhatsApp / back-to-top buttons off the copyright line. Desktop is unchanged.
- **Theme contrast.** Every page was checked against WCAG AA in both themes; fixed the
  invisible "See pricing first" link on the CTA band, the console label/typing line,
  and CTA-band paragraph text. `--ink-dim` / `--ink-faint` were darkened (light) and
  lightened (dark) for the same reason.
- Lone third client logo is centred on the 2-column mobile grid.

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
