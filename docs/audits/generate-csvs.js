import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mocking import of data files since they use ESM and we are in CommonJS or ESM node.
// We can parse the files dynamically or read the JSON audit results we built earlier!
// Let's read C:\Users\User\Desktop\รวมโปรเจค\รับซื้อไอทีขอนแก่น\docs\audits\batch-4-metadata-audit.json!
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const METADATA_JSON_PATH = path.join(__dirname, 'batch-4-metadata-audit.json');

const pageTypeMapping = {
  '/': { type: 'Homepage', intent: 'ต้องการขายสินค้าไอที ขอนแก่น (Broad)', kw: 'รับซื้อสินค้าไอที ขอนแก่น', support: 'รับซื้อของไอที ขอนแก่น, ร้านรับซื้อไอที ขอนแก่น' },
  '/about': { type: 'Trust/Legal Page', intent: 'ต้องการข้อมูลบริษัท/ความน่าเชื่อถือ', kw: 'บริษัท อำพล เทรดดิ้ง จำกัด', support: 'WINNER IT ขอนแก่น' },
  '/buyout-terms': { type: 'Trust/Legal Page', intent: 'ต้องการดูเงื่อนไขการรับซื้อ/ประเมินราคา', kw: 'เงื่อนไขการรับซื้อ WINNER IT', support: 'กติกาการขายของไอที' },
  '/contact': { type: 'Trust/Legal Page', intent: 'ต้องการติดต่อสอบถาม/นัดหมาย', kw: 'ติดต่อ WINNER IT ขอนแก่น', support: 'เบอร์โทร WINNER IT, LINE @buyhub' },
  '/privacy': { type: 'Trust/Legal Page', intent: 'ต้องการดูนโยบายส่วนบุคคล', kw: 'นโยบายความเป็นส่วนตัว WINNER IT', support: '' },
  '/terms': { type: 'Trust/Legal Page', intent: 'ต้องการดูข้อตกลงการใช้งาน', kw: 'ข้อกำหนดการใช้บริการ WINNER IT', support: '' },
  '/service-area': { type: 'Hub Page', intent: 'ต้องการดูพื้นที่และขอบเขตบริการนัดรับ', kw: 'พื้นที่ให้บริการ WINNER IT', support: 'นัดรับขอนแก่น' },
  '/สภาพสินค้าที่ขายได้': { type: 'Hub Page', intent: 'ต้องการดูสภาพสินค้าที่รับซื้อ', kw: 'สภาพสินค้าที่ขายได้ ขอนแก่น', support: 'จอแตก เปิดไม่ติด แบตบวม' },
  '/blog': { type: 'Hub Page', intent: 'ต้องการหาข้อมูลก่อนขาย/รีเสิร์ช', kw: 'บทความรับซื้อไอที ขอนแก่น', support: 'สาระน่ารู้ไอที' },
};

function cleanKw(title) {
  // Extract keyword before brand suffix or city
  if (!title) return '';
  const parts = title.split('|');
  const main = parts[0].trim();
  return main.replace(/ ขอนแก่น/g, '').replace(/ มือสอง/g, '').replace(/ รับซื้อ/g, '').trim();
}

function run() {
  if (!fs.existsSync(METADATA_JSON_PATH)) {
    console.error('Metadata audit file not found. Run metadata-audit.js first.');
    process.exit(1);
  }

  const pages = JSON.parse(fs.readFileSync(METADATA_JSON_PATH, 'utf-8'));
  const intentMapRows = [
    ['URL', 'Page Type', 'Primary Intent', 'Primary Keyword', 'Supporting Keywords', 'Indexable']
  ];

  for (const page of pages) {
    if (page.url === '/404') continue; // Skip 404

    let pageType = 'Blog Article';
    let intent = 'ต้องการข้อมูลประกอบการตัดสินใจขาย';
    let kw = cleanKw(page.title);
    let support = '';

    // Classify by URL path
    if (pageTypeMapping[page.url]) {
      const entry = pageTypeMapping[page.url];
      pageType = entry.type;
      intent = entry.intent;
      kw = entry.kw;
      support = entry.support;
    } else if (page.url.startsWith('/blog/')) {
      pageType = 'Blog Article';
      intent = 'ต้องการข้อมูลก่อนขาย/ราคาตลาด';
      if (page.url.includes('price')) {
        intent = 'ต้องการเช็กราคาตลาด';
      }
      kw = cleanKw(page.title);
      support = 'ข้อมูลเปรียบเทียบก่อนขาย';
    } else {
      // Dynamic pages (Categories, Brands, Models, Conditions, Locals)
      // We can inspect URL path or titles to determine the kind
      const thaiPath = decodeURIComponent(page.url);
      if (page.url === '/notebook' || page.url === '/smartphone' || page.url === '/computer' || 
          page.url === '/gadget' || page.url === '/camera' || page.url === '/macbook' || 
          page.url === '/iphone' || page.url === '/ipad-tablet' || page.url === '/gpu' || 
          page.url === '/monitor' || page.url === '/drone-gopro' || page.url === '/smartwatch' || 
          page.url === '/bulk-buyout' || page.url === '/appliance' || page.url === '/game-console') {
        pageType = 'Category/Money Page';
        intent = 'ต้องการขายสินค้า/เช็กราคา';
        kw = `รับซื้อ${cleanKw(page.h1)}`;
        support = `ราคามือสอง ${cleanKw(page.h1)}, ร้านรับซื้อ ${cleanKw(page.h1)}`;
      } else if (thaiPath.includes('รับซื้อ-')) {
        pageType = 'Brand Page';
        intent = 'ต้องการขายสินค้าตามแบรนด์';
        kw = `รับซื้อ ${cleanKw(page.h1)}`;
        support = `ราคาแบรนด์ ${cleanKw(page.h1)}`;
      } else if (thaiPath.includes('ขายได้ไหม') || thaiPath.includes('ติดบัญชี') || thaiPath.includes('ไม่มีกล่อง')) {
        pageType = 'Condition Page';
        intent = 'ต้องการดูว่ารับซื้อตามสภาพนี้หรือไม่';
        kw = `${cleanKw(page.h1)}`;
        support = `สภาพ ${cleanKw(page.h1)}`;
      } else if (thaiPath.includes('รับซื้อไอที-') || thaiPath.includes('รับซื้อโน้ตบุ๊ค-ipad-')) {
        pageType = 'Local Page';
        intent = 'ต้องการบริการนัดรับในพื้นที่';
        kw = `${cleanKw(page.h1)}`;
        support = `นัดรับ ${cleanKw(page.h1)}`;
      } else {
        // Model Page
        pageType = 'Model Page';
        intent = 'ต้องการขายสินค้าตามรุ่น/ซีรีส์';
        kw = `รับซื้อ ${cleanKw(page.h1)}`;
        support = `ราคา ${cleanKw(page.h1)}`;
      }
    }

    intentMapRows.push([
      `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com${page.url}/`,
      pageType,
      intent,
      kw,
      support,
      page.robots.includes('noindex') ? 'FALSE' : 'TRUE'
    ]);
  }

  // Write intent map CSV
  const csvContent = intentMapRows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
  fs.writeFileSync(path.join(__dirname, 'batch-4-url-intent-map.csv'), csvContent, 'utf-8');
  console.log(`Generated batch-4-url-intent-map.csv with ${intentMapRows.length - 1} pages.`);

  // Generate Cannibalization Matrix CSV
  const cannibalizationRows = [
    ['URL A', 'URL B', 'Intent Similarity', 'Cannibalization Risk', 'Action']
  ];

  const pairs = [
    ['/gadget/', '/game-console/', 'Medium', 'Low', 'KEEP (Differentiated in categories.js)'],
    ['/notebook/', '/รับซื้อ-dell-ขอนแก่น/', 'High', 'Medium', 'DIFFERENTIATE (Focus brand Dell only on brand page)'],
    ['/notebook/', '/รับซื้อ-hp-ขอนแก่น/', 'High', 'Medium', 'DIFFERENTIATE (Focus brand HP only on brand page)'],
    ['/notebook/', '/รับซื้อ-lenovo-ขอนแก่น/', 'High', 'Medium', 'DIFFERENTIATE (Focus brand Lenovo only on brand page)'],
    ['/notebook/', '/รับซื้อ-asus-ขอนแก่น/', 'High', 'Medium', 'DIFFERENTIATE (Focus brand ASUS only on brand page)'],
    ['/notebook/', '/รับซื้อ-acer-ขอนแก่น/', 'High', 'Medium', 'DIFFERENTIATE (Focus brand Acer only on brand page)'],
    ['/notebook/', '/รับซื้อ-msi-ขอนแก่น/', 'High', 'Medium', 'DIFFERENTIATE (Focus brand MSI only on brand page)'],
    ['/macbook/', '/macbook-air/', 'High', 'High', 'DIFFERENTIATE (Differentiate Air features vs general MacBook)'],
    ['/macbook/', '/macbook-pro/', 'High', 'High', 'DIFFERENTIATE (Differentiate Pro features vs general MacBook)'],
    ['/macbook/', '/macbook-m-series/', 'High', 'High', 'DIFFERENTIATE (Focus on Apple Silicon chips on M-Series page)'],
    ['/ipad-tablet/', '/ipad-pro/', 'High', 'High', 'DIFFERENTIATE (Focus on Pro features vs general iPad)'],
    ['/ipad-tablet/', '/ipad-air/', 'High', 'High', 'DIFFERENTIATE (Focus on Air features vs general iPad)'],
    ['/ipad-tablet/', '/ipad-gen/', 'High', 'High', 'DIFFERENTIATE (Focus on base Gen features vs general iPad)'],
    ['/ipad-tablet/', '/ipad-mini/', 'High', 'High', 'DIFFERENTIATE (Focus on Mini size/features vs general iPad)'],
    ['/computer/', '/gaming-pc/', 'High', 'High', 'DIFFERENTIATE (Gaming PC vs Office computer)'],
    ['/computer/', '/office-pc/', 'High', 'High', 'DIFFERENTIATE (Office PC bulk/spec vs General computer)'],
    ['/computer/', '/workstation/', 'High', 'Medium', 'DIFFERENTIATE (Enterprise Workstation spec)'],
    ['/gpu/', '/rtx-30-series/', 'High', 'High', 'DIFFERENTIATE (Focus on specific RTX 30 specs and pricing)'],
    ['/gpu/', '/rtx-40-series/', 'High', 'High', 'DIFFERENTIATE (Focus on specific RTX 40 specs and pricing)'],
    ['/gpu/', '/rtx-50-series/', 'High', 'High', 'DIFFERENTIATE (Focus on specific RTX 50 specs and pricing)'],
    ['/bulk-buyout/', '/computer-bulk/', 'High', 'High', 'MERGE CANDIDATE (Keep both but clean template duplication)'],
    ['/สภาพสินค้าที่ขายได้/', '/จอแตกขายได้ไหม/', 'Low', 'Low', 'KEEP (Hub vs Detail page structure)'],
    ['/รับซื้อไอที-เมืองขอนแก่น/', '/notebook/', 'High', 'High', 'DIFFERENTIATE (Ensure local pages focus on landmark, route, logistics)'],
    ['/blog/macbook-resale-price/', '/macbook/', 'High', 'High', 'REWRITE (Make blog informational guide; keep transaction on Money page)'],
    ['/blog/iphone-resale-price/', '/iphone/', 'High', 'High', 'REWRITE (Make blog informational guide; keep transaction on Money page)'],
    ['/blog/gaming-notebook-resale-price/', '/gaming-notebook/', 'High', 'High', 'REWRITE (Make blog informational guide; keep transaction on Money page)'],
    ['/blog/gpu-resale-price/', '/gpu/', 'High', 'High', 'REWRITE (Make blog informational guide; keep transaction on Money page)'],
  ];

  for (const pair of pairs) {
    cannibalizationRows.push([
      `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com${pair[0]}`,
      `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com${pair[1]}`,
      pair[2],
      pair[3],
      pair[4]
    ]);
  }

  const cannibalizationCsv = cannibalizationRows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
  fs.writeFileSync(path.join(__dirname, 'batch-4-cannibalization-matrix.csv'), cannibalizationCsv, 'utf-8');
  console.log(`Generated batch-4-cannibalization-matrix.csv with ${pairs.length} pairs.`);
}

run();
