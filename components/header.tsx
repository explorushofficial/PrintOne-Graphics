'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
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
      <div className="border-b border-[#1a4e50] bg-[#10383A] text-[#f5f1e9]">
        <div className="page-wrap flex min-h-9 items-center justify-between gap-4 text-[10px] tracking-[.08em] sm:text-[11px]">
          <span className="font-semibold tracking-[.12em] text-[#d8e2df]">DESIGN • DIGITAL PRINTING • CORPORATE GIFTING</span>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[#809276]">Byculla East, Mumbai</span>
            <span className="text-white/20">|</span>
            <a
              className="text-[#809276] hover:text-white transition-colors"
              href="tel:+919594005894"
              data-testid="link-top-phone"
            >
              +91 95940 05894 / +91 98191 24907
            </a>
          </div>
          <span className="sm:hidden text-[#809276]">Mumbai · Since 2021</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e8e1d8] bg-[#faf8f2]/95 backdrop-blur">
        <div className="page-wrap flex h-[78px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="PrintOne Graphics home"
            data-testid="link-home-logo"
          >
            <img
              src="/printone-logo.png"
              alt="PrintOne Graphics — Design, Print, Brand"
              className="h-[58px] w-auto object-contain"
              width={58}
              height={58}
            />
            <span className="font-display text-[17px] font-extrabold tracking-[-.04em] text-[#10383A] sm:text-[18px]">
              PrintOne <span className="font-sans text-[9px] font-bold tracking-[.22em] text-[#768886]">GRAPHICS</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#DAA112] text-white shadow-xs'
                      : 'text-[#10383A] hover:bg-[#DAA112] hover:text-white'
                  }`}
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
              className={`inline-flex h-10 sm:h-11 items-center gap-2 rounded-lg px-4 sm:px-5 text-[12px] sm:text-[13px] font-bold transition-all duration-200 shadow-sm ${
                pathname === '/quote'
                  ? 'bg-[#DAA112] text-white'
                  : 'bg-[#10383A] text-white hover:bg-[#DAA112] hover:text-white'
              }`}
              data-testid="button-nav-quote"
            >
              <FileText size={15} />
              <span>Get a Quote</span>
            </Link>

            <button
              className="grid h-10 sm:h-11 w-10 sm:w-11 place-items-center rounded-lg border border-[#768886]/40 text-[#10383A] md:hidden hover:border-[#DAA112] hover:bg-[#DAA112] hover:text-white transition-all"
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
            <div className="mx-auto flex max-w-[600px] flex-col gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3.5 py-2.5 text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#DAA112] text-white'
                        : 'text-[#10383A] hover:bg-[#DAA112] hover:text-white'
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
                className={`mt-2 flex items-center justify-center gap-2 rounded-lg py-3 text-center text-xs font-bold transition-all shadow-sm ${
                  pathname === '/quote'
                    ? 'bg-[#DAA112] text-white'
                    : 'bg-[#10383A] text-white hover:bg-[#DAA112] hover:text-white'
                }`}
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

