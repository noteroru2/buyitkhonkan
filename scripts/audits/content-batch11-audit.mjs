import fs from 'node:fs';
import path from 'node:path';
import { GUIDE_ARCHITECTURE } from '../../src/data/architecture/guides.js';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { HIGH_INTENT_GUIDE_CONTENT } from '../../src/data/highIntentGuideContent.js';
import { getReleasedGuideDiscovery } from '../../src/data/discoveryLinks.js';

const root=process.cwd();
const BATCH11_SLUGS=[
'วิธีดู-shutter-count-กล้อง','กล้องมีราขายได้ไหม','เลนส์มีราประเมินราคาอย่างไร','กล้องไม่มีกล่องราคาตกไหม',
'วิธีลบบัญชี-nintendo-switch-ก่อนขาย','เครื่องเกมไม่มีจอยราคาตกไหม','วิธีเช็กจอคอมก่อนขาย','จอเกมมิ่ง-144hz-165hz-ราคามือสอง',
'วิธีเตรียมโดรนก่อนขาย','โดรนแบตเสื่อมราคาตกไหม','วิธีเช็กจำนวนรอบแบตโดรน','วิธีเตรียม-apple-watch-ก่อนขาย','apple-watch-cellular-vs-gps-มือสอง',
'ขายสินค้าไอทีหลายชิ้นเตรียมรายการยังไง','บริษัทขายคอมเก่าต้องใช้เอกสารอะไร','วิธีทำรายการทรัพย์สินไอทีก่อนขาย','วิธีล้างข้อมูลคอมบริษัทก่อนขาย','รับซื้อยกล็อตประเมินราคายังไง','ควรถ่ายรูปสินค้าไอทียังไงก่อนประเมิน','ข้อมูลอะไรทำให้ประเมินราคาได้เร็วขึ้น'
];
const batchSet=new Set(BATCH11_SLUGS);
const newPages=GUIDE_ARCHITECTURE.filter(p=>batchSet.has(p.slug));
const released=newPages;
const currentReleased=GUIDE_ARCHITECTURE.filter(p=>p.lifecycle==='INDEX');
const currentHold=GUIDE_ARCHITECTURE.filter(p=>p.lifecycle==='HOLD_NOINDEX');
const component=fs.readFileSync(path.join(root,'src/components/ReleasedGuidePage.astro'),'utf8');
const route=fs.readFileSync(path.join(root,'src/pages/บทความ/[slug].astro'),'utf8');
const articleIndex=fs.readFileSync(path.join(root,'src/pages/บทความ/index.astro'),'utf8');
const problems={missingContent:[],lifecycle:[],invalidFields:[],duplicateTitle:[],duplicateDescription:[],duplicateIntro:[],missingSource:[],invalidSource:[],unsafeClaims:[],fixedPriceClaims:[],unlinked:[],holdLeak:[],thinDiscovery:[],routeIntegration:[]};
const titleOwner=new Map(),descOwner=new Map(),introOwner=new Map();
const sourceAllowed=/(^|\.)(support\.apple\.com|support\.microsoft\.com|learn\.microsoft\.com|nintendo\.com|support\.nintendo\.com|repair\.dji\.com|sony\.com|nikonimgsupport\.com|csrc\.nist\.gov|playstation\.com|dell\.com|nikonusa\.com)$/i;
const unsafe=[/ราคาดีที่สุด/iu,/ได้ราคาดีกว่า/iu,/รับประกันราคา/iu,/ขายได้ราคาเต็ม/iu,/รับทันทีทุก/iu];
const fixedPrice=/(?:฿|ราคา[^\n]{0,22})\s*\d{2,3}(?:,\d{3})+\s*(?:บาท)?/iu;
const requiredArrays={steps:4,priceFactors:5,checklist:5,faq:4};
for(const page of released){
 const c=HIGH_INTENT_GUIDE_CONTENT[page.slug]; if(!c){problems.missingContent.push(page.slug);continue;}
 for(const [field,min] of Object.entries(requiredArrays)) if(!Array.isArray(c[field])||c[field].length<min) problems.invalidFields.push({slug:page.slug,field,min,actual:c[field]?.length??0});
 for(const field of ['seoTitle','h1','metaDescription','intro','shortAnswer','caution']) if(!c[field]||String(c[field]).trim().length<25) problems.invalidFields.push({slug:page.slug,field,reason:'missing-or-thin'});
 if(page.title!==c.seoTitle||page.h1!==c.h1||page.description!==c.metaDescription) problems.invalidFields.push({slug:page.slug,field:'architecture-metadata-mismatch'});
 for(const [text,owner,bucket] of [[c.seoTitle,titleOwner,problems.duplicateTitle],[c.metaDescription,descOwner,problems.duplicateDescription]]){const prev=owner.get(text);if(prev&&prev!==page.slug)bucket.push({pages:[prev,page.slug],text});else owner.set(text,page.slug);}
 const ik=c.intro.replace(/\s+/g,' ').trim();const pi=introOwner.get(ik);if(pi&&pi!==page.slug)problems.duplicateIntro.push({pages:[pi,page.slug]});else introOwner.set(ik,page.slug);
 if(!c.source?.url||!c.source?.label) problems.missingSource.push(page.slug); else {try{const u=new URL(c.source.url);if(u.protocol!=='https:'||!sourceAllowed.test(u.hostname))problems.invalidSource.push({slug:page.slug,url:c.source.url,hostname:u.hostname});}catch{problems.invalidSource.push({slug:page.slug,url:c.source.url});}}
 const text=[c.seoTitle,c.h1,c.metaDescription,c.intro,c.shortAnswer,c.caution,...c.priceFactors,...c.checklist,...c.steps.flat(),...c.faq.flat()].join(' ');
 for(const rx of unsafe)if(rx.test(text))problems.unsafeClaims.push({slug:page.slug,pattern:String(rx)});if(fixedPrice.test(text))problems.fixedPriceClaims.push({slug:page.slug});
 const groups=getReleasedGuideDiscovery(page,c);const links=groups.flatMap(g=>g.items||[]).map(i=>i.href);const unique=new Set(links);if(unique.size<6)problems.thinDiscovery.push({slug:page.slug,links:unique.size});for(const href of unique)if(ARCHITECTURE_HOLD_PATHS.has(href))problems.holdLeak.push({slug:page.slug,href});
}
for(const page of newPages){if(page.lifecycle!=='INDEX')problems.lifecycle.push({slug:page.slug,lifecycle:page.lifecycle});if(!articleIndex.includes('releasedGuidePosts'))problems.unlinked.push(page.slug);}
for(const token of ['ReleasedGuidePage','getHighIntentGuideContent','Article','FAQPage','BreadcrumbList'])if(!route.includes(token))problems.routeIntegration.push(`route:${token}`);
for(const token of ['getReleasedGuideDiscovery','data-content-batch="11"','guide-price-note','source.url'])if(!component.includes(token))problems.routeIntegration.push(`component:${token}`);
const indexCount=ARCHITECTURE_PAGES.filter(p=>p.lifecycle==='INDEX').length,holdCount=ARCHITECTURE_PAGES.filter(p=>p.lifecycle==='HOLD_NOINDEX').length;
const issueCount=Object.values(problems).reduce((n,v)=>n+v.length,0);
const countsPass=newPages.length===20&&newPages.every(p=>p.lifecycle==='INDEX');
const report={verdict:issueCount===0&&countsPass?'PASS':'FAIL',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_11_GUIDE_EXPANSION_ROUND_2',findings:{batch11Pages:newPages.length,currentReleasedGuidesTotal:currentReleased.length,currentGuideHold:currentHold.length,currentArchitectureIndex:indexCount,currentArchitectureHold:holdCount,...Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.length]))},releasedGuides:newPages.map(p=>({slug:p.slug,path:p.path,h1:p.h1,title:p.title,priceIntent:Boolean(HIGH_INTENT_GUIDE_CONTENT[p.slug]?.priceIntent),categories:(HIGH_INTENT_GUIDE_CONTENT[p.slug]?.categorySlugs||[]).join('|'),source:HIGH_INTENT_GUIDE_CONTENT[p.slug]?.source?.url})),samples:Object.fromEntries(Object.entries(problems).map(([k,v])=>[k,v.slice(0,12)]))};
const out=path.join(root,'docs/content-batch11');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'content-batch11-audit.json'),JSON.stringify(report,null,2)+'\n');fs.writeFileSync(path.join(out,'released-guide-pages.csv'),['slug,path,h1,title,price_intent,categories,source',...report.releasedGuides.map(r=>[r.slug,r.path,r.h1,r.title,r.priceIntent,r.categories,r.source].map(x=>`"${String(x??'').replaceAll('"','""')}"`).join(','))].join('\n')+'\n');console.log(JSON.stringify(report,null,2));if(report.verdict!=='PASS')process.exitCode=1;
