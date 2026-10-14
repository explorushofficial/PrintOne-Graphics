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
    accent: '#e97819',
    badge: 'Standard',
  },
  {
    title: 'Customer Satisfaction',
    description:
      'Dedicated support from brief to delivery, ensuring your project outcomes exceed expectations every single time.',
    icon: Smile,
    accent: '#2c9fc3',
    badge: 'Commitment',
  },
  {
    title: 'Integrity and Transparency',
    description:
      'Clear, honest communication, transparent pricing, and dependable recommendations with no hidden surprises.',
    icon: Eye,
    accent: '#cf2879',
    badge: 'Principle',
  },
  {
    title: 'Innovation and Continuous Improvement',
    description:
      'Adopting advanced digital printing technology, creative finishes, and modernized production techniques.',
    icon: Lightbulb,
    accent: '#e7c627',
    badge: 'Evolution',
  },
  {
    title: 'Timely Execution',
    description:
      'Disciplined production scheduling and strict deadline adherence for AGM dates, product launches, and academic cycles.',
    icon: Clock,
    accent: '#27292a',
    badge: 'Reliability',
  },
  {
    title: 'Long-Term Partnerships',
    description:
      'Building enduring relationships founded on mutual trust, responsive service, and consistent value across India.',
    icon: Handshake,
    accent: '#e97819',
    badge: 'Growth',
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
            <Sparkles size={12} className="text-[#e97819]" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
            Our Vision, Mission<br />
            <span className="text-[#e97819]">&amp; Core Values.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base leading-relaxed text-[#615e57]">
            At PrintOne Graphics, our foundation is built on delivering dependable printing, publishing, and gifting solutions that strengthen your corporate brand and inspire lasting trust.
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
              <span className="text-xs font-bold uppercase tracking-[.2em] text-[#e97819]">
                Our Vision
              </span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#faece1] text-[#e97819]">
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
            <span className="text-xs font-bold uppercase tracking-[.2em] text-[#e97819]">
              What We Stand For
            </span>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#1f2122]">
              Our Core Values
            </h3>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-xl border border-[#ded5c7] bg-white p-6 shadow-sm transition-all hover:border-[#e97819] hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-[#f0ecd8] pb-3">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-lg text-white"
                      style={{ backgroundColor: val.accent }}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b877f]">
                      {val.badge}
                    </span>
                  </div>

                  <h4 className="mt-4 font-display text-lg font-bold text-[#1f2122]">
                    {val.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#5e5b54]">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Expertise Strip (Client Request) */}
        {showExpertise && (
          <div className="mt-14 rounded-2xl border border-[#ded5c7] bg-[#222425] p-7 sm:p-10 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-[.2em] text-[#e97819]">
                  Comprehensive Portfolio
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold">
                  Our Core Expertise
                </h3>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-[#b8b4ab]">
                From concept and creative design to premium printing and finishing, we deliver quality, precision and reliable service for every project.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              {CORE_EXPERTISE.map((item, index) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold tracking-wide text-[#f2ede4] backdrop-blur-sm transition-colors hover:border-[#e97819] hover:bg-[#e97819] hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e97819]" />
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
