import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = 'private-assets/image-intake/pending/products';
const output = 'src/assets/images/products';
const assets = [
  ['RP-01','S__25854072_0.jpg','phones/iphone.webp'],
  ['RP-03','S__25854074_0.jpg','cameras/canon-camera.webp'],
  ['RP-05','S__25854076_0.jpg','computers/pink-gaming-pc.webp'],
  ['RP-06','S__25854077_0.jpg','computers/white-gaming-pc.webp'],
  ['RP-07','S__25854078_0.jpg','notebooks/asus-vivobook.webp'],
  ['RP-08','S__25854079_0.jpg','cameras/camera-collection.webp'],
  ['RP-09','S__25854080_0.jpg','tablets/samsung-tablet-box.webp'],
  ['RP-10','S__25854081_0.jpg','tablets/ipad.webp'],
  ['RP-11','S__25854083_0.jpg','cameras/fujifilm-camera.webp'],
  ['RP-12','S__25854084_0.jpg','cameras/sony-camera.webp'],
  ['RP-13','S__25854085_0.jpg','monitors/msi-monitor.webp'],
  ['RP-15','S__25854087_0.jpg','notebooks/macbook.webp'],
  ['RP-16','S__25854088_0.jpg','notebooks/macbook-air.webp'],
  ['RP-18','S__25854090_0.jpg','tablets/samsung-galaxy-tab.webp'],
  ['RP-19','S__25854091_0.jpg','notebooks/asus-tuf.webp'],
  ['RP-21','S__25854094_0.jpg','consoles/handheld-console.webp'],
  ['RP-22','S__25854095_0.jpg','computers/black-gaming-pc-redacted.webp'],
  ['RP-23','S__25854096_0.jpg','cameras/insta360-camera.webp'],
];

for (const [id, input, relative] of assets) {
  const target = path.join(output, relative);
  await mkdir(path.dirname(target), { recursive: true });
  let pipeline = sharp(path.join(source, input)).rotate().toColourspace('srgb').resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true });
  if (id === 'RP-22') pipeline = pipeline.composite([{ input: { create: { width: 105, height: 82, channels: 4, background: '#17191b' } }, left: 662, top: 534 }]);
  await pipeline.webp({ quality: 82, effort: 6 }).toFile(target);
  const meta = await sharp(target).metadata();
  console.log(`${id}\t${relative}\t${meta.width}x${meta.height}`);
}
