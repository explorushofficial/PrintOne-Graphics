'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Plus,
  Sparkles,
  X,
  ExternalLink,
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
    title: 'Annual Report 2024–25 Showcase',
    category: 'Annual Reports',
    spec: '300 GSM Art Card · Hardbound & Center Spread · Spot UV & Foil',
    finish: 'Premium Multi-Page Annual Report with Precision Section Stitching',
    image: '/printone-assets/hero-annual-report-2024%20transperant.png',
    serviceId: 'annual-report-design',
  },
  {
    id: 'hero-slide-2',
    title: 'Design, Digital Printing & Corporate Gifting',
    category: 'Design & Gifting',
    spec: 'Wide-Format Production · Executive Diaries · Custom Drinkware & Bags',
    finish: 'Integrated Studio Design, Digital Press & Curated Brand Merchandise',
    image: '/printone-assets/hero-studio-branding-print.png',
    serviceId: 'gift-sets',
  },
  {
    id: 'hero-slide-3',
    title: 'Annual Report 2025–26 & Corporate Publications',
    category: 'Commercial Print',
    spec: 'Sleek Hardcover · Matte Black Contrast Cover · High-Density Color Printing',
    finish: 'Custom Corporate Governance & Financial Report with Gold Foil Accent',
    image: '/printone-assets/hero-annual-report-2025.png',
    serviceId: 'commercial-printing',
  },
];

// Full 3 story paragraphs combined into one continuous narrative
const FULL_STORY_PARAGRAPHS = [
  'PrintOne Graphics is a creative design and printing company based in Byculla East, Mumbai, delivering quality printing solutions to organisations across India.',
  'From concept development and creative design to premium printing, binding, and finishing, we combine creativity, precision, and attention to detail to bring every project to life. Our commitment to quality, timely delivery, and reliable service ensures that every project meets our clients’ expectations.',
  'At PrintOne Graphics, we believe every print tells a story. Whether it’s books, annual reports, brochures, corporate publications, or customised print materials, we turn ideas into impactful printed experiences.',
];

const COMBINED_STORY = FULL_STORY_PARAGRAPHS.join('\n\n');

export function HeroShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HeroSlide | null>(null);
  const { add } = useCart();

  // Looping typing animation: types text, pauses for 5 seconds, then restarts
  const [displayedStory, setDisplayedStory] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    let restartTimeout: ReturnType<typeof setTimeout> | null = null;
    let isCancelled = false;

    const startTyping = () => {
      charIndex = 0;
      setDisplayedStory('');
      setIsTypingDone(false);

      const speed = 12; // Snappy, comfortable typing speed
      timer = setInterval(() => {
        if (isCancelled) return;
        if (charIndex < COMBINED_STORY.length) {
          setDisplayedStory(COMBINED_STORY.slice(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTypingDone(true);
          if (timer) clearInterval(timer);

          // Pause for 5 seconds after completing, then restart the animation
          restartTimeout = setTimeout(() => {
            if (!isCancelled) {
              startTyping();
            }
          }, 5000);
        }
      }, speed);
    };

    startTyping();

    return () => {
      isCancelled = true;
      if (timer) clearInterval(timer);
      if (restartTimeout) clearTimeout(restartTimeout);
    };
  }, []);

  // Auto-advance slider every 4.5 seconds (pauses on mouse hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
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
      {/* Background Architectural Grid Pattern - matched with advisory section */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(#10383A 1px, transparent 1px), radial-gradient(#10383A 1px, #faf8f2 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
        aria-hidden="true"
      />

      {/* Unified Single Section Container (No vertical center dividing line) */}
      <div className="relative z-10 mx-auto max-w-[1536px] px-6 py-5 sm:px-10 sm:py-7 lg:px-12 xl:px-16 2xl:px-20 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10 xl:gap-12">
          {/* Left Column: Headline, Subtitle in Garamond Italic, 3 Paragraphs, Categories, CTA */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            <h1
              className="font-display text-[clamp(1.85rem,2.8vw,3.35rem)] font-extrabold italic leading-[1.06] tracking-[-.035em] text-[#10383A]"
              style={{ fontStyle: 'italic' }}
            >
              <span className="block sm:whitespace-nowrap">
                YOUR TRUSTED <span className="text-[#DAA112]">PRINT PARTNER.</span>
              </span>
              <span className="block sm:whitespace-nowrap">
                FROM CONCEPT TO FINISH.
              </span>
            </h1>

            {/* Subtitle in Garamond Italic (matching reference style) */}
            <p className="mt-2.5 font-garamond-italic text-[26px] sm:text-[28px] xl:text-[31px] font-normal tracking-wide text-[#10383A] leading-tight">
              Your Trusted Partner for Design, Digital Printing and Corporate Gifting
            </p>

            {/* Full 3 Paragraphs with Smooth Character-by-Character Typing Animation (Looping every 5s) */}
            <div className="mt-3 min-h-[135px] sm:min-h-[120px] lg:min-h-[110px] space-y-2 text-[12.5px] sm:text-[13.5px] leading-[1.6] text-[#55524c] max-w-xl">
              {displayedStory.split('\n\n').map((para, idx, arr) => {
                const isLast = idx === arr.length - 1;
                return (
                  <p key={idx}>
                    <span>{para}</span>
                    {isLast && (
                      <span
                        className={`inline-block w-[2px] h-[1.1em] ml-0.5 align-middle bg-[#10383A] transition-opacity duration-200 ${
                          isTypingDone ? 'animate-pulse opacity-40' : 'animate-ping opacity-90'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </p>
                );
              })}
            </div>

            {/* Quick Category Visual Links: 3 up and 2 down */}
            <div className="mt-3.5 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: 'Annual Reports', tag: 'Ideas to artwork' },
                  { label: 'Commercial & Digital Print', tag: 'Business essentials' },
                  { label: 'Books & Publications', tag: 'Books + learning' },
                ].map((cat) => (
                  <Link
                    key={cat.label}
                    href={`/products?tag=${encodeURIComponent(cat.tag)}`}
                    className="rounded border border-[#ded6c9] bg-white/80 px-3 py-1 text-[11px] font-bold text-[#45433d] transition-all hover:border-[#10383A] hover:bg-[#10383A] hover:text-white shadow-xs"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: 'Corporate Gifting', tag: 'Gifting + merchandise' },
                  { label: 'Packaging & Boxes', tag: 'Production' },
                ].map((cat) => (
                  <Link
                    key={cat.label}
                    href={`/products?tag=${encodeURIComponent(cat.tag)}`}
                    className="rounded border border-[#ded6c9] bg-white/80 px-3 py-1 text-[11px] font-bold text-[#45433d] transition-all hover:border-[#10383A] hover:bg-[#10383A] hover:text-white shadow-xs"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
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
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#e2dacf] pt-3 max-w-xl">
              <div>
                <span className="block font-display text-lg sm:text-xl font-black text-[#10383A]">2021</span>
                <span className="mt-0.5 block text-[9.5px] font-bold text-[#768886] uppercase tracking-wider">
                  Established Mumbai
                </span>
              </div>

              <div>
                <span className="block font-display text-lg sm:text-xl font-black text-[#10383A]">In-House</span>
                <span className="mt-0.5 block text-[9.5px] font-bold text-[#768886] uppercase tracking-wider">
                  Design &amp; Press Facility
                </span>
              </div>

              <div>
                <span className="block font-display text-lg sm:text-xl font-black text-[#10383A]">Pan-India</span>
                <span className="mt-0.5 block text-[9.5px] font-bold text-[#768886] uppercase tracking-wider">
                  Dependable Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 3D Showcase (Substantially Larger Width & Height) */}
          <div
            className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] xl:min-h-[620px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Slide Motion Wrapper */}
            <div className="relative w-full flex-1 flex items-center justify-center p-0">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeSlide.id}
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative w-full flex items-center justify-center py-0"
                >
                  {/* Centered Showcase Image on warm surface with realistic drop shadow */}
                  <div className="relative w-full flex items-center justify-center select-none px-1 sm:px-3">
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      className="w-full max-w-[820px] max-h-[460px] sm:max-h-[540px] md:max-h-[590px] lg:max-h-[640px] xl:max-h-[680px] 2xl:max-h-[720px] object-contain select-none drop-shadow-[0_22px_45px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicator Dots Centered Under the Image */}
            <div className="mt-2 flex items-center justify-center gap-2 z-20">
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
                      : 'w-2 bg-[#d8d0c2] hover:bg-[#b0a797]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
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
            className="relative w-full max-w-lg rounded-2xl border border-[#ded7cb] bg-[#faf8f2] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-[#ded7cb] bg-white text-[#52504b] hover:border-[#10383A] hover:text-[#10383A] transition-colors"
              aria-label="Close Preview"
            >
              <X size={16} />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white border border-[#ded7cb] flex items-center justify-center p-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="h-full w-auto object-contain drop-shadow-md"
              />
              <div className="absolute top-3 left-3 rounded-full bg-white/95 border border-[#ded7cc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#10383A] shadow-xs">
                {selectedItem.category}
              </div>
            </div>

            <div className="mt-5">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#666E51]">
                PrintOne Physical Specimen
              </span>
              <h3 className="mt-1 font-display text-2xl font-extrabold text-[#1d1f20]">
                {selectedItem.title}
              </h3>

              <div className="mt-4 rounded-xl border border-[#ded7cb] bg-[#f4efe6] p-3.5 text-xs space-y-1.5 text-gray-700">
                <div>
                  <span className="font-bold text-[#1f2122]">Material &amp; Weight: </span>
                  <span>{selectedItem.spec}</span>
                </div>
                <div>
                  <span className="font-bold text-[#1f2122]">Finish &amp; Structure: </span>
                  <span>{selectedItem.finish}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="btn-primary text-xs flex-1 rounded-lg"
                >
                  <Plus size={14} />
                  <span>Add to Enquiry List</span>
                </button>

                <a
                  href={createWhatsAppUrl(
                    `Hello PrintOne Graphics! I would like to enquire about ${selectedItem.title} (${selectedItem.spec}).`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#ded7cb] bg-white px-4 py-3 text-xs font-bold text-[#212324] hover:border-[#10383A] hover:text-[#10383A] transition-colors"
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
