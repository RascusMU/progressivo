# Progressivo.eu

> **Strategická platforma Progressivo Corp.**
> Postaveno na filozofii "Paper & Ink" – klid, typografie, důvěra.
> *Verze: 2.2 FINAL GOLD COMPLETE EDITION*

Toto úložiště obsahuje zdrojový kód webu [progressivo.eu](https://progressivo.eu), postaveného na frameworku **Astro 5** s důrazem na absolutní výkon, bezpečnost a typografický design.

---

## 🎨 Filozofie Designu "Paper & Ink"

Web není jen digitální vizitka, ale **digitální artefakt**. Designový systém se vyhýbá běžným trendům (modré barvy, SaaS dashboardy) a místo toho sází na:

*   **Typografie > Grafika:** Použití fontů *Manrope* a *Plus Jakarta Sans* (a *Caveat* pro osobní tón).
*   **Amber Accent (#d97706):** Teplá, důvěryhodná barva, která neagresivně vede pozornost.
*   **Calm Tech:** Žádné blikající bannery. Animace jsou plynulé ("underwater weight"), prvky dýchají.
*   **Floating Dock:** Odvážná navigace umístěná dole (thumb-friendly), která nahrazuje tradiční header.
*   **Temný režim (Cyberpunk/Monochrome):** Interaktivní "baterka" na kartách služeb a monochromatická Amber sekce zakladatele.

## 🛠️ Technický Stack

Projekt je navržen jako "Future-Proof" s minimem závislostí.

*   **Core:** [Astro 5.0](https://astro.build) (Static Site Generation - SSG).
*   **Jazyk:** TypeScript (Strict Mode), Vanilla JavaScript (žádný React/Vue na klientovi).
*   **Styling:** Vanilla CSS + CSS Variables (žádný Tailwind, žádný Bootstrap).
*   **Hosting:** Cloudflare Pages (Adapter `mode: 'directory'`).
*   **AI:** Google Gemini API (pro AI Business Advisora).
*   **Formuláře:** Formspree (AJAX submission).
*   **Analytics:** Cloudflare Web Analytics + Microsoft Clarity (Privacy-first, bez cookies).

## 🚀 Klíčové Funkce

### 1. AI Business Advisor
Komponenta `AiAdvisor.astro` využívá Google Gemini API pro poskytování kontextuálních rad.
*   Funguje zcela client-side.
*   Využívá rate-limiting a zamykání požadavků.
*   Odpovědi jsou streamované a stylované do designu webu.

### 2. Pokročilá Internacionalizace (i18n)
Web podporuje 5 jazyků: **CS (Master), EN, DE, RU, ES**.
*   **Logika:** Custom implementace v `src/i18n/utils.ts`.
*   **Routing:** Výchozí jazyk (`cs`) je na rootu (např. `/sluzby/`), ostatní mají prefix (`/en/services/`).
*   **Data:** Veškeré UI texty jsou centralizované v `src/i18n/ui.ts`.
*   **Obsah:** Synchronizovaný 1:1 s českým masterem.

### 3. Floating Dock & Navigace
*   Umístěn dole (`bottom: env(safe-area-inset-bottom)`).
*   Obsahuje: Home, O nás, Blog, WhatsApp.
*   Inteligentní skrývání při scrollu a "dýchání" pro upoutání pozornosti.

### 4. Editorial Time Signal
*   Zobrazuje živý čas ve 4 světových metropolích.
*   Používá `tabular-nums` pro zabránění poskakování textu.
*   Vizuálně odděluje Hero sekci od obsahu.

## 📂 Struktura Projektu

```text
/
├── public/              # Statické soubory (obrázky, fonts, _headers)
├── src/
│   ├── components/      # Astro komponenty (FloatingDock, AiAdvisor, Footer...)
│   ├── content/         # Content Collections (Markdown/MDX)
│   │   ├── blog/        # Články (plochá struktura s příponami -en.md, atd.)
│   │   ├── services/    # Služby (vnořené složky dle jazyka)
│   │   ├── pages/       # Textové stránky (O nás, Kontakt)
│   │   └── legal/       # Právní dokumenty (GDPR, Terms)
│   ├── i18n/            # Logika překladů a texty
│   │   ├── ui.ts        # Slovník UI textů
│   │   └── utils.ts     # Pomocné funkce pro routing
│   ├── layouts/         # Layout.astro (hlavní obálka)
│   └── pages/           # Routování
│       ├── [lang]/      # Dynamické routy pro cizí jazyky
│       └── index.astro  # Homepage (CS)
└── astro.config.mjs     # Konfigurace projektu
```

## 💻 Instalace a Vývoj

### Požadavky
*   Node.js (v18+)
*   npm

### Příkazy

```bash
# Instalace závislostí
npm install

# Spuštění lokálního vývojového serveru
npm run dev

# Build pro produkci (do složky dist/)
npm run build

# Náhled buildu (simulace produkce)
npm run preview
```

### Proměnné Prostředí (.env)
Pro plnou funkčnost (hlavně AI Advisora) vytvořte soubor `.env`:

```ini
PUBLIC_GEMINI_API_KEY=vase_api_klic_z_google_ai_studia
```

## ✍️ Správa Obsahu

### Přidání Služby
1.  Vytvořte nový `.md` soubor v `src/content/services/`.
2.  Pro cizí jazyky použijte odpovídající podsložku (např. `src/content/services/en/`).
3.  Dodržujte schéma frontmatter (definováno v `src/content/config.ts`).

### Přidání Blog Postu
1.  Vytvořte soubor v `src/content/blog/`.
2.  **Čeština:** `nazev-clanku.md`
3.  **Jazyky:** `nazev-clanku-en.md`, `nazev-clanku-de.md`, atd.
4.  Ujistěte se, že `lang` ve frontmatteru odpovídá příponě.

## 🔒 Security & Privacy

Tento web dodržuje přísné bezpečnostní a privacy standardy:
*   **CSP (Content Security Policy):** Striktně nastaveno v `public/_headers`.
*   **Žádné Cookies:** Web nepoužívá marketingové cookies ani trackery.
*   **GDPR:** Plně compliant bez nutnosti cookie lišty (pouze technické LocalStorage).
*   **Ochrana Kontaktů:** E-maily a telefony jsou chráněny CSS (`user-select: none`) proti scrapování.

## 🌍 Deployment

Web je nasazen na **Cloudflare Pages**.
*   Build command: `npm run build`
*   Output directory: `dist`
*   Node.js version: Nastaveno na kompatibilní verzi (v Environment Variables v Cloudflare).

---

> **Poznámka pro vývojáře:** Před každým commitem zkontrolujte, zda jste neporušili integritu designu ("Paper & Ink"). Nepřidávejte zbytečné knihovny. Udržujte kód čistý.

*Dokumentace aktualizována: Leden 2026*
