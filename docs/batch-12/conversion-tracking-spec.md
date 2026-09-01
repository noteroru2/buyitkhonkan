# Conversion Tracking Specification

Provider: GTM เดิมเมื่อกำหนด `PUBLIC_GTM_ID`; หากไม่มี ID ระบบยัง push ลง `dataLayer` แบบ fail-safe และ CTA ทำงานตามปกติ ไม่มี ID ปลอม.

Events: `line_click`, `phone_click`, `mobile_sticky_line_click`, `mobile_sticky_phone_click`, `hero_line_click`, `hero_phone_click`, `category_click`, `area_page_click`, `article_click`, `assessment_checklist_open`, `mobile_menu_open`, `mobile_menu_item_click`.

Utility กลางอยู่ใน `Base.astro` และส่งเฉพาะ `page_path`, `page_type`, `cta_location`, `item_category`, `area_name`, sanitized `link_url`, `device_context`. ไม่ส่งชื่อ เบอร์โทร LINE ID ข้อความลูกค้า หรือ link text. Event handler ไม่ preventDefault จึงรองรับ middle click/new tab และ provider failure.

ทดสอบโดยเปิด DevTools และตรวจ `window.dataLayer` หลังใช้ CTA/เมนู. Event ที่ยังไม่มี UI trigger (`assessment_checklist_open`) ถูกสงวนใน spec และยังไม่ยิงจนกว่าจะเพิ่ม checklist.
