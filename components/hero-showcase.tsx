'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart, createWhatsAppUrl } from '@/context/cart-context';
import { services } from '@/data/services';

interface HeroSlide {
  id: string;
  title: string;
  category: string;
  spec: string;
  image: string;
  finish: string;
  serviceId: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-slide-1',
    title: 'Integrated Annual Report Mockup',
    category: 'Annual Reports',
    spec: '320 GSM Colorplan · Metallic Foil · Section Sewn',
    finish: 'Hardcover Binding with Custom Gold Foil Stamping',
    image: '/printone-assets/home-annual-report-mockup.png',
    serviceId: 'annual-report-design',
  },
  {
    id: 'hero-slide-2',
    title: 'Design Studio & Corporate Gifting',
    category: 'Design & Gifting',
    spec: 'Custom EVA Foam Inlays · Laser Etch · Luxury Boxes',
    finish: 'Bespoke Curated Executive Gift Sets & Presentation Hampers',
    image: '/printone-assets/home-design-gifting-banner.png',
    serviceId: 'gift-sets',
  },
  {
    id: 'hero-slide-3',
    title: 'Annual Report Print Showcase',
    category: 'Commercial Print',
    spec: 'FMCG & Corporate Reports · Delta-E Calibrated',
    finish: 'High-Volume Offset & Digital Press Production with Velvet Matte',
    image: '/printone-assets/home-annual-report-showcase.png',
    serviceId: 'commercial-printing',
  },
];

export function HeroShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HeroSlide | null>(null);
  const { add } = useCart();

  // Auto-advance slider every 5 seconds (pauses on mouse hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  const handleAddToCart = (item: HeroSlide) => {
    const s = services.find((srv) => srv.id === item.serviceId) || services[0];
    add(s);
  };

  return (
    <section className="relative overflow-hidden border-b border-[#e5ded4] bg-[#faf8f2]">
      {/* Background Architectural Grid Pattern */}
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

      {/* Two-Part Split Layout: Left Content (50%) + Right Interactive Slider (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[640px] xl:min-h-[720px]">
        {/* Left Part: Editorial Statement & Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16 2xl:px-20 lg:py-12">
          <div className="max-w-[620px] w-full lg:ml-auto">
            <h1 className="font-display text-[clamp(2.1rem,3.2vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-.04em] text-[#10383A]">
              YOUR TRUSTED<br />
              <span className="text-[#DAA112]">PRINT PARTNER.</span><br />
              FROM CONCEPT TO FINISH.
            </h1>

            {/* Requested Italic Font for Subtitle */}
            <p
              className="mt-3.5 font-serif text-[16px] sm:text-[18.5px] font-bold italic tracking-wide text-[#666E51] leading-snug"
              style={{ fontStyle: 'italic', fontStyleRule: 'italic' } as React.CSSProperties}
            >
              Your Trusted Partner for Design, Digital Printing &amp; Corporate Gifting
            </p>

            <div className="mt-4 space-y-2.5 text-[13.5px] sm:text-[14.5px] leading-[1.62] text-[#55524c]">
              <p>
                PrintOne Graphics is a creative design and printing company based in Byculla East, Mumbai, delivering quality printing solutions to organisations across India.
              </p>
              <p>
                From concept development and creative design to premium printing, binding, and finishing, we combine creativity, precision, and attention to detail to bring every project to life. Our commitment to quality, timely delivery, and reliable service ensures that every project meets our clients’ expectations.
              </p>
              <p>
                At PrintOne Graphics, we believe every print tells a story. Whether it’s books, annual reports, brochures, corporate publications, or customised print materials, we turn ideas into impactful printed experiences.
              </p>
            </div>

            {/* Quick Category Visual Links */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {[
                { label: 'Annual Reports', tag: 'Ideas to artwork' },
                { label: 'Commercial & Digital Print', tag: 'Business essentials' },
                { label: 'Books & Publications', tag: 'Books + learning' },
                { label: 'Corporate Gifting', tag: 'Gifting + merchandise' },
                { label: 'Packaging & Boxes', tag: 'Production' },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={`/products?tag=${encodeURIComponent(cat.tag)}`}
                  className="rounded border border-[#ded6c9] bg-white/70 px-3 py-1 text-[11px] font-bold text-[#45433d] transition-all hover:border-[#10383A] hover:bg-white hover:text-[#10383A]"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <Link href="/services" className="btn-primary group" data-testid="link-hero-services">
                <span>Explore our services</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link href="/products" className="btn-outline group" data-testid="link-hero-products">
                <span>Browse products</span>
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Bottom Proof Metrics Ribbon */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#e2dacf] pt-4">
              <div>
                <span className="block font-display text-xl sm:text-2xl font-black text-[#10383A]">2021</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Established Mumbai
                </span>
              </div>

              <div>
                <span className="block font-display text-xl sm:text-2xl font-black text-[#10383A]">In-House</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Design &amp; Press Facility
                </span>
              </div>

              <div>
                <span className="block font-display text-xl sm:text-2xl font-black text-[#10383A]">Pan-India</span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#768886] uppercase tracking-wider">
                  Dependable Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Part: Animated Horizontal Slide Showcase with PPT Presentation Motion */}
        <div
          className="relative w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[#ded7cb] bg-[#10383A] overflow-hidden flex flex-col justify-between"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slide Motion Wrapper */}
          <div className="relative w-full flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                transition={{
                  x: { type: 'spring', stiffness: 280, damping: 30 },
                  opacity: { duration: 0.35 },
                }}
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={() => setSelectedItem(activeSlide)}
              >
                {/* Background Image with gentle scale transition */}
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-cover object-center select-none"
                />

                {/* Rich Gradient Overlay for PPT Polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10383A] via-[#10383A]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />

                {/* Slide Top Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
                  <motion.span
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#DAA112] backdrop-blur-md shadow-md"
                  >
                    <Sparkles size={11} className="text-[#DAA112]" />
                    <span>{activeSlide.category}</span>
                  </motion.span>

                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    0{currentSlide + 1} / 0{HERO_SLIDES.length}
                  </span>
                </div>

                {/* PPT-Style Animated Captions at Bottom */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-20 text-white">
                  <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="max-w-xl"
                  >
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-.03em] leading-tight text-white drop-shadow-md">
                      {activeSlide.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm font-semibold text-[#DAA112] tracking-wide">
                      {activeSlide.finish}
                    </p>

                    <p className="mt-1 text-xs text-white/80 line-clamp-2">
                      {activeSlide.spec}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white hover:text-[#DAA112] underline decoration-[#DAA112] underline-offset-4 transition-colors">
                        Inspect Specimen Details &rarr;
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls Bar */}
          <div className="relative z-30 flex items-center justify-between border-t border-white/15 bg-[#10383A]/90 px-5 py-3 backdrop-blur-md">
            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setDirection(idx > currentSlide ? 1 : -1);
                    setCurrentSlide(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'w-8 bg-[#DAA112]'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-[#DAA112] hover:text-[#10383A] transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-[#DAA112] hover:text-[#10383A] transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-Inspect Modal when clicking any card in the scroller */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-xl border border-[#ded7cb] bg-[#faf8f2] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-[#ded7cb] bg-white text-[#52504b] hover:border-[#10383A] hover:text-[#10383A] transition-colors"
              aria-label="Close Preview"
            >
              <X size={16} />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#242628]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 left-3 rounded bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {selectedItem.category}
              </div>
            </div>

            <div className="mt-5">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#666E51]">
                Print One Physical Specimen
              </span>
              <h3 className="mt-1 font-display text-2xl font-extrabold text-[#1d1f20]">
                {selectedItem.title}
              </h3>

              <div className="mt-4 rounded-lg border border-[#e4ded5] bg-[#f2ede4] p-3 text-xs space-y-1.5 text-[#44423d]">
                <div>
                  <span className="font-bold text-[#1f2122]">Material & Weight: </span>
                  <span>{selectedItem.spec}</span>
                </div>
                <div>
                  <span className="font-bold text-[#1f2122]">Finish & Structure: </span>
                  <span>{selectedItem.finish}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="btn-primary text-xs flex-1"
                >
                  <Plus size={14} />
                  <span>Add to Enquiry List</span>
                </button>

                <a
                  href={createWhatsAppUrl(
                    `Hello Print One Graphics! I would like to enquire about ${selectedItem.title} (${selectedItem.spec}).`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-[#d6cec2] bg-white px-4 py-3 text-xs font-bold text-[#212324] hover:border-[#10383A] hover:text-[#10383A] transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
