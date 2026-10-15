'use client';

import { ArrowRight, Eye } from 'lucide-react';
import type { Service } from '@/data/services';

export function ServiceCard({
  service,
  index = 0,
  onSelect,
}: {
  service: Service;
  index?: number;
  onSelect?: (service: Service) => void;
}) {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(service);
    }
  };

  return (
    <article
      className="service-card group flex h-full flex-col justify-between rounded-xl border border-[#e4ded5] bg-white p-3 sm:p-5 shadow-xs transition-all duration-300 hover:border-[#e97819] hover:shadow-md cursor-pointer"
      data-testid={`card-product-${service.id}`}
      onClick={handleSelect}
    >
      <div>
        {/* Product Image */}
        {service.image && (
          <div className="service-image relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#efeae1]">
            <img
              src={service.image}
              alt={service.imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              data-testid={`img-product-${service.id}`}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#1f2122] shadow-sm">
                <Eye size={12} className="text-[#e97819]" />
                Inspect Details
              </span>
            </div>
          </div>
        )}

        {/* Category & Index Pill */}
        <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px]">
          <span className="truncate font-bold uppercase tracking-[.12em] text-[#7b7770]">
            {service.tag}
          </span>
          <span className={`service-mark ${service.color} shrink-0`} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="mt-2 font-display text-[15px] sm:text-[19px] font-bold leading-snug tracking-tight text-[#1c1d1f] transition-colors group-hover:text-[#e97819] line-clamp-1 sm:line-clamp-none">
          {service.title}
        </h3>

        {/* Product Description */}
        <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#696761] line-clamp-2">
          {service.detail}
        </p>
      </div>

      {/* Outer Action: Clean View Details Button (No Add to List or WhatsApp here) */}
      <div className="mt-3 sm:mt-4 pt-3 border-t border-[#ede7de]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSelect();
          }}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-[#27292a] bg-white py-2 px-2 sm:px-3 text-[11px] sm:text-xs font-bold text-[#27292a] transition-all hover:bg-[#27292a] hover:text-white"
          data-testid={`button-view-details-${service.id}`}
        >
          <span>View Details</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

// Named alias
export const ProductCard = ServiceCard;
