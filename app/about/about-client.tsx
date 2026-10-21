'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  Handshake,
  Layers,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { motion } from 'motion/react';

export function AboutClient() {

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

        <div className="page-wrap relative z-10 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Column: Content */}
            <motion.div
              className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ded7cc] bg-[#f2ede4] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
                  <span>Byculla East, Mumbai · Established 2021</span>
                </div>
              </div>

              <h1 className="mt-4 font-display text-[clamp(1.75rem,2.8vw,2.85rem)] font-extrabold leading-[1.12] tracking-[-.035em] text-[#1c1d1f]">
                <span className="block">Your Trusted Partner for Design,</span>
                <span className="block text-[#DAA112]">Digital Printing &amp; Corporate Gifting.</span>
              </h1>

              <div className="mt-5 space-y-3.5 text-left text-[14px] sm:text-[15px] leading-[1.7] text-[#524f48]">
                <p>
                  PrintOne Graphics is a Mumbai-based printing and graphic design company dedicated to delivering high-quality printing solutions with creativity, precision, and reliability. From concept development and creative design to premium printing, finishing, and binding, we offer end-to-end solutions tailored to meet the diverse needs of businesses, publishers, educational institutions, and organisations across India. We specialise in <strong className="font-bold text-[#10383A]">books and publication printing, annual reports, brochures, catalogues, corporate stationery, commercial printing, typesetting, and binding services</strong>.
                </p>
                <p>
                  Our focus is on combining innovative design, quality materials, and professional execution to ensure every project meets the highest standards. At PrintOne Graphics, we believe that every print project tells a story. Our commitment to quality, attention to detail, timely delivery, and customer satisfaction helps us build lasting relationships with our clients. Based in Byculla East, Mumbai, we strive to be your trusted printing partner—transforming your ideas into impactful printed experiences.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3.5">
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
              <div className="mt-7 flex flex-wrap items-center gap-2 pt-5 border-t border-[#e5dfd4] text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider text-[#636058]">
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1 shadow-xs">Creative Design</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1 shadow-xs">Digital Printing</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1 shadow-xs">Corporate Gifting</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1 shadow-xs">In-House Production</span>
              </div>
            </motion.div>

            {/* Hero Right Column: Modern Print Production Floor Image */}
            <motion.div
              className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-2xl border border-[#ded7cd] bg-white p-2.5 sm:p-3 shadow-xl">
                <div className="relative w-full overflow-hidden rounded-xl bg-[#1e2022]">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                    <img
                      src="/printone-assets/about-modern-print-floor.png"
                      alt="PrintOne Graphics Modern Print Production Floor and Heidelberg Offset Machinery"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                      <span className="rounded bg-[#10383A] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#DAA112] border border-white/20">
                        Production Plant · Byculla East
                      </span>
                      <h3 className="mt-1.5 font-display text-lg sm:text-xl font-extrabold text-white leading-snug">
                        Advanced Heidelberg Offset &amp; High-Speed Digital Presses
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-white/80 leading-relaxed">
                        Multi-color high-definition calibration, automated spectrophotometers, section sewing, and custom foil gilding.
                      </p>
                      <div className="mt-2.5">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DAA112] hover:text-white transition-colors"
                        >
                          <span>Explore Capabilities</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section: Left Image (Creative Thinking) + Right Content */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-[#6f8066] bg-[#809276] text-white">
        <div className="page-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Creative Thinking Visual Showcase Card */}
            <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-2.5 sm:p-3 shadow-2xl backdrop-blur-sm">
                <div className="relative w-full overflow-hidden rounded-xl bg-black/40">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                    <img
                      src="/printone-assets/about-creative-thinking.png"
                      alt="PrintOne Graphics Creative Thinking and Ideation Session"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                      <span className="inline-block rounded bg-[#DAA112] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#10383A]">
                        Creative Studio
                      </span>
                      <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-white drop-shadow-sm leading-snug">
                        Creative Thinking. Thoughtful Typography. Impactful Storytelling.
                      </h3>
                      <p className="mt-1 text-[11px] text-white/80">
                        Concept development, editorial layouts, color theory, and bespoke brand aesthetics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Our Story Content */}
            <div className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-[.18em] text-white backdrop-blur-sm">
                <span>Our Story</span>
              </div>

              <h2 className="mt-3 font-display text-[clamp(1.75rem,2.8vw,2.6rem)] font-extrabold tracking-[-.035em] text-white leading-tight">
                Creative Thinking. Quality Printing. Reliable Delivery.
              </h2>

              <div className="mt-2.5 h-0.5 w-12 bg-[#DAA112]" />

              <div className="mt-5 space-y-3.5 text-left text-[14px] sm:text-[15px] leading-[1.7] text-white/95">
                <p>
                  Established in 2021, PrintOne Graphics began with a vision to deliver creative, reliable, and high-quality printing solutions that help businesses, publishers, and organisations communicate their ideas effectively. Based in Byculla East, Mumbai, we have been building our expertise in printing, publishing, and graphic design, combining creativity, precision, and professional service to meet the diverse needs of our clients. At PrintOne Graphics, we believe that every printed piece tells a story. From concept development and creative designing to typesetting, printing, binding, and finishing, we provide end-to-end solutions tailored to the unique requirements of every project—covering books and publications, annual reports, corporate stationery, brochures, catalogues, calendars, and a wide range of commercial printing requirements.
                </p>
                <p>
                  We work closely with publishers, corporates, educational institutions, and businesses across India, offering customised solutions that balance quality, cost-effectiveness, and timely delivery. By understanding our clients’ objectives and maintaining close attention to every detail, we strive to transform ideas into impactful printed materials that reflect their brand identity and vision. Our commitment to quality is supported by professional expertise, efficient production processes, and a customer-focused approach—delivering consistent results from short-run digital printing to bulk commercial printing. At PrintOne Graphics, our journey is driven by creativity, trust, and continuous improvement as we build long-term partnerships, embrace new opportunities, and deliver printing solutions that make every project stand out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (6 Client Pillars) */}
      <section className="section-space border-b border-[#e2d9cd] ">
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
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                    style={{ backgroundColor: `${pillar.accent}15`, color: pillar.accent }}
                  >
                    0{pillar.num}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#1f2122]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#68645d]">
                  {pillar.desc}
                </p>
              </div>
            ))}
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
