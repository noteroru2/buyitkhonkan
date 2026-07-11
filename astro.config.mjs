import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: เปลี่ยนเป็นโดเมนจริงของคุณก่อน deploy
export default defineConfig({
  site: 'https://www.itbuy-khonkaen.com',
  integrations: [sitemap()],
  compressHTML: true,
});
