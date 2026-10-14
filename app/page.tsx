import { HeroShowcase } from '@/components/hero-showcase';
import { ProductionTicker } from '@/components/production-ticker';
import { StudioPressDuality } from '@/components/studio-press-duality';
import { TactileSpecimenBar } from '@/components/tactile-specimen-bar';
import { InteractiveCapabilities } from '@/components/interactive-capabilities';
import { ProductionJourney } from '@/components/production-journey';
import { SwatchEnquiryBanner } from '@/components/swatch-enquiry-banner';

export default function HomePage() {
  return (
    <main>
      {/* 1. Interactive Hero with Live Specimen Console */}
      <HeroShowcase />

      {/* 2. Continuous Production & Credibility Ticker */}
      <ProductionTicker />

      {/* 3. The Studio & The Press: Two Worlds, One Roof */}
      <StudioPressDuality />

      {/* 4. The Materials & Tactile Finishes Laboratory */}
      <TactileSpecimenBar />

      {/* 5. Filterable Capabilities & Services Grid */}
      <InteractiveCapabilities />

      {/* 6. The 4-Phase Production Journey */}
      <ProductionJourney />

      {/* 7. Closing Consultation & Swatchkit Banner */}
      <SwatchEnquiryBanner />
    </main>
  );
}
