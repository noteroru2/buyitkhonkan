const SOURCES = {
  nist: { label: 'NIST SP 800-88 Rev. 2 — Guidelines for Media Sanitization', url: 'https://csrc.nist.gov/pubs/sp/800/88/r2/final' },
  autopilot: { label: 'Microsoft Learn — Windows Autopilot registration overview', url: 'https://learn.microsoft.com/th-th/autopilot/registration-overview' },
  apple: { label: 'Apple Support — Release devices in Apple Business', url: 'https://support.apple.com/guide/business/release-devices-axmec4d28461/web' },
  android: { label: 'Android Enterprise Help — Full device management', url: 'https://support.google.com/work/android/answer/9562029?hl=en' },
  pixel: { label: 'Dell Display Pixel Guidelines', url: 'https://www.dell.com/support/kbdoc/en-us/000126004/dell-display-pixel-guidelines' },
};

const RAW = [
  ['company-laptop-lot','รับซื้อโน้ตบุ๊กบริษัท-ขอนแก่น','รับซื้อโน้ตบุ๊กบริษัทเป็นล็อต',['bulk-buyout','notebook'],'บริษัทที่เปลี่ยนรอบโน้ตบุ๊กพนักงาน','Asset Tag, Serial, CPU, RAM, SSD, แบตและอะแดปเตอร์','Intune/Autopilot/Domain/MDM ต้องแยกสถานะก่อนส่งมอบ','เครื่องเช่า เครื่องติดระบบองค์กร และเครื่องขาดอะแดปเตอร์ต้องแยกจากเครื่องพร้อมใช้',['company-desktop-lot','company-monitor-lot','corporate-quotation-buyback'],['autopilot','nist']],
  ['company-desktop-lot','รับซื้อคอมบริษัท-ขอนแก่น','รับซื้อคอมบริษัทเป็นล็อต',['bulk-buyout','computer'],'สำนักงานที่เปลี่ยน Desktop หรือ Mini PC เป็นรอบ','Brand/Model หรือ CPU, RAM, SSD, GPU, Serial และอุปกรณ์ที่ขายพร้อมกัน','กำหนดว่าจะส่ง Storage พร้อมเครื่องหรือถอดออก และจัดการข้อมูลก่อนส่งมอบ','เครื่องที่ยังเป็น Server/Domain service หรือสเปกจริงไม่ตรงรายการต้องหยุดตรวจแยก',['company-laptop-lot','company-monitor-lot','office-it-clearance'],['autopilot','nist']],
  ['company-monitor-lot','รับซื้อจอคอมบริษัท-ขอนแก่น','รับซื้อจอคอมบริษัทเป็นล็อต',['bulk-buyout','monitor'],'สำนักงานที่เปลี่ยน Monitor หลายโต๊ะพร้อมกัน','Model Code, Serial, ขนาด, Resolution, พอร์ต, ขาตั้งและสายไฟ','แยก Dead Pixel, เส้น, รอยกด และจอขาดฐานออกจากจอปกติ','การนับแค่ขนาดจอโดยไม่รู้ Model ทำให้ประเมินคลาดเคลื่อนมาก',['company-desktop-lot','office-it-clearance','mixed-it-lot'],['pixel']],
  ['office-it-clearance','เคลียร์อุปกรณ์ไอทีสำนักงาน-ขอนแก่น','เคลียร์อุปกรณ์ไอทีสำนักงาน',['bulk-buyout','computer','monitor'],'สำนักงานที่ต้องเคลียร์ PC, Notebook, Monitor, Network และอุปกรณ์หลายหมวด','หมวดสินค้า, รุ่น, จำนวน, สภาพ, ของที่มี Storage และข้อจำกัดสถานที่','แบ่ง Resale / Parts / Data-bearing / ของนอกขอบเขตก่อนทำราคา','ทรัพย์สินเช่า อุปกรณ์ระบบสำคัญ และของที่ยังไม่มีผู้อนุมัติห้ามรวมในกองขาย',['office-relocation-it','business-closure-it','mixed-it-lot'],['nist']],
  ['office-relocation-it','รับซื้ออุปกรณ์ไอทีก่อนย้ายออฟฟิศ-ขอนแก่น','รับซื้ออุปกรณ์ไอทีก่อนย้ายออฟฟิศ',['bulk-buyout','computer','monitor'],'บริษัทที่ต้องแยก Keep / Sell / Review ก่อนวันย้าย','Asset Tag, สถานะ Keep/Sell, รุ่น, จำนวน, วันตัดระบบและข้อจำกัดลิฟต์/โหลดดิ้ง','Freeze รายการขายก่อนวันย้ายและให้ IT ปิดงานข้อมูลก่อนของออก','รายการที่เปลี่ยนตลอดหรือยังใช้งาน production ไม่ควรถูกขนออกเพียงเพราะถึงวันย้าย',['office-it-clearance','mixed-it-lot','corporate-quotation-buyback'],['nist']],
  ['business-closure-it','รับซื้อทรัพย์สินไอทีปิดกิจการ-ขอนแก่น','รับซื้อทรัพย์สินไอทีกรณีปิดกิจการ',['bulk-buyout','computer'],'ธุรกิจที่ปิดสาขาหรือยุติกิจการและต้องปิดรายการทรัพย์สิน','รายการทรัพย์สินที่ยืนยันสิทธิ์จำหน่าย, Serial, สถานะเช่า/เช่าซื้อ และผู้อนุมัติ','แยกของบริษัทออกจากของเช่า ของคู่สัญญา และของที่ยังมีภาระ','สิทธิ์ในทรัพย์สินไม่ชัดหรือไม่มีผู้มีอำนาจอนุมัติเป็นเหตุให้ยังไม่ควรส่งมอบ',['office-it-clearance','it-asset-disposal','obsolete-it-lot'],['nist']],
  ['school-computer-lot','รับซื้อคอมโรงเรียนยกล็อต-ขอนแก่น','รับซื้อคอมโรงเรียนเป็นล็อต',['bulk-buyout','computer'],'โรงเรียนหรือห้องคอมที่เปลี่ยนเครื่องชุดใหม่','จำนวน, CPU/RAM/Storage, Serial/Asset Tag, จอและอุปกรณ์ต่อพ่วง','ดูสเปกปัจจุบันแทนปีจัดซื้อ เพราะเครื่องอาจถูกซ่อมหรือสลับอะไหล่','ต้องผ่านขั้นตอนอนุมัติจำหน่ายของหน่วยงานและจัดการข้อมูลผู้ใช้ก่อนส่งมอบ',['university-device-lot','obsolete-it-lot','company-desktop-lot'],['nist']],
  ['university-device-lot','รับซื้ออุปกรณ์ไอทีมหาวิทยาลัย-ขอนแก่น','รับซื้ออุปกรณ์ไอทีมหาวิทยาลัย',['bulk-buyout','computer','notebook','ipad-tablet'],'มหาวิทยาลัย ห้องแล็บ หรือโครงการที่มีอุปกรณ์พ้นการใช้งาน','หน่วยงานเจ้าของ Asset, รุ่น, จำนวน, Serial และสถานะบัญชีองค์กร','แยกทรัพย์สินตามหน่วยงาน/โครงการและแยกอุปกรณ์เฉพาะทางจาก IT มาตรฐาน','ของที่ยังอยู่ภายใต้โครงการ เงื่อนไขทุน หรือมีข้อมูลวิจัยต้องเคลียร์ก่อน',['school-computer-lot','office-it-clearance','company-ipad-lot'],['nist','apple']],
  ['gaming-cafe-pc-lot','รับซื้อคอมร้านเกมยกล็อต-ขอนแก่น','รับซื้อคอมร้านเกมยกล็อต',['bulk-buyout','computer','gpu','monitor'],'ร้านเกมที่อัปเกรดสเปก ลดจำนวนเครื่อง หรือปิดกิจการ','CPU, GPU, RAM, SSD, PSU, Monitor Model/Hz และ Peripheral','แยก GPU/Monitor จากตัว PC และดูอุณหภูมิ พัดลม พอร์ต และประวัติซ่อม','อย่าฝืน Stress Test เครื่องที่มีหัวไฟไหม้ พัดลมเสีย หรือดับผิดปกติ',['company-desktop-lot','company-monitor-lot','business-closure-it'],['nist']],
  ['internet-cafe-equipment','รับซื้ออุปกรณ์ร้านอินเทอร์เน็ต-ขอนแก่น','รับซื้ออุปกรณ์ร้านอินเทอร์เน็ต',['bulk-buyout','computer','monitor'],'ร้านอินเทอร์เน็ตที่มี PC, Router, Switch, UPS, Printer และอุปกรณ์หน้าเคาน์เตอร์','PC/Monitor Model, Network Model, UPS/Printer และอุปกรณ์ที่เป็นของ ISP','แยก Network device ที่มี Config/Credential และคืนอุปกรณ์ ISP ที่ไม่ใช่ทรัพย์สินร้าน','อุปกรณ์เช่าจาก ISP, Config ที่ยังไม่สำรอง และ UPS แบตบวมต้องแยกออก',['retail-pos-lot','gaming-cafe-pc-lot','office-it-clearance'],['nist']],
  ['hotel-office-it','รับซื้ออุปกรณ์ไอทีโรงแรม-ขอนแก่น','รับซื้ออุปกรณ์ไอทีโรงแรม',['bulk-buyout','computer','monitor'],'โรงแรมที่เปลี่ยน Front/Back Office หรือรีโนเวตพื้นที่','แผนก, PC/Monitor Model, POS/Printer/Network และสถานะข้อมูลในเครื่อง','แยกเครื่องที่เกี่ยวกับ PMS/POS/ข้อมูลแขกออกจาก Office IT ทั่วไป','เครื่องที่ยังอยู่ในระบบบริการจริงหรือเป็นทรัพย์สิน Vendor ต้องไม่ถูกถอดรวม',['retail-pos-lot','office-it-clearance','company-desktop-lot'],['nist']],
  ['factory-office-it','รับซื้อคอมสำนักงานโรงงาน-ขอนแก่น','รับซื้อคอมและอุปกรณ์สำนักงานโรงงาน',['bulk-buyout','computer','monitor'],'โรงงานที่เปลี่ยน Office IT โดยไม่แตะระบบควบคุมการผลิต','แผนก, PC/Notebook/Monitor Model, Serial และระบุชัดว่าเป็น Office IT','แยก Office IT ออกจาก OT, HMI, PLC และ PC ที่ควบคุมเครื่องจักร','ห้ามถอดอุปกรณ์ Production/OT โดยไม่มีฝ่าย Engineering หรือ IT ยืนยัน',['company-desktop-lot','office-it-clearance','obsolete-it-lot'],['nist']],
  ['retail-pos-lot','รับซื้อคอม-pos-อุปกรณ์ร้านค้า-ขอนแก่น','รับซื้อคอม POS และอุปกรณ์ร้านค้า',['bulk-buyout','computer','monitor'],'ร้านค้าปลีกที่เปลี่ยน POS หรือปิดสาขา','POS Terminal, Touch Monitor, Scanner, Receipt Printer, Cash Drawer และ Adapter','แยก Hardware ที่ขายต่อได้จาก Software License, Account และของ Vendor','อุปกรณ์เช่า/ของ Vendor หรือระบบ POS ที่ยังใช้งานจริงต้องถอดออกจากรายการขาย',['internet-cafe-equipment','hotel-office-it','business-closure-it'],['nist']],
  ['company-phone-lot','รับซื้อมือถือบริษัท-ขอนแก่น','รับซื้อมือถือบริษัทเป็นล็อต',['bulk-buyout','smartphone','iphone'],'องค์กรที่เปลี่ยนมือถือพนักงานหรือมีเครื่องสำรองหลายรุ่น','Brand/Model/Storage, IMEI/Serial, สภาพจอ/แบต และสถานะ MDM/eSIM/SIM','แยก Android/iPhone และปลด MDM, FRP, Activation/บัญชีองค์กรก่อนส่งมอบ','เครื่องติด MDM/FRP/Activation Lock หรือยังติดสัญญาที่โอนไม่ได้ต้องแยกออก',['company-iphone-lot','company-ipad-lot','corporate-quotation-buyback'],['android','apple']],
  ['company-iphone-lot','รับซื้อ-iphone-บริษัท-ขอนแก่น','รับซื้อ iPhone บริษัทเป็นล็อต',['bulk-buyout','iphone'],'บริษัทที่เปลี่ยน iPhone พนักงานหลายรุ่นพร้อมกัน','รุ่น, ความจุ, Serial/IMEI, Battery Health, สภาพและ Find My/MDM','ตรวจ Find My, Activation Lock และ Apple Business/MDM แยกจากการ Factory Reset','รีเซ็ตเครื่องอย่างเดียวไม่พอหากยังถูกจัดการโดยองค์กรหรือ Activation Lock ยังอยู่',['company-phone-lot','company-ipad-lot','company-macbook-lot'],['apple']],
  ['company-ipad-lot','รับซื้อ-ipad-บริษัท-ขอนแก่น','รับซื้อ iPad บริษัทเป็นล็อต',['bulk-buyout','ipad-tablet'],'บริษัท สถาบัน หรือร้านค้าที่เลิกใช้ iPad เป็นเครื่องงาน/Kiosk','รุ่น/Generation/Storage, Wi-Fi/Cellular, Serial, MDM และ Keyboard/Pencil','แยก Wi-Fi/Cellular และจับคู่อุปกรณ์เสริม พร้อมปลด Apple Business/MDM','iPad ที่ยังติด Activation Lock/MDM หรืออุปกรณ์เสริมคนละ Asset ต้องไม่ปน',['company-iphone-lot','university-device-lot','company-phone-lot'],['apple']],
  ['company-macbook-lot','รับซื้อ-macbook-บริษัท-ขอนแก่น','รับซื้อ MacBook บริษัทเป็นล็อต',['bulk-buyout','macbook','notebook'],'บริษัทที่เปลี่ยน MacBook พนักงาน Creative/Developer หรือทีมงานหลายรุ่น','Chip/ปี, Memory, Storage, Serial, Battery, จอ/คีย์บอร์ด และ Adapter','แยก Intel กับ Apple silicon และปลด Find My/Activation Lock/MDM/Apple Business','Erase Mac โดยไม่ปลดระบบองค์กรอาจยังไม่ทำให้เครื่องพร้อมส่งมอบต่อ',['company-laptop-lot','company-iphone-lot','corporate-quotation-buyback'],['apple']],
  ['it-asset-disposal','รับซื้อทรัพย์สินไอทีเก่า-ขอนแก่น','รับซื้อทรัพย์สินไอทีเก่า',['bulk-buyout','computer'],'องค์กรที่มีคลัง IT เก่าและต้องแยกของมีมูลค่าจากของที่ต้องกำจัดเฉพาะ','ประเภท, รุ่น, จำนวน, สถานะ, Storage และของเสียหนัก/แบตบวม','แบ่ง Resale / Parts / Data-bearing / Non-resale ก่อนตัดสินใจ','การรับซื้อไม่เท่ากับรับกำจัด e-waste ทุกชนิด และของอันตรายต้องแยกขอบเขต',['obsolete-it-lot','office-it-clearance','mixed-it-lot'],['nist']],
  ['obsolete-it-lot','รับซื้ออุปกรณ์ไอทีตกรุ่นยกล็อต-ขอนแก่น','รับซื้ออุปกรณ์ไอทีตกรุ่นเป็นล็อต',['bulk-buyout','computer','notebook'],'องค์กรที่มี PC/Notebook หลาย Generation พ้นรอบใช้งาน','รุ่น/Generation, RAM/Storage, จำนวนและสถานะเปิดติด','แยกเครื่องที่ยังขายเป็นเครื่องได้จาก Parts และเครื่องไม่มี Storage','อย่าใช้คำว่าเก่าเป็นตัวตีราคาเพียงอย่างเดียว เพราะสเปกและอะไหล่ยังมีมูลค่าต่างกัน',['it-asset-disposal','school-computer-lot','inventory-clearance-it'],['nist']],
  ['mixed-it-lot','รับซื้อสินค้าไอทีหลายประเภท-ขอนแก่น','รับซื้อสินค้าไอทีหลายประเภทพร้อมกัน',['bulk-buyout','computer','notebook','monitor','smartphone'],'บริษัทที่มี PC, Notebook, Monitor, Phone และอุปกรณ์หลายหมวดปะปน','หมวดสินค้า, รุ่น/จำนวนของของมูลค่าสูง, สภาพ และสถานะข้อมูล/MDM','ทำรายการแยกหมวดก่อน แล้วค่อยรวมเป็นข้อเสนอเดียวหลังเห็นองค์ประกอบจริง','ภาพกองเดียวโดยไม่มีรายการทำให้ประเมินคลาดเคลื่อนและหาที่มาของมูลค่าไม่ได้',['office-it-clearance','inventory-clearance-it','corporate-quotation-buyback'],['nist','apple']],
  ['inventory-clearance-it','รับซื้อสต็อกอุปกรณ์ไอทีค้าง-ขอนแก่น','รับซื้อสต็อกอุปกรณ์ไอทีค้าง',['bulk-buyout','gadget','monitor'],'ร้าน/บริษัทที่มี Stock Aging, Demo, Open-box, Returned หรือ Defective','SKU/Model, จำนวน, สถานะ Sealed/Open-box/Demo/Used/Defective, Serial และประกัน','แยกสถานะสินค้าและสิทธิ์จำหน่ายก่อน เพราะของใหม่ค้างรุ่นไม่เหมือนทรัพย์สินใช้งาน','Consignment, ฝากขาย, Serial ผิดปกติ หรือของเสียปนของใหม่ต้องแยกก่อน',['obsolete-it-lot','mixed-it-lot','corporate-quotation-buyback'],['nist']],
  ['corporate-quotation-buyback','ใบเสนอราคารับซื้ออุปกรณ์ไอทีบริษัท-ขอนแก่น','ประเมินรับซื้อพร้อมใบเสนอราคาสำหรับบริษัท',['bulk-buyout'],'บริษัทที่ต้องใช้ใบเสนอราคาเพื่ออนุมัติการขายหรือเปรียบเทียบข้อเสนอ','ชื่อบริษัท/ผู้ติดต่อ, Asset List, จำนวน, สภาพ, จุดรับของ และรูปแบบเอกสาร','แยกราคาประเมินก่อนตรวจออกจากราคา Final หลังตรวจจริง และกำหนดเวอร์ชัน Asset List','อย่ารับรองราคาสุดท้ายก่อนเห็นสภาพจริงหรือเปลี่ยนรายการโดยไม่ทำ Revision',['company-laptop-lot','mixed-it-lot','office-it-clearance'],['nist']],
];

const HUB = {
  slug: 'hub-b2b', releaseBatch: 7, isHub: true,
  categorySlugs: ['bulk-buyout','computer','notebook','monitor','iphone','ipad-tablet','macbook'],
  seoTitle: 'รับซื้อยกล็อตและทรัพย์สินไอทีบริษัท ขอนแก่น | WINNER IT',
  metaDescription: 'ศูนย์รวมบริการรับซื้ออุปกรณ์ไอทีบริษัทในขอนแก่น ตั้งแต่ Notebook, PC, Monitor, Mobile fleet, เคลียร์ออฟฟิศ จนถึงใบเสนอราคาและ Asset List',
  intro: 'งานรับซื้อทรัพย์สินไอทีองค์กรควรเริ่มจากสิทธิ์ในทรัพย์สิน รายการ Asset และความรับผิดชอบด้านข้อมูล ก่อนลงรายละเอียดราคา Hub นี้รวมเส้นทางตามชนิดล็อตและสถานการณ์ธุรกิจ เพื่อให้ฝ่าย IT, บัญชีและผู้อนุมัติเลือก workflow ที่ตรงกับงานจริง.',
  suitableFor: ['บริษัทและสำนักงานที่เปลี่ยนอุปกรณ์เป็นรอบ','โรงเรียน มหาวิทยาลัย โรงแรม โรงงาน ร้านเกมและร้านค้า','งานย้ายออฟฟิศ ปิดสาขา หรือเคลียร์คลัง IT','งานที่ต้องใช้ Asset List, Serial และเอกสารธุรกรรม'],
  assetList: ['ประเภทสินค้าและจำนวน','รุ่น/สเปก/Serial หรือ Asset Tag ของรายการหลัก','สถานะปกติ/เสีย/ขาดอุปกรณ์','ผู้มีอำนาจอนุมัติและรูปแบบเอกสาร','แผนสำรอง/ลบข้อมูลและสถานะ MDM/บัญชีองค์กร'],
  grouping: ['แยกตามประเภทสินค้า','แยกตามสภาพและความพร้อมส่งมอบ','แยก Data-bearing device','แยกทรัพย์สินที่องค์กรไม่มีสิทธิ์จำหน่าย'],
  workflow: ['ส่ง Asset List หรือข้อมูลตั้งต้น','คัดกลุ่มและถามข้อมูลที่ขาด','ประเมินเบื้องต้นตามรายการ','นัดตรวจตามขนาดและข้อจำกัดพื้นที่','ยืนยันรายการ ราคา final และเอกสารก่อนส่งมอบ'],
  documents: ['ผู้ติดต่อ/ผู้อนุมัติ','Asset List เวอร์ชันที่ใช้อ้างอิง','รูปแบบใบเสนอราคา/เอกสารซื้อขาย','ผู้รับผิดชอบข้อมูลและระบบจัดการอุปกรณ์'],
  handover: ['สำรองและ sanitize ข้อมูลตามนโยบายองค์กร','ปลด MDM/Autopilot/Activation Lock ตามแพลตฟอร์ม','ตรวจ Serial/จำนวนจริง','แยกของเช่า/ของ Vendor/ของที่ยังติดสัญญา'],
  blockers: ['สิทธิ์ในทรัพย์สินไม่ชัด','ข้อมูลสำคัญยังไม่มีผู้รับผิดชอบ','อุปกรณ์ยังอยู่ในระบบองค์กรและส่งมอบต่อไม่ได้','รายการจริงต่างจากไฟล์ตั้งต้นโดยยังไม่ Revision'],
  faq: [
    ['ต้องมี Asset List ก่อนหรือไม่','ล็อตเล็กเริ่มจากรูปและจำนวนได้ แต่ล็อตองค์กรที่มีหลายรุ่นควรมี Asset List เพื่อให้ตรวจราคาและเอกสารย้อนหลังได้ง่าย'],
    ['ทำใบเสนอราคาได้ไหม','ทำได้ตามรายละเอียดธุรกรรมจริง ควรแจ้งข้อมูลบริษัท รายการ และรูปแบบเอกสารที่ต้องการก่อน'],
    ['รับของมีตำหนิปนในล็อตได้ไหม','ได้บางประเภท แต่ควรแยกสถานะปกติ/เสียเพื่อไม่ให้ราคาเครื่องปกติถูกเฉลี่ยรวม'],
    ['ใครควรรับผิดชอบข้อมูลในเครื่อง','องค์กรผู้ขายควรกำหนดเจ้าของงานด้าน backup, account removal และ media sanitization ตามนโยบายของตนก่อนส่งมอบ'],
  ],
  relatedSlugs: ['company-laptop-lot','company-desktop-lot','office-it-clearance','corporate-quotation-buyback'],
  sources: [SOURCES.nist, SOURCES.autopilot, SOURCES.apple],
};

function makeContent([slug,path,label,categorySlugs,audience,assetDetail,focus,blocker,relatedSlugs,sourceKeys]) {
  return {
    slug, path, label, releaseBatch: 7, categorySlugs,
    seoTitle: `${label} ขอนแก่น จัด Asset List ตรวจสภาพและเอกสารก่อนส่งมอบ | WINNER IT`,
    metaDescription: `${label}ในขอนแก่นสำหรับ${audience} เริ่มจาก ${assetDetail} แยกสภาพ ข้อมูล และเงื่อนไขส่งมอบก่อนประเมินล็อต`,
    intro: `${label}เหมาะกับ${audience} การทำราคาที่ตรวจสอบได้ควรเริ่มจาก ${assetDetail} ไม่ใช้จำนวนรวมอย่างเดียว จุดสำคัญของงานนี้คือ ${focus}.`,
    suitableFor: [audience, `งานที่ต้องตรวจ ${assetDetail}`, 'ล็อตที่มีหลายสภาพหรือหลายรุ่นและต้องการแยกราคาเป็นกลุ่ม', 'งานที่ฝ่าย IT/บัญชีต้องตรวจรายการและเอกสารก่อนของออก'],
    assetList: [assetDetail, 'จำนวนต่อกลุ่มและสถานะปกติ/เสีย/ขาดอุปกรณ์', 'Serial / Asset Tag ของรายการที่องค์กรใช้ตรวจทรัพย์สิน', 'ผู้ประสานงานและข้อจำกัดวันเวลา/สถานที่', 'สถานะข้อมูล บัญชีองค์กร หรือระบบจัดการอุปกรณ์ถ้ามี'],
    grouping: [`จัดกลุ่มจาก ${assetDetail}`, 'แยกเครื่องปกติจากเครื่องมีตำหนิหรืออะไหล่', 'แยกอุปกรณ์ที่มีข้อมูลหรือบัญชีองค์กร', 'แยกของที่พร้อมส่งมอบจากของที่ยังต้องอนุมัติ/ปลดระบบ'],
    workflow: ['ส่ง Asset List หรือข้อมูลตัวอย่างก่อน', 'คัดกลุ่มและถามเฉพาะข้อมูลที่มีผลต่อราคา/ความพร้อมส่งมอบ', 'ประเมินเบื้องต้นเป็นรายกลุ่ม', 'นัดตรวจสเปก สภาพ จำนวน และอุปกรณ์จริง', 'ยืนยันรายการ ราคา final เอกสาร และขอบเขตขนย้ายก่อนรับของ'],
    documents: ['ผู้มีอำนาจหรือผู้รับผิดชอบการจำหน่ายทรัพย์สิน', 'Asset List/Serial ที่ใช้อ้างอิงในธุรกรรม', 'รูปแบบใบเสนอราคา/เอกสารซื้อขายที่ฝ่ายบัญชีต้องการ', 'ผู้รับผิดชอบข้อมูลและระบบจัดการอุปกรณ์'],
    handover: [focus, 'สำรองและลบข้อมูลตามนโยบายองค์กรก่อนของออก', 'ตรวจ Serial/จำนวนและอุปกรณ์ประกอบให้ตรงรายการ', 'เก็บของเช่า ของ Vendor หรือทรัพย์สินที่ขายไม่ได้ออกจากล็อต'],
    blockers: [blocker, 'สิทธิ์ในทรัพย์สินหรือผู้อนุมัติยังไม่ชัด', 'ข้อมูล/บัญชี/MDM ยังทำให้ผู้ซื้อไม่สามารถรับช่วงอุปกรณ์ได้อย่างถูกต้อง', 'รายการจริงต่างจากข้อมูลตั้งต้นจนต้องประเมินใหม่'],
    faq: [
      ['ไม่มี Asset List เริ่มได้ไหม','ได้สำหรับการคัดกรองเบื้องต้น แต่ถ้าล็อตมีหลายรุ่นควรจัดรายการก่อนนัดเพื่อให้ราคาและเอกสารตรวจสอบได้'],
      ['ของเสียปนในล็อตได้ไหม','ได้บางประเภท แต่ควรแยกสถานะเพื่อให้เห็นต้นทุนและไม่เฉลี่ยปนกับของปกติ'],
      ['ต้องลบข้อมูลก่อนขายหรือไม่','องค์กรควรกำหนดการ backup, account removal และ media sanitization ตามความอ่อนไหวของข้อมูลก่อนส่งมอบ'],
      ['ราคาเบื้องต้นคือราคาสุดท้ายหรือไม่','ไม่ควรถือเป็น Final หากยังไม่ได้ตรวจสเปก สภาพ จำนวน และข้อจำกัดของล็อตจริง'],
    ],
    relatedSlugs,
    sources: sourceKeys.map((key) => SOURCES[key]).filter(Boolean),
  };
}

export const HIGH_INTENT_B2B_CONTENT = Object.freeze({
  'hub-b2b': HUB,
  ...Object.fromEntries(RAW.map((row) => [row[0], makeContent(row)])),
});
export const HIGH_INTENT_B2B_RELEASE_SLUGS = Object.freeze(RAW.map((row) => row[0]));
export const HIGH_INTENT_B2B_RELEASE_SET = new Set(HIGH_INTENT_B2B_RELEASE_SLUGS);

export function getHighIntentB2BContent(slugOrPage) {
  if (!slugOrPage) return null;
  const key = typeof slugOrPage === 'string'
    ? slugOrPage
    : slugOrPage.id === 'hub-b2b' ? 'hub-b2b' : (slugOrPage.slug || slugOrPage.id?.replace(/^b2b-/, ''));
  return HIGH_INTENT_B2B_CONTENT[key] || null;
}
