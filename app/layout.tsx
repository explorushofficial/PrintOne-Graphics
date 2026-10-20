import type { Metadata, Viewport } from 'next';
import { DM_Sans, Manrope, Lora } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--app-font-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--app-font-display',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--app-font-serif',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printonegraphics.in';
const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919594005894';
const whatsappClean = rawWhatsApp.replace(/[^\d]/g, '');

export const viewport: Viewport = {
  themeColor: '#e97819',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Print One Graphics | Design, Printing & Corporate Gifting, Mumbai',
    template: '%s | Print One Graphics',
  },
  description:
    'Print One Graphics is Mumbai’s trusted printing press located in Byculla East, delivering commercial offset & digital printing, annual reports, publications, catalogs, packaging boxes, and corporate gifting across India.',
  applicationName: 'Print One Graphics',
  authors: [{ name: 'Print One Graphics', url: siteUrl }],
  creator: 'Print One Graphics',
  publisher: 'Print One Graphics',
  category: 'Commercial Printing & Design Services',
  keywords: [
    'Print One Graphics',
    'Print One Graphics Mumbai',
    'Printing press Mumbai',
    'Commercial printing Mumbai',
    'Digital printing Byculla',
    'Annual report printing Mumbai',
    'Corporate gifting Mumbai',
    'Educational publications printing',
    'Heidelberg offset printing Mumbai',
    'Konica Minolta digital printing Mumbai',
    'Packaging boxes manufacturers Mumbai',
    'Brochures catalogues printing Mumbai',
    'Corporate diaries calendars Mumbai',
    'Printing press Byculla East',
    'Offset printers in Mumbai',
  ],
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      en: '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Print One Graphics | Design, Printing & Corporate Gifting, Mumbai',
    description:
      'Mumbai’s premier printing press in Byculla East. High precision offset & digital printing, annual reports, publications, and bespoke corporate gifting.',
    url: siteUrl,
    siteName: 'Print One Graphics',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/printone-og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Print One Graphics — Design, Print, Brand',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Print One Graphics | Design, Printing & Corporate Gifting, Mumbai',
    description:
      'Mumbai’s premier printing press in Byculla East. Commercial offset, digital printing, reports & gifting.',
    images: ['/printone-og-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Mumbai, Byculla East',
    'geo.position': '18.9750;72.8350',
    ICBM: '18.9750, 72.8350',
    target: 'all',
    coverage: 'India',
    distribution: 'Global',
    rating: 'General',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Print One Graphics',
      alternateName: ['Print One Graphics', 'Print One Graphics Mumbai'],
      url: siteUrl,
      logo: `${siteUrl}/printone-logo.png`,
      image: `${siteUrl}/printone-og-banner.jpg`,
      telephone: '+919819124907',
      email: 'printone.graphics21@gmail.com',
      sameAs: [
        'https://wa.me/919819124907',
        `https://wa.me/${whatsappClean}`,
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+919819124907',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Marathi'],
        },
        {
          '@type': 'ContactPoint',
          telephone: `+${whatsappClean}`,
          contactType: 'sales',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Marathi'],
        },
      ],
    },
    {
      '@type': ['LocalBusiness', 'PrintShop', 'ProfessionalService'],
      '@id': `${siteUrl}/#localbusiness`,
      name: 'Print One Graphics',
      parentOrganization: {
        '@id': `${siteUrl}/#organization`,
      },
      url: siteUrl,
      logo: `${siteUrl}/printone-logo.png`,
      image: `${siteUrl}/printone-og-banner.jpg`,
      description:
        'Print One Graphics is Mumbai’s premier printing press and corporate gifting provider based in Byculla East, delivering commercial offset, digital printing, annual reports, packaging boxes, and publications across India.',
      telephone: '+919819124907',
      email: 'printone.graphics21@gmail.com',
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Credit Card, Bank Transfer, NEFT',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Byculla East',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400027',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 18.975,
        longitude: 72.835,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:30',
          closes: '20:00',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'State', name: 'Maharashtra' },
        { '@type': 'Country', name: 'India' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Printing & Gifting Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Offset & Digital Printing',
              description:
                'High-volume offset printing on Heidelberg presses and precision digital printing on Konica Minolta AccurioPress C7100.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Annual Reports & Corporate Publications',
              description:
                'Comprehensive design, typesetting, paper selection, and precision production for corporate annual reports and magazines.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Corporate Gifting & Custom Packaging',
              description:
                'Luxury diaries, calendars, rigid presentation boxes, and branded merchandise.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Print One Graphics',
      description: 'Premier printing and design partner in Byculla East, Mumbai.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'en-IN',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${manrope.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          <div className="grain min-h-[100dvh] flex flex-col justify-between">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
