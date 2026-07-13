import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// โดเมนจริง: รับซื้อไอทีขอนแก่น.com (IDN → punycode)
export default defineConfig({
  site: 'https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com',
  integrations: [sitemap()],
  compressHTML: true,
});
