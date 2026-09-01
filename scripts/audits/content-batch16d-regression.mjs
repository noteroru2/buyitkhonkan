import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { HIGH_INTENT_MODEL_CONTENT } from '../../src/data/highIntentModelContent.js';
import { BATCH16D_RELEASE_SLUGS } from '../../src/data/highIntentModelContentBatch16D.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { REMAINING_ARCHITECTURE_TRIAGE, TRIAGE_DECISIONS } from '../../src/data/architecture/quality-triage.js';

const root = process.cwd();
const outDir = path.join(root, 'docs/content-batch16d');
fs.mkdirSync(outDir, { recursive: true });
const baseline = JSON.parse(fs.readFileSync(path.join(outDir, 'batch16c-baseline-hashes.json'), 'utf8'));
const shaText = (text) => crypto.createHash('sha256').update(text).digest('hex');
const shaFile = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const canonical = (value) => Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']' : value && typeof value === 'object' ? '{' + Object.keys(value).sort().map((key) => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}' : JSON.stringify(value);
const contentHash = (value) => shaText(canonical(value));
const ownershipFields = ['slug', 'path', 'title', 'h1', 'description', 'parent', 'directory', 'cluster', 'type', 'lifecycle'];
const ownership = (page) => Object.fromEntries(ownershipFields.map((field) => [field, page?.[field]]));
const oldSlugs = Object.keys(baseline.contentHash);
const oldSet = new Set(oldSlugs);
const changedOldContent = [];
const changedOldOwnership = [];
const unexpectedOldLifecycle = [];
for (const slug of oldSlugs) {
  const content = HIGH_INTENT_MODEL_CONTENT[slug];
  const page = MODEL_ARCHITECTURE.find((item) => item.slug === slug);
  if (contentHash(content) !== baseline.contentHash[slug]) changedOldContent.push(slug);
  if (contentHash(ownership(page)) !== baseline.ownershipHash[slug]) changedOldOwnership.push(slug);
  if (page?.lifecycle !== 'INDEX') unexpectedOldLifecycle.push(slug);
}
const changedProtected = [];
for (const [relative, hash] of Object.entries(baseline.protectedFileHash)) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file) || shaFile(file) !== hash) changedProtected.push(relative);
}
const allowedFinalArchitectureHardening = new Set(['src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs']);
const unexpectedChangedProtected = changedProtected.filter((rel) => !allowedFinalArchitectureHardening.has(rel));
const newKeys = Object.keys(HIGH_INTENT_MODEL_CONTENT).filter((slug) => !oldSet.has(slug));
const batchKeys = newKeys.filter((slug) => BATCH16D_RELEASE_SLUGS.includes(slug));
const modelIndex = MODEL_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX').length;
const modelHold = MODEL_ARCHITECTURE.filter((page) => page.lifecycle === 'HOLD_NOINDEX').length;
const architectureIndex = ARCHITECTURE_PAGES.filter((page) => page.lifecycle === 'INDEX').length;
const architectureHold = ARCHITECTURE_PAGES.filter((page) => page.lifecycle === 'HOLD_NOINDEX').length;
const triageById = new Map(REMAINING_ARCHITECTURE_TRIAGE.map((item) => [item.id, item]));
const forbiddenPromotions = MODEL_ARCHITECTURE.filter((page) => {
  const decision = triageById.get(page.id)?.decision;
  return (decision === TRIAGE_DECISIONS.KEEP_HOLD || decision === TRIAGE_DECISIONS.MERGE) && page.lifecycle === 'INDEX';
}).map((page) => page.slug);
const remainingReleaseModels = MODEL_ARCHITECTURE.filter((page) => page.lifecycle === 'HOLD_NOINDEX' && triageById.get(page.id)?.decision === TRIAGE_DECISIONS.RELEASE).map((page) => page.slug);
const pass = changedOldContent.length === 0 && changedOldOwnership.length === 0 && unexpectedOldLifecycle.length === 0 && unexpectedChangedProtected.length === 0 && baseline.oldModelCount === 168 && newKeys.length === 4 && batchKeys.length === 4 && BATCH16D_RELEASE_SLUGS.every((slug) => HIGH_INTENT_MODEL_CONTENT[slug] && MODEL_ARCHITECTURE.find((page) => page.slug === slug)?.lifecycle === 'INDEX') && forbiddenPromotions.length === 0 && remainingReleaseModels.length === 0 && modelIndex === 172 && modelHold === 8 && architectureIndex === 297 && architectureHold === 14;
const report = { verdict: pass ? 'PASS' : 'FAIL', generatedAt: new Date().toISOString(), batch: 'CONTENT_BATCH_16D_FINAL_MODEL_RELEASE_REGRESSION', baseline: baseline.baseline, findings: { batch16cModelsPreserved: oldSlugs.length, newModelContent: newKeys.length, batch16dModelContent: batchKeys.length, changedOldContent: changedOldContent.length, changedOldOwnership: changedOldOwnership.length, unexpectedOldLifecycle: unexpectedOldLifecycle.length, protectedFilesChecked: Object.keys(baseline.protectedFileHash).length, changedProtectedFiles: changedProtected.length, unexpectedChangedProtectedFiles: unexpectedChangedProtected.length, forbiddenPromotions: forbiddenPromotions.length, remainingReleaseModels: remainingReleaseModels.length, modelIndex, modelHold, architectureIndex, architectureHold }, changedOldContent, changedOldOwnership, unexpectedOldLifecycle, changedProtected, unexpectedChangedProtected, forbiddenPromotions, remainingReleaseModels, newKeys };
fs.writeFileSync(path.join(outDir, 'content-batch16d-regression.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (!pass) process.exitCode = 1;
