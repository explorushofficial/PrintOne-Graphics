'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Sparkles,
  Truck,
} from 'lucide-react';
import { ServiceModal } from '@/components/service-modal';
import { createWhatsAppUrl } from '@/context/cart-context';
import type { ServiceItem } from '@/data/services-data';

interface ServicesClientProps {
  services: ServiceItem[];
}

const CATEGORY_FILTERS = [
  'Corporate Reporting',
  'Commercial Print',
  'Books & Publishing',
  'Corporate Gifting',
  'Packaging & Production',
  'Large Format',
  'Design & Artwork',
  'Finishing & Bindery',
];

/**
 * Layout system (shared with the About page)
 * ------------------------------------------
 * Light, airy sections. Every image sits in a framed card with solid colour
 * blocks placed behind and offset from it; larger pale blocks run off the
 * viewport edge. Copy sits on plain background. Image side alternates down the
 * page. On mobile the copy always leads and the image follows.
 *
 * Palette: teal #10383A, gold #DAA112, sage #809276, cream #faf8f2,
 *          gold tint #f6e6b4, sage tint #dfe6d9.
 */

const CARD_SHADOW = 'shadow-[0_24px_60px_-20px_rgba(16,56,58,0.4)]';

interface FrameProps {
  side: 'left' | 'right';
  children: ReactNode;
  aspect?: string;
  surface?: string;
  floating?: ReactNode;
  accentA?: string;
  accentB?: string;
  className?: string;
}

/** Framed image card with two offset colour blocks behind it. */
function Frame({
  side,
  children,
  aspect = '',
  surface = 'bg-white',
  floating,
  accentA = '#DAA112',
  accentB,
  className = '',
}: FrameProps) {
  const second = accentB ?? (side === 'right' ? '#10383A' : '#809276');
  return (
    <div className={`relative mx-auto w-full max-w-[560px] lg:max-w-none ${className}`}>
      {side === 'right' ? (
        <>
          <div
            style={{ backgroundColor: accentA }}
            className="absolute -right-3 -top-3 h-[62%] w-[62%] sm:-right-6 sm:-top-6"
            aria-hidden="true"
          />
          <div
            style={{ backgroundColor: second }}
            className="absolute -bottom-3 -left-3 h-[34%] w-[34%] sm:-bottom-6 sm:-left-6"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <div
            style={{ backgroundColor: accentA }}
            className="absolute -left-3 -top-3 h-[40%] w-[40%] sm:-left-6 sm:-top-6"
            aria-hidden="true"
          />
          <div
            style={{ backgroundColor: second }}
            className="absolute -bottom-3 -right-3 h-[58%] w-[58%] sm:-bottom-6 sm:-right-6"
            aria-hidden="true"
          />
        </>
      )}
      <div className={`relative overflow-hidden rounded-sm ${CARD_SHADOW} ${aspect} ${surface}`}>{children}</div>
      {floating}
    </div>
  );
}

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Paper Selection',
    desc: 'Consulting on page counts, binding durability, stock weights (GSM), and tactile finishes based on your budget and deadline.',
  },
  {
    num: '02',
    title: 'Design & Pre-Press Proofing',
    desc: 'Editorial layout, color profiling, Fogra certification, and delivering 48-hour physical dummy proofs for tactile sign-off.',
  },
  {
    num: '03',
    title: 'High-Speed Press Production',
    desc: 'Precision offset and digital printing on Heidelberg and Konica Minolta production presses with real-time density monitoring.',
  },
  {
    num: '04',
    title: 'Finishing & Secure Dispatch',
    desc: 'Foil stamping, die-cutting, automated PUR/Smyth binding, shrink-wrapping, and batch delivery directly to your premises.',
  },
];

const HUBS = [
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    desc: 'Annual reporting, luxury rigid packaging, high-speed commercial printing, and corporate stationery suites.',
    highlight: true,
  },
  {
    city: 'Delhi',
    state: 'NCR',
    desc: 'Statutory compliance publications, academic textbook series, and corporate institutional publishing.',
    highlight: false,
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    desc: 'IT enterprise onboarding merchandise, university textbooks, and custom promotional gifting sets.',
    highlight: false,
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    desc: 'Corporate diaries & calendars, pharmaceutical packaging, and bulk publication printing.',
    highlight: false,
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    desc: 'Banking stationery, product technical catalogs, export packaging, and scientific journals.',
    highlight: false,
  },
  {
    city: 'Pan-India Logistics',
    state: 'All States & UTs',
    desc: 'Safe batch distribution, waterproof shrinkage packing, and 48-hr physical dummy proof deliveries.',
    highlight: false,
  },
];

const MACHINERY_BADGES = [
  {
    title: 'Precision Offset & Digital',
    desc: 'Heidelberg Speedmaster & Konica Minolta AccurioPress',
  },
  {
    title: 'FOGRA Color Profiling',
    desc: 'Spectrophotometer densitometry & certified proofs',
  },
  {
    title: 'Integrated Bindery',
    desc: 'Section sewing, PUR, hardcover casing & die-cutting',
  },
  {
    title: 'Pan-India Delivery',
    desc: 'Damage-proof packaging & scheduled batch dispatches',
  },
];

export function ServicesClient({ services }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [heroExpanded, setHeroExpanded] = useState(false);

  return (
    <main className="overflow-x-hidden bg-white">
      {/* 1. HERO — copy left, framed showcase right */}
      <section className="relative overflow-hidden bg-[#faf8f2]">
        <div
          className="pointer-events-none absolute right-0 top-0 hidden h-[72%] w-[24%] bg-[#f6e6b4] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-14 py-12 sm:py-16 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <div className="reveal">

            <h1 className="mt-3 font-display text-[clamp(1.8rem,2.6vw,2.55rem)] font-bold leading-[1.15] tracking-[-.03em] text-[#10383A]">
              <span className="block">Industrial Print Engineering &amp;</span>
              <span className="block text-[#DAA112]">Creative Solutions.</span>
            </h1>

            <p className="mt-3.5 font-garamond-italic text-[15px] sm:text-[18px] xl:text-[21px] font-normal tracking-wide text-[#10383A] leading-tight">
              Corporate Reporting · Commercial Print · Books &amp; Publishing · Corporate Gifting · Packaging &amp; Production · Large Format · Design &amp; Artwork · Finishing &amp; Bindery
            </p>

            <div className="mt-5 text-[14px] leading-[1.75] text-[#4d4a44] sm:text-[15px]">
              <p>
                PrintOne Graphics offers comprehensive designing and printing solutions to meet the diverse needs of Corporates, Publishers, Educational Institutions, Banks, and Businesses. Our Services include the creative design and premium printing of <strong className="font-bold text-[#10383A]">Annual Report, Calendars and Diaries</strong>, featuring Customised layouts, branding, and professional finishes; <strong className="font-bold text-[#10383A]">Corporate Gifting Solutions</strong>, including Personalised promotional products, Branded stationery, Gift sets, and customised merchandise; <strong className="font-bold text-[#10383A]">Educational books</strong>, covering textbooks, workbooks, reference materials, and learning resources; <strong className="font-bold text-[#10383A]">Publication books</strong>, including fiction, non-fiction, academic books, paperback and hardcover editions, with complete typesetting, printing, binding, and finishing services; and <strong className="font-bold text-[#10383A]">Banking Stationery</strong>, such as deposit slips, account-opening forms, vouchers, envelopes, letterheads, and other essential printed materials.
              </p>

              {heroExpanded && (
                <p id="hero-more" className="mt-4">
                  From concept development and graphic design to high-quality printing, binding, finishing, and timely delivery—PrintOne Graphics is committed to delivering reliable, cost-effective, and customised solutions that reflect quality, precision, and professionalism in every project.
                </p>
              )}

              <button
                type="button"
                onClick={() => setHeroExpanded((v) => !v)}
                aria-expanded={heroExpanded}
                aria-controls="hero-more"
                className="mt-3 text-[13px] font-bold text-[#10383A] underline decoration-[#DAA112] decoration-2 underline-offset-4 hover:text-[#0b2a2c]"
              >
                {heroExpanded ? 'Show less' : 'Read more'}
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a href="#services-list" className="btn-primary group">
                <span>Explore 8 domains</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/products" className="btn-outline group">
                <span>Browse catalog</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <Frame
            side="right"
            aspect="aspect-[5/4]"
            surface="bg-[#e8e2d6]"
          >
            <img
              src="/printone-assets/services-overview-showcase.jpg"
              alt="PrintOne Graphics Comprehensive Printing, Annual Reports, Gifting, Publications, and Packaging Solutions"
              className="h-full w-full object-cover"
            />
          </Frame>
        </div>
      </section>

      {/* 2. SERVICE SPECTRUM — infographic left, copy + 8 areas right */}
      <section id="services-list" className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute bottom-0 left-0 hidden h-[78%] w-[24%] bg-[#dfe6d9] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:order-2 lg:col-span-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#8a7a3a]">
              <Sparkles size={14} className="text-[#DAA112]" aria-hidden="true" />
              <span>Service Spectrum (8 Areas)</span>
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-bold leading-[1.15] tracking-[-.03em] text-[#10383A]">
              Comprehensive Production Across 8 Specialized Domains.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-[#4d4a44] sm:text-[15px]">
              Comprehensive printing, design, and packaging services structured across eight specialized production domains to serve businesses, publishers, and institutions across India.
            </p>

            <div className="mt-6">
              <p className="text-sm font-bold text-[#10383A]">Specialized Production Categories</p>
              <p className="mt-0.5 text-xs text-[#76726b]">
                Click any domain or consult our specialists on your custom print specs.
              </p>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2" aria-label="Service Areas">
              {CATEGORY_FILTERS.map((cat, idx) => (
                <div
                  key={cat}
                  className="flex items-center gap-3 rounded-sm border border-[#e5ded4] bg-[#faf8f2] px-3.5 py-3 text-[13px] font-bold leading-snug text-[#10383A]"
                >
                  <span className="text-[11px] font-extrabold text-[#DAA112]">0{idx + 1}</span>
                  {cat}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={createWhatsAppUrl('Hello PrintOne Graphics, I would like to consult about your services across your specialized printing and packaging domains.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 px-4"
              >
                <MessageCircle size={14} />
                <span>Inquire on WhatsApp</span>
              </a>
              <Link href="/products" className="btn-outline text-xs py-2.5 px-4">
                <span>Browse Catalog</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:order-1 lg:col-span-7">
            <Frame side="left">
              <div className="p-3 sm:p-6">
                <img
                  src="/printone-assets/services-service-spectrum.jpg"
                  alt="PrintOne Graphics Complete Service Spectrum Infographic - Annual Reports, Commercial Print, Publication, Packaging, Signage, Design, Finishing"
                  className="h-auto max-h-[760px] w-full object-contain"
                />
              </div>
            </Frame>
          </div>
        </div>
      </section>

      {/* 3. PRINT-ON-DEMAND — copy left, classroom photo right */}
      <section className="relative overflow-hidden bg-[#faf8f2]">
        <div
          className="pointer-events-none absolute right-0 top-[6%] hidden h-[78%] w-[26%] bg-[#f6e6b4] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#8a7a3a]">
              <Sparkles size={14} className="text-[#DAA112]" aria-hidden="true" />
              <span>Flexible Publishing &amp; Educational Impact</span>
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-bold leading-[1.15] tracking-[-.03em] text-[#10383A]">
              Print-on-Demand (POD) &amp; Educational Publishing
            </h2>

            <div className="mt-5 max-w-2xl space-y-3.5 text-[14px] leading-[1.75] text-[#4d4a44] sm:text-[15px]">
              <p>
                Looking for a smarter way to meet customer demand without the burden of overprinting?{' '}
                <strong className="font-bold text-[#10383A]">
                  PrintOne Graphics offers flexible and cost-effective print-on-demand solutions
                </strong>{' '}
                that give publishers greater control over printing costs and inventory. Print only the quantities you need — whether it’s a single copy or hundreds of books — while minimising wastage, reducing overheads, and responding quickly to market demand.
              </p>
              <p>
                From backlist titles and academic publications to new releases and classroom textbooks, our print-on-demand services produce books as and when required, without compromising on quality. We offer paperbacks, hardcovers, journals, and customised formats with flexible sizes, quality paper stocks, and professional finishing.
              </p>
              <p className="border-l-[3px] border-[#DAA112] pl-4 font-bold text-[#10383A]">
                Let PrintOne Graphics take care of your printing needs while you focus on what matters most — creating, publishing, and reaching more readers.
              </p>
            </div>

            <div className="mt-7">
              <a
                href={createWhatsAppUrl('Hi PrintOne Graphics, I would like to inquire about your Print-on-Demand (POD) book publishing and printing services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 px-4"
              >
                <MessageCircle size={14} />
                <span>Inquire About Print-on-Demand</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Frame side="right" aspect="aspect-[4/3]" surface="bg-[#e8e2d6]" accentA="#809276">
              <img
                src="/printone-assets/services-village-classroom.png"
                alt="Students in village classroom holding printed educational books by PrintOne Graphics"
                className="h-full w-full object-cover"
              />
            </Frame>
          </div>
        </div>
      </section>

      {/* 4. HOW WE EXECUTE — a real sequence, so the numbers stay */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute bottom-0 left-0 hidden h-[50%] w-[20%] bg-[#dfe6d9] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#8a7a3a]">
                <span className="h-0.5 w-6 bg-[#DAA112]" aria-hidden="true" />
                Proven Methodology
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-bold leading-[1.15] tracking-[-.03em] text-[#10383A]">
                How We Execute Every Service.
              </h2>
            </div>
            <p className="text-[14px] leading-[1.75] text-[#4d4a44] sm:text-[15px] lg:col-span-6">
              From initial briefing in Byculla East to doorstep delivery across India, our workflow is structured to eliminate delays and ensure zero-defect output.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="absolute -bottom-3 -left-3 h-[50%] w-[30%] bg-[#10383A] sm:-bottom-6 sm:-left-6" aria-hidden="true" />
            <div className="absolute -right-3 -top-3 h-[40%] w-[24%] bg-[#DAA112] sm:-right-5 sm:-top-5" aria-hidden="true" />

            <div className={`relative grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[#e2d9cd] sm:grid-cols-2 lg:grid-cols-4 ${CARD_SHADOW}`}>
              {STEPS.map((step) => (
                <div key={step.num} className="bg-white p-7 lg:p-8">
                  <span className="font-display text-3xl font-bold text-[#DAA112]">{step.num}</span>
                  <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-[#10383A]">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#5f5b54]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pan-India Client Footprint Map Section */}
      <section className="border-b border-[#ded7cd] bg-[#faf8f2] py-14 sm:py-20">
        <div className="page-wrap">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
              <MapPin size={12} className="text-[#10383A]" />
              <span>Pan-India Presence &amp; Client Footprint</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-.03em] text-[#1c1d1f]">
              Serving Clients Across Major Hubs in India.
            </h2>
            <div className="mx-auto mt-2.5 h-0.5 w-12 bg-[#DAA112]" />
            <p className="mt-3 text-xs sm:text-sm text-[#615e58] leading-relaxed max-w-2xl mx-auto">
              Headquartered with integrated design, offset, digital, and bindery facilities in Byculla East, Mumbai, PrintOne Graphics powers mission-critical printing, reporting, and publication delivery for enterprises, institutions, and publishers across major industrial and business corridors.
            </p>
          </div>

          {/* Content: Map Showcase + Hubs List */}
          <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Map Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md rounded-2xl border border-[#ded7cd] bg-white p-6 shadow-sm overflow-hidden flex flex-col items-center justify-center">
                <div className="relative w-full flex items-center justify-center py-2">
                  <img
                    src="/pan-india-clients.png"
                    alt="Map of India highlighting PrintOne Graphics client regions: Mumbai, Delhi, Bangalore, Hyderabad, and Chennai"
                    className="w-full max-h-[460px] object-contain drop-shadow-xs"
                  />
                </div>

                <div className="mt-4 w-full rounded-xl border border-[#efe9dc] bg-[#faf8f2] p-3 text-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#10383A]">
                    Central Production &amp; Bindery Plant
                  </span>
                  <p className="mt-0.5 text-xs text-[#6e6b64]">
                    📍 Byculla East, Mumbai · Pan-India Dispatch Fleet
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Strategic Client Hubs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="border-b border-[#e5dfd4] pb-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#10383A]">
                  Key Client Hubs &amp; Regional Deliverables
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {HUBS.map((hub) => (
                  <div
                    key={hub.city}
                    className={`rounded-xl border p-4 transition-all duration-300 ${hub.highlight
                      ? 'border-[#10383A] bg-[#10383A] text-white shadow-sm'
                      : 'border-[#ded7cd] bg-white text-[#1c1d1f] hover:border-[#DAA112] hover:shadow-xs'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          size={14}
                          className={hub.highlight ? 'text-[#DAA112]' : 'text-[#10383A]'}
                        />
                        <h3 className="font-display text-base font-extrabold">
                          {hub.city}
                        </h3>
                      </div>
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${hub.highlight
                          ? 'bg-white/15 text-[#DAA112]'
                          : 'bg-[#f4efe5] text-[#706c64]'
                          }`}
                      >
                        {hub.state}
                      </span>
                    </div>

                    <p
                      className={`mt-2 text-xs leading-relaxed ${hub.highlight ? 'text-white/85' : 'text-[#615e58]'
                        }`}
                    >
                      {hub.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Feature Strip */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#ded7cd] bg-white p-4">
                <div className="flex items-center gap-2.5 text-xs text-[#524f47]">
                  <Truck size={16} className="text-[#10383A] shrink-0" />
                  <span className="font-semibold">
                    Scheduled bulk dispatches with real-time transit tracking across India.
                  </span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10383A] hover:text-[#DAA112] transition-colors"
                >
                  <span>Connect with our logistics desk</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MACHINERY — copy left, process diagram right */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute right-0 top-[8%] hidden h-[80%] w-[24%] bg-[#dfe6d9] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#8a7a3a]">
              <Sparkles size={14} className="text-[#DAA112]" aria-hidden="true" />
              <span>In-House Machinery &amp; Full Process Spectrum</span>
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-bold leading-[1.15] tracking-[-.03em] text-[#10383A]">
              PrintOne Graphics: From Design to Finish.
            </h2>

            <div className="mt-5 space-y-3.5 text-[14px] leading-[1.75] text-[#4d4a44] sm:text-[15px]">
              <p>
                Our 7 integrated workflow stages powered by advanced Heidelberg offset presses, Konica Minolta AccurioPress engines, automated bindery, and custom luxury packaging lines in Byculla East, Mumbai.
              </p>
              <p>
                From prepress digital proofs to spectrophotometer calibration and robotic finishing, we guarantee millimeter precision and consistent PANTONE color accuracy across every batch.
              </p>
              <p>
                Every production phase is handled entirely in-house under strict quality checkpoints, eliminating third-party delays and safeguarding confidential corporate artwork.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#e2d9cd] bg-[#e2d9cd] sm:grid-cols-2">
              {MACHINERY_BADGES.map((item) => (
                <div key={item.title} className="bg-[#faf8f2] p-4">
                  <p className="text-[13px] font-bold text-[#10383A]">{item.title}</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-[#76726b]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={createWhatsAppUrl('Hello PrintOne Graphics, I would like to consult about your end-to-end production machinery and finishing capabilities.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 px-4"
              >
                <MessageCircle size={14} />
                <span>Consult Production Team</span>
              </a>
              <Link href="/contact" className="btn-outline text-xs py-2.5 px-4">
                <span>Visit Our Facility</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <Frame side="right">
            <div className="p-3 sm:p-6">
              <img
                src="/printone-assets/services-design-to-finish.png"
                alt="PrintOne Graphics Machinery and Process - From Design to Finish"
                className="h-auto max-h-[520px] w-full object-contain"
              />
            </div>
          </Frame>
        </div>
      </section>

      {/* 7. CONSULTATION CTA */}
      <section className="relative overflow-hidden bg-[#10383A] py-14 text-white sm:py-16">
        <div className="pointer-events-none absolute bottom-0 left-0 hidden h-10 w-32 bg-[#DAA112] lg:block" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-0 hidden h-16 w-48 bg-[#809276] lg:block" aria-hidden="true" />

        <div className="page-wrap relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-[#DAA112]">Have a tailored enterprise requirement?</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-[-.03em] sm:text-3xl">
              Let’s engineer your next print project together.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c7c2b8]">
              Visit our Byculla East production facility or request physical specimen sample kits delivered to your corporate office.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center justify-center gap-2 border border-[#DAA112] bg-[#DAA112] px-5 py-3.5 text-[13px] font-extrabold text-[#10383A] transition-all hover:border-white hover:bg-white hover:text-[#10383A]"
              href={createWhatsAppUrl('Hello PrintOne Graphics, I would like to consult with your production directors regarding an upcoming print project.')}
              target="_blank"
              rel="noreferrer"
              data-testid="link-service-cta-whatsapp"
            >
              <MessageCircle size={15} />
              <span>Consult on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/50 bg-white/10 px-5 py-3.5 text-[13px] font-bold text-white backdrop-blur-xs transition-all hover:border-white hover:bg-white hover:text-[#10383A]"
              data-testid="link-service-cta-contact"
            >
              <span>Contact Details</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Service Modal Dialog */}
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </main>
  );
}