import fs from 'node:fs';
import path from 'node:path';
import { BATCH14_MODEL_CONTENT, BATCH14_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch14.js';
import { HIGH_INTENT_MODEL_CONTENT, HIGH_INTENT_MODEL_RELEASE_SLUGS } from '../../src/data/highIntentModelContent.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { getCategoryDiscovery } from '../../src/data/discoveryLinks.js';
import { getAuthorityHubContent } from '../../src/data/authorityHubContent.js';

const root = process.cwd();
const brandModelHub = ARCHITECTURE_PAGES.find((p) => p.id === 'hub-brands-models');
const authorityClusters = new Set((getAuthorityHubContent('hub-brands-models')?.directoryGroups || []).flatMap((g) => g.clusters || []));
const authorityDirectoryLive = brandModelHub?.lifecycle === 'INDEX';
const releasedSet = new Set(HIGH_INTENT_MODEL_RELEASE_SLUGS);
const pageBySlug = new Map(MODEL_ARCHITECTURE.map((p) => [p.slug, p]));
const problems = {
  missingPage: [], lifecycle: [], missingContent: [], invalidFields: [], parentMismatch: [], badRelated: [], unlinked: [], holdLeak: [],
  duplicateTitle: [], duplicateDescription: [], duplicateIntro: [], missingSource: [], invalidSource: [], unsafeClaims: [], fixedPriceClaims: [], metadataLength: [], categoryOverflow: [],
};
const requiredArrays = { variantNotes: 4, inspection: 4, priceFactors: 4, sellerChecklist: 4, risks: 3, faq: 4 };
const sourceAllowed = /(^|\.)(sony\.com|canon|fujifilm-x\.com|getolympus\.com|panasonic\.com|nintendo\.com|xbox\.com|amd\.com|nvidia\.com)$/i;
const unsafe = [/ราคาดีที่สุด/iu,/ได้ราคาดีกว่า/iu,/รับประกันราคา/iu,/รับหมด/iu,/ทุกอำเภอ.*ทุกกรณี/iu,/จบภายในวันเดียว/iu,/ปลดล็อก.*ได้แน่นอน/iu];
const fixedPrice = /(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const titleOwner = new Map(), descOwner = new Map(), introOwner = new Map();

for (const slug of BATCH14_RELEASE_SLUGS) {
  const c = BATCH14_MODEL_CONTENT[slug];
  const p = pageBySlug.get(slug);
  if (!p) { problems.missingPage.push(slug); continue; }
  if (!c) { problems.missingContent.push(slug); continue; }
  if (p.lifecycle !== 'INDEX') problems.lifecycle.push({ slug, expected: 'INDEX', actual: p.lifecycle });
  for (const [field,min] of Object.entries(requiredArrays)) if (!Array.isArray(c[field]) || c[field].length < min) problems.invalidFields.push({ slug, field, min, actual: c[field]?.length ?? 0 });
  for (const field of ['seoTitle','metaDescription','intro']) if (!c[field] || String(c[field]).trim().length < 20) problems.invalidFields.push({ slug, field, reason: 'missing-or-thin' });
  const titleLen = [...c.seoTitle].length, descLen = [...c.metaDescription].length;
  if (titleLen < 45 || titleLen > 90) problems.metadataLength.push({ slug, field:'seoTitle', length:titleLen });
  if (descLen < 90 || descLen > 190) problems.metadataLength.push({ slug, field:'metaDescription', length:descLen });
  const category = CATEGORIES.find((x) => x.slug === c.categorySlug);
  if (!category || p.parent !== `/${category?.path || category?.slug}/`) problems.parentMismatch.push({ slug, parent:p.parent, category:c.categorySlug });
  for (const rel of c.relatedSlugs || []) if (rel === slug || !releasedSet.has(rel)) problems.badRelated.push({ slug, related:rel });
  if (!c.source?.url || !c.source?.label) problems.missingSource.push(slug);
  else { try { const u = new URL(c.source.url); const ok = u.protocol === 'https:' && (sourceAllowed.test(u.hostname) || u.hostname === 'global.canon'); if (!ok) problems.invalidSource.push({slug,url:c.source.url,hostname:u.hostname}); } catch { problems.invalidSource.push({slug,url:c.source?.url}); } }
  for (const [text, owner, bucket] of [[c.seoTitle,titleOwner,problems.duplicateTitle],[c.metaDescription,descOwner,problems.duplicateDescription],[c.intro,introOwner,problems.duplicateIntro]]) {
    const key = text.replace(/\s+/g,' ').trim(); const prev=owner.get(key); if(prev&&prev!==slug) bucket.push({pages:[prev,slug],text:key}); else owner.set(key,slug);
  }
  const text = [c.seoTitle,c.metaDescription,c.intro,...c.variantNotes,...c.inspection,...c.priceFactors,...c.sellerChecklist,...c.risks,...c.faq.flat()].join(' ');
  for (const rx of unsafe) if (rx.test(text)) problems.unsafeClaims.push({slug,pattern:String(rx)});
  if (fixedPrice.test(text)) problems.fixedPriceClaims.push(slug);
  const catLinks = new Set(getCategoryDiscovery(category).flatMap((g)=>g.items||[]).map((x)=>x.href));
  const authorityInbound = authorityDirectoryLive && authorityClusters.has(p.cluster);
  if (!catLinks.has(p.path) && !authorityInbound) problems.unlinked.push({slug,path:p.path,category:c.categorySlug});
  for (const rel of c.relatedSlugs || []) { const href=pageBySlug.get(rel)?.path; if (href && ARCHITECTURE_HOLD_PATHS.has(href)) problems.holdLeak.push({slug,href}); }
}

for (const slug of BATCH14_RELEASE_SLUGS) if (!HIGH_INTENT_MODEL_CONTENT[slug] || !releasedSet.has(slug)) problems.missingContent.push({slug,reason:'not-merged'});
for (const cat of ['camera','game-console','computer','gpu']) {
  const released = Object.values(HIGH_INTENT_MODEL_CONTENT).filter((x)=>x.categorySlug===cat).length;
  if (released > 16 && !authorityDirectoryLive) problems.categoryOverflow.push({ category:cat, released, limit:16, reason:'authority-model-directory-not-live' });
}

const modelIndex = MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX').length;
const modelHold = MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const architectureIndex = ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length;
const architectureHold = ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const clusterCounts = BATCH14_RELEASE_SLUGS.reduce((acc,slug)=>{const cat=BATCH14_MODEL_CONTENT[slug]?.categorySlug;acc[cat]=(acc[cat]||0)+1;return acc;},{});
const issueCount = Object.values(problems).reduce((sum,list)=>sum+list.length,0);
const countsPass = BATCH14_RELEASE_SLUGS.length===20
  && BATCH14_RELEASE_SLUGS.every((slug)=>pageBySlug.get(slug)?.lifecycle==='INDEX' && HIGH_INTENT_MODEL_CONTENT[slug])
  && MODEL_ARCHITECTURE.length===180
  && modelIndex>=132 && modelHold===MODEL_ARCHITECTURE.length-modelIndex
  && ARCHITECTURE_PAGES.length===311
  && architectureIndex>=255 && architectureHold===ARCHITECTURE_PAGES.length-architectureIndex;
const report = {
  verdict: issueCount===0 && countsPass ? 'PASS':'FAIL', generatedAt:new Date().toISOString(), batch:'CONTENT_BATCH_14_MODEL_TOPICAL_BREADTH',
  findings:{ batch14Release:BATCH14_RELEASE_SLUGS.length, releasedModelsTotal:modelIndex, modelHold, architectureIndex, architectureHold, clusterCounts, ...Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.length])) },
  released:BATCH14_RELEASE_SLUGS.map((slug)=>{const p=pageBySlug.get(slug),c=BATCH14_MODEL_CONTENT[slug];return {slug,path:p?.path,h1:p?.h1,title:c?.seoTitle,category:c?.categorySlug,source:c?.source?.url};}),
  samples:Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.slice(0,12)])),
};
const out=path.join(root,'docs/content-batch14');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'content-batch14-audit.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(out,'released-model-pages.csv'),['slug,path,h1,title,category,source',...report.released.map((r)=>[r.slug,r.path,r.h1,r.title,r.category,r.source].map((x)=>`"${String(x??'').replaceAll('"','""')}"`).join(','))].join('\n')+'\n');
console.log(JSON.stringify(report,null,2)); if(report.verdict!=='PASS') process.exitCode=1;
