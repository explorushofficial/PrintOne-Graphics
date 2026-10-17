'use client';

import { motion } from 'motion/react';
import {
  Compass,
  Target,
  ShieldCheck,
  Smile,
  Eye,
  Lightbulb,
  Clock,
  Handshake,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const CORE_VALUES = [
  {
    title: 'Quality and Professionalism',
    description:
      'Rigorous attention to detail, colour consistency, accurate layouts, and premium finishing at every stage of production.',
    icon: ShieldCheck,
    accent: '#10383A',
    badge: 'Standard',
    // Emerald / Spruce Crystal
    crystalBg: 'bg-gradient-to-br from-[#10383A]/[0.08] via-white/85 to-[#10383A]/[0.02]',
    crystalBorder: 'border-[#10383A]/20 hover:border-[#10383A]/50',
    crystalGlow: 'hover:shadow-[0_12px_28px_-6px_rgba(16,56,58,0.16)]',
    badgeStyle: 'bg-[#10383A]/10 text-[#10383A] border border-[#10383A]/20',
    iconBg: 'bg-[#10383A]',
    glowColor: '#10383A',
  },
  {
    title: 'Customer Satisfaction',
    description:
      'Dedicated support from brief to delivery, ensuring your project outcomes exceed expectations every single time.',
    icon: Smile,
    accent: '#2c9fc3',
    badge: 'Commitment',
    // Aquamarine / Sapphire Crystal
    crystalBg: 'bg-gradient-to-br from-[#2c9fc3]/[0.09] via-white/85 to-[#2c9fc3]/[0.02]',
    crystalBorder: 'border-[#2c9fc3]/25 hover:border-[#2c9fc3]/60',
    crystalGlow: 'hover:shadow-[0_12px_28px_-6px_rgba(44,159,195,0.18)]',
    badgeStyle: 'bg-[#2c9fc3]/10 text-[#196b86] border border-[#2c9fc3]/25',
    iconBg: 'bg-[#2c9fc3]',
    glowColor: '#2c9fc3',
  },
  {
    title: 'Integrity and Transparency',
    description:
      'Clear, honest communication, transparent pricing, and dependable recommendations with no hidden surprises.',
    icon: Eye,
    accent: '#cf2879',
    badge: 'Principle',
    // Rose Quartz / Amethyst Crystal
    crystalBg: 'bg-gradient-to-br from-[#cf2879]/[0.08] via-white/85 to-[#cf2879]/[0.02]',
    crystalBorder: 'border-[#cf2879]/20 hover:border-[#cf2879]/50',
    crystalGlow: 'hover:shadow-[0_12px_28px_-6px_rgba(207,40,121,0.16)]',
    badgeStyle: 'bg-[#cf2879]/10 text-[#961a55] border border-[#cf2879]/20',
    iconBg: 'bg-[#cf2879]',
    glowColor: '#cf2879',
  },
  {
    title: 'Innovation and Continuous Improvement',
    description:
      'Adopting advanced digital printing technology, creative finishes, and modernized production techniques.',
    icon: Lightbulb,
    accent: '#d49b10',
    badge: 'Evolution',
    // Amber Topaz Crystal
    crystalBg: 'bg-gradient-to-br from-[#DAA112]/[0.09] via-white/85 to-[#DAA112]/[0.02]',
    crystalBorder: 'border-[#DAA112]/25 hover:border-[#DAA112]/60',
    crystalGlow: 'hover:shadow-[0_12px_28px_-6px_rgba(218,161,18,0.18)]',
    badgeStyle: 'bg-[#DAA112]/15 text-[#7c5b08] border border-[#DAA112]/30',
    iconBg: 'bg-[#c58f0e]',
    glowColor: '#DAA112',
  },
  {
    title: 'Timely Execution',
    description:
      'Disciplined production scheduling and strict deadline adherence for AGM dates, product launches, and academic cycles.',
    icon: Clock,
    accent: '#666E51',
    badge: 'Reliability',
    // Forest Olive / Peridot Crystal
    crystalBg: 'bg-gradient-to-br from-[#666E51]/[0.10] via-white/85 to-[#666E51]/[0.02]',
    crystalBorder: 'border-[#666E51]/25 hover:border-[#666E51]/60',
    crystalGlow: 'hover:shadow-[0_12px_28px_-6px_rgba(102,110,81,0.18)]',
    badgeStyle: 'bg-[#666E51]/12 text-[#4d533d] border border-[#666E51]/25',
    iconBg: 'bg-[#666E51]',
    glowColor: '#666E51',
  },
  {
    title: 'Long-Term Partnerships',
    description:
      'Building enduring relationships founded on mutual trust, responsive service, and consistent value across India.',
    icon: Handshake,
    accent: '#809276',
    badge: 'Growth',
    // Soft Sage / Celadon Crystal
    crystalBg: 'bg-gradient-to-br from-[#809276]/[0.12] via-white/85 to-[#809276]/[0.03]',
    crystalBorder: 'border-[#809276]/30 hover:border-[#809276]/65',
    crystalGlow: 'hover:shadow-[0_12px_28px_-6px_rgba(128,146,118,0.20)]',
    badgeStyle: 'bg-[#809276]/15 text-[#465440] border border-[#809276]/30',
    iconBg: 'bg-[#6f8066]',
    glowColor: '#809276',
  },
];

const CORE_EXPERTISE = [
  'Annual Reports',
  'Corporate Printing',
  'Digital Printing',
  'Commercial Printing',
  'Books & Publications',
  'Educational Printing',
  'Calendars',
  'Diaries',
  'Corporate Gifting',
  'Packaging',
  'Creative Design',
  'Binding & Finishing',
];

export function VisionMissionValues({ showExpertise = true }: { showExpertise?: boolean }) {
  return (
    <section className="section-space border-b border-[#e2d9cd] bg-[#f5f1e8]">
      <div className="page-wrap">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#ede7dc] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6d6a62]">
            <Sparkles size={12} className="text-[#10383A]" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
            Our Vision, Mission<br />
            <span className="text-[#10383A]">&amp; Core Values.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base leading-relaxed text-[#615e57]">
            At Print One Graphics, our foundation is built on delivering dependable printing, publishing, and gifting solutions that strengthen your corporate brand and inspire lasting trust.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-[#ded5c7] bg-white p-7 sm:p-9 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-[#ece6dd] pb-4">
              <span className="text-xs font-bold uppercase tracking-[.2em] text-[#10383A]">
                Our Vision
              </span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf1f1] text-[#10383A]">
                <Compass size={20} />
              </div>
            </div>

            <h3 className="mt-6 font-display text-2xl sm:text-3xl font-extrabold text-[#1f2122] leading-snug">
              Preferred Partner for Print, Publishing &amp; Gifting
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#595650]">
              To become a trusted and preferred partner for printing, publishing, corporate communications and gifting solutions by consistently delivering value, innovation and quality.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#f0ecd8] text-[11px] font-bold uppercase tracking-wider text-[#7e7a72]">
              <span className="rounded bg-[#f5f1e8] px-2.5 py-1">Value Creation</span>
              <span className="rounded bg-[#f5f1e8] px-2.5 py-1">Quality Assurance</span>
              <span className="rounded bg-[#f5f1e8] px-2.5 py-1">Modern Innovation</span>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl border border-[#ded5c7] bg-white p-7 sm:p-9 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-[#ece6dd] pb-4">
              <span className="text-xs font-bold uppercase tracking-[.2em] text-[#2c9fc3]">
                Our Mission
              </span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e3f4f8] text-[#2c9fc3]">
                <Target size={20} />
              </div>
            </div>

            <h3 className="mt-6 font-display text-2xl sm:text-3xl font-extrabold text-[#1f2122] leading-snug">
              End-to-End Effective Communication
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#595650]">
              To provide end-to-end print solutions that combine creative design, modern technology, competitive pricing and dependable delivery, helping our clients communicate more effectively.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#f0ecd8] text-[11px] font-bold uppercase tracking-wider text-[#7e7a72]">
              <span className="rounded bg-[#f5f1e8] px-2.5 py-1">Creative Design</span>
              <span className="rounded bg-[#f5f1e8] px-2.5 py-1">Competitive Pricing</span>
              <span className="rounded bg-[#f5f1e8] px-2.5 py-1">Dependable Delivery</span>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="mt-14">
          <div className="border-b border-[#ded5c7] pb-4">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-[#10383A]">
              What We Stand For
            </span>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#1f2122]">
              Our Core Values
            </h3>
          </div>

          <div className="mt-6 grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`group relative overflow-hidden rounded-xl border p-4 sm:p-4.5 backdrop-blur-md transition-all duration-300 ${val.crystalBg} ${val.crystalBorder} ${val.crystalGlow}`}
                >
                  {/* Subtle crystal refraction glow in the top corner */}
                  <div
                    className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full blur-xl opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ backgroundColor: val.glowColor }}
                  />

                  {/* Top Bar: Icon + Badge */}
                  <div className="relative z-10 flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg text-white shadow-xs transition-transform duration-300 group-hover:scale-105 ${val.iconBg}`}
                    >
                      <Icon size={16} />
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${val.badgeStyle}`}>
                      {val.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="relative z-10 mt-2.5 font-display text-[15px] sm:text-base font-bold text-[#1f2122] transition-colors leading-snug">
                    {val.title}
                  </h4>

                  {/* Description */}
                  <p className="relative z-10 mt-1 text-[11px] sm:text-xs leading-normal sm:leading-relaxed text-[#55524b]">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Expertise Strip (Client Request) */}
        {showExpertise && (
          <div className="mt-14 rounded-2xl border border-[#1a4e50] bg-[#10383A] p-7 sm:p-10 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-[.2em] text-[#809276]">
                  Comprehensive Portfolio
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold">
                  Our Core Expertise
                </h3>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-[#c2d2cf]">
                From concept and creative design to premium printing and finishing, we deliver quality, precision and reliable service for every project.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              {CORE_EXPERTISE.map((item, index) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold tracking-wide text-[#f2ede4] backdrop-blur-sm transition-colors hover:border-[#809276] hover:bg-[#809276] hover:text-[#10383A]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DAA112]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
