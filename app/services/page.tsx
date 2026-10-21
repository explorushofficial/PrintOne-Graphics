import type { Metadata } from 'next';
import { getServices } from '@/sanity/lib/fetchData';
import { ServicesClient } from './services-client';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printonegraphics.in';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore comprehensive print production services by PrintOne Graphics in Byculla East, Mumbai: commercial offset printing, high-speed digital printing, annual reports, publication typesetting, packaging, and custom corporate gifting.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | PrintOne Graphics',
    description:
      'Full-spectrum commercial offset printing, digital printing, annual reports, corporate gifting, packaging boxes, and publication printing in Mumbai.',
    url: `${siteUrl}/services`,
    siteName: 'PrintOne Graphics',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/printone-og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'PrintOne Graphics Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | PrintOne Graphics',
    description:
      'Commercial offset & digital printing, annual reports, publications, and corporate gifting in Mumbai.',
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
      name: 'Services',
      item: `${siteUrl}/services`,
    },
  ],
};

export const instant = false;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicesClient services={services} />
    </>
  );
}
