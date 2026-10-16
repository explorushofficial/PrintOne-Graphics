import type { Metadata } from 'next';
import { QuoteFormClient } from './quote-form-client';

export const metadata: Metadata = {
  title: 'Print Specification & Custom Quote Form',
  description:
    'Submit detailed technical specifications for your print jobs — paper GSM, size, cover finishes, inside pages, binding, and special finishes. Get an instant quote directly via WhatsApp from Print One Graphics, Mumbai.',
  keywords: [
    'print specification form',
    'print quotation Mumbai',
    'offset printing quote',
    'annual report printing spec',
    'brochures printing quotation',
    'packaging box quote Mumbai',
    'custom printing inquiry WhatsApp',
    'Print One Graphics quote form',
  ],
  alternates: {
    canonical: '/quote',
  },
  openGraph: {
    title: 'Print Job Specification & Custom Quote | Print One Graphics',
    description:
      'Fill out your exact paper GSM, finishing, binding, and size specifications. Connect directly to our printing specialists via WhatsApp.',
    url: '/quote',
  },
};

export default function QuotePage() {
  return <QuoteFormClient />;
}
