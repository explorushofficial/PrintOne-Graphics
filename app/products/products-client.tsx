'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Filter, MessageCircle, Search, Sparkles } from 'lucide-react';
import { ServiceCard } from '@/components/service-card';
import { ProductModal } from '@/components/product-modal';
import { createWhatsAppUrl } from '@/context/cart-context';
import type { Service } from '@/data/services';

const filters = [
  'All work',
  'Design + print',
  'Business essentials',
  'Books + learning',
  'Gifting + merchandise',
  'Production',
  'Ideas to artwork',
];

export function ProductsClient({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState('All work');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const visible = services.filter((service) => {
    const matchesFilter = filter === 'All work' || service.tag === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main>
      {/* Hero Header */}
      <section className="border-b border-[#e5ded4] bg-[#ede8de]">
        <div className="page-wrap grid min-h-[340px] items-end gap-8 py-12 md:grid-cols-[1fr_auto] md:py-16">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.15em] text-[#706c64]">
              <Sparkles size={12} className="text-[#e97819]" />
              <span>Full Print & Production Catalog</span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(3rem,7vw,6.2rem)] font-extrabold leading-[.91] tracking-[-.07em]">
              Made for<br />
              <span className="text-[#e97819]">your world.</span>
            </h1>
          </div>
          <p className="max-w-[340px] pb-1 text-sm leading-relaxed text-[#615e58]">
            Click any piece to inspect paper stocks, finishing options, and structural details, or add directly to your enquiry list.
          </p>
        </div>
      </section>

      {/* Catalog & Filter Bar */}
      <section className="page-wrap py-10 sm:py-14">
        <div className="flex flex-col justify-between gap-6 border-b border-[#ddd6cc] pb-6 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Our capabilities ({visible.length} offerings)</p>
            <p className="mt-2 text-xs sm:text-sm text-[#77736d]">
              Click any card to inspect tactile specifications, add quantities, or initiate WhatsApp enquiry.
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
            <div className="flex flex-wrap gap-1.5" aria-label="Filter service offerings">
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

        {/* Product Cards Grid with onSelect handler */}
        <div className="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={services.indexOf(service)}
              onSelect={(s) => setSelectedService(s)}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="font-display text-xl font-bold text-[#202223]">No offerings match your search.</h3>
            <p className="mt-2 text-xs text-[#77736d]">Try clearing your search term or selecting a different category.</p>
            <button
              onClick={() => {
                setFilter('All work');
                setSearchQuery('');
              }}
              className="btn-outline mt-5 text-xs"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom Custom Request Bar */}
      <section className="bg-[#27292a] text-white py-12">
        <div className="page-wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e8a15c]">
              Need something completely custom?
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold tracking-[-.05em]">
              Tell us what you’re trying to make.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#c7c2b8]">
              From bespoke packaging dielines to limited-edition casebound art books, we fabricate to your exact specs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="btn-primary"
              href={createWhatsAppUrl('Hello PrintOne Graphics, I have a custom bespoke project enquiry.')}
              target="_blank"
              rel="noreferrer"
              data-testid="link-custom-whatsapp"
            >
              <MessageCircle size={15} /> Custom Request on WhatsApp
            </a>
            <Link
              href="/contact"
              className="btn-outline border-[#74736e] text-white hover:bg-white hover:text-[#27292a]"
              data-testid="link-products-contact"
            >
              Contact details <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* The Interactive Product Modal */}
      <ProductModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </main>
  );
}
