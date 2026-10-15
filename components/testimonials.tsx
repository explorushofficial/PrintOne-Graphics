'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, Award, Building2, BookOpen, Gift, Printer, FileText } from 'lucide-react';

interface Testimonial {
  id: string;
  headline: string;
  content: string;
  clientType: string;
  projectType: string;
  icon: React.ElementType;
  accent: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    headline: 'A Trusted Printing Partner for Our Annual Reports',
    content:
      'Print One Graphics has been a dependable partner for our annual report projects. Their team understands the importance of accuracy, presentation and timelines. From design and typesetting to printing and finishing, the entire process was handled professionally.',
    clientType: 'Corporate Client',
    projectType: 'Annual Report',
    icon: FileText,
    accent: '#e97819',
  },
  {
    id: 'test-2',
    headline: 'Excellent Quality & Timely Delivery',
    content:
      'We appreciate the quality of printing and the quick response from the Print One Graphics team. They consistently delivered our requirements within the committed timeline while maintaining excellent print quality.',
    clientType: 'Corporate Client',
    projectType: 'Commercial Printing',
    icon: Printer,
    accent: '#2c9fc3',
  },
  {
    id: 'test-3',
    headline: 'Professional Team with Great Attention to Detail',
    content:
      'The team at Print One Graphics is extremely responsive and detail-oriented. Their understanding of corporate publications, design requirements and finishing options made the entire project smooth and hassle-free.',
    clientType: 'Corporate Client',
    projectType: 'Corporate Publications',
    icon: Award,
    accent: '#cf2879',
  },
  {
    id: 'test-4',
    headline: 'One-Stop Solution for Printing & Corporate Gifting',
    content:
      'Print One Graphics offers a complete solution under one roof—from creative design and digital printing to calendars, diaries and corporate gifting. Their team is professional, flexible and easy to work with.',
    clientType: 'Corporate Client',
    projectType: 'Corporate Gifting',
    icon: Gift,
    accent: '#e7c627',
  },
  {
    id: 'test-5',
    headline: 'Quality Printing with Quick Turnaround',
    content:
      'For projects where deadlines are critical, Print One Graphics has always been a reliable choice. Their in-house capabilities and experienced team help achieve quick turnaround without compromising on quality.',
    clientType: 'Corporate Client',
    projectType: 'Digital Printing',
    icon: Building2,
    accent: '#27292a',
  },
  {
    id: 'test-6',
    headline: 'A Reliable Partner for Educational & Publication Printing',
    content:
      'Print One Graphics understands the specific requirements of books, journals, magazines and educational publications. Their attention to paper quality, colour reproduction, binding and finishing has made them a valued printing partner.',
    clientType: 'Educational & Publishing Client',
    projectType: 'Books & Educational Journals',
    icon: BookOpen,
    accent: '#e97819',
  },
];

export function Testimonials() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Annual Report', label: 'Annual Reports' },
    { id: 'Commercial Printing', label: 'Commercial Print' },
    { id: 'Corporate Publications', label: 'Publications' },
    { id: 'Corporate Gifting', label: 'Corporate Gifting' },
    { id: 'Digital Printing', label: 'Digital Print' },
    { id: 'Books & Educational Journals', label: 'Educational' },
  ];

  const filtered =
    activeCategory === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.projectType === activeCategory);

  return (
    <section className="section-space border-b border-[#e2d9cd] bg-[#ede7dc]/60">
      <div className="page-wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ded5c7] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ded5c7] bg-[#f5f0e6] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6d6a62]">
              <Star size={12} className="text-[#e97819] fill-[#e97819]" />
              <span>Client Testimonials</span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
              Trusted by Businesses.<br />
              <span className="text-[#e97819]">Proven by Results.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="border-l-2 border-[#e97819] pl-4 text-xs sm:text-sm italic leading-relaxed text-[#5e5b54]">
              “We value every relationship we build and every project we deliver. Our clients&apos; trust inspires us to continually raise the standard of design, printing and service.”
            </p>
            <p className="mt-2 pl-4 text-[11px] font-bold uppercase tracking-wider text-[#8b877f]">
              Print One Graphics Leadership Promise
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-bold uppercase tracking-wider text-[#7c7972]">
            Filter by service:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#202223] text-white shadow-sm'
                    : 'bg-[#faf8f2] text-[#636058] border border-[#ded5c7] hover:border-[#e97819] hover:text-[#e97819]'
                }`}
                data-testid={`filter-testimonial-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="relative flex flex-col justify-between rounded-xl border border-[#ded5c7] bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-[#e97819] hover:shadow-lg"
                  data-testid={`testimonial-card-${item.id}`}
                >
                  <div>
                    {/* Top strip with Icon and Project Tag */}
                    <div className="flex items-center justify-between border-b border-[#f0ebd5] pb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="grid h-8 w-8 place-items-center rounded-lg text-white"
                          style={{ backgroundColor: item.accent }}
                        >
                          <Icon size={16} />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#79756e]">
                          {item.projectType}
                        </span>
                      </div>
                      <Quote size={20} className="text-[#ded5c7]" />
                    </div>

                    {/* Headline */}
                    <h3 className="mt-5 font-display text-lg font-bold leading-snug text-[#1f2122]">
                      “{item.headline}”
                    </h3>

                    {/* Review Body */}
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#595650]">
                      {item.content}
                    </p>
                  </div>

                  {/* Client Attributions */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#f0ebd5] pt-4">
                    <div>
                      <span className="block text-xs font-bold text-[#1f2122]">
                        {item.clientType}
                      </span>
                      <span className="block text-[11px] font-medium text-[#8b877f]">
                        {item.projectType} Project
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#e97819]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-[#e97819]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Trust Assurance Band */}
        <div className="mt-12 rounded-xl border border-[#ded5c7] bg-[#fbf9f4] p-6 text-center sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#e97819]">
            Continuous Long-Term Client Partnerships
          </p>
          <h3 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-[#1f2122]">
            Ready to experience reliable printing with professional service?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-[#66635c]">
            From Byculla East, Mumbai to corporate boardrooms and institutional campuses across India, we deliver quality, precision and dependable service for every project.
          </p>
        </div>
      </div>
    </section>
  );
}
