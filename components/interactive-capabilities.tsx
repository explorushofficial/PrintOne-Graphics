'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceCard } from '@/components/service-card';
import { ProductModal } from '@/components/product-modal';
import { products, type Product } from '@/data/products';

const CATEGORIES = [
  { id: 'all', label: 'All Offerings' },
  { id: 'Business essentials', label: 'Brand Collateral' },
  { id: 'Books + learning', label: 'Books & Publishing' },
  { id: 'Gifting + merchandise', label: 'Corporate Gifting' },
  { id: 'Packaging + displays', label: 'Packaging & Production' },
  { id: 'Publications + reports', label: 'Annual Reports & Design' },
];

export function InteractiveCapabilities({ initialProducts }: { initialProducts?: Product[] } = {}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const activeCatalog = initialProducts && initialProducts.length > 0 ? initialProducts : products;

  const filteredServices =
    selectedCategory === 'all'
      ? activeCatalog.slice(0, 6)
      : activeCatalog.filter((s) => s.tag === selectedCategory).slice(0, 6);

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
            <p className="eyebrow">Featured Products &amp; Capabilities</p>
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

        {/* Services Grid with Motion Stagger - 2 cols on mobile, 3 cols on desktop */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                <ServiceCard
                  service={service}
                  index={index}
                  onSelect={(p) => setSelectedProduct(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Link */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#e2d8cd] pt-6">
          <p className="text-xs text-[#737068]">
            Showing 6 of {products.length} products. Need something custom engineered? We manufacture to bespoke trim, stock &amp; finish specifications.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-display text-xs sm:text-sm font-bold text-[#212324] hover:text-[#e97819] transition-colors"
              data-testid="link-home-view-services"
            >
              <span>Explore Services</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-display text-xs sm:text-sm font-bold text-[#e97819] hover:text-[#212324] transition-colors"
              data-testid="link-home-all-products"
            >
              <span>Browse Full Products Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        service={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
