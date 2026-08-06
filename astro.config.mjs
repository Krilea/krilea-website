// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://krilea.eu',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/kontakti/blagodarim/'),
    }),
  ],
  image: {
    domains: [],
  },
});
