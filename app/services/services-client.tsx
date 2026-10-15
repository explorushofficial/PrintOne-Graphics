'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ServiceModal } from '@/components/service-modal';
import { createWhatsAppUrl } from '@/context/cart-context';
import type { ServiceItem } from '@/data/services-data';

interface ServicesClientProps {
  services: ServiceItem[];
}

const CATEGORY_FILTERS = [
  'All Services',
  'Corporate Reporting',
  'Commercial Print',
  'Books & Publishing',
  'Corporate Gifting',
  'Packaging & Production',
  'Large Format',
  'Design & Artwork',
  'Finishing & Bindery',
];

export function ServicesClient({ services }: ServicesClientProps) {
  const [activeFilter, setActiveFilter] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesFilter =
      activeFilter === 'All Services' || service.tagFilter === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="border-b border-[#e5ded4] bg-[#ede8de]">
        <div className="page-wrap grid min-h-[320px] items-end gap-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-16">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.15em] text-[#706c64]">
              <Sparkles size={12} className="text-[#e97819]" />
              <span>What We Do &amp; Our Capabilities</span>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-[-.06em]">
              Industrial Print Engineering &amp;<br />
              <span className="text-[#e97819]">Creative Solutions.</span>
            </h1>
          </div>
          <div className="pb-1 text-xs sm:text-sm leading-relaxed text-[#615e58]">
            <p>
              At Print One Graphics, our services combine in-house design, editorial pre-press, high-speed digital and offset printing, and specialized post-press bindery under one roof in Byculla East, Mumbai.
            </p>
            <p className="mt-3">
              Whether you need statutory annual reports, academic textbook publishing, corporate onboarding hampers, or luxury rigid box packaging, we deliver with precision craftsmanship and dependable timelines.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Capability Metrics Strip */}
      <section className="border-b border-[#e5dfd5] bg-white py-5">
        <div className="page-wrap grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#fbf8f2] text-[#e97819]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-bold text-[#1c1d1f]">In-House Facility</p>
              <p className="text-[11px] text-[#79756d]">Byculla East, Mumbai</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#fbf8f2] text-[#2c9fc3]">
              <Cpu size={20} />
            </div>
            <div>
              <p className="font-bold text-[#1c1d1f]">Advanced Fleet</p>
              <p className="text-[11px] text-[#79756d]">Heidelberg &amp; Konica Minolta</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#fbf8f2] text-[#cf2879]">
              <Clock size={20} />
            </div>
            <div>
              <p className="font-bold text-[#1c1d1f]">Rapid Proofing</p>
              <p className="text-[11px] text-[#79756d]">48-hr physical dummy proofs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#fbf8f2] text-[#e7c627]">
              <Layers size={20} />
            </div>
            <div>
              <p className="font-bold text-[#1c1d1f]">Pan-India Logistics</p>
              <p className="text-[11px] text-[#79756d]">Scheduled batch dispatches</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter & Search Controls */}
      <section className="border-b border-[#ded7cd] bg-[#faf8f2] py-8">
        <div className="page-wrap flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Service Spectrum ({filteredServices.length} Areas)</p>
            <p className="mt-1 text-xs text-[#716e67]">
              Click any service card to view complete specifications, machine capabilities, and custom consultation options.
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
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full sm:w-56 rounded border border-[#d9d2c8] bg-white pl-9 pr-3 text-xs placeholder:text-[#99958d] focus:border-[#e97819] focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5" aria-label="Filter services">
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className={`rounded px-3 py-2 text-[10px] font-bold transition-all ${
                    activeFilter === cat
                      ? 'border border-[#27292a] bg-[#27292a] text-white shadow-sm'
                      : 'border border-[#d9d2c8] bg-white text-[#696761] hover:border-[#e97819] hover:text-[#d5680e]'
                  }`}
                  data-testid={`button-service-filter-${cat.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Refined, Proportional 3-Column Services Grid (No giant images!) */}
      <section className="page-wrap py-12 sm:py-16">
        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#ded7cd] bg-white shadow-xs transition-all duration-300 hover:border-[#e97819] hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedService(service)}
              data-testid={`service-card-${service.id}`}
            >
              <div>
                {/* Tastefully sized image header (compact & proportioned) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#242628]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {service.category}
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-widest"
                      style={{ color: service.accent }}
                    >
                      PILLAR {service.number}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body with Concise Text */}
                <div className="p-5 sm:p-6">
                  <p className="text-xs sm:text-sm leading-relaxed text-[#5e5b54] line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* 3 Key Deliverables Checkmarks */}
                  <div className="mt-4 space-y-2 border-t border-[#f0ecd8] pt-3 text-xs text-[#524f47]">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#e97819] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with prominent View Details button */}
              <div className="border-t border-[#f0ecd8] bg-[#fdfbf7] p-4 sm:px-6 sm:py-3.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e97819] hover:text-[#212324] transition-colors"
                  data-testid={`button-inspect-service-${service.id}`}
                >
                  <span>View Details &amp; Scope</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>

                <span className="text-[10px] font-semibold text-[#8e8a82]">
                  {service.tagFilter}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="font-display text-xl font-bold text-[#202223]">
              No service offerings match your search.
            </h3>
            <p className="mt-2 text-xs text-[#77736d]">
              Try clearing your search term or selecting &quot;All Services&quot;.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All Services');
                setSearchQuery('');
              }}
              className="btn-outline mt-5 text-xs"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* 5. The 4-Step Production Workflow */}
      <section className="border-y border-[#ded7cd] bg-[#f5efe4] py-14 sm:py-16">
        <div className="page-wrap">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">Proven Methodology</p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1c1d1f]">
              How We Execute Every Service.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#66635c]">
              From initial briefing in Byculla East to doorstep delivery across India, our workflow is structured to eliminate delays and ensure zero-defect output.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Discovery & Paper Selection',
                desc: 'Consulting on page counts, binding durability, stock weights (GSM), and tactile finishes based on your budget and deadline.',
              },
              {
                step: '02',
                title: 'Design & Pre-Press Proofing',
                desc: 'Editorial layout, color profiling, Fogra certification, and delivering 48-hour physical dummy proofs for tactile sign-off.',
              },
              {
                step: '03',
                title: 'High-Speed Press Production',
                desc: 'Precision offset and digital printing on Heidelberg and Konica Minolta production presses with real-time density monitoring.',
              },
              {
                step: '04',
                title: 'Finishing & Secure Dispatch',
                desc: 'Foil stamping, die-cutting, automated PUR/Smyth binding, shrink-wrapping, and batch delivery directly to your premises.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-[#ded7cb] bg-white p-5 shadow-xs"
              >
                <span className="font-display text-2xl font-black text-[#e97819]">
                  {item.step}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-[#1c1d1f]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-[#625f58] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Custom Consultation CTA Banner */}
      <section className="bg-[#27292a] text-white py-12 sm:py-16">
        <div className="page-wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e8a15c]">
              Have a tailored enterprise requirement?
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-[-.05em]">
              Let’s engineer your next print project together.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#c7c2b8] max-w-2xl">
              Visit our Byculla East production facility or request physical specimen sample kits delivered to your corporate office.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="btn-primary"
              href={createWhatsAppUrl('Hello Print One Graphics, I would like to consult with your production directors regarding an upcoming print project.')}
              target="_blank"
              rel="noreferrer"
              data-testid="link-service-cta-whatsapp"
            >
              <MessageCircle size={15} /> Consult on WhatsApp
            </a>
            <Link
              href="/contact"
              className="btn-outline border-[#74736e] text-white hover:bg-white hover:text-[#27292a]"
              data-testid="link-service-cta-contact"
            >
              Contact Details <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Service Modal Dialog */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </main>
  );
}
