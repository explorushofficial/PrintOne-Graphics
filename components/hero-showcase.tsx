'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
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
  isFeaturedCenter?: boolean;
}

const COLLAGE_ITEMS: ReelItem[] = [
  // Row 1
  {
    id: 'col-1',
    title: 'Integrated Annual Report',
    category: 'Annual Reports',
    spec: '320 GSM Colorplan · Copper Foil',
    finish: 'Section Sewn Hardcover with Spine',
    image: '/annual-report.jpg',
    serviceId: 'annual-report-design',
  },
  {
    id: 'col-2',
    title: 'Executive Stationery Suite',
    category: 'Stationery',
    spec: '350 GSM Cotton Wove · Letterpress',
    finish: 'Duplexed Card with Foil Edge Gilding',
    image: '/catalog/corporate-stationery.jpg',
    serviceId: 'corporate-stationery',
  },
  {
    id: 'col-3',
    title: 'Editorial Layouts & Grids',
    category: 'Design Studio',
    spec: 'Typographic Baseline Grids',
    finish: 'Archival Information Architecture',
    image: '/print-editorial.jpg',
    serviceId: 'publication-design',
  },

  // Row 2
  {
    id: 'col-4',
    title: 'Rigid Luxury Packaging Box',
    category: 'Packaging',
    spec: '1200 GSM Kappa Core · Magnetic Flap',
    finish: 'Raised Dimensional Scodix 3D Gloss',
    image: '/catalog/packaging-boxes.jpg',
    serviceId: 'packaging-boxes',
  },
  {
    id: 'col-5',
    title: 'Curated Corporate Gifting',
    category: 'Corporate Gifting',
    spec: 'Custom EVA Foam Inlays · Laser Etch',
    finish: 'Premium Curated Corporate Keepsakes',
    image: '/corporate-gifting.jpg',
    serviceId: 'gift-sets',
    isFeaturedCenter: true, // Prominent center focal card
  },
  {
    id: 'col-6',
    title: 'Hardbound Diaries & Planners',
    category: 'Publications',
    spec: 'Italian Thermo PU Cover · Silk Ribbon',
    finish: 'Gilt Edge Foiling with Custom Deboss',
    image: '/catalog/diaries.jpg',
    serviceId: 'diaries',
  },

  // Row 3
  {
    id: 'col-7',
    title: 'Institutional Publications',
    category: 'Books & Publishing',
    spec: '120 GSM Munken Pure · Smyth Sewn',
    finish: 'Blind Debossed Crest with Velvet Matte',
    image: '/education-publications.jpg',
    serviceId: 'books-publications',
  },
  {
    id: 'col-8',
    title: 'Commercial Print & Catalogues',
    category: 'Commercial Print',
    spec: '170 GSM Silk Text · Delta-E Calibrated',
    finish: 'Multi-Gatefold with Silk Spot Varnish',
    image: '/commercial-print.jpg',
    serviceId: 'commercial-printing',
  },
  {
    id: 'col-9',
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

      {/* Two-Part Split Layout: Left Content (50%) + Full Right-Side Collage (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[640px] xl:min-h-[700px]">
        {/* Left Part: Editorial Statement & Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16 2xl:px-20 lg:py-12">
          <div className="max-w-[620px] w-full lg:ml-auto">
            <h1 className="font-display text-[clamp(2.1rem,3.2vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-.04em] text-[#10383A]">
              YOUR TRUSTED<br />
              <span className="text-[#DAA112]">PRINT PARTNER.</span><br />
              FROM CONCEPT TO FINISH.
            </h1>

            <p className="mt-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-[#666E51]">
              Your Trusted Partner for Design, Digital Printing &amp; Corporate Gifting
            </p>

            <div className="mt-4 space-y-2.5 text-[13.5px] sm:text-[14.5px] leading-[1.62] text-[#55524c]">
              <p>
                Established in 2021, PrintOne Graphics is a creative design and printing company based in Byculla East, Mumbai, delivering quality printing solutions to organisations across India.
              </p>
              <p>
                From concept development and creative design to premium printing, binding, and finishing, we combine creativity, precision, and attention to detail to bring every project to life. Our commitment to quality, timely delivery, and reliable service ensures that every project meets our clients’ expectations.
              </p>
              <p>
                At PrintOne Graphics, we believe every print tells a story. Whether it’s books, annual reports, brochures, corporate publications, or customised print materials, we turn ideas into impactful printed experiences.
              </p>
            </div>

            {/* Quick Category Visual Links */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
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
                  className="rounded border border-[#ded6c9] bg-white/70 px-3 py-1 text-[11px] font-bold text-[#45433d] transition-all hover:border-[#10383A] hover:bg-white hover:text-[#10383A]"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
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
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#e2dacf] pt-4">
              <div>
                <span className="block font-display text-xl sm:text-2xl font-black text-[#10383A]">2021</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Established Mumbai
                </span>
              </div>

              <div>
                <span className="block font-display text-xl sm:text-2xl font-black text-[#10383A]">In-House</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Design &amp; Press Facility
                </span>
              </div>

              <div>
                <span className="block font-display text-xl sm:text-2xl font-black text-[#10383A]">Pan-India</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Dependable Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Part: Full Height & Width Constant 3x3 Photo Collage */}
        <div className="relative w-full h-full self-stretch border-t lg:border-t-0 lg:border-l border-[#ded7cb] bg-[#ded7cb]">
          <div className="grid grid-cols-3 grid-rows-3 h-full min-h-[460px] sm:min-h-[560px] lg:min-h-full gap-[2px] bg-[#ded7cb]">
            {COLLAGE_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`group relative cursor-pointer overflow-hidden bg-[#1e2022] transition-all duration-300 ${
                  item.isFeaturedCenter
                    ? 'ring-2 ring-inset ring-[#DAA112] z-10'
                    : 'hover:brightness-105'
                }`}
                title={`Inspect ${item.title}`}
              >
                {/* Full-bleed responsive image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                      item.isFeaturedCenter
                        ? 'bg-[#DAA112] text-[#10383A] font-black shadow-md'
                        : 'bg-black/60 text-white'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Bottom Overlay Title & Finish Info */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white z-10">
                  <h4 className="font-display text-[11px] sm:text-[13px] font-bold leading-tight line-clamp-1 group-hover:text-[#DAA112] transition-colors">
                    {item.title}
                  </h4>
                  <p className="hidden sm:block mt-0.5 text-[9px] sm:text-[10px] font-medium text-white/80 line-clamp-1">
                    {item.finish}
                  </p>
                </div>
              </div>
            ))}
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
