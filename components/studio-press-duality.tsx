'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Palette, Printer, Sparkles, Layers, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export function StudioPressDuality() {
  const [activeSide, setActiveSide] = useState<'both' | 'studio' | 'press'>('both');

  return (
    <section className="section-space border-b border-[#e2dad0] bg-[#809276]">
      <div className="page-wrap">
        {/* Punchy Visual Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="eyebrow text-white">Two Worlds · One Roof</p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-white">
              The Studio & The Press.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-white">
            Creative design intent and industrial press precision, living together under one Mumbai roof.
          </p>
        </motion.div>

        {/* Visual Dual Stage */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Side 01: The Design Studio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group overflow-hidden rounded-xl border p-6 sm:p-8 transition-all duration-300 ${
              activeSide === 'studio' || activeSide === 'both'
                ? 'border-[#10383A] bg-white shadow-lg'
                : 'border-[#dbd3c6] bg-[#fbf9f5] opacity-80'
            }`}
            onMouseEnter={() => setActiveSide('studio')}
            onMouseLeave={() => setActiveSide('both')}
          >
            <div className="flex items-center justify-between border-b border-[#ece6dd] pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2ebd9] px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#716d64]">
                <Palette size={12} className="text-[#10383A]" />
                01 · Design Atelier
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[.15em] text-[#8e8a82]">
                Typography & Editorial
              </span>
            </div>

            {/* Visual Image Grid */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#10383A]">
                <img
                  src="/print-editorial.jpg"
                  alt="Editorial Layouts"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Editorial Layouts
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#10383A]">
                <img
                  src="/catalog/thematic-cover-design.jpg"
                  alt="Thematic Cover Art"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Cover Direction
                </span>
              </div>
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold text-[#1f2122]">
              The Design Studio
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#615e58] leading-relaxed">
              Meticulous typographic pairing, baseline grids, and narrative structuring. We build publications ready for real-world touch.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {['Annual Report Layouts', 'Information Design', 'Infographics', 'Pre-Press Calibration'].map((tag) => (
                <span key={tag} className="rounded bg-[#f0ebe0] px-2.5 py-1 text-[10px] font-semibold text-[#545149]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-[#ece6dd] pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#10383A] hover:text-[#666E51] transition-colors"
              >
                <span>View studio services</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Side 02: The Mechanical Press */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group overflow-hidden rounded-xl border p-6 sm:p-8 transition-all duration-300 ${
              activeSide === 'press' || activeSide === 'both'
                ? 'border-[#10383A] bg-white shadow-lg'
                : 'border-[#dbd3c6] bg-[#fbf9f5] opacity-80'
            }`}
            onMouseEnter={() => setActiveSide('press')}
            onMouseLeave={() => setActiveSide('both')}
          >
            <div className="flex items-center justify-between border-b border-[#ece6dd] pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2ebd9] px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#716d64]">
                <Printer size={12} className="text-[#2c9fc3]" />
                02 · The Press
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[.15em] text-[#8e8a82]">
                Offset & Bindery
              </span>
            </div>

            {/* Visual Image Grid */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#10383A]">
                <img
                  src="/client-assets/machinery/accuriopress-c7100.png"
                  alt="Konica Minolta AccurioPress C7100"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/production/accuriopress-c7100.png')) {
                      target.src = '/production/accuriopress-c7100.png';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  AccurioPress Digital
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#10383A]">
                <img
                  src="/client-assets/machinery/heidelberg-offset.jpg"
                  alt="Heidelberg Speedmaster XL 106"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/production/heidelberg-offset.jpg')) {
                      target.src = '/production/heidelberg-offset.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Heidelberg Offset
                </span>
              </div>
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold text-[#1f2122]">
              The Production Press
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#615e58] leading-relaxed">
              From short-run Indigo digital to industrial multi-color offset, foil stamping dies, and archival Smyth sewn book binding.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {['Metallic Foil Stamping', 'Singer Stitching', 'Spot Scodix 3D', 'Die-Cut Structural Box'].map((tag) => (
                <span key={tag} className="rounded bg-[#f0ebe0] px-2.5 py-1 text-[10px] font-semibold text-[#545149]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-[#ece6dd] pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#10383A] hover:text-[#DAA112] transition-colors"
              >
                <span>View press capabilities</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
