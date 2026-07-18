# Exact Image Dimension Matrix

ค่ามาจาก production render: main usable width 345/375/415/753/1009/1425/1905 px; `.container` cap 1200 px, detail hero cap 980 px, article body 900 px, legal 720 px, current trust cards max 329×247 px.

| Slot class | Render target desktop | Render target mobile | Aspect | Master | Candidates | Budget |
|---|---:|---:|---|---:|---|---:|
| Homepage split hero | 480×320 | 345×259 | desktop 3:2; mobile 4:3 | 1600×1067 + mobile crop 960×720 | 480, 768, 1024, 1280, 1600 | 150 KB |
| Detail/category hero | 420×280 in proposed 980 split | 345×259 | 3:2 / 4:3 crop | 1400×933 | 480, 768, 1024, 1280 | 130 KB |
| Trust/card photo | 329×247 | 345×259 | 4:3 | 1200×900 | 480, 768, 1024 | 110 KB |
| Article/condition inline | 760×507 | 345×230 | 3:2 | 1600×1067 | 480, 768, 1024, 1280 | 140 KB |
| Legal/About wide evidence | 720×480 | 345×230 | 3:2 | 1600×1067 | 480, 768, 1024, 1280, 1600 | 140 KB |
| Portrait | 320×400 | 280×350 | 4:5 | 1200×1500 | 320, 480, 640, 960 | 110 KB |
| Category/card thumbnail | 270×203 | 345×259 | 4:3 | 960×720 | 320, 480, 640, 800 | 70 KB |
| Article hero | 900×506 | 345×194 | 16:9 | 1600×900 | 480, 768, 1024, 1280, 1600 | 150 KB |
| OG | crawler 1200×630 | same | 1.91:1 | 1200×630 | fixed | 250 KB |
| QR | 240×240 | 200×200 | 1:1 | 600×600 | 240, 360, 480 | 45 KB |
| Icon/diagram | layout dependent | layout dependent | SVG viewBox | vector | n/a | 8–60 KB |

อย่าส่ง 2× master ทุกครั้ง; browser เลือก candidate ใกล้ rendered width × DPR. ห้าม upscale. Focal safe area: hero desktop เว้น 15% ด้าน copy; mobile เว้น 12% รอบ subject. ไม่แนะนำข้อความฝังใน content image; OG เว้น 96 px รอบขอบและทดสอบที่ความกว้าง 320 px.
