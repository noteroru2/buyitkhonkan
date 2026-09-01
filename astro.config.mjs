import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isHoldArchitecturePath } from './src/data/architectureRegistry.js';

// โดเมนจริง: รับซื้อไอทีขอนแก่น.com (IDN → punycode)
export default defineConfig({
  site: 'https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com',
  integrations: [sitemap({
    // Structure-only pages are real future URLs, but must never enter the sitemap
    // until content is completed and lifecycle is explicitly promoted from HOLD_NOINDEX.
    filter: (page) => {
      const pathname = new URL(page).pathname;
      const is404 = pathname === '/404' || pathname === '/404/';
      return !is404 && !isHoldArchitecturePath(pathname);
    },
  })],
  compressHTML: true,
});
