'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products & services' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
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

  return (
    <footer className="bg-[#252728] text-[#f7f2e9]">
      <div className="page-wrap grid gap-12 py-14 md:grid-cols-[1.15fr_.7fr_.8fr] md:py-16">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/printone-logo.jpeg"
              alt="PrintOne Graphics"
              className="h-14 w-[68px] object-contain mix-blend-screen"
            />
            <span className="font-display text-xl font-extrabold tracking-[-.05em]">
              PrintOne <span className="font-sans text-[9px] font-semibold tracking-[.2em] text-[#c6c0b5]">GRAPHICS</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#c7c2b8]">
            A creative and production partner for ideas that deserve to be held, read and remembered.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[.14em] text-[#e99547]">
            Ideas to impressions.
          </p>
        </div>

        <div>
          <p className="eyebrow text-[#c7c2b8]">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#e9e4da]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#f19a46] transition-colors"
                data-testid={`link-footer-${link.label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-[#c7c2b8]">Say hello</p>
          <p className="mt-5 text-sm leading-6 text-[#e9e4da]">
            A-Wing, Unit No. 309<br />
            Byculla Service Industrial Premises<br />
            Byculla East, Mumbai – 400027
          </p>
          <a
            className="mt-4 inline-block text-sm text-[#f19a46] hover:text-white transition-colors"
            href="tel:+919594005894"
            data-testid="link-footer-phone"
          >
            +91 95940 05894
          </a>
          <a
            className="mt-2 block text-sm text-[#f19a46] hover:text-white transition-colors"
            href="mailto:printone.graphics21@gmail.com"
            data-testid="link-footer-email"
          >
            printone.graphics21@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-[#454646]">
        <div className="page-wrap flex flex-col justify-between gap-2 py-4 text-[10px] tracking-[.05em] text-[#a7a299] sm:flex-row">
          <span>© {currentYear} PrintOne Graphics</span>
          <span>Mumbai, India · Working with organisations across India</span>
        </div>
      </div>
    </footer>
  );
}
