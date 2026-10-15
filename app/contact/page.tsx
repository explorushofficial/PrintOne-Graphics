import type { Metadata } from 'next';
import { ContactClient } from './contact-client';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printonegraphics.in';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Print One Graphics in Byculla East, Mumbai. Phone: +91 98191 24907 / +91 95940 05894. Email: printone.graphics21@gmail.com. Discuss annual reports, commercial printing, or corporate gifting.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Print One Graphics',
    description:
      'Contact Print One Graphics in Byculla East, Mumbai about annual reports, commercial printing, educational publications, or corporate gifting.',
    url: `${siteUrl}/contact`,
    siteName: 'Print One Graphics',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/printone-og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Print One Graphics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Print One Graphics',
    description:
      'Contact Print One Graphics in Byculla East, Mumbai. Phone: +91 98191 24907 / +91 95940 05894.',
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
      name: 'Contact Us',
      item: `${siteUrl}/contact`,
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
