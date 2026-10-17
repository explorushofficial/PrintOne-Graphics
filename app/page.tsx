import { HeroShowcase } from '@/components/hero-showcase';
import { ProductionTicker } from '@/components/production-ticker';
import { VisionMissionValues } from '@/components/vision-mission-values';
import { StudioPressDuality } from '@/components/studio-press-duality';
import { TactileSpecimenBar } from '@/components/tactile-specimen-bar';
import { InteractiveCapabilities } from '@/components/interactive-capabilities';
import { Testimonials } from '@/components/testimonials';
import { ProductionJourney } from '@/components/production-journey';
import { getProducts } from '@/sanity/lib/fetchData';

export const instant = false;

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      {/* 1. Interactive Hero with Live Specimen Console & Client Value Proposition */}
      <HeroShowcase />

      {/* 2. Continuous Production & Core Expertise Ticker */}
      {/* <ProductionTicker /> */}

      {/* 3. Our Vision, Mission & Values + Core Expertise (Client Brief) */}
      {/* <VisionMissionValues showExpertise={true} /> */}

      {/* 4. The Studio & The Press: Two Worlds, One Roof */}
      {/* <StudioPressDuality /> */}

      {/* 5. The Materials & Tactile Finishes Laboratory */}
      {/* <TactileSpecimenBar /> */}

      {/* 6. Filterable Capabilities & Services Grid */}
      {/* <InteractiveCapabilities initialProducts={products} /> */}

      {/* 7. The 4-Phase Production Journey: From Concept to Delivery */}
      {/* <ProductionJourney /> */}

      {/* 8. Client Testimonials (Trusted by Businesses. Proven by Results) */}
      {/* <Testimonials /> */}
    </main>
  );
}

