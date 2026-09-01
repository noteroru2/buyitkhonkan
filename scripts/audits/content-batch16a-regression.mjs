import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ARCHITECTURE_PAGES } from '../../src/data/architecture/index.js';

const root = process.cwd();
const outDir = path.join(root, 'docs/content-batch16a');
fs.mkdirSync(outDir, { recursive: true });
const snapshotPath = path.join(outDir, 'batch15-protected-hashes.json');
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const changedProtected = [];
for (const [rel, expected] of Object.entries(snapshot.protectedFiles)) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) changedProtected.push({ file: rel, reason: 'missing' });
  else {
    const actual = sha(p);
    if (actual !== expected) changedProtected.push({ file: rel, expected, actual });
  }
}
// Later approved model releases legitimately extend the aggregate content registry.
const allowedLaterProtectedChanges = new Set(['src/data/highIntentModelContent.js','src/pages/[slug].astro','src/pages/บทความ/[slug].astro','astro.config.mjs']);
const unexpectedChangedProtected = changedProtected.filter((item) => !allowedLaterProtectedChanges.has(item.file));

const expectedChangedOrNew = [
  'src/data/architecture/hubs.js',
  'src/data/authorityHubContent.js',
  'src/components/ReleasedAuthorityHub.astro',
  'src/pages/[slug].astro',
  'src/components/Header.astro',
  'src/components/DiscoveryHub.astro',
  'src/components/Footer.astro',
  'src/data/discoveryLinks.js',
  'src/pages/index.astro',
  'src/pages/เกี่ยวกับเรา.astro',
  'scripts/audits/content-batch16a-audit.mjs',
  'scripts/audits/content-batch16a-regression.mjs',
];
const missingExpected = expectedChangedOrNew.filter((rel) => !fs.existsSync(path.join(root, rel)));
const byId = new Map(ARCHITECTURE_PAGES.map((p) => [p.id, p]));
const hubProducts = byId.get('hub-products');
const hubModels = byId.get('hub-brands-models');
const index = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'INDEX').length;
const hold = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'HOLD_NOINDEX').length;
const pass = unexpectedChangedProtected.length === 0
  && missingExpected.length === 0
  && ARCHITECTURE_PAGES.length === 311
  && index >= 257 && hold === ARCHITECTURE_PAGES.length - index
  && hubProducts?.lifecycle === 'INDEX'
  && hubModels?.lifecycle === 'INDEX';
const report = {
  verdict: pass ? 'PASS' : 'FAIL',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_16A_AUTHORITY_HUB_REGRESSION',
  baseline: snapshot.baseline,
  note: 'Historical regression preserves the Batch 16A hub release while allowing later approved model-content aggregation.',
  findings: {
    protectedFilesChecked: Object.keys(snapshot.protectedFiles).length,
    changedProtectedFiles: changedProtected.length,
    unexpectedChangedProtectedFiles: unexpectedChangedProtected.length,
    missingExpectedFiles: missingExpected.length,
    architectureTotal: ARCHITECTURE_PAGES.length,
    architectureIndex: index,
    architectureHold: hold,
    authorityHubsIndex: [hubProducts, hubModels].filter((p) => p?.lifecycle === 'INDEX').length,
  },
  changedProtected,
  unexpectedChangedProtected,
  missingExpected,
};
fs.writeFileSync(path.join(outDir, 'content-batch16a-regression.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (!pass) process.exitCode = 1;
