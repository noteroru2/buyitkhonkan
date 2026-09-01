import { defineArchitecturePage } from './_shared.js';
import { HIGH_INTENT_B2B_CONTENT, HIGH_INTENT_B2B_RELEASE_SET } from '../highIntentB2BContent.js';

const RAW = [
  ['company-laptop-lot','รับซื้อโน้ตบุ๊กบริษัทเป็นล็อต'],
  ['company-desktop-lot','รับซื้อคอมบริษัทเป็นล็อต'],
  ['company-monitor-lot','รับซื้อจอคอมบริษัทเป็นล็อต'],
  ['office-it-clearance','เคลียร์อุปกรณ์ไอทีสำนักงาน'],
  ['office-relocation-it','รับซื้ออุปกรณ์ไอทีก่อนย้ายออฟฟิศ'],
  ['business-closure-it','รับซื้อทรัพย์สินไอทีกรณีปิดกิจการ'],
  ['school-computer-lot','รับซื้อคอมโรงเรียนเป็นล็อต'],
  ['university-device-lot','รับซื้ออุปกรณ์ไอทีมหาวิทยาลัย'],
  ['gaming-cafe-pc-lot','รับซื้อคอมร้านเกมยกล็อต'],
  ['internet-cafe-equipment','รับซื้ออุปกรณ์ร้านอินเทอร์เน็ต'],
  ['hotel-office-it','รับซื้ออุปกรณ์ไอทีโรงแรม'],
  ['factory-office-it','รับซื้อคอมและอุปกรณ์สำนักงานโรงงาน'],
  ['retail-pos-lot','รับซื้อคอม POS และอุปกรณ์ร้านค้า'],
  ['company-phone-lot','รับซื้อมือถือบริษัทเป็นล็อต'],
  ['company-iphone-lot','รับซื้อ iPhone บริษัทเป็นล็อต'],
  ['company-ipad-lot','รับซื้อ iPad บริษัทเป็นล็อต'],
  ['company-macbook-lot','รับซื้อ MacBook บริษัทเป็นล็อต'],
  ['it-asset-disposal','รับซื้อทรัพย์สินไอทีเก่า'],
  ['obsolete-it-lot','รับซื้ออุปกรณ์ไอทีตกรุ่นเป็นล็อต'],
  ['mixed-it-lot','รับซื้อสินค้าไอทีหลายประเภทพร้อมกัน'],
  ['inventory-clearance-it','รับซื้อสต็อกอุปกรณ์ไอทีค้าง'],
  ['corporate-quotation-buyback','ประเมินรับซื้อพร้อมใบเสนอราคาสำหรับบริษัท'],
];

export const B2B_ARCHITECTURE = RAW.map(([slug, fallbackLabel]) => {
  const content = HIGH_INTENT_B2B_CONTENT[slug];
  const label = content?.label || fallbackLabel;
  return defineArchitecturePage({
    id: `b2b-${slug}`,
    slug,
    path: content?.path || `${slug}-ขอนแก่น`,
    type: 'b2b',
    cluster: 'b2b',
    label,
    parent: '/รับซื้อยกล็อต-บริษัท/',
    directory: '/รับซื้อยกล็อต-บริษัท/',
    lifecycle: HIGH_INTENT_B2B_RELEASE_SET.has(slug) ? 'INDEX' : 'HOLD_NOINDEX',
    title: content?.seoTitle,
    h1: `${label} ขอนแก่น`,
    description: content?.metaDescription,
    requiredSections: ['กลุ่มงานที่เหมาะ', 'ข้อมูล Asset List', 'ขั้นตอนประเมินล็อต', 'เอกสารธุรกิจ', 'ข้อมูล/MDM และการส่งมอบ', 'FAQ องค์กร'],
  });
});
