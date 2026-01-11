# Progressivo.eu

> **Strategická platforma Progressivo Corp.**
> Postaveno na filozofii "Paper & Ink" – klid, typografie, důvěra.
> *Verze: 3.1 FINAL GOLD + AI ADVISOR COMPLETE + JULES AUDIT*

Toto úložiště obsahuje zdrojový kód webu [progressivo.eu](https://progressivo.eu), postaveného na frameworku **Astro 5** s důrazem na absolutní výkon, bezpečnost a typografický design.

---

## 🎨 Filozofie Designu "Paper & Ink"

Web není jen digitální vizitka, ale **digitální artefakt**. Designový systém se vyhýbá běžným trendům (modré barvy, SaaS dashboardy) a místo toho sází na:

*   **Typografie > Grafika:** Použití fontů *Manrope* a *Plus Jakarta Sans* (a *Caveat* pro osobní tón).
*   **Amber Accent (#d97706):** Teplá, důvěryhodná barva, která neagresivně vede pozornost.
*   **Calm Tech:** Žádné blikající bannery. Animace jsou plynulé ("underwater weight"), prvky dýchají.
*   **Floating Dock:** Odvážná navigace umístěná dole (thumb-friendly), která nahrazuje tradiční header.
*   **Temný režim (Cyberpunk/Monochrome):** Interaktivní "baterka" na kartách služeb a monochromatická Amber sekce zakladatele.
*   **Editorial Time Signal:** Živý čas ve světových metropolích jako vizuální masthead.

## 🛠️ Technický Stack

Projekt je navržen jako "Future-Proof" s minimem závislostí.

*   **Core:** [Astro 5](https://astro.build) (Static Site Generation).
*   **Deployment:** Cloudflare Pages (Static Output + Cloudflare Functions pro API).
*   **Jazyk:** JavaScript / TypeScript (Strict Mode).
*   **Styling:** Vanilla CSS + CSS Variables (Scoped & Global). **Žádný Tailwind.**
*   **AI:** Google Gemini API (model `gemini-flash-latest`) via Server-side Proxy.
*   **I18n:** Custom routing systém (5 jazyků: CS, EN, DE, RU, ES).
*   **Assets:** Self-hosted fonty (`@fontsource`), optimalizované obrázky (`astro:assets`).

## 🚀 Klíčové Funkce

### 1. AI Business Advisor
Inteligentní chatovací asistent (`AiAdvisor.astro`) v pravém dolním rohu.
*   **Architektura:** Hybridní. UI je client-side, ale komunikace s Gemini API probíhá přes zabezpečenou server-side proxy (`functions/api/ask-ai.js`).
*   **Funkce:** Rate-limiting (10s), detekce jazyka, kontextuální doporučování služeb pomocí kotev (např. `#sluzby/analyza-dna`).
*   **Bezpečnost:** API klíč je skrytý na serveru, klient k němu nemá přístup.

### 2. Pokročilá Internacionalizace (i18n)
Web plně podporuje **CS (Master), EN, DE, RU, ES**.
*   **Logika:** Centralizovaná v `src/i18n/utils.ts` (funkce `getTranslatedPath`).
*   **Routing:** Výchozí jazyk (`cs`) je na rootu, ostatní mají prefix (např. `/en/services/`).
*   **UI Texty:** Všechny texty rozhraní jsou v `src/i18n/ui.ts`.

### 3. Floating Dock
Hlavní navigační prvek nahrazující klasické menu.
*   Umístěn dole (`bottom: env(safe-area-inset-bottom)`) pro snadné ovládání na mobilu.
*   Obsahuje: Home/Top (kotva), O nás, Blog, WhatsApp.
*   Vizuálně reaguje na scroll (zmenšení/průhlednost).

## 📂 Struktura Projektu

```text
/
├── functions/           # Cloudflare Pages Functions (Server-side API)
│   └── api/
│       └── ask-ai.js    # Proxy pro Google Gemini API
├── public/              # Statické soubory (_headers, _routes.json, images)
├── src/
│   ├── components/      # Astro komponenty (AiAdvisor, FloatingDock...)
│   ├── content/         # Content Collections (Markdown)
│   │   ├── blog/        # Články (plochá struktura s příponami -en.md)
│   │   ├── services/    # Služby (vnořené složky dle jazyka)
│   │   ├── pages/       # Statické stránky (O nás, Kontakt)
│   │   └── legal/       # Právní dokumenty
│   ├── i18n/            # Logika překladů
│   └── pages/           # Souborový routing
│       ├── [lang]/      # Dynamické routy pro cizí jazyky
│       └── index.astro  # Homepage (CS)
└── astro.config.mjs     # Konfigurace Astro (Static output)
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
# Pozn: AI Advisor nebude fungovat bez nastaveného proxy/env v dev módu
npm run dev

# Build pro produkci (do složky dist/)
npm run build

# Náhled buildu
npm run preview
```

### Proměnné Prostředí (Environment Variables)
Pro funkčnost AI Advisora je nutné nastavit proměnnou prostředí v administraci Cloudflare Pages (Settings -> Environment variables).

*   `GEMINI_API_KEY`: Váš API klíč z Google AI Studia.

> **Pozor:** Klíč se NEZADÁVÁ do klientského `.env` souboru, protože je používán pouze na serveru (v `functions/`).

## ✍️ Správa Obsahu

### Přidání Služby
1.  Vytvořte `.md` soubor v `src/content/services/`.
2.  Pro cizí jazyky použijte odpovídající podsložku (např. `src/content/services/en/`).
3.  Frontmatter musí obsahovat `title`, `description` a `lang`.

### Přidání Blog Postu
1.  Vytvořte soubor v `src/content/blog/`.
2.  Pojmenování: `nazev-clanku.md` (CS), `nazev-clanku-en.md` (EN).
3.  Systém automaticky filtruje články podle jazyka stránky.

## 🔒 Security & Privacy

*   **CSP:** Nastaveno v `public/_headers`. Povoluje pouze `self`, `data:` a nezbytné analytiky.
*   **Žádné Cookies:** Web nepoužívá marketingové cookies. LocalStorage slouží pouze pro preference (téma).
*   **Ochrana:** API endpointy jsou chráněny CORS politikou a rate-limity.

---

> **Poznámka:** Tento projekt nepoužívá React, Vue ani Svelte. Veškerá interaktivita je řešena pomocí Vanilla JS a Astro View Transitions.

*Dokumentace aktualizována: Únor 2026 (Jules)*
