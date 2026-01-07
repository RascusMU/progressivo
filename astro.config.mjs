// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://progressivo.eu',
  integrations: [sitemap(), react(), keystatic()],
  output: 'static', // Astro 5 default/hybrid behavior
  adapter: cloudflare(),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en', 'de', 'ru', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
