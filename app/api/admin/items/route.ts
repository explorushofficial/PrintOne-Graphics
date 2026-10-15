import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { client, writeClient } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { isSanityConfigured, hasWriteAccess } from '@/sanity/env';

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
 * Returns ONLY items that actually exist in Sanity CMS Cloud.
 * Does not include mock data, so the admin panel strictly reflects your real CMS database.
 */
export async function GET() {
  let products: Array<{
    id: string;
    title: string;
    tag: string;
    intro: string;
    detail: string;
    color: string;
    image: string;
    imageAlt: string;
    capabilities: string[];
  }> = [];

  let services: Array<{
    id: string;
    number: string;
    title: string;
    category: string;
    tagFilter: string;
    shortDescription: string;
    fullDescription: string;
    image: string;
    accent: string;
    features: string[];
    scopeOfWork: string[];
    machinery: string[];
    materials: string[];
    turnaround: string;
    useCases: string[];
  }> = [];

  if (client) {
    try {
      const [sanityProducts, sanityServices] = await Promise.all([
        client.fetch<SanityProductDoc[]>(
          `*[_type == "product"] | order(order asc, _createdAt desc)`
        ),
        client.fetch<SanityServiceDoc[]>(
          `*[_type == "service"] | order(order asc, _createdAt desc)`
        ),
      ]);

      if (sanityProducts && sanityProducts.length > 0) {
        products = sanityProducts.map((p) => {
          let resolvedImage = '';
          if (p.imageUrl) {
            resolvedImage = p.imageUrl;
          } else if (p.image) {
            resolvedImage = urlForImage(p.image) || '';
          }

          return {
            id: p.slug?.current || p._id,
            title: p.title || 'Untitled Product',
            tag: p.tag || 'Business essentials',
            intro: p.intro || '',
            detail: p.detail || '',
            color: p.color || 'orange',
            image: resolvedImage,
            imageAlt: p.imageAlt || `Sample of ${p.title || 'product'}`,
            capabilities: p.capabilities || [],
          };
        });
      }

      if (sanityServices && sanityServices.length > 0) {
        services = sanityServices.map((s, idx) => {
          let resolvedImage = '';
          if (s.imageUrl) {
            resolvedImage = s.imageUrl;
          } else if (s.image) {
            resolvedImage = urlForImage(s.image) || '';
          }

          return {
            id: s.slug?.current || s._id,
            number: s.number || String(idx + 1).padStart(2, '0'),
            title: s.title || 'Untitled Service',
            category: s.category || '',
            tagFilter: s.tagFilter || 'Commercial Print',
            shortDescription: s.shortDescription || '',
            fullDescription: s.fullDescription || '',
            image: resolvedImage,
            accent: s.accent || '#e97819',
            features: s.features || [],
            scopeOfWork: s.scopeOfWork || [],
            machinery: s.machinery || [],
            materials: s.materials || [],
            turnaround: s.turnaround || '',
            useCases: s.useCases || [],
          };
        });
      }
    } catch (err) {
      console.warn('[Sanity CMS] Admin items fetch from Sanity failed:', err);
    }
  }

  return NextResponse.json({
    sanityConfigured: isSanityConfigured,
    hasWriteAccess,
    totalProducts: products.length,
    totalServices: services.length,
    products,
    services,
  });
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type'); // 'product' | 'service'

    if (!id || !type) {
      return NextResponse.json({ error: 'Missing id or type parameter' }, { status: 400 });
    }

    if (!writeClient) {
      return NextResponse.json(
        { error: 'Sanity write client is not configured to delete documents' },
        { status: 400 }
      );
    }

    const docId = id.startsWith(`${type}-`) ? id : `${type}-${id}`;

    // Direct deletion from Sanity CMS
    await writeClient.delete(docId);

    try {
      revalidateTag('products', 'seconds');
      revalidateTag('services', 'seconds');
      revalidatePath('/', 'layout');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${type} from Sanity CMS successfully`,
    });
  } catch (error) {
    console.error('Error deleting from Sanity CMS:', error);
    return NextResponse.json(
      { error: 'Failed to delete item from Sanity CMS' },
      { status: 500 }
    );
  }
}
