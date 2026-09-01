import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES } from '../../src/data/categories.js';
import { CORE_MONEY_CONTENT, CORE_MONEY_SLUGS } from '../../src/data/coreMoneyContent.js';

const REQUIRED_COUNT = 15;
const requiredArrays = {
  intro: 2,
  why: 2,
  sub: 4,
  sellerChecklist: 5,
  resolveBeforeSale: 4,
  faq: 4,
};
const forbiddenOwnershipKeys = ['path', 'title', 'h1', 'slug', 'canonical', 'robots', 'lifecycle'];
const highRiskPhrases = [
  'จบภายในวันเดียว',
  'อัปเดตทุกสัปดาห์',
  'อัปเดตตารางรับซื้อ',
  'ราคาสูงสุด',
  'ดีที่สุด',
  'รับหมด',
  'ไม่มีค่าบริการรับถึงที่',
  'ทุกอำเภอ',
  'นัดรับได้วันนี้',
  'การันตีราคา',
];

const categoryBySlug = new Map(CATEGORIES.map((item) => [item.slug, item]));
const errors = [];
const warnings = [];

if (CORE_MONEY_SLUGS.length !== REQUIRED_COUNT) {
  errors.push(`Expected ${REQUIRED_COUNT} core money pages, found ${CORE_MONEY_SLUGS.length}`);
}

for (const slug of CORE_MONEY_SLUGS) {
  const overlay = CORE_MONEY_CONTENT[slug];
  const category = categoryBySlug.get(slug);
  if (!category) {
    errors.push(`${slug}: no live category route found`);
    continue;
  }

  for (const key of forbiddenOwnershipKeys) {
    if (Object.hasOwn(overlay, key)) errors.push(`${slug}: overlay must not own SEO/route key "${key}"`);
  }

  if (!overlay.description || overlay.description.length < 90 || overlay.description.length > 165) {
    errors.push(`${slug}: meta description length ${overlay.description?.length ?? 0} outside 90–165 chars`);
  }

  for (const [field, minCount] of Object.entries(requiredArrays)) {
    const value = overlay[field];
    if (!Array.isArray(value) || value.length < minCount) {
      errors.push(`${slug}: ${field} must contain at least ${minCount} items`);
    }
  }

  if (!overlay.price || overlay.price.length < 120) {
    errors.push(`${slug}: valuation explanation is too thin`);
  }

  const activeText = JSON.stringify(overlay);
  for (const phrase of highRiskPhrases) {
    if (activeText.includes(phrase)) errors.push(`${slug}: contains high-risk claim phrase "${phrase}"`);
  }
}

const allDescriptions = CORE_MONEY_SLUGS.map((slug) => CORE_MONEY_CONTENT[slug].description);
if (new Set(allDescriptions).size !== allDescriptions.length) errors.push('Duplicate core meta descriptions detected');

const allSubHeads = [];
for (const slug of CORE_MONEY_SLUGS) {
  for (const item of CORE_MONEY_CONTENT[slug].sub) allSubHeads.push(`${slug}:${item.h}`);
}
const exactParagraphs = [];
for (const slug of CORE_MONEY_SLUGS) {
  const c = CORE_MONEY_CONTENT[slug];
  for (const paragraph of [...c.intro, ...c.why, c.price]) {
    const norm = paragraph.replace(/\s+/g, ' ').trim();
    exactParagraphs.push({ slug, norm });
  }
}
const paragraphMap = new Map();
for (const row of exactParagraphs) {
  const owners = paragraphMap.get(row.norm) || [];
  owners.push(row.slug);
  paragraphMap.set(row.norm, owners);
}
for (const [text, owners] of paragraphMap) {
  if (owners.length > 1) errors.push(`Exact duplicated editorial paragraph across: ${owners.join(', ')}`);
}

const routeTemplate = fs.readFileSync(path.resolve('src/pages/[slug].astro'), 'utf8');
const requiredTemplateSignals = [
  "CORE_MONEY_CONTENT",
  "catContent?.description",
  "catContent.sellerChecklist",
  "catContent.resolveBeforeSale",
  "catContent.faq.map",
  "mainEntity: catContent.faq.map",
  "ช่วงราคาอ้างอิงในชุดข้อมูลเว็บไซต์",
];
for (const signal of requiredTemplateSignals) {
  if (!routeTemplate.includes(signal)) errors.push(`Template integration missing: ${signal}`);
}
if (routeTemplate.includes('โดยปกติไม่มีค่าบริการรับถึงที่แยกต่างหาก')) {
  errors.push('Legacy unverified pickup-fee claim remains active in category template');
}

const result = {
  verdict: errors.length ? 'FAIL' : warnings.length ? 'PASS_WITH_WARNING' : 'PASS',
  corePages: CORE_MONEY_SLUGS.length,
  liveCategoryRoutes: CATEGORIES.length,
  routeSeoOwnership: 'PRESERVED_IN_CATEGORIES',
  overlayOwnsH1TitlePath: false,
  uniqueDescriptions: new Set(allDescriptions).size,
  exactDuplicateEditorialParagraphs: [...paragraphMap.values()].filter((owners) => owners.length > 1).length,
  highRiskClaimFindings: errors.filter((e) => e.includes('high-risk claim')).length,
  errors,
  warnings,
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
