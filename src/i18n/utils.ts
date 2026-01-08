import { ui, defaultLang } from './ui';

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

/**
 * Generates a localized path for the given language.
 *
 * Rules:
 * - Default lang (cs): Returns path as is (e.g. '/' -> '/', '/kontakt' -> '/kontakt'),
 *   EXCEPT for '/sluzby/' paths which are routed via /[lang]/sluzby/ even for cs.
 * - Other langs: Prefixes with /lang (e.g. '/' -> '/en/', '/kontakt' -> '/en/kontakt').
 *
 * @param path The path to translate (must start with /). E.g. '/', '/o-nas', '/sluzby/bagr'.
 * @param lang The target language code.
 * @returns The localized path.
 */
export function getTranslatedPath(path: string, lang: string): string {
    // Ensure path starts with /
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    // Handle anchors (return as is, but prefixed if needed for context? No, usually anchors are relative)
    // But if we are switching languages, we might want the anchor on the new page.
    // The previous getLink implementation handled anchors by prepending the lang path if not CS.
    // Let's assume input 'path' here is the pathname, not including hash, OR we handle hash if passed.
    // Based on previous code: if path starts with #, it returns /#... or /lang/#...
    if (path.startsWith('/#')) {
        // It was passed as /#services
        const hash = path.substring(1); // #services
        if (lang === defaultLang) {
            return '/' + hash;
        } else {
            return `/${lang}/${hash}`;
        }
    }

    const isDefaultLang = lang === defaultLang;

    // Special case for Service Details
    // Logic derived from Layout.astro: "if (basePath.startsWith('/sluzby/')) ... /cs/..."
    const isServiceDetail = path.startsWith('/sluzby/');

    if (isDefaultLang) {
        if (isServiceDetail) {
            // Force prefix for service details in CS because they live in [lang]/sluzby/
            return `/cs${path}`;
        }
        // Standard CS pages live at root
        return path;
    } else {
        // Other languages
        if (path === '/') {
            return `/${lang}/`;
        }
        return `/${lang}${path}`;
    }
}

/**
 * Extracts the language from a URL pathname.
 * @param pathname The current URL pathname
 * @returns The language code (e.g. 'cs', 'en')
 */
export function getLangFromUrl(pathname: string): string {
    const [, lang] = pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

/**
 * Extracts the "base" path (without language prefix) from a URL pathname.
 * Example: '/en/about' -> '/about', '/about' -> '/about'
 */
export function getPathFromUrl(pathname: string): string {
    const lang = getLangFromUrl(pathname);
    // If it's the default lang, the path is already the base path (mostly)
    // But we need to handle the explicit /cs/sluzby case if it exists in the URL.

    const segments = pathname.split('/').filter(Boolean);
    const supportedLangs = Object.keys(ui);

    if (segments.length > 0 && supportedLangs.includes(segments[0])) {
        // Has lang prefix
        const cleanPath = '/' + segments.slice(1).join('/');
        return cleanPath === '' ? '/' : cleanPath;
    }

    return pathname === '' ? '/' : pathname;
}
