'use client';

import Link from 'next/link';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart, createWhatsAppUrl } from '@/context/cart-context';

export function CartDrawer() {
  const { lines, isCartOpen, setIsCartOpen, setQuantity, remove, clear } = useCart();

  if (!isCartOpen) return null;

  const message = `Hello Print One Graphics,\n\nI'd like to enquire about:\n${lines
    .map((line) => `• ${line.service.title} — quantity ${line.quantity}`)
    .join('\n')}\n\nPlease share details and next steps.`;

  const handleClose = () => setIsCartOpen(false);

  return (
    <div
      className="cart-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <aside
        className="cart-panel fixed right-0 top-0 flex h-[100dvh] w-full max-w-[470px] flex-col bg-[#faf8f2] shadow-2xl z-50"
        aria-label="Enquiry list"
        role="dialog"
        aria-modal="true"
        data-testid="panel-enquiry-cart"
      >
        <div className="flex items-center justify-between border-b border-[#e4ddd3] px-6 py-5">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Enquiry list <span className="text-[#97938b]">({lines.length})</span>
            </h2>
          </div>
          <button
            className="grid h-10 w-10 place-items-center border border-[#d8d0c6] hover:border-[#e97819] transition-colors"
            aria-label="Close enquiry list"
            onClick={handleClose}
            data-testid="button-close-cart"
          >
            <X size={18} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#f0ebe2] text-[#e97819]">
              <ShoppingBag size={25} />
            </div>
            <h3 className="font-display text-2xl font-bold">Nothing on the list yet.</h3>
            <p className="mt-2 max-w-[270px] text-sm leading-6 text-[#77736d]">
              Explore the services and add what you have in mind. We’ll take it from there.
            </p>
            <Link
              href="/products"
              className="btn-primary mt-6"
              onClick={handleClose}
              data-testid="link-cart-browse"
            >
              Explore services <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="border-b border-[#e4ddd3] py-3 text-[11px] leading-5 text-[#77736d]">
                A starting point for your conversation. No prices or commitment.
              </div>
              {lines.map(({ service, quantity }) => (
                <div
                  key={service.id}
                  className="flex gap-4 border-b border-[#e4ddd3] py-5"
                  data-testid={`cart-line-${service.id}`}
                >
                  <div className={`cart-dot ${service.color}`} aria-hidden="true"></div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[17px] font-bold">{service.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#77736d]">{service.intro}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#d8d0c6]">
                        <button
                          className="grid h-8 w-8 place-items-center hover:bg-[#ede8df] transition-colors"
                          aria-label={`Decrease ${service.title} quantity`}
                          onClick={() => (quantity > 1 ? setQuantity(service.id, quantity - 1) : remove(service.id))}
                          data-testid={`button-decrease-${service.id}`}
                        >
                          <Minus size={13} />
                        </button>
                        <span
                          className="min-w-8 text-center text-xs font-semibold"
                          data-testid={`text-quantity-${service.id}`}
                        >
                          {quantity}
                        </span>
                        <button
                          className="grid h-8 w-8 place-items-center hover:bg-[#ede8df] transition-colors"
                          aria-label={`Increase ${service.title} quantity`}
                          onClick={() => setQuantity(service.id, quantity + 1)}
                          data-testid={`button-increase-${service.id}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        className="inline-flex items-center gap-1 text-xs text-[#77736d] hover:text-[#bd4a3a] transition-colors"
                        onClick={() => remove(service.id)}
                        data-testid={`button-remove-${service.id}`}
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e4ddd3] bg-[#f3efe7] p-6">
              <a
                className="btn-primary w-full"
                href={createWhatsAppUrl(message)}
                target="_blank"
                rel="noreferrer"
                onClick={clear}
                data-testid="button-send-enquiry"
              >
                Continue on WhatsApp <ArrowRight size={16} />
              </a>
              <button
                className="mt-4 w-full text-center text-xs font-semibold text-[#77736d] hover:text-[#242525] transition-colors"
                onClick={clear}
                data-testid="button-clear-cart"
              >
                Clear selection
              </button>
              <p className="mt-3 text-center text-[10px] leading-4 text-[#89857d]">
                Your selection will be included in one message to Print One Graphics.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
