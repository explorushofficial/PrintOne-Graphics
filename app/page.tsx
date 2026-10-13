import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FileText,
  Gift,
  Layers3,
  Printer,
  ScanLine,
} from 'lucide-react';
import { ServiceCard } from '@/components/service-card';
import { services } from '@/data/services';

const capabilityIcons = [FileText, Printer, BookOpen, Gift];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#e5ded4]">
        <div className="page-wrap grid min-h-[650px] items-center gap-12 py-14 lg:grid-cols-[.94fr_1.06fr] lg:py-16">
          <div className="relative z-10 reveal">
            <p className="eyebrow">Mumbai · Print · Design · Publishing</p>
            <h1 className="mt-7 max-w-[620px] font-display text-[clamp(3.15rem,7vw,6.6rem)] font-extrabold leading-[.91] tracking-[-.075em]">
              Thoughtful work.<br />
              <span className="text-[#e97819]">Beautifully</span><br />
              made tangible.
            </h1>
            <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-[#66645f]">
              From the first idea to the finished piece, PrintOne brings creative thinking and careful production under one roof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary" data-testid="link-hero-services">
                Explore what we make <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline" data-testid="link-hero-contact">
                Start a conversation <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-[#e0d9cf] pt-5">
              <div className="flex -space-x-1">
                <span className="h-2 w-7 bg-[#e97819]"></span>
                <span className="h-2 w-7 bg-[#2c9fc3]"></span>
                <span className="h-2 w-7 bg-[#cf2879]"></span>
                <span className="h-2 w-7 bg-[#e7c627]"></span>
                <span className="h-2 w-7 bg-[#27292a]"></span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#77736d]">
                One partner, from idea to impression
              </p>
            </div>
          </div>
          <div className="relative reveal reveal-delay">
            <div className="absolute -right-7 -top-7 hidden h-36 w-36 border border-[#e5ded4] lg:block"></div>
            <div className="relative overflow-hidden bg-[#e9e2d7]">
              <img
                src="/print-editorial.jpg"
                alt="A considered arrangement of printed reports, stationery, books and brand materials"
                className="h-[420px] w-full object-cover sm:h-[510px] lg:h-[550px]"
                data-testid="img-home-editorial"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-[#faf8f2]/95 px-4 py-3">
                <ScanLine size={18} className="text-[#e97819]" />
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[.13em] text-[#77736d]">
                    Designed to be held
                  </span>
                  <span className="font-display text-sm font-bold">Made for real-world impact</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden h-24 w-24 border-b-2 border-r-2 border-[#e97819] md:block"></div>
            <div className="absolute -left-5 top-12 hidden -rotate-90 text-[9px] font-bold uppercase tracking-[.22em] text-[#74716a] lg:block">
              PRINTONE / MUMBAI / INDIA
            </div>
          </div>
        </div>
        <a
          href="#capabilities"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-[#77736d] lg:flex"
          aria-label="Scroll to our capabilities"
        >
          <ArrowDown size={14} /> Scroll to explore
        </a>
      </section>

      <section id="capabilities" className="bg-[#242627] py-8 text-[#f8f4eb]">
        <div className="page-wrap grid grid-cols-2 gap-y-7 md:grid-cols-4">
          {['Annual reports', 'Commercial print', 'Education & publishing', 'Corporate gifting'].map((item, index) => {
            const Icon = capabilityIcons[index];
            return (
              <div
                key={item}
                className="flex items-center gap-3 border-[#464746] md:border-r md:px-6 first:md:pl-0 last:md:border-r-0"
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className={['text-[#f09334]', 'text-[#50b2ca]', 'text-[#e54d91]', 'text-[#e9ce3a]'][index]}
                />
                <span className="text-xs font-semibold tracking-[.02em]">{item}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-space">
        <div className="page-wrap">
          <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div>
              <p className="eyebrow">More than a print vendor</p>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-extrabold leading-[1.05] tracking-[-.06em] sm:text-5xl">
                One clear path from brief to finished piece.
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-7 text-[#6a6862] md:justify-self-end">
              We bring design, print, publishing and gifting together, so the details stay connected at every step. The result feels like your organisation, right down to the final finish.
            </p>
          </div>
          <div className="mt-12 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 border-b border-[#e97819] pb-2 text-xs font-bold hover:text-[#d5680e] transition-colors"
            data-testid="link-home-all-services"
          >
            See all capabilities <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="overflow-hidden bg-[#ede8de]">
        <div className="page-wrap grid min-h-[470px] items-center gap-10 py-16 md:grid-cols-[.9fr_1.1fr]">
          <div className="relative flex items-center justify-center">
            <div className="relative grid h-[270px] w-[270px] place-items-center rounded-full border border-[#ccc5b9] sm:h-[340px] sm:w-[340px]">
              <div className="absolute h-[72%] w-[72%] rounded-full border border-[#d0c8bc]"></div>
              <div className="absolute h-[48%] w-[48%] rounded-full border border-dashed border-[#c8c0b4]"></div>
              <div className="relative z-10 text-center">
                <span className="block font-display text-7xl font-extrabold tracking-[-.09em]">01</span>
                <span className="mt-2 block text-[9px] font-bold uppercase tracking-[.2em]">Established 2021</span>
              </div>
              <span className="absolute left-[11%] top-[24%] h-3 w-3 rounded-full bg-[#e97819]"></span>
              <span className="absolute right-[10%] top-[38%] h-3 w-3 rounded-full bg-[#2c9fc3]"></span>
              <span className="absolute bottom-[12%] left-[32%] h-3 w-3 rounded-full bg-[#cf2879]"></span>
              <span className="absolute bottom-[26%] right-[15%] h-3 w-3 rounded-full bg-[#e7c627]"></span>
            </div>
          </div>
          <div>
            <p className="eyebrow">A small studio mindset. An India-wide outlook.</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-.06em] sm:text-5xl">
              Care in the details.<br />
              Capability in the making.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#68665f]">
              PrintOne Graphics was established in 2021 with a simple belief: good work happens when creative thought and production expertise sit at the same table. From our home in Mumbai, we serve organisations across India.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-xs font-bold hover:text-[#d5680e] transition-colors"
              data-testid="link-home-about"
            >
              Meet PrintOne <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-wrap">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="eyebrow">The way we work</p>
              <h2 className="mt-5 max-w-md font-display text-4xl font-extrabold leading-[1.05] tracking-[-.06em] sm:text-5xl">
                Good work is a series of thoughtful decisions.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#6a6862]">
                A considered process makes for a more considered result. Here’s how we help your idea take shape.
              </p>
            </div>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {[
                ['01', 'Understand', 'We get to know the purpose, audience and practical needs behind your brief.'],
                ['02', 'Shape', 'Creative direction and production details come together in a clear plan.'],
                ['03', 'Make', 'Design and print move forward with care for the small things that matter.'],
                ['04', 'Deliver', 'A finished piece, ready to meet the people it was made for.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="border-t border-[#d7d1c8] py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[.15em] text-[#e97819]">{number}</span>
                    <Layers3 size={15} className="text-[#aaa49a]" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#74716b]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e97819]">
        <div className="page-wrap flex flex-col items-start justify-between gap-6 py-12 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-white/75">Have something in mind?</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
              Let’s make it real.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/65 px-5 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#27292a]"
            data-testid="link-home-cta"
          >
            Tell us about it <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
