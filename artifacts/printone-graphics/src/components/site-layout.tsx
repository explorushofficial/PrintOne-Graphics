import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Menu, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart, createWhatsAppUrl } from '@/components/cart-context';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products & services' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <div className="border-b border-[#e5ded4] bg-[#252728] text-[#f5f1e9]">
        <div className="page-wrap flex min-h-9 items-center justify-between gap-4 text-[10px] tracking-[.08em] sm:text-[11px]">
          <span>Ideas to impressions, across India.</span>
          <a className="hidden text-[#f5a049] hover:text-white sm:inline" href="tel:+919594005894" data-testid="link-top-phone">+91 95940 05894</a>
          <span className="sm:hidden">Mumbai · Since 2021</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#e8e1d8] bg-[#faf8f2]/95 backdrop-blur">
        <div className="page-wrap flex h-[78px] items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="PrintOne Graphics home" data-testid="link-home-logo">
            <img src="/printone-logo.jpeg" alt="PrintOne Graphics — Design, Print, Brand" className="h-[61px] w-[75px] object-contain mix-blend-multiply" />
            <span className="ml-2 hidden font-display text-[17px] font-extrabold tracking-[-.06em] sm:block">PrintOne <span className="font-sans text-[9px] font-semibold tracking-[.23em] text-[#6d6d69]">GRAPHICS</span></span>
          </Link>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${location === link.href ? 'active' : ''}`} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="relative inline-flex h-11 items-center gap-2 border border-[#d8d0c6] px-3 text-[12px] font-bold hover:border-[#e97819] hover:text-[#d76b11]" aria-label={`Open enquiry cart, ${count} items`} onClick={() => setCartOpen(true)} data-testid="button-open-cart">
              <ShoppingBag size={16} strokeWidth={1.8} />
              <span className="hidden sm:inline">Enquiry list</span>
              {count > 0 && <span className="grid h-[19px] min-w-[19px] place-items-center rounded-full bg-[#e97819] px-1 text-[10px] text-white" data-testid="text-cart-count">{count}</span>}
            </button>
            <button className="grid h-11 w-11 place-items-center border border-[#d8d0c6] md:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#e8e1d8] bg-[#faf8f2] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-[600px] flex-col">
              {links.map((link) => <Link key={link.href} href={link.href} className={`border-b border-[#e8e1d8] py-3 text-sm font-semibold ${location === link.href ? 'text-[#d76b11]' : ''}`} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</Link>)}
            </div>
          </nav>
        )}
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, setQuantity, remove, clear } = useCart();
  if (!open) return null;
  const message = `Hello PrintOne Graphics,\n\nI'd like to enquire about:\n${lines.map((line) => `• ${line.service.title} — quantity ${line.quantity}`).join('\n')}\n\nPlease share details and next steps.`;

  return (
    <div className="cart-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-panel fixed right-0 top-0 flex h-[100dvh] w-full max-w-[470px] flex-col bg-[#faf8f2] shadow-2xl" aria-label="Enquiry list" role="dialog" aria-modal="true" data-testid="panel-enquiry-cart">
        <div className="flex items-center justify-between border-b border-[#e4ddd3] px-6 py-5">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2 className="mt-1 font-display text-2xl font-bold">Enquiry list <span className="text-[#97938b]">({lines.length})</span></h2>
          </div>
          <button className="grid h-10 w-10 place-items-center border border-[#d8d0c6]" aria-label="Close enquiry list" onClick={onClose} data-testid="button-close-cart"><X size={18} /></button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#f0ebe2] text-[#e97819]"><ShoppingBag size={25} /></div>
            <h3 className="font-display text-2xl font-bold">Nothing on the list yet.</h3>
            <p className="mt-2 max-w-[270px] text-sm leading-6 text-[#77736d]">Explore the services and add what you have in mind. We’ll take it from there.</p>
            <Link href="/products" className="btn-primary mt-6" onClick={onClose} data-testid="link-cart-browse">Explore services <ArrowRight size={15} /></Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="border-b border-[#e4ddd3] py-3 text-[11px] leading-5 text-[#77736d]">A starting point for your conversation. No prices or commitment.</div>
              {lines.map(({ service, quantity }) => (
                <div key={service.id} className="flex gap-4 border-b border-[#e4ddd3] py-5" data-testid={`cart-line-${service.id}`}>
                  <div className={`cart-dot ${service.color}`} aria-hidden="true"></div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[17px] font-bold">{service.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#77736d]">{service.intro}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#d8d0c6]">
                        <button className="grid h-8 w-8 place-items-center" aria-label={`Decrease ${service.title} quantity`} onClick={() => quantity > 1 ? setQuantity(service.id, quantity - 1) : remove(service.id)} data-testid={`button-decrease-${service.id}`}><Minus size={13} /></button>
                        <span className="min-w-8 text-center text-xs font-semibold" data-testid={`text-quantity-${service.id}`}>{quantity}</span>
                        <button className="grid h-8 w-8 place-items-center" aria-label={`Increase ${service.title} quantity`} onClick={() => setQuantity(service.id, quantity + 1)} data-testid={`button-increase-${service.id}`}><Plus size={13} /></button>
                      </div>
                      <button className="inline-flex items-center gap-1 text-xs text-[#77736d] hover:text-[#bd4a3a]" onClick={() => remove(service.id)} data-testid={`button-remove-${service.id}`}><Trash2 size={13} /> Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e4ddd3] bg-[#f3efe7] p-6">
              <a className="btn-primary w-full" href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer" onClick={clear} data-testid="button-send-enquiry">Continue on WhatsApp <ArrowRight size={16} /></a>
              <button className="mt-4 w-full text-center text-xs font-semibold text-[#77736d] hover:text-[#242525]" onClick={clear} data-testid="button-clear-cart">Clear selection</button>
              <p className="mt-3 text-center text-[10px] leading-4 text-[#89857d]">Your selection will be included in one message to PrintOne Graphics.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#252728] text-[#f7f2e9]">
      <div className="page-wrap grid gap-12 py-14 md:grid-cols-[1.15fr_.7fr_.8fr] md:py-16">
        <div>
          <div className="flex items-center gap-3">
            <img src="/printone-logo.jpeg" alt="" className="h-14 w-[68px] object-contain mix-blend-screen" />
            <span className="font-display text-xl font-extrabold tracking-[-.05em]">PrintOne <span className="font-sans text-[9px] font-semibold tracking-[.2em] text-[#c6c0b5]">GRAPHICS</span></span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#c7c2b8]">A creative and production partner for ideas that deserve to be held, read and remembered.</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[.14em] text-[#e99547]">Ideas to impressions.</p>
        </div>
        <div>
          <p className="eyebrow text-[#c7c2b8]">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#e9e4da]">
            {links.map((link) => <Link key={link.href} href={link.href} className="hover:text-[#f19a46]" data-testid={`link-footer-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#c7c2b8]">Say hello</p>
          <p className="mt-5 text-sm leading-6 text-[#e9e4da]">A-Wing, Unit No. 309<br />Byculla Service Industrial Premises<br />Byculla East, Mumbai – 400027</p>
          <a className="mt-4 inline-block text-sm text-[#f19a46] hover:text-white" href="tel:+919594005894" data-testid="link-footer-phone">+91 95940 05894</a>
          <a className="mt-2 block text-sm text-[#f19a46] hover:text-white" href="mailto:printone.graphics21@gmail.com" data-testid="link-footer-email">printone.graphics21@gmail.com</a>
        </div>
      </div>
      <div className="border-t border-[#454646]">
        <div className="page-wrap flex flex-col justify-between gap-2 py-4 text-[10px] tracking-[.05em] text-[#a7a299] sm:flex-row"><span>© {new Date().getFullYear()} PrintOne Graphics</span><span>Mumbai, India · Working with organisations across India</span></div>
      </div>
    </footer>
  );
}
