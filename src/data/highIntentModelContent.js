import { BATCH4_HIGH_INTENT_CONTENT } from './highIntentModelContentBatch4.js';
import { BATCH5_HIGH_INTENT_CONTENT } from './highIntentModelContentBatch5.js';
import { BATCH13_MODEL_CONTENT } from './highIntentModelContentBatch13.js';
import { BATCH14_MODEL_CONTENT } from './highIntentModelContentBatch14.js';
import { BATCH16B_MODEL_CONTENT } from './highIntentModelContentBatch16B.js';
import { BATCH16C_MODEL_CONTENT } from './highIntentModelContentBatch16C.js';
import { BATCH16D_MODEL_CONTENT } from './highIntentModelContentBatch16D.js';

export const HIGH_INTENT_MODEL_CONTENT = {
  'asus-rog-zephyrus-g14': {
    categorySlug: 'notebook', brandSlug: 'asus',
    seoTitle: 'รับซื้อ ASUS ROG Zephyrus G14 ขอนแก่น เช็ก GPU จอ OLED และประกัน | WINNER IT',
    metaDescription: 'รับซื้อ ASUS ROG Zephyrus G14 ขอนแก่น ประเมินตามรหัส GA402/GA403, CPU/GPU, จอ, RAM/SSD, อะแดปเตอร์และประกัน ส่งรูปกับสเปกเช็กราคาก่อนได้',
    intro: 'ROG Zephyrus G14 เป็นเกมมิ่งโน้ตบุ๊ก 14 นิ้วที่มีหลายปีและหลายสเปก ราคามือสองจึงต่างกันมากแม้ชื่อ G14 เหมือนกัน จุดแรกที่ต้องดูคือรหัสเครื่อง ปี รุ่น CPU/GPU และชนิดจอ ก่อนค่อยประเมินสภาพภายนอกและอุปกรณ์.',
    variantNotes: ['ส่งรหัสรุ่นเต็ม เช่น GA402 หรือ GA403 พร้อมปีเครื่อง เพราะสเปกเปลี่ยนหลาย generation', 'รุ่นใหม่บางชุดใช้จอ OLED ความละเอียดสูงและ RAM แบบออนบอร์ด จึงควรแจ้งความจุ RAM ตั้งแต่แรก', 'GPU Laptop คนละรุ่นและกำลังไฟให้มูลค่าต่างกัน ไม่ควรตีจากคำว่า “RTX” อย่างเดียว', 'อะแดปเตอร์แท้และประกันที่เหลือมีผลกับความมั่นใจในการขายต่อ'],
    inspection: ['เปิดหน้าข้อมูลเครื่องให้เห็น CPU, RAM, GPU และ SSD', 'ทดสอบจอพื้นขาว เทา ดำ เพื่อดู dead pixel, burn-in หรือรอยกด โดยเฉพาะรุ่น OLED', 'ฟังเสียงพัดลมและดูอุณหภูมิขณะโหลด ถ้าเคย repaste หรือแกะซ่อมให้แจ้ง', 'ตรวจ USB-C/USB4, HDMI, คีย์บอร์ด, touchpad และการชาร์จ', 'ถ่ายฝาบน ขอบเครื่อง มุมเครื่อง และอะแดปเตอร์ให้ครบ'],
    priceFactors: ['รหัสรุ่น/ปีและ CPU', 'รุ่น GPU Laptop', 'RAM/SSD โดยเฉพาะ RAM ออนบอร์ด', 'สภาพจอ OLED/IPS', 'อะแดปเตอร์แท้และประกัน', 'รอยบุบ/งอของตัวเครื่อง'],
    sellerChecklist: ['รูปสติกเกอร์ใต้เครื่องหรือ MyASUS ที่เห็น Model', 'รูป System Information หรือ Task Manager หน้า CPU/GPU/Memory', 'รูปจอเปิดพื้นสีอ่อนและพื้นดำ', 'รูปอะแดปเตอร์และหัวชาร์จ', 'แจ้งตำหนิ การแกะซ่อม และวันที่หมดประกันถ้าทราบ'],
    risks: ['อย่าเดารุ่น GPU จากชื่อซีรีส์ G14 เพราะแต่ละปีมีหลาย configuration', 'ถ้าจอ OLED มีเงาค้างหรือ burn-in ให้ถ่ายรูปตรง ๆ ไม่ปรับฟิลเตอร์', 'หากเครื่องดับหรือร้อนผิดปกติ ไม่ควร stress test ต่อเนื่องก่อนตรวจ'],
    faq: [
      ['G14 คนละปีแต่ชื่อเหมือนกัน ราคาต่างกันไหม', 'ต่างกันมาก ควรใช้รหัสรุ่น ปี CPU/GPU RAM/SSD และชนิดจอเป็นตัวแยกก่อนประเมิน'],
      ['RAM เพิ่มเองได้ทุก G14 ไหม', 'ไม่ทุกปี บาง generation มีหน่วยความจำออนบอร์ดหรือรูปแบบการอัปเกรดต่างกัน จึงควรส่งรหัสรุ่นเต็ม'],
      ['มีรอยที่ฝาหรือมุมเครื่องยังรับไหม', 'ส่งประเมินได้ ให้ถ่ายรอยชัด ๆ พร้อมภาพรวมทั้งเครื่องเพื่อดูผลต่อมูลค่า'],
      ['ไม่มีอะแดปเตอร์ขายได้ไหม', 'ส่งประเมินได้ แต่ต้องแจ้งก่อนเพราะอะแดปเตอร์กำลังสูงและหัวชาร์จที่ถูกต้องมีผลต่อราคาสุทธิ'],
    ],
    relatedSlugs: ['asus-tuf-gaming-a15', 'lenovo-legion-5', 'lenovo-loq-15'],
    source: { label: 'ASUS ROG Zephyrus G14 specifications', url: 'https://rog.asus.com/th/laptops/rog-zephyrus/rog-zephyrus-g14-2025/spec/' },
  },
  'asus-tuf-gaming-a15': {
    categorySlug: 'notebook', brandSlug: 'asus',
    seoTitle: 'รับซื้อ ASUS TUF Gaming A15 ขอนแก่น เช็ก FA506/FA507 และ RTX | WINNER IT',
    metaDescription: 'รับซื้อ ASUS TUF Gaming A15 ขอนแก่น รุ่น FA506/FA507 และรุ่นย่อยต่าง ๆ ประเมินตาม CPU, RTX, TGP, จอ, RAM/SSD, อะแดปเตอร์และสภาพจริง',
    intro: 'TUF Gaming A15 มีหลาย generation ตั้งแต่ชุด FA506 ถึง FA507 และแตกสเปกย่อยจำนวนมาก ทั้ง CPU, GPU, จอและอะแดปเตอร์ การประเมินที่แม่นจึงต้องเห็นรหัสรุ่นเต็ม ไม่ใช้ชื่อ A15 อย่างเดียว.',
    variantNotes: ['FA506 และ FA507 มีชุด CPU/GPU ต่างกันหลายปี', 'รุ่น RTX 4050/4060/4070 กับรุ่น RTX 20/30 Series มีมูลค่าคนละระดับ', 'จอ FHD 144Hz กับ QHD/165Hz มีต้นทุนและดีมานด์ต่างกัน', 'บางรุ่นรองรับ RAM และ M.2 หลายช่อง ควรแจ้งสเปกที่ติดตั้งจริง'],
    inspection: ['ตรวจรหัสรุ่นใต้เครื่องและหน้า MyASUS', 'เช็ก GPU ใน Task Manager/GPU-Z และดูว่าเครื่องมองเห็นการ์ดจอแยกปกติ', 'ทดสอบจอ 144/165Hz ว่าไม่มีเส้น กระพริบ หรือ dead pixel', 'เช็กพัดลม เสียง bearing และอุณหภูมิขณะใช้งาน', 'ตรวจคีย์บอร์ด พอร์ต LAN/HDMI/USB-C และอะแดปเตอร์'],
    priceFactors: ['CPU/GPU และ generation', 'จอและ refresh rate', 'RAM/SSD ที่ติดตั้งจริง', 'สภาพพัดลม/ความร้อน', 'อะแดปเตอร์แท้', 'ประกันและประวัติซ่อม'],
    sellerChecklist: ['รหัส FA506/FA507 เต็ม', 'รูป Task Manager หน้า CPU/GPU/Memory', 'รูปจอเปิดเครื่อง', 'รูปฝา/ฐาน/บานพับ', 'รูปอะแดปเตอร์และกำลังวัตต์'],
    risks: ['อย่าระบุแค่ “TUF A15 RTX” เพราะมีหลาย GPU และหลาย TGP', 'ถ้าบานพับตึงหรือฝาเริ่มแยกให้หยุดฝืนเปิดปิดและแจ้งก่อน', 'เครื่องที่เคยซ่อมบอร์ดควรแจ้งเพื่อประเมินความเสี่ยงตามจริง'],
    faq: [['FA506 กับ FA507 ต้องแยกราคาไหม', 'ควรแยก เพราะเป็นคนละช่วง generation และสเปกย่อยต่างกันมาก'], ['เพิ่ม RAM/SSD แล้วราคาดีขึ้นไหม', 'มีผล แต่ต้องดูยี่ห้อ ความจุ สุขภาพ SSD และว่าสเปกเพิ่มตรงกับตลาดหรือไม่'], ['คีย์บอร์ดบางปุ่มเสียรับไหม', 'ส่งประเมินได้ โดยแจ้งปุ่มที่เสียและถ่ายวิดีโอสั้นประกอบ'], ['อะแดปเตอร์เทียบใช้ได้ไหม', 'ใช้งานได้บางกรณี แต่ราคาประเมินอาจต่างจากชุดที่มีอะแดปเตอร์แท้กำลังตรงรุ่น']],
    relatedSlugs: ['asus-rog-zephyrus-g14', 'lenovo-legion-5', 'acer-nitro-v15'],
    source: { label: 'ASUS TUF Gaming A15 specifications', url: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2024/techspec/' },
  },
  'lenovo-legion-5': {
    categorySlug: 'notebook', brandSlug: 'lenovo',
    seoTitle: 'รับซื้อ Lenovo Legion 5 ขอนแก่น แยกรุ่น CPU GPU และจอ | WINNER IT',
    metaDescription: 'รับซื้อ Lenovo Legion 5 ขอนแก่น ประเมินตาม generation, CPU/GPU, จอ, RAM/SSD, Lenovo Vantage, อะแดปเตอร์และประกัน ส่งสเปกเช็กราคาได้ก่อน',
    intro: 'Legion 5 เป็นชื่อซีรีส์ที่ใช้ต่อเนื่องหลาย generation จึงต้องแยกปีและรหัสรุ่นก่อนประเมิน โดยเฉพาะ GPU Laptop, จอ และขนาดอะแดปเตอร์ที่ต่างกันตาม configuration.',
    variantNotes: ['มีทั้ง AMD และ Intel ในแต่ละช่วงปี', 'GPU ตั้งแต่ GTX/RTX รุ่นเก่าถึง RTX รุ่นใหม่ทำให้ราคาห่างกันมาก', 'จอความละเอียดและ refresh rate แตกต่างตาม SKU', 'Lenovo Vantage ช่วยยืนยันข้อมูลเครื่องและโหมดแบตได้บางส่วน'],
    inspection: ['เปิด Lenovo Vantage หรือ System Information', 'เช็กจอ พอร์ต USB-C/HDMI/LAN และคีย์บอร์ด', 'ดูสุขภาพแบตและการชาร์จ', 'ทดสอบพัดลมและอุณหภูมิขณะโหลด', 'ตรวจอะแดปเตอร์ว่าเป็นกำลังที่ตรงกับรุ่น'],
    priceFactors: ['generation และ CPU', 'GPU/TGP', 'จอ', 'RAM/SSD', 'แบต', 'อะแดปเตอร์/ประกัน'],
    sellerChecklist: ['รหัส MTM/Model ใต้เครื่อง', 'CPU/GPU/RAM/SSD', 'รูปจอและคีย์บอร์ด', 'รูปอะแดปเตอร์', 'แจ้งประวัติซ่อมหรือเปลี่ยนจอ/บอร์ด'],
    risks: ['ชื่อ Legion 5 อย่างเดียวไม่พอระบุสเปก', 'ถ้ามีอาการพอร์ตชาร์จหลวมหรือชาร์จตัด ให้แจ้งก่อนทดสอบหนัก', 'เครื่องที่ใช้โหมด performance ต่อเนื่องควรเช็กความร้อนและเสียงพัดลม'],
    faq: [['Legion 5 AMD กับ Intel ราคาต่างกันไหม', 'ต่างตาม generation และสเปกจริง ไม่ควรเทียบจาก CPU brand อย่างเดียว'], ['ไม่มี Lenovo Vantage ประเมินได้ไหม', 'ได้ ใช้ System Information, Task Manager และรูป Model แทนได้'], ['เปลี่ยน SSD เองมีผลไหม', 'แจ้งรุ่นและความจุ SSD ที่ใส่จริง รวมถึงสุขภาพถ้าตรวจได้'], ['อะแดปเตอร์หนักมากจำเป็นต้องมีไหม', 'ถ้ามีควรส่งพร้อมกัน เพราะกำลังวัตต์และหัวชาร์จตรงรุ่นมีผลกับการทดสอบและราคาชุด']],
    relatedSlugs: ['lenovo-loq-15', 'asus-tuf-gaming-a15', 'acer-nitro-v15'],
    source: { label: 'Lenovo Legion 5 product specifications', url: 'https://www.lenovo.com/th/en/p/len101g0045' },
  },
  'lenovo-loq-15': {
    categorySlug: 'notebook', brandSlug: 'lenovo',
    seoTitle: 'รับซื้อ Lenovo LOQ 15 ขอนแก่น ดูรหัสรุ่น RTX และอะแดปเตอร์ | WINNER IT',
    metaDescription: 'รับซื้อ Lenovo LOQ 15 ขอนแก่น ประเมินตามรหัสรุ่น CPU, RTX, จอ 144Hz, RAM/SSD, แบตและอะแดปเตอร์ ส่งรูป Model กับสเปกเช็กราคาได้',
    intro: 'LOQ 15 เป็นเกมมิ่งโน้ตบุ๊กช่วงกลางที่มีรหัสย่อยตามแพลตฟอร์มและปี เช่นกลุ่ม AMD/Intel แต่ละชุดอาจใช้ GPU, RAM, SSD และอะแดปเตอร์ต่างกัน จึงต้องยืนยันรหัสรุ่นก่อนเทียบราคา.',
    variantNotes: ['รหัสย่อยเช่น 15AHP/15IRX ช่วยระบุ platform และ generation', 'RTX 3050/4050/4060 หรือรุ่นอื่น ๆ ต้องดูจากเครื่องจริง', 'จอ 144Hz และคุณภาพ panel มีผลต่อความน่าใช้', 'อะแดปเตอร์บางชุดต่างกำลังกันตาม GPU'],
    inspection: ['ถ่ายรหัสรุ่นใต้เครื่อง', 'เปิด Task Manager เช็ก CPU/GPU/RAM', 'ทดสอบจอ 144Hz และพอร์ตภาพ', 'เช็กแบตและ Lenovo Vantage', 'ถ่ายอะแดปเตอร์ให้เห็นวัตต์'],
    priceFactors: ['รหัสรุ่นและปี', 'GPU Laptop', 'RAM/SSD', 'สภาพจอ', 'แบตและอะแดปเตอร์', 'ประกัน'],
    sellerChecklist: ['Model/MTM', 'ภาพ Task Manager', 'ภาพจอ', 'ภาพรอบตัวเครื่อง', 'ภาพอะแดปเตอร์'],
    risks: ['อย่าเทียบ LOQ 15 ทุกตัวราคาเดียวกัน', 'หากมีอาการดับ/รีสตาร์ตภายใต้โหลดให้แจ้งก่อน', 'อะแดปเตอร์กำลังไม่ตรงอาจทำให้ทดสอบ performance ไม่เต็ม'],
    faq: [['LOQ 15 ต่างจาก Legion 5 อย่างไรในการตีราคา', 'ให้ดูรุ่นย่อย สเปก จอ วัสดุ ประกันและตลาดของแต่ละเครื่อง ไม่ใช้ชื่อซีรีส์เป็นตัวเดียว'], ['RAM 16GB กับ 24/32GB มีผลไหม', 'มีผลแต่ไม่เท่ากับ GPU/CPU และสภาพเครื่อง ต้องดูเป็นภาพรวม'], ['ไม่มีประกันรับไหม', 'ส่งประเมินได้ โดยแจ้งสภาพและประวัติซ่อมตามจริง'], ['จอมีแสงรั่วรับไหม', 'ส่งภาพพื้นดำ/ความสว่างปกติมาประเมินระดับอาการก่อน']],
    relatedSlugs: ['lenovo-legion-5', 'asus-tuf-gaming-a15', 'acer-nitro-v15'],
    source: { label: 'Lenovo LOQ 15 specifications', url: 'https://www.lenovo.com/us/en/p/LEN101Q0008' },
  },
  'acer-nitro-v15': {
    categorySlug: 'notebook', brandSlug: 'acer',
    seoTitle: 'รับซื้อ Acer Nitro V 15 ขอนแก่น เช็ก ANV15 CPU RTX และจอ | WINNER IT',
    metaDescription: 'รับซื้อ Acer Nitro V 15 ขอนแก่น ประเมินตามรหัส ANV15, CPU/GPU, RAM/SSD, จอ, พัดลม, อะแดปเตอร์และประกัน ส่งรูปสเปกเช็กราคาได้',
    intro: 'Nitro V 15 มีหลายรหัส ANV15 และหลายชุด CPU/GPU การส่งชื่อ “Nitro V15” อย่างเดียวจึงยังไม่พอสำหรับตีราคา ควรแนบรหัสรุ่นเต็มและหน้าสเปกจาก Windows.',
    variantNotes: ['รหัส ANV15 ช่วยแยก platform และสเปก', 'GPU Laptop ต่างรุ่นส่งผลต่อราคามากกว่าความจุ SSD เพียงอย่างเดียว', 'จอ refresh rate และสีอาจต่างตาม SKU', 'Acer Care Center/Serial ช่วยตรวจข้อมูลประกันได้เมื่อข้อมูลยังอยู่'],
    inspection: ['เช็ก Model/Serial', 'เปิด Task Manager หน้า CPU/GPU/Memory', 'ทดสอบจอและคีย์บอร์ด', 'เช็กพัดลมและอุณหภูมิ', 'ตรวจบานพับ ฝาหลัง และอะแดปเตอร์'],
    priceFactors: ['CPU/GPU', 'RAM/SSD', 'จอ', 'บานพับ/ฝา', 'พัดลมและความร้อน', 'ประกัน'],
    sellerChecklist: ['Model ANV15 เต็ม', 'รูป System/Task Manager', 'รูปจอ', 'รูปบานพับสองข้าง', 'รูปอะแดปเตอร์'],
    risks: ['อย่าฝืนบานพับหากเริ่มมีเสียงหรือฝาแยก', 'ถ้าเครื่องเคยเข้าศูนย์หรือเปลี่ยนบอร์ดให้แจ้ง', 'หาก GPU หายจาก Device Manager ให้ถ่ายสถานะก่อนลงไดรเวอร์ใหม่หลายรอบ'],
    faq: [['Nitro V 15 กับ Nitro 5 เป็นรุ่นเดียวกันไหม', 'ไม่ควรเหมารวม ต้องดูรหัสเครื่องและ generation เพราะเป็นคนละกลุ่มย่อยได้'], ['SSD เพิ่มเองขายรวมได้ไหม', 'ได้ ให้แจ้งรุ่น ความจุ และสุขภาพ SSD'], ['มีรอยฝาหลังแต่ใช้งานปกติรับไหม', 'ส่งประเมินได้ ถ่ายภาพรอยและมุมเครื่องให้เห็นระดับชัดเจน'], ['พัดลมดังมีผลแค่ไหน', 'ขึ้นกับว่าเป็นเสียงลมปกติหรือ bearing/พัดลมผิดปกติ จึงควรส่งวิดีโอสั้น']],
    relatedSlugs: ['asus-tuf-gaming-a15', 'lenovo-loq-15', 'lenovo-legion-5'],
  },
  'dell-latitude-7440': {
    categorySlug: 'notebook', brandSlug: 'dell',
    seoTitle: 'รับซื้อ Dell Latitude 7440 ขอนแก่น i5/i7 vPro เครื่องบริษัท | WINNER IT',
    metaDescription: 'รับซื้อ Dell Latitude 7440 ขอนแก่น ประเมินตาม CPU 13th Gen, RAM/SSD, จอ, แบต, Service Tag, vPro/MDM และอะแดปเตอร์ เหมาะทั้งเครื่องเดี่ยวและบริษัท',
    intro: 'Latitude 7440 เป็นโน้ตบุ๊กธุรกิจที่มักมาจากองค์กร จึงมีจุดตรวจต่างจากโน้ตบุ๊กทั่วไป นอกจาก CPU/RAM/SSD ต้องดู Service Tag, สถานะ BIOS/MDM, asset tag, แบตและอะแดปเตอร์ รวมถึงรูปแบบตัวเครื่อง Laptop หรือ 2-in-1.',
    variantNotes: ['มี configuration และตัวถังหลายแบบ รวมถึงตัวเลือก 2-in-1/Ultralight ในบางตลาด', 'พอร์ต Thunderbolt 4 และ USB-C Power Delivery ควรทดสอบเพราะใช้ทั้งชาร์จและต่ออุปกรณ์', 'เครื่ององค์กรควรตรวจ BIOS password, Autopilot/MDM และบัญชีที่ผูกก่อนส่งมอบ', 'Service Tag ใช้ระบุเครื่องและตรวจข้อมูลบริการของ Dell'],
    inspection: ['ถ่าย Service Tag และหน้า BIOS/System Information', 'เช็ก USB-C/Thunderbolt, HDMI, USB-A, กล้องและไมค์', 'ดู Battery Health ใน BIOS หรือ Dell tools', 'ตรวจ BIOS password/asset tag และสถานะการจัดการองค์กร', 'เช็กคีย์บอร์ดภาษาและอะแดปเตอร์ USB-C'],
    priceFactors: ['CPU และ vPro', 'RAM/SSD', 'จอ/2-in-1', 'Battery Health', 'Service Tag/ประกัน', 'MDM/BIOS/Autopilot status', 'อะแดปเตอร์'],
    sellerChecklist: ['Service Tag', 'หน้า BIOS หรือ System Information', 'RAM/SSD', 'ภาพจอและตัวเครื่อง', 'สถานะบัญชี/MDM/BIOS', 'อะแดปเตอร์'],
    risks: ['เครื่องที่ยังติด MDM/Autopilot หรือ BIOS password ไม่ควรถูกส่งมอบก่อนปลดโดยเจ้าของสิทธิ์', 'อย่าส่งข้อมูลบัญชีองค์กรหรือรหัสผ่านในแชท', 'เครื่องล็อตบริษัทควรทำ Asset List แยก Serial/Service Tag ต่อเครื่อง'],
    faq: [['Latitude 7440 เครื่องบริษัทรับเป็นล็อตได้ไหม', 'ได้ ควรส่ง Asset List พร้อม Service Tag, สเปก, จำนวนและสถานะ MDM เพื่อประเมินเป็นระบบ'], ['คีย์บอร์ดอังกฤษมีผลไหม', 'มีผลต่อกลุ่มผู้ซื้อบางส่วนแต่ประเมินร่วมกับสเปกและสภาพทั้งหมด'], ['ติด BIOS password รับไหม', 'ต้องแจ้งก่อน และควรให้เจ้าของสิทธิ์ปลดก่อนส่งมอบ'], ['อะแดปเตอร์ Type-C ไม่แท้ขายได้ไหม', 'ส่งประเมินได้ แต่ควรระบุกำลังวัตต์และยี่ห้อ เพราะมีผลต่อชุดขายต่อ']],
    relatedSlugs: ['lenovo-legion-5', 'lenovo-loq-15'],
    source: { label: 'Dell Latitude 7440 Setup and Specifications', url: 'https://www.dell.com/support/manuals/en-us/latitude-14-7440-2-in-1-laptop/lati_7440_setupspecs/specifications-of-latitude-7440' },
  },
  'macbook-air-m1': {
    categorySlug: 'macbook',
    seoTitle: 'รับซื้อ MacBook Air M1 ขอนแก่น 8GB 16GB 256/512GB | WINNER IT',
    metaDescription: 'รับซื้อ MacBook Air M1 ขอนแก่น ประเมินตาม RAM/SSD, Battery Health, Cycle Count, จอ, คีย์บอร์ด, iCloud/Find My และอะแดปเตอร์ ส่ง About This Mac เช็กราคาได้',
    intro: 'MacBook Air M1 ปี 2020 ยังต้องแยกตาม RAM, SSD และสภาพแบตอย่างชัดเจน รุ่นภายนอกคล้ายกันมาก จึงควรส่ง About This Mac และ Battery Information มากกว่าดูจากสีหรือสภาพฝาเพียงอย่างเดียว.',
    variantNotes: ['ชิป M1 ใช้ CPU 8-core และมี configuration GPU ต่างกันตามรุ่น', 'RAM 8GB กับ 16GB และ SSD 256/512GB ขึ้นไปมีผลต่อมูลค่า', 'จอ Retina 13.3 นิ้วควรตรวจ dead pixel, รอยกดและคราบ coating', 'Find My ต้องปิดก่อนส่งมอบ'],
    inspection: ['About This Mac', 'Battery Health/Cycle Count', 'จอพื้นขาว/ดำ', 'คีย์บอร์ด Touch ID กล้อง ลำโพง และพอร์ต USB-C', 'Serial และอะแดปเตอร์'],
    priceFactors: ['RAM', 'SSD', 'Battery Health/Cycle Count', 'จอ/ตัวถัง', 'อะแดปเตอร์/กล่อง', 'ประกัน/ประวัติซ่อม'],
    sellerChecklist: ['About This Mac', 'Battery Information', 'รูปจอ', 'รูปคีย์บอร์ดและฝา', 'อุปกรณ์', 'สถานะ Find My'],
    risks: ['อย่ารีเซ็ตเครื่องก่อนสำรองข้อมูลสำคัญ', 'ควรปิด Find My และออก Apple ID ตอนพร้อมส่งมอบ ไม่ส่งรหัสผ่านให้ร้าน', 'ถ้าแบตบวมหรือฝาล่างโก่งควรหยุดใช้งานหนัก'],
    faq: [['8/256 กับ 16/512 ราคาต่างกันไหม', 'ต่าง เพราะ RAM และ SSD ของ MacBook รุ่นนี้ไม่ใช่อะไหล่ที่อัปเกรดภายหลังแบบทั่วไป'], ['แบตต่ำยังรับไหม', 'ส่งประเมินได้ โดยแจ้ง Battery Health และ Cycle Count'], ['คีย์บอร์ดอังกฤษรับไหม', 'รับประเมินได้ ให้ถ่ายคีย์บอร์ดชัด ๆ'], ['ไม่มีกล่องมีผลไหม', 'มีผลกับความครบชุด แต่สเปกและสภาพเครื่องยังเป็นปัจจัยหลัก']],
    relatedSlugs: ['macbook-air-m2', 'macbook-air-m3', 'macbook-pro-14-m1-pro'],
    source: { label: 'Apple MacBook Air (M1, 2020) technical specifications', url: 'https://support.apple.com/th-th/111883' },
  },
  'macbook-air-m2': {
    categorySlug: 'macbook',
    seoTitle: 'รับซื้อ MacBook Air M2 ขอนแก่น 8/256 8/512 16GB | WINNER IT',
    metaDescription: 'รับซื้อ MacBook Air M2 ขอนแก่น ประเมินตาม RAM/SSD, Battery Health, Cycle Count, จอ, สี/รอย, คีย์บอร์ดและ Find My ส่งข้อมูลเช็กราคาก่อนได้',
    intro: 'MacBook Air M2 เปลี่ยนดีไซน์จาก Air M1 และมีหลาย RAM/SSD โดยเฉพาะ 256GB กับ 512GB ที่ผู้ขายมักแจ้งไม่ครบ การประเมินควรเริ่มจาก About This Mac, Storage และ Battery Information ก่อนดูตำหนิภายนอก.',
    variantNotes: ['เปิดตัวปี 2022 พร้อมชิป M2', 'มี SSD และหน่วยความจำหลาย configuration', 'สี Midnight เห็นรอยนิ้วและรอยขนแมวง่าย จึงควรถ่ายภายใต้แสงตรง', 'MagSafe และ USB-C รวมถึงอะแดปเตอร์ควรตรวจพร้อมกัน'],
    inspection: ['About This Mac/Storage', 'Battery Health/Cycle Count', 'จอและขอบจอ', 'MagSafe/USB-C/คีย์บอร์ด/Touch ID', 'รอยฝา มุมและฐาน โดยเฉพาะสีเข้ม'],
    priceFactors: ['RAM/SSD', 'Battery Health', 'จอ', 'รอยตัวถัง', 'อะแดปเตอร์/สาย MagSafe', 'Find My/ประกัน'],
    sellerChecklist: ['About This Mac', 'Storage', 'Battery Information', 'รูปจอ', 'รูปตัวเครื่องทุกด้าน', 'อะแดปเตอร์/กล่อง'],
    risks: ['Find My ต้องปลดก่อนส่งมอบ', 'จุดตำหนิบนจอควรถ่ายพื้นสีอ่อนหลายมุมเพื่อแยกรอยบนผิวกับ pixel', 'หากเครื่องเคยเปลี่ยนจอ/บอร์ดควรแจ้ง'],
    faq: [['8/256 กับ 8/512 ต่างราคาไหม', 'ต่างตามความจุ SSD และตลาดของ configuration นั้น'], ['มีจุดที่จอรับไหม', 'ส่งประเมินได้ ให้ถ่ายจอพื้นขาว/เทาและบอกว่ามองเห็นตอนใช้งานจริงแค่ไหน'], ['ไม่มีหัวชาร์จแต่มีสาย MagSafe ได้ไหม', 'ส่งประเมินได้ แต่แจ้งอุปกรณ์ที่มีจริงเพื่อประเมินครบชุด'], ['Battery Health 80 กว่าเปอร์เซ็นต์รับไหม', 'รับประเมินได้ ราคาจะดูร่วมกับ cycle, อาการแบตและสภาพโดยรวม']],
    relatedSlugs: ['macbook-air-m1', 'macbook-air-m3', 'macbook-pro-14-m1-pro'],
    source: { label: 'Apple MacBook Air (M2, 2022) technical specifications', url: 'https://support.apple.com/th-th/111867' },
  },
  'macbook-air-m3': {
    categorySlug: 'macbook',
    seoTitle: 'รับซื้อ MacBook Air M3 ขอนแก่น เช็ก RAM SSD แบตและประกัน | WINNER IT',
    metaDescription: 'รับซื้อ MacBook Air M3 ขอนแก่น ประเมินตาม RAM/SSD, ขนาดจอ, Battery Health, Cycle Count, สภาพจอ/ตัวถัง, Find My และประกัน',
    intro: 'MacBook Air M3 มีทั้งความจุและหน่วยความจำหลายชุด และอาจพบทั้งขนาดจอที่ต่างกันตามรุ่น การส่งข้อมูลครบตั้งแต่ชิป RAM SSD ขนาดจอ และ Battery Health ช่วยแยกมูลค่าได้ดีกว่าการแจ้งเพียง “Air M3”.',
    variantNotes: ['ต้องแยกขนาดจอและ configuration RAM/SSD', 'เครื่องที่ยังมีประกันหรือ AppleCare ควรแจ้งวันหมด', 'พอร์ต MagSafe/USB-C และสภาพสายชาร์จมีผลต่อความครบชุด', 'สีและผิวตัวถังควรถ่ายในแสงธรรมชาติ'],
    inspection: ['About This Mac', 'Storage', 'Battery Health/Cycle Count', 'จอ/คีย์บอร์ด/Touch ID', 'MagSafe/USB-C', 'Serial/ประกัน'],
    priceFactors: ['ขนาดจอ', 'RAM/SSD', 'Battery Health', 'ประกัน', 'สภาพจอ/ตัวถัง', 'อุปกรณ์ครบ'],
    sellerChecklist: ['ภาพ About This Mac', 'Battery Information', 'รูปจอ', 'รูปตัวเครื่องทุกด้าน', 'กล่อง/อะแดปเตอร์ถ้ามี'],
    risks: ['อย่าส่งรหัส Apple ID', 'ก่อนส่งมอบต้องสำรองข้อมูลและปิด Find My', 'ถ้ามี Liquid Contact หรือเคยซ่อมจากของเหลวควรแจ้งตรง ๆ'],
    faq: [['Air M3 ต้องดูขนาดจอด้วยไหม', 'ต้องดู เพราะขนาดและ configuration มีผลต่อมูลค่า'], ['RAM 16GB ขึ้นไปมีผลไหม', 'มี เพราะหน่วยความจำถูกกำหนดจากโรงงานและเปลี่ยนภายหลังไม่ได้แบบ RAM โน้ตบุ๊กทั่วไป'], ['ประกันเหลือช่วยราคาไหม', 'ช่วยด้านความมั่นใจและอาจมีผลต่อราคาประเมินเมื่อสถานะตรวจสอบได้'], ['จอมีรอยจากคีย์บอร์ดรับไหม', 'ส่งภาพตรงแสงและพื้นขาวมาได้ เพื่อแยกระดับรอยและผลต่อการใช้งาน']],
    relatedSlugs: ['macbook-air-m2', 'macbook-air-m1', 'macbook-pro-14-m1-pro'],
  },
  'macbook-pro-14-m1-pro': {
    categorySlug: 'macbook',
    seoTitle: 'รับซื้อ MacBook Pro 14 M1 Pro ขอนแก่น RAM SSD แบต | WINNER IT',
    metaDescription: 'รับซื้อ MacBook Pro 14 นิ้ว M1 Pro ขอนแก่น ประเมินตาม CPU/GPU configuration, RAM/SSD, Battery Health, จอ Liquid Retina XDR, อะแดปเตอร์และสภาพ',
    intro: 'MacBook Pro 14 นิ้วปี 2021 มีทั้ง M1 Pro และ configuration ที่ต่างกัน รวมถึง RAM/SSD หลายระดับ จึงไม่ควรใช้ราคาเดียวกับคำว่า “M1 Pro 14” โดยไม่เห็น About This Mac และสเปกหน่วยความจำ.',
    variantNotes: ['รุ่น 14 นิ้วปี 2021 มี configuration M1 Pro และ M1 Max บางชุด', 'RAM และ SSD มีผลต่อราคามากเพราะอัปเกรดภายหลังไม่ได้', 'จอ Liquid Retina XDR/ProMotion มีต้นทุนสูง ต้องตรวจ pixel, รอยกดและ backlight', 'MagSafe 3, HDMI และ SD card slot ควรทดสอบ'],
    inspection: ['About This Mac ให้เห็น chip/RAM', 'Storage', 'Battery Health/Cycle Count', 'จอพื้นขาว/ดำและปรับความสว่าง', 'พอร์ต MagSafe/HDMI/SD/USB-C', 'อะแดปเตอร์กำลังตรงชุด'],
    priceFactors: ['M1 Pro/M1 Max configuration', 'RAM/SSD', 'Battery Health', 'จอ', 'อะแดปเตอร์', 'ประกัน/ประวัติซ่อม'],
    sellerChecklist: ['About This Mac', 'Storage', 'Battery Information', 'รูปจอ', 'รูปพอร์ต/ตัวถัง', 'อะแดปเตอร์และสาย'],
    risks: ['จอของรุ่นนี้มีมูลค่าสูง จุดเสียเล็ก ๆ จึงควรถ่ายชัด', 'อย่าใช้สารทำความสะอาดแรงกับจอ', 'ต้องปิด Find My ก่อนส่งมอบ'],
    faq: [['M1 Pro 8-core กับ 10-core ต้องแยกไหม', 'ควรแยก configuration เพราะ CPU/GPU และมูลค่าต่างกัน'], ['RAM 16GB กับ 32GB มีผลมากไหม', 'มีผลชัดในกลุ่มเครื่องงานโปร โดยต้องดู SSD และสภาพร่วมกัน'], ['จอมีจุดสว่างรับไหม', 'ส่งประเมินได้ แต่ต้องถ่ายพื้นดำ/เทาและระบุตำแหน่ง'], ['ไม่มี MagSafe แต่ชาร์จ USB-C ได้รับไหม', 'ประเมินได้ แต่ความครบชุดและอะแดปเตอร์มีผลต่อราคาสุทธิ']],
    relatedSlugs: ['macbook-air-m3', 'macbook-air-m2', 'macbook-air-m1'],
    source: { label: 'Apple MacBook Pro 14-inch (2021) technical specifications', url: 'https://support.apple.com/en-us/111902' },
  },
  'iphone-13': {
    categorySlug: 'iphone',
    seoTitle: 'รับซื้อ iPhone 13 ขอนแก่น 128 256 512GB เช็กแบตและจอ | WINNER IT',
    metaDescription: 'รับซื้อ iPhone 13 ขอนแก่น 128/256/512GB ประเมินตาม Battery Health, จอ OLED, Face ID, กล้อง, ตัวเครื่อง, Find My และประวัติซ่อม ส่งรูปเช็กราคาได้',
    intro: 'iPhone 13 ต้องแยกความจุ 128/256/512GB และตรวจ Battery Health, Face ID, จอ OLED, กล้องกับประวัติเปลี่ยนอะไหล่ก่อนตีราคา สีและกล่องมีผลน้อยกว่าสถานะระบบกับสภาพเครื่องจริง.',
    variantNotes: ['เปิดตัวปี 2021 มีความจุ 128GB, 256GB และ 512GB', 'จอ Super Retina XDR OLED ควรตรวจ burn-in, เส้น, จุดดำและ True Tone', 'Battery Health และข้อความเกี่ยวกับอะไหล่ใน Settings มีผลต่อการประเมิน', 'Find My ต้องปิดก่อนส่งมอบ'],
    inspection: ['Settings > General > About', 'Battery Health', 'Parts and Service History ถ้ามี', 'Face ID/กล้องหน้า-หลัง/ไมค์/ลำโพง', 'จอพื้นขาวและตัวเครื่องทุกด้าน'],
    priceFactors: ['ความจุ', 'Battery Health', 'จอ/Face ID', 'ประวัติอะไหล่', 'สภาพฝาหลัง/กรอบ', 'กล่อง/อุปกรณ์'],
    sellerChecklist: ['About', 'Battery Health', 'Parts and Service History', 'รูปจอ', 'รูปกรอบ/ฝาหลัง', 'สถานะ Find My'],
    risks: ['อย่าส่ง Apple ID password หรือรหัสปลดล็อกในแชท', 'สำรองข้อมูลก่อนลบเครื่อง', 'เครื่องที่ขึ้น Unknown Part ควรส่งภาพสถานะตรง ๆ'],
    faq: [['iPhone 13 128 กับ 256GB ต่างราคาไหม', 'ต่างตามความจุและสภาพ โดย 256/512GB มีต้นทุนเดิมสูงกว่า'], ['แบต 80% ต้น ๆ รับไหม', 'ส่งประเมินได้ โดยแจ้งเปอร์เซ็นต์จริงและอาการแบต'], ['เปลี่ยนจอมาแล้วรับไหม', 'รับประเมินได้ แต่ต้องแจ้งชนิดอะไหล่และสถานะ Parts and Service History ถ้ามี'], ['Face ID ใช้ไม่ได้มีผลไหม', 'มีผลค่อนข้างมากเพราะเป็นฟังก์ชันหลัก ควรแจ้งก่อนประเมิน']],
    relatedSlugs: ['iphone-14', 'iphone-15-pro-max', 'iphone-16-pro-max'],
    source: { label: 'Apple iPhone 13 technical specifications', url: 'https://support.apple.com/th-th/111872' },
  },
  'iphone-14': {
    categorySlug: 'iphone',
    seoTitle: 'รับซื้อ iPhone 14 ขอนแก่น 128 256 512GB เช็กแบต Face ID | WINNER IT',
    metaDescription: 'รับซื้อ iPhone 14 ขอนแก่น 128/256/512GB ประเมินตาม Battery Health, จอ OLED, Face ID, กล้อง, Parts History, Find My และสภาพตัวเครื่อง',
    intro: 'iPhone 14 ภายนอกใกล้กับ iPhone 13 แต่ราคาและอะไหล่ไม่ควรถูกเหมารวม การประเมินควรยืนยัน Model, ความจุ, Battery Health, Parts and Service History และทดสอบ Face ID/กล้อง/จอ.',
    variantNotes: ['เปิดตัวปี 2022 มีความจุ 128/256/512GB', 'จอ OLED 6.1 นิ้วควรตรวจเส้น จุดดำ burn-in และ True Tone', 'สถานะอะไหล่และการซ่อมมีผลต่อความมั่นใจ', 'สีไม่ใช่ปัจจัยหลักเมื่อเทียบกับสภาพและความจุ'],
    inspection: ['About/Model Number/Capacity', 'Battery Health', 'Parts and Service History', 'Face ID/กล้อง/ลำโพง/ไมค์', 'จอและกรอบเครื่อง'],
    priceFactors: ['ความจุ', 'แบต', 'จอ/Face ID', 'ประวัติซ่อม', 'สภาพตัวถัง', 'ประกัน/อุปกรณ์'],
    sellerChecklist: ['About', 'Battery Health', 'Parts History', 'รูปจอ', 'รูปฝาหลัง/ขอบ', 'Find My status'],
    risks: ['หากจอขึ้นเตือนอะไหล่ควรแจ้งตามจริง', 'ฝาหลังแตกอาจมีผลต่อการกันน้ำและต้นทุนซ่อม', 'ก่อนรีเซ็ตควรสำรองข้อมูลและออกจาก Find My'],
    faq: [['iPhone 14 ไม่มีรอยแต่แบตต่ำราคาลงไหม', 'แบตเป็นหนึ่งในปัจจัย ต้องดูร่วมกับความจุ จอ Face ID และประวัติซ่อม'], ['ฝาหลังแตกยังรับไหม', 'ส่งประเมินได้ ให้ถ่ายรอยชัดและแจ้งกล้อง/ชาร์จไร้สายว่ายังปกติหรือไม่'], ['เครื่องนอกประเมินได้ไหม', 'ต้องดู Model/สถานะเครือข่าย/ประกันและการใช้งานในไทยเป็นรายเครื่อง'], ['ไม่มีกล่องรับไหม', 'รับประเมินได้ กล่องเป็นองค์ประกอบความครบชุด ไม่ใช่ปัจจัยเดียว']],
    relatedSlugs: ['iphone-13', 'iphone-15-pro-max', 'iphone-16-pro-max'],
    source: { label: 'Apple iPhone 14 technical specifications', url: 'https://support.apple.com/th-th/111850' },
  },
  'iphone-15-pro-max': {
    categorySlug: 'iphone',
    seoTitle: 'รับซื้อ iPhone 15 Pro Max ขอนแก่น 256GB 512GB 1TB | WINNER IT',
    metaDescription: 'รับซื้อ iPhone 15 Pro Max ขอนแก่น 256GB/512GB/1TB ประเมินตาม Battery Health, จอ ProMotion, Face ID, กล้อง 5x, USB-C, ตัวถังไทเทเนียมและประวัติซ่อม',
    intro: 'iPhone 15 Pro Max เป็นรุ่นมูลค่าสูงที่ควรตรวจมากกว่ารอยภายนอก ทั้งจอ ProMotion, Face ID, ชุดกล้อง, USB-C, Battery Health และ Parts and Service History รวมถึงขอบไทเทเนียมและกระจกหลัง.',
    variantNotes: ['เปิดตัวปี 2023 เริ่มที่ 256GB และมี 512GB/1TB', 'จอ 6.7 นิ้ว ProMotion 120Hz ต้องตรวจเส้น/จุด/สัมผัส', 'กล้อง Telephoto 5x และระบบกันสั่นควรทดสอบ', 'พอร์ต USB-C เปลี่ยนจาก Lightning จึงควรทดสอบชาร์จและรับส่งข้อมูล'],
    inspection: ['About/Capacity', 'Battery Health/Cycle ถ้าระบบแสดง', 'Parts and Service History', 'Face ID และกล้องทุกระยะ', 'จอ 120Hz/สัมผัส', 'USB-C และตัวถังไทเทเนียม'],
    priceFactors: ['ความจุ', 'Battery Health', 'จอ', 'Face ID/กล้อง', 'Parts History', 'สภาพไทเทเนียม/กระจกหลัง', 'ประกัน'],
    sellerChecklist: ['About', 'Battery', 'Parts History', 'รูปจอ', 'รูปขอบ/ฝาหลัง', 'ทดสอบกล้องและ USB-C'],
    risks: ['กล้องหรือ Face ID ผิดปกติมีผลสูง ควรแจ้งก่อน', 'รอยบุบที่กรอบใกล้จอ/กระจกหลังควรถ่ายหลายมุม', 'ปิด Find My ก่อนส่งมอบโดยไม่ส่งรหัสผ่าน'],
    faq: [['256GB กับ 1TB ราคาต่างกันมากไหม', 'ความจุมีผลชัด แต่ต้องดูแบต สภาพและประวัติซ่อมร่วมกัน'], ['กล้อง 5x สั่นรับไหม', 'ส่งประเมินได้ แต่ควรส่งวิดีโอการเปลี่ยนเลนส์และอาการ'], ['USB-C ชาร์จได้แต่ต่อคอมไม่ได้มีผลไหม', 'มีผลเพราะพอร์ตควรทำงานครบ ควรแจ้งอาการก่อน'], ['ขอบไทเทเนียมมีรอยรับไหม', 'รับประเมินได้ โดยดูความลึกของรอยและว่ามีการบิด/บุบหรือไม่']],
    relatedSlugs: ['iphone-16-pro-max', 'iphone-14', 'iphone-13'],
    source: { label: 'Apple iPhone 15 Pro Max technical specifications', url: 'https://support.apple.com/th-th/111828' },
  },
  'iphone-16-pro-max': {
    categorySlug: 'iphone',
    seoTitle: 'รับซื้อ iPhone 16 Pro Max ขอนแก่น 256GB 512GB 1TB | WINNER IT',
    metaDescription: 'รับซื้อ iPhone 16 Pro Max ขอนแก่น ประเมินตามความจุ, Battery Health, จอ 6.9 นิ้ว ProMotion, Face ID, กล้อง, Camera Control, USB-C และสภาพไทเทเนียม',
    intro: 'iPhone 16 Pro Max เป็นรุ่นมูลค่าสูง ควรยืนยันความจุและตรวจฟังก์ชันหลักครบก่อนประเมิน ได้แก่จอ ProMotion, Face ID, กล้อง, USB-C, ปุ่มและ Camera Control รวมถึง Battery Health และประวัติอะไหล่.',
    variantNotes: ['เปิดตัวปี 2024 มีความจุ 256GB/512GB/1TB', 'จอ 6.9 นิ้ว OLED ProMotion 120Hz', 'ตัวถังไทเทเนียมและกระจกหลังควรตรวจรอยบุบ/แตก', 'ฟังก์ชันกล้องและ Camera Control ควรทดสอบจริง'],
    inspection: ['About/Capacity', 'Battery Health', 'Parts and Service History', 'จอ/Face ID', 'กล้องทุกระยะและ Camera Control', 'USB-C/ลำโพง/ไมค์', 'ตัวถังทุกมุม'],
    priceFactors: ['ความจุ', 'แบต', 'จอ/Face ID', 'กล้อง/ปุ่ม', 'Parts History', 'สภาพตัวถัง', 'ประกัน'],
    sellerChecklist: ['About', 'Battery', 'Parts History', 'รูปจอ', 'รูปขอบ/ฝาหลัง', 'วิดีโอทดสอบกล้องถ้ามีอาการ'],
    risks: ['ไม่ควรใช้ราคาอ้างอิงจากรุ่น Pro Max คนละ generation โดยไม่ดูตลาดปัจจุบัน', 'เครื่องซ่อมมาควรแจ้งอะไหล่ที่เปลี่ยน', 'ปิด Find My ก่อนส่งมอบและไม่ส่งรหัสบัญชี'],
    faq: [['iPhone 16 Pro Max 256 กับ 512GB ต่างราคาไหม', 'ต่างตามความจุและสภาพตลาด แต่ต้องดูแบต/จอ/กล้องร่วมกัน'], ['Camera Control ใช้ไม่ได้มีผลไหม', 'มีผลเพราะเป็นส่วนควบคุมของเครื่อง ควรแจ้งอาการก่อน'], ['ประกันเหลือช่วยไหม', 'สถานะประกันที่ตรวจสอบได้ช่วยเพิ่มความมั่นใจในการรับซื้อ'], ['มีรอยที่ขอบแต่จอสวยรับไหม', 'รับประเมินได้ ให้ถ่ายรอยทุกมุมเพื่อดูว่าเป็นรอยผิวหรือบุบลึก']],
    relatedSlugs: ['iphone-15-pro-max', 'iphone-14', 'iphone-13'],
    source: { label: 'Apple iPhone 16 Pro Max technical specifications', url: 'https://support.apple.com/en-us/121032' },
  },
  'ipad-gen-10': {
    categorySlug: 'ipad-tablet',
    seoTitle: 'รับซื้อ iPad Gen 10 ขอนแก่น Wi‑Fi Cellular 64/256GB | WINNER IT',
    metaDescription: 'รับซื้อ iPad Gen 10 ขอนแก่น Wi‑Fi/Cellular 64GB 256GB ประเมินตามจอ, ตัวเครื่องงอ, แบต, Touch ID, USB-C, iCloud และอุปกรณ์เสริม',
    intro: 'iPad Gen 10 ต้องแยก Wi‑Fi/Cellular และความจุ รวมถึงตรวจจอ ตัวเครื่องงอ Touch ID, USB-C และสถานะ iCloud ก่อนประเมิน อุปกรณ์อย่างเคสหรือปากกาควรแจ้งรุ่นให้ชัดว่าเป็นของแท้และเข้ากันได้กับเครื่องหรือไม่.',
    variantNotes: ['แยก Wi‑Fi กับ Cellular', 'ความจุมีผลต่อมูลค่า', 'ใช้พอร์ต USB-C', 'จอและกรอบบางจุดอาจงอจากแรงกด ควรถ่ายแนวขอบเครื่อง'],
    inspection: ['Settings > General > About', 'จอพื้นขาว/สีเทาและระบบสัมผัส', 'Touch ID/กล้อง/ลำโพง', 'USB-C', 'ขอบเครื่องจากด้านข้าง', 'iCloud/Find My'],
    priceFactors: ['Wi‑Fi/Cellular', 'ความจุ', 'จอ/Touch', 'ตัวเครื่องงอ', 'แบต/การชาร์จ', 'อุปกรณ์เสริม'],
    sellerChecklist: ['About', 'รูปจอ', 'รูปขอบเครื่อง', 'อุปกรณ์เสริม', 'สถานะ Find My'],
    risks: ['อย่าฝืนดัดเครื่องที่งอ', 'ปิด Find My ก่อนส่งมอบ', 'หากพอร์ตชาร์จหลวมหรือชาร์จช้าให้แจ้ง'],
    faq: [['Cellular ต่างราคาไหม', 'โดยทั่วไป configuration Cellular มีมูลค่าต่างจาก Wi‑Fi แต่ต้องดูสภาพและความจุร่วมกัน'], ['มีปากกาขายรวมได้ไหม', 'ได้ ให้แจ้งรุ่นปากกาและสถานะแบต/การจับคู่'], ['จอมีรอยแต่ทัชปกติรับไหม', 'ส่งภาพรอยบนพื้นสีอ่อนเพื่อประเมินระดับ'], ['เครื่องงอนิดหน่อยรับไหม', 'ส่งประเมินได้ แต่ควรถ่ายแนวขอบจากหลายด้านและไม่ดัดเอง']],
    relatedSlugs: ['ipad-air-5', 'ipad-pro-m1-11'],
  },
  'ipad-air-5': {
    categorySlug: 'ipad-tablet',
    seoTitle: 'รับซื้อ iPad Air 5 ขอนแก่น M1 Wi‑Fi Cellular 64/256GB | WINNER IT',
    metaDescription: 'รับซื้อ iPad Air 5 ขอนแก่น ชิป M1 Wi‑Fi/Cellular 64/256GB ประเมินตามจอ, ตัวเครื่องงอ, Touch ID, USB-C, iCloud และ Apple Pencil/Keyboard',
    intro: 'iPad Air 5 ใช้ชิป M1 และมีทั้ง Wi‑Fi/Cellular การประเมินควรดูความจุ จอ สภาพตัวเครื่อง Touch ID, USB-C และอุปกรณ์เสริม เช่น Apple Pencil หรือ Keyboard โดยแยกของแท้และรุ่นที่รองรับ.',
    variantNotes: ['ชิป M1 ทำให้รุ่นนี้ต่างจาก Air 4 อย่างชัดเจน', 'Wi‑Fi/Cellular และ 64/256GB ต้องแยก', 'ตัวเครื่องบางควรตรวจการงอ', 'Touch ID อยู่ที่ปุ่มด้านบน'],
    inspection: ['About/Capacity', 'จอและสัมผัส', 'Touch ID', 'USB-C', 'ขอบเครื่อง/กล้อง', 'Apple Pencil/Keyboard ถ้ามี'],
    priceFactors: ['ความจุ', 'Wi‑Fi/Cellular', 'จอ/ทัช', 'ตัวเครื่อง', 'อุปกรณ์เสริม', 'iCloud/ประกัน'],
    sellerChecklist: ['About', 'รูปจอ', 'รูปขอบ', 'อุปกรณ์', 'Find My status'],
    risks: ['เครื่องงอไม่ควรดัดเอง', 'ปากกาหรือคีย์บอร์ดควรแจ้ง serial/รุ่นหากขายรวม', 'ก่อนล้างเครื่องต้องสำรองข้อมูล'],
    faq: [['Air 5 กับ Air 4 ราคาต่างไหม', 'ต่างจากชิปและ generation รวมถึงตลาดของแต่ละ configuration'], ['64GB ยังรับไหม', 'รับประเมินได้ ความจุเป็นปัจจัยหนึ่งร่วมกับสภาพ'], ['Apple Pencil เพิ่มราคาไหม', 'ถ้าเป็นของแท้ ใช้งานปกติ และรุ่นตรงเครื่องสามารถประเมินแยกหรือรวมได้'], ['Touch ID เสียมีผลไหม', 'มีผลเพราะเป็นระบบยืนยันตัวตนหลักของรุ่นนี้']],
    relatedSlugs: ['ipad-gen-10', 'ipad-pro-m1-11'],
  },
  'ipad-pro-m1-11': {
    categorySlug: 'ipad-tablet',
    seoTitle: 'รับซื้อ iPad Pro M1 11 นิ้ว ขอนแก่น Wi‑Fi Cellular | WINNER IT',
    metaDescription: 'รับซื้อ iPad Pro M1 11 นิ้ว ขอนแก่น ประเมินตามความจุ Wi‑Fi/Cellular, จอ ProMotion, Face ID, USB-C/Thunderbolt, ตัวเครื่องและ Apple Pencil/Keyboard',
    intro: 'iPad Pro 11 นิ้วชิป M1 เป็นรุ่นที่ต้องดูความจุและ Wi‑Fi/Cellular ก่อน พร้อมตรวจจอ ProMotion, Face ID, พอร์ต USB-C/Thunderbolt และการงอของตัวเครื่อง อุปกรณ์ Magic Keyboard/Apple Pencil ควรแยกตรวจสภาพด้วย.',
    variantNotes: ['ชิป M1 และจอ 11 นิ้ว ProMotion 120Hz', 'มีความจุหลายระดับและรุ่น Cellular', 'Face ID เป็นฟังก์ชันสำคัญ', 'พอร์ต USB-C/Thunderbolt ควรทดสอบชาร์จและอุปกรณ์'],
    inspection: ['About/Capacity', 'จอ ProMotion/สัมผัส', 'Face ID', 'USB-C/Thunderbolt', 'กล้อง/ลำโพง', 'ขอบเครื่อง', 'อุปกรณ์เสริม'],
    priceFactors: ['ความจุ', 'Wi‑Fi/Cellular', 'จอ/Face ID', 'ตัวเครื่อง', 'อุปกรณ์เสริม', 'ประกัน'],
    sellerChecklist: ['About', 'รูปจอ', 'ทดสอบ Face ID', 'รูปขอบ', 'อุปกรณ์', 'Find My'],
    risks: ['Face ID หรือจอเสียมีผลต่อมูลค่าสูง', 'เครื่องงอไม่ควรดัดเอง', 'Magic Keyboard/Pencil ควรตรวจแยกไม่รวมสภาพแบบเหมารวม'],
    faq: [['11 นิ้ว M1 กับ 12.9 นิ้ว M1 ต่างราคาไหม', 'ต่างจากขนาดจอและ configuration จึงต้องแยกหน้า/รุ่น'], ['Cellular ต้องปลดซิมหรือ eSIM ไหม', 'ควรลบข้อมูลเครือข่ายและบัญชีของเจ้าของก่อนส่งมอบ'], ['Face ID ใช้ไม่ได้รับไหม', 'ส่งประเมินได้ แต่ควรแจ้งก่อนเพราะมีผลกับมูลค่า'], ['Magic Keyboard ขายรวมได้ไหม', 'ได้ หากรุ่นตรงและสภาพใช้งานปกติ สามารถประเมินแยกมูลค่าได้']],
    relatedSlugs: ['ipad-air-5', 'ipad-gen-10'],
  },
  'rtx-3060-ti': {
    categorySlug: 'gpu',
    seoTitle: 'รับซื้อ RTX 3060 Ti ขอนแก่น 8GB เช็กประกัน พัดลมและประวัติขุด | WINNER IT',
    metaDescription: 'รับซื้อ GeForce RTX 3060 Ti ขอนแก่น 8GB ประเมินตามแบรนด์/รุ่นซิงก์, ประกัน, อุณหภูมิ, พัดลม, พอร์ต, serial และประวัติใช้งานหรือขุด',
    intro: 'RTX 3060 Ti มีทั้งการ์ดจากหลายผู้ผลิต รุ่นซิงก์ 2–3 พัดลม และหน่วยความจำที่อาจต่างตาม revision การประเมินจึงต้องดูยี่ห้อ รุ่นเต็ม serial ประกัน สภาพพัดลม อุณหภูมิและประวัติใช้งาน ไม่ใช้ชื่อชิปอย่างเดียว.',
    variantNotes: ['NVIDIA ระบุ RTX 3060 Ti โดยทั่วไปมี 8GB และพบทั้ง GDDR6/GDDR6X ในบาง revision', 'การ์ดแต่ละแบรนด์ใช้ชุดระบายความร้อนและ PCB ต่างกัน', 'LHR/ประวัติขุดควรแจ้งตามจริง', 'กล่องและใบเสร็จช่วยตรวจ serial/ประกันง่ายขึ้น'],
    inspection: ['GPU-Z', 'serial/sticker', 'พัดลมและซิงก์', 'พอร์ต HDMI/DisplayPort', 'stress test สั้นที่อุณหภูมิปกติถ้าเครื่องเสถียร', 'รอยสนิม/คราบ/น็อตแกะ'],
    priceFactors: ['แบรนด์/รุ่นซิงก์', 'ประกัน', 'อุณหภูมิ/พัดลม', 'ประวัติขุด/ซ่อม', 'กล่อง/ใบเสร็จ', 'สภาพพอร์ต'],
    sellerChecklist: ['รูปหน้าหลังการ์ด', 'serial', 'GPU-Z', 'ผลเทสถ้ามี', 'วันหมดประกัน', 'ประวัติใช้งาน'],
    risks: ['อย่า stress test ต่อถ้าพัดลมไม่หมุนหรืออุณหภูมิผิดปกติ', 'ถ้าเคยเปลี่ยน thermal pad ให้แจ้ง', 'serial ถูกลบ/สติกเกอร์เสียควรถ่ายชัดก่อนนัด'],
    faq: [['3060 Ti เคยขุดรับไหม', 'ส่งประเมินได้ แต่ต้องแจ้งระยะเวลาและสภาพการใช้งานตามจริง'], ['ไม่มีกล่องรับไหม', 'รับประเมินได้ กล่องช่วยเรื่องความครบและตรวจข้อมูลแต่ไม่ใช่ปัจจัยเดียว'], ['พัดลมมีเสียงรับไหม', 'ส่งวิดีโอเสียงและผลอุณหภูมิมาประเมินได้'], ['เปลี่ยน thermal pad มาแล้วมีผลไหม', 'ควรแจ้งเพราะบ่งบอกว่าการ์ดถูกแกะและมีผลต่อการตรวจ']],
    relatedSlugs: ['rtx-4060-ti', 'rtx-5060'],
    source: { label: 'NVIDIA GeForce RTX 3060 Ti specifications', url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3060-3060ti/' },
  },
  'rtx-4060-ti': {
    categorySlug: 'gpu',
    seoTitle: 'รับซื้อ RTX 4060 Ti ขอนแก่น 8GB 16GB เช็กประกัน | WINNER IT',
    metaDescription: 'รับซื้อ GeForce RTX 4060 Ti ขอนแก่น 8GB/16GB ประเมินตาม VRAM, แบรนด์/รุ่นซิงก์, ประกัน, อุณหภูมิ, พัดลม, serial และประวัติใช้งาน',
    intro: 'RTX 4060 Ti ต้องแยก 8GB กับ 16GB ก่อนประเมิน เพราะหน่วยความจำต่างกันแม้ชื่อ GPU เดียวกัน จากนั้นจึงดูแบรนด์ รุ่นซิงก์ ประกัน อุณหภูมิ พัดลมและประวัติแกะซ่อม.',
    variantNotes: ['NVIDIA มี configuration 8GB และ 16GB GDDR6', 'รุ่น OC/ซิงก์และขนาดการ์ดต่างตามผู้ผลิต', 'serial และประกันมีผลกับตลาดมือสอง', 'พอร์ตและหัวไฟควรถ่ายก่อนนัด'],
    inspection: ['GPU-Z ให้เห็น VRAM', 'serial/ประกัน', 'พัดลม/ซิงก์', 'พอร์ต', 'อุณหภูมิขณะโหลด', 'รอยแกะน็อต/คราบ'],
    priceFactors: ['8GB/16GB', 'แบรนด์/รุ่นซิงก์', 'ประกัน', 'พัดลม/อุณหภูมิ', 'ประวัติซ่อม', 'กล่อง'],
    sellerChecklist: ['GPU-Z', 'รูปการ์ดทุกด้าน', 'serial', 'ผลเทส', 'ประกัน', 'อุปกรณ์/กล่อง'],
    risks: ['อย่าระบุ 4060 Ti โดยไม่บอก 8GB/16GB', 'หากภาพแตก/driver crash ให้ส่งอาการก่อนลง Windows ใหม่', 'การ์ดที่เคยซ่อมภาคไฟควรแจ้ง'],
    faq: [['8GB กับ 16GB ต่างราคาหรือไม่', 'ต่างตาม VRAM และตลาดของแต่ละรุ่นย่อย'], ['การ์ด OC มีผลไหม', 'มีบ้างแต่สภาพ ประกันและแบรนด์ซิงก์มักสำคัญกว่า clock ที่ต่างเล็กน้อย'], ['ไม่มีใบเสร็จแต่เช็กประกันได้ไหม', 'ขึ้นกับผู้ผลิต/ตัวแทน ควรส่ง serial ให้ตรวจ'], ['ใช้งานเรนเดอร์หนักรับไหม', 'รับประเมินได้ ให้แจ้งรูปแบบใช้งานและผลเทสปัจจุบัน']],
    relatedSlugs: ['rtx-3060-ti', 'rtx-5060'],
    source: { label: 'NVIDIA GeForce RTX 4060 Ti specifications', url: 'https://www.nvidia.com/th-th/geforce/graphics-cards/40-series/rtx-4060-4060ti/' },
  },
  'rtx-5060': {
    categorySlug: 'gpu',
    seoTitle: 'รับซื้อ RTX 5060 ขอนแก่น 8GB GDDR7 ประกันเหลือ | WINNER IT',
    metaDescription: 'รับซื้อ GeForce RTX 5060 ขอนแก่น 8GB GDDR7 ประเมินตามแบรนด์/รุ่นซิงก์, ประกัน, serial, พัดลม, อุณหภูมิ, หัวไฟและสภาพการ์ด ส่งข้อมูลเช็กราคาได้',
    intro: 'RTX 5060 เป็นการ์ด Blackwell รุ่นใหม่ที่ราคาในตลาดมือสองเปลี่ยนตามโปรโมชันและประกันค่อนข้างเร็ว จึงไม่ควรล็อกราคาในหน้าเว็บ แต่ควรตรวจรุ่นเต็ม แบรนด์ซิงก์ serial วันที่ซื้อและสภาพจริงทุกครั้ง.',
    variantNotes: ['NVIDIA ระบุ RTX 5060 ใช้หน่วยความจำ 8GB GDDR7', 'การ์ดจากแต่ละผู้ผลิตมีขนาดซิงก์และหัวไฟต่างกัน', 'ประกันและใบเสร็จสำคัญมากสำหรับการ์ดอายุไม่มาก', 'ราคาควรอิงตลาดวันที่ตรวจ ไม่ใช้ราคาช่วงเปิดตัว'],
    inspection: ['GPU-Z', 'serial/ใบเสร็จปิดข้อมูลส่วนตัวได้', 'พัดลม/ซิงก์', 'หัวไฟและพอร์ต', 'ผลเทสและอุณหภูมิ', 'กล่อง/อุปกรณ์'],
    priceFactors: ['แบรนด์/รุ่นซิงก์', 'ประกันคงเหลือ', 'วันที่ซื้อ', 'พัดลม/อุณหภูมิ', 'serial/ใบเสร็จ', 'กล่อง'],
    sellerChecklist: ['รุ่นเต็ม', 'GPU-Z', 'serial', 'วันซื้อ/ประกัน', 'รูปหัวไฟ/พอร์ต', 'ผลเทสถ้ามี'],
    risks: ['ไม่ควรใช้ราคาหน้าเว็บเป็นราคาตายตัวเพราะตลาดรุ่นใหม่เปลี่ยนเร็ว', 'หากหัวไฟมีรอยไหม้หรือหลวมให้หยุดใช้งานและแจ้ง', 'ใบเสร็จสามารถปิดชื่อ ที่อยู่ หรือข้อมูลส่วนตัวก่อนส่งรูป'],
    faq: [['RTX 5060 8GB รับซื้อประมาณเท่าไร', 'ต้องดูแบรนด์ รุ่นซิงก์ ประกันและราคาตลาดวันที่ตรวจ จึงไม่ควรฟันธงจากชื่อชิปอย่างเดียว'], ['ไม่มีใบเสร็จรับไหม', 'ส่งประเมินได้ แต่การตรวจประกันและแหล่งที่มาอาจทำได้จำกัดกว่าชุดที่มีเอกสาร'], ['เพิ่งซื้อไม่นานช่วยราคาไหม', 'อายุและประกันที่เหลือเป็นปัจจัยสำคัญเมื่อสภาพสมบูรณ์'], ['ขายพร้อมคอมทั้งเครื่องได้ไหม', 'ได้ สามารถส่งสเปกทั้งชุดเพื่อเทียบการประเมินแบบทั้งเครื่องกับแยกชิ้นส่วน']],
    relatedSlugs: ['rtx-4060-ti', 'rtx-3060-ti'],
    source: { label: 'NVIDIA GeForce RTX 5060 specifications', url: 'https://www.nvidia.com/th-th/geforce/graphics-cards/50-series/rtx-5060-family/' },
  },
    "asus-rog-zephyrus-g16": {
      "categorySlug": "notebook",
      "brandSlug": "asus",
      "seoTitle": "รับซื้อ ASUS ROG Zephyrus G16 ขอนแก่น เช็ก GA605 GU605 จอ OLED และ RTX | WINNER IT",
      "metaDescription": "รับซื้อ ASUS ROG Zephyrus G16 ขอนแก่น แยกรหัส GA605/GU605, CPU/GPU, RAM, SSD, จอ OLED, อะแดปเตอร์และประกัน ส่งสเปกเช็กราคาได้ก่อน",
      "intro": "ROG Zephyrus G16 มีทั้งรหัสและแพลตฟอร์มต่างกันตามปี เช่นตระกูล GA605 หรือ GU605 ทำให้ CPU, GPU, RAM และชนิดจอไม่เหมือนกัน การประเมินจึงควรเริ่มจากรหัสรุ่นเต็มและหน้าสเปกจริงของเครื่องก่อนดูตำหนิภายนอก.",
      "variantNotes": [
        "รหัส GA/GU และปีเครื่องสำคัญกว่าคำว่า G16 เพราะแต่ละ generation ใช้แพลตฟอร์มต่างกัน",
        "รุ่นปีใหม่บางชุดใช้จอ OLED 16 นิ้วความละเอียดสูง จึงควรตรวจ burn-in, pixel และรอยกด",
        "RAM บาง configuration เป็นหน่วยความจำออนบอร์ด จึงต้องแจ้งความจุจริงตั้งแต่แรก",
        "GPU Laptop และกำลังไฟต่างกันตาม SKU ไม่ควรเทียบจากชื่อ RTX เพียงอย่างเดียว"
      ],
      "inspection": [
        "ถ่าย Model/Serial ใต้เครื่องหรือจาก MyASUS",
        "เปิด Task Manager ให้เห็น CPU, GPU, RAM และ SSD",
        "ทดสอบจอพื้นขาว เทา ดำ และเลื่อนภาพเพื่อดู burn-in หรือ pixel ผิดปกติ",
        "เช็ก USB-C/USB4, HDMI, SD card, คีย์บอร์ด, touchpad และการชาร์จ",
        "ฟังเสียงพัดลมและดูอุณหภูมิเมื่อใช้งานปกติ"
      ],
      "priceFactors": [
        "รหัสรุ่นและปี",
        "CPU/GPU Laptop",
        "RAM/SSD",
        "สภาพจอ OLED/IPS",
        "อะแดปเตอร์แท้",
        "ประกันและประวัติซ่อม"
      ],
      "sellerChecklist": [
        "รหัส GA605/GU605 หรือรหัสเต็ม",
        "รูป Task Manager หน้า CPU/GPU/Memory",
        "รูปจอพื้นอ่อนและพื้นดำ",
        "รูปฝา มุมเครื่อง และคีย์บอร์ด",
        "รูปอะแดปเตอร์และกำลังวัตต์",
        "วันหมดประกันถ้าตรวจได้"
      ],
      "risks": [
        "อย่าเดาสเปกจากคำว่า Zephyrus G16 เพราะชื่อเดียวมีหลาย generation",
        "ถ้าจอ OLED มีเงาค้างให้ถ่ายภาพตรงโดยไม่ใช้ฟิลเตอร์",
        "หากเครื่องดับหรือร้อนผิดปกติไม่ควร stress test ต่อเนื่อง"
      ],
      "faq": [
        [
          "G16 ปีต่างกันต้องแยกราคาไหม",
          "ต้องแยก เพราะ CPU/GPU จอและ RAM ต่างกันมากในแต่ละรหัสรุ่น"
        ],
        [
          "RAM เพิ่มเองได้ทุกเครื่องไหม",
          "ไม่ทุก configuration จึงควรส่งรหัสรุ่นและความจุที่ระบบแสดง"
        ],
        [
          "จอ OLED มีรอยรับไหม",
          "ส่งประเมินได้ ให้ถ่ายพื้นขาว เทา ดำเพื่อแยกรอยผิวกับอาการ panel"
        ],
        [
          "ไม่มีอะแดปเตอร์รับไหม",
          "ประเมินได้ แต่ความครบชุดและกำลังชาร์จที่ตรงรุ่นมีผลต่อราคาสุทธิ"
        ]
      ],
      "relatedSlugs": [
        "asus-rog-zephyrus-g14",
        "asus-rog-strix-g16",
        "lenovo-legion-pro-5"
      ],
      "source": {
        "label": "ASUS ROG Zephyrus G16 (2025) specifications",
        "url": "https://rog.asus.com/th/laptops/rog-zephyrus/rog-zephyrus-g16-2025-ga605/spec/"
      }
    },
    "asus-rog-strix-g16": {
      "categorySlug": "notebook",
      "brandSlug": "asus",
      "seoTitle": "รับซื้อ ASUS ROG Strix G16 ขอนแก่น เช็ก G614 G615 RTX และจอ | WINNER IT",
      "metaDescription": "รับซื้อ ASUS ROG Strix G16 ขอนแก่น ประเมินตามรหัส G614/G615, CPU, RTX, RAM/SSD, จอ 165/240Hz, พัดลม อะแดปเตอร์และประกัน",
      "intro": "ROG Strix G16 มีหลายรหัสตั้งแต่ G614 ถึง G615 และแตก SKU ตาม CPU, GPU, จอและ RAM การบอกเพียง “Strix G16” จึงยังไม่พอสำหรับตีราคา ควรส่งรหัสเครื่องเต็มและหน้าสเปกจาก Windows หรือ MyASUS.",
      "variantNotes": [
        "รหัส G614/G615 และรหัสท้ายช่วยแยกแพลตฟอร์มกับ generation",
        "GPU Laptop มีตั้งแต่หลายระดับและ VRAM ต่างกันตาม SKU",
        "จออาจเป็น FHD+/2.5K และ refresh rate ต่างกัน จึงต้องเช็ก panel จริง",
        "บางรุ่นมี RAM SO-DIMM และ M.2 หลายช่อง ควรแจ้งสเปกที่ติดตั้งปัจจุบัน"
      ],
      "inspection": [
        "ตรวจ Model/Serial ใต้เครื่อง",
        "เปิด Task Manager หรือ MyASUS เช็ก CPU/GPU/RAM",
        "ทดสอบจอที่ refresh rate สูงและดูเส้น/กะพริบ/dead pixel",
        "เช็กพัดลม คีย์บอร์ด RGB พอร์ต LAN/HDMI/USB-C และเสียงลำโพง",
        "ถ่ายอะแดปเตอร์ให้เห็นกำลังวัตต์และสภาพหัวชาร์จ"
      ],
      "priceFactors": [
        "รหัส G614/G615",
        "CPU/GPU และ VRAM",
        "จอและ refresh rate",
        "RAM/SSD",
        "พัดลม/ความร้อน",
        "อะแดปเตอร์และประกัน"
      ],
      "sellerChecklist": [
        "รหัสรุ่นเต็มใต้เครื่อง",
        "Task Manager CPU/GPU/Memory",
        "รูปจอขณะเปิดใช้งาน",
        "รูปคีย์บอร์ด/บานพับ/มุมเครื่อง",
        "อะแดปเตอร์",
        "ประวัติซ่อมหรือแกะเครื่อง"
      ],
      "risks": [
        "ชื่อ Strix G16 ครอบคลุมหลาย SKU จึงไม่ควรเทียบราคาแบบเหมารวม",
        "หากบานพับหรือฝาเริ่มแยกไม่ควรฝืนเปิดปิด",
        "เครื่องที่เคยซ่อมบอร์ดหรือเปลี่ยน GPU-related component ควรแจ้งก่อน"
      ],
      "faq": [
        [
          "G614 กับ G615 ราคาต่างกันไหม",
          "ต่างตาม generation และสเปกจริง จึงควรใช้รหัสเต็มในการประเมิน"
        ],
        [
          "จอ 165Hz กับ 240Hz มีผลไหม",
          "มีผลร่วมกับความละเอียด สภาพ panel และสเปกทั้งเครื่อง"
        ],
        [
          "RAM เพิ่มแล้วช่วยราคาไหม",
          "มีผลบางส่วน แต่ GPU CPU สภาพและประกันยังเป็นปัจจัยหลัก"
        ],
        [
          "อะแดปเตอร์เทียบรับไหม",
          "ส่งประเมินได้ แต่ควรระบุกำลังวัตต์และยี่ห้อให้ชัด"
        ]
      ],
      "relatedSlugs": [
        "asus-rog-zephyrus-g16",
        "asus-tuf-gaming-a15",
        "lenovo-legion-pro-5"
      ],
      "source": {
        "label": "ASUS ROG Strix G16 specifications",
        "url": "https://rog.asus.com/th/laptops/rog-strix/rog-strix-g16-2025/spec/"
      }
    },
    "lenovo-legion-pro-5": {
      "categorySlug": "notebook",
      "brandSlug": "lenovo",
      "seoTitle": "รับซื้อ Lenovo Legion Pro 5 ขอนแก่น เช็ก 16IRX/16ARX RTX และจอ | WINNER IT",
      "metaDescription": "รับซื้อ Lenovo Legion Pro 5 ขอนแก่น ประเมินตามรหัส 16IRX/16ARX, CPU/GPU, RAM/SSD, จอ, Lenovo Vantage, อะแดปเตอร์และประกัน",
      "intro": "Legion Pro 5 มีรหัสย่อยตามแพลตฟอร์มและปี เช่นกลุ่ม 16IRX หรือ 16ARX ทำให้ CPU, GPU, จอและกำลังอะแดปเตอร์ต่างกันมาก การประเมินจึงควรใช้ MTM/Model จริงร่วมกับสเปกที่ติดตั้งปัจจุบัน.",
      "variantNotes": [
        "MTM และรหัส 16IRX/16ARX ช่วยแยก Intel/AMD และ generation",
        "GPU Laptop กับ TGP เป็นปัจจัยหลักของกลุ่มเกมมิ่ง",
        "จอ 16 นิ้วอาจต่างความละเอียด refresh rate และ gamut ตาม SKU",
        "RAM/SSD อาจถูกอัปเกรดภายหลัง จึงต้องแจ้งสเปกจริงไม่ใช่สเปกตอนซื้อ"
      ],
      "inspection": [
        "ถ่าย MTM/Serial ใต้เครื่อง",
        "เปิด Lenovo Vantage หรือ Task Manager เช็ก CPU/GPU/RAM",
        "เช็กจอ คีย์บอร์ด พอร์ต USB-C/HDMI/LAN และ webcam",
        "ดู Battery Health และโหมดชาร์จใน Lenovo Vantage",
        "ทดสอบพัดลมและถ่ายอะแดปเตอร์ให้เห็นกำลังวัตต์"
      ],
      "priceFactors": [
        "MTM/generation",
        "CPU/GPU/TGP",
        "จอ",
        "RAM/SSD",
        "แบตและพัดลม",
        "อะแดปเตอร์/ประกัน"
      ],
      "sellerChecklist": [
        "MTM/Model เต็ม",
        "ภาพ Task Manager",
        "ภาพจอและตัวเครื่อง",
        "Battery Health ถ้าดูได้",
        "รูปอะแดปเตอร์",
        "ประวัติอัปเกรดหรือซ่อม"
      ],
      "risks": [
        "อย่าใช้ชื่อ Legion Pro 5 อย่างเดียวเพื่อเทียบราคาข้ามปี",
        "ถ้ามีพอร์ตชาร์จหลวมหรือชาร์จตัดให้แจ้งก่อนทดสอบหนัก",
        "เครื่องที่เคยเปลี่ยนบอร์ดหรือจอควรแจ้งประวัติให้ครบ"
      ],
      "faq": [
        [
          "Legion Pro 5 Intel กับ AMD ต้องแยกไหม",
          "ต้องแยกตาม MTM, generation และ GPU ของเครื่องจริง"
        ],
        [
          "RAM 32GB มีผลมากไหม",
          "มีผลแต่ต้องดู GPU จอ SSD และสภาพร่วมกัน"
        ],
        [
          "ไม่มี Vantage ประเมินได้ไหม",
          "ได้ ใช้ Task Manager, System Information และรูป Model แทน"
        ],
        [
          "อะแดปเตอร์ไม่ครบรับไหม",
          "รับประเมินได้ แต่กำลังวัตต์และหัวชาร์จตรงรุ่นมีผลต่อการทดสอบและความครบชุด"
        ]
      ],
      "relatedSlugs": [
        "lenovo-legion-5",
        "lenovo-loq-15",
        "asus-rog-strix-g16"
      ],
      "source": {
        "label": "Lenovo PSREF Legion Pro 5 16IRX9",
        "url": "https://psref.lenovo.com/Product/Legion/Legion_Pro_5_16IRX9"
      }
    },
    "acer-predator-helios-neo-16": {
      "categorySlug": "notebook",
      "brandSlug": "acer",
      "seoTitle": "รับซื้อ Acer Predator Helios Neo 16 ขอนแก่น เช็ก PHN16 RTX และจอ | WINNER IT",
      "metaDescription": "รับซื้อ Acer Predator Helios Neo 16 ขอนแก่น ประเมินตามรหัส PHN16, CPU/GPU, จอ WQXGA, RAM/SSD, พัดลม, อะแดปเตอร์และประกัน",
      "intro": "Predator Helios Neo 16 ใช้ชื่อเดียวต่อเนื่องหลายรหัส PHN16 และหลาย generation ทั้ง Intel และ GPU ต่างรุ่น การตีราคาจึงต้องเริ่มจากรหัส PHN16 เต็ม ไม่ควรอิงชื่อซีรีส์หรือคำว่า RTX อย่างเดียว.",
      "variantNotes": [
        "รหัส PHN16-71/72/73 ช่วยแยกช่วงรุ่นและแพลตฟอร์ม",
        "GPU Laptop มีหลายระดับและกำลังไฟต่างกันตาม SKU",
        "จอ WQXGA/FHD+ และ refresh rate อาจต่างกันตามรุ่นย่อย",
        "RAM/SSD และจำนวนช่องอัปเกรดควรยืนยันจากสเปกจริง"
      ],
      "inspection": [
        "ถ่าย Model/Part Number ใต้เครื่อง",
        "เปิด Task Manager เช็ก CPU/GPU/RAM",
        "ทดสอบจอและ refresh rate ดูเส้น กะพริบ และ dead pixel",
        "เช็ก PredatorSense พัดลม อุณหภูมิ คีย์บอร์ดและพอร์ต",
        "ตรวจบานพับ ฝา และอะแดปเตอร์"
      ],
      "priceFactors": [
        "รหัส PHN16",
        "CPU/GPU",
        "จอ",
        "RAM/SSD",
        "พัดลม/อุณหภูมิ",
        "ประกันและอะแดปเตอร์"
      ],
      "sellerChecklist": [
        "รหัส PHN16 เต็ม",
        "Task Manager CPU/GPU/Memory",
        "รูปจอ",
        "รูปบานพับและมุมเครื่อง",
        "รูปอะแดปเตอร์",
        "วันหมดประกันถ้ามี"
      ],
      "risks": [
        "หากบานพับเริ่มมีเสียงหรือฝาแยกไม่ควรฝืนเปิดปิด",
        "ถ้า GPU หายจาก Device Manager ให้ถ่ายสถานะก่อนลงไดรเวอร์ซ้ำหลายครั้ง",
        "เครื่องที่เคยเปลี่ยนจอหรือบอร์ดควรแจ้งเพื่อประเมินตามจริง"
      ],
      "faq": [
        [
          "PHN16-71 กับ PHN16-72 ต่างราคาไหม",
          "ต่างตาม generation, CPU/GPU และจอ จึงต้องใช้รหัสเต็ม"
        ],
        [
          "จอ WQXGA มีผลไหม",
          "มีผลร่วมกับ refresh rate สภาพ panel และสเปกทั้งเครื่อง"
        ],
        [
          "พัดลมดังยังรับไหม",
          "ส่งวิดีโอเสียงและอุณหภูมิมาประเมินได้"
        ],
        [
          "ไม่มีประกันรับไหม",
          "รับประเมินได้ แต่สภาพและประวัติซ่อมจะมีน้ำหนักมากขึ้น"
        ]
      ],
      "relatedSlugs": [
        "acer-nitro-v15",
        "asus-rog-strix-g16",
        "lenovo-legion-pro-5"
      ],
      "source": {
        "label": "Acer Predator Helios Neo 16 specifications",
        "url": "https://www.acer.com/th-th/predator/laptops/helios/helios-neo-16/pdp/NH.QNMST.001"
      }
    },
    "hp-victus-16": {
      "categorySlug": "notebook",
      "brandSlug": "hp",
      "seoTitle": "รับซื้อ HP Victus 16 ขอนแก่น เช็ก CPU RTX จอ RAM SSD และประกัน | WINNER IT",
      "metaDescription": "รับซื้อ HP Victus 16 ขอนแก่น ประเมินตาม Product Number, CPU/GPU, RAM/SSD, จอ, แบต, พัดลม อะแดปเตอร์และประกัน ส่งสเปกเช็กราคาได้",
      "intro": "HP Victus 16 มีหลาย Product Number และหลายชุด CPU/GPU ตั้งแต่รุ่นกลางถึง RTX ระดับสูง การประเมินจึงควรใช้ Product Number/Serial และสเปกจากเครื่องจริง ไม่อิงชื่อ Victus 16 เพียงอย่างเดียว.",
      "variantNotes": [
        "CPU และ GPU ต่างกันตาม generation และตลาดที่จำหน่าย",
        "จออาจต่างความละเอียด refresh rate และสีตาม SKU",
        "RAM/SSD สามารถมีสเปกหลังอัปเกรดไม่ตรงกับใบซื้อเดิม",
        "อะแดปเตอร์และประกันควรถ่ายร่วมกับ Product Number"
      ],
      "inspection": [
        "ถ่าย Product Number/Serial จากใต้เครื่องหรือ HP Support Assistant",
        "เปิด Task Manager เช็ก CPU/GPU/RAM/SSD",
        "ทดสอบจอ คีย์บอร์ด touchpad พอร์ตและกล้อง",
        "ดูสุขภาพแบตและเช็กการชาร์จ",
        "ฟังพัดลมและดูอุณหภูมิขณะใช้งานทั่วไป"
      ],
      "priceFactors": [
        "Product Number/generation",
        "CPU/GPU",
        "จอ",
        "RAM/SSD",
        "Battery Health",
        "อะแดปเตอร์/ประกัน"
      ],
      "sellerChecklist": [
        "Product Number/Serial",
        "ภาพ Task Manager",
        "ภาพจอและตัวเครื่อง",
        "Battery Health ถ้ามี",
        "อะแดปเตอร์",
        "ประวัติซ่อม/อัปเกรด"
      ],
      "risks": [
        "อย่าเทียบ Victus 16 ต่างปีเป็นราคาเดียวกัน",
        "ถ้ามีอาการจอกะพริบหรือ GPU crash ให้ส่งอาการก่อนลงระบบใหม่",
        "เครื่องที่เคยซ่อมบอร์ดหรือเปลี่ยนจอควรแจ้ง"
      ],
      "faq": [
        [
          "Victus 16 RTX ต่างรุ่นราคาห่างไหม",
          "ห่างได้มากตาม GPU, CPU และจอของ SKU นั้น"
        ],
        [
          "อัปเกรด RAM/SSD ช่วยไหม",
          "ช่วยบางส่วน แต่ต้องดูยี่ห้อ ความจุ และสภาพรวม"
        ],
        [
          "แบตเสื่อมรับไหม",
          "ส่งประเมินได้ โดยแจ้งอาการและ Battery Health ถ้าดูได้"
        ],
        [
          "คีย์บอร์ดมีรอยรับไหม",
          "รับประเมินได้ ให้ถ่ายภาพตรง ๆ เพื่อดูระดับรอยและการใช้งาน"
        ]
      ],
      "relatedSlugs": [
        "dell-latitude-7440",
        "lenovo-legion-pro-5",
        "acer-predator-helios-neo-16"
      ],
      "source": {
        "label": "HP Victus 16 official specifications",
        "url": "https://www.hp.com/us-en/gaming-pc/laptops/2023-victus-16-intel.html"
      }
    },
    "macbook-air-m4": {
      "categorySlug": "macbook",
      "seoTitle": "รับซื้อ MacBook Air M4 ขอนแก่น 13/15 นิ้ว RAM SSD แบต | WINNER IT",
      "metaDescription": "รับซื้อ MacBook Air M4 ขอนแก่น แยก 13/15 นิ้ว RAM 16/24/32GB, SSD, Battery Health, Cycle Count, จอ, Find My และอะแดปเตอร์ MagSafe",
      "intro": "MacBook Air M4 ปี 2025 มีทั้ง 13 และ 15 นิ้ว พร้อมหน่วยความจำและ SSD หลาย configuration การประเมินต้องแยกขนาดจอ RAM SSD Battery Health และอุปกรณ์ก่อน เพราะรุ่นภายนอกคล้ายกันแต่ราคาตลาดไม่เท่ากัน.",
      "variantNotes": [
        "ต้องแยกขนาด 13.6 กับ 15.3 นิ้ว",
        "หน่วยความจำเริ่มต้น 16GB และมี configuration สูงกว่านั้น",
        "SSD มีหลายความจุและอัปเกรดภายหลังไม่ได้แบบโน้ตบุ๊กทั่วไป",
        "ใช้ MagSafe 3 และ Thunderbolt 4 จึงควรตรวจสายและพอร์ตให้ครบ"
      ],
      "inspection": [
        "About This Mac ให้เห็นชิปและ Memory",
        "Storage และ Battery Information",
        "จอพื้นขาว/ดำ คีย์บอร์ด Touch ID กล้องและลำโพง",
        "MagSafe และพอร์ต Thunderbolt",
        "สภาพฝา มุมเครื่อง และสายชาร์จ"
      ],
      "priceFactors": [
        "13/15 นิ้ว",
        "RAM/SSD",
        "Battery Health/Cycle Count",
        "จอและตัวถัง",
        "อะแดปเตอร์/สาย MagSafe",
        "ประกัน/AppleCare"
      ],
      "sellerChecklist": [
        "About This Mac",
        "Storage",
        "Battery Information",
        "รูปจอและตัวเครื่อง",
        "อะแดปเตอร์/สาย",
        "สถานะ Find My"
      ],
      "risks": [
        "ก่อนส่งมอบต้องสำรองข้อมูลและปิด Find My โดยเจ้าของบัญชี",
        "ถ้ามีรอยบนจอให้ถ่ายพื้นสีอ่อนหลายมุมเพื่อแยกรอยผิวกับ pixel",
        "หากมีประวัติของเหลวหรือซ่อมบอร์ดควรแจ้งตรง ๆ"
      ],
      "faq": [
        [
          "Air M4 13 กับ 15 นิ้วต้องแยกราคาไหม",
          "ต้องแยก เพราะขนาดจอ แบตและตลาดของแต่ละ configuration ต่างกัน"
        ],
        [
          "RAM 16GB กับ 24/32GB มีผลไหม",
          "มี เพราะหน่วยความจำถูกกำหนดจากโรงงานและไม่อัปเกรดภายหลังแบบ RAM ถอดได้"
        ],
        [
          "ไม่มี MagSafe ขายได้ไหม",
          "ส่งประเมินได้ แต่ความครบชุดมีผลต่อราคาสุทธิ"
        ],
        [
          "Battery Health ต่ำรับไหม",
          "รับประเมินได้ โดยดูร่วมกับ Cycle Count อาการใช้งานและสภาพโดยรวม"
        ]
      ],
      "relatedSlugs": [
        "macbook-air-m3",
        "macbook-air-m2",
        "macbook-pro-14-m4"
      ],
      "source": {
        "label": "Apple MacBook Air (M4, 2025) technical specifications",
        "url": "https://support.apple.com/th-th/122209"
      }
    },
    "macbook-pro-14-m2-pro": {
      "categorySlug": "macbook",
      "seoTitle": "รับซื้อ MacBook Pro 14 M2 Pro ขอนแก่น RAM SSD แบตและจอ XDR | WINNER IT",
      "metaDescription": "รับซื้อ MacBook Pro 14 นิ้ว M2 Pro ขอนแก่น ประเมินตาม CPU/GPU configuration, RAM/SSD, Battery Health, จอ XDR, MagSafe, ประกันและสภาพจริง",
      "intro": "MacBook Pro 14 นิ้วปี 2023 มีทั้ง M2 Pro และ M2 Max รวมถึง RAM/SSD หลายระดับ แม้หน้าตาเหมือนกันมูลค่าจึงห่างกันได้มาก ควรส่ง About This Mac และ Storage ให้เห็น configuration ก่อนประเมิน.",
      "variantNotes": [
        "M2 Pro มี CPU/GPU หลาย configuration และบางเครื่องเป็น M2 Max",
        "RAM และ SSD มีหลายระดับและเปลี่ยนภายหลังไม่ได้แบบชิ้นส่วนทั่วไป",
        "จอ Liquid Retina XDR ProMotion เป็นจุดต้นทุนสูงที่ควรตรวจละเอียด",
        "MagSafe 3, HDMI, SDXC และ Thunderbolt 4 ควรทดสอบ"
      ],
      "inspection": [
        "About This Mac ให้เห็น Chip/Memory",
        "Storage และ Battery Information",
        "จอพื้นขาว เทา ดำและ refresh rate",
        "MagSafe/HDMI/SDXC/Thunderbolt",
        "คีย์บอร์ด Touch ID ลำโพงและกล้อง"
      ],
      "priceFactors": [
        "M2 Pro/M2 Max configuration",
        "RAM/SSD",
        "Battery Health",
        "จอ XDR",
        "อะแดปเตอร์",
        "ประกัน/ประวัติซ่อม"
      ],
      "sellerChecklist": [
        "About This Mac",
        "Storage",
        "Battery Information",
        "รูปจอ",
        "รูปพอร์ตและตัวถัง",
        "อะแดปเตอร์/สาย MagSafe"
      ],
      "risks": [
        "จอ XDR มีมูลค่าสูง จุดเสียเล็ก ๆ ควรถ่ายให้ชัด",
        "ก่อนส่งมอบต้องปิด Find My โดยไม่ส่งรหัสผ่าน Apple ID",
        "ถ้าเคยเปลี่ยนจอหรือบอร์ดควรแจ้งประวัติ"
      ],
      "faq": [
        [
          "M2 Pro กับ M2 Max ต้องแยกไหม",
          "ต้องแยกเพราะ CPU/GPU RAM และตลาดต่างกัน"
        ],
        [
          "16GB กับ 32GB ต่างราคาไหม",
          "ต่าง โดยต้องดู SSD และสภาพร่วมกัน"
        ],
        [
          "จอมีจุดสว่างรับไหม",
          "ส่งภาพพื้นดำ/เทาเพื่อประเมินระดับอาการได้"
        ],
        [
          "ไม่มีอะแดปเตอร์รับไหม",
          "รับประเมินได้ แต่กำลังวัตต์และความครบชุดมีผลต่อราคาสุทธิ"
        ]
      ],
      "relatedSlugs": [
        "macbook-pro-16-m2-pro",
        "macbook-pro-14-m1-pro",
        "macbook-pro-14-m4"
      ],
      "source": {
        "label": "Apple MacBook Pro 14-inch (2023) technical specifications",
        "url": "https://support.apple.com/en-us/111340"
      }
    },
    "macbook-pro-16-m2-pro": {
      "categorySlug": "macbook",
      "seoTitle": "รับซื้อ MacBook Pro 16 M2 Pro ขอนแก่น RAM SSD แบตและจอ XDR | WINNER IT",
      "metaDescription": "รับซื้อ MacBook Pro 16 นิ้ว M2 Pro ขอนแก่น แยก M2 Pro/M2 Max, RAM/SSD, Battery Health, จอ XDR, อะแดปเตอร์และสภาพตัวเครื่อง",
      "intro": "MacBook Pro 16 นิ้วปี 2023 มีชุด M2 Pro และ M2 Max พร้อม RAM/SSD หลายระดับ จุดที่ทำให้ราคาต่างกันมากคือ configuration ชิป หน่วยความจำ ความจุ สภาพจอ XDR และแบต ไม่ควรเทียบจากคำว่า “16 นิ้ว M2” เพียงอย่างเดียว.",
      "variantNotes": [
        "M2 Pro และ M2 Max ใช้สเปก GPU และ memory bandwidth ต่างกัน",
        "จอ 16.2 นิ้ว Liquid Retina XDR ProMotion ต้องตรวจ pixel และรอยกด",
        "RAM/SSD ถูกกำหนดจากโรงงานและมีผลต่อกลุ่มผู้ใช้มืออาชีพ",
        "อะแดปเตอร์กำลังสูงและสาย MagSafe 3 ควรขายเป็นชุดถ้ามี"
      ],
      "inspection": [
        "About This Mac/Memory",
        "Storage",
        "Battery Health/Cycle Count",
        "จอ XDR พื้นสีและความสว่าง",
        "MagSafe/HDMI/SDXC/Thunderbolt",
        "ลำโพง คีย์บอร์ด Touch ID และกล้อง"
      ],
      "priceFactors": [
        "M2 Pro/M2 Max",
        "RAM/SSD",
        "Battery Health",
        "จอ",
        "อะแดปเตอร์",
        "ประกัน/รอยตัวถัง"
      ],
      "sellerChecklist": [
        "About This Mac",
        "Storage",
        "Battery Information",
        "รูปจอ",
        "รูปฝา มุมเครื่องและพอร์ต",
        "อะแดปเตอร์/สาย"
      ],
      "risks": [
        "ตัวเครื่องใหญ่ควรถ่ายมุมและฝาล่างเพื่อดูรอยบุบหรือบิด",
        "อย่าใช้สารทำความสะอาดแรงกับจอ XDR",
        "ก่อนส่งมอบให้สำรองข้อมูลและปิด Find My"
      ],
      "faq": [
        [
          "16 นิ้ว M2 Pro กับ 14 นิ้ว M2 Pro ต่างราคาไหม",
          "ต่างจากขนาดจอ แบต configuration และตลาดของแต่ละเครื่อง"
        ],
        [
          "M2 Max ช่วยราคาไหม",
          "มีผลชัดเมื่อ configuration และสภาพตรวจสอบได้"
        ],
        [
          "แบต Cycle สูงยังรับไหม",
          "ส่งประเมินได้ โดยดู Battery Health และอาการใช้งานร่วมกัน"
        ],
        [
          "ไม่มีสาย MagSafe รับไหม",
          "รับได้ แต่ความครบชุดและอะแดปเตอร์มีผลต่อมูลค่า"
        ]
      ],
      "relatedSlugs": [
        "macbook-pro-14-m2-pro",
        "macbook-pro-14-m1-pro",
        "macbook-pro-14-m4"
      ],
      "source": {
        "label": "Apple MacBook Pro 16-inch (2023) technical specifications",
        "url": "https://support.apple.com/en-euro/111838"
      }
    },
    "macbook-pro-14-m4": {
      "categorySlug": "macbook",
      "seoTitle": "รับซื้อ MacBook Pro 14 M4 ขอนแก่น RAM SSD แบต จอ XDR | WINNER IT",
      "metaDescription": "รับซื้อ MacBook Pro 14 นิ้ว M4 ขอนแก่น ประเมินตาม M4/M4 Pro, RAM/SSD, Battery Health, จอ XDR, Thunderbolt, MagSafe, ประกันและสภาพจริง",
      "intro": "MacBook Pro 14 นิ้วปี 2024 มีทั้งรุ่นชิป M4 และกลุ่ม M4 Pro/M4 Max ที่สเปกพอร์ต หน่วยความจำและประสิทธิภาพต่างกัน การประเมินจึงต้องเห็นชิป RAM SSD และรหัสรุ่นจริงก่อน ไม่ควรใช้ชื่อ “Pro 14 M4” แบบรวมทั้งหมด.",
      "variantNotes": [
        "MacBook Pro 14 ชิป M4 กับ M4 Pro/M4 Max เป็นคนละ configuration สำคัญ",
        "RAM และ SSD มีหลายระดับและส่งผลต่อมูลค่าเครื่องงาน",
        "จอ Liquid Retina XDR อาจมีตัวเลือก nano-texture ในบาง configuration",
        "พอร์ต Thunderbolt รุ่นและกำลังอะแดปเตอร์ต่างตามชิป จึงควรถ่ายอุปกรณ์จริง"
      ],
      "inspection": [
        "About This Mac ให้เห็น Chip/Memory",
        "Storage และ Battery Information",
        "จอ XDR พื้นขาว เทา ดำ",
        "MagSafe/HDMI/SDXC/Thunderbolt",
        "คีย์บอร์ด Touch ID กล้อง ลำโพงและตัวถัง"
      ],
      "priceFactors": [
        "M4/M4 Pro/M4 Max",
        "RAM/SSD",
        "Battery Health",
        "จอ/ตัวเลือก nano-texture",
        "อะแดปเตอร์",
        "ประกัน/AppleCare"
      ],
      "sellerChecklist": [
        "About This Mac",
        "Storage",
        "Battery Information",
        "รูปจอ",
        "รูปพอร์ตและตัวถัง",
        "อะแดปเตอร์และสาย"
      ],
      "risks": [
        "ต้องแยกชิป M4 ปกติกับ M4 Pro/M4 Max ให้ชัด",
        "จอ nano-texture ควรใช้วิธีทำความสะอาดตามคำแนะนำของ Apple",
        "ก่อนส่งมอบต้องปิด Find My โดยเจ้าของบัญชี"
      ],
      "faq": [
        [
          "M4 กับ M4 Pro ต่างราคาไหม",
          "ต่างมากตามชิป RAM SSD และตลาดของ configuration"
        ],
        [
          "จอ nano-texture ต้องแจ้งไหม",
          "ควรแจ้ง เพราะเป็น option ที่ต่างจากกระจกมาตรฐาน"
        ],
        [
          "ประกันเหลือมีผลไหม",
          "มีผลด้านความมั่นใจเมื่อสถานะตรวจสอบได้"
        ],
        [
          "ไม่มีอะแดปเตอร์ขายได้ไหม",
          "ส่งประเมินได้ แต่ราคาจะพิจารณาความครบชุดด้วย"
        ]
      ],
      "relatedSlugs": [
        "macbook-air-m4",
        "macbook-pro-14-m2-pro",
        "macbook-pro-16-m2-pro"
      ],
      "source": {
        "label": "Apple MacBook Pro 14-inch (M4, 2024) technical specifications",
        "url": "https://support.apple.com/th-th/121552"
      }
    },
    "iphone-13-pro": {
      "categorySlug": "iphone",
      "seoTitle": "รับซื้อ iPhone 13 Pro ขอนแก่น 128GB ถึง 1TB เช็กแบต จอ Face ID | WINNER IT",
      "metaDescription": "รับซื้อ iPhone 13 Pro ขอนแก่น 128/256/512GB/1TB ประเมิน Battery Health, จอ ProMotion, Face ID, กล้อง, Parts & Service History และ Find My",
      "intro": "iPhone 13 Pro ต้องแยกความจุและสภาพจอ ProMotion รวมถึง Battery Health, Face ID, กล้องและประวัติอะไหล่ก่อนประเมิน รุ่นภายนอกเหมือนกันแต่ 128GB ถึง 1TB มีตลาดและมูลค่าต่างกันชัดเจน.",
      "variantNotes": [
        "มีความจุ 128GB, 256GB, 512GB และ 1TB",
        "จอ OLED ProMotion สูงสุด 120Hz ควรตรวจ touch, pixel และสี",
        "ระบบกล้องสามตัวและ LiDAR ควรทดสอบทุกระยะ",
        "Parts & Service History ช่วยดูประวัติอะไหล่ในรุ่นที่รองรับ"
      ],
      "inspection": [
        "Settings > General > About และ Capacity",
        "Battery Health",
        "จอพื้นขาว/เทาและ ProMotion",
        "Face ID กล้อง 0.5x/1x/3x ลำโพงและไมค์",
        "พอร์ต Lightning, MagSafe และ Find My"
      ],
      "priceFactors": [
        "ความจุ",
        "Battery Health",
        "จอ/Face ID",
        "กล้อง",
        "ประวัติอะไหล่",
        "กรอบ/กระจกหลัง/ประกัน"
      ],
      "sellerChecklist": [
        "หน้า About",
        "Battery Health",
        "Parts & Service History ถ้ามี",
        "รูปจอและกรอบ",
        "ทดสอบ Face ID/กล้อง",
        "สถานะ Find My"
      ],
      "risks": [
        "ห้ามส่งรหัส Apple ID หรือรหัสปลดล็อกในแชท",
        "ถ้า Face ID หรือกล้องมีอาการควรแจ้งก่อนรีเซ็ตเครื่อง",
        "ก่อนส่งมอบต้องสำรองข้อมูลและปิด Find My"
      ],
      "faq": [
        [
          "13 Pro 128GB กับ 1TB ต่างราคาไหม",
          "ต่างตามความจุและตลาด โดยยังต้องดูสภาพร่วมกัน"
        ],
        [
          "แบตต่ำยังรับไหม",
          "รับประเมินได้ Battery Health เป็นหนึ่งในปัจจัยราคา"
        ],
        [
          "เปลี่ยนจอมาแล้วรับไหม",
          "ส่งประเมินได้ ควรส่ง Parts & Service History และบอกแหล่งซ่อมถ้าทราบ"
        ],
        [
          "Face ID เสียมีผลไหม",
          "มีผลค่อนข้างมากเพราะเป็นระบบยืนยันตัวตนหลักของเครื่อง"
        ]
      ],
      "relatedSlugs": [
        "iphone-13",
        "iphone-13-pro-max",
        "iphone-14-pro-max"
      ],
      "source": {
        "label": "Apple iPhone 13 Pro technical specifications",
        "url": "https://support.apple.com/en-ph/111871"
      }
    },
    "iphone-13-pro-max": {
      "categorySlug": "iphone",
      "seoTitle": "รับซื้อ iPhone 13 Pro Max ขอนแก่น 128GB ถึง 1TB เช็กแบตและจอ | WINNER IT",
      "metaDescription": "รับซื้อ iPhone 13 Pro Max ขอนแก่น ประเมินตามความจุ Battery Health, จอ OLED ProMotion, Face ID, กล้อง 3x, ประวัติอะไหล่และ Find My",
      "intro": "iPhone 13 Pro Max ใช้จอ 6.7 นิ้ว ProMotion และมีความจุตั้งแต่ 128GB ถึง 1TB จุดที่ควรดูละเอียดคือ Battery Health, จอ, Face ID, กล้อง และสภาพกรอบสแตนเลส เพราะตำหนิของเครื่องขนาดใหญ่เห็นผลต่อราคาขายต่อชัด.",
      "variantNotes": [
        "มี 128GB, 256GB, 512GB และ 1TB",
        "จอ OLED ProMotion สูงสุด 120Hz และขนาด 6.7 นิ้ว",
        "กล้อง Telephoto 3x และ LiDAR ควรทดสอบ",
        "กรอบสแตนเลสและกระจกหลังควรถ่ายในแสงตรงเพื่อดูรอย"
      ],
      "inspection": [
        "About/Capacity",
        "Battery Health",
        "จอและระบบสัมผัส",
        "Face ID กล้องทุกระยะและ LiDAR-related focus",
        "ลำโพง ไมค์ พอร์ต Lightning และ MagSafe"
      ],
      "priceFactors": [
        "ความจุ",
        "Battery Health",
        "จอ/Face ID",
        "กล้อง",
        "กรอบและกระจกหลัง",
        "อะไหล่/ประกัน"
      ],
      "sellerChecklist": [
        "About",
        "Battery Health",
        "Parts & Service History",
        "รูปจอและกรอบรอบเครื่อง",
        "ทดสอบกล้อง/Face ID",
        "Find My status"
      ],
      "risks": [
        "เครื่องขนาดใหญ่ตกแล้วกรอบอาจบุบหรือบิด ควรถ่ายแนวขอบ",
        "อย่ารีเซ็ตก่อนสำรองข้อมูลสำคัญ",
        "Find My ต้องปิดก่อนส่งมอบโดยเจ้าของบัญชี"
      ],
      "faq": [
        [
          "13 Pro Max กับ 13 Pro ราคาต่างไหม",
          "ต่างจากขนาดจอ แบตและตลาดของแต่ละรุ่นรวมถึงความจุ"
        ],
        [
          "จอมี burn-in รับไหม",
          "ส่งภาพพื้นขาว/เทามาประเมินระดับได้"
        ],
        [
          "กล้องสั่นรับไหม",
          "รับประเมินได้ แต่ควรส่งวิดีโออาการและทดสอบทุกระยะ"
        ],
        [
          "ไม่มีกล่องมีผลไหม",
          "มีผลกับความครบชุด แต่สภาพและความจุยังเป็นปัจจัยหลัก"
        ]
      ],
      "relatedSlugs": [
        "iphone-13-pro",
        "iphone-13",
        "iphone-14-pro-max"
      ],
      "source": {
        "label": "Apple iPhone 13 Pro Max technical specifications",
        "url": "https://support.apple.com/en-us/111870"
      }
    },
    "iphone-14-pro-max": {
      "categorySlug": "iphone",
      "seoTitle": "รับซื้อ iPhone 14 Pro Max ขอนแก่น 128GB ถึง 1TB เช็กแบต จอ Face ID | WINNER IT",
      "metaDescription": "รับซื้อ iPhone 14 Pro Max ขอนแก่น ประเมินความจุ Battery Health, จอ Dynamic Island/ProMotion, Face ID, กล้อง 48MP, Parts History และ Find My",
      "intro": "iPhone 14 Pro Max มี Dynamic Island, จอ ProMotion และกล้องหลัก 48MP แต่การตีราคามือสองยังขึ้นกับความจุ Battery Health จอ Face ID กล้องและประวัติอะไหล่เป็นหลัก ควรส่งหน้า About และ Battery Health ก่อนเทียบราคา.",
      "variantNotes": [
        "มีความจุ 128GB ถึง 1TB",
        "จอ 6.7 นิ้ว OLED ProMotion พร้อม Dynamic Island",
        "กล้องหลัก 48MP และ Telephoto 3x ต้องทดสอบทุกระยะ",
        "ตัวเครื่องสแตนเลสกับกระจกหลังควรถ่ายรอยและรอยตกให้ครบ"
      ],
      "inspection": [
        "About/Capacity",
        "Battery Health",
        "จอ Always-On/ProMotion และ touch",
        "Face ID กล้องทุกระยะและไมค์",
        "Lightning/MagSafe ลำโพงและปุ่ม",
        "Parts & Service History"
      ],
      "priceFactors": [
        "ความจุ",
        "Battery Health",
        "จอ/Face ID",
        "กล้อง",
        "กรอบ/กระจกหลัง",
        "ประวัติอะไหล่/ประกัน"
      ],
      "sellerChecklist": [
        "หน้า About",
        "Battery Health",
        "Parts & Service History",
        "รูปจอและกรอบ",
        "วิดีโอทดสอบกล้องถ้ามีอาการ",
        "Find My"
      ],
      "risks": [
        "หากกล้องสั่นหรือโฟกัสผิดปกติให้บันทึกอาการก่อนรีเซ็ต",
        "จอเปลี่ยนควรแจ้งและส่งประวัติอะไหล่ถ้าระบบแสดง",
        "ห้ามส่งรหัส Apple ID ให้ผู้รับซื้อ"
      ],
      "faq": [
        [
          "14 Pro Max 128 กับ 256GB ต่างไหม",
          "ต่างตามความจุและตลาดของเครื่องจริง"
        ],
        [
          "แบตต่ำกว่าเกณฑ์ยังรับไหม",
          "รับประเมินได้ โดยพิจารณาร่วมกับสภาพและประวัติอะไหล่"
        ],
        [
          "กระจกหลังแตกขายได้ไหม",
          "ส่งรูปประเมินได้ แต่ความเสียหายมีผลต่อราคาสุทธิ"
        ],
        [
          "กล้องเคยซ่อมรับไหม",
          "รับประเมินได้ ควรแจ้งประวัติและทดสอบทุกระยะ"
        ]
      ],
      "relatedSlugs": [
        "iphone-13-pro-max",
        "iphone-15-pro",
        "iphone-16-pro-max"
      ],
      "source": {
        "label": "Apple iPhone 14 Pro Max technical specifications",
        "url": "https://support.apple.com/en-us/111846"
      }
    },
    "iphone-15-pro": {
      "categorySlug": "iphone",
      "seoTitle": "รับซื้อ iPhone 15 Pro ขอนแก่น 128GB ถึง 1TB Titanium USB-C | WINNER IT",
      "metaDescription": "รับซื้อ iPhone 15 Pro ขอนแก่น ประเมินความจุ Battery Health, จอ ProMotion, Face ID, กล้อง, USB-C, กรอบ Titanium, Parts History และ Find My",
      "intro": "iPhone 15 Pro เปลี่ยนเป็นกรอบ Titanium และพอร์ต USB-C พร้อมชิป A17 Pro การประเมินควรดูความจุ Battery Health จอ Face ID กล้อง USB-C และรอยที่กรอบ เพราะรอยตกหรือรอยขอบมีผลกับเครื่องรุ่น Pro ชัดเจน.",
      "variantNotes": [
        "มีความจุ 128GB, 256GB, 512GB และ 1TB",
        "ใช้ USB-C ที่รองรับ USB 3 จึงควรทดสอบทั้งชาร์จและ data",
        "จอ OLED ProMotion พร้อม Always-On และ Dynamic Island",
        "กรอบ Titanium ควรถ่ายขอบทุกด้านและมุมเครื่อง"
      ],
      "inspection": [
        "About/Capacity",
        "Battery Health และข้อมูลแบตที่ระบบแสดง",
        "จอ ProMotion/Face ID",
        "กล้องทุกระยะและวิดีโอ",
        "USB-C ชาร์จและเชื่อมต่อ",
        "Parts & Service History/Find My"
      ],
      "priceFactors": [
        "ความจุ",
        "Battery Health",
        "จอ/Face ID",
        "กล้อง",
        "กรอบ Titanium",
        "USB-C/อะไหล่/ประกัน"
      ],
      "sellerChecklist": [
        "About",
        "Battery Health",
        "Parts & Service History",
        "รูปจอและกรอบ",
        "ทดสอบ USB-C/กล้อง",
        "Find My status"
      ],
      "risks": [
        "ถ้าพอร์ต USB-C หลวมหรือมีรอยไหม้ควรหยุดใช้สายที่มีปัญหา",
        "ห้ามส่งรหัส Apple ID หรือรหัสปลดล็อก",
        "ก่อนส่งมอบต้องสำรองข้อมูลและปิด Find My"
      ],
      "faq": [
        [
          "15 Pro ต่างจาก 15 Pro Max ในการตีราคาไหม",
          "ต่างจากขนาดจอ กล้องบางส่วน ความจุเริ่มต้นและตลาดของแต่ละรุ่น"
        ],
        [
          "USB-C มีปัญหารับไหม",
          "ส่งประเมินได้ โดยแจ้งว่าเสียเฉพาะชาร์จหรือ data"
        ],
        [
          "กรอบเป็นรอยมีผลไหม",
          "มี โดยเฉพาะมุมตกหรือรอยลึก ควรถ่ายหลายมุม"
        ],
        [
          "เปลี่ยนแบตมาแล้วรับไหม",
          "รับประเมินได้ ควรแจ้งประวัติและ Parts & Service History ถ้ามี"
        ]
      ],
      "relatedSlugs": [
        "iphone-14-pro-max",
        "iphone-15-pro-max",
        "iphone-16-pro-max"
      ],
      "source": {
        "label": "Apple iPhone 15 Pro technical specifications",
        "url": "https://support.apple.com/en-asia/111829"
      }
    },
    "ipad-a16": {
      "categorySlug": "ipad-tablet",
      "seoTitle": "รับซื้อ iPad A16 ขอนแก่น 128 256 512GB Wi‑Fi Cellular | WINNER IT",
      "metaDescription": "รับซื้อ iPad A16 ขอนแก่น รุ่นปี 2025 128/256/512GB Wi‑Fi/Cellular ประเมินจอ Touch ID, USB-C, ตัวเครื่อง, iCloud และอุปกรณ์เสริม",
      "intro": "iPad รุ่นชิป A16 ปี 2025 มีความจุ 128GB, 256GB และ 512GB พร้อมรุ่น Wi‑Fi/Cellular การประเมินต้องแยกความจุ การเชื่อมต่อ จอ Touch ID พอร์ต USB-C และสภาพตัวเครื่องก่อน โดยเฉพาะเครื่องที่มีรอยงอหรือมุมกระแทก.",
      "variantNotes": [
        "ความจุ 128/256/512GB ต้องแยกให้ชัด",
        "มี Wi‑Fi และ Wi‑Fi + Cellular",
        "ใช้ชิป A16 และพอร์ต USB-C",
        "รองรับ Apple Pencil USB-C และ Pencil รุ่น 1 ผ่านอะแดปเตอร์"
      ],
      "inspection": [
        "Settings > General > About",
        "จอพื้นขาว/เทาและทัชทั่วจอ",
        "Touch ID ที่ปุ่มบน",
        "USB-C ชาร์จและต่ออุปกรณ์",
        "กล้อง/ลำโพง/ไมค์และขอบเครื่อง",
        "Find My/iCloud"
      ],
      "priceFactors": [
        "ความจุ",
        "Wi‑Fi/Cellular",
        "จอ/Touch ID",
        "ตัวเครื่องงอ/รอยมุม",
        "USB-C",
        "อุปกรณ์เสริม/ประกัน"
      ],
      "sellerChecklist": [
        "หน้า About",
        "รูปจอ",
        "รูปขอบเครื่องจากด้านข้าง",
        "ทดสอบ Touch ID",
        "อุปกรณ์/กล่อง",
        "Find My status"
      ],
      "risks": [
        "อย่าดัดตัวเครื่องเองหากมีอาการงอ",
        "ก่อนล้างเครื่องต้องสำรองข้อมูลและปิด Find My เมื่อพร้อมส่งมอบ",
        "หากขาย Apple Pencil รวมควรระบุรุ่นให้ถูกต้อง"
      ],
      "faq": [
        [
          "iPad A16 มี 64GB ไหม",
          "รุ่น A16 ปี 2025 เริ่มที่ 128GB จึงควรเช็กหน้า About หากข้อมูลไม่ตรง"
        ],
        [
          "Cellular ต่างราคาไหม",
          "ต่างตาม configuration และตลาด โดยต้องดูสภาพร่วมกัน"
        ],
        [
          "มี Apple Pencil ขายรวมได้ไหม",
          "ได้ ควรแจ้งรุ่นและสภาพของปากกาแยก"
        ],
        [
          "จอมีรอยแต่ทัชปกติรับไหม",
          "ส่งภาพพื้นสีอ่อนมาเพื่อประเมินระดับรอยได้"
        ]
      ],
      "relatedSlugs": [
        "ipad-gen-10",
        "ipad-air-m2-11",
        "ipad-air-5"
      ],
      "source": {
        "label": "Apple iPad (A16) technical specifications",
        "url": "https://support.apple.com/th-th/122240"
      }
    },
    "ipad-air-m2-11": {
      "categorySlug": "ipad-tablet",
      "seoTitle": "รับซื้อ iPad Air M2 11 นิ้ว ขอนแก่น Wi‑Fi Cellular 128GB ถึง 1TB | WINNER IT",
      "metaDescription": "รับซื้อ iPad Air M2 11 นิ้ว ขอนแก่น ประเมินความจุ Wi‑Fi/Cellular, จอ, Touch ID, USB-C, ตัวเครื่อง, Apple Pencil Pro/Keyboard และ Find My",
      "intro": "iPad Air M2 11 นิ้วปี 2024 มีความจุหลายระดับและรุ่น Wi‑Fi/Cellular พร้อมรองรับ Apple Pencil Pro การประเมินควรแยกความจุ จอ Touch ID USB-C สภาพตัวเครื่องและอุปกรณ์เสริม ไม่ควรเทียบกับ Air 5 หรือ Air 13 นิ้วแบบเหมารวม.",
      "variantNotes": [
        "มี 128GB, 256GB, 512GB และ 1TB",
        "มี Wi‑Fi และ Wi‑Fi + Cellular",
        "ใช้ชิป M2 และ Touch ID ที่ปุ่มบน",
        "รองรับ Apple Pencil Pro และ Apple Pencil USB-C"
      ],
      "inspection": [
        "About/Capacity",
        "จอและสัมผัสทั่วพื้นที่",
        "Touch ID",
        "USB-C/Smart Connector",
        "ขอบเครื่องและความเรียบของตัวถัง",
        "Apple Pencil/Keyboard ถ้ามี"
      ],
      "priceFactors": [
        "ความจุ",
        "Wi‑Fi/Cellular",
        "จอ/Touch ID",
        "ตัวเครื่อง",
        "อุปกรณ์เสริม",
        "ประกัน/iCloud"
      ],
      "sellerChecklist": [
        "หน้า About",
        "รูปจอ",
        "รูปขอบเครื่อง",
        "ทดสอบ Touch ID",
        "อุปกรณ์เสริม",
        "Find My"
      ],
      "risks": [
        "อย่าดัดเครื่องที่มีอาการงอ",
        "Pencil/Keyboard ควรประเมินแยกสภาพจากตัว iPad",
        "ก่อนรีเซ็ตควรสำรองข้อมูลและปิด Find My เมื่อพร้อมส่งมอบ"
      ],
      "faq": [
        [
          "Air M2 11 กับ Air 5 ต่างราคาไหม",
          "ต่างจากชิป ความจุเริ่มต้น การรองรับอุปกรณ์และตลาดของแต่ละรุ่น"
        ],
        [
          "1TB มีผลไหม",
          "มี เพราะความจุเป็นปัจจัยหลักของรุ่นนี้"
        ],
        [
          "Apple Pencil Pro เพิ่มราคาไหม",
          "ถ้าเป็นของแท้ ใช้งานปกติ และขายรวม สามารถประเมินมูลค่าแยกได้"
        ],
        [
          "Touch ID เสียรับไหม",
          "รับประเมินได้ แต่มีผลต่อราคาเพราะเป็นระบบยืนยันตัวตนหลัก"
        ]
      ],
      "relatedSlugs": [
        "ipad-air-5",
        "ipad-a16",
        "ipad-pro-m4-11"
      ],
      "source": {
        "label": "Apple iPad Air 11-inch (M2) technical specifications",
        "url": "https://support.apple.com/en-au/119894"
      }
    },
    "ipad-pro-m2-11": {
      "categorySlug": "ipad-tablet",
      "seoTitle": "รับซื้อ iPad Pro M2 11 นิ้ว ขอนแก่น Wi‑Fi Cellular Face ID | WINNER IT",
      "metaDescription": "รับซื้อ iPad Pro M2 11 นิ้ว ขอนแก่น ประเมินความจุ Wi‑Fi/Cellular, RAM ตามความจุ, จอ ProMotion, Face ID, Thunderbolt, ตัวเครื่องและอุปกรณ์",
      "intro": "iPad Pro 11 นิ้วรุ่น M2 มีความจุ 128GB ถึง 2TB และ RAM ต่างกันตามกลุ่มความจุ จึงควรส่งหน้า About พร้อมความจุจริง การประเมินต้องดูจอ ProMotion, Face ID, Thunderbolt และสภาพตัวเครื่องควบคู่กัน.",
      "variantNotes": [
        "ใช้ชิป M2 และจอ 11 นิ้ว ProMotion",
        "รุ่น 128/256/512GB ใช้ RAM กลุ่มหนึ่ง ส่วน 1/2TB มี RAM สูงกว่า",
        "มี Wi‑Fi และ Cellular",
        "รองรับ Thunderbolt/USB 4 และ Apple Pencil รุ่นที่รองรับ"
      ],
      "inspection": [
        "About/Capacity",
        "จอ ProMotion/ทัช",
        "Face ID",
        "Thunderbolt/USB-C",
        "กล้อง/ลำโพง",
        "ขอบเครื่องและ Smart Connector"
      ],
      "priceFactors": [
        "ความจุ/RAM",
        "Wi‑Fi/Cellular",
        "จอ/Face ID",
        "ตัวเครื่อง",
        "Thunderbolt",
        "อุปกรณ์เสริม/ประกัน"
      ],
      "sellerChecklist": [
        "About",
        "รูปจอ",
        "ทดสอบ Face ID",
        "รูปขอบเครื่อง",
        "อุปกรณ์เสริม",
        "Find My status"
      ],
      "risks": [
        "Face ID หรือจอเสียมีผลต่อมูลค่าสูง",
        "อย่าดัดตัวเครื่องเองหากงอ",
        "อุปกรณ์เสริมควรแจ้งรุ่นให้ตรงกับ iPad"
      ],
      "faq": [
        [
          "M2 1TB ต่างจาก 256GB แค่ความจุไหม",
          "นอกจากความจุ RAM ของกลุ่ม 1TB/2TB ยังต่างจากกลุ่มความจุต่ำกว่า"
        ],
        [
          "Cellular รับไหม",
          "รับประเมินได้ โดยแยก configuration จาก Wi‑Fi"
        ],
        [
          "Face ID เสียรับไหม",
          "ส่งประเมินได้ แต่มีผลต่อราคาอย่างชัดเจน"
        ],
        [
          "Magic Keyboard ขายรวมได้ไหม",
          "ได้ หากรุ่นตรงและใช้งานปกติ สามารถประเมินแยกได้"
        ]
      ],
      "relatedSlugs": [
        "ipad-pro-m1-11",
        "ipad-pro-m4-11",
        "ipad-air-m2-11"
      ],
      "source": {
        "label": "Apple iPad Pro 11-inch (4th generation, M2) technical specifications",
        "url": "https://support.apple.com/en-ph/111842"
      }
    },
    "ipad-pro-m4-11": {
      "categorySlug": "ipad-tablet",
      "seoTitle": "รับซื้อ iPad Pro M4 11 นิ้ว ขอนแก่น OLED 256GB ถึง 2TB | WINNER IT",
      "metaDescription": "รับซื้อ iPad Pro M4 11 นิ้ว ขอนแก่น ประเมินความจุ RAM, จอ Tandem OLED, Face ID, Thunderbolt, Wi‑Fi/Cellular, nano-texture และอุปกรณ์เสริม",
      "intro": "iPad Pro M4 11 นิ้วปี 2024 เปลี่ยนเป็นจอ Ultra Retina XDR แบบ Tandem OLED และมี configuration 256GB ถึง 2TB โดยกลุ่มความจุสูงมี RAM/CPU ต่างกัน การประเมินจึงต้องแยกความจุ จอ Face ID และตัวเลือก nano-texture ให้ชัด.",
      "variantNotes": [
        "เริ่มที่ 256GB และมี 512GB, 1TB, 2TB",
        "กลุ่ม 1TB/2TB มี RAM และ CPU configuration ต่างจาก 256/512GB",
        "ใช้จอ Tandem OLED ProMotion",
        "ตัวเลือก nano-texture มีในบางความจุและควรแจ้งแยก"
      ],
      "inspection": [
        "About/Capacity",
        "จอ OLED พื้นขาว เทา ดำและ ProMotion",
        "Face ID",
        "Thunderbolt/USB 4",
        "ขอบเครื่องและความเรียบ",
        "Apple Pencil Pro/Magic Keyboard ถ้ามี"
      ],
      "priceFactors": [
        "ความจุ/RAM/CPU config",
        "Wi‑Fi/Cellular",
        "จอ OLED/nano-texture",
        "Face ID",
        "ตัวเครื่อง",
        "อุปกรณ์เสริม/ประกัน"
      ],
      "sellerChecklist": [
        "หน้า About",
        "รูปจอพื้นหลายสี",
        "ทดสอบ Face ID",
        "รูปขอบเครื่อง",
        "แจ้ง nano-texture ถ้ามี",
        "อุปกรณ์/Find My"
      ],
      "risks": [
        "จอ OLED มีมูลค่าสูง หากมี burn-in หรือ pixel ควรถ่ายชัด",
        "nano-texture ควรทำความสะอาดตามวิธีของ Apple",
        "ก่อนส่งมอบต้องปิด Find My โดยเจ้าของบัญชี"
      ],
      "faq": [
        [
          "256GB กับ 1TB ต่างแค่ความจุไหม",
          "ไม่ทั้งหมด กลุ่ม 1TB/2TB มี RAM และ CPU configuration ต่างด้วย"
        ],
        [
          "nano-texture มีผลไหม",
          "มีเพราะเป็นตัวเลือกเฉพาะบาง configuration และต้องดูสภาพผิวจอ"
        ],
        [
          "OLED มี burn-in รับไหม",
          "ส่งภาพพื้นเทา/ขาว/ดำมาประเมินระดับได้"
        ],
        [
          "Pencil Pro ขายรวมได้ไหม",
          "ได้ โดยประเมินสภาพและการทำงานของปากกาแยกจากตัวเครื่อง"
        ]
      ],
      "relatedSlugs": [
        "ipad-pro-m2-11",
        "ipad-air-m2-11",
        "ipad-pro-m1-11"
      ],
      "source": {
        "label": "Apple iPad Pro 11-inch (M4) technical specifications",
        "url": "https://support.apple.com/en-sg/119892"
      }
    },
    "rtx-4060": {
      "categorySlug": "gpu",
      "seoTitle": "รับซื้อ RTX 4060 ขอนแก่น 8GB เช็กประกัน พัดลมและประวัติใช้งาน | WINNER IT",
      "metaDescription": "รับซื้อ GeForce RTX 4060 ขอนแก่น 8GB GDDR6 ประเมินตามแบรนด์/ซิงก์, ประกัน, serial, พัดลม, อุณหภูมิ, พอร์ตและประวัติแกะซ่อม",
      "intro": "GeForce RTX 4060 เดสก์ท็อปใช้หน่วยความจำมาตรฐาน 8GB GDDR6 แต่การ์ดจริงในตลาดมีหลายแบรนด์ หลายขนาดซิงก์และหลายชุดพัดลม การประเมินจึงต้องดูรุ่นเต็ม serial ประกัน สภาพและผลทดสอบ ไม่ใช้ชื่อชิปอย่างเดียว.",
      "variantNotes": [
        "NVIDIA ระบุ RTX 4060 มาตรฐาน 8GB GDDR6",
        "แต่ละแบรนด์ใช้ PCB ซิงก์และพัดลมต่างกัน",
        "รุ่น OC/ขนาดการ์ดอาจต่างแต่ต้องดูสภาพและประกันร่วมกัน",
        "กล่อง ใบเสร็จและ serial ช่วยตรวจประกันได้ง่ายขึ้น"
      ],
      "inspection": [
        "GPU-Z",
        "serial/sticker",
        "พัดลมและซิงก์",
        "HDMI/DisplayPort",
        "อุณหภูมิ/โหลดสั้นเมื่อระบบเสถียร",
        "รอยแกะน็อตหรือคราบ"
      ],
      "priceFactors": [
        "แบรนด์/รุ่นซิงก์",
        "ประกัน",
        "พัดลม/อุณหภูมิ",
        "ประวัติแกะซ่อม",
        "กล่อง/ใบเสร็จ",
        "สภาพพอร์ต"
      ],
      "sellerChecklist": [
        "GPU-Z",
        "รูปหน้าหลังการ์ด",
        "serial",
        "ผลเทสถ้ามี",
        "วันหมดประกัน",
        "ประวัติใช้งาน"
      ],
      "risks": [
        "ถ้าพัดลมไม่หมุนหรืออุณหภูมิผิดปกติไม่ควร stress test ต่อ",
        "หากเคยเปลี่ยน thermal pad ควรแจ้ง",
        "serial เสียหรือสติกเกอร์ขาดควรถ่ายชัดก่อนนัด"
      ],
      "faq": [
        [
          "RTX 4060 8GB ทุกใบเหมือนกันไหม",
          "ชิปและ VRAM หลักเหมือนกันแต่ซิงก์ PCB พัดลมและประกันต่างกันตามผู้ผลิต"
        ],
        [
          "ไม่มีกล่องรับไหม",
          "รับประเมินได้ กล่องเป็นปัจจัยความครบชุดไม่ใช่ปัจจัยเดียว"
        ],
        [
          "พัดลมดังรับไหม",
          "ส่งวิดีโอและอุณหภูมิมาประเมินได้"
        ],
        [
          "เคยใช้งานเรนเดอร์หนักรับไหม",
          "รับประเมินได้ โดยแจ้งรูปแบบใช้งานและผลเทสปัจจุบัน"
        ]
      ],
      "relatedSlugs": [
        "rtx-4060-ti",
        "rtx-4070-super",
        "rtx-3060-ti"
      ],
      "source": {
        "label": "NVIDIA GeForce RTX 4060 specifications",
        "url": "https://www.nvidia.com/th-th/geforce/graphics-cards/40-series/rtx-4060-4060ti/"
      }
    },
    "rtx-4070-super": {
      "categorySlug": "gpu",
      "seoTitle": "รับซื้อ RTX 4070 SUPER ขอนแก่น 12GB เช็กประกันและสภาพ | WINNER IT",
      "metaDescription": "รับซื้อ GeForce RTX 4070 SUPER ขอนแก่น 12GB GDDR6X ประเมินแบรนด์/ซิงก์, ประกัน, serial, หัวไฟ, พัดลม, อุณหภูมิและประวัติใช้งาน",
      "intro": "RTX 4070 SUPER ใช้หน่วยความจำมาตรฐาน 12GB GDDR6X แต่การ์ดจากแต่ละแบรนด์มีซิงก์ ขนาด หัวไฟและเงื่อนไขประกันต่างกัน การประเมินควรดู serial, รุ่นเต็ม, อุณหภูมิและสภาพหัวไฟร่วมกับผลทดสอบ.",
      "variantNotes": [
        "NVIDIA ระบุ RTX 4070 SUPER มาตรฐาน 12GB GDDR6X",
        "มีทั้งรุ่นซิงก์ 2 และ 3 พัดลมตามผู้ผลิต",
        "หัวไฟและอะแดปเตอร์ที่ใช้ควรถ่ายสภาพก่อนนัด",
        "ประกันคงเหลือมีน้ำหนักสูงในกลุ่มการ์ดราคาสูง"
      ],
      "inspection": [
        "GPU-Z",
        "serial/ประกัน",
        "พัดลมและซิงก์",
        "หัวไฟและพอร์ต",
        "อุณหภูมิ/ผลเทส",
        "รอยแกะหรือคราบบน PCB/ซิงก์"
      ],
      "priceFactors": [
        "แบรนด์/รุ่นซิงก์",
        "ประกัน",
        "พัดลม/อุณหภูมิ",
        "หัวไฟ",
        "ประวัติแกะซ่อม",
        "กล่อง/อุปกรณ์"
      ],
      "sellerChecklist": [
        "รุ่นเต็ม",
        "GPU-Z",
        "serial",
        "รูปหัวไฟ/พอร์ต",
        "ผลเทส",
        "วันหมดประกัน"
      ],
      "risks": [
        "หากหัวไฟมีรอยไหม้หรือหลวมควรหยุดใช้งานและแจ้ง",
        "อย่า stress test ต่อถ้าพัดลมผิดปกติ",
        "การ์ดที่เคยซ่อมภาคไฟควรแจ้งก่อนประเมิน"
      ],
      "faq": [
        [
          "4070 SUPER ต่างจาก 4070 ไหม",
          "ต่างทั้งจำนวน CUDA core และสเปกบางส่วน จึงต้องระบุ SUPER ให้ชัด"
        ],
        [
          "12GB ทุกแบรนด์ราคาเท่ากันไหม",
          "ไม่เท่ากันเพราะซิงก์ ประกันและสภาพแตกต่างกัน"
        ],
        [
          "ไม่มีใบเสร็จรับไหม",
          "ส่งประเมินได้ แต่การตรวจประกันอาจจำกัดตามผู้ผลิต"
        ],
        [
          "หัวไฟมีรอยรับไหม",
          "ต้องดูระดับความเสียหาย ควรหยุดใช้งานและส่งรูปชัดก่อน"
        ]
      ],
      "relatedSlugs": [
        "rtx-4060",
        "rtx-4060-ti",
        "rtx-5070"
      ],
      "source": {
        "label": "NVIDIA GeForce RTX 4070 family specifications",
        "url": "https://www.nvidia.com/th-th/geforce/graphics-cards/40-series/rtx-4070-family/"
      }
    },
    "rtx-5070": {
      "categorySlug": "gpu",
      "seoTitle": "รับซื้อ RTX 5070 ขอนแก่น 12GB GDDR7 ประกันเหลือ | WINNER IT",
      "metaDescription": "รับซื้อ GeForce RTX 5070 ขอนแก่น 12GB GDDR7 ประเมินแบรนด์/ซิงก์, ประกัน, serial, หัวไฟ, พัดลม, อุณหภูมิและสภาพจริง ไม่ล็อกราคาเก่า",
      "intro": "RTX 5070 เป็นการ์ด Blackwell ที่ NVIDIA ระบุหน่วยความจำมาตรฐาน 12GB GDDR7 ตลาดมือสองของรุ่นใหม่เปลี่ยนตามโปรโมชันและประกันเร็ว จึงควรใช้รุ่นเต็ม วันที่ซื้อ serial และสภาพจริงเพื่อประเมินแทนตัวเลขราคาตายตัว.",
      "variantNotes": [
        "RTX 5070 มาตรฐานใช้ 12GB GDDR7",
        "การ์ดแต่ละแบรนด์มีขนาดซิงก์และระบบไฟต่างกัน",
        "ประกันคงเหลือและวันที่ซื้อสำคัญมากในสินค้ารุ่นใหม่",
        "ราคาควรอิงตลาดวันที่ตรวจ ไม่ใช้ราคาเปิดตัวเป็นฐานถาวร"
      ],
      "inspection": [
        "GPU-Z",
        "serial/ใบเสร็จโดยปิดข้อมูลส่วนตัวได้",
        "พัดลม/ซิงก์",
        "หัวไฟและพอร์ต",
        "ผลเทสและอุณหภูมิ",
        "กล่อง/อุปกรณ์"
      ],
      "priceFactors": [
        "แบรนด์/รุ่นซิงก์",
        "ประกัน",
        "วันที่ซื้อ",
        "พัดลม/อุณหภูมิ",
        "หัวไฟ",
        "กล่อง/ใบเสร็จ"
      ],
      "sellerChecklist": [
        "รุ่นเต็ม",
        "GPU-Z",
        "serial",
        "วันซื้อ/ประกัน",
        "รูปหัวไฟ/พอร์ต",
        "ผลเทสถ้ามี"
      ],
      "risks": [
        "ตลาดรุ่นใหม่เปลี่ยนเร็วจึงไม่ควรยึดราคาบนหน้าเว็บเป็นราคาตายตัว",
        "หากหัวไฟมีรอยไหม้หรือหลวมให้หยุดใช้งาน",
        "ใบเสร็จสามารถปิดชื่อ ที่อยู่ และข้อมูลส่วนตัวก่อนส่งรูป"
      ],
      "faq": [
        [
          "RTX 5070 12GB รับซื้อเท่าไร",
          "ต้องดูแบรนด์ รุ่นซิงก์ ประกันและตลาดวันที่ตรวจ จึงไม่ฟันธงจากชื่อชิปอย่างเดียว"
        ],
        [
          "เพิ่งซื้อช่วยราคาไหม",
          "อายุและประกันที่เหลือเป็นปัจจัยสำคัญเมื่อสภาพสมบูรณ์"
        ],
        [
          "ไม่มีใบเสร็จรับไหม",
          "ส่งประเมินได้ แต่การตรวจประกันอาจจำกัดกว่า"
        ],
        [
          "ขายพร้อมคอมทั้งเครื่องได้ไหม",
          "ได้ สามารถส่งสเปกทั้งชุดเพื่อเทียบการขายรวมกับแยกการ์ด"
        ]
      ],
      "relatedSlugs": [
        "rtx-5060",
        "rtx-4070-super",
        "rtx-4060-ti"
      ],
      "source": {
        "label": "NVIDIA GeForce RTX 5070 specifications",
        "url": "https://www.nvidia.com/th-th/geforce/graphics-cards/50-series/rtx-5070-family/"
      }
    },
    "rx-7800-xt": {
      "categorySlug": "gpu",
      "seoTitle": "รับซื้อ Radeon RX 7800 XT ขอนแก่น 16GB เช็กประกัน พัดลมและหัวไฟ | WINNER IT",
      "metaDescription": "รับซื้อ AMD Radeon RX 7800 XT ขอนแก่น 16GB GDDR6 ประเมินแบรนด์/ซิงก์, ประกัน, serial, 2x8-pin, พัดลม, อุณหภูมิและประวัติใช้งาน",
      "intro": "Radeon RX 7800 XT ใช้หน่วยความจำ 16GB GDDR6 และการ์ดอ้างอิงใช้หัวไฟ 8-pin สองชุด แต่รุ่นขายจริงจากแต่ละแบรนด์มีซิงก์ ขนาดและการตั้งค่าต่างกัน การประเมินจึงต้องดูรุ่นเต็ม serial ประกันและผลทดสอบ.",
      "variantNotes": [
        "AMD ระบุ RX 7800 XT มี VRAM 16GB GDDR6",
        "สเปกอ้างอิงใช้หัวไฟ 2x8-pin และการ์ด custom อาจมีขนาดต่างกัน",
        "แต่ละแบรนด์มีซิงก์และ BIOS profile ต่างกัน",
        "ประวัติใช้งานหนักหรือแกะเปลี่ยน thermal pad ควรแจ้งตามจริง"
      ],
      "inspection": [
        "GPU-Z/AMD Software",
        "serial/sticker",
        "พัดลม/ซิงก์",
        "หัวไฟ 8-pin และพอร์ตภาพ",
        "อุณหภูมิ/ผลเทส",
        "รอยแกะน็อตหรือคราบ"
      ],
      "priceFactors": [
        "แบรนด์/รุ่นซิงก์",
        "ประกัน",
        "พัดลม/อุณหภูมิ",
        "หัวไฟ/พอร์ต",
        "ประวัติแกะซ่อม",
        "กล่อง/ใบเสร็จ"
      ],
      "sellerChecklist": [
        "รุ่นเต็ม",
        "GPU-Z",
        "serial",
        "รูปหัวไฟ/พอร์ต",
        "ผลเทส",
        "วันหมดประกัน"
      ],
      "risks": [
        "ถ้าหัวไฟหรือคอนเน็กเตอร์มีรอยไหม้ให้หยุดใช้งาน",
        "อย่า stress test ต่อหากพัดลมไม่หมุนหรือ hotspot ผิดปกติ",
        "ถ้าเคย flash BIOS หรือแกะเปลี่ยน thermal pad ควรแจ้ง"
      ],
      "faq": [
        [
          "RX 7800 XT 16GB ทุกใบราคาเท่ากันไหม",
          "ไม่เท่ากันเพราะแบรนด์ ซิงก์ ประกันและสภาพแตกต่างกัน"
        ],
        [
          "เคย undervolt มีผลไหม",
          "ไม่จำเป็นต้องเสียหาย แต่ควรคืนค่าปกติและแจ้งหากมี BIOS หรือ profile พิเศษ"
        ],
        [
          "ไม่มี กล่องรับไหม",
          "รับประเมินได้ กล่องเป็นเพียงหนึ่งในปัจจัยความครบชุด"
        ],
        [
          "พัดลมมีเสียงรับไหม",
          "ส่งวิดีโอและข้อมูลอุณหภูมิมาประเมินได้"
        ]
      ],
      "relatedSlugs": [
        "rtx-4070-super",
        "rtx-4060-ti",
        "rtx-5060"
      ],
      "source": {
        "label": "AMD Radeon RX 7800 XT specifications",
        "url": "https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7800-xt.html"
      }
    },
  ...BATCH4_HIGH_INTENT_CONTENT,
  ...BATCH5_HIGH_INTENT_CONTENT,
  ...BATCH13_MODEL_CONTENT,
  ...BATCH14_MODEL_CONTENT,
  ...BATCH16B_MODEL_CONTENT,
  ...BATCH16C_MODEL_CONTENT,
  ...BATCH16D_MODEL_CONTENT,
};

export const HIGH_INTENT_MODEL_RELEASE_SLUGS = Object.freeze(Object.keys(HIGH_INTENT_MODEL_CONTENT));
export const HIGH_INTENT_MODEL_RELEASE_SET = new Set(HIGH_INTENT_MODEL_RELEASE_SLUGS);

export function getHighIntentModelContent(slugOrPage) {
  if (!slugOrPage) return null;
  const slug = typeof slugOrPage === 'string'
    ? slugOrPage.replace(/^รับซื้อ-|^\/+|\/+$/g, '').replace(/-ขอนแก่น$/, '')
    : slugOrPage.id?.replace(/^model-/, '') || slugOrPage.slug;
  return HIGH_INTENT_MODEL_CONTENT[slug] || null;
}
