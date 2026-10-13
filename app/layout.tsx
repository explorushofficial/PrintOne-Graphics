import type { Metadata } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
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
  variable: '--app-font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://printonegraphics.com'),
  title: {
    default: 'PrintOne Graphics | Mumbai Print & Design Solutions',
    template: '%s | PrintOne Graphics',
  },
  description:
    'Design, digital printing, annual reports, publications and corporate gifting from PrintOne Graphics in Mumbai, serving organisations across India.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'PrintOne Graphics | Mumbai Print & Design Solutions',
    description:
      'Design, digital printing, annual reports, publications and corporate gifting from PrintOne Graphics in Mumbai, serving organisations across India.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrintOne Graphics | Mumbai Print & Design Solutions',
    description:
      'Design, digital printing, annual reports, publications and corporate gifting from PrintOne Graphics in Mumbai, serving organisations across India.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
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
