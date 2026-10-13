import type { Metadata } from 'next';
import { services } from '@/data/services';
import { ProductsClient } from './products-client';

export const metadata: Metadata = {
  title: 'Print & Digital Printing Services',
  description:
    'Explore annual reports, commercial and digital printing, educational publications, corporate gifting, packaging, finishing and creative design in one place.',
  openGraph: {
    title: 'Print & Digital Printing Services | PrintOne Graphics',
    description:
      'Explore annual reports, commercial and digital printing, educational publications, corporate gifting, packaging, finishing and creative design in one place.',
  },
};

export default function ProductsPage() {
  return <ProductsClient services={services} />;
}
