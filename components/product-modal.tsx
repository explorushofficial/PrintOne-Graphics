'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Service } from '@/data/services';

interface ProductModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ProductModal({ service, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-[#181a1b] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white/90 shadow-md hover:bg-black hover:text-white transition-colors"
          aria-label="Close image preview"
          data-testid="button-close-product-modal"
        >
          <X size={18} />
        </button>

        {/* Product Image */}
        <div className="relative w-full max-h-[70vh] bg-black/70 flex items-center justify-center overflow-hidden">
          <img
            src={service.image}
            alt={service.imageAlt || service.title}
            className="max-h-[70vh] w-full object-contain"
          />
        </div>

        {/* Product Name & Category */}
        <div className="flex items-center justify-between gap-4 p-4 sm:p-5 bg-[#181a1b] border-t border-white/10 text-white">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[.14em] text-[#DAA112]">
              {service.tag}
            </span>
            <h2 id="modal-product-title" className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              {service.title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

