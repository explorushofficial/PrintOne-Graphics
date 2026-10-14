'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronRight, FileText, Layers, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Consult & Paper Specification',
    subtitle: 'Matching Purpose with Material Physics',
    icon: FileText,
    accent: '#e97819',
    details:
      'We examine your brief through both a design and printmaking lens. We guide paper caliper, grain direction, opacity, and tactile finishes so your piece feels intentional.',
    deliverable: 'Custom specification sheet & paper swatch recommendations',
  },
  {
    step: '02',
    title: 'Design, Typesetting & Pre-Press',
    subtitle: 'Zero-Tolerance Digital Preparation',
    icon: Layers,
    accent: '#2c9fc3',
    details:
      'Our studio structures typographic grids, optical margins, and trapping. Files are calibrated for dot gain and ink densities to guarantee flawless press fidelity.',
    deliverable: 'High-res PDF soft-proof & color-separated imposition files',
  },
  {
    step: '03',
    title: 'Wet Proofing & Calibrated Press',
    subtitle: 'Ink Touching Real Paper',
    icon: CheckCircle2,
    accent: '#cf2879',
    details:
      'For discerning publications, we run actual wet physical proofs or high-density press samples on your chosen paper stock so you can approve before the full press run.',
    deliverable: 'Physical proof delivered to your desk for sign-off',
  },
  {
    step: '04',
    title: 'Finishing & Insured Pan-India Despatch',
    subtitle: 'Protected Every Kilometer',
    icon: Truck,
    accent: '#d3b72b',
    details:
      'Precision die-cutting, foil stamping, hand-binding, and multi-point QC inspection. Finished pieces are shrink-wrapped in moisture-barrier cartons and dispatched across India.',
    deliverable: 'Tracking details, secure carton packaging & delivery confirmation',
  },
];

export function ProductionJourney() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-space border-b border-[#e2d9cd] bg-[#f7f3ec]">
      <div className="page-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">The PrintOne Method</p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.055em] text-[#1c1d1f]">
            From first conversation<br />
            <span className="text-[#e97819]">to delivered impression.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#615e57] leading-relaxed">
            Great print isn’t an accident. It is the result of a rigorous, multi-stage production protocol that ensures consistency across every single copy.
          </p>
        </motion.div>

        {/* Step Indicator Progress Bar with Motion */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STEPS.map((item, index) => {
            const isActive = activeStep === index;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.step}
                onClick={() => setActiveStep(index)}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col justify-between rounded-xl border p-6 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-[#222425] bg-white shadow-lg ring-1 ring-[#e97819]'
                    : 'border-[#ded7cb] bg-[#fbf9f4] hover:border-[#b8b1a3]'
                }`}
                data-testid={`journey-step-${item.step}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-2xl font-black transition-colors"
                      style={{ color: isActive ? item.accent : '#aaa396' }}
                    >
                      {item.step}
                    </span>
                    <Icon
                      size={20}
                      style={{ color: isActive ? item.accent : '#969188' }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-[#1f2122]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#736f67]">{item.subtitle}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#ece6dd] pt-3 text-[11px] font-bold">
                  <span style={{ color: isActive ? item.accent : '#837f77' }}>
                    {isActive ? 'Currently Viewing' : 'Click to inspect'}
                  </span>
                  <ChevronRight
                    size={14}
                    style={{ color: isActive ? item.accent : '#837f77' }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown with AnimatePresence */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#ded5c7] bg-white p-7 sm:p-9 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: JOURNEY_STEPS[activeStep].accent }}
                  >
                    Stage {JOURNEY_STEPS[activeStep].step}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7e7a72]">
                    Production Protocol Breakdown
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-[#1d1f20]">
                  {JOURNEY_STEPS[activeStep].title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5a5750]">
                  {JOURNEY_STEPS[activeStep].details}
                </p>
              </div>

              <div className="rounded-xl border border-[#e8e2d8] bg-[#fbf9f4] p-5 lg:min-w-[320px]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#79756d]">
                  <ShieldCheck size={16} className="text-[#e97819]" />
                  <span>Guaranteed Deliverable</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#27292a] leading-normal">
                  {JOURNEY_STEPS[activeStep].deliverable}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#e97819]">
                  <span>Protocol 100% In-House Monitored</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e97819]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
