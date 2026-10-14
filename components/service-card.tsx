'use client';

import { ArrowUpRight, Eye, MessageCircle, Plus } from 'lucide-react';
import { createWhatsAppUrl, useCart } from '@/context/cart-context';
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
  const { add } = useCart();

  return (
    <article
      className="service-card group flex min-h-[290px] flex-col justify-between py-6 transition-all duration-300"
      data-testid={`card-service-${service.id}`}
    >
      {service.image && (
        <div
          className={`service-image relative mb-5 aspect-[4/3] overflow-hidden rounded-md bg-[#e9e2d7] ${
            onSelect ? 'cursor-pointer' : ''
          }`}
          onClick={() => onSelect && onSelect(service)}
        >
          <img
            src={service.image}
            alt={service.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            data-testid={`img-service-${service.id}`}
          />
          {onSelect && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#1f2122] shadow-md">
                <Eye size={13} className="text-[#e97819]" />
                Inspect Details
              </span>
            </div>
          )}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#7b7770]">
            {service.tag}
          </span>
          <span className={`service-mark ${service.color}`} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3
          className={`mt-4 max-w-[290px] font-display text-[24px] font-bold leading-[1.08] tracking-[-.045em] transition-colors ${
            onSelect ? 'cursor-pointer hover:text-[#e97819]' : ''
          }`}
          onClick={() => onSelect && onSelect(service)}
        >
          {service.title}
        </h3>
        <p className="mt-2.5 max-w-[340px] text-xs sm:text-sm leading-relaxed text-[#696761]">
          {service.detail}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#ede7de] pt-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            className="inline-flex items-center gap-2 text-xs font-bold text-[#242525] transition-colors hover:text-[#e97819]"
            onClick={(e) => {
              e.stopPropagation();
              add(service);
            }}
            data-testid={`button-add-${service.id}`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-sm border border-[#d4cec4] group-hover:border-[#e97819] transition-colors">
              <Plus size={14} />
            </span>
            Add to list
          </button>

          <a
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e97819] transition-colors hover:text-[#242525]"
            href={createWhatsAppUrl(
              `Hello PrintOne Graphics, I'd like to enquire about ${service.title}. Please share details and next steps.`
            )}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            data-testid={`link-whatsapp-${service.id}`}
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </a>
        </div>

        {onSelect ? (
          <button
            onClick={() => onSelect(service)}
            className="text-[#9e998f] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e97819]"
            title="Open Details Modal"
          >
            <ArrowUpRight size={18} />
          </button>
        ) : (
          <ArrowUpRight
            size={18}
            className="text-[#aaa49a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e97819]"
            aria-hidden="true"
          />
        )}
      </div>
    </article>
  );
}
