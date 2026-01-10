// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://progressivo.eu',
  integrations: [sitemap()],
  output: 'static', // Astro 5 default/hybrid behavior
  adapter: cloudflare({
    mode: 'directory'
  }),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en', 'de', 'ru', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['/api/*']
      }
    }
  }
});
