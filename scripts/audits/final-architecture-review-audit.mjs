import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { MODEL_PAGES } from '../../src/data/modelPages.js';
import { CONDITION_PAGES } from '../../src/data/conditionPages.js';
import { LOCAL_PAGES } from '../../src/data/localPages.js';
import { ARCHITECTURE_PAGES, normalizeArchitecturePath } from '../../src/data/architectureRegistry.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { CONDITION_ARCHITECTURE } from '../../src/data/architecture/conditions.js';
import { B2B_ARCHITECTURE } from '../../src/data/architecture/b2b.js';
import { DISTRICT_ARCHITECTURE } from '../../src/data/architecture/districts.js';
import { GUIDE_ARCHITECTURE } from '../../src/data/architecture/guides.js';
import { getB2BHubDiscovery, getConditionHubDiscovery, getAreaHubDiscovery } from '../../src/data/discoveryLinks.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const normalize = (value) => normalizeArchitecturePath(value);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const existingDynamic = [
  ...CATEGORIES,
  ...BRAND_PAGES,
  ...MODEL_PAGES,
  ...CONDITION_PAGES,
  ...LOCAL_PAGES,
].map((item) => normalize(item.path || item.slug));

const pageRoot = path.join(root, 'src/pages');
const physicalPages = walk(pageRoot)
  .filter((file) => file.endsWith('.astro'))
  .filter((file) => !path.basename(file).startsWith('['))
  .map((file) => {
    let rel = path.relative(pageRoot, file).replaceAll(path.sep, '/').replace(/\.astro$/, '');
    rel = rel.replace(/\/index$/, '');
    return normalize(rel === 'index' ? '/' : `/${rel}/`);
  });

const physicalIndexable = physicalPages.filter((item) => item !== '/404/');
const architectureIndex = ARCHITECTURE_PAGES.filter((page) => page.lifecycle === 'INDEX');
const architectureHold = ARCHITECTURE_PAGES.filter((page) => page.lifecycle !== 'INDEX');
const indexableExisting = new Set([...existingDynamic, ...physicalIndexable]);
const allBuiltExisting = new Set([...existingDynamic, ...physicalPages]);

const productionIndexableRoutes = indexableExisting.size + architectureIndex.length;
const productionGeneratedRoutes = allBuiltExisting.size + architectureIndex.length;
const expectedSitemapUrls = productionIndexableRoutes;

const triagePath = path.join(root, 'docs/content-batch15/remaining-architecture-triage.json');
const triage = JSON.parse(fs.readFileSync(triagePath, 'utf8')).decisions;
const decisionById = new Map(triage.map((item) => [item.id, item.decision]));
const currentHoldDecisions = architectureHold.map((page) => ({
  id: page.id,
  type: page.type,
  path: page.path,
  label: page.label,
  decision: decisionById.get(page.id) || 'UNCLASSIFIED',
}));
const holdDecisionCounts = currentHoldDecisions.reduce((acc, item) => {
  acc[item.decision] = (acc[item.decision] || 0) + 1;
  return acc;
}, {});

const rootRouteSource = read('src/pages/[slug].astro');
const guideRouteSource = read('src/pages/บทความ/[slug].astro');
const sitemapSource = read('astro.config.mjs');
const footerSource = read('src/components/Footer.astro');
const headerSource = read('src/components/Header.astro');
const authorityHubSource = read('src/components/ReleasedAuthorityHub.astro');
const articleHubSource = read('src/pages/บทความ/index.astro');
const areaHubSource = read('src/pages/พื้นที่ให้บริการ.astro');

const rootIndexOnly = rootRouteSource.includes("page.lifecycle === 'INDEX' && page.type !== 'guide'");
const guideIndexOnly = guideRouteSource.includes("page.type === 'guide' && page.lifecycle === 'INDEX'");
const rootContentGuard = rootRouteSource.includes('INDEX architecture page is missing released content/renderer');
const guideContentGuard = guideRouteSource.includes('INDEX guide is missing released content');
const sitemapExcludes404 = sitemapSource.includes("pathname === '/404'") && sitemapSource.includes("pathname === '/404/'");
const sitemapExcludesHold = sitemapSource.includes('!isHoldArchitecturePath(pathname)');

const globalHubLinks = {
  products: headerSource.includes('href="/สินค้าที่รับซื้อ/"') || footerSource.includes('href="/สินค้าที่รับซื้อ/"'),
  models: footerSource.includes('href="/ยี่ห้อและรุ่นที่รับซื้อ/"'),
  areas: headerSource.includes('href="/พื้นที่ให้บริการ/"') || footerSource.includes('href="/พื้นที่ให้บริการ/"'),
  conditions: footerSource.includes('href="/สภาพสินค้าที่ขายได้/"'),
  articles: headerSource.includes('href="/บทความ/"') || footerSource.includes('href="/บทความ/"'),
  b2b: footerSource.includes('href="/รับซื้อยกล็อต-บริษัท/"'),
};

const hrefSet = (groups) => new Set(groups.flatMap((group) => group.items || []).map((item) => normalize(item.href)));
const b2bHubTargets = hrefSet(getB2BHubDiscovery());
const conditionHubTargets = hrefSet(getConditionHubDiscovery());
const areaHubTargets = hrefSet(getAreaHubDiscovery());

const missingB2BHubChildren = B2B_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX' && !b2bHubTargets.has(normalize(page.path)));
const missingConditionHubChildren = CONDITION_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX' && !conditionHubTargets.has(normalize(page.path)));
const missingAreaHubChildren = DISTRICT_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX' && !areaHubTargets.has(normalize(page.path)));

const modelDirectoryCoversLifecycle = authorityHubSource.includes("MODEL_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX')")
  && authorityHubSource.includes('cluster.items.map((item)');
const guideHubCoversLifecycle = articleHubSource.includes("GUIDE_ARCHITECTURE\n  .filter((page) => page.lifecycle === 'INDEX')")
  || (articleHubSource.includes('GUIDE_ARCHITECTURE') && articleHubSource.includes("page.lifecycle === 'INDEX'"));
const areaHubCoversLifecycle = areaHubSource.includes("DISTRICT_ARCHITECTURE.filter((page) => page.lifecycle === 'INDEX')");

const releaseCandidatesStillHold = currentHoldDecisions.filter((item) => item.decision === 'RELEASE');
const unclassifiedHolds = currentHoldDecisions.filter((item) => item.decision === 'UNCLASSIFIED');

const findings = {
  below350IndexableRoutes: productionIndexableRoutes < 350 ? 1 : 0,
  holdRoutesStillBuilt: rootIndexOnly && guideIndexOnly ? 0 : architectureHold.length,
  sitemap404Risk: sitemapExcludes404 ? 0 : 1,
  sitemapHoldRisk: sitemapExcludesHold ? 0 : 1,
  missingRootContentGuard: rootContentGuard ? 0 : 1,
  missingGuideContentGuard: guideContentGuard ? 0 : 1,
  missingGlobalHubLinks: Object.values(globalHubLinks).filter((value) => !value).length,
  missingB2BHubChildren: missingB2BHubChildren.length,
  missingConditionHubChildren: missingConditionHubChildren.length,
  missingAreaHubChildren: missingAreaHubChildren.length,
  missingModelDirectoryLifecycleCoverage: modelDirectoryCoversLifecycle ? 0 : 1,
  missingGuideHubLifecycleCoverage: guideHubCoversLifecycle ? 0 : 1,
  missingAreaHubLifecycleCoverage: areaHubCoversLifecycle ? 0 : 1,
  releaseCandidatesStillHold: releaseCandidatesStillHold.length,
  unclassifiedHolds: unclassifiedHolds.length,
};

const verdict = Object.values(findings).some((value) => value > 0) ? 'FAIL' : 'PASS';
const report = {
  generatedAt: new Date().toISOString(),
  verdict,
  strategyDecision: productionIndexableRoutes >= 350 ? 'STOP_PAGE_EXPANSION_AND_HARDEN' : 'EXPAND_SELECTIVELY',
  routeInventory: {
    existingDynamicRoutes: existingDynamic.length,
    physicalPagesIncluding404: physicalPages.length,
    existingIndexableRoutes: indexableExisting.size,
    architectureRecords: ARCHITECTURE_PAGES.length,
    architectureIndex: architectureIndex.length,
    architectureHold: architectureHold.length,
    productionGeneratedRoutesExpected: productionGeneratedRoutes,
    productionIndexableRoutesExpected: productionIndexableRoutes,
    sitemapUrlsExpected: expectedSitemapUrls,
    exceeds300By: productionIndexableRoutes - 300,
    exceeds350By: productionIndexableRoutes - 350,
  },
  architectureByType: {
    models: { index: MODEL_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, hold: MODEL_ARCHITECTURE.filter((x) => x.lifecycle !== 'INDEX').length },
    conditions: { index: CONDITION_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, hold: CONDITION_ARCHITECTURE.filter((x) => x.lifecycle !== 'INDEX').length },
    b2b: { index: B2B_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, hold: B2B_ARCHITECTURE.filter((x) => x.lifecycle !== 'INDEX').length },
    districts: { index: DISTRICT_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, hold: DISTRICT_ARCHITECTURE.filter((x) => x.lifecycle !== 'INDEX').length },
    guides: { index: GUIDE_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, hold: GUIDE_ARCHITECTURE.filter((x) => x.lifecycle !== 'INDEX').length },
  },
  holdPolicy: {
    counts: holdDecisionCounts,
    releaseCandidatesStillHold: releaseCandidatesStillHold.map((x) => x.path),
    pages: currentHoldDecisions,
  },
  productionSurface: {
    architectureRoutesBuilt: 'INDEX_ONLY',
    holdArchitecturePubliclyBuilt: false,
    indexContentBuildGuards: { root: rootContentGuard, guide: guideContentGuard },
    sitemap: { excludes404: sitemapExcludes404, excludesHoldArchitecture: sitemapExcludesHold },
  },
  crawlDesign: {
    targetMaxDepthFromHomepage: 2,
    globalHubLinks,
    lifecycleDirectories: {
      modelDirectory: modelDirectoryCoversLifecycle,
      guideHub: guideHubCoversLifecycle,
      areaHub: areaHubCoversLifecycle,
    },
    hubChildCoverage: {
      models: { expected: MODEL_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, directoryGeneratedFromAllLiveModels: modelDirectoryCoversLifecycle },
      guides: { expected: GUIDE_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, articleHubGeneratedFromAllLiveGuides: guideHubCoversLifecycle },
      districts: { expected: DISTRICT_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, missing: missingAreaHubChildren.length },
      conditions: { expected: CONDITION_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, missing: missingConditionHubChildren.length },
      b2b: { expected: B2B_ARCHITECTURE.filter((x) => x.lifecycle === 'INDEX').length, missing: missingB2BHubChildren.length },
    },
  },
  findings,
};

const outDir = path.join(root, 'docs/final-architecture-review');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'final-architecture-review-audit.json'), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, 'hold-pages.csv'), [
  'id,type,path,label,decision,lifecycle',
  ...currentHoldDecisions.map((item) => [item.id, item.type, item.path, item.label, item.decision, 'HOLD_NOINDEX'].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')),
].join('\n') + '\n');

console.log(JSON.stringify(report, null, 2));
if (verdict !== 'PASS') process.exit(1);
