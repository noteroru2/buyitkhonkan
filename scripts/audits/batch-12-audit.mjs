import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const dist = path.join(root, 'dist');
const docs = path.join(root, 'docs', 'batch-12');
fs.mkdirSync(docs, { recursive: true });

const walk = (dir, filter = () => true) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full, filter) : filter(full) ? [full] : [];
});
const htmlFiles = walk(dist, (file) => file.endsWith('.html'));
const sourceFiles = walk(path.join(root, 'src'), (file) => /\.(astro|js)$/.test(file));
const claimPattern = /ลูกค้าบอกต่อ|ลูกค้าเก่า|รีวิวจากลูกค้า|ปิดดีล|ราคาสูงที่สุด|ราคาดีที่สุด|ไม่กดราคา|ภายในวันเดียว|ไม่ถึงชั่วโมง|caseStudy|AggregateRating|@type['"]?\s*:\s*['"]Review/gi;
const claims = [];
for (const file of sourceFiles) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!claimPattern.test(line)) { claimPattern.lastIndex = 0; return; }
    claimPattern.lastIndex = 0;
    claims.push({
      url: 'generated page; resolve from source data',
      sourceFile: path.relative(root, file).replaceAll('\\', '/'),
      line: index + 1,
      originalText: line.trim(),
      claimType: /caseStudy/.test(line) ? 'case-study data' : 'unsupported marketing or experience claim',
      risk: /ราคาสูงที่สุด|ไม่ถึงชั่วโมง|AggregateRating|Review/.test(line) ? 'High' : 'Medium',
      repositoryEvidence: 'No supporting customer artifact found in repository',
      recommendation: 'Remove, qualify, or present only as an explicitly labelled example scenario',
    });
  });
}
fs.writeFileSync(path.join(docs, 'trust-claim-inventory.json'), JSON.stringify(claims, null, 2) + '\n');

const results = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file).replaceAll('\\', '/');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] || '';
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] || '';
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  let schemaError = false; const types = [];
  for (const schema of schemas) { try { types.push(JSON.parse(schema)['@type']); } catch { schemaError = true; } }
  results.push({ rel, title, description, canon, h1, types, schemaError });
}
const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const sitemapCount = (sitemap.match(/<loc>/g) || []).length;
const duplicate = (key) => Object.entries(results.reduce((acc, row) => ((acc[row[key]] ||= []).push(row.rel), acc), {})).filter(([value, pages]) => value && pages.length > 1);
const failures = {
  missingTitle: results.filter((x) => !x.title).length,
  duplicateTitles: duplicate('title').length,
  duplicateDescriptions: duplicate('description').length,
  missingCanonical: results.filter((x) => !x.canon).length,
  badH1: results.filter((x) => x.h1 !== 1).length,
  schemaErrors: results.filter((x) => x.schemaError).length,
  sitemapCount,
  htmlCount: results.length,
  breadcrumbPages: results.filter((x) => x.types.includes('BreadcrumbList')).length,
};
fs.writeFileSync(path.join(docs, 'batch-12-automated-audit.json'), JSON.stringify({ generatedAt: new Date().toISOString(), failures, pages: results }, null, 2) + '\n');
const finalMetadata = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'audits', 'batch-4-metadata-audit.json'), 'utf8'));
fs.writeFileSync(path.join(docs, 'metadata-audit-final.json'), JSON.stringify(finalMetadata, null, 2) + '\n');
let baselineMetadata = [];
try { baselineMetadata = JSON.parse(execFileSync('git', ['show', '664e6bed9d69c936808ef36d470c6702383caaa5:docs/audits/batch-4-metadata-audit.json'], { encoding: 'utf8' })); } catch {}
const csv = [['URL','Page type','Old title','New title','Old title length','New title length','Old description','New description','Old description length','New description length','Reason']];
const quote = (value) => `"${String(value ?? '').replaceAll('"','""')}"`;
for (const current of finalMetadata) {
  const old = baselineMetadata.find((item) => item.url === current.url);
  if (!old || (old.title === current.title && old.desc === current.desc)) continue;
  csv.push([current.url,current.url.startsWith('/บทความ/')?'article':current.url==='/'?'home':'generated',old.title,current.title,[...old.title].length,[...current.title].length,old.desc,current.desc,[...old.desc].length,[...current.desc].length,'CTR cleanup or trust clarification']);
}
fs.writeFileSync(path.join(docs, 'metadata-before-after.csv'), csv.map((row) => row.map(quote).join(',')).join('\n') + '\n');
console.log(JSON.stringify(failures, null, 2));
if (failures.missingTitle || failures.duplicateTitles || failures.duplicateDescriptions || failures.missingCanonical || failures.badH1 || failures.schemaErrors || sitemapCount !== results.length - 1) process.exitCode = 1;
