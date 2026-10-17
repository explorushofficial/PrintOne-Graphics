'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Eye,
  Layers,
  MessageCircle,
  Plus,
  X,
} from 'lucide-react';
import { useCart, createWhatsAppUrl } from '@/context/cart-context';
import { services } from '@/data/services';

interface ReelItem {
  id: string;
  title: string;
  category: string;
  spec: string;
  image: string;
  finish: string;
  serviceId: string;
}

const COLUMN_1_ITEMS: ReelItem[] = [
  {
    id: 'col1-1',
    title: 'Integrated Annual Report',
    category: 'Annual Reports',
    spec: '320 GSM Colorplan · Copper Foil',
    finish: 'Section Sewn Hardcover with Exposed Spine',
    image: '/annual-report.jpg',
    serviceId: 'annual-report-design',
  },
  {
    id: 'col1-2',
    title: 'Rigid Luxury Packaging Box',
    category: 'Packaging',
    spec: '1200 GSM Kappa Core · Magnetic Flap',
    finish: 'Raised Dimensional Scodix 3D Gloss',
    image: '/catalog/packaging-boxes.jpg',
    serviceId: 'packaging-boxes',
  },
  {
    id: 'col1-3',
    title: 'Institutional Publications',
    category: 'Books & Publishing',
    spec: '120 GSM Munken Pure · Smyth Sewn',
    finish: 'Blind Debossed Crest with Velvet Matte',
    image: '/education-publications.jpg',
    serviceId: 'books-publications',
  },
  {
    id: 'col1-4',
    title: 'Executive Stationery Suite',
    category: 'Brand Collateral',
    spec: '350 GSM Cotton Wove · Letterpress',
    finish: 'Duplexed Card with Foil Edge Gilding',
    image: '/catalog/corporate-stationery.jpg',
    serviceId: 'corporate-stationery',
  },
  {
    id: 'col1-5',
    title: 'Konica Minolta AccurioPress C4080',
    category: 'In-House Press',
    spec: '81 A4 ppm · 1300mm Long-Sheet',
    finish: 'Duplex Banner & Inline Booklet Finishing',
    image: '/client-assets/machinery/accuriopress-c4080.png',
    serviceId: 'commercial-printing',
  },
  {
    id: 'col1-6',
    title: 'Product Catalogues',
    category: 'Commercial Print',
    spec: '170 GSM Silk Text · Delta-E Calibrated',
    finish: 'Multi-Gatefold with Silk Spot Varnish',
    image: '/catalog/product-catalogues.jpg',
    serviceId: 'product-catalogues',
  },
];

const COLUMN_2_ITEMS: ReelItem[] = [
  {
    id: 'col2-1',
    title: 'Editorial Layouts & Grids',
    category: 'Design Studio',
    spec: 'Typographic Baseline Grids',
    finish: 'Archival Information Architecture',
    image: '/print-editorial.jpg',
    serviceId: 'publication-design',
  },
  {
    id: 'col2-2',
    title: 'Thematic Cover Art',
    category: 'Annual Reports',
    spec: 'Curated Textures · Dual Foil Stamp',
    finish: 'Conceptual Visual Storytelling',
    image: '/catalog/thematic-cover-design.jpg',
    serviceId: 'thematic-cover-design',
  },
  {
    id: 'col2-3',
    title: 'Konica Minolta AccurioPress C7100',
    category: 'Production Flagship',
    spec: '100 A4 ppm · Heavy Media 400 GSM',
    finish: '3600 x 2400 DPI High-Definition Full Color',
    image: '/client-assets/machinery/accuriopress-c7100.png',
    serviceId: 'digital-printing',
  },
  {
    id: 'col2-4',
    title: 'Curated Corporate Gifting',
    category: 'Gifting & Kits',
    spec: 'Custom EVA Foam Inlays',
    finish: 'Laser-Etched Branded Keepsakes',
    image: '/corporate-gifting.jpg',
    serviceId: 'gift-sets',
  },
  {
    id: 'col2-5',
    title: 'Hardbound Diaries & Planners',
    category: 'Publications',
    spec: 'Italian Thermo PU Cover · Silk Ribbon',
    finish: 'Gilt Edge Foiling with Custom Debossing',
    image: '/catalog/diaries.jpg',
    serviceId: 'diaries',
  },
  {
    id: 'col2-6',
    title: 'Bespoke Gatefold Brochures',
    category: 'Brand Collateral',
    spec: '250 GSM Uncoated Linen',
    finish: 'Accordion Die-Cut Precision Fold',
    image: '/catalog/brochures.jpg',
    serviceId: 'brochures',
  },
];

export function HeroShowcase() {
  const [selectedItem, setSelectedItem] = useState<ReelItem | null>(null);
  const { add } = useCart();

  const handleCardClick = (item: ReelItem) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (item: ReelItem) => {
    const s = services.find((srv) => srv.id === item.serviceId) || services[0];
    add(s);
  };

  return (
    <section className="relative overflow-hidden border-b border-[#e5ded4] bg-[#faf8f2]">
      {/* Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(#10383A 1px, transparent 1px), radial-gradient(#10383A 1px, #faf8f2 1px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
        }}
        aria-hidden="true"
      />

      <div className="page-wrap relative z-10 pt-8 pb-12 lg:pt-10 lg:pb-14">
        
        {/* Main Hero Grid: Typographic Anchor (Left) + Vertical Kinetic Scrollers (Right) */}
        <div className="mt-2 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* Left Column: Bold, High-Impact Editorial Statement */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded7cc] bg-[#f2ede4] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#666E51]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10383A]" />
              <span>DESIGN • DIGITAL PRINTING • CORPORATE GIFTING</span>
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.5rem,4.8vw,4.8rem)] font-extrabold leading-[0.93] tracking-[-.06em] text-[#10383A]">
              YOUR TRUSTED<br />
              <span className="text-[#666E51]">PRINT PARTNER.</span><br />
              FROM CONCEPT TO FINISH.
            </h1>

            <p className="mt-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-[#666E51]">
              Your Trusted Partner for Design, Digital Printing &amp; Corporate Gifting
            </p>

            <p className="mt-3 max-w-[500px] text-[15px] sm:text-[16px] leading-[1.65] text-[#55524c]">
              From concept and creative design to premium printing and finishing, we deliver quality, precision and reliable service for every project. Based in Byculla East, Mumbai, serving organisations across India.
            </p>

            {/* Quick Category Visual Links */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {[
                { label: 'Annual Reports', tag: 'Ideas to artwork' },
                { label: 'Commercial & Digital Print', tag: 'Business essentials' },
                { label: 'Books & Publications', tag: 'Books + learning' },
                { label: 'Corporate Gifting', tag: 'Gifting + merchandise' },
                { label: 'Packaging & Boxes', tag: 'Production' },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={`/products?tag=${encodeURIComponent(cat.tag)}`}
                  className="rounded border border-[#ded6c9] bg-white/70 px-3 py-1.5 font-bold text-[#45433d] transition-all hover:border-[#10383A] hover:bg-white hover:text-[#10383A]"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link href="/services" className="btn-primary group" data-testid="link-hero-services">
                <span>Explore our services</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link href="/products" className="btn-outline group" data-testid="link-hero-products">
                <span>Browse products</span>
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Bottom Proof Metrics Ribbon */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#e2dacf] pt-5">
              <div>
                <span className="block font-display text-2xl font-black text-[#10383A]">2021</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Established Mumbai
                </span>
              </div>

              <div>
                <span className="block font-display text-2xl font-black text-[#10383A]">In-House</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Design &amp; Press Facility
                </span>
              </div>

              <div>
                <span className="block font-display text-2xl font-black text-[#10383A]">Pan-India</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Dependable Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Dual-Column Vertical Infinite Scroller */}
          <div className="relative h-[530px] sm:h-[590px] overflow-hidden rounded-xl border border-[#ded7cb] bg-[#ede7dc]/40 p-3 shadow-inner">
            {/* Top & Bottom Gradient Fades for Infinite Horizon Look */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-16 bg-gradient-to-b from-[#faf8f2] via-[#faf8f2]/70 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-[#faf8f2] via-[#faf8f2]/70 to-transparent" />

            {/* Subtle Overlay Hint */}
            <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 rounded-full bg-[#10383A]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white shadow-md backdrop-blur-sm">
              <Eye size={12} className="text-[#809276]" />
              <span>Click any piece to inspect</span>
            </div>

            {/* The 2 Vertical Rolling Columns */}
            <div className="grid h-full grid-cols-2 gap-3">
              {/* Column 1: Rolling Upward */}
              <div
                className="flex flex-col gap-3 animate-scroll-up"
                style={{ willChange: 'transform' }}
              >
                {[...COLUMN_1_ITEMS, ...COLUMN_1_ITEMS].map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => handleCardClick(item)}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#ded7cd] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#10383A]"
                    title={`Inspect ${item.title}`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#242628]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                      <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {item.category}
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <h4 className="font-display text-xs sm:text-sm font-bold leading-tight">
                          {item.title}
                        </h4>
                        <p className="mt-1 line-clamp-1 text-[10px] font-medium text-white/80">
                          {item.spec}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#f0ebd5] px-2.5 py-1.5 text-[10px] font-bold text-[#10383A] bg-[#faf8f2]">
                      <span className="truncate">{item.finish}</span>
                      <ExternalLink size={11} className="flex-none ml-1 opacity-70 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Rolling Downward */}
              <div
                className="flex flex-col gap-3 animate-scroll-down"
                style={{ willChange: 'transform' }}
              >
                {[...COLUMN_2_ITEMS, ...COLUMN_2_ITEMS].map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => handleCardClick(item)}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#ded7cd] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#10383A]"
                    title={`Inspect ${item.title}`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#242628]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                      <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {item.category}
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <h4 className="font-display text-xs sm:text-sm font-bold leading-tight">
                          {item.title}
                        </h4>
                        <p className="mt-1 line-clamp-1 text-[10px] font-medium text-white/80">
                          {item.spec}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#f0ebd5] px-2.5 py-1.5 text-[10px] font-bold text-[#666E51] bg-[#faf8f2]">
                      <span className="truncate">{item.finish}</span>
                      <ExternalLink size={11} className="flex-none ml-1 opacity-70 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-Inspect Modal when clicking any card in the scroller */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-xl border border-[#ded7cb] bg-[#faf8f2] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-[#ded7cb] bg-white text-[#52504b] hover:border-[#10383A] hover:text-[#10383A] transition-colors"
              aria-label="Close Preview"
            >
              <X size={16} />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#242628]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 left-3 rounded bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {selectedItem.category}
              </div>
            </div>

            <div className="mt-5">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#666E51]">
                Print One Physical Specimen
              </span>
              <h3 className="mt-1 font-display text-2xl font-extrabold text-[#1d1f20]">
                {selectedItem.title}
              </h3>

              <div className="mt-4 rounded-lg border border-[#e4ded5] bg-[#f2ede4] p-3 text-xs space-y-1.5 text-[#44423d]">
                <div>
                  <span className="font-bold text-[#1f2122]">Material & Weight: </span>
                  <span>{selectedItem.spec}</span>
                </div>
                <div>
                  <span className="font-bold text-[#1f2122]">Finish & Structure: </span>
                  <span>{selectedItem.finish}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="btn-primary text-xs flex-1"
                >
                  <Plus size={14} />
                  <span>Add to Enquiry List</span>
                </button>

                <a
                  href={createWhatsAppUrl(
                    `Hello Print One Graphics! I would like to enquire about ${selectedItem.title} (${selectedItem.spec}).`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-[#d6cec2] bg-white px-4 py-3 text-xs font-bold text-[#212324] hover:border-[#10383A] hover:text-[#10383A] transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
