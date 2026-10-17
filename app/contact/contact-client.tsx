'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, FileText, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { createWhatsAppUrl } from '@/context/cart-context';

export function ContactClient() {
  const [name, setName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = `Hello Print One Graphics,\n\n${message}\n\nName: ${name}\nOrganisation: ${
      organisation || 'Not specified'
    }\nProject: ${project || 'Not specified'}`;
    window.open(createWhatsAppUrl(body), '_blank', 'noopener,noreferrer');
  }

  return (
    <main>
      {/* 2-Grid Contact Layout */}
      <div className="page-wrap py-8 sm:py-12">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[0.88fr_1.12fr] items-start">
          {/* Left Column: Let's Create Something Great Together Branding */}
          <div className="lg:sticky lg:top-24 space-y-5">
            <div>
              <p className="eyebrow">Contact Us • Get a Quote</p>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,4.2vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-.045em] text-[#1c1d1f]">
                Let’s Create<br />
                <span className="text-[#e97819]">Something Great</span><br />
                Together.
              </h1>
              <p className="mt-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-[#e97819]">
                Design • Digital Printing • Corporate Gifting
              </p>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[#615e58]">
              Have a printing project, annual report, corporate publication, luxury packaging or corporate gifting requirement in mind? Print One Graphics is here to help.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-[#615e58]">
              From concept and paper selection to printing, high-precision finishing and pan-India delivery, our team provides complete solutions tailored to your brand.
            </p>

            <div className="space-y-3 pt-5 border-t border-[#e2dbd1]">
              <div className="flex items-start gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e97819]/15 text-[#e97819] text-[11px] font-bold">✓</span>
                <p className="text-xs text-[#55524d] leading-relaxed">
                  <strong className="text-[#1c1d1f]">Commercial Presses:</strong> Heidelberg 4-color offset &amp; Konica Minolta AccurioPress C7100.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e97819]/15 text-[#e97819] text-[11px] font-bold">✓</span>
                <p className="text-xs text-[#55524d] leading-relaxed">
                  <strong className="text-[#1c1d1f]">Luxury Finishing:</strong> Foil stamping, spot UV, embossing, rigid boxes &amp; thermal lamination.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e97819]/15 text-[#e97819] text-[11px] font-bold">✓</span>
                <p className="text-xs text-[#55524d] leading-relaxed">
                  <strong className="text-[#1c1d1f]">Direct Production Desk:</strong> Immediate assistance from our Byculla East team.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form on top + 3 Cards (Email, Contacts, Address) below */}
          <div className="space-y-3.5">
            {/* The Form Box */}
            <div className="relative overflow-hidden rounded-xl border border-[#e2dbd1] bg-[#f0ece4] p-4 sm:p-6 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e97819] via-[#f5a049] to-[#0f766e]" />
              
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="eyebrow">Project Brief &amp; WhatsApp Enquiry</p>
                    <h2 className="mt-0.5 font-display text-xl sm:text-2xl font-extrabold tracking-[-.03em] text-[#1c1d1f]">
                      Tell us about your project.
                    </h2>
                  </div>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#e97819] hover:text-[#cb5f09] transition-colors"
                    data-testid="link-contact-detailed-quote-top"
                  >
                    Detailed Form <ArrowUpRight size={12} />
                  </Link>
                </div>
                <p className="mt-1 text-xs text-[#77736d]">
                  Share a few details — we will prepare your enquiry directly for our team on WhatsApp.
                </p>

                <form className="mt-4 space-y-3" onSubmit={submitEnquiry} data-testid="form-contact-enquiry">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-semibold text-[#1c1d1f]">
                      Your name <span className="text-[#e97819]">*</span>
                      <input
                        className="mt-1 block h-9 sm:h-10 w-full rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 text-xs sm:text-sm outline-none transition focus:border-[#e97819] focus:ring-1 focus:ring-[#e97819]"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        data-testid="input-contact-name"
                      />
                    </label>
                    <label className="block text-xs font-semibold text-[#1c1d1f]">
                      Organisation / Company
                      <input
                        className="mt-1 block h-9 sm:h-10 w-full rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 text-xs sm:text-sm outline-none transition focus:border-[#e97819] focus:ring-1 focus:ring-[#e97819]"
                        type="text"
                        autoComplete="organization"
                        placeholder="e.g. Apex Enterprises"
                        value={organisation}
                        onChange={(event) => setOrganisation(event.target.value)}
                        data-testid="input-contact-organisation"
                      />
                    </label>
                  </div>

                  <label className="block text-xs font-semibold text-[#1c1d1f]">
                    What do you need? <span className="text-[#e97819]">*</span>
                    <input
                      className="mt-1 block h-9 sm:h-10 w-full rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 text-xs sm:text-sm outline-none transition focus:border-[#e97819] focus:ring-1 focus:ring-[#e97819]"
                      type="text"
                      required
                      placeholder="e.g. Annual report, packaging boxes, diaries, catalogues…"
                      value={project}
                      onChange={(event) => setProject(event.target.value)}
                      data-testid="input-contact-project"
                    />
                  </label>

                  <label className="block text-xs font-semibold text-[#1c1d1f]">
                    Project details &amp; specifications <span className="text-[#e97819]">*</span>
                    <textarea
                      className="mt-1 block min-h-[64px] sm:min-h-[76px] w-full resize-y rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-[#e97819] focus:ring-1 focus:ring-[#e97819]"
                      required
                      placeholder="Approximate quantity, paper preference (GSM/finish), timeline, or specific requirements."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      data-testid="input-contact-message"
                    />
                  </label>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <button
                      className="inline-flex h-9 sm:h-10 items-center justify-center gap-2 rounded-md bg-[#e97819] px-5 text-xs font-bold text-white shadow-sm hover:bg-[#cb5f09] transition-all"
                      type="submit"
                      data-testid="button-submit-contact"
                    >
                      Prepare WhatsApp message <Send size={13} />
                    </button>
                    <Link
                      href="/quote"
                      className="text-center sm:text-right text-[11px] font-semibold text-[#615e58] hover:text-[#e97819] transition-colors"
                      data-testid="link-contact-detailed-quote"
                    >
                      Need full technical specs? <span className="underline font-bold">Use Quote Form →</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* 3 Rounded Cards Below Form in the Right Column: Email | Contacts | Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: Email */}
              <div className="flex flex-col justify-between rounded-xl border border-[#e4ddd3] bg-white p-3.5 shadow-sm hover:border-[#e97819]/50 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-1.5 text-[#e97819]">
                    <Mail size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-[.08em] text-[#1c1d1f]">Email</h3>
                  </div>
                  <div className="mt-2 space-y-1">
                    <a
                      className="block text-[11px] font-semibold text-[#1c1d1f] hover:text-[#e97819] transition-colors break-all leading-snug"
                      href="mailto:printone.graphics21@gmail.com"
                      data-testid="link-email-contact"
                    >
                      printone.graphics21@gmail.com
                    </a>
                    <a
                      className="block text-[10px] text-[#77736d] hover:text-[#e97819] transition-colors break-all leading-snug"
                      href="mailto:printonebyculla@gmail.com"
                      data-testid="link-email-alternate"
                    >
                      printonebyculla@gmail.com
                    </a>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#f0ece4]">
                  <a
                    href="mailto:printone.graphics21@gmail.com"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#e97819] hover:text-[#cb5f09] transition-colors"
                  >
                    Compose mail <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>

              {/* Card 2: Contacts */}
              <div className="flex flex-col justify-between rounded-xl border border-[#e4ddd3] bg-white p-3.5 shadow-sm hover:border-[#e97819]/50 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-1.5 text-[#e97819]">
                    <Phone size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-[.08em] text-[#1c1d1f]">Contacts</h3>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px]">
                    <a
                      className="block text-[#494a49] hover:text-[#e97819] transition-colors leading-snug"
                      href="tel:+919594005894"
                      data-testid="link-phone-jogendra"
                    >
                      <span className="font-semibold text-[#1c1d1f]">Jogendra:</span> +91 95940 05894
                    </a>
                    <a
                      className="block text-[#494a49] hover:text-[#e97819] transition-colors leading-snug"
                      href="tel:+919819124907"
                      data-testid="link-phone-shashank"
                    >
                      <span className="font-semibold text-[#1c1d1f]">Shashank:</span> +91 98191 24907
                    </a>
                    <a
                      className="block text-[#494a49] hover:text-[#e97819] transition-colors leading-snug"
                      href="tel:+919773081431"
                      data-testid="link-phone-nitesh"
                    >
                      <span className="font-semibold text-[#1c1d1f]">Nitesh:</span> +91 97730 81431
                    </a>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#f0ece4]">
                  <a
                    href={createWhatsAppUrl('Hello Print One Graphics, I would like to discuss a project.')}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0f766e] hover:text-[#0b5852] transition-colors"
                    data-testid="link-contact-whatsapp"
                  >
                    <MessageCircle size={11} /> WhatsApp <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>

              {/* Card 3: Address */}
              <div className="flex flex-col justify-between rounded-xl border border-[#e4ddd3] bg-white p-3.5 shadow-sm hover:border-[#e97819]/50 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-1.5 text-[#e97819]">
                    <MapPin size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-[.08em] text-[#1c1d1f]">Address</h3>
                  </div>
                  <div className="mt-2 text-[11px] leading-snug text-[#494a49]">
                    <p className="font-semibold text-[#1c1d1f]">Byculla Service Ind. Premises</p>
                    <p className="text-[#615e58]">Unit 309, A-Wing, Byculla East, Mumbai – 400027</p>
                    <p className="mt-1 text-[10px] text-[#77736d]">Mon–Sat: 9:30 AM–8:00 PM</p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#f0ece4]">
                  <a
                    href="https://maps.google.com/?q=Byculla+Service+Industrial+Premises+Mumbai"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#e97819] hover:text-[#cb5f09] transition-colors"
                    data-testid="link-contact-map"
                  >
                    Google Maps <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Established Credibility Strip */}
      <section className="border-y border-[#e2dbd1] bg-[#f5f1e9]">
        <div className="page-wrap grid gap-5 py-6 sm:grid-cols-3">
          <p className="text-xs font-semibold text-[#696761]">
            <span className="mr-2 text-[#e97819]">01</span>Established in 2021
          </p>
          <p className="text-xs font-semibold text-[#696761]">
            <span className="mr-2 text-[#e97819]">02</span>Based in Byculla East, Mumbai
          </p>
          <p className="text-xs font-semibold text-[#696761]">
            <span className="mr-2 text-[#e97819]">03</span>Serving organisations across India
          </p>
        </div>
      </section>
    </main>
  );
}
