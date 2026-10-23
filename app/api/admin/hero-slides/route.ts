import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { client, writeClient } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { isSanityConfigured } from '@/sanity/env';

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

export async function GET() {
  if (!client) {
    return NextResponse.json({ slides: [] });
  }

  try {
    const rawSlides = await client.fetch<SanityHeroSlideDoc[]>(
      `*[_type == "heroSlide"] | order(order asc, _createdAt desc)`
    );

    const slides = (rawSlides || []).map((slide, index) => {
      let resolvedSrc = '';
      if (slide.image) {
        resolvedSrc = urlForImage(slide.image) || '';
      } else if (slide.imageUrl) {
        resolvedSrc = slide.imageUrl;
      }

      return {
        id: slide._id,
        title: slide.title || `Hero Slide ${index + 1}`,
        image: resolvedSrc,
        focus: slide.focus || '85% center',
        order: slide.order ?? index + 1,
        isActive: slide.isActive !== false,
      };
    });

    return NextResponse.json({ slides });
  } catch (err) {
    console.error('Error fetching hero slides:', err);
    return NextResponse.json({ slides: [], error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      image,
      imageUrl,
      sanityAssetId,
      focus = '85% center',
      order = 1,
      isActive = true,
    } = body;

    if (!title || (!image && !imageUrl && !sanityAssetId)) {
      return NextResponse.json(
        { error: 'Please provide both a slide title/caption and upload an image.' },
        { status: 400 }
      );
    }

    if (!isSanityConfigured) {
      return NextResponse.json(
        {
          error:
            'NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local. Please configure Sanity credentials.',
        },
        { status: 400 }
      );
    }

    if (!writeClient) {
      return NextResponse.json(
        {
          error:
            'SANITY_API_WRITE_TOKEN is not configured in .env.local. Please add your Sanity Write Token.',
        },
        { status: 400 }
      );
    }

    const cleanTitle = title.trim();
    const slugString = cleanTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'slide';

    const docId = id
      ? id.startsWith('hero-slide-')
        ? id
        : `hero-slide-${id}`
      : `hero-slide-${slugString}-${Date.now().toString(36)}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityDoc: { _id: string; _type: string; [key: string]: any } = {
      _id: docId,
      _type: 'heroSlide',
      title: cleanTitle,
      imageUrl: imageUrl || image || '',
      focus: focus || '85% center',
      order: Number(order) || 1,
      isActive: Boolean(isActive),
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

    // Invalidate caches so the main site hero section immediately reflects the new slide
    try {
      revalidateTag('hero-slides', 'seconds');
      revalidatePath('/', 'layout');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    let savedImageUrl = imageUrl || image || '';
    if (result.image) {
      savedImageUrl = urlForImage(result.image) || savedImageUrl;
    }

    return NextResponse.json({
      success: true,
      message: 'Hero slide saved directly to Sanity CMS!',
      slide: {
        id: result._id,
        title: result.title,
        image: savedImageUrl,
        focus: result.focus,
        order: result.order,
        isActive: result.isActive,
      },
    });
  } catch (error) {
    console.error('Error saving hero slide to Sanity CMS:', error);
    return NextResponse.json(
      { error: 'Failed to write hero slide to Sanity CMS' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing slide id parameter' }, { status: 400 });
    }

    if (!writeClient) {
      return NextResponse.json(
        { error: 'Sanity write client is not configured to delete documents' },
        { status: 400 }
      );
    }

    const docId = id.startsWith('hero-slide-') ? id : `hero-slide-${id}`;

    await writeClient.delete(docId);

    try {
      revalidateTag('hero-slides', 'seconds');
      revalidatePath('/', 'layout');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Hero slide deleted successfully from Sanity CMS',
    });
  } catch (error) {
    console.error('Error deleting hero slide from Sanity CMS:', error);
    return NextResponse.json(
      { error: 'Failed to delete hero slide from Sanity CMS' },
      { status: 500 }
    );
  }
}
