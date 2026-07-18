# Mobile Navigation QA

Source/build inspection PASS: hamburger 44x44, accessible name, `aria-expanded`, `aria-controls`, Escape, overlay close, focus trap, focus return, body scroll lock, close on link, reduced motion และพื้นที่ด้านล่างเผื่อ sticky CTA ครบ. Desktop navigation breakpoint เดิมคงอยู่และ build ไม่มี error.

Automated browser visual run รอบนี้ถูกบล็อกเพราะ port 4321 ถูก process อื่นใช้อยู่และ in-app browser แยก network จาก preview port ใหม่ จึงยังไม่มีหลักฐาน interaction ใหม่ครบ 7 viewport. ผล responsive QA เดิม 77 cases ผ่าน แต่ไม่ครอบคลุม drawer ใหม่ ดังนั้น verdict ส่วนนี้เป็น **WARNING** และเป็นเหตุผลที่ยังไม่ deploy production.

ต้อง rerun ก่อน deploy ที่ 360x800, 390x844, 430x932, 768x1024, 1024x768, 1440x900, 1920x1080 เพื่อตรวจ open/close, Tab loop, Escape, focus return, overlay, scroll lock, sticky overlap, overflow, console และ failed requests.
