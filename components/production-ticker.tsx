'use client';

const TICKER_ITEMS = [
  'Annual Reports Design & Printing',
  'Commercial & Digital Printing',
  'Books & Publications',
  'Educational Printing',
  'Custom Calendars & Diaries',
  'Corporate Gifting & Merchandise',
  'Luxury Packaging & Boxes',
  'Creative Design & Typesetting',
  'Precision Binding & Finishing',
  'Established 2021 · Byculla East, Mumbai',
  'Serving Organisations Across India',
  'Competitive Pricing & Dependable Delivery',
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
