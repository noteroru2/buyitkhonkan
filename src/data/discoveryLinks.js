import { CATEGORIES } from './categories.js';
import { BRAND_PAGES } from './brandPages.js';
import { MODEL_PAGES } from './modelPages.js';
import { CONDITION_PAGES } from './conditionPages.js';
import { LOCAL_PAGES } from './localPages.js';
import { CATEGORY_CHILDREN, LOCAL_RELATED } from './indexRecoveryLinks.js';
import { MODEL_ARCHITECTURE } from './architecture/models.js';
import { CONDITION_ARCHITECTURE } from './architecture/conditions.js';
import { B2B_ARCHITECTURE } from './architecture/b2b.js';
import { DISTRICT_ARCHITECTURE } from './architecture/districts.js';
import { HUB_ARCHITECTURE } from './architecture/hubs.js';
import { GUIDE_ARCHITECTURE } from './architecture/guides.js';
import { HIGH_INTENT_MODEL_CONTENT } from './highIntentModelContent.js';
import { HIGH_INTENT_CONDITION_CONTENT } from './highIntentConditionContent.js';
import { HIGH_INTENT_B2B_CONTENT } from './highIntentB2BContent.js';
import { HIGH_INTENT_DISTRICT_CONTENT } from './highIntentDistrictContent.js';
import { HIGH_INTENT_GUIDE_CONTENT } from './highIntentGuideContent.js';


const RELEASED_ARCHITECTURE_MODELS = MODEL_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX');
const RELEASED_ARCHITECTURE_CONDITIONS = CONDITION_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX');
const RELEASED_ARCHITECTURE_B2B = B2B_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX');
const RELEASED_ARCHITECTURE_DISTRICTS = DISTRICT_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX');
const RELEASED_ARCHITECTURE_GUIDES = GUIDE_ARCHITECTURE.filter((item) => item.lifecycle === 'INDEX');
const RELEASED_B2B_HUB = HUB_ARCHITECTURE.find((item) => item.id === 'hub-b2b' && item.lifecycle === 'INDEX');
const RELEASED_PRICE_HUB = HUB_ARCHITECTURE.find((item) => item.id === 'hub-price' && item.lifecycle === 'INDEX');
const RELEASED_PRODUCT_HUB = HUB_ARCHITECTURE.find((item) => item.id === 'hub-products' && item.lifecycle === 'INDEX');
const RELEASED_BRAND_MODEL_HUB = HUB_ARCHITECTURE.find((item) => item.id === 'hub-brands-models' && item.lifecycle === 'INDEX');
const releasedArchitectureModelCard = (item) => item && ({
  href: item.path,
  title: item.h1,
  desc: item.description,
  badge: 'รุ่นที่เปิด Index',
  icon: '▣',
  type: 'released-model',
});

const releasedArchitectureConditionCard = (item) => item && ({
  href: item.path,
  title: item.h1,
  desc: item.description,
  badge: 'อาการเฉพาะสินค้า',
  icon: '◇',
  type: 'released-condition',
});

const releasedArchitectureB2BCard = (item) => item && ({
  href: item.path,
  title: item.h1,
  desc: item.description,
  badge: item.id === 'hub-b2b' ? 'B2B Hub' : 'งานบริษัท / ยกล็อต',
  icon: '▤',
  type: item.id === 'hub-b2b' ? 'b2b-hub' : 'released-b2b',
});

const releasedArchitectureDistrictCard = (item) => item && ({
  href: item.path,
  title: item.h1,
  desc: item.description,
  badge: 'อำเภอที่เปิดข้อมูลแล้ว',
  icon: '⌖',
  type: 'released-district',
});

const releasedArchitectureGuideCard = (item) => item && ({
  href: item.path,
  title: item.h1,
  desc: item.description,
  badge: HIGH_INTENT_GUIDE_CONTENT[item.slug]?.priceIntent ? 'ปัจจัยราคา' : 'คู่มือเช็กก่อนขาย',
  icon: '↗',
  type: 'released-guide',
});

const releasedPriceHubCard = (item) => item && ({
  href: item.path,
  title: item.h1,
  desc: item.description,
  badge: 'Price Hub',
  icon: '฿',
  type: 'price-hub',
});

const LOCAL_TO_RELEASED_DISTRICT = Object.freeze({
  'mueang-khon-kaen': ['ban-fang','phra-yuen','ban-haet'],
  'kku-kangsadan': ['ban-fang','nong-ruea'],
  'ban-ped': ['ban-fang','nong-ruea'],
  'sila': ['ban-fang','nong-ruea'],
  'nam-phong': ['ubolratana','khao-suan-kwang','kranuan'],
  'ban-phai': ['ban-haet','chonnabot','mancha-khiri'],
  'chum-phae': ['nong-ruea','phu-wiang'],
  'phon': ['chonnabot','mancha-khiri'],
});

function releasedModelsForCategory(categorySlug, limit = 6) {
  return RELEASED_ARCHITECTURE_MODELS
    .filter((item) => HIGH_INTENT_MODEL_CONTENT[item.slug]?.categorySlug === categorySlug)
    .map(releasedArchitectureModelCard)
    .slice(0, limit);
}

function releasedModelsForBrand(brandSlug, limit = 6) {
  return RELEASED_ARCHITECTURE_MODELS
    .filter((item) => HIGH_INTENT_MODEL_CONTENT[item.slug]?.brandSlug === brandSlug)
    .map(releasedArchitectureModelCard)
    .slice(0, limit);
}

function releasedConditionsForCategory(categorySlug, limit = 6, excludeSlug) {
  return RELEASED_ARCHITECTURE_CONDITIONS
    .filter((item) => item.slug !== excludeSlug && HIGH_INTENT_CONDITION_CONTENT[item.slug]?.categorySlug === categorySlug)
    .map(releasedArchitectureConditionCard)
    .slice(0, limit);
}

function releasedConditionPeers(slugs = [], currentSlug, limit = 6) {
  const wanted = new Set(slugs);
  return RELEASED_ARCHITECTURE_CONDITIONS
    .filter((item) => item.slug !== currentSlug && wanted.has(item.slug))
    .map(releasedArchitectureConditionCard)
    .slice(0, limit);
}

function releasedB2BPages(limit = 12, slugs = null) {
  const wanted = slugs ? new Set(slugs) : null;
  return RELEASED_ARCHITECTURE_B2B
    .filter((item) => !wanted || wanted.has(item.slug))
    .map(releasedArchitectureB2BCard)
    .slice(0, limit);
}

function releasedB2BForCategories(categorySlugs = [], limit = 6, excludeSlug) {
  return RELEASED_ARCHITECTURE_B2B
    .filter((item) => item.slug !== excludeSlug && HIGH_INTENT_B2B_CONTENT[item.slug]?.categorySlugs?.some((slug) => categorySlugs.includes(slug)))
    .map(releasedArchitectureB2BCard)
    .slice(0, limit);
}

function releasedDistrictsForCategories(categorySlugs = [], limit = 6, excludeSlug) {
  return RELEASED_ARCHITECTURE_DISTRICTS
    .filter((item) => item.slug !== excludeSlug && HIGH_INTENT_DISTRICT_CONTENT[item.slug]?.categorySlugs?.some((slug) => categorySlugs.includes(slug)))
    .map(releasedArchitectureDistrictCard)
    .slice(0, limit);
}

function releasedDistrictPeers(slugs = [], currentSlug, limit = 6) {
  const wanted = new Set(slugs);
  return RELEASED_ARCHITECTURE_DISTRICTS
    .filter((item) => item.slug !== currentSlug && wanted.has(item.slug))
    .map(releasedArchitectureDistrictCard)
    .slice(0, limit);
}

function releasedDistrictsForLocal(localSlug, limit = 4) {
  return releasedDistrictPeers(LOCAL_TO_RELEASED_DISTRICT[localSlug] || [], null, limit);
}


function releasedGuidesForCategories(categorySlugs = [], limit = 6, excludeSlug) {
  return RELEASED_ARCHITECTURE_GUIDES
    .filter((item) => item.slug !== excludeSlug && HIGH_INTENT_GUIDE_CONTENT[item.slug]?.categorySlugs?.some((slug) => categorySlugs.includes(slug)))
    .map(releasedArchitectureGuideCard)
    .slice(0, limit);
}

function releasedPriceGuides(limit = 8, excludeSlug) {
  return RELEASED_ARCHITECTURE_GUIDES
    .filter((item) => item.slug !== excludeSlug && HIGH_INTENT_GUIDE_CONTENT[item.slug]?.priceIntent)
    .map(releasedArchitectureGuideCard)
    .slice(0, limit);
}

const ARTICLE_DIRECTORY = {
  nearby: { href: '/บทความ/รับซื้อสินค้าไอทีใกล้ฉัน-ขอนแก่น/', title: 'เลือกร้านรับซื้อสินค้าไอทีใกล้ฉันในขอนแก่น', desc: 'เช็กพื้นที่บริการ ความปลอดภัย และข้อมูลที่ควรดูก่อนนัด' },
  pickup: { href: '/บทความ/รับซื้อไอทีถึงที่-ขอนแก่น/', title: 'นัดรับสินค้าไอทีถึงที่ในขอนแก่นอย่างไร', desc: 'เตรียมข้อมูลและพิกัดให้ประเมินและจัดรอบนัดได้เร็วขึ้น' },
  iphoneLocal: { href: '/บทความ/รับซื้อ-iphone-ขอนแก่น-ราคา/', title: 'รับซื้อ iPhone ขอนแก่น ราคาเท่าไหร่', desc: 'ดูข้อมูลที่มีผลต่อราคาและสิ่งที่ควรส่งก่อนประเมิน' },
  cracked: { href: '/บทความ/จอแตกขายได้ไหม-ขอนแก่น/', title: 'จอแตกยังขายได้ไหมในขอนแก่น', desc: 'ดูผลกระทบต่อราคาและวิธีถ่ายตำหนิให้ประเมินง่าย' },
  macbookPrice: { href: '/บทความ/ราคารับซื้อ-macbook-มือสอง/', title: 'ราคารับซื้อ MacBook มือสอง', desc: 'ปัจจัยราคา MacBook Air / Pro และชิปแต่ละกลุ่ม' },
  iphonePrice: { href: '/บทความ/ราคารับซื้อ-iphone-มือสอง/', title: 'ราคารับซื้อ iPhone มือสอง', desc: 'ดูปัจจัยราคาของแต่ละรุ่น ความจุ และสภาพเครื่อง' },
  gpuPrice: { href: '/บทความ/ราคารับซื้อ-การ์ดจอ/', title: 'ราคารับซื้อการ์ดจอมือสอง', desc: 'ดูปัจจัยราคาของ RTX และการ์ดจอกลุ่มยอดนิยม' },
  consolePrice: { href: '/บทความ/ราคารับซื้อ-ps5-nintendo-switch/', title: 'ราคารับซื้อ PS5 และ Nintendo Switch', desc: 'เปรียบเทียบรุ่นและอุปกรณ์ที่มีผลต่อราคาประเมิน' },
  gamingNotebook: { href: '/บทความ/ราคารับซื้อ-โน้ตบุ๊กเกมมิ่ง/', title: 'ราคารับซื้อโน้ตบุ๊กเกมมิ่ง', desc: 'ดูผลของ GPU, CPU, RAM, SSD และสภาพต่อราคามือสอง' },
  eraseIphone: { href: '/บทความ/วิธีลบข้อมูล-iphone-ก่อนขาย/', title: 'วิธีลบข้อมูล iPhone ก่อนขาย', desc: 'ออกจาก iCloud ปิด Find My และรีเซ็ตเครื่องก่อนส่งมอบ' },
  notebookChecklist: { href: '/บทความ/เช็คลิสต์ก่อนขายโน้ตบุ๊ก/', title: 'เช็กลิสต์ก่อนขายโน้ตบุ๊ก', desc: 'เตรียมข้อมูลเครื่องและสภาพให้ทีมประเมินได้แม่นขึ้น' },
  pcParts: { href: '/บทความ/ขายคอมทั้งเครื่อง-vs-แยกชิ้นส่วน/', title: 'ขายคอมทั้งเครื่องหรือแยกชิ้นส่วน', desc: 'เทียบความสะดวก เวลา และมูลค่าที่อาจได้จากแต่ละวิธี' },
  documents: { href: '/บทความ/เอกสารขายของไอที/', title: 'เอกสารที่ควรเตรียมก่อนขายของไอที', desc: 'ดูกรณีบุคคล บริษัท และงานรับซื้อหลายเครื่อง' },
  broken: { href: '/บทความ/ของพังขายได้ไหม/', title: 'ของพัง จอแตก เปิดไม่ติด ยังขายได้ไหม', desc: 'ดูประเภทความเสียหายที่ยังส่งประเมินได้และสิ่งที่ต้องแจ้ง' },
  sellVsFacebook: { href: '/บทความ/ขายร้าน-vs-ขายเอง-facebook/', title: 'ขายร้านรับซื้อหรือขายเองใน Facebook', desc: 'เทียบราคา เวลา ความเสี่ยง และขั้นตอนของแต่ละช่องทาง' },
  tradeIn: { href: '/บทความ/เทิร์นเครื่องศูนย์-vs-ขายร้านรับซื้อ/', title: 'เทิร์นเครื่องศูนย์หรือขายร้านรับซื้อ', desc: 'เปรียบเทียบข้อดีข้อจำกัดก่อนเลือกช่องทางขาย' },
  scams: { href: '/บทความ/กลโกงขายของไอทีออนไลน์/', title: 'กลโกงที่ควรระวังเวลาขายของไอทีออนไลน์', desc: 'เช็กความเสี่ยงก่อนนัด ส่งของ หรือให้ข้อมูลส่วนตัว' },
  whereToSell: { href: '/บทความ/ขายของไอทีที่ไหนดี-ขอนแก่น/', title: 'ขายของไอทีที่ไหนดีในขอนแก่น', desc: 'เปรียบเทียบช่องทางขายที่เหมาะกับเวลา ราคา และความสะดวก' },
  pcUpgrade: { href: '/บทความ/อัปเกรดคอมใหม่-ขายของเก่า/', title: 'อัปเกรดคอมใหม่และขายของเก่า', desc: 'ดูชิ้นส่วนที่ควรแยกประเมินก่อนซื้อเครื่องหรืออุปกรณ์ใหม่' },
  officeMove: { href: '/บทความ/เคลียร์อุปกรณ์ไอที-ย้ายออฟฟิศ/', title: 'เคลียร์อุปกรณ์ไอทีเมื่อย้ายออฟฟิศ', desc: 'จัดรายการทรัพย์สินและเตรียมงานรับซื้อยกล็อตให้ตรวจสอบง่าย' },
  studentKku: { href: '/บทความ/นักศึกษา-มข-ขายโน้ตบุ๊ก-ipad/', title: 'นักศึกษา มข. ขายโน้ตบุ๊กและ iPad ก่อนย้ายออก', desc: 'แนวทางเตรียมเครื่องและนัดรับในโซนมหาวิทยาลัยขอนแก่น' },
  iphoneTiming: { href: '/บทความ/ขาย-iphone-ตอนไหนดี/', title: 'ควรขาย iPhone เครื่องเก่าตอนไหน', desc: 'เข้าใจรอบราคามือสองก่อนรุ่นใหม่ออกและก่อนตัดสินใจขาย' },
};

const CATEGORY_GUIDES = {
  notebook: ['notebookChecklist', 'gamingNotebook', 'broken'],
  smartphone: ['scams', 'sellVsFacebook', 'documents'],
  computer: ['pcParts', 'pcUpgrade', 'officeMove'],
  gadget: ['scams', 'whereToSell'],
  'game-console': ['consolePrice', 'scams'],
  camera: ['scams', 'whereToSell'],
  macbook: ['macbookPrice', 'tradeIn', 'documents'],
  iphone: ['iphoneLocal', 'iphonePrice', 'eraseIphone', 'iphoneTiming'],
  'ipad-tablet': ['studentKku', 'documents', 'tradeIn'],
  gpu: ['gpuPrice', 'pcUpgrade', 'pcParts'],
  monitor: ['broken', 'pcParts'],
  'drone-gopro': ['scams', 'whereToSell'],
  smartwatch: ['scams', 'tradeIn'],
  'bulk-buyout': ['officeMove', 'documents', 'pickup'],
  appliance: ['officeMove', 'documents'],
};

const uniqByHref = (items = []) => {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.href || seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
};

const categoryCard = (item) => item && ({
  href: `/${item.path || item.slug}/`,
  title: `${item.kw} ขอนแก่น`,
  desc: item.short || `ดูรายละเอียดการประเมิน${item.name}ในจังหวัดขอนแก่น`,
  badge: 'หมวดสินค้า',
  icon: item.icon || '▦',
  type: 'category',
});

const brandCard = (item) => item && ({
  href: `/${item.path}/`,
  title: item.h1,
  desc: item.demand || item.intro,
  badge: 'แบรนด์',
  icon: '🏷',
  type: 'brand',
});

const modelCard = (item) => item && ({
  href: `/${item.path}/`,
  title: item.h1,
  desc: item.intent,
  badge: item.group || 'รุ่น / ซีรีส์',
  icon: '▣',
  type: 'model',
});

const conditionCard = (item) => item && ({
  href: `/${item.path}/`,
  title: item.h1 || `${item.condition} ขายได้ไหม`,
  desc: item.priceImpact,
  badge: 'สภาพสินค้า',
  icon: '◇',
  type: 'condition',
});

const localCard = (item) => item && ({
  href: `/${item.path}/`,
  title: item.h1 || `รับซื้อสินค้าไอที ${item.area}`,
  desc: item.note,
  badge: 'พื้นที่นัดรับ',
  icon: '⌖',
  type: 'local',
});

const guideCard = (key) => ARTICLE_DIRECTORY[key] && ({
  ...ARTICLE_DIRECTORY[key],
  badge: 'คู่มือก่อนขาย',
  icon: '↗',
  type: 'guide',
});

function resolveSlug(slug) {
  return brandCard(BRAND_PAGES.find((item) => item.slug === slug))
    || modelCard(MODEL_PAGES.find((item) => item.slug === slug))
    || conditionCard(CONDITION_PAGES.find((item) => item.slug === slug))
    || categoryCard(CATEGORIES.find((item) => item.slug === slug));
}

function guidesForCategories(slugs = [], limit = 4) {
  const keys = [];
  for (const slug of slugs) keys.push(...(CATEGORY_GUIDES[slug] || []));
  const released = releasedGuidesForCategories(slugs, limit);
  const legacy = keys.map(guideCard).filter(Boolean);
  return uniqByHref([...released, ...legacy]).slice(0, limit);
}

function areasForCategories(slugs = [], currentLocalSlug, limit = 4) {
  const existing = LOCAL_PAGES
    .filter((item) => item.slug !== currentLocalSlug && item.primary?.some((slug) => slugs.includes(slug)))
    .map(localCard);
  const released = releasedDistrictsForCategories(slugs, limit, currentLocalSlug);
  const releasedSlots = released.length ? Math.max(1, Math.floor(limit / 2)) : 0;
  const existingSlots = Math.max(0, limit - releasedSlots);
  return uniqByHref([
    ...existing.slice(0, existingSlots),
    ...released.slice(0, releasedSlots),
    ...existing.slice(existingSlots),
    ...released.slice(releasedSlots),
  ]).slice(0, limit);
}

function conditionsForCategories(slugs = [], currentConditionSlug, limit = 6) {
  const released = slugs.flatMap((slug) => releasedConditionsForCategory(slug, limit, currentConditionSlug));
  const general = CONDITION_PAGES
    .filter((item) => item.slug !== currentConditionSlug && item.applies?.some((slug) => slugs.includes(slug)))
    .map(conditionCard);
  return uniqByHref([...released, ...general]).slice(0, limit);
}

function categoriesForSlugs(slugs = [], limit = 6) {
  return slugs.map((slug) => categoryCard(CATEGORIES.find((item) => item.slug === slug))).filter(Boolean).slice(0, limit);
}

function group(key, eyebrow, title, description, items, viewAll) {
  const clean = uniqByHref(items).filter(Boolean);
  if (!clean.length) return null;
  return { key, eyebrow, title, description, items: clean, viewAll };
}

export function getCategoryDiscovery(cat) {
  if (!cat) return [];
  const childCards = uniqByHref([
    ...releasedModelsForCategory(cat.slug, 16),
    ...(CATEGORY_CHILDREN[cat.slug] || []).map(resolveSlug).filter(Boolean),
  ]).slice(0, 18);
  const conditionCards = conditionsForCategories([cat.slug], null, 6);
  const areaCards = areasForCategories([cat.slug], null, 4);
  const guideCards = guidesForCategories([cat.slug], 4);
  const neighbourCards = (cat.cluster || []).map((slug) => categoryCard(CATEGORIES.find((item) => item.slug === slug))).filter(Boolean).slice(0, 4);
  const b2bCards = cat.slug === 'bulk-buyout'
    ? uniqByHref([releasedArchitectureB2BCard(RELEASED_B2B_HUB), ...releasedB2BPages(12)]).filter(Boolean)
    : releasedB2BForCategories([cat.slug], 4);

  return [
    group('children', 'เลือกให้ตรงรุ่น', `เจาะต่อจาก ${cat.name}`, 'ไปยังแบรนด์ รุ่น หรือซีรีส์ที่มีข้อมูลเฉพาะมากกว่า เพื่อดูสิ่งที่มีผลต่อราคาของสินค้านั้นโดยตรง', childCards, { href: '/ยี่ห้อและรุ่นที่รับซื้อ/', label: 'ดูยี่ห้อและรุ่นทั้งหมด' }),
    group('b2b', 'งานบริษัทและยกล็อต', cat.slug === 'bulk-buyout' ? 'เลือก Workflow ตามชนิดล็อต' : `ขาย ${cat.name} ในนามบริษัทหรือเป็นล็อต`, 'หน้ากลุ่ม B2B แยกตามประเภททรัพย์สิน สถานการณ์องค์กร เอกสาร และขั้นตอนส่งมอบ เพื่อไม่ใช้คำแนะนำแบบเดียวกับการขายเครื่องเดียว', b2bCards, { href: '/รับซื้อยกล็อต-บริษัท/', label: 'ดู B2B Hub' }),
    group('condition', 'ตามสภาพจริง', 'มีตำหนิหรืออุปกรณ์ไม่ครบ?', 'เลือกตามอาการหรือสภาพเพื่อดูว่าควรถ่ายอะไรส่งประเมิน และอะไรเป็นปัจจัยหักราคา', conditionCards, { href: '/สภาพสินค้าที่ขายได้/', label: 'ดูทุกสภาพสินค้า' }),
    group('areas', 'นัดรับในขอนแก่น', 'ดูพื้นที่ที่เกี่ยวข้อง', 'เช็กวิธีนัดรับและข้อมูลเฉพาะพื้นที่ก่อนส่งพิกัดคร่าว ๆ ให้ทีมงาน', areaCards, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ให้บริการ' }),
    group('guides', 'ก่อนตัดสินใจขาย', 'คู่มือที่ช่วยเช็กข้อมูลก่อนส่งราคา', 'อ่านต่อเฉพาะเรื่องที่ช่วยเตรียมเครื่อง เทียบราคา หรือหลีกเลี่ยงความเสี่ยงก่อนขาย', guideCards, { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
    group('neighbours', 'หมวดใกล้เคียง', 'มีของประเภทอื่นขายพร้อมกัน?', 'ส่งหลายหมวดประเมินในแชทเดียวได้ ลิงก์เหล่านี้พาไปยังหมวดที่มักขายพร้อมกัน', neighbourCards),
  ].filter(Boolean);
}

export function getDetailDiscovery({ brand, model, condition, localPage }) {
  const categorySlugs = model?.primaryCategory
    ? [model.primaryCategory]
    : brand?.categories
      ? brand.categories
      : condition?.applies
        ? condition.applies
        : localPage?.primary || [];

  const categoryCards = categoriesForSlugs(categorySlugs, 6);
  const guideCards = guidesForCategories(categorySlugs, 4);

  if (localPage) {
    const nearby = uniqByHref([
      ...(LOCAL_RELATED[localPage.slug] || [])
        .map((slug) => localCard(LOCAL_PAGES.find((item) => item.slug === slug)))
        .filter(Boolean),
      ...releasedDistrictsForLocal(localPage.slug, 4),
    ]).slice(0, 6);
    return [
      group('products', 'เลือกตามสินค้า', `สินค้าที่รับประเมินใน${localPage.area}`, 'ไปยังหน้าสินค้าเพื่อดูรุ่น สภาพ และปัจจัยราคาโดยละเอียด', categoryCards, { href: '/สินค้าที่รับซื้อ/', label: 'ดูสินค้าทั้งหมด' }),
      group('nearby', 'พื้นที่ใกล้เคียง', 'ดูพื้นที่นัดรับต่อ', 'เหมาะเมื่ออยู่ระหว่างโซนหรือยังไม่แน่ใจว่าพิกัดอยู่ในรอบใด', nearby, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ทั้งหมด' }),
      group('guides', 'เตรียมก่อนนัด', 'คู่มือที่เกี่ยวข้อง', 'อ่านขั้นตอนและข้อมูลที่ช่วยให้ส่งประเมินและจัดรอบนัดได้เร็วขึ้น', uniqByHref([guideCard('pickup'), guideCard('nearby'), ...guideCards]).slice(0, 4), { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
    ].filter(Boolean);
  }

  const explicitRelated = model?.related || brand?.relatedModels || [];
  const modelBrandCards = uniqByHref([
    ...(brand ? releasedModelsForBrand(brand.slug, 10) : []),
    ...(model?.primaryCategory ? releasedModelsForCategory(model.primaryCategory, 5) : []),
    ...explicitRelated.map(resolveSlug).filter(Boolean),
  ]).slice(0, 12);
  const conditionCards = uniqByHref([
    ...categorySlugs.flatMap((slug) => releasedConditionsForCategory(slug, 3)),
    ...conditionsForCategories(categorySlugs, condition?.slug, 4),
  ]).filter((item) => item.href !== (condition ? `/${condition.path}/` : null)).slice(0, 6);
  const areaCards = areasForCategories(categorySlugs, null, 4);

  return [
    group('parent', 'กลับไปดูภาพรวม', 'หมวดสินค้าที่เกี่ยวข้อง', 'ใช้หน้าหมวดเป็นจุดรวมเพื่อเปรียบเทียบรุ่น ยี่ห้อ สภาพ และข้อมูลราคาในกลุ่มเดียวกัน', categoryCards),
    group('related', 'เปรียบเทียบต่อ', brand ? `รุ่นที่เกี่ยวข้องกับ ${brand.brand}` : model ? 'รุ่นและหน้าที่ควรดูต่อ' : 'หน้าสินค้าที่เกี่ยวข้อง', 'เลือกจากความเกี่ยวข้องของสินค้า เพื่อให้เปรียบเทียบต่อได้โดยไม่ต้องย้อนกลับไปค้นหาใหม่', modelBrandCards, (brand || model) ? { href: '/ยี่ห้อและรุ่นที่รับซื้อ/', label: 'ดูยี่ห้อและรุ่นทั้งหมด' } : undefined),
    group('condition', 'ตามสภาพเครื่อง', 'สภาพที่มีผลต่อการประเมิน', 'ถ้ามีตำหนิ เลือกสภาพที่ตรงที่สุดเพื่อดูข้อมูลที่ควรแจ้งก่อนประเมิน', conditionCards, { href: '/สภาพสินค้าที่ขายได้/', label: 'ดูทุกสภาพสินค้า' }),
    group('areas', 'เช็กพื้นที่นัดรับ', 'พื้นที่ที่รับสินค้ากลุ่มนี้บ่อย', 'ดูรายละเอียดการนัดรับและพื้นที่หลักก่อนส่งพิกัดให้ทีมงาน', areaCards, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ทั้งหมด' }),
    group('guides', 'อ่านก่อนขาย', 'คู่มือและข้อมูลราคา', 'ใช้คู่มือเพื่อเตรียมข้อมูล ลบข้อมูลส่วนตัว หรือเทียบทางเลือกก่อนตัดสินใจ', guideCards, { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
  ].filter(Boolean);
}

const ARTICLE_CATEGORY_MAP = [
  [/iphone|ไอโฟน|iphone/i, ['iphone']],
  [/macbook/i, ['macbook']],
  [/การ์ดจอ|rtx/i, ['gpu']],
  [/โน้ตบุ๊ก|โน๊ตบุ๊ค|นักศึกษา/i, ['notebook', 'ipad-tablet']],
  [/ipad/i, ['ipad-tablet']],
  [/ps5|nintendo|switch|เครื่องเกม/i, ['game-console']],
  [/คอม|ออฟฟิศ|สำนักงาน/i, ['computer', 'bulk-buyout']],
  [/จอแตก/i, ['iphone', 'notebook', 'monitor']],
  [/ของพัง|เปิดไม่ติด|แบตบวม/i, ['notebook', 'iphone', 'computer']],
  [/ไอที|ขายร้าน|facebook|กลโกง|เอกสาร/i, ['notebook', 'iphone', 'computer']],
];

export function getArticleDiscovery(pathname = '', title = '') {
  const haystack = `${pathname} ${title}`;
  const slugs = [];
  for (const [pattern, categories] of ARTICLE_CATEGORY_MAP) {
    if (pattern.test(haystack)) slugs.push(...categories);
  }
  const categorySlugs = [...new Set(slugs)].slice(0, 4);
  const moneyPages = categoriesForSlugs(categorySlugs, 4);
  const areas = areasForCategories(categorySlugs, null, 3);
  const conditions = conditionsForCategories(categorySlugs, null, 3);
  const guides = releasedGuidesForCategories(categorySlugs, 4);
  return [
    group('money', 'จากคู่มือไปหน้าประเมิน', 'ดูบริการรับซื้อที่เกี่ยวข้อง', 'อ่านข้อมูลครบแล้วสามารถไปยังหน้าสินค้าเพื่อดูรุ่น สภาพ และขั้นตอนส่งประเมินต่อ', moneyPages, { href: '/สินค้าที่รับซื้อ/', label: 'ดูสินค้าทั้งหมด' }),
    group('guide', 'อ่านต่อให้ตรงเรื่อง', 'คู่มือเฉพาะสินค้าที่เปิดข้อมูลแล้ว', 'เลือกอ่านวิธีเช็กรุ่น แบต อุปกรณ์ หรือปัจจัยราคาที่เกี่ยวข้องโดยไม่ย้อนกลับไปค้นหาใหม่', guides, { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
    group('condition', 'เช็กสภาพ', 'ถ้ามีตำหนิ ดูต่อที่นี่', 'เลือกสภาพที่ใกล้เคียงกับเครื่องจริง เพื่อดูข้อมูลที่ควรถ่ายและแจ้งก่อนส่งราคา', conditions, { href: '/สภาพสินค้าที่ขายได้/', label: 'ดูทุกสภาพสินค้า' }),
    group('areas', 'อยู่ขอนแก่น', 'เช็กพื้นที่นัดรับ', 'ดูพื้นที่หลักและวิธีส่งพิกัดคร่าว ๆ ก่อนจัดรอบนัดรับ', areas, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ทั้งหมด' }),
  ].filter(Boolean);
}


export function getReleasedConditionDiscovery(page, content) {
  if (!page || !content) return [];
  const categoryCards = categoriesForSlugs([content.categorySlug], 2);
  const modelCards = releasedModelsForCategory(content.categorySlug, 6);
  const relatedSpecific = releasedConditionPeers(content.relatedConditionSlugs || [], page.slug, 6);
  const generalCards = content.generalConditionSlug
    ? [conditionCard(CONDITION_PAGES.find((item) => item.slug === content.generalConditionSlug))].filter(Boolean)
    : [];
  const siblingCards = releasedConditionsForCategory(content.categorySlug, 5, page.slug);
  const guideCards = guidesForCategories([content.categorySlug], 4);
  const areaCards = areasForCategories([content.categorySlug], null, 3);

  return [
    group('parent', 'กลับไปดูสินค้าหลัก', 'ดูหน้าประเมินของสินค้าประเภทนี้', 'หน้าหลักช่วยดูรุ่น สภาพทั่วไป และขั้นตอนขายโดยรวมก่อนตัดสินใจ', categoryCards),
    group('models', 'รู้รุ่นแล้วดูต่อ', 'รุ่นที่เปิดข้อมูลเฉพาะแล้ว', 'ถ้าสินค้าตรงกับรุ่นเหล่านี้ ให้ไปดูจุดตรวจเฉพาะรุ่นควบคู่กับอาการที่พบ', modelCards),
    group('conditions', 'อาการใกล้เคียง', 'ดูปัญหาที่อาจเกิดร่วมกัน', 'อาการหนึ่งอาจมีตำหนิอื่นร่วมด้วย เลือกเฉพาะหน้าที่ตรงกับสภาพจริงเพื่อเตรียมข้อมูลให้ครบ', uniqByHref([...relatedSpecific, ...siblingCards, ...generalCards]).slice(0, 7), { href: '/สภาพสินค้าที่ขายได้/', label: 'ดูทุกสภาพสินค้า' }),
    group('guides', 'ก่อนซ่อมหรือก่อนขาย', 'คู่มือที่เกี่ยวข้อง', 'อ่านภาพรวมของพัง การเตรียมข้อมูล และความเสี่ยงก่อนตัดสินใจซ่อมหรือขายตามสภาพ', guideCards, { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
    group('areas', 'นัดรับในขอนแก่น', 'เช็กพื้นที่นัดรับ', 'ดูพื้นที่หลักและวิธีส่งพิกัดคร่าว ๆ หลังได้ราคาเบื้องต้น', areaCards, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ทั้งหมด' }),
  ].filter(Boolean);
}

export function getB2BHubDiscovery() {
  const device = releasedB2BPages(10, ['company-laptop-lot','company-desktop-lot','company-monitor-lot','company-phone-lot','company-iphone-lot','company-ipad-lot','company-macbook-lot']);
  const scenarios = releasedB2BPages(10, ['office-it-clearance','office-relocation-it','business-closure-it','it-asset-disposal','obsolete-it-lot','mixed-it-lot','inventory-clearance-it']);
  const sectors = releasedB2BPages(10, ['school-computer-lot','university-device-lot','gaming-cafe-pc-lot','internet-cafe-equipment','hotel-office-it','factory-office-it','retail-pos-lot']);
  const process = releasedB2BPages(4, ['corporate-quotation-buyback']);
  return [
    group('b2b-device', 'เลือกตามทรัพย์สิน', 'ล็อตอุปกรณ์ที่ต้องแยกรุ่นและสถานะ', 'เริ่มจากประเภทเครื่องเมื่อทราบว่าล็อตหลักเป็น Notebook, PC, Monitor หรือ Mobile fleet', device),
    group('b2b-scenario', 'เลือกตามสถานการณ์', 'ย้ายออฟฟิศ ปิดกิจการ เคลียร์คลัง หรือสต็อกค้าง', 'เหมาะเมื่อเหตุผลในการจำหน่ายมีผลต่อสิทธิ์ทรัพย์สิน วันขนย้าย และวิธีจัด Asset List', scenarios),
    group('b2b-sector', 'เลือกตามหน่วยงาน', 'Workflow เฉพาะโรงเรียน มหาวิทยาลัย โรงแรม โรงงาน และร้านค้า', 'แยกความเสี่ยงของข้อมูล ระบบที่ยังใช้งาน และอุปกรณ์ Vendor/OT ก่อนนัดรับ', sectors),
    group('b2b-process', 'เอกสารและอนุมัติ', 'ใบเสนอราคาและกระบวนการซื้อขายบริษัท', 'ใช้เมื่อฝ่ายจัดซื้อหรือบัญชีต้องการเอกสารอ้างอิง Asset List และระยะเวลายืนราคา', process),
    group('b2b-guides', 'เตรียมก่อนส่งรายการ', 'คู่มือที่เกี่ยวข้องกับงานยกล็อต', 'อ่านเรื่องย้ายออฟฟิศ เอกสาร และการนัดรับก่อนเตรียมไฟล์จริง', [guideCard('officeMove'), guideCard('documents'), guideCard('pickup')].filter(Boolean), { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
  ].filter(Boolean);
}

export function getReleasedB2BDiscovery(page, content) {
  if (!page || !content) return [];
  if (page.id === 'hub-b2b') return getB2BHubDiscovery();
  const hubCard = releasedArchitectureB2BCard(RELEASED_B2B_HUB);
  const related = releasedB2BPages(8, content.relatedSlugs || []);
  const peerCategories = categoriesForSlugs(content.categorySlugs || ['bulk-buyout'], 6);
  const categoryPeers = releasedB2BForCategories(content.categorySlugs || [], 5, page.slug);
  const guides = uniqByHref([guideCard('officeMove'), guideCard('documents'), guideCard('pickup'), ...guidesForCategories(content.categorySlugs || [], 3)]).filter(Boolean).slice(0, 5);
  const areas = areasForCategories(['bulk-buyout','computer','notebook'], null, 4);
  return [
    group('b2b-parent', 'กลับไปดูภาพรวม B2B', 'ศูนย์รวมงานบริษัทและยกล็อต', 'ใช้ Hub เพื่อเลือกหน้าตามทรัพย์สิน สถานการณ์ และประเภทองค์กร', [hubCard].filter(Boolean)),
    group('b2b-related', 'Workflow ที่เกี่ยวข้อง', 'งานบริษัทที่มักต้องดูควบคู่กัน', 'ลิงก์ตามความสัมพันธ์ของ Asset List เอกสาร การขนย้าย และประเภทอุปกรณ์', uniqByHref([...related, ...categoryPeers]).slice(0, 8)),
    group('b2b-products', 'กลับไปดูสินค้าหลัก', 'หน้าประเมินตามประเภทอุปกรณ์', 'ใช้ Money Page เมื่อต้องการดูรุ่น สภาพ และปัจจัยราคาของสินค้าแต่ละประเภทโดยละเอียด', peerCategories),
    group('b2b-guides', 'ก่อนส่ง Asset List', 'คู่มือสำหรับงานองค์กร', 'เตรียมรายการ เอกสาร และข้อมูลก่อนนัดเพื่อลดการแก้ไขไฟล์หลายรอบ', guides, { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
    group('b2b-areas', 'นัดตรวจในขอนแก่น', 'เช็กพื้นที่และรูปแบบนัดรับ', 'พื้นที่จริงและขนาดล็อตมีผลต่อการวางแผนตรวจและขนย้าย', areas, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ทั้งหมด' }),
  ].filter(Boolean);
}

export function getAreaHubDiscovery() {
  const localCards = uniqByHref([
    ...LOCAL_PAGES.map(localCard),
    ...RELEASED_ARCHITECTURE_DISTRICTS.map(releasedArchitectureDistrictCard),
  ]);
  const primarySlugs = ['notebook', 'computer', 'iphone', 'macbook', 'ipad-tablet', 'gpu', 'bulk-buyout', 'monitor'];
  return [
    group('areas', 'เลือกพื้นที่', 'พื้นที่นัดรับที่มีข้อมูลเฉพาะแล้ว', 'เลือกโซนหรืออำเภอที่ใกล้ที่สุดเพื่อดูรูปแบบการนัด จุดอ้างอิง การจัดรอบ และข้อมูลที่ควรส่งก่อนออกคิว', localCards),
    group('products', 'เลือกตามสินค้า', 'สินค้าที่ส่งประเมินจากทุกพื้นที่ได้', 'ถ้าต้องการเช็กรุ่นหรือปัจจัยราคาก่อน ให้เริ่มจากหน้าสินค้าแล้วค่อยส่งพื้นที่ใน LINE', categoriesForSlugs(primarySlugs, 8), { href: '/สินค้าที่รับซื้อ/', label: 'ดูสินค้าทั้งหมด' }),
    group('guides', 'เตรียมก่อนนัด', 'คู่มือพื้นที่และการนัดรับ', 'อ่านวิธีเตรียมข้อมูลและเช็กพื้นที่ก่อนส่งพิกัดจริงให้ทีมงาน', [guideCard('pickup'), guideCard('nearby'), guideCard('whereToSell')].filter(Boolean), { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
  ].filter(Boolean);
}

export function getReleasedDistrictDiscovery(page, content) {
  if (!page || !content) return [];
  const productCards = categoriesForSlugs(content.categorySlugs || [], 6);
  const relatedDistricts = releasedDistrictPeers(content.relatedDistrictSlugs || [], page.slug, 6);
  const existingRelated = (content.relatedDistrictSlugs || [])
    .map((slug) => localCard(LOCAL_PAGES.find((item) => item.slug === slug)))
    .filter(Boolean);
  const nearby = uniqByHref([...existingRelated, ...relatedDistricts]).slice(0, 6);
  const b2b = releasedB2BForCategories(content.categorySlugs || [], 4);
  const guides = uniqByHref([guideCard('pickup'), guideCard('nearby'), guideCard('whereToSell'), ...guidesForCategories(content.categorySlugs || [], 3)]).filter(Boolean).slice(0, 5);
  return [
    group('district-products', 'เลือกตามสินค้า', `สินค้าที่เหมาะกับรอบ${content.area}`, 'ไปหน้าสินค้าเพื่อดูรุ่น สภาพ จุดตรวจ และปัจจัยราคาก่อนส่งพิกัดจริง', productCards, { href: '/สินค้าที่รับซื้อ/', label: 'ดูสินค้าทั้งหมด' }),
    group('district-nearby', 'เส้นทางต่อเนื่อง', 'พื้นที่ที่ควรดูควบคู่กัน', 'ใช้เมื่ออยู่ระหว่างอำเภอหรือมีหลายจุดรับในเส้นทางเดียวกัน ระบบแสดงเฉพาะ Local Page ที่เปิดใช้งานแล้ว', nearby, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ทั้งหมด' }),
    group('district-b2b', 'หลายเครื่อง / บริษัท', 'มีล็อตสินค้าหรือทรัพย์สินองค์กร?', 'งานหลายเครื่องควรเริ่มจาก Asset List และขอบเขตขนย้าย ไม่ใช้ workflow แบบเครื่องเดียว', b2b, { href: '/รับซื้อยกล็อต-บริษัท/', label: 'ดู B2B Hub' }),
    group('district-guides', 'ก่อนนัดรับ', 'คู่มือสำหรับเตรียมข้อมูลและพื้นที่', 'อ่านวิธีนัดรับ เช็กพื้นที่ และเลือกช่องทางขายก่อนส่งข้อมูลจริง', guides, { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
  ].filter(Boolean);
}

export function getConditionHubDiscovery() {
  const genericCards = CONDITION_PAGES.map(conditionCard).filter(Boolean);
  const computerCards = uniqByHref([
    ...releasedConditionsForCategory('notebook', 8),
    ...releasedConditionsForCategory('macbook', 8),
  ]);
  const mobileCards = uniqByHref([
    ...releasedConditionsForCategory('iphone', 8),
    ...releasedConditionsForCategory('ipad-tablet', 8),
  ]);
  const componentCards = uniqByHref([
    ...releasedConditionsForCategory('gpu', 8),
    ...releasedConditionsForCategory('monitor', 8),
  ]);
  const deviceCards = uniqByHref([
    ...releasedConditionsForCategory('camera', 8),
    ...releasedConditionsForCategory('game-console', 8),
  ]);
  const primarySlugs = ['notebook', 'iphone', 'macbook', 'ipad-tablet', 'computer', 'monitor'];

  return [
    group('conditions-general', 'เริ่มจากอาการกว้าง', 'ยังไม่แน่ใจว่าเสียระดับไหน?', 'ใช้หน้าสภาพทั่วไปเพื่อดูภาพรวมก่อน แล้วค่อยเลือกหน้าปัญหาเฉพาะสินค้าด้านล่างเมื่อรู้ประเภทเครื่องแล้ว', genericCards),
    group('conditions-computer', 'โน้ตบุ๊กและ MacBook', 'ปัญหาที่พบบนคอมพิวเตอร์พกพา', 'แยกตามชนิดเครื่องเพื่อให้จุดตรวจและข้อมูลที่ส่งประเมินตรงกับอุปกรณ์จริง', computerCards),
    group('conditions-mobile', 'iPhone และ iPad', 'ปัญหาหน้าจอ แบต ตัวเครื่อง และกล้อง', 'เลือกหน้าให้ตรงทั้งอุปกรณ์และอาการ เพื่อไม่ต้องใช้คำแนะนำแบบกว้างเกินไป', mobileCards),
    group('conditions-components', 'การ์ดจอและจอคอม', 'อาการภาพ พัดลม และพิกเซล', 'เหมาะกับอุปกรณ์ PC ที่ต้องแยกอาการไม่แสดงภาพ ภาพแตก เสียงพัดลม พิกเซลเสีย หรือเส้นบนจอ', componentCards),
    group('conditions-devices', 'กล้องและเครื่องเกม', 'อาการเฉพาะอุปกรณ์อื่น', 'รวมปัญหาที่ต้องใช้วิธีตรวจต่างจากคอมและมือถือ เช่น เชื้อรา ชัตเตอร์ และเครื่องเกมเปิดไม่ติด', deviceCards),
    group('products', 'เลือกตามสินค้า', 'กลับไปดูประเภทเครื่อง', 'ถ้าทราบรุ่นหรือประเภทสินค้าแล้ว หน้าหมวดจะช่วยดูรุ่นย่อยและปัจจัยราคาได้ละเอียดกว่า', categoriesForSlugs(primarySlugs, 6), { href: '/สินค้าที่รับซื้อ/', label: 'ดูสินค้าทั้งหมด' }),
    group('guides', 'อ่านก่อนส่งรูป', 'คู่มือของมีตำหนิ', 'อ่านภาพรวมของพังและเคสจอแตกก่อนส่งรายละเอียดจริงให้ทีมประเมิน', [guideCard('broken'), guideCard('cracked'), guideCard('documents')].filter(Boolean), { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
  ].filter(Boolean);
}


export function getReleasedGuideDiscovery(page, content) {
  if (!page || !content) return [];
  const categorySlugs = content.categorySlugs || [];
  const moneyPages = categoriesForSlugs(categorySlugs, 4);
  const models = uniqByHref(categorySlugs.flatMap((slug) => releasedModelsForCategory(slug, 4))).slice(0, 6);
  const conditions = uniqByHref(categorySlugs.flatMap((slug) => releasedConditionsForCategory(slug, 3))).slice(0, 5);
  const siblingGuides = releasedGuidesForCategories(categorySlugs, 6, page.slug);
  const priceHub = content.priceIntent ? [releasedPriceHubCard(RELEASED_PRICE_HUB)].filter(Boolean) : [];
  const areas = areasForCategories(categorySlugs, null, 3);
  return [
    group('guide-money', 'นำข้อมูลไปใช้ต่อ', 'หน้าประเมินสินค้าที่เกี่ยวข้อง', 'เมื่อเช็กรุ่น สเปก หรือสภาพครบแล้ว ไปหน้าสินค้าเพื่อดูรุ่นย่อยและขั้นตอนส่งประเมินต่อ', moneyPages, { href: '/สินค้าที่รับซื้อ/', label: 'ดูสินค้าทั้งหมด' }),
    group('guide-models', 'รู้รุ่นแล้วดูต่อ', 'รุ่นและซีรีส์ที่เปิดข้อมูลเฉพาะแล้ว', 'ถ้าสินค้าตรงกับรุ่นเหล่านี้ ดูจุดตรวจเฉพาะรุ่นควบคู่กับคู่มือนี้ได้', models),
    group('guide-conditions', 'มีตำหนิร่วมด้วย', 'หน้าสภาพที่ควรดูเพิ่ม', 'เลือกเฉพาะอาการที่ตรงกับเครื่องจริงเพื่อเตรียมรูปและรายละเอียดให้ครบ', conditions, { href: '/สภาพสินค้าที่ขายได้/', label: 'ดูทุกสภาพสินค้า' }),
    group('guide-peers', 'อ่านต่อในคลัสเตอร์เดียวกัน', 'คู่มือที่เกี่ยวข้อง', 'อ่านเรื่องรุ่น แบต อุปกรณ์ สภาพ และปัจจัยราคาที่อยู่ในสินค้ากลุ่มเดียวกัน', siblingGuides, { href: '/บทความ/', label: 'ดูบทความทั้งหมด' }),
    group('guide-price', 'เรื่องมูลค่า', 'ศูนย์ข้อมูลราคาและปัจจัยประเมิน', 'ใช้เมื่อคำถามเกี่ยวข้องกับมูลค่า โดยแยกข้อมูลราคาตลาดออกจากการตรวจสภาพจริง', priceHub),
    group('guide-areas', 'ขายในขอนแก่น', 'เช็กพื้นที่นัดรับ', 'หลังได้ราคาเบื้องต้น ค่อยดูรายละเอียดพื้นที่และส่งพิกัดคร่าว ๆ เพื่อจัดรอบ', areas, { href: '/พื้นที่ให้บริการ/', label: 'ดูพื้นที่ทั้งหมด' }),
  ].filter(Boolean);
}

export function getPriceHubDiscovery() {
  const legacyPrice = ['macbookPrice','iphonePrice','gpuPrice','consolePrice','gamingNotebook']
    .map(guideCard).filter(Boolean);
  const factorGuides = releasedPriceGuides(10);
  const primary = categoriesForSlugs(['notebook','macbook','iphone','ipad-tablet','computer','gpu','monitor','game-console'], 8);
  return [
    group('price-articles', 'บทความราคาเดิม', 'หน้าราคาแยกตามกลุ่มสินค้า', 'ใช้เพื่อดูกรอบราคาและปัจจัยในหมวดที่มีบทความราคาอยู่แล้ว โดยควรตรวจวันที่อ้างอิงบนแต่ละหน้า', legacyPrice),
    group('price-factors', 'ไม่ใช่มีแต่ตัวเลข', 'คู่มือปัจจัยที่ทำให้มูลค่าต่างกัน', 'กล่อง ที่ชาร์จ ประกัน ชิ้นส่วนที่เคยเปลี่ยน และสภาพหน้าจอมีผลต่างกันตามสินค้า จึงแยกเป็นคู่มือเฉพาะ', factorGuides),
    group('price-products', 'เช็กจากรุ่นจริง', 'กลับไปหน้า Money Page', 'เริ่มจากประเภทสินค้าเพื่อดูรุ่น สภาพ และขั้นตอนส่งข้อมูลให้ประเมินตามเครื่องจริง', primary, { href: '/สินค้าที่รับซื้อ/', label: 'ดูสินค้าทั้งหมด' }),
  ].filter(Boolean);
}

export const LIVE_DISCOVERY_META = {
  categoryCount: CATEGORIES.length,
  brandCount: BRAND_PAGES.length,
  modelCount: MODEL_PAGES.length,
  releasedArchitectureModelCount: RELEASED_ARCHITECTURE_MODELS.length,
  releasedArchitectureConditionCount: RELEASED_ARCHITECTURE_CONDITIONS.length,
  releasedArchitectureB2BCount: RELEASED_ARCHITECTURE_B2B.length,
  releasedArchitectureDistrictCount: RELEASED_ARCHITECTURE_DISTRICTS.length,
  releasedArchitectureGuideCount: RELEASED_ARCHITECTURE_GUIDES.length,
  releasedPriceHub: Boolean(RELEASED_PRICE_HUB),
  releasedB2BHub: Boolean(RELEASED_B2B_HUB),
  releasedProductHub: Boolean(RELEASED_PRODUCT_HUB),
  releasedBrandModelHub: Boolean(RELEASED_BRAND_MODEL_HUB),
  conditionCount: CONDITION_PAGES.length,
  localCount: LOCAL_PAGES.length,
  holdArchitectureLinked: false,
};
