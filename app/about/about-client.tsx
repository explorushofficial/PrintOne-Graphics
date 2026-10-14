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
import { SwatchEnquiryBanner } from '@/components/swatch-enquiry-banner';

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
    title: 'Creative Design Expertise',
    subtitle: 'Thoughtful Visual Concepts',
    icon: Palette,
    accent: '#e97819',
    copy: 'Thoughtfully designed layouts and visual concepts that communicate your brand message clearly and professionally.',
    spec: 'Brand Identity & Visual Hierarchy',
  },
  {
    number: '02',
    title: 'In-House Production Capabilities',
    subtitle: 'Integrated Studio & Press',
    icon: Printer,
    accent: '#2c9fc3',
    copy: 'Integrated design, digital printing, binding and finishing capabilities help us coordinate projects efficiently.',
    spec: 'End-to-End In-House Workflow',
  },
  {
    number: '03',
    title: 'Commitment to Timely Delivery',
    subtitle: 'Strict Production Schedules',
    icon: Timer,
    accent: '#cf2879',
    copy: 'We plan our production schedules carefully to meet project deadlines and business requirements.',
    spec: 'Punctual AGM & Semester Dispatch',
  },
  {
    number: '04',
    title: 'Competitive Pricing',
    subtitle: 'Cost-Conscious Excellence',
    icon: Sparkles,
    accent: '#e7c627',
    copy: 'Cost-conscious solutions designed to balance quality, production requirements and your budget.',
    spec: 'Tailored Budget Optimization',
  },
  {
    number: '05',
    title: 'Quality & Attention to Detail',
    subtitle: 'Flawless Colour & Finishing',
    icon: ShieldCheck,
    accent: '#27292a',
    copy: 'A focus on colour consistency, accurate layouts, finishing quality and careful coordination at every stage.',
    spec: 'Zero-Defect Quality Checks',
  },
  {
    number: '06',
    title: 'Long-Term Client Partnerships',
    subtitle: 'Relationships Built on Trust',
    icon: Handshake,
    accent: '#e97819',
    copy: 'We value transparent communication, dependable support and relationships built on trust.',
    spec: 'Continuous Dedicated Support',
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
      {/* 1. Atelier Hero Section */}
      <section className="relative overflow-hidden border-b border-[#e5ded4] bg-[#faf8f2]">
        {/* Background Architectural Dot Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(#202223 1px, transparent 1px), radial-gradient(#202223 1px, #faf8f2 1px)',
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0, 14px 14px',
          }}
          aria-hidden="true"
        />

        <div className="page-wrap relative z-10 py-14 sm:py-18 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Left Column: Refined Editorial Headline & Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ded7cc] bg-[#f2ede4] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#6b6760]">
                <Sparkles size={12} className="text-[#e97819]" />
                <span>Byculla East, Mumbai · Established 2021</span>
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.3rem)] font-extrabold leading-[0.96] tracking-[-.055em] text-[#1c1d1f]">
                Your Trusted Partner for Design,<br />
                <span className="text-[#e97819]">Digital Printing &amp; Corporate Gifting.</span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] sm:text-[16px] leading-[1.7] text-[#55524c]">
                At PrintOne Graphics, we transform ideas into impactful print solutions through creative design, advanced digital printing, quality production and dependable service. Established in 2021, we have grown rapidly by focusing on quality, competitive pricing, timely delivery and long-term client relationships.
              </p>

              <p className="mt-3 max-w-xl text-xs sm:text-sm leading-[1.65] text-[#66635c]">
                Based in Byculla East, Mumbai, we provide comprehensive printing and corporate communication solutions to businesses, listed companies, educational institutions, publishers and organisations across India. Our goal is simple: to deliver printing solutions that communicate your brand&apos;s identity, strengthen your corporate image and create a lasting impression.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/products" className="btn-primary group" data-testid="link-about-hero-products">
                  <span>Explore all what we do</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline group"
                  data-testid="link-about-hero-contact"
                >
                  <span>Get in touch with us</span>
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Atelier Credentials Pill Tags */}
              <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-[#e5dfd4] text-[11px] font-bold uppercase tracking-wider text-[#636058]">
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Creative Design</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">Digital &amp; Commercial Printing</span>
                <span className="rounded border border-[#ded7cd] bg-white px-3 py-1">In-House Production</span>
              </div>
            </motion.div>

            {/* Right Column: Workshop Floor & Production Composite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#dcd4c7] bg-white p-3 shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#242628]">
                  <img
                    src="/production/digital-press.jpg"
                    alt="PrintOne Graphics Pressroom in Byculla East, Mumbai"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded bg-black/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#e97819] animate-pulse" />
                    <span>Live Presswork · Byculla East</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e97819]">
                      Two Worlds · One Roof
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold leading-tight">
                      Boardroom Typography & Precision Offset Physics
                    </h3>
                  </div>
                </div>

                {/* Sub-card specs bar */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="rounded-lg border border-[#ede7dd] bg-[#faf8f2] p-2.5">
                    <span className="block font-display text-lg font-extrabold text-[#1f2122]">48 Hours</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c7972]">Wet Proofing Turnaround</span>
                  </div>
                  <div className="rounded-lg border border-[#ede7dd] bg-[#faf8f2] p-2.5">
                    <span className="block font-display text-lg font-extrabold text-[#e97819]">Pan-India</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c7972]">Despatch & Logistics</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Real-Time Animated Metrics Ticker */}
      <section className="bg-[#faf8f2] py-14">
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

      {/* 2b. Our Story, Vision & Mission */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#ede7dc]">
        <div className="page-wrap">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1f2122]">
                A Reliable, Professional &amp; Competitive Print Partner.
              </h2>
              <div className="mt-4 space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#5e5b54]">
                <p>
                  PrintOne Graphics was established with a vision to provide businesses with a reliable, professional and competitive partner for their printing and design requirements.
                </p>
                <p>
                  Since our inception, we have continuously expanded our capabilities to serve a wide range of industries and clients. By combining creative expertise, modern printing technology and practical production experience, we manage projects from initial design and content preparation to printing, finishing and final delivery.
                </p>
                <p>
                  Our growing portfolio includes annual reports, corporate publications, educational books, commercial printing, calendars, diaries and customised corporate gifts.
                </p>
                <p className="font-semibold text-[#1f2122]">
                  We believe every project deserves attention to detail, consistent quality and a commitment to delivering the best possible results.
                </p>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-[#ded5c7] bg-white p-6 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e97819]">
                  01 / Our Vision
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#1f2122]">
                  The Preferred Partner
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#68645d]">
                  To become a trusted and preferred partner for printing, publishing, corporate communications and gifting solutions by consistently delivering value, innovation and quality.
                </p>
              </div>

              <div className="rounded-xl border border-[#ded5c7] bg-white p-6 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2c9fc3]">
                  02 / Our Mission
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#1f2122]">
                  End-to-End Solutions
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#68645d]">
                  To provide end-to-end print solutions that combine creative design, modern technology, competitive pricing and dependable delivery, helping our clients communicate more effectively.
                </p>
              </div>
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

      {/* 5. Why Choose PrintOne Graphics? (Client brief) */}
      <section className="section-space border-b border-[#e2d9cd] bg-[#f5f1e8]">
        <div className="page-wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Client Advantages</p>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
                Why Choose PrintOne Graphics?
              </h2>
            </div>
            <p className="max-w-sm text-xs sm:text-sm text-[#66635c] leading-relaxed">
              Thoughtfully designed layouts, in-house production, competitive pricing, and dependable delivery across India.
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
                  data-testid={`why-choose-card-${val.number}`}
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

      {/* 5b. Our Commitment to Every Client (Client brief) */}
      <section className="border-b border-[#e2d9cd] bg-[#222425] text-white py-14 sm:py-16">
        <div className="page-wrap">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#e8e4dc]">
              <Sparkles size={12} className="text-[#e97819]" />
              <span>Dedicated Value</span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
              Our Commitment to Every Client
            </h2>
            <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed text-[#dcd7cb]">
              <p>
                At PrintOne Graphics, we understand that printed materials represent more than paper and ink. They represent your organisation&apos;s identity, credibility and values.
              </p>
              <p>
                Whether it is a detailed annual report, a publication, an educational book or a customised corporate gift, we approach every assignment with dedication and a focus on delivering value.
              </p>
              <p className="font-display text-base sm:text-lg font-bold text-[#e97819]">
                From concept to creation, we bring your ideas to print.
              </p>
            </div>
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

      {/* 7. Physical Production Consultation & Swatch Desk */}
      <SwatchEnquiryBanner />
    </div>
  );
}
