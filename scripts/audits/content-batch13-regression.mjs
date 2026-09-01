import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { HIGH_INTENT_MODEL_CONTENT } from '../../src/data/highIntentModelContent.js';
import { BATCH13_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch13.js';

const root=process.cwd();
const baseline='/mnt/data/kk_content13_baseline';
const sha=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const protectedFiles=[
 'src/pages/index.astro','src/data/categories.js','src/data/brandPages.js','src/data/modelPages.js','src/data/conditionPages.js','src/data/localPages.js',
 'src/data/architecture/models.js','src/data/architecture/conditions.js','src/data/architecture/b2b.js','src/data/architecture/districts.js','src/data/architecture/guides.js',
 'src/data/highIntentConditionContent.js','src/data/highIntentB2BContent.js','src/data/highIntentDistrictContent.js','src/data/highIntentGuideContent.js',
 'src/layouts/Base.astro','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs'
];
const changedProtected=protectedFiles.filter((rel)=>!fs.existsSync(path.join(baseline,rel))||!fs.existsSync(path.join(root,rel))||sha(path.join(baseline,rel))!==sha(path.join(root,rel)));
const allowedLaterProtectedChanges=new Set(['src/pages/index.astro','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs']);
const unexpectedChangedProtected=changedProtected.filter((rel)=>!allowedLaterProtectedChanges.has(rel));
const oldModule=await import(pathToFileURL(path.join(baseline,'src/data/highIntentModelContent.js')).href+'?v='+Date.now());
const oldContent=oldModule.HIGH_INTENT_MODEL_CONTENT; const oldKeys=Object.keys(oldContent);
const changedOldContent=oldKeys.filter((slug)=>JSON.stringify(oldContent[slug])!==JSON.stringify(HIGH_INTENT_MODEL_CONTENT[slug]));
const oldArch=await import(pathToFileURL(path.join(baseline,'src/data/architecture/models.js')).href+'?v='+Date.now());
const oldBySlug=new Map(oldArch.MODEL_ARCHITECTURE.map((p)=>[p.slug,p]));
const changedOldOwnership=oldKeys.filter((slug)=>{const before=oldBySlug.get(slug),after=MODEL_ARCHITECTURE.find((p)=>p.slug===slug);if(!before||!after)return true;const fields=['slug','path','title','h1','description','parent','directory','cluster','type'];return fields.some((f)=>JSON.stringify(before[f])!==JSON.stringify(after[f]));});
const modelIndex=MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX').length, modelHold=MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const architectureIndex=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length, architectureHold=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const newKeys=Object.keys(HIGH_INTENT_MODEL_CONTENT).filter((slug)=>!oldKeys.includes(slug));
const batch13Keys=newKeys.filter((slug)=>BATCH13_RELEASE_SLUGS.includes(slug));
const pass=unexpectedChangedProtected.length===0&&changedOldContent.length===0&&changedOldOwnership.length===0&&oldKeys.length===88&&batch13Keys.length===24&&BATCH13_RELEASE_SLUGS.length===24&&BATCH13_RELEASE_SLUGS.every((slug)=>HIGH_INTENT_MODEL_CONTENT[slug]&&MODEL_ARCHITECTURE.find((p)=>p.slug===slug)?.lifecycle==='INDEX');
const report={verdict:pass?'PASS':'FAIL',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_13_REGRESSION_HISTORICAL',baseline:'CONTENT_BATCH_12',findings:{batch12ModelsPreserved:oldKeys.length,newModelContentSinceBatch12:newKeys.length,batch13ModelContent:batch13Keys.length,changedOldContent:changedOldContent.length,changedOldOwnership:changedOldOwnership.length,protectedFilesChecked:protectedFiles.length,changedProtectedFiles:changedProtected.length,unexpectedChangedProtectedFiles:unexpectedChangedProtected.length,modelIndex,modelHold,architectureIndex,architectureHold},changedOldContent,changedOldOwnership,changedProtected,unexpectedChangedProtected,newKeys};
const out=path.join(root,'docs/content-batch13');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'content-batch13-regression.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!pass)process.exitCode=1;
