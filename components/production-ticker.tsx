'use client';

const TICKER_ITEMS = [
  '48-Hour Rapid Physical Proofing',
  'Mumbai Atelier Craft · Pan-India Despatch',
  '30+ Curated Fine Paper Stocks (FSC Certified)',
  'Precision CMYK & Pantone Spot Calibration',
  'Bespoke Hot Foil Stamping & Blind Debossing',
  'PUR, Smyth Sewn & Singer Thread Binding',
  'Short Run & Long Run Offset Capabilities',
  'End-to-End Design & Production Under One Roof',
];

export function ProductionTicker() {
  return (
    <div className="relative overflow-hidden bg-[#202223] py-4 text-[#faf8f2] border-y border-[#383a3c]">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Render twice for seamless loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-6">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-[#e8e4dc]">
              {item}
            </span>
            <div className="h-2 w-2 rounded-full bg-[#e97819]" aria-hidden="true" />
            <div className="print-registration-mark text-[#77746e]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
