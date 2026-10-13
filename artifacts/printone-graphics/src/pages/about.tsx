import { ArrowRight, Compass, Handshake, Lightbulb, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import { Link } from 'wouter';

const values = [
  { title: 'Quality & professionalism', icon: ShieldCheck, copy: 'Thoughtful design and careful production, with attention to the details that shape the final piece.' },
  { title: 'Customer satisfaction', icon: Handshake, copy: 'Clear communication and practical support from the first conversation through production.' },
  { title: 'Integrity & transparency', icon: Compass, copy: 'Straightforward conversations, dependable coordination and a shared understanding of the brief.' },
  { title: 'Innovation & improvement', icon: Lightbulb, copy: 'Continually improving how creative thinking and production expertise work together.' },
  { title: 'Timely execution', icon: Timer, copy: 'Careful planning across design, print and finishing to keep work moving.' },
  { title: 'Long-term partnerships', icon: Sparkles, copy: 'Relationships built on trust, consistency and a genuine investment in your work.' },
];

export default function About() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#27292a] text-white">
        <div className="page-wrap grid min-h-[500px] items-center gap-10 py-16 md:grid-cols-[1.15fr_.85fr]">
          <div className="reveal">
            <p className="eyebrow text-[#d1ccc3]">About PrintOne</p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(3.2rem,7vw,6.4rem)] font-extrabold leading-[.91] tracking-[-.075em]">A partner in<br />making <span className="text-[#f08a29]">things</span><br />matter.</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#cbc7be]">PrintOne Graphics transforms ideas into impactful print solutions through creative design, digital printing, quality production and dependable service.</p>
          </div>
          <div className="relative flex min-h-[270px] items-center justify-center md:min-h-[390px]">
            <div className="absolute h-[280px] w-[280px] rounded-full border border-[#515252] sm:h-[350px] sm:w-[350px]"></div>
            <div className="absolute h-[205px] w-[205px] rounded-full border border-dashed border-[#515252] sm:h-[260px] sm:w-[260px]"></div>
            <div className="absolute h-[120px] w-[120px] rounded-full border border-[#515252]"></div>
            <div className="relative z-10 text-center"><span className="block font-display text-8xl font-extrabold tracking-[-.1em] text-[#f08a29]">01</span><span className="mt-2 block text-[10px] font-bold uppercase tracking-[.2em] text-[#d1ccc3]">Established 2021</span></div>
            <span className="absolute left-[18%] top-[24%] h-4 w-4 rounded-full bg-[#ef801e]"></span>
            <span className="absolute right-[13%] top-[40%] h-3 w-3 rounded-full bg-[#43a9c5]"></span>
            <span className="absolute bottom-[18%] left-[25%] h-3 w-3 rounded-full bg-[#dc3f85]"></span>
            <span className="absolute bottom-[25%] right-[22%] h-3 w-3 rounded-full bg-[#e7c627]"></span>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="page-wrap grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow">Our story</p><h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-[-.06em] sm:text-5xl">A practical kind of creative.</h2></div>
          <div className="max-w-[720px]">
            <p className="text-[17px] leading-8 text-[#383938]">Established in 2021 and based in Byculla East, Mumbai, PrintOne Graphics provides comprehensive printing and corporate communication solutions to businesses, listed companies, educational institutions, publishers and organisations across India.</p>
            <p className="mt-5 text-sm leading-7 text-[#6a6862]">Our work brings creative expertise, modern digital printing technology and practical production experience together. From initial design and content preparation to printing, finishing and final delivery, we manage the connected details that help a project feel considered from beginning to end.</p>
            <p className="mt-5 text-sm leading-7 text-[#6a6862]">Printed materials represent more than paper and ink. They represent an organisation’s identity, credibility and values. We approach each assignment with attention to detail and a commitment to delivering value.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#ede8de] py-16 sm:py-20">
        <div className="page-wrap">
          <div className="max-w-[680px]"><p className="eyebrow">What guides us</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.06em] sm:text-5xl">Clear intent. Work that follows through.</h2></div>
          <div className="mt-10 grid gap-x-14 md:grid-cols-2">
            <div className="border-t border-[#d4ccbf] py-6">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e97819]">Our vision</p>
              <p className="mt-4 font-display text-2xl font-bold leading-snug">To become a trusted and preferred partner for printing, publishing, corporate communications and gifting solutions.</p>
              <p className="mt-3 text-sm leading-6 text-[#74716b]">We pursue this through consistent value, innovation and quality.</p>
            </div>
            <div className="border-t border-[#d4ccbf] py-6">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e97819]">Our mission</p>
              <p className="mt-4 font-display text-2xl font-bold leading-snug">To provide end-to-end print solutions that help organisations communicate more effectively.</p>
              <p className="mt-3 text-sm leading-6 text-[#74716b]">Creative design, modern technology, competitive pricing and dependable delivery come together in our work.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="page-wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Our core values</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.06em] sm:text-5xl">The way we do the work.</h2></div><p className="max-w-sm text-sm leading-6 text-[#6a6862]">Good partnerships grow from the principles behind the process.</p></div>
          <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, icon: Icon, copy }, index) => <article key={title} className="border-t border-[#d7d1c8] py-6" data-testid={`value-card-${index + 1}`}>
              <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[.15em] text-[#e97819]">0{index + 1}</span><Icon size={18} strokeWidth={1.5} className="text-[#848077]" /></div>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#74716b]">{copy}</p>
            </article>)}
          </div>
        </div>
      </section>
      <section className="bg-[#27292a] text-white">
        <div className="page-wrap grid gap-7 py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="eyebrow text-[#d1ccc3]">Start with a conversation</p><h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">Your next idea has a place to begin.</h2></div>
          <Link href="/contact" className="btn-primary" data-testid="link-about-contact">Talk to our team <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
