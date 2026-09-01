import fs from 'node:fs';
import path from 'node:path';
import { HIGH_INTENT_B2B_CONTENT, HIGH_INTENT_B2B_RELEASE_SLUGS } from '../../src/data/highIntentB2BContent.js';
import { B2B_ARCHITECTURE } from '../../src/data/architecture/b2b.js';
import { HUB_ARCHITECTURE } from '../../src/data/architecture/hubs.js';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { getB2BHubDiscovery, getReleasedB2BDiscovery } from '../../src/data/discoveryLinks.js';

const root=process.cwd();
const EXPECTED=22;
const pageBySlug=new Map(B2B_ARCHITECTURE.map((p)=>[p.slug,p]));
const released=B2B_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX');
const hold=B2B_ARCHITECTURE.filter((p)=>p.lifecycle==='HOLD_NOINDEX');
const hub=HUB_ARCHITECTURE.find((p)=>p.id==='hub-b2b');
const releasedSet=new Set(HIGH_INTENT_B2B_RELEASE_SLUGS);
const titleOwner=new Map(), descOwner=new Map(), introOwner=new Map();
const unsafe=[/ราคาดีที่สุด/iu,/รับประกันราคา/iu,/ได้ราคาดีกว่า/iu,/จบภายในวันเดียว/iu,/รับหมด/iu,/ทุกอำเภอ.*ทุกกรณี/iu,/ลบข้อมูลให้ปลอดภัย 100%/iu];
const fixedPrice=/(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const allowedSource=/(nist\.gov|learn\.microsoft\.com|support\.apple\.com|support\.google\.com|dell\.com)$/i;
const requiredArrays={suitableFor:4,assetList:4,grouping:4,workflow:5,documents:4,handover:4,blockers:4,faq:4,sources:1};
const problems={missingContent:[],invalidFields:[],invalidLifecycle:[],badParent:[],badRelated:[],missingSource:[],invalidSource:[],unsafeClaims:[],fixedPriceClaims:[],duplicateIntent:[],duplicateEditorial:[],unlinked:[],holdLeak:[],routeIntegration:[],schemaIntegration:[],technicalSlug:[]};

for(const slug of HIGH_INTENT_B2B_RELEASE_SLUGS){
  const c=HIGH_INTENT_B2B_CONTENT[slug]; const p=pageBySlug.get(slug);
  if(!c||!p){problems.missingContent.push(slug);continue;}
  if(p.lifecycle!=='INDEX') problems.invalidLifecycle.push({slug,lifecycle:p.lifecycle});
  if(p.parent!=='/รับซื้อยกล็อต-บริษัท/') problems.badParent.push({slug,parent:p.parent});
  if(!p.path.endsWith('-ขอนแก่น/')) problems.technicalSlug.push({slug,path:p.path,reason:'missing-local-suffix'});
  if(/^\/[a-z][a-z0-9-]+-ขอนแก่น\/$/.test(p.path)) problems.technicalSlug.push({slug,path:p.path,reason:'english-technical-slug'});
  for(const [field,min] of Object.entries(requiredArrays)) if(!Array.isArray(c[field])||c[field].length<min) problems.invalidFields.push({slug,field,min,actual:c[field]?.length??0});
  if(!c.seoTitle||!c.metaDescription||!c.intro||!Array.isArray(c.categorySlugs)||!c.categorySlugs.length) problems.invalidFields.push({slug,field:'required-text'});
  for(const categorySlug of c.categorySlugs) if(!CATEGORIES.some((x)=>x.slug===categorySlug)) problems.invalidFields.push({slug,field:'categorySlug',value:categorySlug});
  for(const rel of c.relatedSlugs||[]) if(rel===slug||!releasedSet.has(rel)) problems.badRelated.push({slug,related:rel});
  for(const source of c.sources||[]){
    if(!source?.url||!source?.label){problems.missingSource.push(slug);continue;}
    try{const u=new URL(source.url);if(u.protocol!=='https:'||!allowedSource.test(u.hostname))problems.invalidSource.push({slug,url:source.url,hostname:u.hostname});}catch{problems.invalidSource.push({slug,url:source.url,reason:'invalid-url'});}
  }
  const texts=[c.seoTitle,c.metaDescription,c.intro,...c.suitableFor,...c.assetList,...c.grouping,...c.workflow,...c.documents,...c.handover,...c.blockers,...c.faq.flat()];
  for(const text of texts.filter(Boolean)){for(const rx of unsafe)if(rx.test(text))problems.unsafeClaims.push({slug,text,pattern:String(rx)});if(fixedPrice.test(text))problems.fixedPriceClaims.push({slug,text});}
  for(const [kind,text,owner] of [['title',c.seoTitle,titleOwner],['description',c.metaDescription,descOwner]]){const prev=owner.get(text);if(prev&&prev!==slug)problems.duplicateIntent.push({kind,pages:[prev,slug],text});else owner.set(text,slug);}
  const introKey=c.intro.replace(/\s+/g,' ').trim(); const prevIntro=introOwner.get(introKey); if(prevIntro&&prevIntro!==slug)problems.duplicateEditorial.push({pages:[prevIntro,slug],text:introKey}); else introOwner.set(introKey,slug);
  const hubLinks=new Set(getB2BHubDiscovery().flatMap((g)=>g.items||[]).map((i)=>i.href));
  if(!hubLinks.has(p.path))problems.unlinked.push({slug,path:p.path});
  for(const href of getReleasedB2BDiscovery(p,c).flatMap((g)=>g.items||[]).map((i)=>i.href)) if(ARCHITECTURE_HOLD_PATHS.has(href)) problems.holdLeak.push({slug,href});
}
for(const p of released) if(!releasedSet.has(p.slug)) problems.invalidLifecycle.push({slug:p.slug,lifecycle:'INDEX_WITHOUT_CONTENT'});

const hubContent=HIGH_INTENT_B2B_CONTENT['hub-b2b'];
if(!hub||hub.lifecycle!=='INDEX'||!hubContent?.isHub) problems.invalidLifecycle.push({slug:'hub-b2b',lifecycle:hub?.lifecycle||'MISSING'});
const route=fs.readFileSync(path.join(root,'src/pages/[slug].astro'),'utf8');
const component=fs.readFileSync(path.join(root,'src/components/ReleasedB2BPage.astro'),'utf8');
for(const token of ['getHighIntentB2BContent','releasedB2BContent','<ReleasedB2BPage']) if(!route.includes(token))problems.routeIntegration.push(token);
for(const token of ['releasedB2BBreadcrumbLd','releasedB2BServiceLd','releasedB2BFaqLd']) if(!route.includes(token))problems.schemaIntegration.push(token);
for(const token of ['B2B / Corporate / Bulk Intent · CONTENT VERIFIED','asset-list','workflow','documents','handover','DiscoveryHub']) if(!component.includes(token))problems.routeIntegration.push(`component:${token}`);

const indexCount=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length;
const holdCount=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const findings={batch7ReleaseCount:HIGH_INTENT_B2B_RELEASE_SLUGS.length,expectedBatch7ReleaseCount:EXPECTED,b2bArchitectureReleased:released.length,b2bArchitectureHold:hold.length,b2bHubIndex:hub?.lifecycle==='INDEX',architectureIndexAfterBatch7:indexCount,architectureHoldAfterBatch7:holdCount,...Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.length]))};
const ignore=new Set(['batch7ReleaseCount','expectedBatch7ReleaseCount','b2bArchitectureReleased','b2bArchitectureHold','architectureIndexAfterBatch7','architectureHoldAfterBatch7']);
const failed=findings.batch7ReleaseCount!==EXPECTED||findings.b2bArchitectureReleased!==EXPECTED||!findings.b2bHubIndex||indexCount<135||holdCount!==ARCHITECTURE_PAGES.length-indexCount||Object.entries(findings).filter(([k])=>!ignore.has(k)&&k!=='b2bHubIndex').some(([,v])=>typeof v==='number'&&v>0);
const report={verdict:failed?'FAIL':'PASS',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_7_B2B_CORPORATE_BULK',findings,releasedB2B:HIGH_INTENT_B2B_RELEASE_SLUGS.map((slug)=>({slug,path:pageBySlug.get(slug)?.path,h1:pageBySlug.get(slug)?.h1,title:HIGH_INTENT_B2B_CONTENT[slug]?.seoTitle,categories:HIGH_INTENT_B2B_CONTENT[slug]?.categorySlugs.join('|'),sources:HIGH_INTENT_B2B_CONTENT[slug]?.sources.map((s)=>s.url).join('|')})),samples:Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.slice(0,12)]))};
const out=path.join(root,'docs/content-batch7');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'content-batch7-audit.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(out,'released-b2b-pages.csv'),['slug,path,categories,h1,title,sources',...report.releasedB2B.map((r)=>[r.slug,r.path,r.categories,r.h1,r.title,r.sources].map((x)=>`"${String(x??'').replaceAll('"','""')}"`).join(','))].join('\n')+'\n');
console.log(JSON.stringify(report,null,2)); if(failed)process.exitCode=1;
