import fs from 'node:fs';
import path from 'node:path';
import { GUIDE_ARCHITECTURE } from '../../src/data/architecture/guides.js';
import { HUB_ARCHITECTURE } from '../../src/data/architecture/hubs.js';
import { ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { HIGH_INTENT_GUIDE_CONTENT } from '../../src/data/highIntentGuideContent.js';
import { getReleasedGuideDiscovery, getPriceHubDiscovery } from '../../src/data/discoveryLinks.js';

const root=process.cwd();
const BATCH10_SLUGS=[
'วิธีเช็กรุ่นโน้ตบุ๊กก่อนขาย','วิธีดูสเปกโน้ตบุ๊กก่อนประเมิน','วิธีเช็กสุขภาพแบตโน้ตบุ๊ก','โน้ตบุ๊กไม่มีกล่องราคาตกไหม',
'วิธีเตรียม-macbook-ก่อนขาย','วิธีดู-cycle-count-macbook','macbook-ไม่มีที่ชาร์จราคาตกไหม','วิธีปลด-find-my-mac-ก่อนขาย',
'วิธีเช็ก-iphone-ก่อนขาย','วิธีดู-battery-health-iphone','iphone-จอเปลี่ยนราคาตกไหม','วิธีเตรียม-ipad-ก่อนขาย','ipad-cellular-vs-wifi-ราคามือสอง',
'วิธีเช็กสเปกคอมก่อนขาย','psu-มีผลต่อราคาคอมมือสองไหม','วิธีเช็กการ์ดจอก่อนขาย','การ์ดจอไม่มีประกันราคาตกไหม','วิธีเช็กกล้องก่อนขาย','วิธีเตรียม-ps5-ก่อนขาย','dead-pixel-มีผลต่อราคาจอไหม'
];
const batchSet=new Set(BATCH10_SLUGS);
const pages=GUIDE_ARCHITECTURE.filter(p=>batchSet.has(p.slug));
const priceHub=HUB_ARCHITECTURE.find(p=>p.id==='hub-price');
const articleIndex=fs.readFileSync(path.join(root,'src/pages/บทความ/index.astro'),'utf8');
const guideRoute=fs.readFileSync(path.join(root,'src/pages/บทความ/[slug].astro'),'utf8');
const guideComponent=fs.readFileSync(path.join(root,'src/components/ReleasedGuidePage.astro'),'utf8');
const problems={missingContent:[],lifecycle:[],invalidFields:[],duplicateTitle:[],duplicateDescription:[],duplicateIntro:[],missingSource:[],unsafeClaims:[],fixedPriceClaims:[],unlinked:[],holdLeak:[],thinDiscovery:[],routeIntegration:[],priceHub:[]};
const titleOwner=new Map(),descOwner=new Map(),introOwner=new Map();
const unsafe=[/ราคาดีที่สุด/iu,/ได้ราคาดีกว่า/iu,/รับประกันราคา/iu,/อัปเดตราคา.*เสมอ/iu,/ขายได้ราคาเต็ม/iu];
const fixedPrice=/(?:฿|ราคา[^\n]{0,22})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
for(const page of pages){
 const c=HIGH_INTENT_GUIDE_CONTENT[page.slug];if(!c){problems.missingContent.push(page.slug);continue;}if(page.lifecycle!=='INDEX')problems.lifecycle.push({slug:page.slug,lifecycle:page.lifecycle});
 for(const [field,min] of Object.entries({steps:4,priceFactors:5,checklist:5,faq:4}))if(!Array.isArray(c[field])||c[field].length<min)problems.invalidFields.push({slug:page.slug,field});
 for(const field of ['seoTitle','h1','metaDescription','intro','shortAnswer','caution'])if(!c[field]||String(c[field]).trim().length<20)problems.invalidFields.push({slug:page.slug,field});
 for(const [text,owner,bucket] of [[c.seoTitle,titleOwner,problems.duplicateTitle],[c.metaDescription,descOwner,problems.duplicateDescription]]){const prev=owner.get(text);if(prev&&prev!==page.slug)bucket.push({pages:[prev,page.slug]});else owner.set(text,page.slug);}const ik=c.intro.replace(/\s+/g,' ').trim();const pi=introOwner.get(ik);if(pi&&pi!==page.slug)problems.duplicateIntro.push({pages:[pi,page.slug]});else introOwner.set(ik,page.slug);
 if(!c.source?.url||!c.source?.label)problems.missingSource.push(page.slug);const text=[c.seoTitle,c.h1,c.metaDescription,c.intro,c.shortAnswer,c.caution,...c.priceFactors,...c.checklist,...c.steps.flat(),...c.faq.flat()].join(' ');for(const rx of unsafe)if(rx.test(text))problems.unsafeClaims.push({slug:page.slug});if(fixedPrice.test(text))problems.fixedPriceClaims.push({slug:page.slug});
 if(!articleIndex.includes('releasedGuidePosts'))problems.unlinked.push(page.slug);const groups=getReleasedGuideDiscovery(page,c);const links=new Set(groups.flatMap(g=>g.items||[]).map(i=>i.href));if(links.size<6)problems.thinDiscovery.push({slug:page.slug,links:links.size});for(const href of links)if(ARCHITECTURE_HOLD_PATHS.has(href))problems.holdLeak.push({slug:page.slug,href});
}
for(const token of ['ReleasedGuidePage','getHighIntentGuideContent','Article','FAQPage','BreadcrumbList'])if(!guideRoute.includes(token))problems.routeIntegration.push(token);for(const token of ['getReleasedGuideDiscovery','data-content-batch=','guide-price-note','source.url'])if(!guideComponent.includes(token))problems.routeIntegration.push(`component:${token}`);
if(!priceHub||priceHub.lifecycle!=='INDEX')problems.priceHub.push('hub-price-not-index');const priceLinks=getPriceHubDiscovery().flatMap(g=>g.items||[]).map(i=>i.href);for(const href of priceLinks)if(ARCHITECTURE_HOLD_PATHS.has(href))problems.holdLeak.push({slug:'hub-price',href});
const issueCount=Object.values(problems).reduce((n,v)=>n+v.length,0);const report={verdict:issueCount===0&&pages.length===20?'PASS':'FAIL',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_10_HISTORICAL_PRESERVATION',findings:{batch10Pages:pages.length,priceHubIndex:priceHub?.lifecycle==='INDEX',...Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.length]))},samples:Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.slice(0,12)]))};const out=path.join(root,'docs/content-batch10');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'content-batch10-audit.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(report.verdict!=='PASS')process.exitCode=1;
