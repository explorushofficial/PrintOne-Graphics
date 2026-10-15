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

export async function getStoredLocalItems(): Promise<{ products: Product[]; services: ServiceItem[] }> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const storePath = path.join(process.cwd(), 'data', 'custom-store.json');
    const content = await fs.readFile(storePath, 'utf-8');
    const data = JSON.parse(content);
    return {
      products: Array.isArray(data.products) ? data.products : [],
      services: Array.isArray(data.services) ? data.services : [],
    };
  } catch {
    return { products: [], services: [] };
  }
}

/**
 * Fetches all products from Sanity CMS & custom store and seamlessly combines them with existing mock data.
 * Any product added via the Admin Panel will immediately reflect at the top of the catalogue.
 */
export async function getProducts(): Promise<Product[]> {
  'use cache';
  const localItems = await getStoredLocalItems();
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
          };
        });
      }
    } catch (error) {
      console.warn('[Sanity CMS] Could not fetch products, using local store and mock data:', error);
    }
  }

  // Precedence: Sanity -> Local Admin Items -> Mock data (no duplicates by id)
  const combinedLive = [...sanityMapped, ...localItems.products];
  const liveIds = new Set(combinedLive.map((p) => p.id));
  const nonCollidingMock = mockProducts.filter((p) => !liveIds.has(p.id));

  return [...combinedLive, ...nonCollidingMock];
}

/**
 * Fetches all services from Sanity CMS & custom store and seamlessly combines them with existing mock data.
 * Any service added via the Admin Panel will immediately reflect at the top of the services section.
 */
export async function getServices(): Promise<ServiceItem[]> {
  'use cache';
  const localItems = await getStoredLocalItems();
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
      console.warn('[Sanity CMS] Could not fetch services, using local store and mock data:', error);
    }
  }

  // Precedence: Sanity -> Local Admin Items -> Mock data
  const combinedLive = [...sanityMapped, ...localItems.services];
  const liveIds = new Set(combinedLive.map((s) => s.id));
  const nonCollidingMock = mockServices.filter((s) => !liveIds.has(s.id));

  return [...combinedLive, ...nonCollidingMock];
}
