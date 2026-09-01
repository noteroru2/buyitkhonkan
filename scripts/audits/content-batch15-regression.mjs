import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { REMAINING_ARCHITECTURE_TRIAGE, TRIAGE_DECISIONS } from '../../src/data/architecture/quality-triage.js';

const root = process.cwd();
const baseline = '/mnt/data/kk_content14_work/buyitkhonkan-main';
const outDir = path.join(root, 'docs/content-batch15');
fs.mkdirSync(outDir, { recursive: true });
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');

const protectedFiles = [
  'src/pages/index.astro',
  'src/data/categories.js','src/data/brandPages.js','src/data/modelPages.js','src/data/conditionPages.js','src/data/localPages.js','src/data/site.js',
  'src/data/architecture/_shared.js','src/data/architecture/models.js','src/data/architecture/conditions.js','src/data/architecture/b2b.js','src/data/architecture/districts.js','src/data/architecture/guides.js','src/data/architecture/hubs.js',
  'src/data/highIntentModelContent.js','src/data/highIntentConditionContent.js','src/data/highIntentB2BContent.js','src/data/highIntentDistrictContent.js','src/data/highIntentGuideContent.js',
  'src/data/discoveryLinks.js','src/layouts/Base.astro','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs',
];
const changedProtected = protectedFiles.filter((rel) => {
  const a = path.join(baseline, rel), b = path.join(root, rel);
  return !fs.existsSync(a) || !fs.existsSync(b) || sha(a) !== sha(b);
});
// These files are expected to evolve after Batch 15 as approved release candidates are promoted.
const allowedPostBatch15ProtectedChanges = new Set([
  'src/pages/index.astro',
  'src/data/architecture/hubs.js',
  'src/data/highIntentModelContent.js',
  'src/data/discoveryLinks.js',
  'src/pages/[slug].astro',
  'src/pages/บทความ/[slug].astro',
  'astro.config.mjs',
]);
const unexpectedChangedProtected = changedProtected.filter((rel) => !allowedPostBatch15ProtectedChanges.has(rel));

const oldArchModule = await import(pathToFileURL(path.join(baseline, 'src/data/architecture/index.js')).href + `?v=${Date.now()}`);
const oldPages = oldArchModule.ARCHITECTURE_PAGES;
const oldById = new Map(oldPages.map((p) => [p.id, p]));
const newById = new Map(ARCHITECTURE_PAGES.map((p) => [p.id, p]));
const triageById = new Map(REMAINING_ARCHITECTURE_TRIAGE.map((item) => [item.id, item]));
const ownershipFields = ['id','path','type','cluster','label','lifecycle','parent','directory','title','h1','description'];
const changedArchitectureOwnership = [];
for (const oldPage of oldPages) {
  const next = newById.get(oldPage.id);
  if (!next) { changedArchitectureOwnership.push({ id: oldPage.id, reason: 'missing' }); continue; }
  const fields = ownershipFields.filter((f) => JSON.stringify(oldPage[f] ?? null) !== JSON.stringify(next[f] ?? null));
  if (fields.length) changedArchitectureOwnership.push({ id: oldPage.id, fields });
}
const addedArchitecturePages = ARCHITECTURE_PAGES.filter((p) => !oldById.has(p.id)).map((p) => p.id);

const unexpectedArchitectureOwnership = changedArchitectureOwnership.filter((change) => {
  const triage = triageById.get(change.id);
  if (triage?.decision !== TRIAGE_DECISIONS.RELEASE) return true;
  const fields = change.fields || [];
  const allowed = change.id === 'hub-products' || change.id === 'hub-brands-models'
    ? new Set(['lifecycle','title','h1','description'])
    : new Set(['lifecycle','title','description']);
  if (!fields.every((field) => allowed.has(field))) return true;
  const before = oldById.get(change.id);
  const after = newById.get(change.id);
  if (fields.includes('lifecycle') && !(before?.lifecycle === 'HOLD_NOINDEX' && after?.lifecycle === 'INDEX')) return true;
  return false;
});

const forbiddenLifecyclePromotions = REMAINING_ARCHITECTURE_TRIAGE
  .filter((item) => [TRIAGE_DECISIONS.KEEP_HOLD, TRIAGE_DECISIONS.MERGE].includes(item.decision))
  .filter((item) => newById.get(item.id)?.lifecycle !== 'HOLD_NOINDEX')
  .map((item) => ({ id: item.id, decision: item.decision, lifecycle: newById.get(item.id)?.lifecycle }));

const oldIndex = oldPages.filter((p) => p.lifecycle === 'INDEX').length;
const oldHold = oldPages.filter((p) => p.lifecycle === 'HOLD_NOINDEX').length;
const newIndex = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'INDEX').length;
const newHold = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'HOLD_NOINDEX').length;

const expectedNewFiles = [
  'src/data/architecture/quality-triage.js',
  'scripts/audits/content-batch15-triage-audit.mjs',
  'scripts/audits/content-batch15-regression.mjs',
];
const missingExpectedFiles = expectedNewFiles.filter((rel) => !fs.existsSync(path.join(root, rel)));

const pass = fs.existsSync(baseline)
  && oldPages.length === 311
  && ARCHITECTURE_PAGES.length === 311
  && oldIndex === 255 && oldHold === 56
  && newIndex >= oldIndex && newHold === ARCHITECTURE_PAGES.length - newIndex
  && REMAINING_ARCHITECTURE_TRIAGE.length === 56
  && unexpectedChangedProtected.length === 0
  && unexpectedArchitectureOwnership.length === 0
  && forbiddenLifecyclePromotions.length === 0
  && addedArchitecturePages.length === 0
  && missingExpectedFiles.length === 0;

const report = {
  verdict: pass ? 'PASS' : 'FAIL',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_15_REMAINING_ARCHITECTURE_TRIAGE_REGRESSION',
  baseline: 'CONTENT_BATCH_14',
  note: 'Historical regression permits later promotion of Batch 15 RELEASE candidates while KEEP_HOLD/MERGE decisions remain noindex.',
  findings: {
    baselineArchitecture: oldPages.length,
    currentArchitecture: ARCHITECTURE_PAGES.length,
    baselineIndex: oldIndex,
    currentIndex: newIndex,
    baselineHold: oldHold,
    currentHold: newHold,
    triageRows: REMAINING_ARCHITECTURE_TRIAGE.length,
    protectedFilesChecked: protectedFiles.length,
    changedProtectedFiles: changedProtected.length,
    unexpectedChangedProtectedFiles: unexpectedChangedProtected.length,
    changedArchitectureOwnership: changedArchitectureOwnership.length,
    unexpectedArchitectureOwnership: unexpectedArchitectureOwnership.length,
    forbiddenLifecyclePromotions: forbiddenLifecyclePromotions.length,
    addedArchitecturePages: addedArchitecturePages.length,
    missingExpectedFiles: missingExpectedFiles.length,
  },
  changedProtected,
  unexpectedChangedProtected,
  changedArchitectureOwnership,
  unexpectedArchitectureOwnership,
  forbiddenLifecyclePromotions,
  addedArchitecturePages,
  missingExpectedFiles,
};
fs.writeFileSync(path.join(outDir, 'content-batch15-regression.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (!pass) process.exitCode = 1;
