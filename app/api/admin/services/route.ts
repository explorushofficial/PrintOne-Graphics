import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
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
    } = body;

    if (!title || !shortDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: title or shortDescription' },
        { status: 400 }
      );
    }

    const slugString = (body.slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newService = {
      id: slugString,
      number: number || '01',
      title: title.trim(),
      category: category || 'Specialized Production & Printing',
      tagFilter: tagFilter || 'Commercial Print',
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription ? fullDescription.trim() : shortDescription.trim(),
      image: image || '/annual-report.jpg',
      accent: accent || '#e97819',
      features: Array.isArray(features) ? features : [],
      scopeOfWork: Array.isArray(scopeOfWork) ? scopeOfWork : [],
      machinery: Array.isArray(machinery) ? machinery : [],
      materials: Array.isArray(materials) ? materials : [],
      turnaround: turnaround || '3–5 working days post-approval',
      useCases: Array.isArray(useCases) ? useCases : [],
      order: Number(order) || 1,
    };

    // 1. Save to custom-store.json for immediate reflection on live site
    const storePath = path.join(process.cwd(), 'data', 'custom-store.json');
    const content = await fs.readFile(storePath, 'utf-8').catch(() => '{"products":[],"services":[]}');
    const store = JSON.parse(content);
    store.services = [newService, ...(store.services || []).filter((s: { id: string }) => s.id !== newService.id)];
    await fs.writeFile(storePath, JSON.stringify(store, null, 2), 'utf-8');

    // 2. If Sanity writeClient is active, push to Sanity CMS
    let sanityDocId = null;
    if (writeClient) {
      try {
        const sanityDoc = await writeClient.create({
          _type: 'service',
          number: newService.number,
          title: newService.title,
          slug: { _type: 'slug', current: newService.id },
          category: newService.category,
          tagFilter: newService.tagFilter,
          shortDescription: newService.shortDescription,
          fullDescription: newService.fullDescription,
          imageUrl: newService.image,
          accent: newService.accent,
          features: newService.features,
          scopeOfWork: newService.scopeOfWork,
          machinery: newService.machinery,
          materials: newService.materials,
          turnaround: newService.turnaround,
          useCases: newService.useCases,
          order: newService.order,
        });
        sanityDocId = sanityDoc._id;
      } catch (err) {
        console.warn('[Sanity CMS] Could not push service to Sanity writeClient:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Service successfully added and live on the website!',
      service: newService,
      sanityDocId,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
