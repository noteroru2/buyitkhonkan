/**
 * Content Batch 15 — Remaining Architecture Quality Triage
 *
 * This registry is editorial planning only. It MUST NOT change lifecycle by itself.
 * HOLD_NOINDEX pages remain noindex until a later release batch supplies content,
 * internal-link integration and passes the normal release gates.
 */

export const TRIAGE_DECISIONS = Object.freeze({
  RELEASE: 'RELEASE',
  KEEP_HOLD: 'KEEP_HOLD',
  MERGE: 'MERGE',
  RETIRE: 'RETIRE',
});

const RELEASE = TRIAGE_DECISIONS.RELEASE;
const KEEP_HOLD = TRIAGE_DECISIONS.KEEP_HOLD;
const MERGE = TRIAGE_DECISIONS.MERGE;

const rows = [
  // Authority hubs — high structural value, but lifecycle stays HOLD until a dedicated content release.
  ['hub-products', RELEASE, '', 'Master product hub is structurally useful and can consolidate discovery across live money categories. Release only after dedicated hub copy and live-child QA.'],
  ['hub-brands-models', RELEASE, '', 'Brand/model directory is a strong discovery hub for the 132 live model pages. Release only after a non-thin directory experience and crawl QA.'],

  // ASUS notebook.
  ['model-asus-rog-scar-16', RELEASE, '', 'Distinct high-value gaming series with clear 16-inch intent; requires generation/model-code handling before release.'],
  ['model-asus-rog-scar-18', RELEASE, '', 'Distinct 18-inch SCAR intent and valuation workflow; suitable for dedicated content.'],
  ['model-asus-tuf-gaming-f15', RELEASE, '', 'Intel-oriented TUF F15 family has clear seller intent separate from the live A15/A16 pages.'],

  // Lenovo notebook.
  ['model-lenovo-legion-5i', RELEASE, '', 'Intel Legion 5i is distinguishable from Legion 5 when content explicitly requests generation and machine type/model code.'],
  ['model-lenovo-legion-7', KEEP_HOLD, '', 'Series name spans materially different generations/configurations; define generation ownership before creating another broad Legion landing page.'],
  ['model-lenovo-legion-pro-7', RELEASE, '', 'Higher-tier Pro 7 intent is distinct from live Legion Pro 5 and can support dedicated inspection/content.'],
  ['model-lenovo-loq-16', RELEASE, '', '16-inch LOQ intent is distinguishable from the live LOQ 15 page and can be written around exact MTM/model code.'],
  ['model-lenovo-ideapad-slim-5', KEEP_HOLD, '', 'Broad family spans many screen sizes, CPUs and generations; hold until family-vs-model ownership is defined.'],

  // Acer notebook.
  ['model-acer-predator-helios-16', RELEASE, '', 'Predator Helios 16 is distinct from Helios Neo 16 and supports separate high-value inspection intent.'],
  ['model-acer-aspire-3', KEEP_HOLD, '', 'Aspire 3 is a very broad multi-generation budget family; dedicated page risks thin/generic content without exact family strategy.'],
  ['model-acer-aspire-5', KEEP_HOLD, '', 'Aspire 5 spans many generations and configurations; keep noindex until model-code ownership and unique content are strong enough.'],
  ['model-acer-swift-go-14', RELEASE, '', 'Swift Go 14 has a coherent 14-inch family intent and can be differentiated by generation/SKU checks.'],

  // HP / Dell / MSI notebook.
  ['model-hp-victus-15', RELEASE, '', '15-inch Victus intent is distinct from live Victus 16 and can support separate size/SKU inspection guidance.'],
  ['model-hp-elitebook-840', KEEP_HOLD, '', 'EliteBook 840 spans many G-generations with very different platforms; generation must be part of ownership before index.'],
  ['model-hp-probook-440', KEEP_HOLD, '', 'ProBook 440 spans numerous G-generations; hold until generation-level content strategy is explicit.'],
  ['model-dell-xps-13', KEEP_HOLD, '', 'XPS 13 is a long-running family with materially different model numbers/platforms; too broad for release without generation ownership.'],
  ['model-msi-cyborg-15', RELEASE, '', 'Distinct gaming family with clear 15-inch seller intent; suitable for dedicated inspection content.'],
  ['model-msi-thin-15', RELEASE, '', 'Distinct budget-gaming family; can be separated from Katana/Cyborg when exact model code and GPU/TGP are requested.'],
  ['model-msi-raider-ge68', RELEASE, '', 'High-value GE68 family has distinct chassis/performance intent and merits dedicated valuation guidance.'],
  ['model-msi-modern-14', KEEP_HOLD, '', 'Modern 14 is broad across generations and CPU platforms; hold until family-level differentiation is sufficiently unique.'],

  // iPhone — exact device families, strong independent commercial intent.
  ['model-iphone-11', RELEASE, '', 'Exact iPhone generation with independent resale intent and device-specific checks.'],
  ['model-iphone-11-pro', RELEASE, '', 'Exact Pro variant with independent storage/camera/display valuation intent.'],
  ['model-iphone-11-pro-max', RELEASE, '', 'Exact Pro Max variant with distinct size/battery/display resale intent.'],
  ['model-iphone-12-mini', RELEASE, '', 'Distinct mini form factor and battery profile justify separate valuation guidance.'],
  ['model-iphone-12-pro', RELEASE, '', 'Exact Pro variant fills the gap between live iPhone 12 and 12 Pro Max pages.'],
  ['model-iphone-13-mini', RELEASE, '', 'Distinct mini form factor and battery profile provide unique inspection intent.'],
  ['model-iphone-14-plus', RELEASE, '', 'Distinct large non-Pro variant with separate display/battery/configuration intent.'],
  ['model-iphone-15-plus', RELEASE, '', 'Distinct Plus variant and USB-C generation support independent seller intent.'],
  ['model-iphone-16', RELEASE, '', 'Exact current-generation base model intent is separate from live 16 Pro/Pro Max pages.'],
  ['model-iphone-16-plus', RELEASE, '', 'Exact Plus variant has distinct size/battery configuration and independent commercial intent.'],

  // iPad — exact size/generation variants.
  ['model-ipad-air-m2-13', RELEASE, '', '13-inch Air M2 has distinct size/accessory/value profile from the live 11-inch page.'],
  ['model-ipad-pro-m1-12-9', RELEASE, '', '12.9-inch M1 Pro has distinct display/size/accessory intent from the live 11-inch M1 page.'],
  ['model-ipad-pro-m2-12-9', RELEASE, '', '12.9-inch M2 Pro has independent size/display/accessory valuation intent.'],
  ['model-ipad-pro-m4-13', RELEASE, '', '13-inch M4 Pro is materially different in size/configuration from the live 11-inch M4 page.'],
  ['model-ipad-mini-a17-pro', RELEASE, '', 'Exact newer mini generation has independent chipset/storage/connectivity intent from iPad mini 6.'],

  // GPU — exact chip SKUs with strong independent hardware intent.
  ['model-rtx-3070-ti', RELEASE, '', 'Exact GPU SKU with independent VRAM/power/performance resale intent.'],
  ['model-rtx-3080-ti', RELEASE, '', 'Exact higher-tier Ampere SKU with distinct VRAM/power inspection requirements.'],
  ['model-rtx-3090', RELEASE, '', '24GB-class flagship SKU has clearly distinct memory/power/use-history valuation intent.'],
  ['model-rtx-4080', RELEASE, '', 'Exact Ada SKU remains distinct from the live 4080 SUPER page and needs SKU verification.'],
  ['model-rtx-4090', RELEASE, '', 'High-value flagship SKU has uniquely strong connector/power/condition inspection intent.'],
  ['model-rx-6700-xt', RELEASE, '', 'Exact RDNA2 SKU provides independent VRAM/power/board-partner valuation intent.'],
  ['model-rx-7600', RELEASE, '', 'Exact RDNA3 mainstream SKU has distinct VRAM/power/condition intent.'],
  ['model-rx-7700-xt', RELEASE, '', 'Exact RDNA3 SKU fills the gap below the live RX 7800 XT page.'],
  ['model-rx-7900-xt', RELEASE, '', 'Exact 20GB-class SKU is distinct from the live RX 7900 XTX page.'],

  // Camera — exact bodies with distinct mount/sensor/stabilization generations.
  ['model-fujifilm-x-t20', RELEASE, '', 'Exact Fujifilm body with distinct older-generation sensor/body/condition intent.'],
  ['model-fujifilm-x-h1', RELEASE, '', 'Distinct X-H1 body and stabilization/chassis profile support dedicated inspection guidance.'],
  ['model-olympus-em5-mark-iii', RELEASE, '', 'Exact E-M5 Mark III body is distinct from the live E-M10 III page and supports separate inspection intent.'],
  ['model-panasonic-g85', RELEASE, '', 'Exact G85 body provides distinct Micro Four Thirds/IBIS/video/condition intent from the live GH5 page.'],

  // Final Guide Quality Gate decisions are preserved verbatim in architecture triage.
  ['guide-โน้ตบุ๊กบานพับแตกประเมินยังไง', MERGE, '/รับซื้อโน้ตบุ๊กบานพับแตก-ขอนแก่น/', 'Commercial condition page already owns the exact hinge-broken intent.'],
  ['guide-iphone-ฝาหลังแตกขายได้ไหม', MERGE, '/รับซื้อiphone-ฝาหลังแตก-ขอนแก่น/', 'Exact iPhone back-glass condition page already owns the commercial query.'],
  ['guide-iphone-ติดผ่อนตรวจยังไง', KEEP_HOLD, '', 'Ownership/finance status cannot be reliably inferred from device settings alone; requires provider/finance-specific evidence and Thai editorial/legal review.'],
  ['guide-วิธีเช็ก-ipad-งอ', MERGE, '/รับซื้อipad-เครื่องงอ-ขอนแก่น/', 'Exact bent-iPad condition page already explains inspection and valuation flow.'],
  ['guide-การ์ดจอพัดลมดังประเมินยังไง', MERGE, '/รับซื้อการ์ดจอพัดลมดัง-ขอนแก่น/', 'Exact noisy-GPU-fan condition page already owns this problem intent.'],
  ['guide-ขายไอทีมือสองต้องมีใบเสร็จไหม', KEEP_HOLD, '', 'Receipt/ownership requirements vary by transaction and legal/business context; keep noindex until Thai legal/editorial review is complete.'],
];

export const REMAINING_ARCHITECTURE_TRIAGE = rows.map(([id, decision, target, reason]) => ({
  id,
  decision,
  target: target || null,
  reason,
}));

export const REMAINING_ARCHITECTURE_TRIAGE_BY_ID = new Map(
  REMAINING_ARCHITECTURE_TRIAGE.map((item) => [item.id, item]),
);

export function getArchitectureTriageDecision(pageOrId) {
  const id = typeof pageOrId === 'string' ? pageOrId : pageOrId?.id;
  return id ? REMAINING_ARCHITECTURE_TRIAGE_BY_ID.get(id) || null : null;
}
