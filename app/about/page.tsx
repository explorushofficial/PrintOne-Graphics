import type { Metadata } from 'next';
import { AboutClient } from './about-client';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printonegraphics.in';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Established in 2021 in Byculla East, Mumbai, Print One Graphics combines creative design, Heidelberg offset printing, and modern Konica Minolta digital presses to serve businesses across India.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Print One Graphics',
    description:
      'Established in 2021 in Byculla East, Mumbai, Print One Graphics combines creative design, Heidelberg offset printing, and modern Konica Minolta digital presses to serve businesses across India.',
    url: `${siteUrl}/about`,
    siteName: 'Print One Graphics',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/printone-og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'About Print One Graphics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Print One Graphics',
    description:
      'Mumbai’s premier printing press and corporate gifting partner in Byculla East.',
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
      name: 'About Us',
      item: `${siteUrl}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
