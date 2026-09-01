import fs from 'node:fs';
import path from 'node:path';
import { GUIDE_ARCHITECTURE } from '../../src/data/architecture/guides.js';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { HIGH_INTENT_GUIDE_CONTENT } from '../../src/data/highIntentGuideContent.js';
import { FINAL_GUIDE_QUALITY_DECISIONS } from '../../src/data/finalGuideQualityGate.js';
import { getReleasedGuideDiscovery } from '../../src/data/discoveryLinks.js';

const root = process.cwd();
const releaseSet = new Set(FINAL_GUIDE_QUALITY_DECISIONS.release);
const mergeMap = new Map(FINAL_GUIDE_QUALITY_DECISIONS.merge.map((item) => [item.slug, item]));
const keepHoldSet = new Set(FINAL_GUIDE_QUALITY_DECISIONS.keepHold.map((item) => item.slug));
const allDecisionSlugs = new Set([...releaseSet, ...mergeMap.keys(), ...keepHoldSet]);
const finalGatePages = GUIDE_ARCHITECTURE.filter((page) => allDecisionSlugs.has(page.slug));
const released = GUIDE_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX');
const hold = GUIDE_ARCHITECTURE.filter((page) => page.lifecycle === 'HOLD_NOINDEX');
const activePaths = new Set(ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'INDEX').map((p) => p.path));

const problems = {
  missingDecisionPages: [],
  lifecycle: [],
  missingContent: [],
  invalidFields: [],
  duplicateTitle: [],
  duplicateDescription: [],
  duplicateIntro: [],
  missingSource: [],
  invalidSource: [],
  unsafeClaims: [],
  fixedPriceClaims: [],
  unlinked: [],
  holdLeak: [],
  thinDiscovery: [],
  mergeTargetMissing: [],
  mergeHasContent: [],
  keepHoldHasContent: [],
  decisionOverlap: [],
};

if (finalGatePages.length !== 20) problems.missingDecisionPages.push({ expected: 20, actual: finalGatePages.length });
for (const slug of releaseSet) {
  if (mergeMap.has(slug) || keepHoldSet.has(slug)) problems.decisionOverlap.push(slug);
}
for (const slug of mergeMap.keys()) if (keepHoldSet.has(slug)) problems.decisionOverlap.push(slug);

const titleOwner = new Map();
const descOwner = new Map();
const introOwner = new Map();
const sourceAllowed = /(^|\.)(support\.apple\.com|support\.microsoft\.com|learn\.microsoft\.com|dell\.com|asus\.com|corsair\.com|nvidia\.com|amd\.com|intel\.com|nintendo\.com|support\.nintendo\.com|repair\.dji\.com|sony\.com|nikonimgsupport\.com|csrc\.nist\.gov|playstation\.com|nikonusa\.com)$/i;
const unsafe = [/ราคาดีที่สุด/iu, /ได้ราคาดีกว่า/iu, /รับประกันราคา/iu, /ขายได้ราคาเต็ม/iu, /รับทันทีทุก/iu, /ไม่เคยขุดแน่นอน/iu];
const fixedPrice = /(?:฿|ราคา[^\n]{0,22})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const requiredArrays = { steps: 4, priceFactors: 5, checklist: 5, faq: 4 };

for (const page of released) {
  const content = HIGH_INTENT_GUIDE_CONTENT[page.slug];
  if (!content) { problems.missingContent.push(page.slug); continue; }
  for (const [field, min] of Object.entries(requiredArrays)) {
    if (!Array.isArray(content[field]) || content[field].length < min) problems.invalidFields.push({ slug: page.slug, field, min, actual: content[field]?.length ?? 0 });
  }
  for (const field of ['seoTitle','h1','metaDescription','intro','shortAnswer','caution']) {
    if (!content[field] || String(content[field]).trim().length < 25) problems.invalidFields.push({ slug: page.slug, field, reason: 'missing-or-thin' });
  }
  if (page.title !== content.seoTitle || page.h1 !== content.h1 || page.description !== content.metaDescription) problems.invalidFields.push({ slug: page.slug, field: 'architecture-metadata-mismatch' });
  for (const [text, owner, bucket] of [[content.seoTitle, titleOwner, problems.duplicateTitle], [content.metaDescription, descOwner, problems.duplicateDescription]]) {
    const prev = owner.get(text); if (prev && prev !== page.slug) bucket.push({ pages: [prev, page.slug], text }); else owner.set(text, page.slug);
  }
  const introKey = content.intro.replace(/\s+/g, ' ').trim();
  const prevIntro = introOwner.get(introKey); if (prevIntro && prevIntro !== page.slug) problems.duplicateIntro.push({ pages: [prevIntro, page.slug] }); else introOwner.set(introKey, page.slug);
  if (!content.source?.url || !content.source?.label) problems.missingSource.push(page.slug);
  else {
    try { const u = new URL(content.source.url); if (u.protocol !== 'https:' || !sourceAllowed.test(u.hostname)) problems.invalidSource.push({ slug: page.slug, url: content.source.url, hostname: u.hostname }); }
    catch { problems.invalidSource.push({ slug: page.slug, url: content.source.url }); }
  }
  const text = [content.seoTitle, content.h1, content.metaDescription, content.intro, content.shortAnswer, content.caution, ...content.priceFactors, ...content.checklist, ...content.steps.flat(), ...content.faq.flat()].join(' ');
  for (const rx of unsafe) if (rx.test(text)) problems.unsafeClaims.push({ slug: page.slug, pattern: String(rx) });
  if (fixedPrice.test(text)) problems.fixedPriceClaims.push({ slug: page.slug });
  const groups = getReleasedGuideDiscovery(page, content);
  const links = groups.flatMap((g) => g.items || []).map((i) => i.href);
  const unique = new Set(links);
  if (unique.size < 6) problems.thinDiscovery.push({ slug: page.slug, links: unique.size });
  if (releaseSet.has(page.slug) && unique.size < 6) problems.unlinked.push(page.slug);
  for (const href of unique) if (ARCHITECTURE_HOLD_PATHS.has(href)) problems.holdLeak.push({ slug: page.slug, href });
}

for (const slug of releaseSet) {
  const page = GUIDE_ARCHITECTURE.find((p) => p.slug === slug);
  if (!page || page.lifecycle !== 'INDEX') problems.lifecycle.push({ slug, expected: 'INDEX', actual: page?.lifecycle ?? 'MISSING' });
  if (!HIGH_INTENT_GUIDE_CONTENT[slug]) problems.missingContent.push(slug);
}
for (const [slug, decision] of mergeMap) {
  const page = GUIDE_ARCHITECTURE.find((p) => p.slug === slug);
  if (!page || page.lifecycle !== 'HOLD_NOINDEX') problems.lifecycle.push({ slug, expected: 'HOLD_NOINDEX', actual: page?.lifecycle ?? 'MISSING' });
  if (HIGH_INTENT_GUIDE_CONTENT[slug]) problems.mergeHasContent.push(slug);
  if (!activePaths.has(decision.target)) problems.mergeTargetMissing.push({ slug, target: decision.target });
}
for (const slug of keepHoldSet) {
  const page = GUIDE_ARCHITECTURE.find((p) => p.slug === slug);
  if (!page || page.lifecycle !== 'HOLD_NOINDEX') problems.lifecycle.push({ slug, expected: 'HOLD_NOINDEX', actual: page?.lifecycle ?? 'MISSING' });
  if (HIGH_INTENT_GUIDE_CONTENT[slug]) problems.keepHoldHasContent.push(slug);
}

const articleIndex = fs.readFileSync(path.join(root, 'src/pages/บทความ/index.astro'), 'utf8');
if (!articleIndex.includes('releasedGuidePosts')) problems.unlinked.push('article-index-integration');
const route = fs.readFileSync(path.join(root, 'src/pages/บทความ/[slug].astro'), 'utf8');
for (const token of ['ReleasedGuidePage','getHighIntentGuideContent','Article','FAQPage','BreadcrumbList']) if (!route.includes(token)) problems.invalidFields.push({ routeMissing: token });

const architectureIndex = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'INDEX').length;
const architectureHold = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'HOLD_NOINDEX').length;
const issueCount = Object.values(problems).reduce((sum, list) => sum + list.length, 0);
const countsPass = releaseSet.size === 14 && mergeMap.size === 4 && keepHoldSet.size === 2 && released.length === 54 && hold.length === 6 && architectureIndex >= 211 && architectureHold === ARCHITECTURE_PAGES.length - architectureIndex;

const report = {
  verdict: issueCount === 0 && countsPass ? 'PASS' : 'FAIL',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_12_FINAL_GUIDE_QUALITY_GATE',
  findings: {
    finalGateCandidates: finalGatePages.length,
    release: releaseSet.size,
    mergeCandidates: mergeMap.size,
    keepHold: keepHoldSet.size,
    releasedGuidesTotal: released.length,
    guideHold: hold.length,
    architectureIndex,
    architectureHold,
    ...Object.fromEntries(Object.entries(problems).map(([key, value]) => [key, value.length])),
  },
  decisions: FINAL_GUIDE_QUALITY_DECISIONS,
  releasedGuides: [...releaseSet].map((slug) => {
    const p = GUIDE_ARCHITECTURE.find((page) => page.slug === slug); const c = HIGH_INTENT_GUIDE_CONTENT[slug];
    return { slug, path: p?.path, h1: p?.h1, title: p?.title, priceIntent: Boolean(c?.priceIntent), categories: (c?.categorySlugs || []).join('|'), source: c?.source?.url };
  }),
  samples: Object.fromEntries(Object.entries(problems).map(([key, value]) => [key, value.slice(0, 12)])),
};

const out = path.join(root, 'docs/content-batch12');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'content-batch12-audit.json'), JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(path.join(out, 'released-guide-pages.csv'), ['slug,path,h1,title,price_intent,categories,source', ...report.releasedGuides.map((r) => [r.slug,r.path,r.h1,r.title,r.priceIntent,r.categories,r.source].map((x) => `"${String(x ?? '').replaceAll('"','""')}"`).join(','))].join('\n') + '\n');
const decisionRows = [
  ...FINAL_GUIDE_QUALITY_DECISIONS.release.map((slug) => [slug, 'RELEASE', '', 'Passed final content/intent/source/internal-link gate']),
  ...FINAL_GUIDE_QUALITY_DECISIONS.merge.map((x) => [x.slug, 'MERGE_OR_CONSOLIDATE', x.target, x.reason]),
  ...FINAL_GUIDE_QUALITY_DECISIONS.keepHold.map((x) => [x.slug, 'KEEP_HOLD', '', x.reason]),
];
fs.writeFileSync(path.join(out, 'guide-quality-decisions.csv'), ['slug,decision,target,reason', ...decisionRows.map((row) => row.map((x) => `"${String(x ?? '').replaceAll('\"','\"\"')}"`).join(','))].join('\n') + '\n');
console.log(JSON.stringify(report, null, 2));
if (report.verdict !== 'PASS') process.exitCode = 1;
