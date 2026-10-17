'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { createWhatsAppUrl } from '@/context/cart-context';

interface FinishSpecimen {
  id: string;
  title: string;
  tagline: string;
  image: string;
  feel: string;
  idealFor: string;
  accent: string;
}

const SPECIMENS: FinishSpecimen[] = [
  {
    id: 'foil',
    title: 'Hot Foil Stamping',
    tagline: 'Reflective metallic warmth under dynamic light',
    image: '/catalog/thematic-cover-design.jpg',
    feel: 'Copper, gold, and matte silver bonded under heat & steel dies.',
    idealFor: 'Annual reports, luxury packaging, certificate seals.',
    accent: '#DAA112',
  },
  {
    id: 'deboss',
    title: 'Blind Letterpress & Deboss',
    tagline: 'Quiet sculptural depth without ink distraction',
    image: '/catalog/corporate-stationery.jpg',
    feel: 'Deep 3D tactile indentation pressed into high-caliper cotton paper.',
    idealFor: 'Executive business suites, monographs, institutional crests.',
    accent: '#2c9fc3',
  },
  {
    id: 'spot-uv',
    title: 'Raised Spot UV & Scodix',
    tagline: 'Gloss contrast over velvety soft-touch base',
    image: '/catalog/packaging-boxes.jpg',
    feel: 'Soft-touch velvet with raised dimensional liquid gloss accents.',
    idealFor: 'Product catalogues, commemorative covers, packaging sleeves.',
    accent: '#cf2879',
  },
  {
    id: 'sewn',
    title: 'Smyth & Singer Thread Binding',
    tagline: 'Artisanal durability with lay-flat reading comfort',
    image: '/catalog/binding.jpg',
    feel: 'Supple spine with exposed thread stitches that open completely flat.',
    idealFor: 'Annual reports, lookbooks, notebooks, educational journals.',
    accent: '#d3b72b',
  },
  {
    id: 'fine-papers',
    title: 'Curated Fine Papers (FSC)',
    tagline: 'The visceral foundation that defines every impression',
    image: '/print-editorial.jpg',
    feel: 'Warm organic textures spanning vellum, wove, and felt-marked paper.',
    idealFor: 'Corporate stationery, ESG publications, luxury brochures.',
    accent: '#10383A',
  },
];

export function TactileSpecimenBar() {
  const [selectedFinish, setSelectedFinish] = useState(0);
  const active = SPECIMENS[selectedFinish];

  return (
    <section className="border-b border-[#e2dad0] bg-[#faf8f2] py-14">
      <div className="page-wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DAA112]"></span>
              <p className="eyebrow">The Atelier Finishes Bar</p>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-[-.05em] text-[#1f2122]">
              Finishes You Can Feel.
            </h2>
          </div>
          <p className="max-w-xs text-xs text-[#6e6b64]">
            Touch is your most memorable brand asset. Click through to inspect our physical treatments.
          </p>
        </div>

        {/* Specimen Visual Selector Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SPECIMENS.map((item, idx) => {
            const isSelected = selectedFinish === idx;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFinish(idx)}
                className={`group cursor-pointer overflow-hidden rounded-lg border transition-all duration-300 ${
                  isSelected
                    ? 'border-[#10383A] ring-2 ring-[#DAA112] shadow-md'
                    : 'border-[#dfd8cc] bg-white opacity-75 hover:opacity-100 hover:border-[#b8b0a1]'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#10383A]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 truncate text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Finish Highlight Card */}
        <div className="mt-6 rounded-xl border border-[#ded7cb] bg-[#fbf9f4] p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#10383A]">
              <img
                src={active.image}
                alt={active.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span
                  className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: active.accent }}
                >
                  Physical Finish Specimen
                </span>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold">
                  {active.title}
                </h3>
                <p className="mt-1 text-xs text-white/85">“{active.tagline}”</p>
              </div>
            </div>

            <div>
              <div className="space-y-3 text-xs sm:text-sm text-[#45433d]">
                <div className="rounded border border-[#e5dfd4] bg-white p-3">
                  <span className="block font-bold text-[#1f2122] text-[10px] uppercase tracking-wider text-[#8e8a82]">
                    Sensory Feel
                  </span>
                  <span className="mt-0.5 block">{active.feel}</span>
                </div>

                <div className="rounded border border-[#e5dfd4] bg-white p-3">
                  <span className="block font-bold text-[#1f2122] text-[10px] uppercase tracking-wider text-[#8e8a82]">
                    Recommended Applications
                  </span>
                  <span className="mt-0.5 block">{active.idealFor}</span>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={createWhatsAppUrl(
                    `Hello Print One Graphics! I would like to request sample swatches of ${active.title}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full text-xs"
                >
                  <span>Request physical sample swatch</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
