'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceCard } from '@/components/service-card';
import { services } from '@/data/services';

const CATEGORIES = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'Ideas to artwork', label: 'Annual Reports & Design' },
  { id: 'Books + learning', label: 'Books & Publishing' },
  { id: 'Production', label: 'Packaging & Production' },
  { id: 'Business essentials', label: 'Brand Collateral' },
  { id: 'Gifting + merchandise', label: 'Corporate Gifting' },
];

export function InteractiveCapabilities() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices =
    selectedCategory === 'all'
      ? services.slice(0, 6)
      : services.filter((s) => s.tag === selectedCategory).slice(0, 6);

  return (
    <section className="section-space bg-[#faf8f2]">
      <div className="page-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow">Comprehensive Capabilities</p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
              Everything you need,<br />
              <span className="text-[#e97819]">crafted with precision.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#63615b]">
            From high-stakes board-level communications to high-volume commercial print, explore what we make for forward-thinking organizations across India.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-[#e5dfd4] pb-4">
          <span className="mr-2 hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8b877f] sm:flex">
            <Filter size={13} className="text-[#e97819]" /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#222425] text-white shadow-sm'
                    : 'bg-[#ede7dc] text-[#55524b] hover:bg-[#e3dcd0] hover:text-[#222425]'
                }`}
                data-testid={`filter-category-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid with Motion Stagger */}
        <motion.div
          layout
          className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <ServiceCard service={service} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Link */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#e2d8cd] pt-6">
          <p className="text-xs text-[#737068]">
            Showing 6 of {services.length} items. Need something custom engineered? We manufacture to bespoke trim, stock & finish specifications.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#e97819] hover:text-[#212324] transition-colors"
            data-testid="link-home-all-services"
          >
            <span>Browse our full catalog of 30+ services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
