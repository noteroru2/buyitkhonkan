import fs from 'node:fs';
import path from 'node:path';
import {
  ARCHITECTURE_PAGES,
  ARCHITECTURE_HOLD_PATHS,
} from '../../src/data/architecture/index.js';
import {
  TRIAGE_DECISIONS,
  REMAINING_ARCHITECTURE_TRIAGE,
} from '../../src/data/architecture/quality-triage.js';

const root = process.cwd();
const outDir = path.join(root, 'docs/content-batch15');
fs.mkdirSync(outDir, { recursive: true });

const byId = new Map(ARCHITECTURE_PAGES.map((p) => [p.id, p]));
const byPath = new Map(ARCHITECTURE_PAGES.map((p) => [p.path, p]));
const holdPages = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'HOLD_NOINDEX');
const indexPages = ARCHITECTURE_PAGES.filter((p) => p.lifecycle === 'INDEX');
const triageById = new Map(REMAINING_ARCHITECTURE_TRIAGE.map((x) => [x.id, x]));
const allowed = new Set(Object.values(TRIAGE_DECISIONS));

const problems = {
  duplicateDecisionIds: [],
  missingHoldDecisions: [],
  extraNonHoldDecisions: [],
  invalidDecision: [],
  missingReason: [],
  invalidMergeTarget: [],
  releaseWithTarget: [],
  lifecycleChangedByTriage: [],
  guideDecisionDrift: [],
};

const seen = new Set();
for (const item of REMAINING_ARCHITECTURE_TRIAGE) {
  if (seen.has(item.id)) problems.duplicateDecisionIds.push(item.id);
  seen.add(item.id);
  const page = byId.get(item.id);
  if (!page) problems.extraNonHoldDecisions.push(item.id);
  else if (item.decision !== TRIAGE_DECISIONS.RELEASE && page.lifecycle !== 'HOLD_NOINDEX') problems.extraNonHoldDecisions.push(item.id);
  else if (item.decision === TRIAGE_DECISIONS.RELEASE && !['HOLD_NOINDEX', 'INDEX'].includes(page.lifecycle)) problems.extraNonHoldDecisions.push(item.id);
  if (!allowed.has(item.decision)) problems.invalidDecision.push({ id: item.id, decision: item.decision });
  if (!item.reason || item.reason.trim().length < 24) problems.missingReason.push(item.id);
  if (item.decision === TRIAGE_DECISIONS.MERGE) {
    const target = byPath.get(item.target);
    if (!item.target || !target || target.lifecycle !== 'INDEX' || ARCHITECTURE_HOLD_PATHS.has(item.target)) {
      problems.invalidMergeTarget.push({ id: item.id, target: item.target });
    }
  }
  if (item.decision === TRIAGE_DECISIONS.RELEASE && item.target) problems.releaseWithTarget.push({ id: item.id, target: item.target });
  if (page && item.decision !== TRIAGE_DECISIONS.RELEASE && page.lifecycle !== 'HOLD_NOINDEX') problems.lifecycleChangedByTriage.push({ id: item.id, lifecycle: page.lifecycle });
}
for (const page of holdPages) if (!triageById.has(page.id)) problems.missingHoldDecisions.push(page.id);

const expectedGuideDecisions = new Map([
  ['guide-โน้ตบุ๊กบานพับแตกประเมินยังไง', ['MERGE', '/รับซื้อโน้ตบุ๊กบานพับแตก-ขอนแก่น/']],
  ['guide-iphone-ฝาหลังแตกขายได้ไหม', ['MERGE', '/รับซื้อiphone-ฝาหลังแตก-ขอนแก่น/']],
  ['guide-iphone-ติดผ่อนตรวจยังไง', ['KEEP_HOLD', null]],
  ['guide-วิธีเช็ก-ipad-งอ', ['MERGE', '/รับซื้อipad-เครื่องงอ-ขอนแก่น/']],
  ['guide-การ์ดจอพัดลมดังประเมินยังไง', ['MERGE', '/รับซื้อการ์ดจอพัดลมดัง-ขอนแก่น/']],
  ['guide-ขายไอทีมือสองต้องมีใบเสร็จไหม', ['KEEP_HOLD', null]],
]);
for (const [id, [decision, target]] of expectedGuideDecisions) {
  const actual = triageById.get(id);
  if (!actual || actual.decision !== decision || (actual.target || null) !== target) {
    problems.guideDecisionDrift.push({ id, expected: { decision, target }, actual });
  }
}

const counts = REMAINING_ARCHITECTURE_TRIAGE.reduce((acc, item) => {
  const page = byId.get(item.id);
  acc[item.decision] = (acc[item.decision] || 0) + 1;
  const typeKey = `${item.decision}:${page?.type || 'missing'}`;
  acc.byType[typeKey] = (acc.byType[typeKey] || 0) + 1;
  const clusterKey = `${item.decision}:${page?.cluster || 'missing'}`;
  acc.byCluster[clusterKey] = (acc.byCluster[clusterKey] || 0) + 1;
  return acc;
}, { RELEASE: 0, KEEP_HOLD: 0, MERGE: 0, RETIRE: 0, byType: {}, byCluster: {} });

const issueCount = Object.values(problems).reduce((sum, list) => sum + list.length, 0);
const releasedFromTriage = REMAINING_ARCHITECTURE_TRIAGE.filter((item) => item.decision === TRIAGE_DECISIONS.RELEASE && byId.get(item.id)?.lifecycle === 'INDEX').length;
const remainingReleaseCandidates = counts.RELEASE - releasedFromTriage;
const countContract = ARCHITECTURE_PAGES.length === 311
  && REMAINING_ARCHITECTURE_TRIAGE.length === 56
  && counts.RELEASE === 42
  && counts.KEEP_HOLD === 10
  && counts.MERGE === 4
  && counts.RETIRE === 0
  && counts.byType['RELEASE:hub'] === 2
  && counts.byType['RELEASE:model'] === 40
  && counts.byType['KEEP_HOLD:model'] === 8
  && counts.byType['KEEP_HOLD:guide'] === 2
  && counts.byType['MERGE:guide'] === 4
  && holdPages.every((page) => triageById.has(page.id));

const projection = {
  currentArchitectureIndex: indexPages.length,
  currentArchitectureHold: holdPages.length,
  originalReleaseCandidates: counts.RELEASE,
  releasedFromTriage,
  remainingReleaseCandidates,
  projectedIndexAfterRemainingReleaseOnly: indexPages.length + remainingReleaseCandidates,
  projectedHoldAfterRemainingReleaseOnly: holdPages.length - remainingReleaseCandidates,
  note: 'Batch 15 is a planning checkpoint. RELEASE decisions may be promoted by later batches; KEEP_HOLD and MERGE decisions must remain noindex unless a new quality decision supersedes them.',
};

const decisions = REMAINING_ARCHITECTURE_TRIAGE.map((item) => {
  const page = byId.get(item.id);
  return {
    id: item.id,
    type: page?.type,
    cluster: page?.cluster,
    label: page?.label,
    path: page?.path,
    lifecycle: page?.lifecycle,
    decision: item.decision,
    target: item.target,
    reason: item.reason,
  };
});

const report = {
  verdict: issueCount === 0 && countContract ? 'PASS' : 'FAIL',
  generatedAt: new Date().toISOString(),
  batch: 'CONTENT_BATCH_15_REMAINING_ARCHITECTURE_QUALITY_TRIAGE',
  findings: {
    architectureTotal: ARCHITECTURE_PAGES.length,
    architectureIndex: indexPages.length,
    architectureHold: holdPages.length,
    triagedHoldPages: REMAINING_ARCHITECTURE_TRIAGE.length,
    decisionCounts: { RELEASE: counts.RELEASE, KEEP_HOLD: counts.KEEP_HOLD, MERGE: counts.MERGE, RETIRE: counts.RETIRE },
    decisionByType: counts.byType,
    issueCount,
    countContract,
  },
  projection,
  problems,
  decisions,
};

fs.writeFileSync(path.join(outDir, 'content-batch15-triage-audit.json'), JSON.stringify(report, null, 2) + '\n');
const esc = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
fs.writeFileSync(
  path.join(outDir, 'remaining-architecture-triage.csv'),
  ['id,type,cluster,label,path,lifecycle,decision,target,reason', ...decisions.map((d) => [d.id,d.type,d.cluster,d.label,d.path,d.lifecycle,d.decision,d.target,d.reason].map(esc).join(','))].join('\n') + '\n',
);

console.log(JSON.stringify(report, null, 2));
if (report.verdict !== 'PASS') process.exitCode = 1;
