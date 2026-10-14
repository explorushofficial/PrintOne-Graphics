import type { Metadata } from 'next';
import { AboutClient } from './about-client';

export const metadata: Metadata = {
  title: 'About PrintOne Graphics | Mumbai Print & Design Partner',
  description:
    'Established in 2021, PrintOne Graphics combines creative design, digital printing, and production for organisations across India from Byculla East, Mumbai.',
  openGraph: {
    title: 'About PrintOne Graphics | Mumbai Print & Design Partner',
    description:
      'Established in 2021, PrintOne Graphics combines creative design, digital printing, and production for organisations across India from Byculla East, Mumbai.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
