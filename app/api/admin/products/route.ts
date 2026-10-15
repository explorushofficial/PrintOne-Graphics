import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      tag,
      intro,
      detail,
      color = 'orange',
      image,
      imageAlt,
      order = 1,
    } = body;

    if (!title || !tag || !detail) {
      return NextResponse.json(
        { error: 'Missing required fields: title, tag, or detail' },
        { status: 400 }
      );
    }

    const slugString = (body.slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProduct = {
      id: slugString,
      title: title.trim(),
      tag,
      intro: intro || 'Precision crafted printed collateral.',
      detail: detail.trim(),
      color: color || 'orange',
      image: image || '/catalog/brochures.jpg',
      imageAlt: imageAlt || `Sample of ${title}`,
      order: Number(order) || 1,
    };

    // 1. Save to custom-store.json for immediate reflection on live site
    const storePath = path.join(process.cwd(), 'data', 'custom-store.json');
    const content = await fs.readFile(storePath, 'utf-8').catch(() => '{"products":[],"services":[]}');
    const store = JSON.parse(content);
    store.products = [newProduct, ...(store.products || []).filter((p: { id: string }) => p.id !== newProduct.id)];
    await fs.writeFile(storePath, JSON.stringify(store, null, 2), 'utf-8');

    // 2. If Sanity writeClient is active, also push to Sanity CMS
    let sanityDocId = null;
    if (writeClient) {
      try {
        const sanityDoc = await writeClient.create({
          _type: 'product',
          title: newProduct.title,
          slug: { _type: 'slug', current: newProduct.id },
          tag: newProduct.tag,
          intro: newProduct.intro,
          detail: newProduct.detail,
          color: newProduct.color,
          imageUrl: newProduct.image,
          imageAlt: newProduct.imageAlt,
          order: newProduct.order,
        });
        sanityDocId = sanityDoc._id;
      } catch (err) {
        console.warn('[Sanity CMS] Could not push to Sanity writeClient:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product successfully added and live on the website!',
      product: newProduct,
      sanityDocId,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
