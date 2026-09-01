import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDir = path.resolve("private-assets/image-intake/pending");
const outputPath = path.resolve("docs/batch-14b/contact-sheets/ai-assets-contact-sheet.webp");
const manifestPath = path.resolve("docs/batch-14b/approved-ai-assets.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const decisions = new Map(manifest.assets.map((asset) => [asset.sourceFilename, asset]));
const files = (await fs.readdir(inputDir))
  .filter((file) => /\.(?:avif|jpe?g|png|webp)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, "th"));

if (files.length === 0) throw new Error(`No image files found in ${inputDir}`);

const tileWidth = 360;
const imageHeight = 270;
const labelHeight = 78;
const gap = 20;
const columns = 3;
const rows = Math.ceil(files.length / columns);
const sheetWidth = columns * tileWidth + (columns + 1) * gap;
const sheetHeight = rows * (imageHeight + labelHeight) + (rows + 1) * gap;
const composites = [];

for (const [index, filename] of files.entries()) {
  const source = path.join(inputDir, filename);
  const metadata = await sharp(source).metadata();
  const thumbnail = await sharp(source)
    .autoOrient()
    .resize(tileWidth, imageHeight, { fit: "cover", position: "centre" })
    .webp({ quality: 78 })
    .toBuffer();
  const col = index % columns;
  const row = Math.floor(index / columns);
  const left = gap + col * (tileWidth + gap);
  const top = gap + row * (imageHeight + labelHeight);
  const decision = decisions.get(filename);
  const assetId = decision?.assetId ?? `TEMP-${String(index + 1).padStart(2, "0")}`;
  const status = decision?.approvalStatus ?? "DEFERRED_MANUAL_REVIEW";
  const safeFilename = filename.replace(/[&<>"']/g, "");
  const label = Buffer.from(`
    <svg width="${tileWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#111827"/>
      <text x="12" y="25" fill="#fbbf24" font-size="17" font-family="Arial, sans-serif" font-weight="700">${assetId} · ${metadata.width}×${metadata.height}</text>
      <text x="12" y="52" fill="#f9fafb" font-size="13" font-family="Arial, sans-serif">${safeFilename}</text>
      <text x="12" y="70" fill="#9ca3af" font-size="12" font-family="Arial, sans-serif">Status: ${status}</text>
    </svg>`);
  composites.push({ input: thumbnail, left, top });
  composites.push({ input: label, left, top: top + imageHeight });
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await sharp({
  create: {
    width: sheetWidth,
    height: sheetHeight,
    channels: 3,
    background: "#e5e7eb",
  },
})
  .composite(composites)
  .webp({ quality: 82 })
  .toFile(outputPath);

console.log(`Created ${outputPath} with ${files.length} assets.`);
