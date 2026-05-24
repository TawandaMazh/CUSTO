import Hero from '../components/Hero';
import TrustTicker from '../components/TrustTicker';
import ScrollShowcase from '../components/ScrollShowcase';
import HowItWorks from '../components/HowItWorks';
import TechniqueCards from '../components/TechniqueCards';
import PricingSection from '../components/PricingSection';
import Gallery from '../components/Gallery';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <ScrollShowcase />
      <HowItWorks />
      <TechniqueCards />
      <PricingSection />
      <Gallery />
      <CTASection />
    </>
  );
}
