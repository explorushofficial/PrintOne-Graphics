import { useEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CartProvider } from '@/components/cart-context';
import { Footer, Header } from '@/components/site-layout';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Products from '@/pages/products';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'PrintOne Graphics | Mumbai Print & Design Solutions',
    description: 'Design, digital printing, annual reports, publications and corporate gifting from PrintOne Graphics in Mumbai, serving organisations across India.',
  },
  '/products': {
    title: 'Print & Digital Printing Services | PrintOne Graphics',
    description: 'Explore annual reports, commercial and digital printing, educational publications, corporate gifting, packaging, finishing and creative design in one place.',
  },
  '/about': {
    title: 'About PrintOne Graphics | Mumbai Print & Design Partner',
    description: 'Established in 2021, PrintOne Graphics combines creative design, digital printing and production for organisations across India from Byculla East, Mumbai.',
  },
  '/contact': {
    title: 'Contact PrintOne Graphics | Discuss Your Print Project',
    description: 'Contact PrintOne Graphics in Byculla East, Mumbai about annual reports, print, publications, corporate gifting or custom design. Call, email or message us.',
  },
};

function PageMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const path = location.replace(/\/$/, '') || '/';
    const metadata = pageMetadata[path] ?? pageMetadata['/'];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
  }, [location]);

  return null;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <PageMetadata />
      <CartProvider>
        <div className="grain min-h-[100dvh]">
          <Header />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </CartProvider>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
