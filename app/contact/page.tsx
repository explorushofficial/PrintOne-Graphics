import type { Metadata } from 'next';
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact PrintOne Graphics | Discuss Your Print Project',
  description:
    'Contact PrintOne Graphics in Byculla East, Mumbai about annual reports, print, publications, corporate gifting or custom design. Call, email or message us.',
  openGraph: {
    title: 'Contact PrintOne Graphics | Discuss Your Print Project',
    description:
      'Contact PrintOne Graphics in Byculla East, Mumbai about annual reports, print, publications, corporate gifting or custom design. Call, email or message us.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
