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
      {/* 1. Products Hero Header */}
      <section className="border-b border-[#e5ded4] bg-[#ede8de]">
        <div className="page-wrap grid min-h-[300px] items-end gap-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.15em] text-[#706c64]">
              <Package size={13} className="text-[#e97819]" />
              <span>Pure Products Catalog</span>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-[.95] tracking-[-.06em]">
              Precision Printed Products &amp;<br />
              <span className="text-[#e97819]">Branded Merchandise.</span>
            </h1>
          </div>
          <div className="pb-1 text-xs sm:text-sm leading-relaxed text-[#615e58]">
            <p>
              Explore our comprehensive range of commercial printed stationery, books, corporate gifting items, packaging boxes, and display merchandise.
            </p>
            <p className="mt-3">
              Click &quot;View Details&quot; on any product to inspect fine tactile specifications, select quantities for your enquiry list, or consult directly on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Catalog & Filter Bar */}
      <section id="catalog-grid-section" className="page-wrap py-10 sm:py-14">
        <div className="flex flex-col justify-between gap-6 border-b border-[#ddd6cc] pb-6 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Product Catalog ({visible.length} Items)</p>
            <p className="mt-1 text-xs sm:text-sm text-[#77736d]">
              Click any product to inspect specifications, customize quantities, and request quotes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8a82]"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full sm:w-56 rounded border border-[#d9d2c8] bg-white pl-9 pr-3 text-xs placeholder:text-[#99958d] focus:border-[#e97819] focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5" aria-label="Filter products">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={`rounded px-3 py-2 text-[10px] font-bold transition-all ${
                    filter === item
                      ? 'border border-[#27292a] bg-[#27292a] text-white shadow-sm'
                      : 'border border-[#d9d2c8] bg-[#fbf9f4] text-[#696761] hover:border-[#e97819] hover:text-[#d5680e]'
                  }`}
                  data-testid={`button-filter-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}
                >
                  {item}
                </button>
              ))}
            </div>
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

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="font-display text-xl font-bold text-[#202223]">No products match your search.</h3>
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
        )}
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
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="btn-primary"
              data-testid="link-products-to-services"
            >
              View Our Services
            </Link>
            <a
              className="btn-outline border-[#74736e] text-white hover:bg-white hover:text-[#27292a]"
              href={createWhatsAppUrl('Hello Print One Graphics, I have a custom product fabrication enquiry.')}
              target="_blank"
              rel="noreferrer"
              data-testid="link-custom-whatsapp"
            >
              <MessageCircle size={15} /> Custom WhatsApp Request
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
