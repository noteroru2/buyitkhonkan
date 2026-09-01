import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { HIGH_INTENT_MODEL_CONTENT } from '../../src/data/highIntentModelContent.js';
import { BATCH16C_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch16C.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { REMAINING_ARCHITECTURE_TRIAGE, TRIAGE_DECISIONS } from '../../src/data/architecture/quality-triage.js';
const root=process.cwd(),outDir=path.join(root,'docs/content-batch16c');fs.mkdirSync(outDir,{recursive:true});
const baseline=JSON.parse(fs.readFileSync(path.join(outDir,'batch16b-baseline-hashes.json'),'utf8'));
const shaText=(s)=>crypto.createHash('sha256').update(s).digest('hex'); const shaFile=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const canonical=(v)=>{if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';return JSON.stringify(v);};
const contentHash=(v)=>shaText(canonical(v));
const ownershipFields=['slug','path','title','h1','description','parent','directory','cluster','type','lifecycle'];
const ownership=(p)=>Object.fromEntries(ownershipFields.map(f=>[f,p?.[f]]));
const oldSlugs=Object.keys(baseline.contentHash), oldSet=new Set(oldSlugs);
const changedOldContent=[]; const changedOldOwnership=[]; const unexpectedOldLifecycle=[];
for(const slug of oldSlugs){
 const c=HIGH_INTENT_MODEL_CONTENT[slug],p=MODEL_ARCHITECTURE.find(x=>x.slug===slug);
 const ch=contentHash(c);
 const oh=contentHash(ownership(p));
 if(ch!==baseline.contentHash[slug])changedOldContent.push(slug);
 if(oh!==baseline.ownershipHash[slug])changedOldOwnership.push(slug);
 if(p?.lifecycle!=='INDEX')unexpectedOldLifecycle.push(slug);
}
const changedProtected=[]; for(const [rel,hash] of Object.entries(baseline.protectedFileHash)){const p=path.join(root,rel);if(!fs.existsSync(p)||shaFile(p)!==hash)changedProtected.push(rel);}
const allowedFinalArchitectureHardening=new Set(['src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs']); const unexpectedChangedProtected=changedProtected.filter(rel=>!allowedFinalArchitectureHardening.has(rel));
const newKeys=Object.keys(HIGH_INTENT_MODEL_CONTENT).filter(s=>!oldSet.has(s)); const batchKeys=newKeys.filter(s=>BATCH16C_RELEASE_SLUGS.includes(s));
const modelIndex=MODEL_ARCHITECTURE.filter(p=>p.lifecycle==='INDEX').length,modelHold=MODEL_ARCHITECTURE.filter(p=>p.lifecycle==='HOLD_NOINDEX').length,architectureIndex=ARCHITECTURE_PAGES.filter(p=>p.lifecycle==='INDEX').length,architectureHold=ARCHITECTURE_PAGES.filter(p=>p.lifecycle==='HOLD_NOINDEX').length;
const triageById=new Map(REMAINING_ARCHITECTURE_TRIAGE.map(x=>[x.id,x])); const forbiddenPromotions=MODEL_ARCHITECTURE.filter(p=>{const d=triageById.get(p.id)?.decision;return(d===TRIAGE_DECISIONS.KEEP_HOLD||d===TRIAGE_DECISIONS.MERGE)&&p.lifecycle==='INDEX';}).map(p=>p.slug);
const pass=changedOldContent.length===0&&changedOldOwnership.length===0&&unexpectedOldLifecycle.length===0&&unexpectedChangedProtected.length===0&&baseline.oldModelCount===150&&newKeys.length>=18&&batchKeys.length===18&&BATCH16C_RELEASE_SLUGS.every(s=>HIGH_INTENT_MODEL_CONTENT[s]&&MODEL_ARCHITECTURE.find(p=>p.slug===s)?.lifecycle==='INDEX')&&forbiddenPromotions.length===0&&modelIndex>=168&&modelHold<=12&&architectureIndex>=293&&architectureHold<=18;
const report={verdict:pass?'PASS':'FAIL',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_16C_MODEL_RELEASE_ROUND_2_REGRESSION',baseline:baseline.baseline,findings:{batch16bModelsPreserved:oldSlugs.length,newModelContent:newKeys.length,batch16cModelContent:batchKeys.length,changedOldContent:changedOldContent.length,changedOldOwnership:changedOldOwnership.length,unexpectedOldLifecycle:unexpectedOldLifecycle.length,protectedFilesChecked:Object.keys(baseline.protectedFileHash).length,changedProtectedFiles:changedProtected.length,unexpectedChangedProtectedFiles:unexpectedChangedProtected.length,forbiddenPromotions:forbiddenPromotions.length,modelIndex,modelHold,architectureIndex,architectureHold},changedOldContent,changedOldOwnership,unexpectedOldLifecycle,changedProtected,unexpectedChangedProtected,forbiddenPromotions,newKeys};
fs.writeFileSync(path.join(outDir,'content-batch16c-regression.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!pass)process.exitCode=1;
