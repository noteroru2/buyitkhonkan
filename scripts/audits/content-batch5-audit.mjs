import fs from 'node:fs';
import path from 'node:path';
import { HIGH_INTENT_MODEL_CONTENT, HIGH_INTENT_MODEL_RELEASE_SLUGS } from '../../src/data/highIntentModelContent.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { getCategoryDiscovery, getDetailDiscovery } from '../../src/data/discoveryLinks.js';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { getAuthorityHubContent } from '../../src/data/authorityHubContent.js';

const BATCH5_RELEASE_SLUGS = [
  'monitor-24-ips','monitor-27-ips','monitor-27-144hz','monitor-27-165hz','monitor-32-144hz','monitor-2k','monitor-4k','monitor-ultrawide','monitor-oled','portable-monitor',
  'dji-mini-2','dji-mini-3-pro','dji-mini-4-pro','dji-air-2s','dji-air-3','dji-mavic-air','gopro-hero-10','gopro-hero-11','gopro-hero-12','dji-osmo-action-4',
  'apple-watch-series-7','apple-watch-series-8','apple-watch-series-9','apple-watch-ultra','apple-watch-ultra-2',
];
const BATCH5_EXPECTED_CLUSTER_COUNTS = { monitor: 10, 'drone-gopro': 10, smartwatch: 5 };
const BASELINE_RELEASE_COUNT = 63;
const root = process.cwd();
const brandModelHub = ARCHITECTURE_PAGES.find((p) => p.id === 'hub-brands-models');
const authorityClusters = new Set((getAuthorityHubContent('hub-brands-models')?.directoryGroups || []).flatMap((g) => g.clusters || []));
const authorityDirectoryLive = brandModelHub?.lifecycle === 'INDEX';
const releasedSet = new Set(HIGH_INTENT_MODEL_RELEASE_SLUGS);
const batchSet = new Set(BATCH5_RELEASE_SLUGS);
const pageBySlug = new Map(MODEL_ARCHITECTURE.map((p) => [p.slug, p]));
const releasedPages = MODEL_ARCHITECTURE.filter((p) => p.lifecycle === 'INDEX');
const holdPages = MODEL_ARCHITECTURE.filter((p) => p.lifecycle === 'HOLD_NOINDEX');
const requiredArrays = { variantNotes: 4, inspection: 4, priceFactors: 4, sellerChecklist: 4, risks: 3, faq: 4 };
const problems = { missingContent: [], invalidFields: [], invalidLifecycle: [], badRelated: [], parentMismatch: [], unlinked: [], missingSource: [], unsafeClaims: [], fixedPriceClaims: [], duplicateEditorial: [], sourceDomain: [], metadataLength: [] };
const paragraphOwner = new Map();
const unsafe = [/รับหมด/iu,/ราคาดีที่สุด/iu,/รับประกันราคา/iu,/ได้ราคาดีกว่า/iu,/ทุกอำเภอ.*ทุกกรณี/iu,/จบภายในวันเดียว/iu,/กันน้ำแน่นอน/iu,/รับประกัน.*กันน้ำ/iu];
const fixedPrice = /(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const allowedSourceDomains = /(^|\.)(dell\.com|asus\.com|lg\.com|dji\.com|gopro\.com|apple\.com)$/i;

for (const slug of HIGH_INTENT_MODEL_RELEASE_SLUGS) {
  const c = HIGH_INTENT_MODEL_CONTENT[slug];
  const p = pageBySlug.get(slug);
  if (!c || !p) { problems.missingContent.push(slug); continue; }
  if (p.lifecycle !== 'INDEX') problems.invalidLifecycle.push({ slug, lifecycle: p.lifecycle });
  for (const [field, min] of Object.entries(requiredArrays)) if (!Array.isArray(c[field]) || c[field].length < min) problems.invalidFields.push({ slug, field, min, actual: c[field]?.length ?? 0 });
  if (!c.seoTitle || !c.metaDescription || !c.intro || !c.categorySlug) problems.invalidFields.push({ slug, field: 'required text fields' });
  if (batchSet.has(slug)) {
    const titleLength = [...c.seoTitle].length;
    const descriptionLength = [...c.metaDescription].length;
    if (titleLength < 45 || titleLength > 78) problems.metadataLength.push({ slug, field: 'seoTitle', length: titleLength });
    if (descriptionLength < 90 || descriptionLength > 160) problems.metadataLength.push({ slug, field: 'metaDescription', length: descriptionLength });
  }
  if (batchSet.has(slug)) {
    if (!c.source?.url || !c.source?.label) problems.missingSource.push(slug);
    else {
      try {
        const host = new URL(c.source.url).hostname.replace(/^www\./, '');
        if (!allowedSourceDomains.test(host)) problems.sourceDomain.push({ slug, host, url: c.source.url });
      } catch { problems.sourceDomain.push({ slug, host: 'INVALID_URL', url: c.source?.url }); }
    }
  }
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
for (const slug of BATCH5_RELEASE_SLUGS) if (!releasedSet.has(slug)) problems.invalidLifecycle.push({ slug, lifecycle: 'BATCH5_NOT_RELEASED' });

const titles = HIGH_INTENT_MODEL_RELEASE_SLUGS.map((s) => HIGH_INTENT_MODEL_CONTENT[s].seoTitle);
const descs = HIGH_INTENT_MODEL_RELEASE_SLUGS.map((s) => HIGH_INTENT_MODEL_CONTENT[s].metaDescription);
const dupes = (arr) => [...new Set(arr.filter((v,i) => arr.indexOf(v) !== i))];
const duplicateTitles = dupes(titles);
const duplicateDescriptions = dupes(descs);
const clusterCounts = Object.fromEntries(Object.keys(BATCH5_EXPECTED_CLUSTER_COUNTS).map((cat) => [cat, BATCH5_RELEASE_SLUGS.filter((s) => HIGH_INTENT_MODEL_CONTENT[s]?.categorySlug === cat).length]));
const clusterMismatch = Object.entries(BATCH5_EXPECTED_CLUSTER_COUNTS).filter(([k,v]) => clusterCounts[k] !== v);
const findings = {
  baselineReleaseCount: BASELINE_RELEASE_COUNT,
  batch5ReleaseCount: BATCH5_RELEASE_SLUGS.length,
  releasedTotal: releasedPages.length,
  expectedReleasedTotal: BASELINE_RELEASE_COUNT + BATCH5_RELEASE_SLUGS.length,
  holdModelCount: holdPages.length,
  clusterCounts,
  clusterMismatch: clusterMismatch.length,
  duplicateTitles: duplicateTitles.length,
  duplicateDescriptions: duplicateDescriptions.length,
  ...Object.fromEntries(Object.entries(problems).map(([k,v]) => [k, v.length])),
};
const ignored = new Set(['baselineReleaseCount','batch5ReleaseCount','releasedTotal','expectedReleasedTotal','holdModelCount','clusterCounts']);
const failed = findings.releasedTotal < findings.expectedReleasedTotal || Object.entries(findings).filter(([k]) => !ignored.has(k)).some(([,v]) => typeof v === 'number' && v > 0);
const report = {
  verdict: failed ? 'FAIL' : 'PASS', generatedAt: new Date().toISOString(), batch: 'CONTENT_BATCH_5_MONITOR_DRONE_ACTION_SMARTWATCH', findings,
  batch5Released: BATCH5_RELEASE_SLUGS.map((slug) => ({ slug, path: pageBySlug.get(slug)?.path, h1: pageBySlug.get(slug)?.h1, title: HIGH_INTENT_MODEL_CONTENT[slug]?.seoTitle, category: HIGH_INTENT_MODEL_CONTENT[slug]?.categorySlug, source: HIGH_INTENT_MODEL_CONTENT[slug]?.source?.url })),
  samples: { ...Object.fromEntries(Object.entries(problems).map(([k,v]) => [k, v.slice(0, 10)])), duplicateTitles, duplicateDescriptions },
};
fs.mkdirSync(path.join(root, 'docs/content-batch5'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/content-batch5/content-batch5-audit.json'), JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'docs/content-batch5/released-model-pages.csv'), ['slug,path,category,title,source', ...report.batch5Released.map((r) => [r.slug,r.path,r.category,r.title,r.source].map((x) => `"${String(x ?? '').replaceAll('"','""')}"`).join(','))].join('\n') + '\n');
console.log(JSON.stringify(report, null, 2));
if (failed) process.exitCode = 1;
