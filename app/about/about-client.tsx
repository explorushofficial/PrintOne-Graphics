'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Handshake,
  Layers,
  Lightbulb,
  MapPin,
  MoveRight,
  Palette,
  Printer,
  ShieldCheck,
  Sparkles,
  Timer,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ValueItem {
  number: string;
  title: string;
  subtitle: string;
  icon: any;
  accent: string;
  copy: string;
  spec: string;
}

const VALUES: ValueItem[] = [
  {
    number: '01',
    title: 'Zero-Tolerance Press Calibration',
    subtitle: 'Spectral Density & Dot-Gain Control',
    icon: ShieldCheck,
    accent: '#e97819',
    copy: 'Every sheet is inspected with in-line densitometry. We adhere to ISO 12647-2 standards ensuring Delta-E < 1.5 across long runs.',
    spec: 'Sub-1.5 Delta-E Color Accuracy',
  },
  {
    number: '02',
    title: 'The Single-Table Philosophy',
    subtitle: 'Designers & Pressmen Together',
    icon: Handshake,
    accent: '#2c9fc3',
    copy: 'Direct access to typographers and pressmasters under one roof. No disconnected account managers or agency-to-vendor blame games.',
    spec: 'Direct Pre-Press Collaboration',
  },
  {
    number: '03',
    title: 'Tactile Material Integrity',
    subtitle: 'Certified Fine & Archival Papers',
    icon: Compass,
    accent: '#cf2879',
    copy: 'We specify genuine FSC-certified papers, non-warping Kappa binder boards, and imported hot-stamping foils that do not flake or fade.',
    spec: '30+ Curated Global Paper Mills',
  },
  {
    number: '04',
    title: 'Structural Innovation & Dielines',
    subtitle: 'From Flat Sheet to 3D Form',
    icon: Lightbulb,
    accent: '#e7c627',
    copy: 'Custom dielines, magnetic flap closures, hidden ribbon pulls, and multi-level blind debossing engineered for sensory unboxing drama.',
    spec: 'Bespoke Dieline Prototyping',
  },
  {
    number: '05',
    title: 'Punctual Pan-India Logistics',
    subtitle: 'Boardroom-Ready Deliveries',
    icon: Timer,
    accent: '#27292a',
    copy: 'Guaranteed delivery dates for corporate AGMs, product launches, and academic semesters with moisture-shielded shrink packing.',
    spec: '48h Wet Proofing Turnaround',
  },
  {
    number: '06',
    title: 'Enduring Partnerships',
    subtitle: '80%+ Returning Corporate Roster',
    icon: Sparkles,
    accent: '#e97819',
    copy: 'Trusted year after year by listed enterprises, publishing houses, and design studios across Mumbai, Delhi, Bengaluru, and Pune.',
    spec: 'Long-Term Corporate Retainers',
  },
];

const HORIZONTAL_SHOWCASE = [
  {
    id: 'showcase-1',
    title: 'Boardroom Integrated Annual Report',
    category: 'Corporate Stakeholder Reporting',
    specs: '320 GSM Colorplan · Hot Copper Foil · Singer Sewn',
    image: '/annual-report.jpg',
    accent: '#e97819',
  },
  {
    id: 'showcase-2',
    title: 'Luxury Structural Kappa Rigid Box',
    category: 'Bespoke Packaging Architecture',
    specs: '1200 GSM Kappa Board · Magnetic Closure · Scodix 3D',
    image: '/catalog/packaging-boxes.jpg',
    accent: '#cf2879',
  },
  {
    id: 'showcase-3',
    title: 'Academic & Institutional Monograph',
    category: 'Archival Book Publishing',
    specs: '120 GSM Munken Pure · Smyth Sewn · Cloth Spine',
    image: '/education-publications.jpg',
    accent: '#2c9fc3',
  },
  {
    id: 'showcase-4',
    title: 'Executive Letterpress Stationery Suite',
    category: 'Brand Collateral',
    specs: '350 GSM Cotton Wove · Blind Deboss · Gilt Edges',
    image: '/catalog/corporate-stationery.jpg',
    accent: '#e7c627',
  },
  {
    id: 'showcase-5',
    title: 'High-Speed Digital & Offset Pressroom',
    category: 'In-House Manufacturing',
    specs: 'Multi-Color In-Line Densitometry · 500K+ Monthly',
    image: '/production/digital-press.jpg',
    accent: '#27292a',
  },
];

const ANATOMY_LAYERS = [
  {
    id: 'layer-cover',
    title: '01 / The Hardcover & Outer Board',
    spec: '1200 GSM Kappa core wrapped in 140 GSM Colorplan Linen',
    details: 'Engineered with calibrated mitred corners to prevent paper bubbling or edge peeling under high humidity.',
    accent: '#e97819',
  },
  {
    id: 'layer-foil',
    title: '02 / Precision Hot Foil & Micro-Deboss',
    spec: 'Deep magnesium die heated to 135°C with micro-embossed grain',
    details: 'Delivers reflective metallic warmth that captures ambient light without cracking along the book hinge.',
    accent: '#cf2879',
  },
  {
    id: 'layer-binding',
    title: '03 / Smyth Sewn Section Binding',
    spec: '16-page signatures hand-gathered and thread-stitched with reinforced gauze',
    details: 'Allows the publication to open 180° completely flat on executive boardroom tables without spine cracking.',
    accent: '#2c9fc3',
  },
  {
    id: 'layer-text',
    title: '04 / The Interior Text Block',
    spec: '120 GSM Munken Pure Natural White (FSC Certified)',
    details: 'Calibrated opacity eliminates ink show-through on dense financial charts and full-bleed photography spreads.',
    accent: '#e7c627',
  },
  {
    id: 'layer-slipcase',
    title: '05 / Structural Slipcase & Keepsake Box',
    spec: 'Precision laser die-cut with velvet ribbon thumb-notch',
    details: 'Moisture-shielded presentation enclosure designed to preserve archival editions for decades.',
    accent: '#27292a',
  },
];

export function AboutClient() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Animated live numbers on mount
  const [impressions, setImpressions] = useState(0);
  const [papers, setPapers] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 20;
      if (start <= 500) setImpressions(start);
      if (start <= 30) setPapers(Math.min(30, Math.floor(start)));
      if (start <= 48) setHours(Math.min(48, Math.floor(start)));
      if (start >= 500) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setGalleryIndex((prev) => (prev + 1) % HORIZONTAL_SHOWCASE.length);
  };

  const prevSlide = () => {
    setGalleryIndex((prev) => (prev - 1 + HORIZONTAL_SHOWCASE.length) % HORIZONTAL_SHOWCASE.length);
  };

  return (
    <div className="overflow-x-hidden">
      {/* 1. Grand Kinetic Hero Section with Motion */}
      <section className="relative overflow-hidden bg-[#1c1e1f] py-20 text-[#faf8f2] sm:py-28 border-b border-[#313335]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #1c1e1f 1px)',
            backgroundSize: '36px 36px',
          }}
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.2em] text-[#e8e4dc]">
              <Sparkles size={13} className="text-[#e97819]" />
              <span>Byculla East · Mumbai Atelier · Est. 2021</span>
            </div>

            <div className="mt-6">
              <h1 className="font-display text-[clamp(2.9rem,6.8vw,6.4rem)] font-extrabold leading-[0.91] tracking-[-.065em]">
                <span className="block">We don’t just print.</span>
                <span className="block text-[#e97819]">We engineer physical</span>
                <span className="block">presence.</span>
              </h1>
            </div>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#c7c2b6]">
              PrintOne Graphics unites boardroom design strategy with industrial pressroom physics. From our home in Byculla East, Mumbai, we craft annual reports, archival publications, and bespoke packaging for institutions across India.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/products" className="btn-primary group" data-testid="link-about-hero-products">
                <span>Inspect all what we make</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline border-white/35 text-white hover:border-[#e97819] hover:bg-[#e97819] transition-all"
                data-testid="link-about-hero-contact"
              >
                <span>Consult with our master printers</span>
              </Link>
            </div>
          </motion.div>

          {/* Concentric Compass Graphic with Continuous Smooth CSS Rotation */}
          <div className="relative flex min-h-[340px] items-center justify-center sm:min-h-[420px]">
            {/* Outer Continuous Compass Ring */}
            <div className="absolute h-[300px] w-[300px] rounded-full border border-[#444648] sm:h-[390px] sm:w-[390px] animate-[spin_50s_linear_infinite]">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#e97819] shadow-lg shadow-[#e97819]/50" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#2c9fc3] shadow-lg shadow-[#2c9fc3]/50" />
            </div>

            {/* Middle Dashed Ring */}
            <div className="absolute h-[220px] w-[220px] rounded-full border border-dashed border-[#57595c] sm:h-[280px] sm:w-[280px] animate-[spin_35s_linear_infinite_reverse]">
              <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#cf2879] shadow-lg shadow-[#cf2879]/50" />
              <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#e7c627] shadow-lg shadow-[#e7c627]/50" />
            </div>

            {/* Inner Core Dial */}
            <div className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-[#525557] bg-[#141516] shadow-2xl text-center">
              <span className="font-display text-5xl font-black text-[#e97819] tracking-tight">
                01
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#aaa69d]">
                Mumbai
              </span>
              <div className="cmyk-strip mt-2">
                <span className="bg-[#2c9fc3]"></span>
                <span className="bg-[#cf2879]"></span>
                <span className="bg-[#e7c627]"></span>
                <span className="bg-[#27292a]"></span>
              </div>
            </div>

            {/* Floating CMYK Registration Orbs */}
            <span className="animate-float absolute left-[12%] top-[16%] h-4 w-4 rounded-full bg-[#e97819] shadow-xl shadow-[#e97819]/60" />
            <span className="animate-float absolute right-[10%] top-[26%] h-3.5 w-3.5 rounded-full bg-[#2c9fc3] shadow-xl shadow-[#2c9fc3]/60" />
            <span className="animate-float absolute bottom-[16%] left-[20%] h-4 w-4 rounded-full bg-[#cf2879] shadow-xl shadow-[#cf2879]/60" />
            <span className="animate-float absolute bottom-[20%] right-[16%] h-3.5 w-3.5 rounded-full bg-[#e7c627] shadow-xl shadow-[#e7c627]/60" />
          </div>
        </div>
      </section>

      {/* 2. Real-Time Animated Metrics Ticker */}
      <section className="border-b border-[#e5ded4] bg-[#faf8f2] py-14">
        <div className="page-wrap">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="border-l-2 border-[#e97819] pl-4">
              <span className="block font-display text-4xl sm:text-5xl font-extrabold text-[#1d1f20]">
                2021
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#77746d]">
                Founded in Mumbai
              </span>
              <p className="mt-1 text-[11px] text-[#8e8a81]">Byculla East Atelier & Press</p>
            </div>

            <div className="border-l-2 border-[#2c9fc3] pl-4">
              <span className="block font-display text-4xl sm:text-5xl font-extrabold text-[#1d1f20]">
                {impressions || 500}K+
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#77746d]">
                Impressions Mastered
              </span>
              <p className="mt-1 text-[11px] text-[#8e8a81]">High-Volume & Short Runs</p>
            </div>

            <div className="border-l-2 border-[#cf2879] pl-4">
              <span className="block font-display text-4xl sm:text-5xl font-extrabold text-[#1d1f20]">
                {papers || 30}+
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#77746d]">
                Curated FSC Stocks
              </span>
              <p className="mt-1 text-[11px] text-[#8e8a81]">Munken, Colorplan, Cotton Wove</p>
            </div>

            <div className="border-l-2 border-[#e7c627] pl-4">
              <span className="block font-display text-4xl sm:text-5xl font-extrabold text-[#1d1f20]">
                {hours || 48}h
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#77746d]">
                Rapid Physical Proofing
              </span>
              <p className="mt-1 text-[11px] text-[#8e8a81]">Delivered Before Long Runs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Gallery Showcase Carousel with Smooth Transitions */}
      <section className="relative overflow-hidden bg-[#202223] py-20 text-[#faf8f2]">
        <div className="page-wrap mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#e97819]">
                <Layers size={14} />
                <span>The Production Showcase</span>
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
                Our Signature Craft in Focus.
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 hover:bg-[#e97819] hover:border-[#e97819] transition-all"
                aria-label="Previous showcase piece"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 hover:bg-[#e97819] hover:border-[#e97819] transition-all"
                aria-label="Next showcase piece"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slide Stage */}
        <div className="page-wrap">
          <div className="grid gap-8 lg:grid-cols-2 items-center rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-10 backdrop-blur-md">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={HORIZONTAL_SHOWCASE[galleryIndex].id}
                  src={HORIZONTAL_SHOWCASE[galleryIndex].image}
                  alt={HORIZONTAL_SHOWCASE[galleryIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {HORIZONTAL_SHOWCASE[galleryIndex].category}
              </div>
            </div>

            <div className="text-white">
              <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#e97819]">
                Piece 0{galleryIndex + 1} of 0{HORIZONTAL_SHOWCASE.length}
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-4xl font-extrabold leading-snug">
                {HORIZONTAL_SHOWCASE[galleryIndex].title}
              </h3>

              <div className="mt-6 rounded-xl border border-white/15 bg-black/30 p-4 text-xs text-[#dcd7cd]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#e97819]">
                  Tactile Formula & Technical Specification
                </span>
                <span className="mt-1 block font-medium text-sm text-white">
                  {HORIZONTAL_SHOWCASE[galleryIndex].specs}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="btn-primary text-xs"
                >
                  <span>Explore this format</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="flex gap-2">
                  {HORIZONTAL_SHOWCASE.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setGalleryIndex(dotIdx)}
                      className={`h-2 rounded-full transition-all ${
                        dotIdx === galleryIndex ? 'w-8 bg-[#e97819]' : 'w-2 bg-white/30'
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive "Anatomy of an Editorial Piece" (Layer Peeler) */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#faf8f2]">
        <div className="page-wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Tactile Dissection</p>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
                Anatomy of a PrintOne Masterpiece.
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#615e58] leading-relaxed">
              Every publication we make is an interlocking sandwich of physical materials. Click each layer to inspect its tactile engineering.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Interactive Layer Selector Buttons */}
            <div className="space-y-3">
              {ANATOMY_LAYERS.map((layer, index) => {
                const isSelected = activeLayer === index;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(index)}
                    className={`w-full text-left rounded-xl border p-5 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#222425] bg-white shadow-md ring-1 ring-[#e97819]'
                        : 'border-[#ded7cb] bg-[#fbf9f4] hover:border-[#b8b0a1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4
                        className="font-display text-base font-bold transition-colors"
                        style={{ color: isSelected ? layer.accent : '#202223' }}
                      >
                        {layer.title}
                      </h4>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: layer.accent }}
                      >
                        Layer 0{index + 1}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#736f67] font-medium">{layer.spec}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Layer Tactile Spec Sheet Display */}
            <div className="rounded-2xl border border-[#ded5c7] bg-[#fbf9f4] p-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#7d7971]">
                <Zap size={14} style={{ color: ANATOMY_LAYERS[activeLayer].accent }} />
                <span>Physical Construction Blueprint</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-extrabold text-[#1d1f20]">
                {ANATOMY_LAYERS[activeLayer].title}
              </h3>

              <div className="mt-4 rounded-xl border border-[#e5dfd4] bg-white p-4">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8e8a82]">
                  Exact Material Specification
                </span>
                <span className="mt-1 block font-display text-sm font-bold text-[#202223]">
                  {ANATOMY_LAYERS[activeLayer].spec}
                </span>
              </div>

              <div className="mt-4 text-xs sm:text-sm text-[#4e4b45] leading-relaxed">
                <span className="font-bold text-[#1f2122]">Why This Matters: </span>
                {ANATOMY_LAYERS[activeLayer].details}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#e5dfd4] pt-4 text-xs">
                <span className="font-bold text-[#e97819]">100% In-House Prototyped</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-bold text-[#202223] hover:text-[#e97819] transition-colors"
                >
                  <span>Request physical swatchkit</span>
                  <MoveRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Principles (Guaranteed Non-Blank, Beautifully Animated with motion.div) */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#f5f1e8]">
        <div className="page-wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Our Principles</p>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
                The way we do the work.
              </h2>
            </div>
            <p className="max-w-sm text-xs sm:text-sm text-[#66635c] leading-relaxed">
              Built on enduring principles that keep enterprises returning cycle after cycle.
            </p>
          </div>

          {/* Cards Grid: Rendered 100% visible with motion hover lift */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="relative flex flex-col justify-between rounded-xl border border-[#ded7cc] bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-[#e97819] hover:shadow-xl"
                  data-testid={`value-card-${val.number}`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#ece6dd] pb-4">
                      <span
                        className="font-display text-2xl font-black"
                        style={{ color: val.accent }}
                      >
                        {val.number}
                      </span>
                      <Icon size={20} style={{ color: val.accent }} />
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold text-[#202223]">
                      {val.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#8e8a82]">
                      {val.subtitle}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#5e5b55]">
                      {val.copy}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 border-t border-[#ece6dd] pt-3 text-[10px] font-bold uppercase tracking-wider text-[#e97819]">
                    <CheckCircle2 size={12} />
                    <span>{val.spec}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Production Workshop & Pressroom Facilities Gallery */}
      <section className="border-t border-[#e2d9cd] bg-[#ede7dc] py-16">
        <div className="page-wrap">
          <div className="max-w-md">
            <p className="eyebrow">The Workshop Floor</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1f2122]">
              In-House Mechanical Muscle.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6b6760]">
              Take a look inside the machines and bindery setups that bring our work to life in Byculla East, Mumbai.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#202223] shadow-md"
            >
              <img
                src="/production/digital-press.jpg"
                alt="High Definition Digital & Offset Press"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase text-[#e97819]">01 Pressroom</span>
                <h4 className="font-display text-base font-bold">High-Speed Digital & Offset</h4>
                <p className="text-[10px] text-white/80 mt-0.5">Pantone Spot Calibration & Fogra Proofing</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#202223] shadow-md"
            >
              <img
                src="/production/finishing-bindery.jpg"
                alt="Finishing and Bindery Equipment"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase text-[#2c9fc3]">02 Bindery</span>
                <h4 className="font-display text-base font-bold">Smyth Sewing & PUR Bindery</h4>
                <p className="text-[10px] text-white/80 mt-0.5">Hand-Gathered Thread Stitched Hardcovers</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#202223] shadow-md"
            >
              <img
                src="/production/wide-format-printer.jpg"
                alt="Wide Format Printer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase text-[#cf2879]">03 Structural</span>
                <h4 className="font-display text-base font-bold">Wide Format & Exhibition Units</h4>
                <p className="text-[10px] text-white/80 mt-0.5">Heavy-Duty Roll-Up & Architectural Flex</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Closing High-Value CTA */}
      <section className="bg-[#1c1e1f] py-16 text-white border-t border-[#313335]">
        <div className="page-wrap flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#e97819]">
              <Sparkles size={12} />
              <span>Let’s Build Something Enduring</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to meet our Mumbai print masters?
            </h2>
            <p className="mt-1 text-xs text-[#a9a59c]">
              We courier physical sample swatches to corporate design teams across India.
            </p>
          </div>
          <Link href="/contact" className="btn-primary" data-testid="link-about-cta">
            <span>Start a conversation</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
