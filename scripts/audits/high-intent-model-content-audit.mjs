import fs from 'node:fs';
import path from 'node:path';
import { HIGH_INTENT_MODEL_CONTENT, HIGH_INTENT_MODEL_RELEASE_SLUGS } from '../../src/data/highIntentModelContent.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { getCategoryDiscovery, getDetailDiscovery } from '../../src/data/discoveryLinks.js';
import { HUB_ARCHITECTURE } from '../../src/data/architecture/hubs.js';
import { AUTHORITY_HUB_CONTENT } from '../../src/data/authorityHubContent.js';

const root = process.cwd();
const brandModelHub = HUB_ARCHITECTURE.find((item) => item.id === 'hub-brands-models');
const authorityClusters = new Set((AUTHORITY_HUB_CONTENT['hub-brands-models']?.directoryGroups || []).flatMap((group) => group.clusters || []));
const authorityComponentSource = fs.readFileSync(path.join(root, 'src/components/ReleasedAuthorityHub.astro'), 'utf8');
const hasAuthorityDirectory = brandModelHub?.lifecycle === 'INDEX' && authorityComponentSource.includes("item.lifecycle === 'INDEX'") && authorityComponentSource.includes('cluster.items.map');
const releasedPages = MODEL_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX');
const holdPages = MODEL_ARCHITECTURE.filter((item) => item.lifecycle === 'HOLD_NOINDEX');
const releasedSet = new Set(HIGH_INTENT_MODEL_RELEASE_SLUGS);
const pageBySlug = new Map(MODEL_ARCHITECTURE.map((item) => [item.slug, item]));
const duplicateValues = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const requiredArrayFields = { variantNotes: 4, inspection: 4, priceFactors: 4, sellerChecklist: 4, risks: 3, faq: 4 };
const missingContent = [];
const invalidFields = [];
const invalidLifecycle = [];
const badRelated = [];
const parentMismatch = [];
const unlinkedReleasedPages = [];
const unsafeClaims = [];
const fixedPriceClaims = [];
const paragraphOwners = new Map();
const duplicateParagraphs = [];
const forbiddenClaimPatterns = [
  /รับหมด/iu,
  /ได้ราคาดีกว่า/iu,
  /ราคาดีที่สุด/iu,
  /รับประกันราคา/iu,
  /ทุกอำเภอ.*ทุกกรณี/iu,
  /จบภายในวันเดียว/iu,
];
const fixedPricePattern = /(?:฿|\bราคา\b[^\n]{0,30})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;

for (const slug of HIGH_INTENT_MODEL_RELEASE_SLUGS) {
  const content = HIGH_INTENT_MODEL_CONTENT[slug];
  const page = pageBySlug.get(slug);
  if (!content || !page) { missingContent.push(slug); continue; }
  if (page.lifecycle !== 'INDEX') invalidLifecycle.push({ slug, lifecycle: page.lifecycle });
  for (const [field, minimum] of Object.entries(requiredArrayFields)) {
    if (!Array.isArray(content[field]) || content[field].length < minimum) invalidFields.push({ slug, field, minimum, actual: content[field]?.length ?? 0 });
  }
  if (!content.seoTitle || !content.metaDescription || !content.intro || !content.categorySlug) invalidFields.push({ slug, field: 'required text/SEO fields' });
  const category = CATEGORIES.find((item) => item.slug === content.categorySlug);
  if (!category || page.parent !== `/${category?.path || category?.slug}/`) parentMismatch.push({ slug, parent: page.parent, category: content.categorySlug });
  for (const rel of content.relatedSlugs || []) if (rel === slug || !releasedSet.has(rel)) badRelated.push({ slug, related: rel });

  const allStrings = [content.intro, ...content.variantNotes, ...content.inspection, ...content.priceFactors, ...content.sellerChecklist, ...content.risks, ...content.faq.flat(), content.metaDescription];
  for (const text of allStrings.filter(Boolean)) {
    for (const pattern of forbiddenClaimPatterns) if (pattern.test(text)) unsafeClaims.push({ slug, text, pattern: String(pattern) });
    if (fixedPricePattern.test(text)) fixedPriceClaims.push({ slug, text });
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length >= 85) {
      const owner = paragraphOwners.get(clean);
      if (owner && owner !== slug) duplicateParagraphs.push({ text: clean.slice(0, 160), pages: [owner, slug] });
      else paragraphOwners.set(clean, slug);
    }
  }

  const categoryGroups = getCategoryDiscovery(category);
  const categoryLinks = new Set(categoryGroups.flatMap((group) => group.items || []).map((item) => item.href));
  let linked = categoryLinks.has(page.path);
  if (!linked && content.brandSlug) {
    const brand = BRAND_PAGES.find((item) => item.slug === content.brandSlug);
    if (brand) {
      const brandLinks = new Set(getDetailDiscovery({ brand }).flatMap((group) => group.items || []).map((item) => item.href));
      linked = brandLinks.has(page.path);
    }
  }
  if (!linked && hasAuthorityDirectory && authorityClusters.has(page.cluster)) linked = true;
  if (!linked) unlinkedReleasedPages.push({ slug, path: page.path });
}

for (const page of releasedPages) if (!releasedSet.has(page.slug)) invalidLifecycle.push({ slug: page.slug, lifecycle: 'INDEX_WITHOUT_CONTENT' });

const titles = HIGH_INTENT_MODEL_RELEASE_SLUGS.map((slug) => HIGH_INTENT_MODEL_CONTENT[slug].seoTitle);
const descriptions = HIGH_INTENT_MODEL_RELEASE_SLUGS.map((slug) => HIGH_INTENT_MODEL_CONTENT[slug].metaDescription);
const duplicateTitles = duplicateValues(titles);
const duplicateDescriptions = duplicateValues(descriptions);
const routeSource = fs.readFileSync(path.join(root, 'src/pages/[slug].astro'), 'utf8');
const componentSource = fs.readFileSync(path.join(root, 'src/components/ReleasedModelPage.astro'), 'utf8');
const integration = {
  releasedRouteBranch: routeSource.includes('releasedModelContent') && routeSource.includes('<ReleasedModelPage'),
  holdRobotsPreserved: routeSource.includes("architecturePage?.lifecycle === 'HOLD_NOINDEX' ? 'noindex,follow'"),
  faqSchema: routeSource.includes("'@type': 'FAQPage'") && routeSource.includes('releasedModelContent.faq'),
  conversionLayer: componentSource.includes('MoneyConversionCard') && componentSource.includes('TrustProofSystem'),
  internalDiscovery: componentSource.includes('DiscoveryHub') && componentSource.includes("item.lifecycle === 'INDEX'"),
  noStructureOnlyCopy: !componentSource.includes('STRUCTURE ONLY'),
};

const findings = {
  releasedCount: releasedPages.length,
  expectedReleasedCount: HIGH_INTENT_MODEL_RELEASE_SLUGS.length,
  holdModelCount: holdPages.length,
  missingContent: missingContent.length,
  invalidFields: invalidFields.length,
  invalidLifecycle: invalidLifecycle.length,
  parentMismatch: parentMismatch.length,
  badRelated: badRelated.length,
  unlinkedReleasedPages: unlinkedReleasedPages.length,
  duplicateTitles: duplicateTitles.length,
  duplicateDescriptions: duplicateDescriptions.length,
  duplicateLongEditorialStrings: duplicateParagraphs.length,
  unsafeClaims: unsafeClaims.length,
  fixedNumericPriceClaims: fixedPriceClaims.length,
};
const failed = findings.releasedCount !== findings.expectedReleasedCount
  || Object.entries(findings).filter(([key]) => !['releasedCount','expectedReleasedCount','holdModelCount'].includes(key)).some(([, value]) => value > 0)
  || Object.values(integration).includes(false);

const report = {
  verdict: failed ? 'FAIL' : 'PASS',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_2_HIGH_INTENT_MODELS',
  findings,
  integration,
  released: releasedPages.map((page) => ({ slug: page.slug, path: page.path, title: page.title, h1: page.h1, lifecycle: page.lifecycle })),
  samples: {
    missingContent: missingContent.slice(0, 10), invalidFields: invalidFields.slice(0, 10), invalidLifecycle: invalidLifecycle.slice(0, 10),
    parentMismatch: parentMismatch.slice(0, 10), badRelated: badRelated.slice(0, 10), unlinkedReleasedPages: unlinkedReleasedPages.slice(0, 10),
    duplicateTitles, duplicateDescriptions, duplicateParagraphs: duplicateParagraphs.slice(0, 10), unsafeClaims: unsafeClaims.slice(0, 10), fixedPriceClaims: fixedPriceClaims.slice(0, 10),
  },
};
const outDir = path.join(root, 'docs/content-batch2');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'content-batch2-audit.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (failed) process.exitCode = 1;
