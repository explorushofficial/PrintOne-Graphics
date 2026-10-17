'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  Handshake,
  Layers,
  ShieldCheck,
  Sparkles,
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

        <div className="page-wrap relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl lg:max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ded7cc] bg-[#f2ede4] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
                <span>Byculla East, Mumbai · Established 2021</span>
              </div>

              <h1 className="mt-4 font-display text-[clamp(1.65rem,3vw,2.85rem)] font-extrabold leading-[1.15] tracking-[-.035em] text-[#1c1d1f]">
                <span className="block sm:whitespace-nowrap">Your Trusted Partner for Design,</span>
                <span className="block text-[#DAA112] sm:whitespace-nowrap">Digital Printing &amp; Corporate Gifting.</span>
              </h1>

              <div className="mx-auto mt-6 max-w-4xl lg:max-w-[1020px] space-y-4 text-center text-[15px] sm:text-[16px] leading-[1.75] text-[#524f48]">
                <p>
                  Established in 2021, PrintOne Graphics is a Mumbai-based printing and graphic design company dedicated to delivering high-quality printing solutions with creativity, precision, and reliability. From concept development and creative design to premium printing, finishing, and binding, we offer end-to-end solutions tailored to meet the diverse needs of businesses, publishers, educational institutions, and organisations across India. We specialise in <strong className="font-bold text-[#10383A]">books and publication printing, annual reports, brochures, catalogues, corporate stationery, commercial printing, typesetting, and binding services</strong>.
                </p>
                <p>
                  Our focus is on combining innovative design, quality materials, and professional execution to ensure every project meets the highest standards. At PrintOne Graphics, we believe that every print project tells a story. Our commitment to quality, attention to detail, timely delivery, and customer satisfaction helps us build lasting relationships with our clients. Based in Byculla East, Mumbai, we strive to be your trusted printing partner—transforming your ideas into impactful printed experiences.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
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
              <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-2 pt-6 border-t border-[#e5dfd4] text-[11px] font-bold uppercase tracking-wider text-[#636058]">
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Creative Design</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Digital Printing</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Corporate Gifting</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">In-House Production</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section with bg-[#809276] - Compact Height */}
      <section className="py-10 sm:py-12 lg:py-14 border-b border-[#6f8066] bg-[#809276] text-white">
        <div className="page-wrap">
          <div className="mx-auto max-w-4xl lg:max-w-[1020px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-[.18em] text-white backdrop-blur-sm">
              <span>Our Story</span>
            </div>

            <h2 className="mt-2.5 font-display text-[clamp(1.75rem,2.8vw,2.6rem)] font-extrabold tracking-[-.035em] text-white">
              Creative Thinking. Quality Printing. Reliable Delivery.
            </h2>

            <div className="mx-auto mt-2 h-0.5 w-10 bg-[#DAA112]" />

            <div className="mt-5 space-y-3 text-center text-[14.5px] sm:text-[15.5px] leading-[1.7] text-white/90">
              <p>
                Established in 2021, PrintOne Graphics began with a vision to deliver creative, reliable, and high-quality printing solutions that help businesses, publishers, and organisations communicate their ideas effectively. Based in Byculla East, Mumbai, we have been building our expertise in printing, publishing, and graphic design, combining creativity, precision, and professional service to meet the diverse needs of our clients. At PrintOne Graphics, we believe that every printed piece tells a story. From concept development and creative designing to typesetting, printing, binding, and finishing, we provide end-to-end solutions tailored to the unique requirements of every project—covering books and publications, annual reports, corporate stationery, brochures, catalogues, calendars, and a wide range of commercial printing requirements.
              </p>
              <p>
                We work closely with publishers, corporates, educational institutions, and businesses across India, offering customised solutions that balance quality, cost-effectiveness, and timely delivery. By understanding our clients’ objectives and maintaining close attention to every detail, we strive to transform ideas into impactful printed materials that reflect their brand identity and vision. Our commitment to quality is supported by professional expertise, efficient production processes, and a customer-focused approach—delivering consistent results from short-run digital printing to bulk commercial printing. At PrintOne Graphics, our journey is driven by creativity, trust, and continuous improvement as we build long-term partnerships, embrace new opportunities, and deliver printing solutions that make every project stand out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us (6 Client Pillars) */}
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
