import phone from '../assets/images/products/phones/iphone.webp';
import notebook from '../assets/images/products/notebooks/asus-tuf.webp';
import computer from '../assets/images/products/computers/white-gaming-pc.webp';
import camera from '../assets/images/products/cameras/camera-collection.webp';
import macbook from '../assets/images/products/notebooks/macbook-air.webp';
import tablet from '../assets/images/products/tablets/samsung-galaxy-tab.webp';
import monitor from '../assets/images/products/monitors/msi-monitor.webp';
import consoleImage from '../assets/images/products/consoles/handheld-console.webp';

export const PRODUCT_IMAGES = {
  smartphone: { src: phone, alt: 'ตัวอย่างสมาร์ตโฟนที่สามารถส่งรูปเพื่อประเมินราคาได้', position: 'center' },
  notebook: { src: notebook, alt: 'ตัวอย่างโน้ตบุ๊กเกมมิ่งสำหรับส่งข้อมูลประเมินราคา', position: 'center' },
  computer: { src: computer, alt: 'ตัวอย่างคอมพิวเตอร์ตั้งโต๊ะสำหรับส่งข้อมูลประเมินราคา', position: 'center' },
  camera: { src: camera, alt: 'ตัวอย่างกล้องและเลนส์ที่สามารถส่งรูปประเมินราคาได้', position: 'center' },
  macbook: { src: macbook, alt: 'ตัวอย่าง MacBook Air สำหรับส่งข้อมูลประเมินราคา', position: 'center' },
  'ipad-tablet': { src: tablet, alt: 'ตัวอย่างแท็บเล็ตสำหรับส่งข้อมูลประเมินราคา', position: 'center' },
  monitor: { src: monitor, alt: 'ตัวอย่างจอมอนิเตอร์สำหรับส่งข้อมูลประเมินราคา', position: 'center' },
  'game-console': { src: consoleImage, alt: 'ตัวอย่างเครื่องเกมพกพาสำหรับส่งข้อมูลประเมินราคา', position: 'center' },
} as const;
