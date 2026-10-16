'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <div className="border-b border-[#e5ded4] bg-[#252728] text-[#f5f1e9]">
        <div className="page-wrap flex min-h-9 items-center justify-between gap-4 text-[10px] tracking-[.08em] sm:text-[11px]">
          <span className="font-semibold tracking-[.12em] text-[#dcd7cd]">DESIGN • DIGITAL PRINTING • CORPORATE GIFTING</span>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[#a5a095]">Byculla East, Mumbai</span>
            <span className="text-white/20">|</span>
            <a
              className="text-[#f5a049] hover:text-white transition-colors"
              href="tel:+919594005894"
              data-testid="link-top-phone"
            >
              +91 95940 05894 / +91 98191 24907
            </a>
          </div>
          <span className="sm:hidden text-[#f5a049]">Mumbai · Since 2021</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e8e1d8] bg-[#faf8f2]/95 backdrop-blur">
        <div className="page-wrap flex h-[78px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Print One Graphics home"
            data-testid="link-home-logo"
          >
            <img
              src="/printone-logo.png"
              alt="Print One Graphics — Design, Print, Brand"
              className="h-[52px] w-auto object-contain"
              width={54}
              height={52}
            />
            <span className="font-display text-[17px] font-extrabold tracking-[-.04em] text-[#1c1d1f] sm:text-[18px]">
              Print One <span className="font-sans text-[9px] font-bold tracking-[.22em] text-[#6d6d69]">GRAPHICS</span>
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

          <div className="flex items-center gap-2.5">
            <Link
              href="/quote"
              className={`inline-flex h-10 sm:h-11 items-center gap-2 px-3.5 sm:px-5 text-[12px] sm:text-[13px] font-bold text-white transition-all shadow-sm ${
                pathname === '/quote'
                  ? 'bg-[#0f766e]'
                  : 'bg-[#e97819] hover:bg-[#cb5f09]'
              }`}
              data-testid="button-nav-quote"
            >
              <FileText size={15} />
              <span>Get a Quote</span>
            </Link>

            <button
              className="grid h-10 sm:h-11 w-10 sm:w-11 place-items-center border border-[#d8d0c6] md:hidden hover:border-[#e97819] transition-colors"
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
              <Link
                href="/quote"
                className="mt-4 flex items-center justify-center gap-2 bg-[#e97819] py-3 text-center text-xs font-bold text-white shadow-sm hover:bg-[#cb5f09] transition-colors"
                onClick={() => setMenuOpen(false)}
                data-testid="link-mobile-quote-cta"
              >
                <FileText size={15} />
                <span>Fill Print Specification Form (WhatsApp)</span>
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
