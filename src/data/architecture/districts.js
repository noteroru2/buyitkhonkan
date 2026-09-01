import { defineArchitecturePage } from './_shared.js';
import { HIGH_INTENT_DISTRICT_CONTENT, HIGH_INTENT_DISTRICT_RELEASE_SET } from '../highIntentDistrictContent.js';

const RAW = [
  {
    "slug": "ban-fang",
    "name": "บ้านฝาง"
  },
  {
    "slug": "phra-yuen",
    "name": "พระยืน"
  },
  {
    "slug": "nong-ruea",
    "name": "หนองเรือ"
  },
  {
    "slug": "si-chomphu",
    "name": "สีชมพู"
  },
  {
    "slug": "ubolratana",
    "name": "อุบลรัตน์"
  },
  {
    "slug": "kranuan",
    "name": "กระนวน"
  },
  {
    "slug": "pueai-noi",
    "name": "เปือยน้อย"
  },
  {
    "slug": "waeng-yai",
    "name": "แวงใหญ่"
  },
  {
    "slug": "waeng-noi",
    "name": "แวงน้อย"
  },
  {
    "slug": "nong-song-hong",
    "name": "หนองสองห้อง"
  },
  {
    "slug": "phu-wiang",
    "name": "ภูเวียง"
  },
  {
    "slug": "mancha-khiri",
    "name": "มัญจาคีรี"
  },
  {
    "slug": "chonnabot",
    "name": "ชนบท"
  },
  {
    "slug": "khao-suan-kwang",
    "name": "เขาสวนกวาง"
  },
  {
    "slug": "phu-pha-man",
    "name": "ภูผาม่าน"
  },
  {
    "slug": "sam-sung",
    "name": "ซำสูง"
  },
  {
    "slug": "khok-pho-chai",
    "name": "โคกโพธิ์ไชย"
  },
  {
    "slug": "nong-na-kham",
    "name": "หนองนาคำ"
  },
  {
    "slug": "ban-haet",
    "name": "บ้านแฮด"
  },
  {
    "slug": "non-sila",
    "name": "โนนศิลา"
  },
  {
    "slug": "wiang-kao",
    "name": "เวียงเก่า"
  }
];

export const DISTRICT_ARCHITECTURE = RAW.map((page) => {
  const content = HIGH_INTENT_DISTRICT_CONTENT[page.slug];
  const label = content?.label || `รับซื้อสินค้าไอที ${page.name}`;
  return defineArchitecturePage({
    id: `local-${page.slug}`,
    slug: page.slug,
    path: content?.path || `รับซื้อไอที-${page.name}`,
    type: 'local',
    cluster: 'district',
    label,
    parent: '/พื้นที่ให้บริการ/',
    directory: '/พื้นที่ให้บริการ/',
    lifecycle: HIGH_INTENT_DISTRICT_RELEASE_SET.has(page.slug) ? 'INDEX' : 'HOLD_NOINDEX',
    title: content?.seoTitle,
    h1: content?.h1,
    description: content?.metaDescription,
    requiredSections: ['ข้อมูลบริการเฉพาะอำเภอ', 'ระยะทางและรูปแบบจัดรอบ', 'จุดนัด/เส้นทางที่เหมาะ', 'หมวดสินค้าที่เหมาะกับรอบรับ', 'เช็กลิสต์ก่อนนัด', 'FAQ เฉพาะพื้นที่'],
  });
});
