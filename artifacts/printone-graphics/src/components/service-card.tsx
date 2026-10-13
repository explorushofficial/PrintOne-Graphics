import { ArrowUpRight, MessageCircle, Plus } from 'lucide-react';
import { createWhatsAppUrl, useCart } from '@/components/cart-context';
import type { Service } from '@/data/services';

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { add } = useCart();
  return (
    <article className="service-card group flex min-h-[270px] flex-col justify-between py-6" data-testid={`card-service-${service.id}`}>
      {service.image && (
        <div className="service-image mb-6 aspect-[4/3] overflow-hidden">
          <img
            src={service.image}
            alt={service.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            loading="lazy"
            data-testid={`img-service-${service.id}`}
          />
        </div>
      )}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7b7770]">{service.tag}</span>
          <span className={`service-mark ${service.color}`} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-7 max-w-[290px] font-display text-[26px] font-bold leading-[1.06] tracking-[-.045em]">{service.title}</h3>
        <p className="mt-3 max-w-[340px] text-sm leading-6 text-[#696761]">{service.detail}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            className="inline-flex items-center gap-2 text-xs font-bold text-[#242525] transition-colors hover:text-[#d5680e]"
            onClick={() => add(service)}
            data-testid={`button-add-${service.id}`}
          >
            <span className="grid h-7 w-7 place-items-center border border-[#d4cec4] group-hover:border-[#e97819]">
              <Plus size={14} />
            </span>
            Add to cart
          </button>
          <a
            className="inline-flex items-center gap-2 text-xs font-bold text-[#d5680e] transition-colors hover:text-[#242525]"
            href={createWhatsAppUrl(`Hello PrintOne Graphics, I'd like to enquire about ${service.title}. Please share details and next steps.`)}
            target="_blank"
            rel="noreferrer"
            data-testid={`link-whatsapp-${service.id}`}
          >
            <MessageCircle size={15} />
            WhatsApp
            <span className="sr-only"> about {service.title}</span>
          </a>
        </div>
        <ArrowUpRight size={17} className="text-[#aaa49a] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e97819]" aria-hidden="true" />
      </div>
    </article>
  );
}
