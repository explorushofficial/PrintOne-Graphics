'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck,
  Layers,
  MessageCircle,
  Minus,
  Plus,
  Printer,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { useCart, createWhatsAppUrl } from '@/context/cart-context';
import type { Service } from '@/data/services';

interface ProductModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ProductModal({ service, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [prevServiceId, setPrevServiceId] = useState(service?.id);
  const { add } = useCart();

  if (service?.id !== prevServiceId) {
    setPrevServiceId(service?.id);
    setQuantity(1);
    setAddedNotice(false);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      add(service);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const whatsAppMessage = `Hello Print One Graphics,\n\nI would like to enquire about:\n*${service.title}*\nCategory: ${service.tag}\nQuantity: ${quantity}\nDetails: ${service.detail}\n\nPlease share paper recommendations, pricing estimate, and next steps.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#ded5c7] bg-[#faf8f2] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-[#ded5c7] bg-white/90 text-[#3b3a37] shadow-sm hover:border-[#10383A] hover:text-[#10383A] transition-colors"
          aria-label="Close product modal"
          data-testid="button-close-product-modal"
        >
          <X size={18} />
        </button>

        {/* Modal Product Image Header */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#10383A]">
          <img
            src={service.image}
            alt={service.imageAlt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {service.tag}
            </span>
            <span className={`service-mark ${service.color} !bg-white !text-black !h-6 !w-6 !text-[10px]`}>
              ✓
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h2 id="modal-product-title" className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              {service.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/85 font-medium">
              {service.intro}
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#78756e]">
              Overview & Specifications
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#514f49]">
              {service.detail}
            </p>
          </div>

          {/* Technical Spec Sheet */}
          <div className="mt-5 rounded-xl border border-[#ded7cb] bg-[#f5efe4] p-4 text-xs">
            <div className="flex items-center gap-2 border-b border-[#e5dfd4] pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#7a7770]">
              <Layers size={13} className="text-[#10383A]" />
              <span>Production Capabilities for this item</span>
            </div>

            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 text-[#43413b]">
              {(service.capabilities && service.capabilities.length > 0
                ? service.capabilities
                : [
                    'Paper Stocks: Fine art, textured linen, recycled wove, and FSC cotton stocks.',
                    'Specialty Finishes: Foil stamping, blind deboss, spot gloss UV, and soft-touch lamination.',
                    'Custom Sizes: Standard ISO dimensions or bespoke custom dieline trims.',
                    'Speed & Proofs: 48-hour physical proofing available prior to production run.',
                  ]
              ).map((cap, i) => {
                const parts = cap.split(':');
                const hasLabel = parts.length > 1;
                return (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-[#10383A] mt-0.5 flex-none" />
                    <span>
                      {hasLabel ? (
                        <>
                          <strong>{parts[0].trim()}:</strong> {parts.slice(1).join(':').trim()}
                        </>
                      ) : (
                        cap
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity & Actions Bar */}
          <div className="mt-7 border-t border-[#e2dacf] pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[.16em] text-[#737068]">
                  Quantity
                </label>
                <div className="mt-1.5 inline-flex items-center rounded border border-[#d2cbbe] bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="grid h-9 w-9 place-items-center hover:bg-[#ede7dc] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-10 text-center font-display text-sm font-bold text-[#1f2122]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="grid h-9 w-9 place-items-center hover:bg-[#ede7dc] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAdd}
                  className={`btn-primary flex-1 sm:flex-none text-xs transition-all ${
                    addedNotice ? '!bg-green-700 !border-green-700' : ''
                  }`}
                  data-testid="button-modal-add-cart"
                >
                  {addedNotice ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Added {quantity} to List!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      <span>Add to Enquiry List</span>
                    </>
                  )}
                </button>

                <a
                  href={createWhatsAppUrl(whatsAppMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded border border-[#25d366] bg-[#25d366] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#1eb956] hover:border-[#1eb956]"
                  data-testid="button-modal-whatsapp"
                >
                  <MessageCircle size={15} />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>

            <p className="mt-3 text-[10px] text-[#86837b]">
              ✦ No immediate payment or commitment required. Submitting adds this to your consolidated enquiry list for an exact quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
