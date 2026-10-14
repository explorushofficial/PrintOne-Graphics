'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, Filter, MessageCircle, Search, Sparkles } from 'lucide-react';
import { ServiceCard } from '@/components/service-card';
import { ProductModal } from '@/components/product-modal';
import { createWhatsAppUrl } from '@/context/cart-context';
import type { Service } from '@/data/services';

const CORE_PILLARS = [
  {
    number: '01',
    title: 'Annual Report Design & Printing',
    category: 'Corporate Stakeholder Reporting',
    image: '/annual-report.jpg',
    tagFilter: 'Ideas to artwork',
    description:
      'We provide comprehensive annual report solutions, including content writing, thematic cover design, typesetting, financial and non-financial report layouts, statutory and non-statutory sections, printing, binding and digital versions such as PDF flipbooks.',
    features: [
      'Content writing & editorial polishing',
      'Thematic cover design with foil & embossing',
      'Typesetting for financial & statutory sections',
      'High-speed printing & lay-flat binding',
      'Digital interactive PDF flipbooks',
    ],
    accent: '#e97819',
  },
  {
    number: '02',
    title: 'Commercial & Digital Printing',
    category: 'Marketing Collaterals & Brand Essentials',
    image: '/commercial-print.jpg',
    tagFilter: 'Business essentials',
    description:
      'From brochures, catalogues, company profiles and magazines to flyers, corporate stationery and marketing collaterals, we deliver professional printing solutions tailored to your business requirements.',
    features: [
      'Multi-gatefold brochures & product catalogues',
      'Company profiles with premium finishing',
      'Coordinated corporate stationery suites',
      'Marketing flyers & event announcements',
      'Spot UV, soft-touch laminations & foil stamping',
    ],
    accent: '#2c9fc3',
  },
  {
    number: '03',
    title: 'Educational & Publication Printing',
    category: 'Textbooks, Journals & Institutional Media',
    image: '/education-publications.jpg',
    tagFilter: 'Books + learning',
    description:
      'We support educational institutions, publishers and organisations with textbooks, journals, educational materials, institutional magazines, answer sheets and other printed learning resources.',
    features: [
      'Textbooks with durable Smyth & PUR binding',
      'Academic, scientific & peer-reviewed journals',
      'Institutional & university campus magazines',
      'High-security answer sheets & exam stationery',
      'FSC certified archival and opaque paper stocks',
    ],
    accent: '#cf2879',
  },
  {
    number: '04',
    title: 'Corporate Gifting & Promotional Products',
    category: 'Branded Keepsakes & Merchandise',
    image: '/corporate-gifting.jpg',
    tagFilter: 'Gifting + merchandise',
    description:
      'We offer customised calendars, diaries, notebooks, pens, mugs, gift sets, card holders and promotional merchandise, with branding options to help businesses create memorable connections with clients, employees and business partners.',
    features: [
      'Customised desk & wall calendars with bespoke art',
      'Executive diaries, planners & notebooks',
      'Branded pens, ceramic mugs & card holders',
      'Curated gift sets & festive hampers',
      'Laser etching, debossing & screen printing options',
    ],
    accent: '#e7c627',
  },
];

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

  const handlePillarClick = (tagFilter: string) => {
    setFilter(tagFilter);
    const catalogElem = document.getElementById('catalog-grid-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* 1. Hero Header with Client Positioning */}
      <section className="border-b border-[#e5ded4] bg-[#ede8de]">
        <div className="page-wrap grid min-h-[340px] items-end gap-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.15em] text-[#706c64]">
              <Sparkles size={12} className="text-[#e97819]" />
              <span>Our Services &amp; Capabilities</span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold leading-[.95] tracking-[-.065em]">
              Your Trusted Partner for<br />
              <span className="text-[#e97819]">Design, Digital Printing &amp; Corporate Gifting.</span>
            </h1>
          </div>
          <div className="pb-1 text-xs sm:text-sm leading-relaxed text-[#615e58]">
            <p>
              At PrintOne Graphics, we offer end-to-end solutions for design, content development, digital printing, commercial printing, annual reports, publications, educational printing and corporate gifting.
            </p>
            <p className="mt-3">
              With an in-house design and production facility, modern digital printing technology and experienced professionals, we combine quality, creativity and quick turnaround to deliver projects that meet professional standards and deadlines.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO: The 4 Core Service Pillars (Client Brief) */}
      <section className="section-space border-b border-[#e2dad0] bg-[#faf8f2]">
        <div className="page-wrap">
          <div className="max-w-2xl">
            <p className="eyebrow">Comprehensive Solutions</p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
              WHAT WE DO.
            </h2>
            <p className="mt-3 text-xs sm:text-base text-[#615e58] leading-relaxed">
              Explore our four core pillars of expertise — engineered with creative design, modern technology, competitive pricing, and dependable delivery.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#ded7cd] bg-white shadow-sm transition-all duration-300 hover:border-[#e97819] hover:shadow-xl"
                data-testid={`pillar-card-${pillar.number}`}
              >
                <div>
                  {/* Photo Banner with Badge */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#222425]">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-4 left-4 rounded-full bg-black/65 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {pillar.category}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-black tracking-widest text-[#e97819]">
                        PILLAR {pillar.number}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold leading-tight">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <p className="text-xs sm:text-sm leading-relaxed text-[#5e5b54]">
                      {pillar.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-5 space-y-2 border-t border-[#f0ecd8] pt-4">
                      {pillar.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#54514a]">
                          <CheckCircle2 size={13} className="text-[#e97819] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-[#f0ecd8] bg-[#fdfbf7] p-4 sm:px-7 sm:py-4">
                  <button
                    onClick={() => handlePillarClick(pillar.tagFilter)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#e97819] hover:text-[#212324] transition-colors"
                  >
                    <span>Browse related catalog offerings</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Catalog & Filter Bar */}
      <section id="catalog-grid-section" className="page-wrap py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-6 border-b border-[#ddd6cc] pb-6 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Individual Catalog Offerings ({visible.length} items)</p>
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

      {/* 4. Bottom Custom Request Bar */}
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
