import fs from 'node:fs';
import path from 'node:path';
import { ARCHITECTURE_PAGES, ARCHITECTURE_HOLD_PATHS } from '../../src/data/architecture/index.js';
import { HUB_ARCHITECTURE } from '../../src/data/architecture/hubs.js';
import { MODEL_ARCHITECTURE } from '../../src/data/architecture/models.js';
import { CATEGORIES } from '../../src/data/categories.js';
import { BRAND_PAGES } from '../../src/data/brandPages.js';
import { getAuthorityHubContent } from '../../src/data/authorityHubContent.js';
import { REMAINING_ARCHITECTURE_TRIAGE, TRIAGE_DECISIONS } from '../../src/data/architecture/quality-triage.js';

const root = process.cwd();
const outDir = path.join(root, 'docs/content-batch16a');
fs.mkdirSync(outDir, { recursive: true });
const routeSource = fs.readFileSync(path.join(root, 'src/pages/[slug].astro'), 'utf8');
const componentSource = fs.readFileSync(path.join(root, 'src/components/ReleasedAuthorityHub.astro'), 'utf8');
const headerSource = fs.readFileSync(path.join(root, 'src/components/Header.astro'), 'utf8');
const discoveryComponentSource = fs.readFileSync(path.join(root, 'src/components/DiscoveryHub.astro'), 'utf8');
const discoveryDataSource = fs.readFileSync(path.join(root, 'src/data/discoveryLinks.js'), 'utf8');

const targetIds = ['hub-products', 'hub-brands-models'];
const byId = new Map(ARCHITECTURE_PAGES.map((p) => [p.id, p]));
const releasedHubs = targetIds.map((id) => byId.get(id));
const liveModels = MODEL_ARCHITECTURE.filter((p) => p.lifecycle === 'INDEX');
const holdModels = MODEL_ARCHITECTURE.filter((p) => p.lifecycle === 'HOLD_NOINDEX');
const holdPaths = new Set(holdModels.map((p) => p.path));
const issues = {
  missingHub: [],
  hubNotIndex: [],
  placeholderMetadata: [],
  missingHubContent: [],
  incompleteProductCategories: [],
  incompleteModelClusters: [],
  duplicateProductCategorySlug: [],
  modelDirectoryMismatch: [],
  holdLeakRisk: [],
  missingIntegrationToken: [],
  oldCategoryAnchorRemaining: [],
  triageReleaseMismatch: [],
};

for (const hub of releasedHubs) {
  if (!hub) { issues.missingHub.push(hub); continue; }
  if (hub.lifecycle !== 'INDEX') issues.hubNotIndex.push({ id: hub.id, lifecycle: hub.lifecycle });
  if (!hub.title || !hub.h1 || !hub.description || /โครงสร้างหน้าสำหรับ/.test(hub.description)) issues.placeholderMetadata.push(hub.id);
  const content = getAuthorityHubContent(hub);
  if (!content || (content.heroIntro?.length || 0) < 2 || (content.principles?.length || 0) < 4) issues.missingHubContent.push(hub.id);
}

const productContent = getAuthorityHubContent('hub-products');
const groupedCategorySlugs = (productContent?.categoryGroups || []).flatMap((g) => g.slugs || []);
const categoryCounts = groupedCategorySlugs.reduce((m, slug) => m.set(slug, (m.get(slug) || 0) + 1), new Map());
const missingCategories = CATEGORIES.map((c) => c.slug).filter((slug) => !categoryCounts.has(slug));
const extraCategories = groupedCategorySlugs.filter((slug) => !CATEGORIES.some((c) => c.slug === slug));
const duplicates = [...categoryCounts].filter(([, n]) => n !== 1).map(([slug, n]) => ({ slug, count: n }));
if (missingCategories.length || extraCategories.length) issues.incompleteProductCategories.push({ missingCategories, extraCategories });
issues.duplicateProductCategorySlug.push(...duplicates);

const modelContent = getAuthorityHubContent('hub-brands-models');
const declaredClusters = (modelContent?.directoryGroups || []).flatMap((g) => g.clusters || []);
const liveClusters = [...new Set(liveModels.map((p) => p.cluster))];
const missingClusters = liveClusters.filter((cluster) => !declaredClusters.includes(cluster));
const extraClusters = declaredClusters.filter((cluster) => !liveClusters.includes(cluster));
if (missingClusters.length || extraClusters.length) issues.incompleteModelClusters.push({ missingClusters, extraClusters });
const directoryModels = liveModels.filter((p) => declaredClusters.includes(p.cluster));
if (directoryModels.length !== liveModels.length || new Set(directoryModels.map((p) => p.path)).size !== liveModels.length) {
  issues.modelDirectoryMismatch.push({ liveModels: liveModels.length, directoryModels: directoryModels.length });
}
if (directoryModels.some((p) => holdPaths.has(p.path))) issues.holdLeakRisk.push('directory includes HOLD model path');

const integrationTokens = [
  ['route import', routeSource, 'ReleasedAuthorityHub'],
  ['route release selector', routeSource, "['hub-products', 'hub-brands-models']"],
  ['CollectionPage schema', routeSource, "'@type': 'CollectionPage'"],
  ['authority render', routeSource, '<ReleasedAuthorityHub page={architecturePage} />'],
  ['component INDEX filter', componentSource, "item.lifecycle === 'INDEX'"],
  ['component batch marker', componentSource, 'data-content-batch="16A"'],
  ['product hub header link', headerSource, 'href="/สินค้าที่รับซื้อ/"'],
  ['discovery hub shortcut', discoveryComponentSource, 'href="/สินค้าที่รับซื้อ/"'],
];
for (const [name, source, token] of integrationTokens) if (!source.includes(token)) issues.missingIntegrationToken.push(name);
for (const [file, source] of [['Header', headerSource], ['DiscoveryHub', discoveryComponentSource], ['discoveryLinks', discoveryDataSource], ['route', routeSource]]) {
  if (source.includes('/#categories')) issues.oldCategoryAnchorRemaining.push(file);
}

const triageById = new Map(REMAINING_ARCHITECTURE_TRIAGE.map((x) => [x.id, x]));
for (const id of targetIds) {
  if (triageById.get(id)?.decision !== TRIAGE_DECISIONS.RELEASE) issues.triageReleaseMismatch.push(id);
}

const architectureIndex = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'INDEX').length;
const architectureHold = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'HOLD_NOINDEX').length;
const remainingReleaseCandidates = REMAINING_ARCHITECTURE_TRIAGE.filter((item) => item.decision === TRIAGE_DECISIONS.RELEASE && byId.get(item.id)?.lifecycle === 'HOLD_NOINDEX').length;
const issueCount = Object.values(issues).reduce((sum, list) => sum + list.length, 0);
const countContract = ARCHITECTURE_PAGES.length === 311
  && architectureIndex >= 257
  && architectureHold === ARCHITECTURE_PAGES.length - architectureIndex
  && liveModels.length >= 132
  && liveModels.length + holdModels.length === 180
  && CATEGORIES.length === 15
  && BRAND_PAGES.length === 6
  && remainingReleaseCandidates <= 40
  && ARCHITECTURE_HOLD_PATHS.size === architectureHold
  && releasedHubs.every((p) => p?.lifecycle === 'INDEX');

const report = {
  verdict: issueCount === 0 && countContract ? 'PASS' : 'FAIL',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_16A_AUTHORITY_HUB_RELEASE',
  findings: {
    architectureTotal: ARCHITECTURE_PAGES.length,
    architectureIndex,
    architectureHold,
    releasedAuthorityHubs: releasedHubs.filter(Boolean).length,
    categoriesRepresented: groupedCategorySlugs.length,
    brandPages: BRAND_PAGES.length,
    liveModelDirectoryEntries: liveModels.length,
    liveModelClusters: liveClusters.length,
    remainingReleaseCandidates,
    issueCount,
    countContract,
  },
  issues,
  authorityHubs: releasedHubs.map((p) => p && ({ id: p.id, path: p.path, lifecycle: p.lifecycle, title: p.title, h1: p.h1 })),
};
fs.writeFileSync(path.join(outDir, 'content-batch16a-audit.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (report.verdict !== 'PASS') process.exitCode = 1;
