import { access, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dryRun = process.argv.includes("--dry-run");
const verify = process.argv.includes("--verify");
const root = process.cwd();
const manifestPath = path.resolve(root, "docs/batch-14b/approved-ai-assets.json");
const inputRoot = path.resolve(root, "private-assets/image-intake/pending");
const outputRoot = path.resolve(root, "src/assets/images/illustrations/ai");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const approved = manifest.assets.filter((asset) => asset.approvedForWeb);
const errors = [];

for (const asset of approved) {
  if (!asset.sourceType.startsWith("AI_GENERATED_")) {
    errors.push(`${asset.assetId}: sourceType is not an AI classification`);
    continue;
  }
  if (!asset.disclosure || !asset.usagePermission || !asset.privacyReviewPassed) {
    errors.push(`${asset.assetId}: provenance/privacy gate failed`);
    continue;
  }
  const source = path.resolve(inputRoot, path.basename(asset.sourceFilename));
  if (!source.startsWith(inputRoot)) {
    errors.push(`${asset.assetId}: invalid source path`);
    continue;
  }
  try {
    await access(source);
  } catch {
    errors.push(`${asset.assetId}: source file is missing`);
    continue;
  }
  const outputDir = path.join(outputRoot, asset.outputGroup);
  const target = path.join(outputDir, asset.webFilename);
  let targetExists = false;
  try { await access(target); targetExists = true; } catch {}
  if (verify) {
    if (!targetExists) { errors.push(`${asset.assetId}: processed output is missing`); continue; }
    const [outputMetadata, outputStat] = await Promise.all([sharp(target).metadata(), stat(target)]);
    if (outputMetadata.exif || outputMetadata.xmp || outputMetadata.icc) errors.push(`${asset.assetId}: metadata was not stripped`);
    if (outputMetadata.space !== "srgb") errors.push(`${asset.assetId}: output is not normalized to sRGB`);
    if (outputStat.size > asset.maximumBytes) errors.push(`${asset.assetId}: ${outputStat.size} bytes exceeds ${asset.maximumBytes}`);
    if (Math.max(outputMetadata.width ?? 0, outputMetadata.height ?? 0) > asset.maxLongEdge) errors.push(`${asset.assetId}: output dimensions exceed cap`);
    console.log(`VERIFY ${asset.assetId} ${outputMetadata.width}x${outputMetadata.height} ${outputStat.size} bytes`);
    continue;
  }
  if (targetExists) {
    errors.push(`${asset.assetId}: refusing to overwrite ${target}`);
    continue;
  }

  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) {
    errors.push(`${asset.assetId}: source dimensions are unreadable`);
    continue;
  }
  console.log(`${dryRun ? "DRY-RUN" : "PROCESS"} ${asset.assetId} -> ${path.relative(root, target)}`);
  if (dryRun) continue;

  await mkdir(outputDir, { recursive: true });
  await sharp(source)
    .autoOrient()
    .resize({ width: asset.maxLongEdge, height: asset.maxLongEdge, fit: "inside", withoutEnlargement: true })
    .toColorspace("srgb")
    .webp({ quality: asset.quality, effort: 6 })
    .toFile(target);
  const [outputMetadata, outputStat] = await Promise.all([sharp(target).metadata(), stat(target)]);
  if (outputMetadata.exif || outputMetadata.xmp) errors.push(`${asset.assetId}: metadata was not stripped`);
  if (outputStat.size > asset.maximumBytes) errors.push(`${asset.assetId}: ${outputStat.size} bytes exceeds ${asset.maximumBytes}`);
  if (Math.max(outputMetadata.width ?? 0, outputMetadata.height ?? 0) > asset.maxLongEdge) errors.push(`${asset.assetId}: output dimensions exceed cap`);
}

console.log(`${approved.length} approved AI asset(s); mode=${verify ? "verify" : dryRun ? "dry-run" : "write-new-files-only"}.`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
