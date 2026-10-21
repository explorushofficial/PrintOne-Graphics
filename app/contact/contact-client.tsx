'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, FileText, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { createWhatsAppUrl } from '@/context/cart-context';

const LINE_1 = 'Let’s Create';
const LINE_2 = 'Something Great';
const LINE_3 = 'Together.';
const COMBINED_HEADLINE = `${LINE_1}\n${LINE_2}\n${LINE_3}`;

export function ContactClient() {
  const [name, setName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');

  // Continuous typing animation for the headline, matching hero-showcase on the home screen
  const [charCount, setCharCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    let restartTimeout: ReturnType<typeof setTimeout> | null = null;
    let isCancelled = false;

    const startTyping = () => {
      index = 0;
      setCharCount(0);
      setIsTypingDone(false);

      const speed = 45; // Snappy typing speed per character
      timer = setInterval(() => {
        if (isCancelled) return;
        if (index < COMBINED_HEADLINE.length) {
          index++;
          setCharCount(index);
        } else {
          setIsTypingDone(true);
          if (timer) clearInterval(timer);

          // Pause for 5 seconds after completing, then restart the animation
          restartTimeout = setTimeout(() => {
            if (!isCancelled) {
              startTyping();
            }
          }, 5000);
        }
      }, speed);
    };

    startTyping();

    return () => {
      isCancelled = true;
      if (timer) clearInterval(timer);
      if (restartTimeout) clearTimeout(restartTimeout);
    };
  }, []);

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = `Hello PrintOne Graphics,\n\n${message}\n\nName: ${name}\nOrganisation: ${organisation || 'Not specified'
      }\nProject: ${project || 'Not specified'}`;
    window.open(createWhatsAppUrl(body), '_blank', 'noopener,noreferrer');
  }

  // Derive per-line sliced text based on character progress
  const line1Limit = LINE_1.length; // 12
  const line2Limit = line1Limit + 1 + LINE_2.length; // 28
  const line3Limit = line2Limit + 1 + LINE_3.length; // 38

  const line1Text = charCount <= line1Limit ? LINE_1.slice(0, charCount) : LINE_1;
  const line2Text =
    charCount > line1Limit + 1
      ? LINE_2.slice(0, charCount - (line1Limit + 1))
      : charCount > line1Limit
      ? ''
      : '';
  const line3Text =
    charCount > line2Limit + 1
      ? LINE_3.slice(0, charCount - (line2Limit + 1))
      : charCount > line2Limit
      ? ''
      : '';

  const activeLine = charCount <= line1Limit ? 1 : charCount <= line2Limit ? 2 : 3;

  return (
    <main className="overflow-x-hidden">
      {/* 2-Grid Contact Layout */}
      <div className="page-wrap py-8 sm:py-12">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[0.88fr_1.12fr] items-start">
          {/* Left Column: Let's Create Something Great Together Branding - Animated PPT Slide-in from Left */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 space-y-5"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ded7cb] bg-[#efe9dc] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#69655e]"
              >
                <Sparkles size={11} className="text-[#DAA112]" />
                <span>Contact Us • Get a Quote</span>
              </motion.div>

              {/* Continuous character-by-character typing animation matching home screen hero */}
              <h1
                className="mt-3 min-h-[145px] sm:min-h-[160px] lg:min-h-[185px] font-display text-[clamp(2.2rem,4.2vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-.045em] text-[#10383A]"
                aria-label="Let’s Create Something Great Together."
              >
                <span className="block">
                  {line1Text}
                  {activeLine === 1 && (
                    <span
                      className={`inline-block w-[3px] sm:w-[4px] h-[0.82em] ml-1 align-baseline bg-[#DAA112] transition-opacity duration-200 ${
                        isTypingDone ? 'animate-pulse opacity-40' : 'animate-ping opacity-90'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className="block text-[#DAA112]">
                  {line2Text}
                  {activeLine === 2 && (
                    <span
                      className={`inline-block w-[3px] sm:w-[4px] h-[0.82em] ml-1 align-baseline bg-[#10383A] transition-opacity duration-200 ${
                        isTypingDone ? 'animate-pulse opacity-40' : 'animate-ping opacity-90'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className="block">
                  {line3Text}
                  {activeLine === 3 && (
                    <span
                      className={`inline-block w-[3px] sm:w-[4px] h-[0.82em] ml-1 align-baseline bg-[#DAA112] transition-opacity duration-200 ${
                        isTypingDone ? 'animate-pulse opacity-40' : 'animate-ping opacity-90'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.28 }}
                className="mt-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-[#666E51]"
              >
                Design • Digital Printing • Corporate Gifting
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-3"
            >
              <p className="text-xs sm:text-sm leading-relaxed text-[#615e58]">
                Have a printing project, annual report, corporate publication, luxury packaging or corporate gifting requirement in mind? PrintOne Graphics is here to help.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-[#615e58]">
                From concept and paper selection to printing, high-precision finishing and pan-India delivery, our team provides complete solutions tailored to your brand.
              </p>
            </motion.div>

            {/* Visual Quick Response Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="pt-2 grid grid-cols-2 gap-2.5 text-xs text-[#10383A]"
            >
              <div className="flex items-center gap-2 rounded-lg border border-[#e2dbd1] bg-white/70 p-2.5 shadow-xs backdrop-blur-xs">
                <Clock size={16} className="text-[#DAA112] shrink-0" />
                <div>
                  <p className="font-bold text-[11px] leading-tight text-[#10383A]">Fast Turnaround</p>
                  <p className="text-[10px] text-[#716e67]">Within 2 hrs on WhatsApp</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#e2dbd1] bg-white/70 p-2.5 shadow-xs backdrop-blur-xs">
                <Sparkles size={16} className="text-[#DAA112] shrink-0" />
                <div>
                  <p className="font-bold text-[11px] leading-tight text-[#10383A]">In-House Press</p>
                  <p className="text-[10px] text-[#716e67]">Byculla East, Mumbai</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form on top + 3 Cards (Email, Contacts, Address) below - Animated PPT Slide-in from Right */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3.5"
          >
            {/* The Form Box */}
            <div className="relative overflow-hidden rounded-xl border border-[#e2dbd1] bg-[#f0ece4] p-4 sm:p-6 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10383A] via-[#666E51] to-[#809276]" />

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="eyebrow">Project Brief &amp; WhatsApp Enquiry</p>
                    <h2 className="mt-0.5 font-display text-xl sm:text-2xl font-extrabold tracking-[-.03em] text-[#10383A]">
                      Tell us about your project.
                    </h2>
                  </div>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10383A] hover:text-[#666E51] transition-colors"
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
                    <label className="block text-xs font-semibold text-[#10383A]">
                      Your name <span className="text-[#809276]">*</span>
                      <input
                        className="mt-1 block h-9 sm:h-10 w-full rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 text-xs sm:text-sm outline-none transition focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        data-testid="input-contact-name"
                      />
                    </label>
                    <label className="block text-xs font-semibold text-[#10383A]">
                      Organisation / Company
                      <input
                        className="mt-1 block h-9 sm:h-10 w-full rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 text-xs sm:text-sm outline-none transition focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        type="text"
                        autoComplete="organization"
                        placeholder="e.g. Apex Enterprises"
                        value={organisation}
                        onChange={(event) => setOrganisation(event.target.value)}
                        data-testid="input-contact-organisation"
                      />
                    </label>
                  </div>

                  <label className="block text-xs font-semibold text-[#10383A]">
                    What do you need? <span className="text-[#809276]">*</span>
                    <input
                      className="mt-1 block h-9 sm:h-10 w-full rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 text-xs sm:text-sm outline-none transition focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                      type="text"
                      required
                      placeholder="e.g. Annual report, packaging boxes, diaries, catalogues…"
                      value={project}
                      onChange={(event) => setProject(event.target.value)}
                      data-testid="input-contact-project"
                    />
                  </label>

                  <label className="block text-xs font-semibold text-[#10383A]">
                    Project details &amp; specifications <span className="text-[#809276]">*</span>
                    <textarea
                      className="mt-1 block min-h-[64px] sm:min-h-[76px] w-full resize-y rounded-md border border-[#d3ccc2] bg-[#faf8f2] px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                      required
                      placeholder="Approximate quantity, paper preference (GSM/finish), timeline, or specific requirements."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      data-testid="input-contact-message"
                    />
                  </label>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <button
                      className="inline-flex h-9 sm:h-10 items-center justify-center gap-2 rounded-md bg-[#10383A] px-5 text-xs font-bold text-white shadow-sm hover:bg-[#1a4e50] transition-all"
                      type="submit"
                      data-testid="button-submit-contact"
                    >
                      Prepare WhatsApp message <Send size={13} />
                    </button>
                    <Link
                      href="/quote"
                      className="text-center sm:text-right text-[11px] font-semibold text-[#615e58] hover:text-[#10383A] transition-colors"
                      data-testid="link-contact-detailed-quote"
                    >
                      Need full technical specs? <span className="underline font-bold">Use Quote Form →</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* 3 Rounded Cards Below Form in the Right Column: Email | Contacts | Address - Staggered Slide In */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: Email */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between rounded-xl border border-[#e4ddd3] bg-white p-3.5 shadow-sm hover:border-[#10383A]/50 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[#10383A]">
                    <Mail size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-[.08em] text-[#10383A]">Email</h3>
                  </div>
                  <div className="mt-2 space-y-1">
                    <a
                      className="block text-[11px] font-semibold text-[#10383A] hover:text-[#666E51] transition-colors break-all leading-snug"
                      href="mailto:printone.graphics21@gmail.com"
                      data-testid="link-email-contact"
                    >
                      printone.graphics21@gmail.com
                    </a>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#f0ece4]">
                  <a
                    href="mailto:printone.graphics21@gmail.com"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10383A] hover:text-[#666E51] transition-colors"
                  >
                    Compose mail <ArrowUpRight size={11} />
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Contacts */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between rounded-xl border border-[#e4ddd3] bg-white p-3.5 shadow-sm hover:border-[#10383A]/50 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[#10383A]">
                    <Phone size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-[.08em] text-[#10383A]">Contacts</h3>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px]">
                    <a
                      className="block text-[#494a49] hover:text-[#10383A] transition-colors leading-snug"
                      href="tel:+919594005894"
                      data-testid="link-phone-jogendra"
                    >
                      <span className="font-semibold text-[#10383A]">Jogendra:</span> +91 95940 05894
                    </a>
                    <a
                      className="block text-[#494a49] hover:text-[#10383A] transition-colors leading-snug"
                      href="tel:+919819124907"
                      data-testid="link-phone-shashank"
                    >
                      <span className="font-semibold text-[#10383A]">Shashank:</span> +91 98191 24907
                    </a>
                    <a
                      className="block text-[#494a49] hover:text-[#10383A] transition-colors leading-snug"
                      href="tel:+919773081431"
                      data-testid="link-phone-nitesh"
                    >
                      <span className="font-semibold text-[#10383A]">Nitesh:</span> +91 97730 81431
                    </a>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#f0ece4]">
                  <a
                    href={createWhatsAppUrl('Hello PrintOne Graphics, I would like to discuss a project.')}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10383A] hover:text-[#666E51] transition-colors"
                    data-testid="link-contact-whatsapp"
                  >
                    <MessageCircle size={11} /> WhatsApp <ArrowUpRight size={11} />
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Address */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between rounded-xl border border-[#e4ddd3] bg-white p-3.5 shadow-sm hover:border-[#10383A]/50 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[#10383A]">
                    <MapPin size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-[.08em] text-[#10383A]">Address</h3>
                  </div>
                  <div className="mt-2 text-[11px] leading-snug text-[#494a49]">
                    <p className="font-semibold text-[#10383A]">Byculla Service Ind. Premises</p>
                    <p className="text-[#615e58]">Unit 309, A-Wing, Byculla East, Mumbai – 400027</p>
                    <p className="mt-1 text-[10px] text-[#77736d]">Mon–Sat: 9:30 AM–8:00 PM</p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#f0ece4]">
                  <a
                    href="https://maps.google.com/?q=Byculla+Service+Industrial+Premises+Mumbai"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10383A] hover:text-[#666E51] transition-colors"
                    data-testid="link-contact-map"
                  >
                    Google Maps <ArrowUpRight size={11} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Established Credibility Strip */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-y border-[#e2dbd1] bg-[#f5f1e9]"
      >
        <div className="page-wrap grid gap-5 py-6 sm:grid-cols-3">
          <p className="text-xs font-semibold text-[#696761]">
            <span className="mr-2 text-[#10383A]">01</span>Established in 2021
          </p>
          <p className="text-xs font-semibold text-[#696761]">
            <span className="mr-2 text-[#10383A]">02</span>Based in Byculla East, Mumbai
          </p>
          <p className="text-xs font-semibold text-[#696761]">
            <span className="mr-2 text-[#10383A]">03</span>Serving organisations across India
          </p>
        </div>
      </motion.section>
    </main>
  );
}
