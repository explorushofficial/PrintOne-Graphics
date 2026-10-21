'use client';

import Link from 'next/link';
import { ArrowRight, Mail, MessageCircle, Package, PhoneCall } from 'lucide-react';
import { createWhatsAppUrl } from '@/context/cart-context';

export function SwatchEnquiryBanner() {
  return (
    <section className="relative overflow-hidden bg-[#10383A] py-16 text-[#fbf9f4]">
      {/* Decorative CMYK line on top edge */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <span className="flex-1 bg-[#2c9fc3]" />
        <span className="flex-1 bg-[#cf2879]" />
        <span className="flex-1 bg-[#809276]" />
        <span className="flex-1 bg-[#666E51]" />
      </div>

      <div className="page-wrap">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.15em] text-[#e8e4dc]">
              <Package size={13} className="text-[#809276]" />
              <span>Ready for Physical Production</span>
            </div>

            <h2 className="mt-5 font-display text-3xl sm:text-5xl font-extrabold tracking-[-.05em] leading-[1.05]">
              Have a project in mind?<br />
              <span className="text-[#809276]">Let’s make it tangible.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#b5b0a7]">
              Whether it’s an upcoming corporate annual report, an educational publication run, bespoke luxury packaging, or brand collateral — speak directly with our production specialists in Mumbai.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="btn-primary"
                data-testid="link-cta-consult"
              >
                <span>Request a custom quotation</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={createWhatsAppUrl(
                  "Hello Print One Graphics! I'd like to talk about an upcoming print/design project. Could we connect?"
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-white/30 bg-transparent px-5 py-3 text-xs font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#10383A]"
                data-testid="link-cta-whatsapp"
              >
                <MessageCircle size={15} />
                <span>Quick chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Direct Desk Card */}
          <div className="rounded-lg border border-white/15 bg-white/5 p-7 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#809276]">
              Mumbai Studio Desk
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-white">
              Print One Graphics Mumbai
            </h3>
            <p className="mt-1 text-xs text-[#b8b3aa]">
              Ideas to impressions, delivered across India since 2021.
            </p>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs text-[#dcd7ce]">
              <div className="flex items-center gap-3">
                <PhoneCall size={15} className="text-[#809276]" />
                <div className="flex flex-wrap gap-x-2">
                  <a href="tel:+919819124907" className="hover:text-white transition-colors">
                    +91 98191 24907
                  </a>
                  <span className="text-white/40">/</span>
                  <a href="tel:+919594005894" className="hover:text-white transition-colors">
                    +91 95940 05894
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#809276]" />
                <a
                  href="mailto:printone.graphics21@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  printone.graphics21@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6 rounded border border-white/10 bg-black/20 p-3 text-[11px] text-[#9f9b93]">
              <span className="font-semibold text-white">Free Swatch Courier: </span>
              Design studios and corporate procurement teams can request sample papers and finish swatches delivered directly to their address.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
