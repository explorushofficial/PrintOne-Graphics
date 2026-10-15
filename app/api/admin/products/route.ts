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
      tag,
      intro,
      detail,
      color = 'orange',
      image,
      imageAlt,
      order = 1,
      sanityAssetId,
      capabilities = [],
    } = body;

    if (!title || !tag || !detail) {
      return NextResponse.json(
        { error: 'Missing required fields: title, tag, or detail' },
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

    const docId = id ? (id.startsWith('product-') ? id : `product-${id}`) : `product-${slugString}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityDoc: { _id: string; _type: string; [key: string]: any } = {
      _id: docId,
      _type: 'product',
      title: title.trim(),
      slug: { _type: 'slug', current: slugString },
      tag,
      intro: intro || '',
      detail: detail.trim(),
      color: color || 'orange',
      imageUrl: image || '',
      imageAlt: imageAlt || `Sample of ${title}`,
      order: Number(order) || 1,
      capabilities: Array.isArray(capabilities)
        ? capabilities.map((c: string) => String(c).trim()).filter(Boolean)
        : typeof capabilities === 'string'
        ? capabilities
            .split('\n')
            .map((c) => c.trim())
            .filter(Boolean)
        : [],
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

    // Invalidate caches so the main site and products page immediately reflect the new product
    try {
      revalidateTag('products', 'seconds');
      revalidatePath('/', 'layout');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Product successfully saved directly in Sanity CMS!',
      product: {
        id: slugString,
        title: result.title,
        tag: result.tag,
        intro: result.intro,
        detail: result.detail,
        color: result.color,
        image: result.imageUrl || image || '/catalog/brochures.jpg',
        imageAlt: result.imageAlt,
        capabilities: result.capabilities || [],
      },
      sanityDocId: result._id,
    });
  } catch (error) {
    console.error('Error saving product directly in Sanity CMS:', error);
    return NextResponse.json(
      { error: 'Failed to write product to Sanity CMS' },
      { status: 500 }
    );
  }
}
