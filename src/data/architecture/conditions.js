import { HIGH_INTENT_CONDITION_CONTENT } from '../highIntentConditionContent.js';
import { defineArchitecturePage } from './_shared.js';

const RAW = [
  {
    "slug": "notebook-hinge-broken",
    "label": "โน้ตบุ๊กบานพับแตก",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/",
    "cluster": "notebook-condition"
  },
  {
    "slug": "notebook-keyboard-broken",
    "label": "โน้ตบุ๊กคีย์บอร์ดเสีย",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/",
    "cluster": "notebook-condition"
  },
  {
    "slug": "notebook-battery-degraded",
    "label": "โน้ตบุ๊กแบตเสื่อม",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/",
    "cluster": "notebook-condition"
  },
  {
    "slug": "notebook-water-damage",
    "label": "โน้ตบุ๊กโดนน้ำ",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/",
    "cluster": "notebook-condition"
  },
  {
    "slug": "notebook-gpu-fault",
    "label": "โน้ตบุ๊กการ์ดจอเสีย",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/",
    "cluster": "notebook-condition"
  },
  {
    "slug": "macbook-screen-lines",
    "label": "MacBook จอเป็นเส้น",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/",
    "cluster": "macbook-condition"
  },
  {
    "slug": "macbook-keyboard-fault",
    "label": "MacBook คีย์บอร์ดเสีย",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/",
    "cluster": "macbook-condition"
  },
  {
    "slug": "macbook-battery-service",
    "label": "MacBook แบตเสื่อม",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/",
    "cluster": "macbook-condition"
  },
  {
    "slug": "macbook-dented",
    "label": "MacBook มีรอยบุบ",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/",
    "cluster": "macbook-condition"
  },
  {
    "slug": "iphone-screen-cracked",
    "label": "iPhone จอแตก",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/",
    "cluster": "iphone-condition"
  },
  {
    "slug": "iphone-back-glass-cracked",
    "label": "iPhone ฝาหลังแตก",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/",
    "cluster": "iphone-condition"
  },
  {
    "slug": "iphone-battery-low",
    "label": "iPhone แบตต่ำ",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/",
    "cluster": "iphone-condition"
  },
  {
    "slug": "iphone-camera-fault",
    "label": "iPhone กล้องเสีย",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/",
    "cluster": "iphone-condition"
  },
  {
    "slug": "ipad-bent",
    "label": "iPad เครื่องงอ",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/",
    "cluster": "ipad-condition"
  },
  {
    "slug": "ipad-screen-cracked",
    "label": "iPad จอแตก",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/",
    "cluster": "ipad-condition"
  },
  {
    "slug": "ipad-battery-degraded",
    "label": "iPad แบตเสื่อม",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/",
    "cluster": "ipad-condition"
  },
  {
    "slug": "gpu-no-display",
    "label": "การ์ดจอไม่แสดงภาพ",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/",
    "cluster": "gpu-condition"
  },
  {
    "slug": "gpu-artifact",
    "label": "การ์ดจอภาพแตก Artifact",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/",
    "cluster": "gpu-condition"
  },
  {
    "slug": "gpu-fan-noisy",
    "label": "การ์ดจอพัดลมดัง",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/",
    "cluster": "gpu-condition"
  },
  {
    "slug": "camera-fungus",
    "label": "กล้องหรือเลนส์มีรา",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/",
    "cluster": "camera-condition"
  },
  {
    "slug": "camera-shutter-high",
    "label": "กล้องชัตเตอร์สูง",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/",
    "cluster": "camera-condition"
  },
  {
    "slug": "monitor-dead-pixel",
    "label": "จอคอมมี Dead Pixel",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/",
    "cluster": "monitor-condition"
  },
  {
    "slug": "monitor-lines",
    "label": "จอคอมมีเส้น",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/",
    "cluster": "monitor-condition"
  },
  {
    "slug": "console-no-power",
    "label": "เครื่องเกมเปิดไม่ติด",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/",
    "cluster": "console-condition"
  }
];

export const CONDITION_ARCHITECTURE = RAW.map((page) => {
  const releasedContent = HIGH_INTENT_CONDITION_CONTENT[page.slug];
  const publicSlug = page.label.toLowerCase().replace(/\s+/g, '-');
  const h1Spacer = /^[a-z]/i.test(page.label) ? ' ' : '';
  return defineArchitecturePage({
    id: `condition-${page.slug}`,
    slug: page.slug,
    path: `รับซื้อ${publicSlug}-ขอนแก่น`,
    type: 'condition',
    cluster: page.cluster,
    label: page.label,
    h1: releasedContent ? `รับซื้อ${h1Spacer}${page.label} ขอนแก่น` : undefined,
    parent: page.parent,
    directory: '/สภาพสินค้าที่ขายได้/',
    lifecycle: releasedContent ? 'INDEX' : 'HOLD_NOINDEX',
    title: releasedContent?.seoTitle,
    description: releasedContent?.metaDescription,
  });
});
