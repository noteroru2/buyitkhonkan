import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg']);
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path));
    else if (allowed.has(extname(entry.name).toLowerCase())) out.push(path);
  }
  return out;
}
async function walkAll(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walkAll(path));
    else out.push(path);
  }
  return out;
}

const files = await walk(join(root, 'public'));
const sources = (await walkAll(join(root, 'src')).catch(() => [])).filter((p) => ['.astro','.js','.mjs','.css'].includes(extname(p)));
const sourceText = (await Promise.all(sources.map((p) => readFile(p, 'utf8')))).join('\n');
const assets = [];
for (const file of files) {
  const info = await stat(file);
  const webPath = '/' + relative(join(root, 'public'), file).replaceAll('\\', '/');
  assets.push({ path: relative(root, file).replaceAll('\\','/'), bytes: info.size, referenced: sourceText.includes(webPath) });
}
const html = sources.filter((p) => extname(p) === '.astro').map((p) => readFile(p, 'utf8'));
const combined = (await Promise.all(html)).join('\n');
const result = {
  assets,
  counts: Object.fromEntries([...allowed].map((ext) => [ext, assets.filter((a) => extname(a.path).toLowerCase() === ext).length])),
  imgTags: (combined.match(/<img\b/g) || []).length,
  astroImageTags: (combined.match(/<(?:Image|Picture)\b/g) || []).length,
  responsiveAttributes: (combined.match(/\b(?:srcset|sizes)=/g) || []).length,
  oversizedRaster: assets.filter((a) => /\.(?:png|jpe?g)$/i.test(a.path) && a.bytes > 300_000),
};
console.log(JSON.stringify(result, null, 2));
