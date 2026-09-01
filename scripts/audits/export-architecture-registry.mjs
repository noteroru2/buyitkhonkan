import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARCHITECTURE_PAGES } from '../../src/data/architectureRegistry.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const out = path.join(root, 'docs/architecture/page-registry.csv');
const esc = (value = '') => {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
const header = ['id','path','type','cluster','label','lifecycle','parent','directory','required_sections'];
const rows = ARCHITECTURE_PAGES.map((page) => [
  page.id, page.path, page.type, page.cluster, page.label, page.lifecycle,
  page.parent || '', page.directory || '', page.requiredSections || [],
].map(esc).join(','));
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, '\ufeff' + [header.join(','), ...rows].join('\n') + '\n');
const counts = ARCHITECTURE_PAGES.reduce((acc,p)=>{acc[p.lifecycle]=(acc[p.lifecycle]||0)+1; return acc;},{});
console.log(JSON.stringify({ out, total: ARCHITECTURE_PAGES.length, lifecycle: counts }, null, 2));
