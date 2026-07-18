import { access, mkdir, readFile, stat } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const dryRun = process.argv.includes('--dry-run');
const manifestPath = resolve(root, 'docs/batch-14a/approved-assets.json');
const inputRoot = resolve(root, 'private-assets/image-intake/approved-source');
const outputRoot = resolve(root, 'src/assets/images/approved');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const approved = manifest.assets.filter((asset) => asset.approvedForWeb);
const critical = [];

for (const asset of approved) {
  const label = asset.assetId;
  if (asset.usagePermission !== 'approved-web' || !['not-required','granted'].includes(asset.consentStatus) || !asset.privacyEditsCompleted) {
    critical.push(`${label}: approval/consent/privacy gate failed`); continue;
  }
  if ((asset.privacyEditsRequired || []).length && !asset.privacyEditsCompleted) { critical.push(`${label}: required edits incomplete`); continue; }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/.test(asset.webFilename)) { critical.push(`${label}: webFilename must be kebab-case .webp`); continue; }
  const source = resolve(inputRoot, basename(asset.sourceFilename));
  if (!source.startsWith(inputRoot)) { critical.push(`${label}: invalid source path`); continue; }
  try { await access(source); } catch { critical.push(`${label}: approved source missing`); continue; }
  const sourceInfo = await stat(source);
  if (sourceInfo.size > 40_000_000) { critical.push(`${label}: source exceeds 40 MB intake cap`); continue; }
  const meta = await sharp(source).metadata();
  if (!meta.width || !meta.height) { critical.push(`${label}: unreadable dimensions`); continue; }
  const target = join(outputRoot, asset.webFilename);
  try { await access(target); critical.push(`${label}: output already exists; overwrite prohibited`); continue; } catch {}
  console.log(`${dryRun ? 'DRY-RUN' : 'PROCESS'} ${label} -> ${asset.webFilename} (${meta.width}x${meta.height})`);
  if (!dryRun) {
    await mkdir(outputRoot, { recursive: true });
    await sharp(source).rotate().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88, effort: 5 }).toFile(target);
    const outputInfo = await stat(target);
    if (outputInfo.size > 1_500_000) critical.push(`${label}: normalized source exceeds 1.5 MB`);
  }
}
console.log(`${approved.length} approved asset(s); mode=${dryRun ? 'dry-run' : 'write-new-files-only'}.`);
if (critical.length) { console.error(critical.join('\n')); process.exit(1); }
