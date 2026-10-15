import type { Metadata } from 'next';
import { products } from '@/data/products';
import { ProductsClient } from './products-client';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printonegraphics.in';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse the official products catalog of Print One Graphics: brochures, corporate stationery, textbooks, journals, custom calendars, diaries, packaging boxes, and promotional merchandise.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Products | Print One Graphics',
    description:
      'Browse brochures, corporate stationery, textbooks, journals, custom calendars, diaries, packaging boxes, and promotional merchandise by Print One Graphics, Mumbai.',
    url: `${siteUrl}/products`,
    siteName: 'Print One Graphics',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/printone-og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Print One Graphics Products Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | Print One Graphics',
    description:
      'Explore corporate print products, annual reports, publications, and custom corporate gifting.',
    images: ['/printone-og-banner.jpg'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Products',
      item: `${siteUrl}/products`,
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductsClient products={products} />
    </>
  );
}
