import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { MODEL_PAGES } from '../../src/data/modelPages.js';
import { CONDITION_PAGES } from '../../src/data/conditionPages.js';
import { LOCAL_PAGES } from '../../src/data/localPages.js';
import {
  ARCHITECTURE_PAGES,
  ARCHITECTURE_COUNTS,
  ARCHITECTURE_RELEASE_GATES,
  normalizeArchitecturePath,
} from '../../src/data/architectureRegistry.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const normalize = (value) => normalizeArchitecturePath(value);
const existingDynamic = [
  ...CATEGORIES,
  ...BRAND_PAGES,
  ...MODEL_PAGES,
  ...CONDITION_PAGES,
  ...LOCAL_PAGES,
].map((item) => normalize(item.path || item.slug));

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const pageRoot = path.join(root, 'src/pages');
const physicalPages = walk(pageRoot)
  .filter((file) => file.endsWith('.astro'))
  .filter((file) => !path.basename(file).startsWith('['))
  .map((file) => {
    let rel = path.relative(pageRoot, file).replaceAll(path.sep, '/').replace(/\.astro$/, '');
    rel = rel.replace(/\/index$/, '');
    return normalize(rel === 'index' ? '/' : `/${rel}/`);
  });

const existingReleased = new Set([...existingDynamic, ...physicalPages]);
const ids = ARCHITECTURE_PAGES.map((page) => page.id);
const paths = ARCHITECTURE_PAGES.map((page) => normalize(page.path));
const titles = ARCHITECTURE_PAGES.map((page) => page.title);
const h1s = ARCHITECTURE_PAGES.map((page) => page.h1);

const duplicates = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const duplicateIds = duplicates(ids);
const duplicatePaths = duplicates(paths);
const duplicateTitles = duplicates(titles);
const duplicateH1 = duplicates(h1s);
const collisions = ARCHITECTURE_PAGES.filter((page) => existingReleased.has(normalize(page.path)));

const architecturePathSet = new Set(paths);
const missingParents = ARCHITECTURE_PAGES.filter((page) => {
  if (!page.parent || page.parent === '/') return false;
  const parent = normalize(page.parent);
  return !architecturePathSet.has(parent) && !existingReleased.has(parent);
});

const invalidLifecycle = ARCHITECTURE_PAGES.filter((page) => !['HOLD_NOINDEX', 'INDEX'].includes(page.lifecycle));
const missingContracts = ARCHITECTURE_PAGES.filter((page) =>
  !Array.isArray(page.requiredSections)
  || page.requiredSections.length < 3
  || !Array.isArray(page.releaseGate)
  || ARCHITECTURE_RELEASE_GATES.some((gate) => !page.releaseGate.includes(gate))
);
const districtProductMatrix = ARCHITECTURE_PAGES.filter((page) =>
  page.type === 'local' && /notebook|iphone|macbook|ipad|gpu|camera|monitor/i.test(page.id)
);

const report = {
  generatedAt: new Date().toISOString(),
  verdict: 'PASS',
  architecture: ARCHITECTURE_COUNTS,
  existingReleasedPathsDetected: existingReleased.size,
  forecastBuiltRoutesMinimum: existingReleased.size + ARCHITECTURE_PAGES.length,
  releaseGates: ARCHITECTURE_RELEASE_GATES,
  findings: {
    duplicateIds: duplicateIds.length,
    duplicatePaths: duplicatePaths.length,
    duplicateTitles: duplicateTitles.length,
    duplicateH1: duplicateH1.length,
    routeCollisions: collisions.length,
    missingParents: missingParents.length,
    invalidLifecycle: invalidLifecycle.length,
    missingContentContracts: missingContracts.length,
    productDistrictDoorwayMatrix: districtProductMatrix.length,
  },
  samples: {
    collisions: collisions.slice(0, 10).map((page) => page.path),
    missingParents: missingParents.slice(0, 10).map((page) => ({ path: page.path, parent: page.parent })),
  },
};

const failed = Object.values(report.findings).some((value) => value > 0);
if (failed) report.verdict = 'FAIL';

const outDir = path.join(root, 'docs/architecture');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'architecture-audit.json'), `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify(report, null, 2));
if (failed) process.exit(1);
