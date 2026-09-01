import fs from 'node:fs';
import path from 'node:path';
import { HIGH_INTENT_MODEL_CONTENT, HIGH_INTENT_MODEL_RELEASE_SLUGS } from '../../src/data/highIntentModelContent.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { getCategoryDiscovery, getDetailDiscovery } from '../../src/data/discoveryLinks.js';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { getAuthorityHubContent } from '../../src/data/authorityHubContent.js';

const BATCH4_RELEASE_SLUGS = [
  'sony-a6000','sony-a6400','sony-a7-iii','canon-eos-r6','canon-eos-r7','fujifilm-x-t5','nikon-z5',
  'playstation-5','playstation-5-slim','playstation-4-pro','nintendo-switch','nintendo-switch-oled','steam-deck','rog-ally',
  'intel-core-i5-12400f','intel-core-i5-13400f','intel-core-i5-14400f','intel-core-i7-12700','intel-core-i7-13700','amd-ryzen-5-5600','amd-ryzen-5-7500f','amd-ryzen-7-7800x3d',
];
const BATCH4_EXPECTED_CLUSTER_COUNTS = { camera: 7, 'game-console': 7, computer: 8 };
const BASELINE_RELEASE_COUNT = 41;
const root = process.cwd();
const brandModelHub = ARCHITECTURE_PAGES.find((p) => p.id === 'hub-brands-models');
const authorityClusters = new Set((getAuthorityHubContent('hub-brands-models')?.directoryGroups || []).flatMap((g) => g.clusters || []));
const authorityDirectoryLive = brandModelHub?.lifecycle === 'INDEX';
const releasedSet = new Set(HIGH_INTENT_MODEL_RELEASE_SLUGS);
const batchSet = new Set(BATCH4_RELEASE_SLUGS);
const pageBySlug = new Map(MODEL_ARCHITECTURE.map((p) => [p.slug, p]));
const releasedPages = MODEL_ARCHITECTURE.filter((p) => p.lifecycle === 'INDEX');
const holdPages = MODEL_ARCHITECTURE.filter((p) => p.lifecycle === 'HOLD_NOINDEX');
const requiredArrays = { variantNotes: 4, inspection: 4, priceFactors: 4, sellerChecklist: 4, risks: 3, faq: 4 };
const problems = { missingContent: [], invalidFields: [], invalidLifecycle: [], badRelated: [], parentMismatch: [], unlinked: [], missingSource: [], unsafeClaims: [], fixedPriceClaims: [], duplicateEditorial: [] };
const paragraphOwner = new Map();
const unsafe = [/รับหมด/iu,/ราคาดีที่สุด/iu,/รับประกันราคา/iu,/ได้ราคาดีกว่า/iu,/ทุกอำเภอ.*ทุกกรณี/iu,/จบภายในวันเดียว/iu];
const fixedPrice = /(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;

for (const slug of HIGH_INTENT_MODEL_RELEASE_SLUGS) {
  const c = HIGH_INTENT_MODEL_CONTENT[slug];
  const p = pageBySlug.get(slug);
  if (!c || !p) { problems.missingContent.push(slug); continue; }
  if (p.lifecycle !== 'INDEX') problems.invalidLifecycle.push({ slug, lifecycle: p.lifecycle });
  for (const [field, min] of Object.entries(requiredArrays)) if (!Array.isArray(c[field]) || c[field].length < min) problems.invalidFields.push({ slug, field, min, actual: c[field]?.length ?? 0 });
  if (!c.seoTitle || !c.metaDescription || !c.intro || !c.categorySlug) problems.invalidFields.push({ slug, field: 'required text fields' });
  if (batchSet.has(slug) && (!c.source?.url || !c.source?.label)) problems.missingSource.push(slug);
  const category = CATEGORIES.find((x) => x.slug === c.categorySlug);
  if (!category || p.parent !== `/${category?.path || category?.slug}/`) problems.parentMismatch.push({ slug, parent: p.parent, category: c.categorySlug });
  for (const rel of c.relatedSlugs || []) if (rel === slug || !releasedSet.has(rel)) problems.badRelated.push({ slug, related: rel });

  const all = [c.intro, c.metaDescription, ...c.variantNotes, ...c.inspection, ...c.priceFactors, ...c.sellerChecklist, ...c.risks, ...c.faq.flat()].filter(Boolean);
  for (const text of all) {
    for (const pattern of unsafe) if (pattern.test(text)) problems.unsafeClaims.push({ slug, text, pattern: String(pattern) });
    if (fixedPrice.test(text)) problems.fixedPriceClaims.push({ slug, text });
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length >= 85) {
      const prev = paragraphOwner.get(clean);
      if (prev && prev !== slug) problems.duplicateEditorial.push({ pages: [prev, slug], text: clean.slice(0, 180) });
      else paragraphOwner.set(clean, slug);
    }
  }

  const catLinks = new Set(getCategoryDiscovery(category).flatMap((g) => g.items || []).map((x) => x.href));
  let linked = catLinks.has(p.path);
  if (!linked && c.brandSlug) {
    const brand = BRAND_PAGES.find((x) => x.slug === c.brandSlug);
    if (brand) linked = new Set(getDetailDiscovery({ brand }).flatMap((g) => g.items || []).map((x) => x.href)).has(p.path);
  }
  if (!linked && authorityDirectoryLive && authorityClusters.has(p.cluster)) linked = true;
  if (!linked) problems.unlinked.push({ slug, path: p.path });
}
for (const page of releasedPages) if (!releasedSet.has(page.slug)) problems.invalidLifecycle.push({ slug: page.slug, lifecycle: 'INDEX_WITHOUT_CONTENT' });
for (const slug of BATCH4_RELEASE_SLUGS) if (!releasedSet.has(slug)) problems.invalidLifecycle.push({ slug, lifecycle: 'BATCH4_NOT_RELEASED' });

const titles = HIGH_INTENT_MODEL_RELEASE_SLUGS.map((s) => HIGH_INTENT_MODEL_CONTENT[s].seoTitle);
const descs = HIGH_INTENT_MODEL_RELEASE_SLUGS.map((s) => HIGH_INTENT_MODEL_CONTENT[s].metaDescription);
const dupes = (arr) => [...new Set(arr.filter((v,i) => arr.indexOf(v) !== i))];
const duplicateTitles = dupes(titles);
const duplicateDescriptions = dupes(descs);
const clusterCounts = Object.fromEntries(Object.keys(BATCH4_EXPECTED_CLUSTER_COUNTS).map((cat) => [cat, BATCH4_RELEASE_SLUGS.filter((s) => HIGH_INTENT_MODEL_CONTENT[s]?.categorySlug === cat).length]));
const clusterMismatch = Object.entries(BATCH4_EXPECTED_CLUSTER_COUNTS).filter(([k,v]) => clusterCounts[k] !== v);
const sourceDomains = BATCH4_RELEASE_SLUGS.map((s) => { try { return new URL(HIGH_INTENT_MODEL_CONTENT[s].source.url).hostname; } catch { return 'INVALID'; } });
const nonManufacturerSources = sourceDomains.filter((h) => !/(sony|canon|fujifilm|nikon|playstation|nintendo|steamdeck|asus|intel|amd)\./i.test(h) && !/^(www\.)?(sony|canon|fujifilm-x|imaging\.nikon|playstation|nintendo|steamdeck|rog\.asus|intel|thailand\.intel|amd)\.com$/i.test(h));

const findings = {
  baselineReleaseCount: BASELINE_RELEASE_COUNT,
  batch4ReleaseCount: BATCH4_RELEASE_SLUGS.length,
  releasedTotal: releasedPages.length,
  expectedReleasedTotal: BASELINE_RELEASE_COUNT + BATCH4_RELEASE_SLUGS.length,
  holdModelCount: holdPages.length,
  clusterCounts,
  clusterMismatch: clusterMismatch.length,
  duplicateTitles: duplicateTitles.length,
  duplicateDescriptions: duplicateDescriptions.length,
  nonManufacturerSources: nonManufacturerSources.length,
  ...Object.fromEntries(Object.entries(problems).map(([k,v]) => [k, v.length])),
};
const ignored = new Set(['baselineReleaseCount','batch4ReleaseCount','releasedTotal','expectedReleasedTotal','holdModelCount','clusterCounts']);
const failed = findings.releasedTotal < findings.expectedReleasedTotal || Object.entries(findings).filter(([k]) => !ignored.has(k)).some(([,v]) => typeof v === 'number' && v > 0);
const report = {
  verdict: failed ? 'FAIL' : 'PASS',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_4_CAMERA_CONSOLE_PC_COMPONENTS',
  findings,
  batch4Released: BATCH4_RELEASE_SLUGS.map((slug) => ({ slug, path: pageBySlug.get(slug)?.path, h1: pageBySlug.get(slug)?.h1, title: HIGH_INTENT_MODEL_CONTENT[slug]?.seoTitle, category: HIGH_INTENT_MODEL_CONTENT[slug]?.categorySlug, source: HIGH_INTENT_MODEL_CONTENT[slug]?.source?.url })),
  samples: { ...Object.fromEntries(Object.entries(problems).map(([k,v]) => [k, v.slice(0, 10)])), duplicateTitles, duplicateDescriptions, nonManufacturerSources },
};
fs.mkdirSync(path.join(root, 'docs/content-batch4'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/content-batch4/content-batch4-audit.json'), JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'docs/content-batch4/released-model-pages.csv'), ['slug,path,category,title,source', ...report.batch4Released.map((r) => [r.slug,r.path,r.category,r.title,r.source].map((x) => `"${String(x ?? '').replaceAll('"','""')}"`).join(','))].join('\n') + '\n');
console.log(JSON.stringify(report, null, 2));
if (failed) process.exitCode = 1;
