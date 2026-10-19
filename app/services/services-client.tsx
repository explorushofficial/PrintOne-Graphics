'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
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

export function ServicesClient({ services }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <main>
      {/* 1. Hero Section - Centered (Matching /about scale & typography) */}
      <section className="border-b border-[#e5ded4] py-14 sm:py-16 lg:py-20">
        <div className="page-wrap text-center max-w-4xl lg:max-w-5xl mx-auto">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
              <Sparkles size={12} className="text-[#10383A]" />
              <span>Service · Service Spectrum in 8 Areas</span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(1.65rem,3vw,2.85rem)] font-extrabold leading-[1.15] tracking-[-.035em] text-[#1c1d1f]">
              <span className="block sm:whitespace-nowrap">Industrial Print Engineering &amp;</span>
              <span className="block text-[#DAA112] sm:whitespace-nowrap">Creative Solutions.</span>
            </h1>

            {/* 8 Areas Line */}
            <div className="mx-auto mt-4 max-w-4xl">
              <p
                className="font-serif text-[15px] sm:text-[18px] font-bold italic tracking-wide text-[#10383A] leading-relaxed"
                style={{ fontStyle: 'italic', fontStyleRule: 'italic' } as React.CSSProperties}
              >
                Corporate Reporting · Commercial Print · Books &amp; Publishing · Corporate Gifting · Packaging &amp; Production · Large Format · Design &amp; Artwork · Finishing &amp; Bindery
              </p>
            </div>

            {/* Description Paragraphs (Consolidated into 2 paragraphs matching /about) */}
            <div className="mx-auto mt-6 max-w-4xl lg:max-w-[1020px] space-y-4 text-center text-[15px] sm:text-[16px] leading-[1.75] text-[#524f48]">
              <p>
                PrintOne Graphics offers comprehensive designing and printing solutions to meet the diverse needs of Corporates, Publishers, Educational Institutions, Banks, and Businesses. Our Services include the creative design and premium printing of <strong className="font-bold text-[#10383A]">Annual Report, Calendars and Diaries</strong>, featuring Customised layouts, branding, and professional finishes; <strong className="font-bold text-[#10383A]">Corporate Gifting Solutions</strong>, including Personalised promotional products, Branded stationery, Gift sets, and customised merchandise; <strong className="font-bold text-[#10383A]">Educational books</strong>, covering textbooks, workbooks, reference materials, and learning resources; <strong className="font-bold text-[#10383A]">Publication books</strong>, including fiction, non-fiction, academic books, paperback and hardcover editions, with complete typesetting, printing, binding, and finishing services; and <strong className="font-bold text-[#10383A]">Banking Stationery</strong>, such as deposit slips, account-opening forms, vouchers, envelopes, letterheads, and other essential printed materials.
              </p>
              <p>
                From concept development and graphic design to high-quality printing, binding, finishing, and timely delivery—PrintOne Graphics is committed to delivering reliable, cost-effective, and customised solutions that reflect quality, precision, and professionalism in every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Unified Service Spectrum Section (8 Areas + Compact Horizontal Cards) */}
      <section className="border-b border-[#ded7cd] bg-[#faf8f2] py-10 sm:py-14">
        <div className="page-wrap">
          {/* Header Row */}
          <div className="pb-6">
            <p className="eyebrow">Service Spectrum (8 Areas)</p>
            <p className="mt-1 text-xs sm:text-sm text-[#716e67] max-w-3xl">
              Comprehensive printing, design, and packaging services structured across eight specialized production domains to serve businesses across India.
            </p>
          </div>

          {/* 8 Solution Area Cards (Increased height, uniform display with no selected box) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pb-4" aria-label="Service Areas">
            {CATEGORY_FILTERS.map((cat, idx) => (
              <div
                key={cat}
                className="flex flex-col items-center justify-center rounded-xl border border-[#ded7cd] bg-white px-3 py-3.5 text-center min-h-[70px] sm:min-h-[78px] transition-all hover:border-[#10383A] hover:shadow-xs group"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DAA112] leading-none">
                  0{idx + 1}
                </span>
                <span className="mt-1.5 text-[11px] sm:text-[11.5px] font-bold text-[#10383A] leading-snug">
                  {cat}
                </span>
              </div>
            ))}
          </div>

          {/* Service Spectrum Infographic Showcase */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#ded7cd] bg-white p-3 sm:p-6 shadow-sm">
            <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
              <img
                src="/printone-assets/services-service-spectrum.jpg"
                alt="PrintOne Graphics Complete Service Spectrum Infographic - Annual Reports, Commercial Print, Publication, Packaging, Signage, Design, Finishing"
                className="w-full max-h-[660px] object-contain transition-transform duration-500 hover:scale-101"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f0eae0] pt-4 text-center sm:text-left">
              <div>
                <p className="text-xs font-bold text-[#10383A] uppercase tracking-wider">
                  Complete Service Spectrum Across Specialized Domains
                </p>
                <p className="text-[11px] text-[#76726b]">
                  Annual Reports · Commercial Print · Books &amp; Publishing · Packaging &amp; Rigid Boxes · Large-Format Signage · Creative Design · Specialty Finishing
                </p>
              </div>

              <a
                href={createWhatsAppUrl('Hello PrintOne Graphics, I would like to consult about your services across your specialized printing and packaging domains.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2 px-4 whitespace-nowrap"
              >
                <MessageCircle size={14} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Print-on-Demand (POD) & Educational Publishing Section with Village Classroom Image */}
      <section className="bg-[#809276] text-white py-10 sm:py-14 border-b border-[#6e7f65]">
        <div className="page-wrap">
          <div className="mx-auto max-w-4xl lg:max-w-5xl text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#f5efe5]">
              Flexible Publishing &amp; Educational Impact
            </p>
            <h2 className="mt-1 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[-.03em] text-white">
              Print-on-Demand (POD) &amp; Educational Publishing
            </h2>

            <div className="mx-auto mt-2 h-0.5 w-12 bg-[#DAA112]" />

            <div className="mt-4 space-y-2.5 text-center text-[13.5px] sm:text-[14.5px] leading-[1.65] text-white/95">
              <p>
                Looking for a smarter way to meet customer demand without the burden of overprinting? <strong className="font-extrabold text-white bg-[#10383A]/45 px-2 py-0.5 rounded border border-white/20 inline-block my-0.5">PrintOne Graphics offers flexible and cost-effective print-on-demand solutions</strong> that give publishers greater control over printing costs and inventory. Print only the quantities you need — whether it’s a single copy or hundreds of books — while minimising wastage, reducing overheads, and responding quickly to market demand. With PrintOne Graphics, keep your books available without investing in large print runs or excess inventory.
              </p>
              <p>
                From backlist titles and academic publications to new releases and classroom textbooks, our print-on-demand services produce books as and when required, without compromising on quality. We offer paperbacks, hardcovers, journals, and customised formats with flexible sizes, quality paper stocks, and professional finishing. Our streamlined production avoids unnecessary stock accumulation, making publishing operations efficient for authors, publishers, educational institutions, and businesses.
              </p>
              <div className="pt-1">
                <p className="rounded-lg border border-white/25 bg-[#10383A]/40 px-4 py-2 text-xs sm:text-[13.5px] font-extrabold text-white max-w-2xl mx-auto shadow-xs">
                  <span className="text-[#DAA112]">★ </span>
                  Let PrintOne Graphics take care of your printing needs while you focus on what matters most — creating, publishing, and reaching more readers.
                </p>
              </div>
            </div>

            {/* Village Classroom Stories & Learning Visual Showcase */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-2 sm:p-3.5 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/40">
                <img
                  src="/printone-assets/services-village-classroom.png"
                  alt="Students in village classroom holding printed educational books by PrintOne Graphics"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left text-white">
                  <div>
                    <span className="inline-block rounded bg-[#DAA112] px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#10383A]">
                      Education &amp; Community Impact
                    </span>
                    <h3 className="mt-1 font-display text-base sm:text-xl font-bold text-white drop-shadow-md">
                      Village Classrooms: Stories, Learning &amp; Educational Books
                    </h3>
                    <p className="mt-0.5 text-xs text-white/80 max-w-xl">
                      Delivering curriculum-aligned textbooks, learning resources, and storybooks to institutions and communities across India.
                    </p>
                  </div>
                  <a
                    href={createWhatsAppUrl('Hi PrintOne Graphics, I would like to inquire about educational book printing and classroom publication publishing.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary shrink-0 text-xs py-2 px-3.5 bg-white text-[#10383A] border-white hover:bg-[#DAA112] hover:text-[#10383A] hover:border-[#DAA112]"
                  >
                    Publish Educational Books &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={createWhatsAppUrl('Hi PrintOne Graphics, I would like to inquire about your Print-on-Demand (POD) book publishing and printing services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10383A] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#164a4d] shadow-sm"
              >
                <MessageCircle size={13} />
                <span>Inquire About Print-on-Demand</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Execute Every Service Section */}
      <section className="border-b border-[#ded7cd] bg-[#f7f4ed] py-14 sm:py-18">
        <div className="page-wrap text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 bg-[#DAA112]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#716e67]">
              Proven Methodology
            </span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-.04em] text-[#1c1d1f]">
            How We Execute Every Service.
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#615e58] max-w-2xl mx-auto leading-relaxed">
            From initial briefing in Byculla East to doorstep delivery across India, our workflow is structured to eliminate delays and ensure zero-defect output.
          </p>

          {/* 4 Workflow Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left max-w-6xl mx-auto">
            {[
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
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-[#ded7cd] bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#DAA112] hover:shadow-md"
              >
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#DAA112]">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-base font-extrabold text-[#1c1d1f] leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-[#615e58] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
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
                {[
                  {
                    city: 'Mumbai',
                    tag: 'Headquarters & Plant',
                    state: 'Maharashtra',
                    desc: 'Annual reporting, luxury rigid packaging, high-speed commercial printing, and corporate stationery suites.',
                    highlight: true,
                  },
                  {
                    city: 'Delhi',
                    tag: 'North Hub',
                    state: 'NCR',
                    desc: 'Statutory compliance publications, academic textbook series, and corporate institutional publishing.',
                    highlight: false,
                  },
                  {
                    city: 'Bangalore',
                    tag: 'Tech & Publisher Hub',
                    state: 'Karnataka',
                    desc: 'IT enterprise onboarding merchandise, university textbooks, and custom promotional gifting sets.',
                    highlight: false,
                  },
                  {
                    city: 'Hyderabad',
                    tag: 'Enterprise & Pharma Hub',
                    state: 'Telangana',
                    desc: 'Corporate diaries & calendars, pharmaceutical packaging, and bulk publication printing.',
                    highlight: false,
                  },
                  {
                    city: 'Chennai',
                    tag: 'Industrial Hub',
                    state: 'Tamil Nadu',
                    desc: 'Banking stationery, product technical catalogs, export packaging, and scientific journals.',
                    highlight: false,
                  },
                  {
                    city: 'Pan-India Logistics',
                    tag: 'Scheduled Dispatch',
                    state: 'All States & UTs',
                    desc: 'Safe batch distribution, waterproof shrinkage packing, and 48-hr physical dummy proof deliveries.',
                    highlight: false,
                  },
                ].map((hub) => (
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

      {/* 5. Machinery & End-to-End Capabilities: From Design to Finish */}
      <section className="border-b border-[#ded7cd] bg-white py-14 sm:py-20">
        <div className="page-wrap">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5efe5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
              <Sparkles size={12} className="text-[#DAA112]" />
              <span>In-House Machinery &amp; Full Process Spectrum</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-.03em] text-[#1c1d1f]">
              PrintOne Graphics: From Design to Finish.
            </h2>
            <div className="mx-auto mt-2.5 h-0.5 w-12 bg-[#DAA112]" />
            <p className="mt-3 text-xs sm:text-sm text-[#615e58] leading-relaxed max-w-2xl mx-auto">
              Our 7 integrated workflow stages powered by advanced Heidelberg offset presses, Konica Minolta AccurioPress engines, automated bindery, and custom luxury packaging lines.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#ded7cd] bg-[#faf8f2] p-3 sm:p-5 shadow-lg">
            <div className="relative w-full overflow-hidden rounded-xl bg-white p-2 sm:p-4 flex items-center justify-center">
              <img
                src="/printone-assets/services-design-to-finish.png"
                alt="PrintOne Graphics Machinery and Process - From Design to Finish"
                className="w-full max-h-[480px] sm:max-h-[520px] object-contain transition-transform duration-500 hover:scale-101"
              />
            </div>

            <div className="mt-4 border-t border-[#ded7cd] pt-3 text-center sm:text-left">
              <p className="text-xs font-bold text-[#10383A] uppercase tracking-wider">
                Industrial Print Engineering · Quality Assurance · Zero-Defect Finishing
              </p>
              <p className="mt-0.5 text-[11px] text-[#716e67]">
                Continuous maintenance calibration, genuine OEM toners, FSC-certified paper substrates, and automated binding lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Custom Consultation CTA Banner */}
      <section className="bg-[#10383A] text-white py-12 sm:py-16">
        <div className="page-wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#809276]">
              Have a tailored enterprise requirement?
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-[-.05em]">
              Let’s engineer your next print project together.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#c7c2b8] max-w-2xl">
              Visit our Byculla East production facility or request physical specimen sample kits delivered to your corporate office.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center justify-center gap-2 border border-[#DAA112] bg-[#DAA112] text-[#10383A] px-5 py-3.5 text-[13px] font-extrabold transition-all hover:bg-white hover:border-white hover:text-[#10383A]"
              href={createWhatsAppUrl('Hello Print One Graphics, I would like to consult with your production directors regarding an upcoming print project.')}
              target="_blank"
              rel="noreferrer"
              data-testid="link-service-cta-whatsapp"
            >
              <MessageCircle size={15} />
              <span>Consult on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/50 bg-white/10 text-white px-5 py-3.5 text-[13px] font-bold backdrop-blur-xs transition-all hover:bg-white hover:border-white hover:text-[#10383A]"
              data-testid="link-service-cta-contact"
            >
              <span>Contact Details</span>
              <ArrowUpRight size={15} />
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
