import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PrintOne Graphics',
    short_name: 'Print One',
    description:
      'Mumbai’s premier printing press and corporate gifting partner based in Byculla East.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f2',
    theme_color: '#e97819',
    icons: [
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
