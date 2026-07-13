export const CONDITION_PAGES = [
  {
    slug: 'screen-crack',
    condition: 'จอแตกหรือจอมีเส้น',
    title: 'จอแตก จอมีเส้น ขายได้ไหม ประเมินราคาสินค้าไอทีขอนแก่น | WINNER IT',
    desc: 'เครื่องจอแตก จอมีเส้น จอเบิร์น ยังขายได้หรือไม่ ดูวิธีประเมินราคา iPhone โน้ตบุ๊ค iPad และจอคอมตามสภาพจริง',
    h1: 'จอแตก จอมีเส้น ยังขายได้ไหมในขอนแก่น',
    applies: ['iphone', 'ipad-tablet', 'notebook', 'monitor'],
    priceImpact: 'หักตามค่าจอและความคุ้มในการซ่อม รุ่นยอดนิยมยังมีราคาเพราะอะไหล่หมุนเวียนเร็ว',
  },
  {
    slug: 'no-power',
    condition: 'เปิดไม่ติดหรือบูตไม่ขึ้น',
    title: 'เปิดไม่ติด บูตไม่ขึ้น ขายของไอทีได้ไหม | WINNER IT ขอนแก่น',
    desc: 'โน้ตบุ๊ค คอม iPhone หรือเครื่องเกมเปิดไม่ติดยังส่งประเมินได้ ดูปัจจัยที่ทำให้มีราคาหรือถูกตีเป็นอะไหล่',
    h1: 'เครื่องเปิดไม่ติด บูตไม่ขึ้น ยังส่งประเมินราคาได้',
    applies: ['notebook', 'computer', 'game-console', 'iphone'],
    priceImpact: 'ประเมินจากอะไหล่ที่ยังมีมูลค่า เช่น จอ บอร์ด แรม SSD เคส อะแดปเตอร์ และอุปกรณ์แท้',
  },
  {
    slug: 'battery-swollen',
    condition: 'แบตบวม แบตเสื่อม',
    title: 'แบตบวม แบตเสื่อม ขาย iPhone MacBook Notebook ได้ไหม | WINNER IT',
    desc: 'แบตบวมหรือแบตเสื่อมขายได้ไหม ต้องแจ้งอะไรบ้าง และราคาถูกหักอย่างไรสำหรับ iPhone MacBook โน้ตบุ๊คและแท็บเล็ต',
    h1: 'แบตบวม แบตเสื่อม ขายได้ แต่ต้องแจ้งตั้งแต่แรก',
    applies: ['iphone', 'macbook', 'notebook', 'ipad-tablet'],
    priceImpact: 'หักตามค่าเปลี่ยนแบตและความเสี่ยงในการขนส่ง เครื่องแบตบวมควรปิดเครื่องและไม่ชาร์จต่อ',
  },
  {
    slug: 'locked-account',
    condition: 'ติดบัญชี iCloud / Google / Samsung',
    title: 'เครื่องติด iCloud Google Samsung Account ขายได้ไหม | WINNER IT',
    desc: 'เครื่องติดบัญชีผู้ใช้เดิมขายได้หรือไม่ เงื่อนไขการรับซื้อ iPhone iPad Android และอุปกรณ์ smart device ก่อนส่งมอบ',
    h1: 'เครื่องติดบัญชีผู้ใช้ ต้องปลดล็อกก่อนขาย',
    applies: ['iphone', 'ipad-tablet', 'smartphone', 'gadget'],
    priceImpact: 'โดยทั่วไปต้องออกจากบัญชีและปิดระบบล็อกก่อนรับซื้อ เพื่อป้องกันปัญหากรรมสิทธิ์และข้อมูลส่วนตัว',
  },
  {
    slug: 'no-box',
    condition: 'ไม่มีกล่องหรืออุปกรณ์ไม่ครบ',
    title: 'ไม่มีกล่อง ไม่มีใบเสร็จ ขายสินค้าไอทีได้ไหม | WINNER IT ขอนแก่น',
    desc: 'ของไอทีไม่มีกล่อง สายชาร์จไม่แท้ หรือใบเสร็จหายยังขายได้ไหม ดูสิ่งที่มีผลต่อราคาก่อนส่งประเมิน',
    h1: 'ไม่มีกล่อง ไม่มีใบเสร็จ ยังขายสินค้าไอทีได้',
    applies: ['notebook', 'iphone', 'game-console', 'camera'],
    priceImpact: 'ขายได้ แต่กล่อง อุปกรณ์แท้ และใบเสร็จช่วยเพิ่มความน่าเชื่อถือและดันราคาในบางรุ่น',
  },
];

const CONDITION_PATHS = {
  'screen-crack': 'จอแตกขายได้ไหม',
  'no-power': 'เปิดไม่ติดขายได้ไหม',
  'battery-swollen': 'แบตบวมขายได้ไหม',
  'locked-account': 'ติดบัญชีขายได้ไหม',
  'no-box': 'ไม่มีกล่องขายได้ไหม',
};

for (const page of CONDITION_PAGES) {
  page.path = CONDITION_PATHS[page.slug] || page.slug;
}
