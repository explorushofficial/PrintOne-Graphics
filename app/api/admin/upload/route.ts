import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';
import { isSanityConfigured } from '@/sanity/env';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    if (!isSanityConfigured || !writeClient) {
      return NextResponse.json(
        {
          error:
            'Sanity Write Token is required to upload images directly to Sanity Cloud. Please add SANITY_API_WRITE_TOKEN in .env.local',
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directly to Sanity Cloud CDN (zero local file storage)
    const asset = await writeClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type || 'image/jpeg',
    });

    return NextResponse.json({
      success: true,
      url: asset.url, // Live Sanity Cloud CDN URL: https://cdn.sanity.io/images/...
      sanityAssetId: asset._id,
    });
  } catch (error) {
    console.error('Error uploading directly to Sanity CMS:', error);
    return NextResponse.json(
      { error: 'Failed to upload image directly to Sanity CMS Cloud' },
      { status: 500 }
    );
  }
}
