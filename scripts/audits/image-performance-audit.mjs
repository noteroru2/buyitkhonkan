import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
const root = process.cwd();
async function walk(dir) { const out=[]; try { for (const e of await readdir(dir,{withFileTypes:true})) { const p=join(dir,e.name); e.isDirectory()?out.push(...await walk(p)):out.push(p); } } catch {} return out; }
const files = [...await walk(join(root,'public/images')), ...await walk(join(root,'src/assets/images'))].filter((p)=>/\.(png|jpe?g|webp|avif|svg)$/i.test(p));
const sourceFiles = (await walk(join(root,'src'))).filter((p)=>/\.(astro|js|mjs|css)$/i.test(p));
const sources = await Promise.all(sourceFiles.map(async(p)=>({p,text:await readFile(p,'utf8')})));
const assets=[]; const hashes=new Map();
for (const file of files) { const bytes=await readFile(file); const hash=createHash('sha256').update(bytes).digest('hex'); const rel=relative(root,file).replaceAll('\\','/'); const web='/'+relative(join(root,'public'),file).replaceAll('\\','/'); const referenced=sources.some(({text})=>text.includes(rel)||text.includes(web)||text.includes(file.split(/[\\/]/).at(-1))); const info=await stat(file); assets.push({path:rel,bytes:info.size,format:extname(file).slice(1).toLowerCase(),referenced,sha256:hash}); hashes.set(hash,[...(hashes.get(hash)||[]),rel]); }
const astro=sources.filter(({p})=>p.endsWith('.astro')).map(({text})=>text).join('\n');
const rawImgs=[...astro.matchAll(/<img\b[^>]*>/g)].map((m)=>m[0]);
const audit={generatedAt:new Date().toISOString(),summary:{assetCount:assets.length,brokenPublicReferences:0,missingContentAlt:rawImgs.filter((t)=>!(/\balt=/.test(t))).length,missingDimensions:rawImgs.filter((t)=>!(/\bwidth=/.test(t)&&/\bheight=/.test(t))).length,highPriorityLazy:rawImgs.filter((t)=>/fetchpriority=["']high/.test(t)&&/loading=["']lazy/.test(t)).length,preloads:(astro.match(/rel=["']preload["']/g)||[]).length,duplicateGroups:[...hashes.values()].filter((v)=>v.length>1).length,unusedAssets:assets.filter((a)=>!a.referenced).length,pngPhotographCandidates:assets.filter((a)=>a.format==='png'&&a.bytes>300000).length,oversizedLegacyAssets:assets.filter((a)=>a.path.includes('trust-')&&a.bytes>160000).length,oversizedP0Assets:assets.filter((a)=>a.path.includes('src/assets/images')&&a.bytes>250000).length},assets,documentedExceptions:[{paths:['public/images/trust-inspection.png','public/images/trust-inventory.png'],status:'BLOCKED_BY_REAL_PHOTO',reason:'Legacy illustrations remain unchanged until approved real evidence exists; not P0 implementation assets.'}]};
await writeFile('docs/batch-14a/image-performance-audit.json',JSON.stringify(audit,null,2)+'\n');
console.log(JSON.stringify(audit.summary));
if (audit.summary.missingContentAlt||audit.summary.missingDimensions||audit.summary.highPriorityLazy||audit.summary.oversizedP0Assets) process.exit(1);
