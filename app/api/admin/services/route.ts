import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { writeClient } from '@/sanity/lib/client';
import { isSanityConfigured } from '@/sanity/env';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      number,
      category,
      tagFilter,
      shortDescription,
      fullDescription,
      accent = '#e97819',
      image,
      features = [],
      scopeOfWork = [],
      machinery = [],
      materials = [],
      turnaround,
      useCases = [],
      order = 1,
      sanityAssetId,
    } = body;

    if (!title || !shortDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: title or shortDescription' },
        { status: 400 }
      );
    }

    if (!isSanityConfigured) {
      return NextResponse.json(
        {
          error:
            'NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local. Please add your Sanity project ID.',
        },
        { status: 400 }
      );
    }

    if (!writeClient) {
      return NextResponse.json(
        {
          error:
            'SANITY_API_WRITE_TOKEN is not configured in .env.local. Please create an Editor token at sanity.io/manage and add SANITY_API_WRITE_TOKEN=... to allow saving into Sanity CMS.',
        },
        { status: 400 }
      );
    }

    const slugString = (id || body.slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const docId = id ? (id.startsWith('service-') ? id : `service-${id}`) : `service-${slugString}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityDoc: { _id: string; _type: string; [key: string]: any } = {
      _id: docId,
      _type: 'service',
      number: number || '01',
      title: title.trim(),
      slug: { _type: 'slug', current: slugString },
      category: category || 'Specialized Production & Printing',
      tagFilter: tagFilter || 'Commercial Print',
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription ? fullDescription.trim() : shortDescription.trim(),
      imageUrl: image || '',
      accent: accent || '#e97819',
      features: Array.isArray(features) ? features : [],
      scopeOfWork: Array.isArray(scopeOfWork) ? scopeOfWork : [],
      machinery: Array.isArray(machinery) ? machinery : [],
      materials: Array.isArray(materials) ? materials : [],
      turnaround: turnaround || '3–5 working days post-approval',
      useCases: Array.isArray(useCases) ? useCases : [],
      order: Number(order) || 1,
    };

    if (sanityAssetId) {
      sanityDoc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: sanityAssetId,
        },
      };
    }

    // Direct write to Sanity CMS Cloud
    const result = await writeClient.createOrReplace(sanityDoc);

    // Invalidate caches so the main site and services page immediately reflect the new service
    try {
      revalidateTag('services', 'seconds');
      revalidatePath('/', 'layout');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Service successfully saved directly in Sanity CMS!',
      service: {
        id: slugString,
        number: result.number,
        title: result.title,
        category: result.category,
        tagFilter: result.tagFilter,
        shortDescription: result.shortDescription,
        fullDescription: result.fullDescription,
        image: result.imageUrl || image || '/annual-report.jpg',
        accent: result.accent,
        features: result.features,
        machinery: result.machinery,
      },
      sanityDocId: result._id,
    });
  } catch (error) {
    console.error('Error saving service directly in Sanity CMS:', error);
    return NextResponse.json(
      { error: 'Failed to write service to Sanity CMS' },
      { status: 500 }
    );
  }
}
