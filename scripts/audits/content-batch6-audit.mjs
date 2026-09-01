import fs from 'node:fs';
import path from 'node:path';
import { HIGH_INTENT_CONDITION_CONTENT, HIGH_INTENT_CONDITION_RELEASE_SLUGS } from '../../src/data/highIntentConditionContent.js';
import { CONDITION_ARCHITECTURE } from '../../src/data/architecture/conditions.js';
import { CONDITION_PAGES } from '../../src/data/conditionPages.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { getCategoryDiscovery, getConditionHubDiscovery, getReleasedConditionDiscovery } from '../../src/data/discoveryLinks.js';

const root = process.cwd();
const BASELINE_ARCHITECTURE_INDEX = 88;
const EXPECTED_BATCH6 = 24;
const pageBySlug = new Map(CONDITION_ARCHITECTURE.map((p) => [p.slug, p]));
const released = CONDITION_ARCHITECTURE.filter((p) => p.lifecycle === 'INDEX');
const hold = CONDITION_ARCHITECTURE.filter((p) => p.lifecycle === 'HOLD_NOINDEX');
const releasedSet = new Set(HIGH_INTENT_CONDITION_RELEASE_SLUGS);
const legacyConditionSet = new Set(CONDITION_PAGES.map((p) => p.slug));
const requiredArrays = { symptoms: 4, inspection: 4, priceFactors: 4, sellerChecklist: 4, avoid: 3, faq: 4 };
const problems = {
  missingContent: [], invalidFields: [], invalidLifecycle: [], parentMismatch: [],
  invalidGeneralCondition: [], badRelated: [], unlinked: [], missingSource: [], invalidSource: [],
  unsafeClaims: [], fixedPriceClaims: [], duplicateEditorial: [], duplicateIntent: [], routeIntegration: [], schemaIntegration: [],
};
const paraOwner = new Map();
const unsafe = [/รับหมด/iu,/ราคาดีที่สุด/iu,/รับประกันราคา/iu,/ได้ราคาดีกว่า/iu,/ทุกอำเภอ.*ทุกกรณี/iu,/จบภายในวันเดียว/iu,/รับซื้อทุกสภาพ/iu];
const fixedPrice = /(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const titleOwner = new Map();
const descOwner = new Map();

for (const slug of HIGH_INTENT_CONDITION_RELEASE_SLUGS) {
  const c = HIGH_INTENT_CONDITION_CONTENT[slug];
  const p = pageBySlug.get(slug);
  if (!c || !p) { problems.missingContent.push(slug); continue; }
  if (p.lifecycle !== 'INDEX') problems.invalidLifecycle.push({ slug, lifecycle: p.lifecycle });
  for (const [field,min] of Object.entries(requiredArrays)) {
    if (!Array.isArray(c[field]) || c[field].length < min) problems.invalidFields.push({ slug, field, min, actual: c[field]?.length ?? 0 });
  }
  if (!c.seoTitle || !c.metaDescription || !c.intro || !c.categorySlug) problems.invalidFields.push({ slug, field: 'required-text' });
  const category = CATEGORIES.find((x) => x.slug === c.categorySlug);
  if (!category) problems.invalidFields.push({ slug, field: 'categorySlug', value: c.categorySlug });
  const expectedParent = category ? `/${category.path || category.slug}/` : null;
  if (expectedParent && p.parent !== expectedParent) problems.parentMismatch.push({ slug, parent: p.parent, expectedParent });
  if (c.generalConditionSlug && !legacyConditionSet.has(c.generalConditionSlug)) problems.invalidGeneralCondition.push({ slug, generalConditionSlug: c.generalConditionSlug });
  for (const rel of c.relatedConditionSlugs || []) {
    if (rel === slug || !releasedSet.has(rel)) problems.badRelated.push({ slug, related: rel });
  }
  if (!c.source?.url || !c.source?.label) problems.missingSource.push(slug);
  else {
    try {
      const u = new URL(c.source.url);
      if (!['https:'].includes(u.protocol)) problems.invalidSource.push({ slug, url: c.source.url, reason: 'non-https' });
      if (!/(apple|asus|dell|lenovo|microsoft|nikon|playstation)/i.test(u.hostname)) problems.invalidSource.push({ slug, url: c.source.url, reason: 'non-authoritative-domain' });
    } catch { problems.invalidSource.push({ slug, url: c.source.url, reason: 'invalid-url' }); }
  }

  const texts = [c.seoTitle,c.metaDescription,c.intro,...c.symptoms,...c.inspection,...c.priceFactors,...c.sellerChecklist,...c.avoid,...c.faq.flat()];
  for (const text of texts.filter(Boolean)) {
    for (const pattern of unsafe) if (pattern.test(text)) problems.unsafeClaims.push({ slug, text, pattern: String(pattern) });
    if (fixedPrice.test(text)) problems.fixedPriceClaims.push({ slug, text });
    const clean = text.replace(/\s+/g,' ').trim();
    if (clean.length >= 95) {
      const prev = paraOwner.get(clean);
      if (prev && prev !== slug) problems.duplicateEditorial.push({ pages:[prev,slug], text:clean.slice(0,180) });
      else paraOwner.set(clean,slug);
    }
  }
  for (const [kind, text, owner] of [['title',c.seoTitle,titleOwner],['description',c.metaDescription,descOwner]]) {
    const prev = owner.get(text);
    if (prev && prev !== slug) problems.duplicateIntent.push({ kind, pages:[prev,slug], text });
    else owner.set(text,slug);
  }

  const categoryLinks = category ? new Set(getCategoryDiscovery(category).flatMap((g)=>g.items||[]).map((i)=>i.href)) : new Set();
  const hubLinks = new Set(getConditionHubDiscovery().flatMap((g)=>g.items||[]).map((i)=>i.href));
  const linked = categoryLinks.has(p.path) || hubLinks.has(p.path);
  if (!linked) problems.unlinked.push({ slug, path:p.path });

  const ownLinks = getReleasedConditionDiscovery(p,c).flatMap((g)=>g.items||[]).map((i)=>i.href);
  for (const href of ownLinks) {
    const target = CONDITION_ARCHITECTURE.find((x)=>x.path===href);
    if (target && target.lifecycle !== 'INDEX') problems.badRelated.push({ slug, relatedHref: href, lifecycle: target.lifecycle });
  }
}
for (const p of released) if (!releasedSet.has(p.slug)) problems.invalidLifecycle.push({ slug:p.slug, lifecycle:'INDEX_WITHOUT_CONTENT' });

const routeSource = fs.readFileSync(path.join(root,'src/pages/[slug].astro'),'utf8');
const componentSource = fs.readFileSync(path.join(root,'src/components/ReleasedConditionPage.astro'),'utf8');
const routeTokens = ['getHighIntentConditionContent','releasedConditionContent','<ReleasedConditionPage'];
for (const token of routeTokens) if (!routeSource.includes(token)) problems.routeIntegration.push(token);
const schemaTokens = ['releasedConditionBreadcrumbLd','releasedConditionServiceLd','releasedConditionFaqLd'];
for (const token of schemaTokens) if (!routeSource.includes(token)) problems.schemaIntegration.push(token);
for (const token of ['Condition / Problem Intent · CONTENT VERIFIED','condition-price','condition-prepare','condition-avoid','DiscoveryHub']) {
  if (!componentSource.includes(token)) problems.routeIntegration.push(`component:${token}`);
}

const findings = {
  batch6ReleaseCount: HIGH_INTENT_CONDITION_RELEASE_SLUGS.length,
  expectedBatch6ReleaseCount: EXPECTED_BATCH6,
  conditionArchitectureReleased: released.length,
  conditionArchitectureHold: hold.length,
  architectureIndexAfterBatch6: BASELINE_ARCHITECTURE_INDEX + released.length,
  architectureHoldAfterBatch6: 311 - (BASELINE_ARCHITECTURE_INDEX + released.length),
  ...Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.length])),
};
const ignored = new Set(['batch6ReleaseCount','expectedBatch6ReleaseCount','conditionArchitectureReleased','conditionArchitectureHold','architectureIndexAfterBatch6','architectureHoldAfterBatch6']);
const failed = findings.batch6ReleaseCount !== EXPECTED_BATCH6 || findings.conditionArchitectureReleased !== EXPECTED_BATCH6 || Object.entries(findings).filter(([k])=>!ignored.has(k)).some(([,v])=>typeof v==='number' && v>0);
const report = {
  verdict: failed ? 'FAIL' : 'PASS',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_6_CONDITION_PROBLEM_INTENT',
  findings,
  releasedConditions: HIGH_INTENT_CONDITION_RELEASE_SLUGS.map((slug)=>({
    slug, path:pageBySlug.get(slug)?.path, h1:pageBySlug.get(slug)?.h1,
    category:HIGH_INTENT_CONDITION_CONTENT[slug]?.categorySlug,
    title:HIGH_INTENT_CONDITION_CONTENT[slug]?.seoTitle,
    source:HIGH_INTENT_CONDITION_CONTENT[slug]?.source?.url,
  })),
  samples: Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.slice(0,12)])),
};
const out=path.join(root,'docs/content-batch6');
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'content-batch6-audit.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(out,'released-condition-pages.csv'),['slug,path,category,h1,title,source',...report.releasedConditions.map((r)=>[r.slug,r.path,r.category,r.h1,r.title,r.source].map((x)=>`"${String(x??'').replaceAll('"','""')}"`).join(','))].join('\n')+'\n');
console.log(JSON.stringify(report,null,2));
if (failed) process.exitCode=1;
