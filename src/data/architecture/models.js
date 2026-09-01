import { defineArchitecturePage } from './_shared.js';
import { HIGH_INTENT_MODEL_CONTENT } from '../highIntentModelContent.js';

const RAW = [
  {
    "slug": "asus-rog-zephyrus-g14",
    "label": "ASUS ROG Zephyrus G14",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-rog-zephyrus-g16",
    "label": "ASUS ROG Zephyrus G16",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-rog-strix-g16",
    "label": "ASUS ROG Strix G16",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-rog-strix-g18",
    "label": "ASUS ROG Strix G18",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-rog-scar-16",
    "label": "ASUS ROG Strix SCAR 16",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-rog-scar-18",
    "label": "ASUS ROG Strix SCAR 18",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-tuf-gaming-a14",
    "label": "ASUS TUF Gaming A14",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-tuf-gaming-a15",
    "label": "ASUS TUF Gaming A15",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-tuf-gaming-a16",
    "label": "ASUS TUF Gaming A16",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "asus-tuf-gaming-f15",
    "label": "ASUS TUF Gaming F15",
    "cluster": "notebook-asus",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-legion-5",
    "label": "Lenovo Legion 5",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-legion-5i",
    "label": "Lenovo Legion 5i",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-legion-7",
    "label": "Lenovo Legion 7",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-legion-pro-5",
    "label": "Lenovo Legion Pro 5",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-legion-pro-7",
    "label": "Lenovo Legion Pro 7",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-loq-15",
    "label": "Lenovo LOQ 15",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-loq-16",
    "label": "Lenovo LOQ 16",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-thinkpad-t14",
    "label": "Lenovo ThinkPad T14",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-thinkpad-x1-carbon",
    "label": "Lenovo ThinkPad X1 Carbon",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "lenovo-ideapad-slim-5",
    "label": "Lenovo IdeaPad Slim 5",
    "cluster": "notebook-lenovo",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "acer-nitro-v15",
    "label": "Acer Nitro V 15",
    "cluster": "notebook-acer",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "acer-nitro-5",
    "label": "Acer Nitro 5",
    "cluster": "notebook-acer",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "acer-predator-helios-neo-16",
    "label": "Acer Predator Helios Neo 16",
    "cluster": "notebook-acer",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "acer-predator-helios-16",
    "label": "Acer Predator Helios 16",
    "cluster": "notebook-acer",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "acer-aspire-3",
    "label": "Acer Aspire 3",
    "cluster": "notebook-acer",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "acer-aspire-5",
    "label": "Acer Aspire 5",
    "cluster": "notebook-acer",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "acer-swift-go-14",
    "label": "Acer Swift Go 14",
    "cluster": "notebook-acer",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "hp-victus-15",
    "label": "HP Victus 15",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "hp-victus-16",
    "label": "HP Victus 16",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "hp-omen-16",
    "label": "HP Omen 16",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "hp-elitebook-840",
    "label": "HP EliteBook 840",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "hp-probook-440",
    "label": "HP ProBook 440",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "dell-latitude-7440",
    "label": "Dell Latitude 7440",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "dell-xps-13",
    "label": "Dell XPS 13",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "dell-g15",
    "label": "Dell G15",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "msi-katana-15",
    "label": "MSI Katana 15",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "msi-cyborg-15",
    "label": "MSI Cyborg 15",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "msi-thin-15",
    "label": "MSI Thin 15",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "msi-raider-ge68",
    "label": "MSI Raider GE68",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "msi-modern-14",
    "label": "MSI Modern 14",
    "cluster": "notebook-hp-dell-msi",
    "parent": "/รับซื้อโน้ตบุ๊ก-ขอนแก่น/"
  },
  {
    "slug": "macbook-air-m1",
    "label": "MacBook Air M1",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-air-m2",
    "label": "MacBook Air M2",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-air-m3",
    "label": "MacBook Air M3",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-air-m4",
    "label": "MacBook Air M4",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-13-m1",
    "label": "MacBook Pro 13 M1",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-14-m1-pro",
    "label": "MacBook Pro 14 M1 Pro",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-16-m1-pro",
    "label": "MacBook Pro 16 M1 Pro",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-14-m2-pro",
    "label": "MacBook Pro 14 M2 Pro",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-16-m2-pro",
    "label": "MacBook Pro 16 M2 Pro",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-14-m3",
    "label": "MacBook Pro 14 M3",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-14-m4",
    "label": "MacBook Pro 14 M4",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "macbook-pro-16-m4-pro",
    "label": "MacBook Pro 16 M4 Pro",
    "cluster": "macbook",
    "parent": "/รับซื้อ-macbook-ขอนแก่น/"
  },
  {
    "slug": "iphone-11",
    "label": "iPhone 11",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-11-pro",
    "label": "iPhone 11 Pro",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-11-pro-max",
    "label": "iPhone 11 Pro Max",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-12",
    "label": "iPhone 12",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-12-mini",
    "label": "iPhone 12 mini",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-12-pro",
    "label": "iPhone 12 Pro",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-12-pro-max",
    "label": "iPhone 12 Pro Max",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-13",
    "label": "iPhone 13",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-13-mini",
    "label": "iPhone 13 mini",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-13-pro",
    "label": "iPhone 13 Pro",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-13-pro-max",
    "label": "iPhone 13 Pro Max",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-14",
    "label": "iPhone 14",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-14-plus",
    "label": "iPhone 14 Plus",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-14-pro",
    "label": "iPhone 14 Pro",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-14-pro-max",
    "label": "iPhone 14 Pro Max",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-15",
    "label": "iPhone 15",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-15-plus",
    "label": "iPhone 15 Plus",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-15-pro",
    "label": "iPhone 15 Pro",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-15-pro-max",
    "label": "iPhone 15 Pro Max",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-16",
    "label": "iPhone 16",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-16-plus",
    "label": "iPhone 16 Plus",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-16-pro",
    "label": "iPhone 16 Pro",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "iphone-16-pro-max",
    "label": "iPhone 16 Pro Max",
    "cluster": "iphone",
    "parent": "/รับซื้อ-iphone-ขอนแก่น/"
  },
  {
    "slug": "ipad-gen-9",
    "label": "iPad Gen 9",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-gen-10",
    "label": "iPad Gen 10",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-a16",
    "label": "iPad A16",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-air-4",
    "label": "iPad Air 4",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-air-5",
    "label": "iPad Air 5",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-air-m2-11",
    "label": "iPad Air M2 11-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-air-m2-13",
    "label": "iPad Air M2 13-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-pro-m1-11",
    "label": "iPad Pro M1 11-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-pro-m1-12-9",
    "label": "iPad Pro M1 12.9-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-pro-m2-11",
    "label": "iPad Pro M2 11-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-pro-m2-12-9",
    "label": "iPad Pro M2 12.9-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-pro-m4-11",
    "label": "iPad Pro M4 11-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-pro-m4-13",
    "label": "iPad Pro M4 13-inch",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-mini-6",
    "label": "iPad mini 6",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "ipad-mini-a17-pro",
    "label": "iPad mini A17 Pro",
    "cluster": "ipad",
    "parent": "/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/"
  },
  {
    "slug": "rtx-3060",
    "label": "GeForce RTX 3060",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-3060-ti",
    "label": "GeForce RTX 3060 Ti",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-3070",
    "label": "GeForce RTX 3070",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-3070-ti",
    "label": "GeForce RTX 3070 Ti",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-3080",
    "label": "GeForce RTX 3080",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-3080-ti",
    "label": "GeForce RTX 3080 Ti",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-3090",
    "label": "GeForce RTX 3090",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4060",
    "label": "GeForce RTX 4060",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4060-ti",
    "label": "GeForce RTX 4060 Ti",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4070",
    "label": "GeForce RTX 4070",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4070-super",
    "label": "GeForce RTX 4070 SUPER",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4070-ti-super",
    "label": "GeForce RTX 4070 Ti SUPER",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4080",
    "label": "GeForce RTX 4080",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4080-super",
    "label": "GeForce RTX 4080 SUPER",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-4090",
    "label": "GeForce RTX 4090",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-5060",
    "label": "GeForce RTX 5060",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-5060-ti",
    "label": "GeForce RTX 5060 Ti",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rtx-5070",
    "label": "GeForce RTX 5070",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rx-6600",
    "label": "Radeon RX 6600",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rx-6700-xt",
    "label": "Radeon RX 6700 XT",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rx-7600",
    "label": "Radeon RX 7600",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rx-7700-xt",
    "label": "Radeon RX 7700 XT",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rx-7800-xt",
    "label": "Radeon RX 7800 XT",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rx-7900-xt",
    "label": "Radeon RX 7900 XT",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "rx-7900-xtx",
    "label": "Radeon RX 7900 XTX",
    "cluster": "gpu",
    "parent": "/รับซื้อการ์ดจอ-ขอนแก่น/"
  },
  {
    "slug": "intel-core-i5-12400f",
    "label": "Intel Core i5-12400F",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "intel-core-i5-13400f",
    "label": "Intel Core i5-13400F",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "intel-core-i5-14400f",
    "label": "Intel Core i5-14400F",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "intel-core-i7-12700",
    "label": "Intel Core i7-12700",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "intel-core-i7-13700",
    "label": "Intel Core i7-13700",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "amd-ryzen-5-5500",
    "label": "AMD Ryzen 5 5500",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "amd-ryzen-5-5600",
    "label": "AMD Ryzen 5 5600",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "amd-ryzen-5-7500f",
    "label": "AMD Ryzen 5 7500F",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "amd-ryzen-7-5700x",
    "label": "AMD Ryzen 7 5700X",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "amd-ryzen-7-7800x3d",
    "label": "AMD Ryzen 7 7800X3D",
    "cluster": "cpu-parts",
    "parent": "/รับซื้อคอมพิวเตอร์-ขอนแก่น/"
  },
  {
    "slug": "sony-a6000",
    "label": "Sony A6000",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "sony-a6400",
    "label": "Sony A6400",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "sony-a6600",
    "label": "Sony A6600",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "sony-a7-iii",
    "label": "Sony A7 III",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "sony-a7-iv",
    "label": "Sony A7 IV",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "canon-eos-r",
    "label": "Canon EOS R",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "canon-eos-r6",
    "label": "Canon EOS R6",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "canon-eos-r7",
    "label": "Canon EOS R7",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "canon-eos-r10",
    "label": "Canon EOS R10",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "fujifilm-x-t20",
    "label": "Fujifilm X-T20",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "fujifilm-x-t30",
    "label": "Fujifilm X-T30",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "fujifilm-x-t4",
    "label": "Fujifilm X-T4",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "fujifilm-x-t5",
    "label": "Fujifilm X-T5",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "fujifilm-x-s10",
    "label": "Fujifilm X-S10",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "fujifilm-x-h1",
    "label": "Fujifilm X-H1",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "olympus-em10-mark-iii",
    "label": "Olympus OM-D E-M10 Mark III",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "olympus-em5-mark-iii",
    "label": "Olympus OM-D E-M5 Mark III",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "panasonic-g85",
    "label": "Panasonic Lumix G85",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "panasonic-gh5",
    "label": "Panasonic Lumix GH5",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "nikon-z5",
    "label": "Nikon Z5",
    "cluster": "camera",
    "parent": "/รับซื้อกล้อง-ขอนแก่น/"
  },
  {
    "slug": "playstation-5",
    "label": "PlayStation 5",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "playstation-5-slim",
    "label": "PlayStation 5 Slim",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "playstation-4-pro",
    "label": "PlayStation 4 Pro",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "nintendo-switch",
    "label": "Nintendo Switch",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "nintendo-switch-oled",
    "label": "Nintendo Switch OLED",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "nintendo-switch-lite",
    "label": "Nintendo Switch Lite",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "xbox-series-x",
    "label": "Xbox Series X",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "xbox-series-s",
    "label": "Xbox Series S",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "steam-deck",
    "label": "Steam Deck",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "rog-ally",
    "label": "ASUS ROG Ally",
    "cluster": "console",
    "parent": "/รับซื้อเครื่องเกม-ขอนแก่น/"
  },
  {
    "slug": "monitor-24-ips",
    "label": "จอคอม 24 นิ้ว IPS",
    "h1": "รับซื้อจอคอม 24 นิ้ว IPS ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-27-ips",
    "label": "จอคอม 27 นิ้ว IPS",
    "h1": "รับซื้อจอคอม 27 นิ้ว IPS ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-27-144hz",
    "label": "จอเกมมิ่ง 27 นิ้ว 144Hz",
    "h1": "รับซื้อจอเกมมิ่ง 27 นิ้ว 144Hz ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-27-165hz",
    "label": "จอเกมมิ่ง 27 นิ้ว 165Hz",
    "h1": "รับซื้อจอเกมมิ่ง 27 นิ้ว 165Hz ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-32-144hz",
    "label": "จอเกมมิ่ง 32 นิ้ว 144Hz",
    "h1": "รับซื้อจอเกมมิ่ง 32 นิ้ว 144Hz ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-2k",
    "label": "จอคอม 2K QHD",
    "h1": "รับซื้อจอคอม 2K QHD ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-4k",
    "label": "จอคอม 4K",
    "h1": "รับซื้อจอคอม 4K ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-ultrawide",
    "label": "จอ Ultrawide",
    "h1": "รับซื้อจอ Ultrawide ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "monitor-oled",
    "label": "จอ OLED Gaming",
    "h1": "รับซื้อจอ OLED Gaming ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "portable-monitor",
    "label": "จอ Portable Monitor",
    "h1": "รับซื้อ Portable Monitor ขอนแก่น",
    "cluster": "monitor",
    "parent": "/รับซื้อจอคอม-ขอนแก่น/"
  },
  {
    "slug": "dji-mini-2",
    "label": "DJI Mini 2",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "dji-mini-3-pro",
    "label": "DJI Mini 3 Pro",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "dji-mini-4-pro",
    "label": "DJI Mini 4 Pro",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "dji-air-2s",
    "label": "DJI Air 2S",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "dji-air-3",
    "label": "DJI Air 3",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "dji-mavic-air",
    "label": "DJI Mavic Air",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "gopro-hero-10",
    "label": "GoPro HERO10",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "gopro-hero-11",
    "label": "GoPro HERO11",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "gopro-hero-12",
    "label": "GoPro HERO12",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "dji-osmo-action-4",
    "label": "DJI Osmo Action 4",
    "cluster": "drone-action",
    "parent": "/รับซื้อโดรน-gopro-ขอนแก่น/"
  },
  {
    "slug": "apple-watch-series-7",
    "label": "Apple Watch Series 7",
    "cluster": "smartwatch",
    "parent": "/รับซื้อสมาร์ทวอทช์-ขอนแก่น/"
  },
  {
    "slug": "apple-watch-series-8",
    "label": "Apple Watch Series 8",
    "cluster": "smartwatch",
    "parent": "/รับซื้อสมาร์ทวอทช์-ขอนแก่น/"
  },
  {
    "slug": "apple-watch-series-9",
    "label": "Apple Watch Series 9",
    "cluster": "smartwatch",
    "parent": "/รับซื้อสมาร์ทวอทช์-ขอนแก่น/"
  },
  {
    "slug": "apple-watch-ultra",
    "label": "Apple Watch Ultra",
    "cluster": "smartwatch",
    "parent": "/รับซื้อสมาร์ทวอทช์-ขอนแก่น/"
  },
  {
    "slug": "apple-watch-ultra-2",
    "label": "Apple Watch Ultra 2",
    "cluster": "smartwatch",
    "parent": "/รับซื้อสมาร์ทวอทช์-ขอนแก่น/"
  }
];

export const MODEL_ARCHITECTURE = RAW.map((page) => {
  const releasedContent = HIGH_INTENT_MODEL_CONTENT[page.slug];
  return defineArchitecturePage({
    id: `model-${page.slug}`,
    slug: page.slug,
    path: `รับซื้อ-${page.slug}-ขอนแก่น`,
    type: 'model',
    cluster: page.cluster,
    label: page.label,
    h1: page.h1,
    parent: page.parent,
    directory: '/ยี่ห้อและรุ่นที่รับซื้อ/',
    lifecycle: releasedContent ? 'INDEX' : 'HOLD_NOINDEX',
    title: releasedContent?.seoTitle,
    description: releasedContent?.metaDescription,
  });
});
