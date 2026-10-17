import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileQuestion } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center py-20">
      <div className="page-wrap text-center max-w-lg mx-auto">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#10383A]/10 text-[#10383A]">
          <FileQuestion size={36} />
        </div>
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-[-.05em]">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#696761]">
          The page you are looking for doesn’t exist or has been moved. Explore our services or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Return home <ArrowRight size={15} />
          </Link>
          <Link href="/products" className="btn-outline">
            Browse services
          </Link>
        </div>
      </div>
    </main>
  );
}
