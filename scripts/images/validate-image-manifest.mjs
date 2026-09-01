import { readFile } from 'node:fs/promises';
const manifestPath = process.argv[2] || 'docs/batch-14a/approved-assets.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const errors = [];
if (manifest.version !== 1 || !Array.isArray(manifest.assets)) errors.push('Manifest must have version 1 and an assets array.');
const ids = new Set();
for (const asset of manifest.assets || []) {
  if (!/^[A-Z0-9][A-Z0-9-]{2,63}$/.test(asset.assetId || '')) errors.push('Invalid assetId.');
  if (ids.has(asset.assetId)) errors.push(`Duplicate assetId: ${asset.assetId}`); ids.add(asset.assetId);
  if (asset.approvedForWeb) {
    if (asset.ownershipStatus === 'unknown' || asset.usagePermission !== 'approved-web') errors.push(`${asset.assetId}: rights are not approved.`);
    if (!asset.privacyEditsCompleted) errors.push(`${asset.assetId}: privacy edits are incomplete.`);
    if (!['not-required','granted'].includes(asset.consentStatus)) errors.push(`${asset.assetId}: consent is not cleared.`);
    if (!asset.reviewer || !asset.reviewDate) errors.push(`${asset.assetId}: reviewer and reviewDate are required.`);
    if (!asset.altText?.trim() || !asset.slotIds?.length || !asset.approvedPages?.length) errors.push(`${asset.assetId}: alt, slots and pages are required.`);
  }
  if (asset.containsMinor && asset.consentStatus !== 'granted') errors.push(`${asset.assetId}: minor requires granted consent.`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Valid manifest: ${manifest.assets.length} asset(s), ${manifest.assets.filter((a) => a.approvedForWeb).length} approved.`);
