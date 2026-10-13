import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { ServiceCard } from '@/components/service-card';
import { createWhatsAppUrl } from '@/components/cart-context';
import { services } from '@/data/services';

const filters = ['All work', 'Design + print', 'Business essentials', 'Books + learning', 'Gifting + merchandise', 'Production', 'Ideas to artwork'];

export default function Products() {
  const [filter, setFilter] = useState('All work');
  const visible = filter === 'All work' ? services : services.filter((service) => service.tag === filter);
  return (
    <main>
      <section className="bg-[#ede8de]">
        <div className="page-wrap grid min-h-[370px] items-end gap-8 py-14 md:grid-cols-[1fr_auto] md:py-16">
          <div className="reveal">
            <p className="eyebrow">What we make</p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(3.4rem,8vw,7rem)] font-extrabold leading-[.9] tracking-[-.075em]">Made for<br /><span className="text-[#e97819]">your world.</span></h1>
          </div>
          <p className="max-w-[330px] pb-1 text-sm leading-7 text-[#66645f]">From the annual report that tells your year to the notebook someone keeps close, explore our capabilities and start an enquiry.</p>
        </div>
      </section>
      <section className="page-wrap py-10 sm:py-14">
        <div className="flex flex-col justify-between gap-6 border-b border-[#ddd6cc] pb-6 lg:flex-row lg:items-center">
          <div><p className="eyebrow">Our capabilities</p><p className="mt-3 text-sm text-[#77736d]">Thoughtfully connected services, shaped around what you need.</p></div>
          <div className="flex flex-wrap gap-2" aria-label="Filter service offerings">
            {filters.map((item) => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`border px-3 py-2 text-[10px] font-semibold transition-colors ${filter === item ? 'border-[#27292a] bg-[#27292a] text-white' : 'border-[#d9d2c8] text-[#696761] hover:border-[#e97819] hover:text-[#d5680e]'}`} data-testid={`button-filter-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>{item}</button>)}
          </div>
        </div>
        <div className="mt-5 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => <ServiceCard key={service.id} service={service} index={services.indexOf(service)} />)}
        </div>
        {visible.length === 0 && <div className="py-24 text-center text-sm text-[#77736d]">No offerings in this category.</div>}
      </section>
      <section className="bg-[#27292a] text-white">
        <div className="page-wrap grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e8a15c]">A different idea?</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.05em]">Tell us what you’re trying to make.</h2><p className="mt-2 text-sm text-[#c7c2b8]">We’ll help you find the right way to bring it to life.</p></div>
          <div className="flex flex-wrap gap-3">
            <a className="btn-primary" href={createWhatsAppUrl('Hello PrintOne Graphics, I have a custom project enquiry.')} target="_blank" rel="noreferrer" data-testid="link-custom-whatsapp"><MessageCircle size={15} /> Custom request</a>
            <Link href="/contact" className="btn-outline border-[#74736e] text-white hover:bg-white hover:text-[#27292a]" data-testid="link-products-contact">Contact details <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
