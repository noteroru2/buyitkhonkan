// Explicit relationships for index recovery. Keep this map small and intentional:
// category hubs should point to their strongest existing children, not array neighbours.
export const CATEGORY_CHILDREN = {
  notebook: [
    'dell', 'hp', 'lenovo', 'asus', 'acer', 'msi',
    'gaming-notebook', 'notebook-broken', 'notebook-no-power', 'notebook-screen-crack',
  ],
  macbook: ['macbook-air', 'macbook-pro', 'macbook-intel', 'macbook-m-series', 'battery-swollen'],
  'ipad-tablet': ['ipad-pro', 'ipad-air', 'ipad-gen', 'ipad-mini', 'screen-crack'],
  computer: ['gaming-pc', 'office-pc', 'workstation', 'cpu', 'ram-ssd', 'computer-bulk'],
  gpu: ['rtx-30-series', 'rtx-40-series', 'rtx-50-series', 'gaming-pc', 'workstation'],
  iphone: ['screen-crack', 'battery-swollen', 'locked-account', 'no-box'],
  smartphone: ['iphone', 'ipad-tablet', 'smartwatch', 'screen-crack', 'locked-account'],
  'game-console': ['no-power', 'no-box'],
  'bulk-buyout': ['computer-bulk', 'office-pc', 'workstation'],
};

// Only show an article when an existing article directly supports the category intent.
// A missing entry is deliberate; an omitted link is better than a topically false link.
export const CATEGORY_ARTICLES = {
  notebook: {
    href: '/บทความ/เช็คลิสต์ก่อนขายโน้ตบุ๊ก/',
    text: 'เช็กลิสต์เตรียมโน้ตบุ๊กก่อนส่งประเมิน',
  },
  smartphone: {
    href: '/บทความ/กลโกงขายของไอทีออนไลน์/',
    text: 'ข้อควรระวังเมื่อขายมือถือและสินค้าไอทีออนไลน์',
  },
  computer: {
    href: '/บทความ/ขายคอมทั้งเครื่อง-vs-แยกชิ้นส่วน/',
    text: 'ขายคอมทั้งเครื่องหรือแยกชิ้นส่วน แบบไหนเหมาะกว่า',
  },
  'game-console': {
    href: '/บทความ/ราคารับซื้อ-ps5-nintendo-switch/',
    text: 'ปัจจัยราคาของ PS5 และ Nintendo Switch มือสอง',
  },
  macbook: {
    href: '/บทความ/ราคารับซื้อ-macbook-มือสอง/',
    text: 'ปัจจัยราคารับซื้อ MacBook มือสองแต่ละรุ่น',
  },
  iphone: {
    href: '/บทความ/วิธีลบข้อมูล-iphone-ก่อนขาย/',
    text: 'วิธีลบข้อมูล iPhone ก่อนส่งมอบ',
  },
  gpu: {
    href: '/บทความ/ราคารับซื้อ-การ์ดจอ/',
    text: 'ปัจจัยที่ใช้ประเมินราคาการ์ดจอมือสอง',
  },
  'bulk-buyout': {
    href: '/บทความ/เคลียร์อุปกรณ์ไอที-ย้ายออฟฟิศ/',
    text: 'เช็กลิสต์เคลียร์อุปกรณ์ไอทีเมื่อย้ายออฟฟิศ',
  },
  appliance: {
    href: '/บทความ/เคลียร์อุปกรณ์ไอที-ย้ายออฟฟิศ/',
    text: 'เตรียมรายการอุปกรณ์สำนักงานก่อนประเมินเป็นล็อต',
  },
};

export const LOCAL_RELATED = {
  'mueang-khon-kaen': ['kku-kangsadan', 'ban-ped', 'sila'],
  'kku-kangsadan': ['sila', 'mueang-khon-kaen'],
  'ban-ped': ['mueang-khon-kaen', 'sila'],
  sila: ['kku-kangsadan', 'mueang-khon-kaen', 'ban-ped'],
  'nam-phong': ['mueang-khon-kaen'],
  'ban-phai': ['phon', 'mueang-khon-kaen'],
  'chum-phae': ['mueang-khon-kaen'],
  phon: ['ban-phai', 'mueang-khon-kaen'],
};
