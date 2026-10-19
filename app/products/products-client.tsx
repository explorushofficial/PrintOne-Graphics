'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Package, Search } from 'lucide-react';
import { ServiceCard } from '@/components/service-card';
import { ProductModal } from '@/components/product-modal';
import { createWhatsAppUrl } from '@/context/cart-context';
import type { Product } from '@/data/products';

const filters = [
  'All Products',
  'Business essentials',
  'Books + learning',
  'Gifting + merchandise',
  'Packaging + displays',
  'Publications + reports',
];

export function ProductsClient({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const visible = products.filter((product) => {
    const matchesFilter = filter === 'All Products' || product.tag === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main>
      {/* 1. Products Hero Header - Centered (matching /about and /services) */}
      <section className="border-b border-[#e5ded4] bg-[#ede8de] py-14 sm:py-16 lg:py-20">
        <div className="page-wrap text-center max-w-4xl lg:max-w-5xl mx-auto">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
              <Package size={13} className="text-[#10383A]" />
              <span>Pure Products Catalog</span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(1.65rem,3vw,2.85rem)] font-extrabold leading-[1.15] tracking-[-.035em] text-[#1c1d1f]">
              <span className="block sm:whitespace-nowrap">Precision Printed Products &amp;</span>
              <span className="block text-[#DAA112] sm:whitespace-nowrap">Branded Merchandise.</span>
            </h1>

            <div className="mx-auto mt-6 max-w-3xl lg:max-w-4xl space-y-3 text-center text-[15px] sm:text-[16px] leading-[1.75] text-[#524f48]">
              <p>
                Explore our comprehensive range of commercial printed stationery, books, corporate gifting items, packaging boxes, and display merchandise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Catalog & Filter Bar */}
      <section id="catalog-grid-section" className="page-wrap py-10 sm:py-14">
        {/* Header & Filter Controls */}
        <div className="border-b border-[#ddd6cc] pb-6">
          {/* Top Row: Title/Subtitle on Left, Search Bar on Right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Product Catalog ({visible.length} Items)</p>
              <p className="mt-1 text-xs sm:text-sm text-[#77736d]">
                Click any product to preview or request a tailored commercial print quote.
              </p>
            </div>

            {/* Search Input (Above filters, right aligned on desktop) */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e8a82]"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#d9d2c8] bg-white pl-9 pr-3 text-xs placeholder:text-[#99958d] focus:border-[#10383A] focus:outline-none transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Bottom Row: All Filter Buttons in One Single Clean Line */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" aria-label="Filter products">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                  filter === item
                    ? 'border border-[#10383A] bg-[#10383A] text-white shadow-xs'
                    : 'border border-[#d9d2c8] bg-white text-[#696761] hover:border-[#10383A] hover:text-[#10383A]'
                }`}
                data-testid={`button-filter-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Product Cards Grid: 2 columns on mobile, 3 columns on laptop */}
        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, idx) => (
            <ServiceCard
              key={product.id}
              service={product}
              index={idx}
              onSelect={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center max-w-xl mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3efe6] text-[#10383A] mb-4 border border-[#ded7cd]">
              <Package size={26} className="text-[#DAA112]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#10383A]">
              Product Catalog Updating
            </h3>
            <p className="mt-2 text-sm text-[#716e67] leading-relaxed">
              We are actively populating our official product inventory directly from the admin studio. In the meantime, explore our full suite of print services or message our team directly for custom product orders.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/services" className="btn-primary text-xs">
                Explore Services &rarr;
              </Link>
              <a
                href={createWhatsAppUrl('Hello Print One Graphics, I would like to inquire about custom printed products and corporate merchandise.')}
                target="_blank"
                rel="noreferrer"
                className="btn-outline text-xs"
              >
                <MessageCircle size={14} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : visible.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-display text-xl font-bold text-[#10383A]">No products match your search.</h3>
            <p className="mt-2 text-xs text-[#77736d]">Try clearing your search term or selecting &quot;All Products&quot;.</p>
            <button
              onClick={() => {
                setFilter('All Products');
                setSearchQuery('');
              }}
              className="btn-outline mt-5 text-xs"
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </section>

      {/* 4. Bottom Custom Request Bar */}
      <section className="bg-[#27292a] text-white py-12">
        <div className="page-wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e8a15c]">
              Looking for our services instead?
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-[-.05em]">
              Explore our end-to-end design &amp; printing services.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#c7c2b8] max-w-2xl">
              From annual report design and commercial offset production to custom packaging engineering and corporate gifting programs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border border-[#DAA112] bg-[#DAA112] text-[#10383A] px-5 py-3.5 text-[13px] font-extrabold transition-all hover:bg-white hover:border-white hover:text-[#10383A]"
              data-testid="link-products-to-services"
            >
              <span>View Our Services</span>
              <ArrowUpRight size={15} />
            </Link>
            <a
              className="inline-flex items-center justify-center gap-2 border border-white/50 bg-white/10 text-white px-5 py-3.5 text-[13px] font-bold backdrop-blur-xs transition-all hover:bg-white hover:border-white hover:text-[#27292a]"
              href={createWhatsAppUrl('Hello Print One Graphics, I have a custom product fabrication enquiry.')}
              target="_blank"
              rel="noreferrer"
              data-testid="link-custom-whatsapp"
            >
              <MessageCircle size={15} />
              <span>Custom WhatsApp Request</span>
            </a>
          </div>
        </div>
      </section>

      {/* Product Details Modal (Inner Details with Add to List and WhatsApp buttons) */}
      <ProductModal
        service={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
