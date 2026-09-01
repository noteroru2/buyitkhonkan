import { defineArchitecturePage } from './_shared.js';
import { HIGH_INTENT_GUIDE_CONTENT, HIGH_INTENT_GUIDE_RELEASE_SET } from '../highIntentGuideContent.js';

const RAW = [
  {
    "slug": "วิธีเช็กรุ่นโน้ตบุ๊กก่อนขาย",
    "label": "วิธีเช็กรุ่นโน้ตบุ๊กก่อนขาย"
  },
  {
    "slug": "วิธีดูสเปกโน้ตบุ๊กก่อนประเมิน",
    "label": "วิธีดูสเปกโน้ตบุ๊กก่อนส่งประเมิน"
  },
  {
    "slug": "วิธีเช็กสุขภาพแบตโน้ตบุ๊ก",
    "label": "วิธีเช็กสุขภาพแบตโน้ตบุ๊ก"
  },
  {
    "slug": "วิธีเช็กประกันโน้ตบุ๊ก",
    "label": "วิธีเช็กประกันโน้ตบุ๊ก"
  },
  {
    "slug": "โน้ตบุ๊กไม่มีกล่องราคาตกไหม",
    "label": "โน้ตบุ๊กไม่มีกล่องราคาตกไหม"
  },
  {
    "slug": "โน้ตบุ๊กมีรอยบุบขายได้ไหม",
    "label": "โน้ตบุ๊กมีรอยบุบขายได้ไหม"
  },
  {
    "slug": "โน้ตบุ๊กบานพับแตกประเมินยังไง",
    "label": "โน้ตบุ๊กบานพับแตกประเมินอย่างไร"
  },
  {
    "slug": "โน้ตบุ๊กจอมีเส้นราคาตกแค่ไหน",
    "label": "โน้ตบุ๊กจอมีเส้นมีผลกับราคาอย่างไร"
  },
  {
    "slug": "วิธีเตรียม-macbook-ก่อนขาย",
    "label": "วิธีเตรียม MacBook ก่อนขาย"
  },
  {
    "slug": "วิธีดู-cycle-count-macbook",
    "label": "วิธีดู Cycle Count ของ MacBook"
  },
  {
    "slug": "วิธีเช็ก-battery-health-macbook",
    "label": "วิธีเช็ก Battery Health ของ MacBook"
  },
  {
    "slug": "macbook-คีย์บอร์ดอังกฤษขายได้ไหม",
    "label": "MacBook คีย์บอร์ดอังกฤษขายได้ไหม"
  },
  {
    "slug": "macbook-ไม่มีที่ชาร์จราคาตกไหม",
    "label": "MacBook ไม่มีที่ชาร์จราคาตกไหม"
  },
  {
    "slug": "macbook-จอเป็นรอยประเมินยังไง",
    "label": "MacBook จอเป็นรอยประเมินอย่างไร"
  },
  {
    "slug": "วิธีปลด-find-my-mac-ก่อนขาย",
    "label": "วิธีปลด Find My Mac ก่อนขาย"
  },
  {
    "slug": "วิธีเช็ก-iphone-ก่อนขาย",
    "label": "วิธีเช็ก iPhone ก่อนขาย"
  },
  {
    "slug": "วิธีดู-battery-health-iphone",
    "label": "วิธีดู Battery Health ของ iPhone"
  },
  {
    "slug": "iphone-ไม่มีกล่องราคาตกไหม",
    "label": "iPhone ไม่มีกล่องราคาตกไหม"
  },
  {
    "slug": "iphone-จอเปลี่ยนราคาตกไหม",
    "label": "iPhone เคยเปลี่ยนจอมีผลกับราคาไหม"
  },
  {
    "slug": "iphone-ฝาหลังแตกขายได้ไหม",
    "label": "iPhone ฝาหลังแตกขายได้ไหม"
  },
  {
    "slug": "iphone-ติดผ่อนตรวจยังไง",
    "label": "วิธีตรวจสถานะเครื่องก่อนขาย iPhone"
  },
  {
    "slug": "วิธีเตรียม-ipad-ก่อนขาย",
    "label": "วิธีเตรียม iPad ก่อนขาย"
  },
  {
    "slug": "วิธีเช็ก-ipad-งอ",
    "label": "วิธีเช็ก iPad ว่าเครื่องงอหรือไม่"
  },
  {
    "slug": "ipad-cellular-vs-wifi-ราคามือสอง",
    "label": "iPad Cellular กับ Wi-Fi ราคามือสองต่างกันอย่างไร"
  },
  {
    "slug": "apple-pencil-เพิ่มราคาขาย-ipadไหม",
    "label": "Apple Pencil ช่วยเพิ่มมูลค่า iPad มือสองไหม"
  },
  {
    "slug": "วิธีเช็กสเปกคอมก่อนขาย",
    "label": "วิธีเช็กสเปกคอมก่อนขาย"
  },
  {
    "slug": "ขายคอมประกอบต้องส่งข้อมูลอะไร",
    "label": "ขายคอมประกอบต้องส่งข้อมูลอะไรบ้าง"
  },
  {
    "slug": "ขายคอมทั้งชุดพร้อมจอคุ้มไหม",
    "label": "ขายคอมทั้งชุดพร้อมจอคุ้มไหม"
  },
  {
    "slug": "psu-มีผลต่อราคาคอมมือสองไหม",
    "label": "PSU มีผลต่อราคาคอมมือสองไหม"
  },
  {
    "slug": "ชุดน้ำมีผลต่อราคาคอมมือสองไหม",
    "label": "ชุดน้ำมีผลต่อราคาคอมมือสองไหม"
  },
  {
    "slug": "วิธีเช็กการ์ดจอก่อนขาย",
    "label": "วิธีเช็กการ์ดจอก่อนขาย"
  },
  {
    "slug": "วิธีดูรุ่นการ์ดจอใน-windows",
    "label": "วิธีดูรุ่นการ์ดจอใน Windows"
  },
  {
    "slug": "การ์ดจอขุดเหมืองขายได้ไหม",
    "label": "การ์ดจอเคยขุดเหมืองขายได้ไหม"
  },
  {
    "slug": "การ์ดจอไม่มีประกันราคาตกไหม",
    "label": "การ์ดจอไม่มีประกันราคาตกไหม"
  },
  {
    "slug": "การ์ดจอพัดลมดังประเมินยังไง",
    "label": "การ์ดจอพัดลมดังประเมินอย่างไร"
  },
  {
    "slug": "วิธีเทสการ์ดจอก่อนขาย",
    "label": "วิธีทดสอบการ์ดจอก่อนขาย"
  },
  {
    "slug": "วิธีเช็กกล้องก่อนขาย",
    "label": "วิธีเช็กกล้องก่อนขาย"
  },
  {
    "slug": "วิธีดู-shutter-count-กล้อง",
    "label": "วิธีดู Shutter Count ของกล้อง"
  },
  {
    "slug": "กล้องมีราขายได้ไหม",
    "label": "กล้องมีราขายได้ไหม"
  },
  {
    "slug": "เลนส์มีราประเมินราคาอย่างไร",
    "label": "เลนส์มีราประเมินราคาอย่างไร"
  },
  {
    "slug": "กล้องไม่มีกล่องราคาตกไหม",
    "label": "กล้องไม่มีกล่องราคาตกไหม"
  },
  {
    "slug": "วิธีเตรียม-ps5-ก่อนขาย",
    "label": "วิธีเตรียม PS5 ก่อนขาย"
  },
  {
    "slug": "วิธีลบบัญชี-nintendo-switch-ก่อนขาย",
    "label": "วิธีลบบัญชี Nintendo Switch ก่อนขาย"
  },
  {
    "slug": "เครื่องเกมไม่มีจอยราคาตกไหม",
    "label": "เครื่องเกมไม่มีจอยราคาตกไหม"
  },
  {
    "slug": "วิธีเช็กจอคอมก่อนขาย",
    "label": "วิธีเช็กจอคอมก่อนขาย"
  },
  {
    "slug": "dead-pixel-มีผลต่อราคาจอไหม",
    "label": "Dead Pixel มีผลต่อราคาจอมือสองอย่างไร"
  },
  {
    "slug": "จอเกมมิ่ง-144hz-165hz-ราคามือสอง",
    "label": "จอเกมมิ่ง 144Hz และ 165Hz ประเมินต่างกันอย่างไร"
  },
  {
    "slug": "วิธีเตรียมโดรนก่อนขาย",
    "label": "วิธีเตรียมโดรนก่อนขาย"
  },
  {
    "slug": "โดรนแบตเสื่อมราคาตกไหม",
    "label": "โดรนแบตเสื่อมมีผลต่อราคาอย่างไร"
  },
  {
    "slug": "วิธีเช็กจำนวนรอบแบตโดรน",
    "label": "วิธีเช็กรอบแบตโดรน"
  },
  {
    "slug": "วิธีเตรียม-apple-watch-ก่อนขาย",
    "label": "วิธีเตรียม Apple Watch ก่อนขาย"
  },
  {
    "slug": "apple-watch-cellular-vs-gps-มือสอง",
    "label": "Apple Watch Cellular กับ GPS ราคามือสองต่างกันอย่างไร"
  },
  {
    "slug": "ขายสินค้าไอทีหลายชิ้นเตรียมรายการยังไง",
    "label": "ขายสินค้าไอทีหลายชิ้นควรเตรียมรายการอย่างไร"
  },
  {
    "slug": "บริษัทขายคอมเก่าต้องใช้เอกสารอะไร",
    "label": "บริษัทขายคอมเก่าควรเตรียมเอกสารอะไร"
  },
  {
    "slug": "วิธีทำรายการทรัพย์สินไอทีก่อนขาย",
    "label": "วิธีทำรายการทรัพย์สินไอทีก่อนขาย"
  },
  {
    "slug": "วิธีล้างข้อมูลคอมบริษัทก่อนขาย",
    "label": "วิธีล้างข้อมูลคอมบริษัทก่อนขาย"
  },
  {
    "slug": "รับซื้อยกล็อตประเมินราคายังไง",
    "label": "การประเมินราคาสินค้าไอทียกล็อตทำอย่างไร"
  },
  {
    "slug": "ขายไอทีมือสองต้องมีใบเสร็จไหม",
    "label": "ขายสินค้าไอทีมือสองต้องมีใบเสร็จไหม"
  },
  {
    "slug": "ควรถ่ายรูปสินค้าไอทียังไงก่อนประเมิน",
    "label": "ควรถ่ายรูปสินค้าไอทีอย่างไรก่อนส่งประเมิน"
  },
  {
    "slug": "ข้อมูลอะไรทำให้ประเมินราคาได้เร็วขึ้น",
    "label": "ข้อมูลอะไรช่วยให้ประเมินราคาได้เร็วขึ้น"
  }
];

function guideCluster(label) {
  const value = label.toLowerCase();
  if (value.includes('โน้ตบุ๊ก')) return 'guide-notebook';
  if (value.includes('macbook')) return 'guide-macbook';
  if (value.includes('iphone')) return 'guide-iphone';
  if (value.includes('ipad') || value.includes('apple pencil')) return 'guide-ipad';
  if (value.includes('การ์ดจอ')) return 'guide-gpu';
  if (value.includes('กล้อง') || value.includes('เลนส์') || value.includes('shutter')) return 'guide-camera';
  if (value.includes('ps5') || value.includes('nintendo') || value.includes('เครื่องเกม')) return 'guide-console';
  if (value.includes('จอคอม') || value.includes('dead pixel') || value.includes('จอเกมมิ่ง')) return 'guide-monitor';
  if (value.includes('โดรน')) return 'guide-drone';
  if (value.includes('apple watch')) return 'guide-watch';
  if (['บริษัท', 'ยกล็อต', 'ทรัพย์สิน', 'หลายชิ้น', 'รายการ'].some((term) => value.includes(term))) return 'guide-b2b';
  if (value.includes('คอม') || value.includes('psu') || value.includes('ชุดน้ำ')) return 'guide-computer';
  return 'guide-selling';
}

export const GUIDE_ARCHITECTURE = RAW.map((page) => {
  const content = HIGH_INTENT_GUIDE_CONTENT[page.slug];
  return defineArchitecturePage({
    id: `guide-${page.slug}`,
    slug: page.slug,
    path: `บทความ/${page.slug}`,
    type: 'guide',
    cluster: guideCluster(page.label),
    label: page.label,
    parent: '/บทความ/',
    directory: '/บทความ/',
    lifecycle: HIGH_INTENT_GUIDE_RELEASE_SET.has(page.slug) ? 'INDEX' : 'HOLD_NOINDEX',
    title: content?.seoTitle,
    h1: content?.h1,
    description: content?.metaDescription,
    requiredSections: ['คำตอบสั้น', 'ขั้นตอน/เช็กลิสต์', 'ปัจจัยที่มีผลต่อมูลค่า', 'ข้อควรระวัง', 'FAQ', 'แหล่งอ้างอิง'],
  });
});
