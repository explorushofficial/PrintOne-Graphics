'use client';

import Link from 'next/link';
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
      className="service-card group flex h-full flex-col justify-between rounded-xl border border-[#e4ded5] bg-white p-3 sm:p-5 shadow-xs transition-all duration-300 hover:border-[#10383A] hover:shadow-md cursor-pointer"
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#10383A] shadow-sm">
                <Eye size={12} className="text-[#10383A]" />
                View Image
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
        <h3 className="mt-2 font-display text-[15px] sm:text-[19px] font-bold leading-snug tracking-tight text-[#10383A] transition-colors group-hover:text-[#666E51] line-clamp-1 sm:line-clamp-none">
          {service.title}
        </h3>

        {/* Product Description */}
        <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#696761] line-clamp-2">
          {service.detail}
        </p>
      </div>

      {/* Action Button: Get Quote */}
      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#ede7de]">
        <Link
          href={`/quote?service=${encodeURIComponent(service.title)}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#10383A] py-2 px-3 text-[11px] sm:text-xs font-bold text-white transition-all hover:bg-[#164a4d] shadow-2xs group/btn"
          data-testid={`button-get-quote-${service.id}`}
        >
          <span>Get Quote</span>
          <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

// Named alias
export const ProductCard = ServiceCard;
