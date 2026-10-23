import { cacheTag, cacheLife } from 'next/cache';
import { client } from './client';
import { urlForImage } from './image';
import { products as mockProducts, type Product } from '@/data/products';
import { servicesData as mockServices, type ServiceItem } from '@/data/services-data';

interface SanityProductDoc {
  _id: string;
  title?: string;
  slug?: { current?: string };
  tag?: string;
  intro?: string;
  detail?: string;
  color?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  imageAlt?: string;
  order?: number;
  capabilities?: string[];
}

interface SanityServiceDoc {
  _id: string;
  number?: string;
  title?: string;
  slug?: { current?: string };
  category?: string;
  tagFilter?: string;
  shortDescription?: string;
  fullDescription?: string;
  accent?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  features?: string[];
  scopeOfWork?: string[];
  machinery?: string[];
  materials?: string[];
  turnaround?: string;
  useCases?: string[];
  order?: number;
}

/**
 * Fetches all products directly from Sanity CMS and combines them with mock data.
 * All newly published products from Sanity appear immediately at the top of the catalogue.
 */
export async function getProducts(): Promise<Product[]> {
  'use cache';
  cacheTag('products');
  cacheLife('seconds');
  let sanityMapped: Product[] = [];

  if (client) {
    try {
      const sanityProducts = await client.fetch<SanityProductDoc[]>(
        `*[_type == "product"] | order(order asc, _createdAt desc)`
      );

      if (sanityProducts && sanityProducts.length > 0) {
        sanityMapped = sanityProducts.map((p) => {
          let resolvedImage = '/catalog/brochures.jpg';
          if (p.image) {
            resolvedImage = urlForImage(p.image) || resolvedImage;
          } else if (p.imageUrl) {
            resolvedImage = p.imageUrl;
          }

          return {
            id: p.slug?.current || p._id,
            title: p.title || 'Untitled Product',
            tag: p.tag || 'Business essentials',
            intro: p.intro || 'Crafted with premium tactile finishing.',
            detail: p.detail || '',
            color: p.color || 'orange',
            image: resolvedImage,
            imageAlt: p.imageAlt || `Sample of ${p.title || 'product'}`,
            capabilities: p.capabilities || [],
          };
        });
      }
    } catch (error) {
      console.warn('[Sanity CMS] Could not fetch products, using fallback:', error);
    }
  }

  // Live Sanity CMS Products ONLY - all mock products and images removed as requested
  return sanityMapped;
}

/**
 * Fetches all services directly from Sanity CMS and combines them with mock data.
 * All newly published services from Sanity appear immediately at the top of the services section.
 */
export async function getServices(): Promise<ServiceItem[]> {
  'use cache';
  cacheTag('services');
  cacheLife('seconds');
  let sanityMapped: ServiceItem[] = [];

  if (client) {
    try {
      const sanityServices = await client.fetch<SanityServiceDoc[]>(
        `*[_type == "service"] | order(order asc, _createdAt desc)`
      );

      if (sanityServices && sanityServices.length > 0) {
        sanityMapped = sanityServices.map((s, index) => {
          let resolvedImage = '/annual-report.jpg';
          if (s.image) {
            resolvedImage = urlForImage(s.image) || resolvedImage;
          } else if (s.imageUrl) {
            resolvedImage = s.imageUrl;
          }

          const defaultNumber = String(index + 1).padStart(2, '0');

          return {
            id: s.slug?.current || s._id,
            number: s.number || defaultNumber,
            title: s.title || 'Untitled Service',
            category: s.category || 'Specialized Production & Printing',
            tagFilter: s.tagFilter || 'Commercial Print',
            shortDescription: s.shortDescription || 'Precision engineered print solutions.',
            fullDescription: s.fullDescription || s.shortDescription || '',
            image: resolvedImage,
            accent: s.accent || '#e97819',
            features: s.features || [],
            scopeOfWork: s.scopeOfWork || [],
            machinery: s.machinery || [],
            materials: s.materials || [],
            turnaround: s.turnaround || '3–5 working days post-approval',
            useCases: s.useCases || [],
          };
        });
      }
    } catch (error) {
      console.warn('[Sanity CMS] Could not fetch services, using fallback:', error);
    }
  }

  // Precedence: Live Sanity CMS Services -> Initial mock services
  const liveIds = new Set(sanityMapped.map((s) => s.id));
  const nonCollidingMock = mockServices.filter((s) => !liveIds.has(s.id));

  return [...sanityMapped, ...nonCollidingMock];
}

export interface HeroSlide {
  id: string;
  title?: string;
  src: string;
  focus: string;
  order?: number;
}

const pexels = (path: string) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=1920`;

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'default-1',
    title: 'Professional Printer in Print Studio',
    src: pexels('20042067/pexels-photo-20042067/free-photo-of-professional-printer-in-print-studio.jpeg'),
    focus: '85% center',
    order: 1,
  },
  {
    id: 'default-2',
    title: 'Precision Photo Printer',
    src: pexels('17536002/pexels-photo-17536002/free-photo-of-photo-printer.jpeg'),
    focus: '85% center',
    order: 2,
  },
  {
    id: 'default-3',
    title: 'Printing Machine in Workshop',
    src: pexels('19316522/pexels-photo-19316522/free-photo-of-printing-machine-in-workshop.png'),
    focus: '85% center',
    order: 3,
  },
];

interface SanityHeroSlideDoc {
  _id: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  focus?: string;
  order?: number;
  isActive?: boolean;
}

/**
 * Fetches active hero showcase slides directly from Sanity CMS.
 * Returns default fallback photography if no slides are published yet in Sanity.
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  'use cache';
  cacheTag('hero-slides');
  cacheLife('seconds');

  if (client) {
    try {
      const sanitySlides = await client.fetch<SanityHeroSlideDoc[]>(
        `*[_type == "heroSlide" && isActive != false] | order(order asc, _createdAt asc)`
      );

      if (sanitySlides && sanitySlides.length > 0) {
        const mapped = sanitySlides
          .map((slide) => {
            let resolvedSrc = '';
            if (slide.image) {
              resolvedSrc = urlForImage(slide.image) || '';
            } else if (slide.imageUrl) {
              resolvedSrc = slide.imageUrl;
            }

            return {
              id: slide._id,
              title: slide.title || 'PrintOne Hero Slide',
              src: resolvedSrc,
              focus: slide.focus || '85% center',
              order: slide.order ?? 1,
            };
          })
          .filter((slide) => Boolean(slide.src));

        if (mapped.length > 0) {
          return mapped;
        }
      }
    } catch (error) {
      console.warn('[Sanity CMS] Could not fetch hero slides, using fallback:', error);
    }
  }

  return DEFAULT_HERO_SLIDES;
}

