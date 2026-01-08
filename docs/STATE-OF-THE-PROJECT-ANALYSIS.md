# STATE OF THE PROJECT – PROGRESSIVO.EU
## Technical Analysis by Jules

### 1. REPOSITORY STRUCTURE
The project follows a standard Astro architecture with a clear separation of concerns.

```
/
├── .github/                # GitHub Actions workflows (if any)
├── .vscode/                # VS Code settings
├── .wrangler/              # Cloudflare Wrangler cache/config
├── public/                 # Static assets (images, robots.txt, _headers)
│   ├── images/             # All visual assets (WebP, JPG, SVG, PNG)
│   ├── _headers            # Cloudflare security headers
│   └── robots.txt          # Crawler instructions
├── src/                    # Source code
│   ├── components/         # Reusable Astro components (UI)
│   ├── content/            # Content Collections (Markdown + Config)
│   │   ├── blog/           # Blog posts (flat structure)
│   │   ├── legal/          # Legal documents (GDPR, Terms)
│   │   ├── pages/          # Static pages content (Contact, etc.)
│   │   ├── services/       # Service descriptions (nested glob)
│   │   └── config.ts       # Zod schemas for collections
│   ├── i18n/               # Internationalization logic
│   │   ├── about.ts        # Structured data for About page
│   │   ├── ui.ts           # UI translations (Nav, Buttons, Meta)
│   │   └── utils.ts        # Routing helpers (getTranslatedPath)
│   ├── layouts/            # Page wrappers (Layout.astro)
│   └── pages/              # File-based routing
│       ├── [lang]/         # Dynamic localized routes
│       ├── blog/           # Blog index (default CS)
│       ├── index.astro     # Homepage (default CS)
│       ├── kontakt.astro   # Contact page (default CS)
│       └── ...             # Other root pages (o-nas, legal)
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

### 2. TECHNICAL ARCHITECTURE

*   **Framework:** Astro 5.16.6
*   **Rendering Model:** Static Site Generation (SSG) with `output: 'static'` (Hybrid behavior in Astro 5). The site is built to static HTML/CSS/JS.
*   **Adapter:** `@astrojs/cloudflare` with `mode: 'directory'`. This ensures a purely static deployment suitable for Cloudflare Pages.
*   **Routing:** File-based routing.
    *   **Root:** `src/pages/*.astro` handles the default language (Czech).
    *   **Localized:** `src/pages/[lang]/*.astro` handles EN, DE, ES, RU via dynamic params.
*   **Content Collections:** Used for `services`, `blog`, `pages`, and `legal`.
    *   **Services:** Loaded via glob from `src/content/services`. Frontmatter includes title, description, lang, image.
    *   **Blog:** Flat collection in `src/content/blog`.
    *   **Validation:** Zod schemas in `src/content/config.ts`.
*   **Internationalization (i18n):**
    *   **Strategy:** Custom implementation (Option B pattern).
    *   **Routing:** `src/i18n/utils.ts` exports `getTranslatedPath` which enforces `/` for CS and `/[lang]/` for others, with a special exception for services (`/cs/sluzby/` vs `/[lang]/sluzby/`).
    *   **UI Text:** `src/i18n/ui.ts` contains a large object dictionary for all interface text.
*   **Theming:**
    *   **CSS Variables:** Defined in `src/layouts/Layout.astro` under `:root` and `:root.dark`.
    *   **Storage:** `localStorage.getItem('theme')`.
    *   **Script:** Inline script in `<head>` prevents Flash of Incorrect Theme (FOUC).
    *   **Toggle:** `Header.astro` handles the UI toggle logic.
*   **Build Pipeline:**
    *   `npm run build` runs `astro build`.
    *   Types are checked via `tsc` (implied by `astro check`).
*   **TypeScript:** Strict mode enabled via `astro/tsconfigs/strict`.

### 3. COMPONENTS ANALYSIS

#### **`Header.astro`**
*   **Purpose:** Top navigation bar containing Logo, Language Switcher, and Theme Toggle.
*   **Props:** `lang` (string, default 'cs').
*   **Behavior:**
    *   **Sticky/Hidden:** Fixed position, fades out on scroll down (`.scrolled-down` class).
    *   **Logo:** Switches between SVG (light) and PNG (dark) via CSS visibility.
    *   **Language Switcher:** Custom dropdown. Uses `getTranslatedPath` to generate links preserving the current depth.
    *   **Theme Toggle:** Toggles `.dark` class on `<html>` and updates `localStorage`.
*   **Dependencies:** `ui.ts`, `utils.ts`.

#### **`Footer.astro`**
*   **Purpose:** Site footer containing Founder Medallion, Navigation columns, and Copyright.
*   **Props:** `lang` (string).
*   **Structure:**
    *   **Founder Medallion:** Image of Jaroslav Cingel + Quote + Email link.
    *   **Fat Footer:** 3 columns (Navigace, Sit & Ekosystem, Duvera & Legal).
    *   **Easter Egg:** "DomiToo" item with a hidden hit area (`.domitoo-hit`).
*   **Client-side JS:** Implements the DomiToo easter egg logic (double click / long press).

#### **`FloatingDock.astro`**
*   **Purpose:** Primary Navigation (replacing header nav). Floating capsule at the bottom.
*   **Props:** `lang` (string).
*   **Items:** Home (Anchor), About Us, Blog, WhatsApp.
*   **Behavior:**
    *   **Position:** Fixed at bottom `calc(1rem + env(safe-area-inset-bottom))`.
    *   **Scroll:** Scales down (`scale(0.98)`) and lowers opacity when scrolling down.
    *   **Home Button:** Smooth scrolls to top if already on homepage.
    *   **Active State:** Highlights current page via `aria-current` based on URL matching.

#### **`ContactForm.astro`**
*   **Purpose:** Simple HTML form for inquiries.
*   **Props:** `lang` (string).
*   **Mechanism:** `action="mailto:info@progressivo.eu"`, `method="post"`, `enctype="text/plain"`.
*   **Styling:** Glassmorphic background (`rgba(255,255,255,0.5)`).

#### **`EditorialTimeSignal.astro`**
*   **Purpose:** Visual "Masthead" element showing global reach.
*   **Props:** None.
*   **Features:**
    *   **Timezones:** Panama, Prague, London, Moscow.
    *   **Live Clock:** Client-side JS updates time every minute (`data-tz` attribute).
    *   **Heartbeat:** CSS animation on a separator line.
    *   **Layout:** "Editorial" typography, responsive stacking.

#### **`FounderAudioPlayer.astro`**
*   **Purpose:** Audio player for the Founder's intro.
*   **Props:** `src` (string), `buttonText`, `disclaimerText`.
*   **Behavior:**
    *   Custom UI (Play/Pause, Progress Bar).
    *   `HTMLAudioElement` logic wrapped in a class.
    *   **View Transitions:** Uses a global flag `_audioPlayerInit` to prevent double binding.

### 4. PAGES ANALYSIS

#### **Homepage (`index.astro`, `[lang]/index.astro`)**
*   **URL:** `/` (CS), `/[lang]/` (Others).
*   **Layout:** `Layout.astro`.
*   **Sections:**
    1.  **Editorial Hero:** Massive H1, "Collaborate" text link.
    2.  **Time Signal:** Global clocks.
    3.  **Founder:** Text column + "Paper/Cut-out" image with unroll animation.
    4.  **Services:** Grid of 8 services using `service-card`.
*   **Specifics:**
    *   Sorts services by a hardcoded `desiredOrder`.
    *   Implements 3D tilt effect on service cards (Desktop only).
    *   Founder image uses `IntersectionObserver` for "unroll" effect.

#### **Contact (`kontakt.astro`, `[lang]/kontakt.astro`)**
*   **URL:** `/kontakt` (CS), `/[lang]/contact`.
*   **Layout:** Two-column grid (Info vs. Form).
*   **Features:**
    *   **Protected Data:** Phone/Email are `user-select: none`.
    *   **Map:** Click-to-load Google Maps iframe (Privacy friendly).
    *   **FAQ:** Accordion below main content using `<details>`.

#### **Services Details (`[lang]/sluzby/[slug].astro`)**
*   Note: While file structure lists `src/pages/[lang]/`, the analysis assumes a unified dynamic route handles service details based on the `services` collection content.
*   **Routing:** `/cs/sluzby/[slug]` and `/[lang]/sluzby/[slug]`.

#### **Legal & Other Pages**
*   **Files:** `gdpr.astro`, `obchodni-podminky.astro`, etc.
*   **Content:** Rendered from `legal` collection via `.prose` class for typography.

### 5. CONTENT STRUCTURE

*   **Services Collection:**
    *   **Schema:** `title`, `description`, `lang`, `image` (optional).
    *   **Files:** 8 core services (analyza-dna, efektivni-integrace, it-podpora, expatriace-viza, nemovitosti, preklady, prodej-techniky, online-kurzy).
    *   **Translations:** Handled via file prefixes or folders (e.g., `en/service.md`).
*   **Blog Collection:**
    *   **Schema:** `title`, `date`, `description`, `lang`.
*   **Pages Collection:**
    *   Used for structured text on Contact pages.

### 6. i18n SYSTEM

*   **Source of Truth:** `src/i18n/ui.ts` contains all UI strings for 5 languages.
*   **Routing Helper:** `getTranslatedPath(path, lang)` in `src/i18n/utils.ts`.
    *   **Logic:**
        *   CS (default) -> `/path` (No prefix), **EXCEPT** `/sluzby/` -> `/cs/sluzby/`.
        *   Others -> `/[lang]/path`.
*   **URL Parsing:** `getLangFromUrl` and `getPathFromUrl` help switchers maintain context.
*   **Hreflangs:** Generated in `Layout.astro` by iterating over supported languages and calling `getTranslatedPath`.

### 7. DESIGN SYSTEM

*   **Typography:**
    *   **Headings:** 'Plus Jakarta Sans' (Weights: 500, 600, 700, 800).
    *   **Body:** 'Manrope' (Weights: 400, 500, 600).
    *   **Hero H1:** `clamp(3.5rem, 11vw, 9rem)`, `text-wrap: balance`.
*   **Colors (CSS Variables):**
    *   **Light:** Bg `#f5f5f4`, Text `#0f172a`, Accent `#d97706`.
    *   **Dark:** Bg `#0f172a`, Text `#f8fafc`, Accent `#d97706` (brighter context).
    *   **Paper:** `#fcfbf9` (Light mode cards).
*   **Texture:**
    *   Global SVG Noise filter on `body::before` (`opacity: 0.05`).
*   **Effects:**
    *   **Glassmorphism:** `backdrop-filter: blur(12px)` on Cards, Header, Dock.
    *   **Shadows:** Warm, toned shadows in light mode (`rgba(120, 113, 108, 0.08)`).
    *   **Radius:** `1rem` (16px) generally, `9999px` for pills.

### 8. VISUAL COMPONENTS

*   **Hero:** Minimalist. No image background. Just massive text and a text-based CTA.
*   **Founder Image:** "Magazine Cut-out" look. Rotated (-2deg) initially, unrolls to 0deg on scroll. Mask gradient creates a "appearing from paper" effect.
*   **Time Signal:**
    *   Monospaced numbers (`tabular-nums`) to prevent jitter.
    *   Amber heartbeat line (`animation: heartbeat 1.5s`).
*   **Service Grid:**
    *   3 columns.
    *   Hover: Lift (`translateY(-5px)`), deep shadow, amber border, slight image zoom.
    *   Dark Mode: Spotlight effect tracking mouse cursor.
*   **Floating Dock:**
    *   Capsule shape.
    *   Glassy background.
    *   Icons: Home, WhatsApp (Green).
    *   Text: "O nás", "Blog".
*   **Google Maps:**
    *   Grayscale filter (`grayscale(100%) invert(0.9)`).
    *   Click-to-load placeholder to respect privacy.

### 9. IMAGES & MEDIA

*   **Location:** `public/images/`.
*   **Formats:** Predominantly WebP, some PNG/JPG fallbacks, SVG for logos.
*   **Key Assets:**
    *   `tatka-pise.webp` (Founder) - 44KB.
    *   `mapa-svetabusines.webp` (Default Service) - 245KB.
    *   `Transparent Logo.svg` (Light Logo).
    *   `Transparent-Logo-tmave.png` (Dark Logo).
*   **Optimization:** `srcset` is used in Service cards (400w, 800w, 1200w).
*   **Loading:** First 2 service images `loading="eager"`, rest `lazy`.

### 10. PERFORMANCE

*   **Fonts:** Preconnected to `fonts.googleapis.com`.
*   **Rendering:** Static HTML (Fast TTFB).
*   **CLS:** Time Signal uses `tabular-nums` and fixed height. Images have explicit `width/height`.
*   **LCP:** Hero text is text-only (very fast). First images eager loaded.
*   **Scripts:** Most logic is deferred to `astro:page-load` or specific interactions (Maps).

### 11. SEO & META

*   **Tags:** Title, Description, Viewport, Generator, Canonical, Hreflang, OG Tags.
*   **Schema.org:** JSON-LD for `Organization` and `WebSite`.
*   **Sitemap:** Generated via `@astrojs/sitemap`.
*   **Robots.txt:** Allows general crawlers, explicitly blocks AI bots (GPTBot, CCBot, etc.).

### 12. SECURITY

*   **Headers (`public/_headers`):**
    *   `Content-Security-Policy`: Default self, scripts self/inline, styles self/inline/google.
    *   `HSTS`: Max-age 1 year, preload.
    *   `X-Content-Type-Options`: nosniff.
    *   `Permissions-Policy`: geo/mic/camera disabled.
*   **Privacy:** Map iframe uses `referrerpolicy='no-referrer-when-downgrade'`.

### 13. GDPR & PRIVACY

*   **Cookies:** No marketing cookies. LocalStorage used for `theme`.
*   **External Services:**
    *   Google Maps: Blocked until user click.
    *   Fonts: Google Fonts (Preconnect).
*   **Form:** Uses `mailto:`, so data processing happens in user's email client, not on server.

### 14. DEPLOYMENT

*   **Platform:** Cloudflare Pages.
*   **Command:** `npm run build` -> `astro build`.
*   **Output:** Static directory (`dist/`).
*   **Config:** `mode: 'directory'` in Cloudflare adapter.

### 15. DEPENDENCIES

*   **astro:** ^5.16.6 (Core).
*   **@astrojs/cloudflare:** ^12.6.12 (Adapter).
*   **@astrojs/sitemap:** ^3.6.0 (SEO).
*   **sharp:** ^0.34.5 (Image optimization).
*   **typescript:** ^5.9.3 (Dev).

### 16. JAVASCRIPT

*   **Type:** Vanilla JS inside `.astro` script tags.
*   **Execution:**
    *   `is:inline` for Theme initialization (Critical).
    *   `document.addEventListener('astro:page-load', ...)` for View Transitions compatibility.
*   **Features:**
    *   Theme toggling.
    *   Language switcher dropdown.
    *   Floating Dock scroll detection.
    *   Time Signal clock.
    *   Founder Image observer.
    *   Audio Player class.
    *   3D Tilt effect.

### 17. ACCESSIBILITY

*   **HTML:** Semantic `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`.
*   **ARIA:** `aria-label` on buttons (Theme, Language, Dock). `aria-current` in Dock.
*   **Contrast:** Dark text on Light bg / Light text on Dark bg.
*   **Motion:** `prefers-reduced-motion` queries disable animations (Hero fade, Heartbeat, Dock zoom).

### 18. UX PATTERNS

*   **Navigation:** Floating Dock allows easy thumb access on mobile.
*   **Feedback:** Hover states on all interactive elements (Amber accent).
*   **States:**
    *   Founder Image: Waiting -> Visible.
    *   Audio Player: Play -> Pause -> Progress.
*   **Protection:** Contact info is protected from copy-paste to reduce spam/scraping.

### 19. CONTENT & COPY

*   **Tone:** "Paper & Ink" – Professional, Editorial, Calm, Confident.
*   **Master Language:** Czech (cs).
*   **Translations:** Full UI localization.
*   **Philosophy:** "The world isn't complex. Just poorly explained."

### 20. SPECIAL FEATURES

*   **DomiToo Easter Egg:** Hidden hit area on "DomiToo" in footer. Double-click (Desktop) or Long-press (Mobile) redirects to secret project.
*   **Heartbeat Line:** Pulsing amber line in Time Signal.
*   **Audio Intro:** Accessible audio version of the founder's story.
*   **Dark Mode Spotlight:** Cyberpunk-style flashlight effect on service cards.

### SUMMARY
- Total files analyzed: 60+
- Total components: 6 Core UI Components
- Total pages: 8 Services x 5 Languages + Core Pages
- Languages: CS, EN, ES, DE, RU
