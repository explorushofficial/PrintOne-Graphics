'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  DollarSign,
  Handshake,
  Layers,
  Lightbulb,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { createWhatsAppUrl } from '@/context/cart-context';

export function AboutClient() {
  const whatsAppUrl = createWhatsAppUrl(
    'Hello Print One Graphics, I am interested in discussing a design, digital printing or corporate gifting project.'
  );

  return (
    <div className="overflow-x-hidden">
      {/* 1. Atelier Hero Section */}
      <section className="relative overflow-hidden border-b border-[#e5ded4] bg-[#faf8f2]">
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

        <div className="page-wrap relative z-10 py-14 sm:py-18 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Left Column: Official Client Headline & About Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ded7cc] bg-[#f2ede4] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
                <Sparkles size={12} className="text-[#10383A]" />
                <span>Byculla East, Mumbai · Established 2021</span>
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.3rem)] font-extrabold leading-[0.96] tracking-[-.055em] text-[#1c1d1f]">
                Your Trusted Partner for Design,<br />
                <span className="text-[#DAA112]">Digital Printing &amp; Corporate Gifting.</span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] sm:text-[16px] leading-[1.7] text-[#55524c]">
                Print One Graphics is a trusted design, printing and corporate gifting solutions provider dedicated to delivering high-quality print and visual communication services.
              </p>

              <p className="mt-3 max-w-xl text-xs sm:text-sm leading-[1.65] text-[#66635c]">
                We partner with corporate organisations, educational institutions, publishers and businesses of all sizes to transform ideas into impactful printed materials. Combining creative design, advanced printing technology and dependable service, we ensure every project meets the highest standards of quality and precision.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link href="/services" className="btn-primary group" data-testid="link-about-hero-services">
                  <span>Explore our services</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="btn-outline group"
                  data-testid="link-about-hero-products"
                >
                  <span>View products</span>
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Atelier Credentials Pill Tags */}
              <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-[#e5dfd4] text-[11px] font-bold uppercase tracking-wider text-[#636058]">
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Creative Design</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Digital Printing</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Corporate Gifting</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">In-House Production</span>
              </div>
            </motion.div>

            {/* Right Column: In-House Machinery Photographic Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#dcd4c7] bg-white p-3 shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#242628]">
                  <img
                    src="/client-assets/machinery/accuriopress-c7100.png"
                    alt="Konica Minolta AccurioPress C7100 at Print One Graphics"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/production/accuriopress-c7100.png')) {
                        target.src = '/production/accuriopress-c7100.png';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded bg-black/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span>In-House Pressroom · Byculla East</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#809276]">
                      Konica Minolta AccurioPress C7100
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold leading-tight">
                      High-Definition Digital Production &amp; Proofing
                    </h3>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="rounded-lg border border-[#ede7dd] bg-[#faf8f2] p-2.5">
                    <span className="block font-display text-sm font-extrabold text-[#1f2122]">Quality &amp; Precision</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c7972]">Advanced Digital Press</span>
                  </div>
                  <div className="rounded-lg border border-[#ede7dd] bg-[#faf8f2] p-2.5">
                    <span className="block font-display text-sm font-extrabold text-[#10383A]">End-to-End</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c7972]">Design to Delivery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#ede7dc]">
        <div className="page-wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1f2122]">
                Simplifying Print &amp; Corporate Gifting with Dependable Service.
              </h2>
              <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed text-[#5e5b54]">
                <p>
                  Print One Graphics was founded with a clear vision: to simplify the printing and corporate gifting process while delivering exceptional quality and reliability.
                </p>
                <p>
                  Over the years, we have grown into a dependable partner for organisations seeking comprehensive design, print and gifting solutions under one roof.
                </p>
                <p>
                  From corporate reports and marketing collaterals to educational publications and customised gifts, we take pride in delivering solutions that help our clients communicate effectively and leave a lasting impression.
                </p>
              </div>
            </div>

            {/* Strategic Pillars Highlight */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#ded5c7] bg-white p-5 shadow-sm">
                <span className="inline-block rounded-lg bg-[#eaf1f1] p-2 text-[#10383A]">
                  <Compass size={20} />
                </span>
                <h4 className="mt-3 font-display text-base font-bold text-[#1f2122]">Our Vision</h4>
                <p className="mt-1 text-xs text-[#68645d] leading-relaxed">
                  To become a trusted and preferred partner for printing, publishing, corporate communications and gifting solutions by consistently delivering value, innovation and quality.
                </p>
              </div>

              <div className="rounded-xl border border-[#ded5c7] bg-white p-5 shadow-sm">
                <span className="inline-block rounded-lg bg-[#ebf6f9] p-2 text-[#2c9fc3]">
                  <Printer size={20} />
                </span>
                <h4 className="mt-3 font-display text-base font-bold text-[#1f2122]">Our Mission</h4>
                <p className="mt-1 text-xs text-[#68645d] leading-relaxed">
                  To provide end-to-end print solutions that combine creative design, modern technology, competitive pricing and dependable delivery, helping our clients communicate more effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Core Values */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#faf8f2]">
        <div className="page-wrap">
          <div className="max-w-xl">
            <p className="eyebrow">Guiding Principles</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1f2122]">
              Our Core Values.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#615e58] leading-relaxed">
              These fundamental values guide every interaction, proof review, and production run at Print One Graphics.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Quality and Professionalism',
                desc: 'Uncompromising standards of print craft, color fidelity, and professional business ethics across every deliverable.',
                icon: ShieldCheck,
                color: '#10383A',
              },
              {
                title: 'Customer Satisfaction',
                desc: 'Client objectives come first. We work closely to ensure every finished product exceeds initial expectations.',
                icon: Award,
                color: '#2c9fc3',
              },
              {
                title: 'Integrity and Transparency',
                desc: 'Honest timelines, clear quotations, open communication, and dependable accountability at every production step.',
                icon: CheckCircle2,
                color: '#cf2879',
              },
              {
                title: 'Innovation and Continuous Improvement',
                desc: 'Continuously refining pre-press workflows, adopting modern finishing techniques, and expanding creative gifting capabilities.',
                icon: Lightbulb,
                color: '#d3b72b',
              },
              {
                title: 'Timely Execution',
                desc: 'Punctual scheduling and strict turnaround discipline for critical shareholder AGMs, academic sessions, and corporate launches.',
                icon: Clock,
                color: '#10383A',
              },
              {
                title: 'Long-term Partnerships',
                desc: 'Dedicated to cultivating lasting, trusted relationships built on mutual growth, reliability, and consistent value.',
                icon: Handshake,
                color: '#10b981',
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-[#ded5c7] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${v.color}15`, color: v.color }}
                  >
                    <v.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#99948a]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-[#1f2122]">
                  {v.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#68645d]">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (6 Client Pillars) */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#ede7dc]">
        <div className="page-wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow">Our Competitive Edge</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1f2122]">
                Why Choose Us.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#615e58] leading-relaxed">
                Six foundational strengths that make Print One Graphics the preferred choice for businesses across India.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#10383A] hover:underline"
            >
              <span>Speak with our team</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: '1',
                title: 'Experienced Team',
                desc: 'Our experienced design and print professionals ensure every project is executed with precision and care.',
                icon: Users,
                accent: '#10383A',
              },
              {
                num: '2',
                title: 'End-to-End Solutions',
                desc: 'From creative design and prepress to printing, finishing and delivery, we handle the entire process seamlessly.',
                icon: Layers,
                accent: '#2c9fc3',
              },
              {
                num: '3',
                title: 'Quality-Driven Approach',
                desc: 'We use advanced printing technology, high-grade materials and strict quality checks to deliver consistent results.',
                icon: ShieldCheck,
                accent: '#cf2879',
              },
              {
                num: '4',
                title: 'Modern Infrastructure',
                desc: 'Our in-house capabilities and modern equipment allow us to handle projects of varying scale and complexity.',
                icon: Wrench,
                accent: '#d3b72b',
              },
              {
                num: '5',
                title: 'Competitive Pricing',
                desc: 'We offer transparent and cost-effective solutions without compromising on quality or service standards.',
                icon: DollarSign,
                accent: '#27292a',
              },
              {
                num: '6',
                title: 'Customer-Centric Service',
                desc: 'We work closely with clients to understand their needs, meet deadlines and ensure complete satisfaction.',
                icon: HeartHandshake,
                accent: '#10b981',
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="group relative overflow-hidden rounded-xl border border-[#ded5c7] bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between border-b border-[#f2ede4] pb-4">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
                    style={{ backgroundColor: `${pillar.accent}15`, color: pillar.accent }}
                  >
                    0{pillar.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#918d84]">
                    Print One Pillar
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#1f2122]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#68645d]">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. In-House Mechanical Support (Our Machinery & Production Floor) */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#faf8f2]">
        <div className="page-wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow">In-House Mechanical Support</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1f2122]">
                Our Machinery &amp; Production Floor.
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6b6760]">
                Take a look inside our in-house pressroom in Byculla East, Mumbai. Equipped with cutting-edge Konica Minolta AccurioPress digital engines and high-volume Heidelberg offset presses for uncompromised print quality and dependable turnaround.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#ded7cd] bg-white px-4 py-1.5 text-xs font-bold text-[#55524b] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>Full In-House Facility · Byculla East</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Machine 1: AccurioPress C7100 */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#ded7cc] bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#242628]">
                <img
                  src="/client-assets/machinery/accuriopress-c7100.png"
                  alt="Konica Minolta AccurioPress C7100 Digital Production Press"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/production/accuriopress-c7100.png')) {
                      target.src = '/production/accuriopress-c7100.png';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#809276] backdrop-blur-sm">
                  Flagship Digital Production
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-display text-base font-bold leading-tight">Konica Minolta AccurioPress C7100</h4>
                  <p className="text-[11px] text-[#f2ede4] font-medium mt-0.5">Print Beyond Boundaries · High Speed &amp; Full Color</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs text-[#635f58] leading-relaxed">
                    High-definition digital production engine delivering up to 100 ppm with 3600 × 2400 dpi equivalent resolution. Equipped for heavy media up to 400 gsm and embossed textured papers.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px]">
                    <div className="rounded border border-[#ece4d8] bg-[#faf8f4] p-2">
                      <span className="block font-bold text-[#1f2122]">100 A4 ppm</span>
                      <span className="text-[10px] text-[#858077] uppercase font-semibold">Engine Speed</span>
                    </div>
                    <div className="rounded border border-[#ece4d8] bg-[#faf8f4] p-2">
                      <span className="block font-bold text-[#10383A]">Up to 400 gsm</span>
                      <span className="text-[10px] text-[#858077] uppercase font-semibold">Media Weight</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0eae1] flex items-center justify-between text-[11px] font-bold text-[#6c6861]">
                  <span>Annual Reports · Short Runs</span>
                  <span className="text-[#10383A]">Live In-House</span>
                </div>
              </div>
            </motion.div>

            {/* Machine 2: AccurioPress C4080 */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#ded7cc] bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#242628]">
                <img
                  src="/client-assets/machinery/accuriopress-c4080.png"
                  alt="Konica Minolta AccurioPress C4080 Digital Press"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/production/accuriopress-c4080.png')) {
                      target.src = '/production/accuriopress-c4080.png';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2c9fc3] backdrop-blur-sm">
                  Commercial Versatility
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-display text-base font-bold leading-tight">Konica Minolta AccurioPress C4080</h4>
                  <p className="text-[11px] text-[#f2ede4] font-medium mt-0.5">High-Precision Banner &amp; Booklet Production</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs text-[#635f58] leading-relaxed">
                    Versatile digital press engineered for long banner duplexing up to 1300 mm, micro-registration, and inline booklet finishing for catalogues, brochures, and corporate portfolios.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px]">
                    <div className="rounded border border-[#ece4d8] bg-[#faf8f4] p-2">
                      <span className="block font-bold text-[#1f2122]">81 A4 ppm</span>
                      <span className="text-[10px] text-[#858077] uppercase font-semibold">Continuous Feed</span>
                    </div>
                    <div className="rounded border border-[#ece4d8] bg-[#faf8f4] p-2">
                      <span className="block font-bold text-[#2c9fc3]">1300 mm</span>
                      <span className="text-[10px] text-[#858077] uppercase font-semibold">Banner Format</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0eae1] flex items-center justify-between text-[11px] font-bold text-[#6c6861]">
                  <span>Catalogues · Booklets · Folders</span>
                  <span className="text-[#2c9fc3]">Live In-House</span>
                </div>
              </div>
            </motion.div>

            {/* Machine 3: Heidelberg Speedmaster XL 106 */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#ded7cc] bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#242628]">
                <img
                  src="/client-assets/machinery/heidelberg-offset.jpg"
                  alt="Heidelberg Speedmaster XL 106 Commercial Offset Press"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/production/heidelberg-offset.jpg')) {
                      target.src = '/production/heidelberg-offset.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#cf2879] backdrop-blur-sm">
                  Heavy-Duty Commercial Offset
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-display text-base font-bold leading-tight">Heidelberg Speedmaster XL 106</h4>
                  <p className="text-[11px] text-[#f2ede4] font-medium mt-0.5">High-Volume Corporate &amp; Publication Offset</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs text-[#635f58] leading-relaxed">
                    Industrial multi-colour offset press for large volume print runs. Delivers precise spot Pantone ink mixing, consistent Fogra/ISO 12647 calibration, and speed up to 18,000 sheets per hour.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px]">
                    <div className="rounded border border-[#ece4d8] bg-[#faf8f4] p-2">
                      <span className="block font-bold text-[#1f2122]">18,000 sph</span>
                      <span className="text-[10px] text-[#858077] uppercase font-semibold">Maximum Speed</span>
                    </div>
                    <div className="rounded border border-[#ece4d8] bg-[#faf8f4] p-2">
                      <span className="block font-bold text-[#cf2879]">Pantone &amp; Spot</span>
                      <span className="text-[10px] text-[#858077] uppercase font-semibold">Spectrophotometry</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0eae1] flex items-center justify-between text-[11px] font-bold text-[#6c6861]">
                  <span>Annual Reports · Books · Publishing</span>
                  <span className="text-[#cf2879]">Live In-House</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Icon helper
function HeartHandshake(props: React.ComponentProps<typeof Handshake>) {
  return <Handshake {...props} />;
}
