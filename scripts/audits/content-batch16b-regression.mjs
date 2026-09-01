import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { HIGH_INTENT_MODEL_CONTENT } from '../../src/data/highIntentModelContent.js';
import { BATCH16B_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch16B.js';

const root=process.cwd();
const baseline='/mnt/data/kk_batch16b_baseline';
const outDir=path.join(root,'docs/content-batch16b');fs.mkdirSync(outDir,{recursive:true});
const sha=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const protectedFiles=[
 'src/pages/index.astro','src/data/categories.js','src/data/brandPages.js','src/data/modelPages.js','src/data/conditionPages.js','src/data/localPages.js',
 'src/data/architecture/models.js','src/data/architecture/conditions.js','src/data/architecture/b2b.js','src/data/architecture/districts.js','src/data/architecture/guides.js','src/data/architecture/hubs.js',
 'src/data/highIntentConditionContent.js','src/data/highIntentB2BContent.js','src/data/highIntentDistrictContent.js','src/data/highIntentGuideContent.js','src/data/authorityHubContent.js',
 'src/components/ReleasedModelPage.astro','src/components/ReleasedAuthorityHub.astro','src/layouts/Base.astro','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs'
];
const changedProtected=protectedFiles.filter((rel)=>!fs.existsSync(path.join(baseline,rel))||!fs.existsSync(path.join(root,rel))||sha(path.join(baseline,rel))!==sha(path.join(root,rel)));
const allowedFinalArchitectureHardening=new Set(['src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs']);
const unexpectedChangedProtected=changedProtected.filter((rel)=>!allowedFinalArchitectureHardening.has(rel));
const oldModule=await import(pathToFileURL(path.join(baseline,'src/data/highIntentModelContent.js')).href+'?v='+Date.now());
const oldContent=oldModule.HIGH_INTENT_MODEL_CONTENT; const oldKeys=Object.keys(oldContent);
const changedOldContent=oldKeys.filter((slug)=>JSON.stringify(oldContent[slug])!==JSON.stringify(HIGH_INTENT_MODEL_CONTENT[slug]));
const oldArch=await import(pathToFileURL(path.join(baseline,'src/data/architecture/models.js')).href+'?v='+Date.now());
const oldBySlug=new Map(oldArch.MODEL_ARCHITECTURE.map((p)=>[p.slug,p]));
const changedOldOwnership=oldKeys.filter((slug)=>{const before=oldBySlug.get(slug),after=MODEL_ARCHITECTURE.find((p)=>p.slug===slug);if(!before||!after)return true;const fields=['slug','path','title','h1','description','parent','directory','cluster','type'];return fields.some((f)=>JSON.stringify(before[f])!==JSON.stringify(after[f]));});
const unexpectedOldLifecycle=oldKeys.filter((slug)=>MODEL_ARCHITECTURE.find((p)=>p.slug===slug)?.lifecycle!=='INDEX');
const newKeys=Object.keys(HIGH_INTENT_MODEL_CONTENT).filter((slug)=>!oldKeys.includes(slug));
const batchKeys=newKeys.filter((slug)=>BATCH16B_RELEASE_SLUGS.includes(slug));
const modelIndex=MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX').length, modelHold=MODEL_ARCHITECTURE.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const architectureIndex=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length, architectureHold=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const pass=unexpectedChangedProtected.length===0&&changedOldContent.length===0&&changedOldOwnership.length===0&&unexpectedOldLifecycle.length===0&&oldKeys.length===132&&newKeys.length>=18&&batchKeys.length===18&&BATCH16B_RELEASE_SLUGS.every((slug)=>HIGH_INTENT_MODEL_CONTENT[slug]&&MODEL_ARCHITECTURE.find((p)=>p.slug===slug)?.lifecycle==='INDEX')&&modelIndex>=150&&modelHold<=30&&architectureIndex>=275&&architectureHold<=36;
const report={verdict:pass?'PASS':'FAIL',generatedAt:new Date().toISOString(),batch:'CONTENT_BATCH_16B_MODEL_RELEASE_ROUND_1_REGRESSION',baseline:'CONTENT_BATCH_16A',findings:{batch16aModelsPreserved:oldKeys.length,newModelContent:newKeys.length,batch16bModelContent:batchKeys.length,changedOldContent:changedOldContent.length,changedOldOwnership:changedOldOwnership.length,unexpectedOldLifecycle:unexpectedOldLifecycle.length,protectedFilesChecked:protectedFiles.length,changedProtectedFiles:changedProtected.length,unexpectedChangedProtectedFiles:unexpectedChangedProtected.length,modelIndex,modelHold,architectureIndex,architectureHold},changedOldContent,changedOldOwnership,unexpectedOldLifecycle,changedProtected,unexpectedChangedProtected,newKeys};
fs.writeFileSync(path.join(outDir,'content-batch16b-regression.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!pass)process.exitCode=1;
