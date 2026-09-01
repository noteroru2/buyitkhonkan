import { readFile } from 'node:fs/promises';
import { transform } from '@astrojs/compiler';
const file = await readFile('src/components/media/ResponsiveImage.astro', 'utf8');
await transform(file, { filename: 'ResponsiveImage.astro' });
const contracts = [
  ['content alt guard', /content image requires alt text/], ['decorative alt guard', /decorative image must use an empty alt/],
  ['CLS dimensions guard', /width and height are required/], ['LCP lazy guard', /cannot be lazy loaded/],
  ['responsive srcset', /srcset=/], ['sizes', /sizes=/], ['mobile art direction', /media=/],
  ['AVIF default', /'avif'/], ['WebP default', /'webp'/], ['slot audit id', /data-image-slot/], ['no client script', /<script[^>]*client:/]
];
const failures = contracts.filter(([name, rule]) => name === 'no client script' ? rule.test(file) : !rule.test(file)).map(([name]) => name);
if (failures.length) { console.error(`Component contract failures: ${failures.join(', ')}`); process.exit(1); }
console.log(`ResponsiveImage contract PASS (${contracts.length} checks).`);
