import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { MODEL_PAGES } from '../../src/data/modelPages.js';
import { CONDITION_PAGES } from '../../src/data/conditionPages.js';
import { LOCAL_PAGES } from '../../src/data/localPages.js';

const root = process.cwd();
const dist = path.join(root, 'dist');
const outDir = path.join(root, 'docs', 'index-recovery');
const origin = 'https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com';

if (!fs.existsSync(dist)) throw new Error('dist/ not found. Run the production build first.');

const route = (value) => {
  const clean = value.replaceAll('\\', '/').replace(/(^|\/)index\.html$/, '').replace(/^dist\/?/, '');
  return clean ? `/${clean.replace(/^\//, '')}/` : '/';
};
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
  const full = path.join(dir, item.name);
  return item.isDirectory() ? walk(full) : [full];
});
const text = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[^;]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const pick = (html, re) => html.match(re)?.[1]?.replace(/\s+/g, ' ').trim() || '';
const escapeCsv = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const normalizeHref = (href) => {
  if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) return null;
  try {
    const url = new URL(href, origin);
    if (url.origin !== origin || /\.[a-z0-9]{2,5}$/i.test(url.pathname)) return null;
    return decodeURI(url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`);
  } catch { return null; }
};

const htmlFiles = walk(dist).filter((file) => file.endsWith('.html') && !file.endsWith('404.html'));
const categoryByPath = new Map(CATEGORIES.map((item) => [`/${item.path}/`, item]));
const brandByPath = new Map(BRAND_PAGES.map((item) => [`/${item.path}/`, item]));
const modelByPath = new Map(MODEL_PAGES.map((item) => [`/${item.path}/`, item]));
const conditionByPath = new Map(CONDITION_PAGES.map((item) => [`/${item.path}/`, item]));
const localByPath = new Map(LOCAL_PAGES.map((item) => [`/${item.path}/`, item]));

const tierA = new Set([
  '/',
  '/รับซื้อโน้ตบุ๊ก-ขอนแก่น/', '/รับซื้อคอมพิวเตอร์-ขอนแก่น/', '/รับซื้อ-macbook-ขอนแก่น/',
  '/รับซื้อ-iphone-ขอนแก่น/', '/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/', '/รับซื้อการ์ดจอ-ขอนแก่น/',
  '/รับซื้อเครื่องเกม-ขอนแก่น/', '/รับเหมาอุปกรณ์ไอที-ขอนแก่น/',
  '/สภาพสินค้าที่ขายได้/', '/พื้นที่ให้บริการ/',
  '/รับซื้อไอที-เมืองขอนแก่น/', '/รับซื้อโน้ตบุ๊ก-ipad-มข-กังสดาล/', '/รับซื้อไอที-บ้านเป็ด/', '/รับซื้อไอที-ศิลา/',
  '/บทความ/', '/บทความ/ราคารับซื้อ-macbook-มือสอง/', '/บทความ/ราคารับซื้อ-การ์ดจอ/',
  '/บทความ/ราคารับซื้อ-ps5-nintendo-switch/', '/บทความ/เช็คลิสต์ก่อนขายโน้ตบุ๊ก/',
  '/บทความ/วิธีลบข้อมูล-iphone-ก่อนขาย/', '/บทความ/รับซื้อสินค้าไอทีใกล้ฉัน-ขอนแก่น/',
]);
const collisionClusters = {
  condition_general: ['/สภาพสินค้าที่ขายได้/', '/บทความ/ของพังขายได้ไหม/'],
  screen_damage: ['/จอแตกขายได้ไหม/', '/บทความ/จอแตกขายได้ไหม-ขอนแก่น/', '/รับซื้อโน้ตบุ๊กจอแตก-ขอนแก่น/'],
  notebook_fault: ['/รับซื้อโน้ตบุ๊กเสีย-ขอนแก่น/', '/รับซื้อโน้ตบุ๊กเปิดไม่ติด-ขอนแก่น/', '/เปิดไม่ติดขายได้ไหม/'],
  iphone_price: ['/รับซื้อ-iphone-ขอนแก่น/', '/บทความ/รับซื้อ-iphone-ขอนแก่น-ราคา/', '/บทความ/ราคารับซื้อ-iphone-มือสอง/'],
};
const reviewPaths = new Set(Object.values(collisionClusters).flat().filter((item) => !tierA.has(item)));
const lowValueStatic = new Set(['/ข้อกำหนดการใช้บริการ/', '/นโยบายความเป็นส่วนตัว/', '/ติดต่อเรา/', '/เกี่ยวกับเรา/', '/เงื่อนไขการรับซื้อ/']);

const sitemapFile = path.join(dist, 'sitemap-0.xml');
const sitemapPaths = new Set((fs.readFileSync(sitemapFile, 'utf8').match(/<loc>(.*?)<\/loc>/g) || [])
  .map((item) => decodeURI(new URL(item.replace(/<\/?loc>/g, '')).pathname)));

const pages = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const url = route(path.relative(dist, file));
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((match) => normalizeHref(match[1])).filter(Boolean);
  const bodyText = text(pick(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i) || html);
  const canonical = pick(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const robots = pick(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i) || 'index, follow (default)';
  let pageType = 'Static'; let parentHub = '/';
  if (categoryByPath.has(url)) pageType = 'Category';
  else if (brandByPath.has(url)) { pageType = 'Brand'; parentHub = `/${CATEGORIES.find((c) => c.slug === brandByPath.get(url).categories[0])?.path}/`; }
  else if (modelByPath.has(url)) { pageType = 'Model'; parentHub = `/${CATEGORIES.find((c) => c.slug === modelByPath.get(url).primaryCategory)?.path}/`; }
  else if (conditionByPath.has(url)) { pageType = 'Condition'; parentHub = '/สภาพสินค้าที่ขายได้/'; }
  else if (localByPath.has(url)) { pageType = 'Local'; parentHub = '/พื้นที่ให้บริการ/'; }
  else if (url.startsWith('/บทความ/')) { pageType = url === '/บทความ/' ? 'Blog hub' : 'Blog'; parentHub = '/บทความ/'; }
  const tier = tierA.has(url) ? 'A' : (reviewPaths.has(url) || lowValueStatic.has(url) ? 'C' : 'B');
  const action = tierA.has(url) && ['/', '/รับซื้อเครื่องเกม-ขอนแก่น/', '/รับเหมาอุปกรณ์ไอที-ขอนแก่น/', '/สภาพสินค้าที่ขายได้/'].includes(url)
    ? 'KEEP' : reviewPaths.has(url) ? 'REVIEW' : tierA.has(url) ? 'ENRICH' : 'KEEP';
  const cluster = Object.entries(collisionClusters).find(([, paths]) => paths.includes(url))?.[0] || 'none found';
  return {
    url, pageType,
    title: pick(html, /<title>([\s\S]*?)<\/title>/i),
    h1: text(pick(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i)),
    description: pick(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i),
    canonical, robots,
    indexability: !/noindex/i.test(robots) && decodeURI(new URL(canonical).pathname) === url ? 'Indexable (200 build)' : 'REVIEW',
    parentHub, links: [...new Set(links)], outboundInternalLinks: new Set(links).size,
    bodyChars: bodyText.length, bodyHash: crypto.createHash('sha1').update(bodyText).digest('hex'),
    searchIntent: text(pick(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i)),
    cannibalization: cluster, priority: `Tier ${tier}`, recommendedAction: action,
    sitemap: sitemapPaths.has(url) ? 'YES' : 'NO',
  };
});

const knownRoutes = new Set(pages.map((page) => page.url));
const inbound = new Map([...knownRoutes].map((url) => [url, 0]));
const brokenLinks = [];
for (const page of pages) for (const link of page.links) {
  if (knownRoutes.has(link)) inbound.set(link, inbound.get(link) + 1);
  else if (!link.startsWith('/_astro/')) brokenLinks.push({ from: page.url, to: link });
}
const hashCounts = new Map();
for (const page of pages) hashCounts.set(page.bodyHash, (hashCounts.get(page.bodyHash) || 0) + 1);
for (const page of pages) {
  page.inboundInternalLinks = inbound.get(page.url) || 0;
  page.contentUniqueness = `${hashCounts.get(page.bodyHash) === 1 ? 'Unique body' : 'Duplicate body'}; ${page.bodyChars} chars`;
  delete page.links; delete page.bodyChars; delete page.bodyHash;
}

const duplicates = (key) => [...Map.groupBy(pages, (page) => page[key]).entries()]
  .filter(([value, items]) => value && items.length > 1)
  .map(([value, items]) => ({ value, urls: items.map((item) => item.url) }));
const result = {
  generatedAt: new Date().toISOString(), totalIndexableUrls: pages.length, sitemapUrlCount: sitemapPaths.size,
  tierCounts: Object.fromEntries(['A', 'B', 'C'].map((tier) => [tier, pages.filter((page) => page.priority === `Tier ${tier}`).length])),
  brokenInternalLinks: brokenLinks,
  duplicates: { title: duplicates('title'), description: duplicates('description'), h1: duplicates('h1'), canonical: duplicates('canonical') },
  cannibalizationClusters: collisionClusters,
  pages,
};
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'batch-1-url-inventory.json'), `${JSON.stringify(result, null, 2)}\n`);
const columns = ['url', 'pageType', 'title', 'h1', 'canonical', 'robots', 'indexability', 'parentHub', 'inboundInternalLinks', 'outboundInternalLinks', 'contentUniqueness', 'searchIntent', 'cannibalization', 'priority', 'recommendedAction', 'sitemap'];
fs.writeFileSync(path.join(outDir, 'batch-1-url-inventory.csv'), `${columns.join(',')}\n${pages.map((page) => columns.map((key) => escapeCsv(page[key])).join(',')).join('\n')}\n`);
console.log(JSON.stringify({ total: pages.length, sitemap: sitemapPaths.size, tiers: result.tierCounts, broken: brokenLinks.length, duplicates: Object.fromEntries(Object.entries(result.duplicates).map(([key, value]) => [key, value.length])) }, null, 2));
if (brokenLinks.length || Object.values(result.duplicates).some((items) => items.length) || pages.some((page) => page.indexability === 'REVIEW' || page.sitemap === 'NO')) process.exitCode = 1;
