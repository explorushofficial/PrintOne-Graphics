'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/cart-context';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products & services' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setIsCartOpen } = useCart();

  return (
    <>
      <div className="border-b border-[#e5ded4] bg-[#252728] text-[#f5f1e9]">
        <div className="page-wrap flex min-h-9 items-center justify-between gap-4 text-[10px] tracking-[.08em] sm:text-[11px]">
          <span>Ideas to impressions, across India.</span>
          <a
            className="hidden text-[#f5a049] hover:text-white transition-colors sm:inline"
            href="tel:+919594005894"
            data-testid="link-top-phone"
          >
            +91 95940 05894
          </a>
          <span className="sm:hidden">Mumbai · Since 2021</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e8e1d8] bg-[#faf8f2]/95 backdrop-blur">
        <div className="page-wrap flex h-[78px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            aria-label="PrintOne Graphics home"
            data-testid="link-home-logo"
          >
            <img
              src="/printone-logo.jpeg"
              alt="PrintOne Graphics — Design, Print, Brand"
              className="h-[61px] w-[75px] object-contain mix-blend-multiply"
            />
            <span className="ml-2 hidden font-display text-[17px] font-extrabold tracking-[-.06em] sm:block">
              PrintOne <span className="font-sans text-[9px] font-semibold tracking-[.23em] text-[#6d6d69]">GRAPHICS</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="relative inline-flex h-11 items-center gap-2 border border-[#d8d0c6] px-3 text-[12px] font-bold hover:border-[#e97819] hover:text-[#d76b11] transition-colors"
              aria-label={`Open enquiry cart, ${count} items`}
              onClick={() => setIsCartOpen(true)}
              data-testid="button-open-cart"
            >
              <ShoppingBag size={16} strokeWidth={1.8} />
              <span className="hidden sm:inline">Enquiry list</span>
              {count > 0 && (
                <span
                  className="grid h-[19px] min-w-[19px] place-items-center rounded-full bg-[#e97819] px-1 text-[10px] text-white"
                  data-testid="text-cart-count"
                >
                  {count}
                </span>
              )}
            </button>

            <button
              className="grid h-11 w-11 place-items-center border border-[#d8d0c6] md:hidden hover:border-[#e97819] transition-colors"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#e8e1d8] bg-[#faf8f2] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-[600px] flex-col">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`border-b border-[#e8e1d8] py-3 text-sm font-semibold transition-colors ${
                      isActive ? 'text-[#d76b11]' : ''
                    }`}
                    onClick={() => setMenuOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
