'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  MessageCircle,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
import { createWhatsAppUrl } from '@/context/cart-context';
import type { ServiceItem } from '@/data/services-data';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const whatsAppMessage = `Hello PrintOne Graphics,\n\nI would like to enquire about your service:\n*${service.title}* (${service.category})\n\nCould we discuss project requirements, turnaround times, and a customized quotation?`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#ded5c7] bg-[#faf8f2] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-[#ded5c7] bg-white/95 text-[#3b3a37] shadow-sm hover:border-[#10383A] hover:text-[#10383A] transition-colors"
          aria-label="Close service modal"
          data-testid="button-close-service-modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header Banner */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-[#10383A]">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {service.category}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white"
              style={{ backgroundColor: service.accent }}
            >
              PILLAR {service.number}
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h2
              id="modal-service-title"
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {service.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/85 font-medium max-w-xl">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Detailed Narrative */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[.16em] text-[#78756e]">
              Service Overview & Expertise
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#514f49]">
              {service.fullDescription}
            </p>
          </div>

          {/* Scope of Work & Deliverables */}
          <div className="rounded-xl border border-[#ded7cb] bg-[#f5efe4] p-4 sm:p-5">
            <div className="flex items-center gap-2 border-b border-[#e5dfd4] pb-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[.14em] text-[#7a7770]">
              <Sparkles size={14} className="text-[#10383A]" />
              <span>Full Scope of Work & Deliverables</span>
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs text-[#43413b]">
              {service.scopeOfWork.map((scope, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#10383A] mt-0.5 shrink-0" />
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs & Machinery */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Machinery */}
            <div className="rounded-xl border border-[#e5ded4] bg-white p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#78756e]">
                <Cpu size={14} className="text-[#2c9fc3]" />
                <span>Production Machinery & Technology</span>
              </div>
              <ul className="mt-2.5 space-y-1.5 text-xs text-[#524f47]">
                {service.machinery.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#2c9fc3] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials & Paper Stocks */}
            <div className="rounded-xl border border-[#e5ded4] bg-white p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#78756e]">
                <Layers size={14} className="text-[#cf2879]" />
                <span>Materials, Paper Stocks & Finishes</span>
              </div>
              <ul className="mt-2.5 space-y-1.5 text-xs text-[#524f47]">
                {service.materials.map((mat, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#cf2879] font-bold">•</span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Turnaround & Key Applications */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg border border-[#ded7cb] bg-[#fbf9f4] p-3.5 text-xs text-[#636058]">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-[#666E51] shrink-0" />
              <span><strong>Turnaround & Proofing:</strong> {service.turnaround}</span>
            </div>
          </div>

          {/* Common Use Cases */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#78756e]">
              <Tag size={13} className="text-[#10383A]" />
              <span>Common Projects & Applications</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {service.useCases.map((useCase, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-[#ded5c7] bg-white px-3 py-1 text-[11px] font-medium text-[#4f4d47]"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          {/* Actions Bar */}
          <div className="border-t border-[#e2dacf] pt-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <p className="text-[11px] text-[#86837b]">
                ✦ Connect directly with our Mumbai production directors for technical consultation, paper specimens, and volume estimates.
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={createWhatsAppUrl(whatsAppMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#25d366] bg-[#25d366] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1eb956]"
                  data-testid="button-modal-service-whatsapp"
                >
                  <MessageCircle size={15} />
                  <span>Enquire on WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#10383A] bg-[#10383A] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1a4e50] hover:border-[#1a4e50]"
                  onClick={onClose}
                  data-testid="link-modal-service-contact"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
