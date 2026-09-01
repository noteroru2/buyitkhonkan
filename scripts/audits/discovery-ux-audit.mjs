import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { MODEL_PAGES } from '../../src/data/modelPages.js';
import { CONDITION_PAGES } from '../../src/data/conditionPages.js';
import { LOCAL_PAGES } from '../../src/data/localPages.js';
import { ARCHITECTURE_HOLD_PATHS, ARCHITECTURE_PAGES, normalizeArchitecturePath } from '../../src/data/architecture/index.js';
import { CONDITION_ARCHITECTURE } from '../../src/data/architecture/conditions.js';
import { B2B_ARCHITECTURE } from '../../src/data/architecture/b2b.js';
import { DISTRICT_ARCHITECTURE } from '../../src/data/architecture/districts.js';
import { GUIDE_ARCHITECTURE } from '../../src/data/architecture/guides.js';
import { HUB_ARCHITECTURE } from '../../src/data/architecture/hubs.js';
import { getHighIntentConditionContent } from '../../src/data/highIntentConditionContent.js';
import { getHighIntentB2BContent } from '../../src/data/highIntentB2BContent.js';
import { getHighIntentDistrictContent } from '../../src/data/highIntentDistrictContent.js';
import { getHighIntentGuideContent } from '../../src/data/highIntentGuideContent.js';
import { getCategoryDiscovery, getDetailDiscovery, getArticleDiscovery, getAreaHubDiscovery, getConditionHubDiscovery, getReleasedConditionDiscovery, getB2BHubDiscovery, getReleasedB2BDiscovery, getReleasedDistrictDiscovery, getReleasedGuideDiscovery, getPriceHubDiscovery, LIVE_DISCOVERY_META } from '../../src/data/discoveryLinks.js';

const root = process.cwd();
const normalize = (href) => {
  if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return null;
  const pathname = href.split('#')[0] || '/';
  return normalizeArchitecturePath(pathname);
};

const active = new Set([
  '/',
  '/พื้นที่ให้บริการ/', '/สภาพสินค้าที่ขายได้/', '/บทความ/', '/เกี่ยวกับเรา/', '/ติดต่อเรา/', '/เงื่อนไขการรับซื้อ/', '/นโยบายความเป็นส่วนตัว/', '/ข้อกำหนดการใช้บริการ/',
  ...CATEGORIES.map((item) => `/${item.path || item.slug}/`),
  ...BRAND_PAGES.map((item) => `/${item.path}/`),
  ...MODEL_PAGES.map((item) => `/${item.path}/`),
  ...CONDITION_PAGES.map((item) => `/${item.path}/`),
  ...LOCAL_PAGES.map((item) => `/${item.path}/`),
  ...ARCHITECTURE_PAGES.filter((item) => item.lifecycle === 'INDEX').map((item) => item.path),
]);

const articleDir = path.join(root, 'src/pages/บทความ');
const articleFiles = fs.readdirSync(articleDir).filter((name) => name.endsWith('.astro') && !['index.astro', '[slug].astro'].includes(name));
for (const file of articleFiles) active.add(`/บทความ/${file.replace(/\.astro$/, '')}/`);

const allContexts = [
  { key: 'hub:areas', groups: getAreaHubDiscovery() },
  { key: 'hub:conditions', groups: getConditionHubDiscovery() },
  { key: 'hub:b2b', groups: getB2BHubDiscovery() },
];
for (const cat of CATEGORIES) allContexts.push({ key: `category:${cat.slug}`, groups: getCategoryDiscovery(cat) });
for (const brand of BRAND_PAGES) allContexts.push({ key: `brand:${brand.slug}`, groups: getDetailDiscovery({ brand }) });
for (const model of MODEL_PAGES) allContexts.push({ key: `model:${model.slug}`, groups: getDetailDiscovery({ model }) });
for (const condition of CONDITION_PAGES) allContexts.push({ key: `condition:${condition.slug}`, groups: getDetailDiscovery({ condition }) });
for (const conditionPage of CONDITION_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX')) {
  const content = getHighIntentConditionContent(conditionPage);
  if (content) allContexts.push({ key: `released-condition:${conditionPage.slug}`, groups: getReleasedConditionDiscovery(conditionPage, content) });
}
for (const b2bPage of B2B_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX')) {
  const content = getHighIntentB2BContent(b2bPage);
  if (content) allContexts.push({ key: `released-b2b:${b2bPage.slug}`, groups: getReleasedB2BDiscovery(b2bPage, content) });
}
const b2bHub = HUB_ARCHITECTURE.find((item) => item.id === 'hub-b2b' && item.lifecycle === 'INDEX');
if (b2bHub) allContexts.push({ key: 'released-b2b:hub', groups: getReleasedB2BDiscovery(b2bHub, getHighIntentB2BContent(b2bHub)) });
for (const districtPage of DISTRICT_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX')) {
  const content = getHighIntentDistrictContent(districtPage);
  if (content) allContexts.push({ key: `released-district:${districtPage.slug}`, groups: getReleasedDistrictDiscovery(districtPage, content) });
}
for (const guidePage of GUIDE_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX')) {
  const content = getHighIntentGuideContent(guidePage);
  if (content) allContexts.push({ key: `released-guide:${guidePage.slug}`, groups: getReleasedGuideDiscovery(guidePage, content) });
}
const priceHub = HUB_ARCHITECTURE.find((item) => item.id === 'hub-price' && item.lifecycle === 'INDEX');
if (priceHub) allContexts.push({ key: 'released-price:hub', groups: getPriceHubDiscovery() });
for (const localPage of LOCAL_PAGES) allContexts.push({ key: `local:${localPage.slug}`, groups: getDetailDiscovery({ localPage }) });
for (const file of articleFiles) {
  const pathname = `/บทความ/${file.replace(/\.astro$/, '')}/`;
  allContexts.push({ key: `article:${file}`, groups: getArticleDiscovery(pathname, file) });
}

const broken = [];
const holdLeaks = [];
const thinContexts = [];
const hrefs = [];

for (const context of allContexts) {
  const items = context.groups.flatMap((group) => group.items || []);
  const uniqueLinks = new Set(items.map((item) => item.href));
  if (!context.key.startsWith('article:') && uniqueLinks.size < 5) thinContexts.push({ key: context.key, links: uniqueLinks.size });
  for (const item of items) {
    const normalized = normalize(item.href);
    if (!normalized) continue;
    hrefs.push(normalized);
    if (ARCHITECTURE_HOLD_PATHS.has(normalized)) holdLeaks.push({ from: context.key, href: item.href });
    if (!active.has(normalized)) broken.push({ from: context.key, href: item.href, normalized });
  }
}

const requiredComponentTokens = [
  'internal_discovery_click',
  'discovery__hubs',
  'discovery-cards',
  'data-cta-location',
];
const componentSource = fs.readFileSync(path.join(root, 'src/components/DiscoveryHub.astro'), 'utf8');
const missingTokens = requiredComponentTokens.filter((token) => !componentSource.includes(token));

const slugSource = fs.readFileSync(path.join(root, 'src/pages/[slug].astro'), 'utf8');
const articleLayoutSource = fs.readFileSync(path.join(root, 'src/layouts/Article.astro'), 'utf8');
const integration = {
  moneyPages: slugSource.includes('<DiscoveryHub') && slugSource.includes('getCategoryDiscovery') && slugSource.includes('getDetailDiscovery'),
  releasedConditions: slugSource.includes('<ReleasedConditionPage') && slugSource.includes('releasedConditionContent'),
  releasedB2B: slugSource.includes('<ReleasedB2BPage') && slugSource.includes('releasedB2BContent'),
  releasedDistricts: slugSource.includes('<ReleasedDistrictPage') && slugSource.includes('releasedDistrictContent'),
  releasedPriceHub: slugSource.includes('<ReleasedPriceHub') && slugSource.includes('releasedPriceHub'),
  releasedGuides: fs.readFileSync(path.join(root, 'src/pages/บทความ/[slug].astro'), 'utf8').includes('<ReleasedGuidePage') && fs.readFileSync(path.join(root, 'src/pages/บทความ/[slug].astro'), 'utf8').includes('releasedGuideContent'),
  articles: articleLayoutSource.includes('<DiscoveryHub') && articleLayoutSource.includes('getArticleDiscovery'),
  breadcrumbTracking: fs.readFileSync(path.join(root, 'src/components/Breadcrumbs.astro'), 'utf8').includes('breadcrumb_click'),
};

const report = {
  verdict: broken.length || holdLeaks.length || thinContexts.length || missingTokens.length || Object.values(integration).includes(false) ? 'FAIL' : 'PASS',
  generatedAt: new Date().toISOString(),
  liveDiscoveryMeta: LIVE_DISCOVERY_META,
  contextsAudited: allContexts.length,
  uniqueInternalTargets: new Set(hrefs).size,
  holdArchitectureLinked: holdLeaks.length,
  brokenDiscoveryLinks: broken.length,
  thinDiscoveryContexts: thinContexts.length,
  missingComponentTokens: missingTokens,
  integration,
  samples: {
    holdLeaks: holdLeaks.slice(0, 10),
    broken: broken.slice(0, 10),
    thinContexts: thinContexts.slice(0, 10),
  },
};

const outDir = path.join(root, 'docs/ux-ui');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'internal-link-discovery-batch5-audit.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.verdict !== 'PASS') process.exitCode = 1;
