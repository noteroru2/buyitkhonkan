import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { CONDITION_ARCHITECTURE } from '../../src/data/architecture/conditions.js';
import { HIGH_INTENT_CONDITION_RELEASE_SLUGS } from '../../src/data/highIntentConditionContent.js';

const root=process.cwd();
const baseline='/mnt/data/kk_content5_work/buyitkhonkan-main';
const sha=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const protectedFiles=[
  'src/data/categories.js','src/data/brandPages.js','src/data/modelPages.js','src/data/conditionPages.js','src/data/localPages.js',
  'src/data/architecture/models.js','src/data/highIntentModelContent.js','src/layouts/Base.astro','astro.config.mjs','src/pages/index.astro',
];
const protectedComparison=protectedFiles.map((rel)=>{
  const a=path.join(baseline,rel), b=path.join(root,rel);
  return { file:rel, baselineExists:fs.existsSync(a), currentExists:fs.existsSync(b), identical:fs.existsSync(a)&&fs.existsSync(b)&&sha(a)===sha(b) };
});
const changedProtected=protectedComparison.filter((x)=>!x.identical);
const allowedLaterProtectedChanges=new Set(['src/data/highIntentModelContent.js','src/pages/index.astro','astro.config.mjs']);
const unexpectedChangedProtected=changedProtected.filter((x)=>!allowedLaterProtectedChanges.has(x.file));
const indexCount=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='INDEX').length;
const holdCount=ARCHITECTURE_PAGES.filter((p)=>p.lifecycle==='HOLD_NOINDEX').length;
const conditionsIndex=CONDITION_ARCHITECTURE.filter((p)=>p.lifecycle==='INDEX').length;
const route=fs.readFileSync(path.join(root,'src/pages/[slug].astro'),'utf8');
const report={
  verdict: unexpectedChangedProtected.length===0 && indexCount>=112 && holdCount===ARCHITECTURE_PAGES.length-indexCount && conditionsIndex===24 && HIGH_INTENT_CONDITION_RELEASE_SLUGS.length===24 && route.includes('<ReleasedConditionPage') ? 'PASS':'FAIL',
  generatedAt:new Date().toISOString(),
  batch:'CONTENT_BATCH_6_REGRESSION',
  baseline:'CONTENT_BATCH_5',
  findings:{ architectureIndex:indexCount, architectureHold:holdCount, releasedConditions:conditionsIndex, expectedReleasedConditions:24, protectedFilesChecked:protectedFiles.length, changedProtectedFiles:changedProtected.length, unexpectedChangedProtectedFiles:unexpectedChangedProtected.length, releasedConditionRouteIntegrated:route.includes('<ReleasedConditionPage') },
  protectedComparison,
  unexpectedChangedProtected,
};
const out=path.join(root,'docs/content-batch6'); fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'content-batch6-regression.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.verdict!=='PASS')process.exitCode=1;
