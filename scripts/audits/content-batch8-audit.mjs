import fs from 'node:fs';
import path from 'node:path';
import { HIGH_INTENT_DISTRICT_CONTENT, HIGH_INTENT_DISTRICT_BATCH8_SLUGS } from '../../src/data/highIntentDistrictContent.js';
import { DISTRICT_ARCHITECTURE } from '../../src/data/architecture/districts.js';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { LOCAL_PAGES } from '../../src/data/localPages.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { getAreaHubDiscovery, getReleasedDistrictDiscovery } from '../../src/data/discoveryLinks.js';

const root=process.cwd();
const EXPECTED=10;
const expectedDistances={ 'ban-haet':18,'ban-fang':22,'phra-yuen':30,'nong-ruea':45,'ubolratana':50,'chonnabot':55,'mancha-khiri':58,'khao-suan-kwang':59,'kranuan':66,'phu-wiang':68 };
const pageBySlug=new Map(DISTRICT_ARCHITECTURE.map((p)=>[p.slug,p]));
const released=DISTRICT_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX');
const hold=DISTRICT_ARCHITECTURE.filter((p)=>p.lifecycle==='HOLD_NOINDEX');
const releasedSet=new Set(DISTRICT_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX').map((p)=>p.slug));
const batch8Set=new Set(HIGH_INTENT_DISTRICT_BATCH8_SLUGS);
const liveLocalSlugs=new Set(LOCAL_PAGES.map((p)=>p.slug));
const titleOwner=new Map(),descOwner=new Map(),introOwner=new Map();
const unsafe=[/(?<!ไม่)รับประกัน.*(?:รับ|ราคา|คิว)/iu,/รับได้ทุกจุดทุกเวลา/iu,/ราคาดีที่สุด/iu,/ได้ราคาดีกว่า/iu,/เคสลูกค้าจริง/iu,/มีสาขา.*(?:บ้านฝาง|พระยืน|บ้านแฮด|หนองเรือ|อุบลรัตน์|ชนบท|มัญจาคีรี|เขาสวนกวาง|กระนวน|ภูเวียง)/iu];
const fixedPrice=/(?:฿|ราคา[^\n]{0,25})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const allowedSource=/(^|\.)khonkaen\.go\.th$/i;
const requiredArrays={referencePoints:3,suitable:4,checklist:4,cautions:2,relatedDistrictSlugs:3,categorySlugs:4,faq:4,sources:2};
const problems={missingContent:[],invalidFields:[],invalidLifecycle:[],badParent:[],badRelated:[],missingSource:[],invalidSource:[],unsafeClaims:[],fixedPriceClaims:[],duplicateIntent:[],duplicateEditorial:[],unlinked:[],holdLeak:[],routeIntegration:[],schemaIntegration:[],badDistance:[],technicalSlug:[],doorwayCopy:[]};

const hubLinks=new Set(getAreaHubDiscovery().flatMap((g)=>g.items||[]).map((i)=>i.href));
for(const slug of HIGH_INTENT_DISTRICT_BATCH8_SLUGS){
  const c=HIGH_INTENT_DISTRICT_CONTENT[slug]; const p=pageBySlug.get(slug);
  if(!c||!p){problems.missingContent.push(slug);continue;}
  if(p.lifecycle!=='INDEX') problems.invalidLifecycle.push({slug,lifecycle:p.lifecycle});
  if(p.parent!=='/พื้นที่ให้บริการ/'||p.directory!=='/พื้นที่ให้บริการ/') problems.badParent.push({slug,parent:p.parent,directory:p.directory});
  if(!p.path.startsWith('/รับซื้อไอที-')||/[a-z]{3,}/i.test(decodeURIComponent(p.path))) problems.technicalSlug.push({slug,path:p.path});
  if(expectedDistances[slug]!==c.distanceKm) problems.badDistance.push({slug,expected:expectedDistances[slug],actual:c.distanceKm});
  for(const [field,min] of Object.entries(requiredArrays)) if(!Array.isArray(c[field])||c[field].length<min) problems.invalidFields.push({slug,field,min,actual:c[field]?.length??0});
  for(const field of ['seoTitle','metaDescription','h1','intro','meeting','travelNote','corridor']) if(!c[field]||String(c[field]).trim().length<20) problems.invalidFields.push({slug,field,reason:'missing-or-thin'});
  for(const cat of c.categorySlugs||[]) if(!CATEGORIES.some((x)=>x.slug===cat)) problems.invalidFields.push({slug,field:'categorySlug',value:cat});
  for(const rel of c.relatedDistrictSlugs||[]) if(rel===slug||(!releasedSet.has(rel)&&!liveLocalSlugs.has(rel))) problems.badRelated.push({slug,related:rel});
  for(const source of c.sources||[]){
    if(!source?.url||!source?.label){problems.missingSource.push(slug);continue;}
    try{const u=new URL(source.url);if(u.protocol!=='https:'||!allowedSource.test(u.hostname))problems.invalidSource.push({slug,url:source.url,hostname:u.hostname});}catch{problems.invalidSource.push({slug,url:source.url,reason:'invalid-url'});}
  }
  const texts=[c.seoTitle,c.metaDescription,c.h1,c.intro,c.meeting,c.travelNote,c.corridor,...c.referencePoints,...c.suitable,...c.checklist,...c.cautions,...c.faq.flat()];
  for(const text of texts.filter(Boolean)){for(const rx of unsafe)if(rx.test(text))problems.unsafeClaims.push({slug,text,pattern:String(rx)});if(fixedPrice.test(text))problems.fixedPriceClaims.push({slug,text});}
  for(const [kind,text,owner] of [['title',c.seoTitle,titleOwner],['description',c.metaDescription,descOwner]]){const prev=owner.get(text);if(prev&&prev!==slug)problems.duplicateIntent.push({kind,pages:[prev,slug],text});else owner.set(text,slug);}
  const introKey=c.intro.replace(/\s+/g,' ').trim(); const prevIntro=introOwner.get(introKey);if(prevIntro&&prevIntro!==slug)problems.duplicateEditorial.push({pages:[prevIntro,slug]});else introOwner.set(introKey,slug);
  if(!hubLinks.has(p.path)) problems.unlinked.push({slug,path:p.path,source:'area-hub'});
  const groups=getReleasedDistrictDiscovery(p,c); const links=groups.flatMap((g)=>g.items||[]).map((i)=>i.href);
  if(new Set(links).size<8) problems.doorwayCopy.push({slug,reason:'thin-discovery',links:new Set(links).size});
  for(const href of links) if(ARCHITECTURE_HOLD_PATHS.has(href)) problems.holdLeak.push({slug,href});
}
for(const slug of HIGH_INTENT_DISTRICT_BATCH8_SLUGS){ const p=pageBySlug.get(slug); if(p?.lifecycle!=='INDEX') problems.invalidLifecycle.push({slug,lifecycle:p?.lifecycle||'MISSING'}); }

const route=fs.readFileSync(path.join(root,'src/pages/[slug].astro'),'utf8');
const component=fs.readFileSync(path.join(root,'src/components/ReleasedDistrictPage.astro'),'utf8');
const areaHub=fs.readFileSync(path.join(root,'src/pages/พื้นที่ให้บริการ.astro'),'utf8');
for(const token of ['getHighIntentDistrictContent','releasedDistrictContent','<ReleasedDistrictPage']) if(!route.includes(token)) problems.routeIntegration.push(token);
for(const token of ['releasedDistrictBreadcrumbLd','releasedDistrictServiceLd','releasedDistrictFaqLd']) if(!route.includes(token)) problems.schemaIntegration.push(token);
for(const token of ['District / Local Area Authority · CONTENT VERIFIED','service-pattern','suitable-items','prepare','local-safety','getReleasedDistrictDiscovery']) if(!component.includes(token)) problems.routeIntegration.push(`component:${token}`);
for(const token of ['releasedDistricts','Content Batches 8–9','getAreaHubDiscovery']) if(!areaHub.includes(token)) problems.routeIntegration.push(`areaHub:${token}`);

const indexCount=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length;
const holdCount=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const findings={batch8ReleaseCount:HIGH_INTENT_DISTRICT_BATCH8_SLUGS.length,expectedBatch8ReleaseCount:EXPECTED,districtArchitectureReleased:released.length,districtArchitectureHold:hold.length,architectureIndexAfterBatch8:indexCount,architectureHoldAfterBatch8:holdCount,...Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.length]))};
const expectedCountsPass=findings.batch8ReleaseCount===EXPECTED&&HIGH_INTENT_DISTRICT_BATCH8_SLUGS.every((slug)=>pageBySlug.get(slug)?.lifecycle==='INDEX');
const issueCount=Object.values(problems).reduce((sum,v)=>sum+v.length,0);
const failed=!expectedCountsPass||issueCount>0;
const report={verdict:failed?'FAIL':'PASS',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_8_DISTRICT_LOCAL_AUTHORITY',findings,releasedDistricts:HIGH_INTENT_DISTRICT_BATCH8_SLUGS.map((slug)=>{const c=HIGH_INTENT_DISTRICT_CONTENT[slug],p=pageBySlug.get(slug);return{slug,path:p?.path,area:c?.area,distanceKm:c?.distanceKm,corridor:c?.corridor,h1:p?.h1,title:c?.seoTitle,categories:c?.categorySlugs.join('|'),sources:c?.sources.map((s)=>s.url).join('|')}}),samples:Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.slice(0,12)]))};
const out=path.join(root,'docs/content-batch8');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'content-batch8-audit.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(out,'released-district-pages.csv'),['slug,path,area,distance_km,corridor,categories,h1,title,sources',...report.releasedDistricts.map((r)=>[r.slug,r.path,r.area,r.distanceKm,r.corridor,r.categories,r.h1,r.title,r.sources].map((x)=>`"${String(x??'').replaceAll('"','""')}"`).join(','))].join('\n')+'\n');
console.log(JSON.stringify(report,null,2));if(failed)process.exitCode=1;
