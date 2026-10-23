'use client';

import { useState } from 'react';
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

/**
 * Layout idea (from the Yousign reference)
 * ----------------------------------------
 * Light, airy sections. Images are NOT full-bleed: each one sits inside a
 * framed card, and solid colour blocks are placed *behind and offset from* it
 * so the photo looks layered on top of the page. Larger pale blocks run off the
 * viewport edge, smaller solid blocks peek out from the photo's corners.
 * Copy sits on plain background with lots of space. Sides alternate.
 *
 * Palette (all from the existing theme):
 *   teal  #10383A   gold #DAA112   sage #809276   cream #faf8f2
 *   gold tint #f6e6b4   sage tint #dfe6d9
 */

const PILLARS = [
  {
    title: 'Experienced Team',
    desc: 'Our experienced design and print professionals ensure every project is executed with precision and care.',
    icon: Users,
    accent: '#10383A',
  },
  {
    title: 'End-to-End Solutions',
    desc: 'From creative design and prepress to printing, finishing and delivery, we handle the entire process seamlessly.',
    icon: Layers,
    accent: '#2c9fc3',
  },
  {
    title: 'Quality-Driven Approach',
    desc: 'We use advanced printing technology, high-grade materials and strict quality checks to deliver consistent results.',
    icon: ShieldCheck,
    accent: '#cf2879',
  },
  {
    title: 'Modern Infrastructure',
    desc: 'Our in-house capabilities and modern equipment allow us to handle projects of varying scale and complexity.',
    icon: Wrench,
    accent: '#b8960f',
  },
  {
    title: 'Competitive Pricing',
    desc: 'We offer transparent and cost-effective solutions without compromising on quality or service standards.',
    icon: DollarSign,
    accent: '#27292a',
  },
  {
    title: 'Customer-Centric Service',
    desc: 'We work closely with clients to understand their needs, meet deadlines and ensure complete satisfaction.',
    icon: Handshake,
    accent: '#0f9d6e',
  },
];

export function AboutClient() {
  const [heroExpanded, setHeroExpanded] = useState(false);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. HERO — copy left, framed photo right with offset colour blocks */}
      <section className="relative overflow-hidden bg-[#faf8f2]">
        {/* Large pale block bleeding off the top-right edge */}
        <div
          className="pointer-events-none absolute right-0 top-0 hidden h-[72%] w-[24%] bg-[#f6e6b4] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[clamp(1.8rem,2.6vw,2.55rem)] font-bold leading-[1.15] tracking-[-.03em] text-[#10383A]">
              <span className="block">Your Trusted Partner for Design,</span>
              <span className="block text-[#DAA112]">Digital Printing &amp; Corporate Gifting.</span>
            </h1>

            <div className="mt-5 text-[14px] leading-[1.75] text-[#4d4a44] sm:text-[15px]">
              <p>
                PrintOne Graphics is a Mumbai-based printing and graphic design company dedicated to delivering high-quality printing solutions with creativity, precision, and reliability. From concept development and creative design to premium printing, finishing, and binding, we offer end-to-end solutions tailored to meet the diverse needs of businesses, publishers, educational institutions, and organisations across India. We specialise in <strong className="font-bold text-[#10383A]">books and publication printing, annual reports, brochures, catalogues, corporate stationery, commercial printing, typesetting, and binding services</strong>.
              </p>

              {heroExpanded && (
                <p id="hero-more" className="mt-3.5">
                  Our focus is on combining innovative design, quality materials, and professional execution to ensure every project meets the highest standards. At PrintOne Graphics, we believe that every print project tells a story. Our commitment to quality, attention to detail, timely delivery, and customer satisfaction helps us build lasting relationships with our clients. Based in Byculla East, Mumbai, we strive to be your trusted printing partner—transforming your ideas into impactful printed experiences.
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
              <Link href="/services" className="btn-primary group" data-testid="link-about-hero-services">
                <span>Explore our services</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/products" className="btn-outline group" data-testid="link-about-hero-products">
                <span>View products</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2 text-[12px] font-semibold text-[#4f4c46]">
              {['Creative Design', 'Digital Printing', 'Corporate Gifting', 'In-House Production'].map((tag) => (
                <li
                  key={tag}
                  className="flex items-center gap-2 rounded-full border border-[#e2dacb] bg-white px-3.5 py-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DAA112]" aria-hidden="true" />
                  {tag}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Framed image + offset blocks */}
          <motion.div
            className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* gold block, up and to the right of the photo */}
            <div
              className="absolute -right-3 -top-3 h-[62%] w-[62%] bg-[#DAA112] sm:-right-6 sm:-top-6"
              aria-hidden="true"
            />
            {/* teal block, down and to the left */}
            <div
              className="absolute -bottom-3 -left-3 h-[34%] w-[34%] bg-[#10383A] sm:-bottom-6 sm:-left-6"
              aria-hidden="true"
            />

            <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-[#e8e2d6] shadow-[0_24px_60px_-20px_rgba(16,56,58,0.45)]">
              <img
                src="/printone-assets/about-modern-print-floor-clean.png"
                alt="PrintOne Graphics Modern Print Production Floor and Heidelberg Offset Machinery"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating label card, overlapping the photo edge */}

          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY — framed artwork left, copy right */}
      <section className="relative overflow-hidden bg-white">
        {/* Pale sage block bleeding off the left edge */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 hidden h-[78%] w-[26%] bg-[#dfe6d9] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
          {/* Image side (second in the DOM so the headline leads on mobile; first on desktop) */}
          <div className="relative mx-auto w-full max-w-[560px] lg:order-1 lg:max-w-none">
            <div
              className="absolute -left-3 -top-3 h-[40%] w-[40%] bg-[#DAA112] sm:-left-6 sm:-top-6"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-3 -right-3 h-[58%] w-[58%] bg-[#809276] sm:-bottom-6 sm:-right-6"
              aria-hidden="true"
            />

            <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-sm bg-white p-4 shadow-[0_24px_60px_-20px_rgba(16,56,58,0.4)] sm:p-7">
              <img
                src="/printone-assets/about-creative-thinking.png"
                alt="PrintOne Graphics Creative Thinking, Quality Printing, and Reliable Delivery"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Copy side */}
          <div className="lg:order-2">
            <p className="text-sm font-semibold text-[#8a7a3a]">Our Story</p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,2.7vw,2.5rem)] font-bold leading-[1.15] tracking-[-.03em] text-[#10383A]">
              Creative Thinking. Quality Printing. Reliable Delivery.
            </h2>

            <div className="mt-6 space-y-3.5 text-[14px] leading-[1.8] text-[#4d4a44] sm:text-[15px]">
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

      {/* 3. WHY CHOOSE US — copy left, strengths "card" layered over colour blocks */}
      <section className="relative overflow-hidden bg-[#faf8f2]">
        {/* Large sage-tint block bleeding off the right edge */}
        <div
          className="pointer-events-none absolute right-0 top-[8%] hidden h-[84%] w-[30%] bg-[#dfe6d9] lg:block"
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#8a7a3a]">Our Competitive Edge</p>
            <h2 className="mt-2 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-bold leading-[1.12] tracking-[-.03em] text-[#10383A]">
              Why Choose Us.
            </h2>
            <p className="mt-5 max-w-md text-[14px] leading-[1.8] text-[#4d4a44] sm:text-[15px]">
              Six foundational strengths that make PrintOne Graphics the preferred choice for businesses across India.
            </p>
            <Link href="/contact" className="btn-primary group mt-8 inline-flex">
              <span>Speak with our team</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative lg:col-span-7">
            {/* teal block peeking out behind the card */}
            <div
              className="absolute -bottom-3 -left-3 h-[38%] w-[34%] bg-[#10383A] sm:-bottom-6 sm:-left-6"
              aria-hidden="true"
            />
            <div
              className="absolute -right-3 -top-3 h-[26%] w-[26%] bg-[#DAA112] sm:-right-5 sm:-top-5"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 gap-x-9 gap-y-8 rounded-sm bg-white p-7 shadow-[0_24px_60px_-20px_rgba(16,56,58,0.4)] sm:grid-cols-2 sm:p-10">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title}>
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${pillar.accent}14`, color: pillar.accent }}
                    >
                      <Icon size={21} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-[17px] font-bold text-[#1f2122]">{pillar.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#5f5b54]">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}