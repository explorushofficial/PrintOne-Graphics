import { NextResponse } from 'next/server';
import { getProducts, getServices, getStoredLocalItems } from '@/sanity/lib/fetchData';
import { isSanityConfigured, hasWriteAccess } from '@/sanity/env';
import { writeClient } from '@/sanity/lib/client';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const [products, services, localStore] = await Promise.all([
    getProducts(),
    getServices(),
    getStoredLocalItems(),
  ]);

  return NextResponse.json({
    sanityConfigured: isSanityConfigured,
    hasWriteAccess,
    totalProducts: products.length,
    totalServices: services.length,
    customProductsCount: localStore.products.length,
    customServicesCount: localStore.services.length,
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

    // 1. Delete from local custom store if present
    const storePath = path.join(process.cwd(), 'data', 'custom-store.json');
    const content = await fs.readFile(storePath, 'utf-8').catch(() => '{"products":[],"services":[]}');
    const store = JSON.parse(content);

    if (type === 'product') {
      store.products = (store.products || []).filter((p: { id: string }) => p.id !== id);
    } else if (type === 'service') {
      store.services = (store.services || []).filter((s: { id: string }) => s.id !== id);
    }

    await fs.writeFile(storePath, JSON.stringify(store, null, 2), 'utf-8');

    // 2. Delete from Sanity CMS if writeClient is configured
    if (writeClient) {
      try {
        await writeClient.delete(id);
      } catch (err) {
        console.warn('[Sanity CMS] Could not delete from Sanity directly:', err);
      }
    }

    return NextResponse.json({ success: true, message: `Deleted ${type} successfully` });
  } catch (error) {
    console.error('Error in DELETE /api/admin/items:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
