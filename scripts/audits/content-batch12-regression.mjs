import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';
import { GUIDE_ARCHITECTURE } from '../../src/data/architecture/guides.js';
import { HIGH_INTENT_GUIDE_CONTENT } from '../../src/data/highIntentGuideContent.js';

const root = process.cwd();
const baseline = '/mnt/data/kk_content11_work/buyitkhonkan-main';
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const protectedFiles = [
  'src/pages/index.astro','src/data/categories.js','src/data/brandPages.js','src/data/modelPages.js','src/data/conditionPages.js','src/data/localPages.js',
  'src/data/architecture/models.js','src/data/architecture/conditions.js','src/data/architecture/b2b.js','src/data/architecture/districts.js','src/data/architecture/guides.js',
  'src/data/highIntentModelContent.js','src/data/highIntentConditionContent.js','src/data/highIntentB2BContent.js','src/data/highIntentDistrictContent.js',
  'src/data/discoveryLinks.js','src/layouts/Base.astro','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs'
];
const changedProtected = protectedFiles.filter((rel) => !fs.existsSync(path.join(baseline, rel)) || !fs.existsSync(path.join(root, rel)) || sha(path.join(baseline, rel)) !== sha(path.join(root, rel)));
const allowedLaterProtectedChanges = new Set(['src/pages/index.astro','src/data/highIntentModelContent.js','src/data/discoveryLinks.js','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs']);
const unexpectedChangedProtected = changedProtected.filter((rel) => !allowedLaterProtectedChanges.has(rel));
const oldModule = await import(pathToFileURL(path.join(baseline, 'src/data/highIntentGuideContent.js')).href + '?v=' + Date.now());
const oldContent = oldModule.HIGH_INTENT_GUIDE_CONTENT;
const oldKeys = Object.keys(oldContent);
const changedOldGuides = oldKeys.filter((key) => JSON.stringify(oldContent[key]) !== JSON.stringify(HIGH_INTENT_GUIDE_CONTENT[key]));
const oldGuideModule = await import(pathToFileURL(path.join(baseline, 'src/data/architecture/guides.js')).href + '?v=' + Date.now());
const oldGuideBySlug = new Map(oldGuideModule.GUIDE_ARCHITECTURE.map((p) => [p.slug, p]));
const changedOldGuideOwnership = oldKeys.filter((slug) => {
  const before = oldGuideBySlug.get(slug); const after = GUIDE_ARCHITECTURE.find((p) => p.slug === slug);
  if (!before || !after) return true;
  const fields = ['slug','path','title','h1','description','parent','directory','cluster','type'];
  return fields.some((field) => JSON.stringify(before[field]) !== JSON.stringify(after[field]));
});
const architectureIndex = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'INDEX').length;
const architectureHold = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'HOLD_NOINDEX').length;
const guideIndex = GUIDE_ARCHITECTURE.filter((p) => p.lifecycle === 'INDEX').length;
const guideHold = GUIDE_ARCHITECTURE.filter((p) => p.lifecycle === 'HOLD_NOINDEX').length;
const pass = unexpectedChangedProtected.length === 0 && changedOldGuides.length === 0 && changedOldGuideOwnership.length === 0 && oldKeys.length === 40 && Object.keys(HIGH_INTENT_GUIDE_CONTENT).length === 54 && architectureIndex >= 211 && architectureHold === ARCHITECTURE_PAGES.length - architectureIndex && guideIndex === 54 && guideHold === 6;
const report = {
  verdict: pass ? 'PASS' : 'FAIL', generatedAt: new Date().toISOString(), batch: 'CONTENT_BATCH_12_REGRESSION', baseline: 'CONTENT_BATCH_11',
  findings: { architectureIndex, architectureHold, guideIndex, guideHold, batch11GuidesPreserved: oldKeys.length, changedBatch11Guides: changedOldGuides.length, changedOldGuideOwnership: changedOldGuideOwnership.length, protectedFilesChecked: protectedFiles.length, changedProtectedFiles: changedProtected.length, unexpectedChangedProtectedFiles: unexpectedChangedProtected.length },
  changedOldGuides, changedOldGuideOwnership, changedProtected, unexpectedChangedProtected,
};
const out = path.join(root, 'docs/content-batch12'); fs.mkdirSync(out, { recursive: true }); fs.writeFileSync(path.join(out, 'content-batch12-regression.json'), JSON.stringify(report, null, 2) + '\n'); console.log(JSON.stringify(report, null, 2)); if (!pass) process.exitCode = 1;
