'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/quote', label: 'Get a Quote' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin Desk' },
];

const emptySubscribe = () => () => {};
function useCurrentYear() {
  return useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );
}

export function Footer() {
  const currentYear = useCurrentYear();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-[#1a4e50] bg-[#10383A] text-[#e3ecea]">
      <div className="page-wrap py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand & Studio Location */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm ring-1 ring-white/10">
              <img
                src="/printone-logo.png"
                alt="Print One Graphics"
                className="h-full w-full object-contain"
                width={40}
                height={40}
              />
            </div>
            <div>
              <span className="font-display text-base font-extrabold tracking-[-.04em] text-white">
                PrintOne <span className="font-sans text-[8px] font-semibold tracking-[.2em] text-[#809276]">GRAPHICS</span>
              </span>
              <p className="text-[11px] text-[#768886]">
                Byculla East, Mumbai · Since 2021
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs" aria-label="Footer navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#d0dedb] hover:text-[#809276] transition-colors"
                data-testid={`link-footer-${link.label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#a7b9b5]">
            <a
              className="text-[#809276] hover:text-white transition-colors"
              href="tel:+919819124907"
              data-testid="link-footer-phone"
            >
              +91 98191 24907 / +91 95940 05894
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              className="text-[#d0dedb] hover:text-white transition-colors"
              href="mailto:printone.graphics21@gmail.com"
              data-testid="link-footer-email"
            >
              printone.graphics21@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-5 flex flex-col justify-between gap-2 border-t border-[#1a4e50] pt-4 text-[10px] tracking-[.04em] text-[#768886] sm:flex-row">
          <span>© {currentYear} Print One Graphics. All rights reserved.</span>
          <span>Your Trusted Partner for Design, Digital Printing &amp; Corporate Gifting · Byculla East, Mumbai</span>
        </div>
      </div>
    </footer>
  );
}
