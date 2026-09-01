import fs from 'node:fs';
import path from 'node:path';
import { BATCH16B_MODEL_CONTENT, BATCH16B_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch16B.js';
import { HIGH_INTENT_MODEL_CONTENT } from '../../src/data/highIntentModelContent.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { HUB_ARCHITECTURE } from '../../src/data/architecture/hubs.js';
import { AUTHORITY_HUB_CONTENT } from '../../src/data/authorityHubContent.js';
import { REMAINING_ARCHITECTURE_TRIAGE, TRIAGE_DECISIONS } from '../../src/data/architecture/quality-triage.js';

const root = process.cwd();
const outDir = path.join(root, 'docs/content-batch16b');
fs.mkdirSync(outDir, { recursive: true });
const pageBySlug = new Map(MODEL_ARCHITECTURE.map((p) => [p.slug, p]));
const releasedSet = new Set(MODEL_ARCHITECTURE.filter((p) => p.lifecycle === 'INDEX').map((p) => p.slug));
const triageById = new Map(REMAINING_ARCHITECTURE_TRIAGE.map((x) => [x.id, x]));
const brandModelHub = HUB_ARCHITECTURE.find((p) => p.id === 'hub-brands-models');
const declaredClusters = new Set((AUTHORITY_HUB_CONTENT['hub-brands-models']?.directoryGroups || []).flatMap((g) => g.clusters || []));
const componentSource = fs.readFileSync(path.join(root, 'src/components/ReleasedAuthorityHub.astro'), 'utf8');
const routeSource = fs.readFileSync(path.join(root, 'src/pages/[slug].astro'), 'utf8');

const problems = {
  missingPage: [], missingContent: [], lifecycle: [], triageMismatch: [], invalidFields: [], metadataLength: [],
  duplicateTitle: [], duplicateDescription: [], duplicateIntro: [], parentMismatch: [], badRelated: [], missingSource: [], invalidSource: [],
  unsafeClaims: [], fixedPriceClaims: [], authorityInbound: [], holdLeak: [], integration: [],
};
const requiredArrays = { variantNotes: 4, inspection: 4, priceFactors: 4, sellerChecklist: 4, risks: 3, faq: 4 };
const sourceAllowed = /(^|\.)(rog\.asus\.com|asus\.com|lenovo\.com|psref\.lenovo\.com|acer\.com|msi\.com|support\.apple\.com|nvidia\.com)$/i;
const unsafe = [/ราคาดีที่สุด/iu,/ได้ราคาดีกว่า/iu,/รับประกันราคา/iu,/รับหมด/iu,/ทุกอำเภอ.*ทุกกรณี/iu,/จบภายในวันเดียว/iu,/ปลดล็อก.*ได้แน่นอน/iu,/รับทันทีทุก/iu];
const fixedPrice = /(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const titleOwner = new Map(), descOwner = new Map(), introOwner = new Map();

for (const slug of BATCH16B_RELEASE_SLUGS) {
  const c = BATCH16B_MODEL_CONTENT[slug];
  const p = pageBySlug.get(slug);
  if (!p) { problems.missingPage.push(slug); continue; }
  if (!c) { problems.missingContent.push(slug); continue; }
  if (p.lifecycle !== 'INDEX') problems.lifecycle.push({ slug, expected: 'INDEX', actual: p.lifecycle });
  if (triageById.get(p.id)?.decision !== TRIAGE_DECISIONS.RELEASE) problems.triageMismatch.push({ slug, id: p.id, decision: triageById.get(p.id)?.decision });
  for (const [field, min] of Object.entries(requiredArrays)) if (!Array.isArray(c[field]) || c[field].length < min) problems.invalidFields.push({ slug, field, min, actual: c[field]?.length ?? 0 });
  for (const field of ['seoTitle','metaDescription','intro']) if (!c[field] || String(c[field]).trim().length < 20) problems.invalidFields.push({ slug, field, reason: 'missing-or-thin' });
  const titleLen = [...c.seoTitle].length, descLen = [...c.metaDescription].length;
  if (titleLen < 45 || titleLen > 95) problems.metadataLength.push({ slug, field:'seoTitle', length:titleLen });
  if (descLen < 90 || descLen > 195) problems.metadataLength.push({ slug, field:'metaDescription', length:descLen });
  const category = CATEGORIES.find((x) => x.slug === c.categorySlug);
  if (!category || p.parent !== `/${category?.path || category?.slug}/`) problems.parentMismatch.push({ slug, parent:p.parent, category:c.categorySlug });
  if (c.brandSlug && !BRAND_PAGES.some((x) => x.slug === c.brandSlug)) problems.invalidFields.push({ slug, field:'brandSlug', value:c.brandSlug });
  for (const rel of c.relatedSlugs || []) if (rel === slug || !releasedSet.has(rel)) problems.badRelated.push({ slug, related:rel });
  if (!c.source?.url || !c.source?.label) problems.missingSource.push(slug);
  else { try { const u = new URL(c.source.url); if (u.protocol !== 'https:' || !sourceAllowed.test(u.hostname)) problems.invalidSource.push({slug,url:c.source.url,hostname:u.hostname}); } catch { problems.invalidSource.push({slug,url:c.source?.url}); } }
  for (const [text, owner, bucket] of [[c.seoTitle,titleOwner,problems.duplicateTitle],[c.metaDescription,descOwner,problems.duplicateDescription],[c.intro,introOwner,problems.duplicateIntro]]) {
    const key = text.replace(/\s+/g,' ').trim(); const prev=owner.get(key); if(prev&&prev!==slug) bucket.push({pages:[prev,slug],text:key}); else owner.set(key,slug);
  }
  const text = [c.seoTitle,c.metaDescription,c.intro,...c.variantNotes,...c.inspection,...c.priceFactors,...c.sellerChecklist,...c.risks,...c.faq.flat()].join(' ');
  for (const rx of unsafe) if (rx.test(text)) problems.unsafeClaims.push({slug,pattern:String(rx)});
  if (fixedPrice.test(text)) problems.fixedPriceClaims.push(slug);
  if (ARCHITECTURE_HOLD_PATHS.has(p.path)) problems.holdLeak.push({slug,path:p.path});
  if (brandModelHub?.lifecycle !== 'INDEX' || !declaredClusters.has(p.cluster) || !componentSource.includes("item.lifecycle === 'INDEX'") || !componentSource.includes('cluster.items.map')) {
    problems.authorityInbound.push({ slug, cluster:p.cluster, hubLifecycle:brandModelHub?.lifecycle });
  }
}

for (const slug of BATCH16B_RELEASE_SLUGS) if (!HIGH_INTENT_MODEL_CONTENT[slug] || !releasedSet.has(slug)) problems.missingContent.push({slug,reason:'not-merged-into-main-content'});
for (const [name, token] of [['released model route','ReleasedModelPage'],['released content selector','getHighIntentModelContent'],['authority hub route','ReleasedAuthorityHub']]) if (!routeSource.includes(token)) problems.integration.push(name);

const modelIndex = MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX').length;
const modelHold = MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const architectureIndex = ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length;
const architectureHold = ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const clusterCounts = BATCH16B_RELEASE_SLUGS.reduce((acc,slug)=>{const cat=BATCH16B_MODEL_CONTENT[slug]?.categorySlug;acc[cat]=(acc[cat]||0)+1;return acc;},{});
const issueCount = Object.values(problems).reduce((sum,list)=>sum+list.length,0);
const countContract = BATCH16B_RELEASE_SLUGS.length===18 && modelIndex>=150 && modelHold<=30 && architectureIndex>=275 && architectureHold<=36 && ARCHITECTURE_HOLD_PATHS.size===architectureHold;
const report = {
  verdict: issueCount===0 && countContract ? 'PASS':'FAIL', generatedAt:new Date().toISOString(), batch:'CONTENT_BATCH_16B_MODEL_RELEASE_ROUND_1',
  findings:{ batch16bRelease:BATCH16B_RELEASE_SLUGS.length, releasedModelsTotal:modelIndex, modelHold, architectureIndex, architectureHold, clusterCounts, issueCount, countContract, ...Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.length])) },
  released:BATCH16B_RELEASE_SLUGS.map((slug)=>{const p=pageBySlug.get(slug),c=BATCH16B_MODEL_CONTENT[slug];return {slug,path:p?.path,h1:p?.h1,title:c?.seoTitle,category:c?.categorySlug,brand:c?.brandSlug||'',source:c?.source?.url};}),
  problems,
};
fs.writeFileSync(path.join(outDir,'content-batch16b-audit.json'),JSON.stringify(report,null,2)+'\n');
const esc=(v)=>`"${String(v??'').replaceAll('"','""')}"`;
fs.writeFileSync(path.join(outDir,'released-model-pages.csv'),['slug,path,h1,title,category,brand,source',...report.released.map((r)=>[r.slug,r.path,r.h1,r.title,r.category,r.brand,r.source].map(esc).join(','))].join('\n')+'\n');
console.log(JSON.stringify(report,null,2)); if(report.verdict!=='PASS') process.exitCode=1;
