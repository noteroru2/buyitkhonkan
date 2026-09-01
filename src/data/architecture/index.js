import { ARCHITECTURE_RELEASE_GATES } from './_shared.js';
import { HUB_ARCHITECTURE } from './hubs.js';
import { MODEL_ARCHITECTURE } from './models.js';
import { CONDITION_ARCHITECTURE } from './conditions.js';
import { B2B_ARCHITECTURE } from './b2b.js';
import { DISTRICT_ARCHITECTURE } from './districts.js';
import { GUIDE_ARCHITECTURE } from './guides.js';

export { ARCHITECTURE_RELEASE_GATES } from './_shared.js';
export { HUB_ARCHITECTURE } from './hubs.js';
export { MODEL_ARCHITECTURE } from './models.js';
export { CONDITION_ARCHITECTURE } from './conditions.js';
export { B2B_ARCHITECTURE } from './b2b.js';
export { DISTRICT_ARCHITECTURE } from './districts.js';
export { GUIDE_ARCHITECTURE } from './guides.js';
export { TRIAGE_DECISIONS, REMAINING_ARCHITECTURE_TRIAGE, REMAINING_ARCHITECTURE_TRIAGE_BY_ID, getArchitectureTriageDecision } from './quality-triage.js';

export const ARCHITECTURE_PAGES = [
  ...HUB_ARCHITECTURE,
  ...MODEL_ARCHITECTURE,
  ...CONDITION_ARCHITECTURE,
  ...B2B_ARCHITECTURE,
  ...DISTRICT_ARCHITECTURE,
  ...GUIDE_ARCHITECTURE,
];

export const ARCHITECTURE_BY_PATH = new Map(
  ARCHITECTURE_PAGES.map((page) => [page.path, page]),
);

export const ARCHITECTURE_HOLD_PATHS = new Set(
  ARCHITECTURE_PAGES
    .filter((page) => page.lifecycle === 'HOLD_NOINDEX')
    .map((page) => page.path),
);

export function normalizeArchitecturePath(pathname = '/') {
  let decoded = pathname;
  try {
    decoded = decodeURI(pathname);
  } catch {
    decoded = pathname;
  }
  const clean = `/${decoded.replace(/^\/+|\/+$/g, '')}/`;
  return clean === '//' ? '/' : clean;
}

export function isHoldArchitecturePath(pathname) {
  return ARCHITECTURE_HOLD_PATHS.has(normalizeArchitecturePath(pathname));
}

export function getArchitecturePage(pathname) {
  return ARCHITECTURE_BY_PATH.get(normalizeArchitecturePath(pathname)) || null;
}

export function getArchitectureChildren(page) {
  if (!page) return [];
  return ARCHITECTURE_PAGES.filter((item) => item.parent === page.path);
}

export function getArchitectureSiblings(page, limit = 6) {
  if (!page) return [];
  return ARCHITECTURE_PAGES
    .filter((item) => item.id !== page.id && item.parent === page.parent && item.type === page.type)
    .slice(0, limit);
}


export function getArchitectureDirectoryEntries(page, limit = 24) {
  if (!page) return [];
  const candidates = ARCHITECTURE_PAGES.filter((item) => item.directory === page.path);
  const seenClusters = new Set();
  const entries = [];
  for (const item of candidates) {
    const key = item.cluster || item.type;
    if (seenClusters.has(key)) continue;
    seenClusters.add(key);
    entries.push(item);
    if (entries.length >= limit) break;
  }
  return entries;
}

export function getArchitectureClusterPeers(page, limit = 6) {
  if (!page) return [];
  return ARCHITECTURE_PAGES
    .filter((item) => item.id !== page.id && item.cluster === page.cluster)
    .slice(0, limit);
}

export const ARCHITECTURE_COUNTS = ARCHITECTURE_PAGES.reduce((acc, page) => {
  acc.total += 1;
  acc[page.type] = (acc[page.type] || 0) + 1;
  return acc;
}, { total: 0 });
