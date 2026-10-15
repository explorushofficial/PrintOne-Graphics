'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
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
      <section className="bg-[#ede8de]">
        <div className="page-wrap grid min-h-[350px] items-end gap-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="reveal">
            <p className="eyebrow">Contact Us • Get a Quote</p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,6vw,5.5rem)] font-extrabold leading-[.93] tracking-[-.065em]">
              Let’s Create<br />
              <span className="text-[#e97819]">Something Great</span><br className="sm:hidden" /> Together.
            </h1>
            <p className="mt-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-[#e97819]">
              Your Trusted Partner for Design, Digital Printing &amp; Corporate Gifting
            </p>
          </div>
          <div className="pb-1 text-xs sm:text-sm leading-relaxed text-[#615e58]">
            <p>
              Have a printing project, annual report, publication, corporate gifting requirement or a custom design in mind? Print One Graphics is here to help.
            </p>
            <p className="mt-2.5">
              From concept and design to printing, finishing and delivery, our team provides complete solutions tailored to your requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-14 py-14 sm:py-20 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <p className="eyebrow">Get in Touch</p>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-[-.05em] text-[#1c1d1f]">
            Print One Graphics
          </h2>
          <p className="mt-1 text-xs font-semibold text-[#8e8a82] uppercase tracking-wider">
            Your Trusted Partner for Design, Digital Printing &amp; Corporate Gifting
          </p>
          <div className="mt-8 space-y-7">
            <div className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#d8d0c6] text-[#e97819]">
                <MapPin size={17} />
              </span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[.12em]">Office address</h3>
                <p className="mt-2 max-w-[300px] text-sm leading-6 text-[#6a6862]">
                  Byculla Service Industrial Premises,<br />
                  A-Wing, Unit No. 309,<br />
                  Byculla East, Mumbai – 400027,<br />
                  Maharashtra, India
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#d8d0c6] text-[#e97819]">
                <Phone size={17} />
              </span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[.12em]">Call our team</h3>
                <a
                  className="mt-3 block text-sm text-[#494a49] hover:text-[#d5680e] transition-colors"
                  href="tel:+919594005894"
                  data-testid="link-phone-jogendra"
                >
                  Jogendra Vichare · +91 95940 05894
                </a>
                <a
                  className="mt-2 block text-sm text-[#494a49] hover:text-[#d5680e] transition-colors"
                  href="tel:+919819124907"
                  data-testid="link-phone-shashank"
                >
                  Shashank Khandare · +91 98191 24907
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#d8d0c6] text-[#e97819]">
                <Mail size={17} />
              </span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[.12em]">Email</h3>
                <a
                  className="mt-2 inline-block text-sm text-[#494a49] hover:text-[#d5680e] transition-colors"
                  href="mailto:printone.graphics21@gmail.com"
                  data-testid="link-email-contact"
                >
                  printone.graphics21@gmail.com
                </a>
              </div>
            </div>
          </div>

          <a
            href={createWhatsAppUrl('Hello Print One Graphics, I would like to discuss a project.')}
            target="_blank"
            rel="noreferrer"
            className="btn-outline mt-9"
            data-testid="link-contact-whatsapp"
          >
            <MessageCircle size={16} /> Message us on WhatsApp <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="bg-[#f0ece4] p-6 sm:p-9">
          <div className="max-w-[600px]">
            <p className="eyebrow">Get a Quote / Project Brief</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-.05em]">
              Tell us about your project.
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#77736d]">
              Share a few details about your printing project, annual report, publication, or corporate gifting requirement. We will prepare your enquiry directly for our team.
            </p>
            <form className="mt-7 space-y-5" onSubmit={submitEnquiry} data-testid="form-contact-enquiry">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-semibold">
                  Your name <span className="text-[#e97819]">*</span>
                  <input
                    className="mt-2 block h-12 w-full border border-[#d3ccc2] bg-[#faf8f2] px-3 text-sm outline-none transition focus:border-[#e97819]"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    data-testid="input-contact-name"
                  />
                </label>
                <label className="block text-xs font-semibold">
                  Organisation
                  <input
                    className="mt-2 block h-12 w-full border border-[#d3ccc2] bg-[#faf8f2] px-3 text-sm outline-none transition focus:border-[#e97819]"
                    type="text"
                    autoComplete="organization"
                    value={organisation}
                    onChange={(event) => setOrganisation(event.target.value)}
                    data-testid="input-contact-organisation"
                  />
                </label>
              </div>
              <label className="block text-xs font-semibold">
                What do you need? <span className="text-[#e97819]">*</span>
                <input
                  className="mt-2 block h-12 w-full border border-[#d3ccc2] bg-[#faf8f2] px-3 text-sm outline-none transition focus:border-[#e97819]"
                  type="text"
                  required
                  placeholder="Annual report, brochure, gifting…"
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                  data-testid="input-contact-project"
                />
              </label>
              <label className="block text-xs font-semibold">
                A few details <span className="text-[#e97819]">*</span>
                <textarea
                  className="mt-2 block min-h-[130px] w-full resize-y border border-[#d3ccc2] bg-[#faf8f2] px-3 py-3 text-sm outline-none transition focus:border-[#e97819]"
                  required
                  placeholder="Tell us what you're hoping to create."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  data-testid="input-contact-message"
                />
              </label>
              <button className="btn-primary" type="submit" data-testid="button-submit-contact">
                Prepare WhatsApp message <Send size={15} />
              </button>
              <p className="text-[10px] leading-4 text-[#858178]">
                Your details aren’t submitted or stored on this website; the message opens in WhatsApp for you to review.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2dbd1] bg-[#f5f1e9]">
        <div className="page-wrap grid gap-5 py-7 sm:grid-cols-3">
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
