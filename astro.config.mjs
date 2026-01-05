// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en', 'de', 'ru', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
