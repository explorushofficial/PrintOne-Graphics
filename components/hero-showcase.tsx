'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react';

export interface HeroSlideItem {
  id?: string;
  src: string;
  focus?: string;
  title?: string;
}

// Background photos (Pexels, free for commercial use) that slide automatically.
// For production, download them into /public and use local paths instead.
const pexels = (path: string) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=1920`;

const HERO_IMAGES: HeroSlideItem[] = [
  {
    src: pexels('20042067/pexels-photo-20042067/free-photo-of-professional-printer-in-print-studio.jpeg'),
    focus: '85% center',
    title: 'Professional Printer in Print Studio',
  },
  {
    src: pexels('17536002/pexels-photo-17536002/free-photo-of-photo-printer.jpeg'),
    focus: '85% center',
    title: 'Precision Photo Printer',
  },
  {
    src: pexels('19316522/pexels-photo-19316522/free-photo-of-printing-machine-in-workshop.png'),
    focus: '85% center',
    title: 'Printing Machine in Workshop',
  },
];

/** How long each photo stays before sliding to the next */
const SLIDE_INTERVAL_MS = 5000;

const FULL_STORY_PARAGRAPHS = [
  'PrintOne Graphics is a creative design and printing company based in Byculla East, Mumbai, delivering quality printing solutions to organisations across India.',
  'From concept development and creative design to premium printing, binding, and finishing, we combine creativity, precision, and attention to detail to bring every project to life. Our commitment to quality, timely delivery, and reliable service ensures that every project meets our clients’ expectations.',
  'At PrintOne Graphics, we believe every print tells a story. Whether it’s books, annual reports, brochures, corporate publications, or customised print materials, we turn ideas into impactful printed experiences.',
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const WIPE_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** Photo reveal: a clip-path wipe, like a press roller laying down ink */
const wipeVariants: Variants = {
  enter: { clipPath: 'inset(0 0 0 100%)' },
  center: {
    clipPath: 'inset(0 0 0 0%)',
    transition: { duration: 1, ease: WIPE_EASE },
  },
  exit: { opacity: 0.99, transition: { duration: 1 } },
};

/** Staggered load-in used for the one orchestrated page-load sequence */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

/** Masked line reveal for the headline */
function HeadlineLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em] sm:whitespace-nowrap">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Print crop mark that draws itself in */
function CropMark({ className }: { className: string }) {
  return (
    <svg
      className={`pointer-events-none absolute hidden h-8 w-8 text-[#10383A]/45 lg:block ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0 24 H12 M8 32 V20"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
      />
    </svg>
  );
}

interface HeroShowcaseProps {
  initialImages?: HeroSlideItem[];
}

export function HeroShowcase({ initialImages }: HeroShowcaseProps = {}) {
  const images = initialImages && initialImages.length > 0 ? initialImages : HERO_IMAGES;

  const [current, setCurrent] = useState(0);
  const [sweepKey, setSweepKey] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  // Ensure current is within bounds if images change
  useEffect(() => {
    if (current >= images.length) {
      setCurrent(0);
    }
  }, [images.length, current]);

  // Preload the photos so slides never pop in late
  useEffect(() => {
    images.forEach((img) => {
      if (img?.src) {
        const i = new Image();
        i.src = img.src;
      }
    });
  }, [images]);

  // Auto-advance the background slideshow
  useEffect(() => {
    if (images.length <= 1) return;

    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
      setSweepKey((k) => k + 1);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  // ---- Mouse parallax for the background layer ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });
  const bgX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const bgY = useTransform(sy, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative isolate flex min-h-[680px] overflow-hidden border-b border-[#e5ded4] bg-[#faf8f2] lg:min-h-[calc(100svh-96px)]"
        onMouseMove={handleMouseMove}
      >
        <style>{`
          @keyframes heroDrift { 0% { background-position: 0 0, 12px 12px; } 100% { background-position: 24px 24px, 36px 36px; } }
          @media (prefers-reduced-motion: reduce) {
            .hero-grid { animation: none !important; }
          }
        `}</style>

        {/* ============ LAYER 0: Drifting dot grid ============ */}
        <div
          className="hero-grid pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(#10383A 1px, transparent 1px), radial-gradient(#10383A 1px, #faf8f2 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
            animation: 'heroDrift 14s linear infinite',
          }}
          aria-hidden="true"
        />

        {/* ============ LAYER 1: Auto-changing full-bleed photos ============ */}
        <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              variants={wipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {/* Parallax wrapper (follows the cursor) */}
              <motion.div
                className="absolute inset-0"
                style={{ x: bgX, y: bgY, scale: 1.06 }}
              >
                {!failed[current] && (
                  <motion.img
                    src={(images[current] || images[0]).src}
                    alt={(images[current] || images[0]).title || ''}
                    draggable={false}
                    referrerPolicy="no-referrer"
                    onError={() => setFailed((f) => ({ ...f, [current]: true }))}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                    style={{ objectPosition: (images[current] || images[0]).focus || '85% center' }}
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{
                      duration: 8,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                )}
                {/* Brand tint so the photos sit with the green/gold palette */}
                <div className="absolute inset-0 bg-[#10383A]/15 mix-blend-multiply" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Gold leading edge that rides the wipe on every change */}
          {sweepKey > 0 && (
            <motion.div
              key={`sweep-${sweepKey}`}
              className="pointer-events-none absolute inset-y-0 z-10 w-[6px] bg-[#DAA112] shadow-[0_0_40px_14px_rgba(218,161,18,0.45)]"
              initial={{ left: '100%', opacity: 1 }}
              animate={{ left: '0%', opacity: [1, 1, 0] }}
              transition={{ duration: 1, ease: WIPE_EASE }}
            />
          )}
        </div>

        {/* ============ LAYER 2: Readability scrims ============ */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
          style={{
            background:
              'linear-gradient(90deg, #faf8f2 0%, rgba(250,248,242,0.92) 30%, rgba(250,248,242,0.55) 48%, rgba(250,248,242,0) 68%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] lg:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(250,248,242,0.95) 0%, rgba(250,248,242,0.88) 55%, rgba(250,248,242,0.72) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-[#faf8f2]/90 to-transparent"
          aria-hidden="true"
        />

        {/* ============ Print-shop details ============ */}
        <CropMark className="left-4 top-4 rotate-0" />
        <CropMark className="right-4 top-4 rotate-90" />
        <CropMark className="bottom-4 left-4 -rotate-90" />
        <CropMark className="bottom-4 right-4 rotate-180" />

        {/* CMYK colour bar that rolls in */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] flex h-[5px]" aria-hidden="true">
          {['#00A3E0', '#E6007E', '#FFD500', '#10383A'].map((c, i) => (
            <motion.span
              key={c}
              className="h-full flex-1 origin-left"
              style={{ backgroundColor: c }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.12, ease: EASE }}
            />
          ))}
        </div>

        {/* ============ LAYER 3: Content on top ============ */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1536px] items-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex w-full max-w-[700px] flex-col justify-center">
            <h1 className="font-display text-[clamp(2rem,3.3vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-.035em] text-[#10383A]">
              <HeadlineLine delay={0.15}>
                YOUR TRUSTED{' '}
                <span className="relative inline-block text-[#DAA112]">
                  PRINT PARTNER.
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-[3px] w-full origin-left bg-[#DAA112]/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
                    aria-hidden="true"
                  />
                </span>
              </HeadlineLine>
              <HeadlineLine delay={0.3}>FROM CONCEPT TO FINISH.</HeadlineLine>
            </h1>

            <motion.p
              {...rise(0.6)}
              className="mt-3 font-garamond-italic text-[26px] font-normal leading-tight tracking-wide text-[#10383A] sm:text-[30px] xl:text-[34px]"
            >
              Your Trusted Partner for Design, Digital Printing and Corporate Gifting
            </motion.p>

            {/* Story paragraphs: one green card, appears as a single block */}
            <motion.div
              {...rise(0.8)}
              className="relative mt-4 max-w-xl overflow-hidden rounded-xl border border-[#1d5154]  bg-[#10383A] p-5 shadow-[0_24px_50px_-24px_rgba(16,56,58,0.8)] sm:p-6"
            >
              {/* Gold accent edge */}
              <span className="absolute inset-y-0 left-0 w-1 bg-[#DAA112]" aria-hidden="true" />

              {/* Slow looping light sheen */}
              <motion.span
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '0%' }}
                animate={{ x: '450%' }}
                transition={{
                  duration: 2.6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                aria-hidden="true"
              />

              <div className="relative space-y-3 pl-2 text-[13.5px] leading-[1.7] text-[#e6eee9] sm:text-[14.5px]">
                {FULL_STORY_PARAGRAPHS.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Category chips: 3 up, 2 down */}
            <div className="mt-4 space-y-2">
              {[
                [
                  { label: 'Annual Reports', tag: 'Ideas to artwork' },
                  { label: 'Commercial & Digital Print', tag: 'Business essentials' },
                  { label: 'Books & Publications', tag: 'Books + learning' },
                ],
                [
                  { label: 'Corporate Gifting', tag: 'Gifting + merchandise' },
                  { label: 'Packaging & Boxes', tag: 'Production' },
                ],
              ].map((row, rowIdx) => (
                <div key={rowIdx} className="flex flex-wrap items-center gap-2">
                  {row.map((cat, i) => (
                    <motion.div key={cat.label} {...rise(1.0 + (rowIdx * 3 + i) * 0.07)}>
                      <Link
                        href={`/products?tag=${encodeURIComponent(cat.tag)}`}
                        className="block rounded border border-[#ded6c9] bg-white/85 px-3.5 py-1.5 text-[11.5px] font-bold text-[#45433d] shadow-xs backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#10383A] hover:bg-[#10383A] hover:text-white"
                      >
                        {cat.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div {...rise(1.3)} className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/services" className="btn-primary group" data-testid="link-hero-services">
                <span>Explore our services</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link href="/products" className="btn-outline group bg-white/60 backdrop-blur-sm" data-testid="link-hero-products">
                <span>Browse products</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>

            {/* Proof metrics */}
            <motion.div
              {...rise(1.45)}
              className="mt-5 grid max-w-xl grid-cols-3 gap-3 border-t border-[#e2dacf] pt-3.5"
            >
              {[
                { big: '2021', small: 'Established Mumbai' },
                { big: 'In-House', small: 'Design & Press Facility' },
                { big: 'Pan-India', small: 'Dependable Delivery' },
              ].map((m) => (
                <div key={m.big}>
                  <span className="block font-display text-lg font-black text-[#10383A] sm:text-xl">
                    {m.big}
                  </span>
                  <span className="mt-0.5 block text-[9.5px] font-bold uppercase tracking-wider text-[#657876]">
                    {m.small}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ============ Slide navigation indicators ============ */}
        {images.length > 1 && (
          <div className="absolute right-6 bottom-6 z-20 hidden items-center gap-1.5 rounded-full bg-[#10383A]/60 px-3 py-1.5 backdrop-blur-md border border-white/20 sm:flex">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrent(idx);
                  setSweepKey((k) => k + 1);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  current === idx ? 'w-6 bg-[#DAA112]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </MotionConfig>
  );
}