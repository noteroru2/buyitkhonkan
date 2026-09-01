export const ARCHITECTURE_RELEASE_GATES = [
  'UNIQUE_INTENT',
  'UNIQUE_CONTENT',
  'INTERNAL_LINKS',
  'CANONICAL',
  'METADATA',
  'QUALITY_QA',
];

const defaultContracts = {
  model: ['ภาพรวมรุ่น/ซีรีส์', 'รุ่นย่อยและสเปกที่มีผลต่อราคา', 'จุดตรวจเฉพาะรุ่น', 'ปัจจัยราคา', 'อุปกรณ์/ประกัน', 'FAQ เฉพาะรุ่น'],
  condition: ['อาการและระดับความเสียหาย', 'ผลต่อมูลค่า', 'ข้อมูล/รูปที่ต้องส่ง', 'สิ่งที่ควรหลีกเลี่ยงก่อนตรวจ', 'FAQ'],
  b2b: ['กลุ่มงานที่เหมาะ', 'ข้อมูล Asset List', 'ขั้นตอนประเมินล็อต', 'เอกสารธุรกิจ', 'นัดรับ/ขนส่ง', 'FAQ องค์กร'],
  local: ['ข้อมูลบริการเฉพาะอำเภอ', 'รูปแบบนัดรับ', 'พื้นที่/เส้นทางที่ให้บริการจริง', 'หมวดสินค้าที่เหมาะกับรอบรับ', 'FAQ เฉพาะพื้นที่'],
  guide: ['คำตอบสั้น', 'ขั้นตอน/เช็กลิสต์', 'ตัวอย่าง', 'ข้อควรระวัง', 'ลิงก์ไป Money Page ที่เกี่ยวข้อง'],
};

export function defineArchitecturePage(page) {
  const requiredSections = page.requiredSections || defaultContracts[page.type] || [];
  const title = page.title
    || (page.type === 'guide' ? `${page.label} | คู่มือ WINNER IT` : `${page.label} | WINNER IT ขอนแก่น`);
  const h1 = page.h1
    || (page.type === 'model' ? `รับซื้อ ${page.label} ขอนแก่น` : page.type === 'hub' ? page.label : `${page.label} ขอนแก่น`);

  return {
    ...page,
    path: `/${page.path.replace(/^\/+|\/+$/g, '')}/`,
    title,
    h1,
    description: page.description || `โครงสร้างหน้าสำหรับ ${page.label} เตรียมไว้สำหรับเติมข้อมูลเฉพาะหน้าและตรวจคุณภาพก่อนเปิด Index`,
    lifecycle: page.lifecycle || 'HOLD_NOINDEX',
    requiredSections,
    releaseGate: page.releaseGate || [...ARCHITECTURE_RELEASE_GATES],
  };
}
