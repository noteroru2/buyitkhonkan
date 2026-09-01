import fs from 'node:fs';
import path from 'node:path';
import { BATCH16D_MODEL_CONTENT, BATCH16D_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch16D.js';
import { HIGH_INTENT_MODEL_CONTENT } from '../../src/data/highIntentModelContent.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { HUB_ARCHITECTURE } from '../../src/data/architecture/hubs.js';
import { AUTHORITY_HUB_CONTENT } from '../../src/data/authorityHubContent.js';
import { REMAINING_ARCHITECTURE_TRIAGE, TRIAGE_DECISIONS } from '../../src/data/architecture/quality-triage.js';

const root = process.cwd();
const outDir = path.join(root, 'docs/content-batch16d');
fs.mkdirSync(outDir, { recursive: true });
const pageBySlug = new Map(MODEL_ARCHITECTURE.map((page) => [page.slug, page]));
const releasedSet = new Set(MODEL_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX').map((page) => page.slug));
const triageById = new Map(REMAINING_ARCHITECTURE_TRIAGE.map((item) => [item.id, item]));
const brandModelHub = HUB_ARCHITECTURE.find((page) => page.id === 'hub-brands-models');
const declaredClusters = new Set((AUTHORITY_HUB_CONTENT['hub-brands-models']?.directoryGroups || []).flatMap((group) => group.clusters || []));
const authorityComponent = fs.readFileSync(path.join(root, 'src/components/ReleasedAuthorityHub.astro'), 'utf8');
const routeSource = fs.readFileSync(path.join(root, 'src/pages/[slug].astro'), 'utf8');
const problems = { missingPage: [], missingContent: [], lifecycle: [], triageMismatch: [], invalidFields: [], metadataLength: [], duplicateTitle: [], duplicateDescription: [], duplicateIntro: [], duplicateLongCopy: [], parentMismatch: [], badRelated: [], missingSource: [], invalidSource: [], unsafeClaims: [], fixedPriceClaims: [], authorityInbound: [], holdLeak: [], remainingReleaseModels: [], integration: [] };
const requiredArrays = { variantNotes: 4, inspection: 4, priceFactors: 4, sellerChecklist: 4, risks: 3, faq: 4 };
const sourceAllowed = /(^|\.)(fujifilm-x\.com|learnandsupport\.getolympus\.com|explore\.omsystem\.com|help\.na\.panasonic\.com)$/i;
const unsafe = [/ราคาดีที่สุด/iu, /ได้ราคาดีกว่า/iu, /รับประกันราคา/iu, /รับหมด/iu, /ทุกอำเภอ.*ทุกกรณี/iu, /จบภายในวันเดียว/iu, /ปลดล็อก.*ได้แน่นอน/iu, /รับทันทีทุก/iu];
const fixedPrice = /(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const owners = { title: new Map(), desc: new Map(), intro: new Map(), long: new Map() };
const norm = (text) => String(text || '').replace(/\s+/g, ' ').trim();

for (const slug of BATCH16D_RELEASE_SLUGS) {
  const content = BATCH16D_MODEL_CONTENT[slug];
  const page = pageBySlug.get(slug);
  if (!page) { problems.missingPage.push(slug); continue; }
  if (!content) { problems.missingContent.push(slug); continue; }
  if (page.lifecycle !== 'INDEX') problems.lifecycle.push({ slug, actual: page.lifecycle });
  if (triageById.get(page.id)?.decision !== TRIAGE_DECISIONS.RELEASE) problems.triageMismatch.push({ slug, id: page.id, decision: triageById.get(page.id)?.decision });
  for (const [field, min] of Object.entries(requiredArrays)) if (!Array.isArray(content[field]) || content[field].length < min) problems.invalidFields.push({ slug, field, min, actual: content[field]?.length ?? 0 });
  for (const field of ['seoTitle', 'metaDescription', 'intro']) if (norm(content[field]).length < 20) problems.invalidFields.push({ slug, field, reason: 'missing-or-thin' });
  const titleLength = [...content.seoTitle].length;
  const descriptionLength = [...content.metaDescription].length;
  if (titleLength < 45 || titleLength > 110) problems.metadataLength.push({ slug, field: 'seoTitle', length: titleLength });
  if (descriptionLength < 90 || descriptionLength > 210) problems.metadataLength.push({ slug, field: 'metaDescription', length: descriptionLength });
  const category = CATEGORIES.find((item) => item.slug === content.categorySlug);
  if (!category || page.parent !== `/${category?.path || category?.slug}/`) problems.parentMismatch.push({ slug, parent: page.parent, category: content.categorySlug });
  for (const related of content.relatedSlugs || []) if (related === slug || !releasedSet.has(related)) problems.badRelated.push({ slug, related });
  if (!content.source?.url || !content.source?.label) problems.missingSource.push(slug);
  else {
    try {
      const url = new URL(content.source.url);
      if (url.protocol !== 'https:' || !sourceAllowed.test(url.hostname)) problems.invalidSource.push({ slug, url: content.source.url, hostname: url.hostname });
    } catch { problems.invalidSource.push({ slug, url: content.source?.url }); }
  }
  for (const [key, text, bucket] of [['title', content.seoTitle, problems.duplicateTitle], ['desc', content.metaDescription, problems.duplicateDescription], ['intro', content.intro, problems.duplicateIntro]]) {
    const value = norm(text); const previous = owners[key].get(value); if (previous && previous !== slug) bucket.push({ pages: [previous, slug], text: value }); else owners[key].set(value, slug);
  }
  for (const text of [...content.variantNotes, ...content.inspection, ...content.risks, ...content.faq.flat()]) {
    const value = norm(text);
    if (value.length < 35) continue;
    const previous = owners.long.get(value);
    if (previous && previous !== slug) problems.duplicateLongCopy.push({ pages: [previous, slug], text: value }); else owners.long.set(value, slug);
  }
  const allText = [content.seoTitle, content.metaDescription, content.intro, ...content.variantNotes, ...content.inspection, ...content.priceFactors, ...content.sellerChecklist, ...content.risks, ...content.faq.flat()].join(' ');
  for (const rx of unsafe) if (rx.test(allText)) problems.unsafeClaims.push({ slug, pattern: String(rx) });
  if (fixedPrice.test(allText)) problems.fixedPriceClaims.push(slug);
  if (ARCHITECTURE_HOLD_PATHS.has(page.path)) problems.holdLeak.push({ slug, path: page.path });
  if (brandModelHub?.lifecycle !== 'INDEX' || !declaredClusters.has(page.cluster) || !authorityComponent.includes("item.lifecycle === 'INDEX'") || !authorityComponent.includes('cluster.items.map')) problems.authorityInbound.push({ slug, cluster: page.cluster });
}
for (const slug of BATCH16D_RELEASE_SLUGS) if (!HIGH_INTENT_MODEL_CONTENT[slug] || !releasedSet.has(slug)) problems.missingContent.push({ slug, reason: 'not-merged-into-main-content' });
for (const page of MODEL_ARCHITECTURE.filter((item) => item.lifecycle === 'HOLD_NOINDEX')) if (triageById.get(page.id)?.decision === TRIAGE_DECISIONS.RELEASE) problems.remainingReleaseModels.push(page.slug);
for (const [name, token] of [['released model route', 'ReleasedModelPage'], ['released content selector', 'getHighIntentModelContent'], ['authority hub route', 'ReleasedAuthorityHub']]) if (!routeSource.includes(token)) problems.integration.push(name);

const modelIndex = MODEL_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX').length;
const modelHold = MODEL_ARCHITECTURE.filter((page) => page.lifecycle === 'HOLD_NOINDEX').length;
const architectureIndex = ARCHITECTURE_PAGES.filter((page) => page.lifecycle === 'INDEX').length;
const architectureHold = ARCHITECTURE_PAGES.filter((page) => page.lifecycle === 'HOLD_NOINDEX').length;
const issueCount = Object.values(problems).reduce((sum, list) => sum + list.length, 0);
const countContract = BATCH16D_RELEASE_SLUGS.length === 4 && modelIndex === 172 && modelHold === 8 && architectureIndex === 297 && architectureHold === 14 && ARCHITECTURE_HOLD_PATHS.size === 14;
const report = {
  verdict: issueCount === 0 && countContract ? 'PASS' : 'FAIL',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_16D_FINAL_MODEL_RELEASE',
  findings: { batch16dRelease: BATCH16D_RELEASE_SLUGS.length, releasedModelsTotal: modelIndex, modelHold, architectureIndex, architectureHold, issueCount, countContract, ...Object.fromEntries(Object.entries(problems).map(([key, value]) => [key, value.length])) },
  released: BATCH16D_RELEASE_SLUGS.map((slug) => { const page = pageBySlug.get(slug), content = BATCH16D_MODEL_CONTENT[slug]; return { slug, path: page?.path, h1: page?.h1, title: content?.seoTitle, category: content?.categorySlug, source: content?.source?.url }; }),
  problems,
};
fs.writeFileSync(path.join(outDir, 'content-batch16d-audit.json'), JSON.stringify(report, null, 2) + '\n');
const esc = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
fs.writeFileSync(path.join(outDir, 'released-model-pages.csv'), ['slug,path,h1,title,category,source', ...report.released.map((row) => [row.slug, row.path, row.h1, row.title, row.category, row.source].map(esc).join(','))].join('\n') + '\n');
console.log(JSON.stringify(report, null, 2));
if (report.verdict !== 'PASS') process.exitCode = 1;
