import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { HIGH_INTENT_MODEL_CONTENT } from '../../src/data/highIntentModelContent.js';
import { BATCH14_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch14.js';

const root=process.cwd();
const baseline='/mnt/data/kk_content14_baseline/buyitkhonkan-main';
const sha=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const protectedFiles=[
 'src/pages/index.astro','src/data/categories.js','src/data/brandPages.js','src/data/modelPages.js','src/data/conditionPages.js','src/data/localPages.js',
 'src/data/architecture/models.js','src/data/architecture/conditions.js','src/data/architecture/b2b.js','src/data/architecture/districts.js','src/data/architecture/guides.js',
 'src/data/highIntentConditionContent.js','src/data/highIntentB2BContent.js','src/data/highIntentDistrictContent.js','src/data/highIntentGuideContent.js',
 'src/layouts/Base.astro','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs','src/data/discoveryLinks.js'
];
const changedProtected=protectedFiles.filter((rel)=>!fs.existsSync(path.join(baseline,rel))||!fs.existsSync(path.join(root,rel))||sha(path.join(baseline,rel))!==sha(path.join(root,rel)));
// Homepage/route/discovery legitimately evolved in later UX and authority-hub releases.
const allowedLaterProtectedChanges=new Set(['src/pages/index.astro','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs','src/data/discoveryLinks.js']);
const unexpectedChangedProtected=changedProtected.filter((rel)=>!allowedLaterProtectedChanges.has(rel));

const oldModule=await import(pathToFileURL(path.join(baseline,'src/data/highIntentModelContent.js')).href+'?v='+Date.now());
const oldContent=oldModule.HIGH_INTENT_MODEL_CONTENT; const oldKeys=Object.keys(oldContent);
const changedOldContent=oldKeys.filter((slug)=>JSON.stringify(oldContent[slug])!==JSON.stringify(HIGH_INTENT_MODEL_CONTENT[slug]));
const oldArch=await import(pathToFileURL(path.join(baseline,'src/data/architecture/models.js')).href+'?v='+Date.now());
const oldBySlug=new Map(oldArch.MODEL_ARCHITECTURE.map((p)=>[p.slug,p]));
const changedOldOwnership=oldKeys.filter((slug)=>{const before=oldBySlug.get(slug),after=MODEL_ARCHITECTURE.find((p)=>p.slug===slug);if(!before||!after)return true;const fields=['slug','path','h1','parent','directory','cluster','type'];return fields.some((f)=>JSON.stringify(before[f])!==JSON.stringify(after[f]));});
const batch14MissingOrChanged=BATCH14_RELEASE_SLUGS.filter((slug)=>{
 const content=HIGH_INTENT_MODEL_CONTENT[slug]; const page=MODEL_ARCHITECTURE.find((p)=>p.slug===slug);
 return !content || !page || page.lifecycle!=='INDEX';
});
const modelIndex=MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX').length, modelHold=MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const architectureIndex=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length, architectureHold=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const newKeys=Object.keys(HIGH_INTENT_MODEL_CONTENT).filter((slug)=>!oldKeys.includes(slug));
const pass=unexpectedChangedProtected.length===0
 && changedOldContent.length===0
 && changedOldOwnership.length===0
 && batch14MissingOrChanged.length===0
 && oldKeys.length===112
 && BATCH14_RELEASE_SLUGS.length===20
 && BATCH14_RELEASE_SLUGS.every((slug)=>newKeys.includes(slug))
 && MODEL_ARCHITECTURE.length===180
 && modelIndex>=132 && modelHold===MODEL_ARCHITECTURE.length-modelIndex
 && ARCHITECTURE_PAGES.length===311
 && architectureIndex>=255 && architectureHold===ARCHITECTURE_PAGES.length-architectureIndex;
const report={verdict:pass?'PASS':'FAIL',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_14_REGRESSION',baseline:'CONTENT_BATCH_13',note:'Historical regression preserves Batch 13 ownership and the original Batch 14 release while allowing later approved model releases and authority-hub UX changes.',findings:{batch13ModelsPreserved:oldKeys.length,currentPostBatch13ModelContent:newKeys.length,batch14Release:BATCH14_RELEASE_SLUGS.length,batch14MissingOrChanged:batch14MissingOrChanged.length,changedOldContent:changedOldContent.length,changedOldOwnership:changedOldOwnership.length,protectedFilesChecked:protectedFiles.length,changedProtectedFiles:changedProtected.length,unexpectedChangedProtectedFiles:unexpectedChangedProtected.length,modelIndex,modelHold,architectureIndex,architectureHold},changedOldContent,changedOldOwnership,changedProtected,unexpectedChangedProtected,batch14MissingOrChanged,newKeys};
const out=path.join(root,'docs/content-batch14');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'content-batch14-regression.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!pass)process.exitCode=1;
