import Hero from '../components/Hero/Hero';
import VisionHero from '../components/Vision/VisionHero';
import VisionStats from '../components/Vision/VisionStats';
import VisionCTA from '../components/Vision/VisionCTA';
import Features from '../components/Features/Features';
import Benefits from '../components/Benefits/Benefits';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import Pricing from '../components/Pricing/Pricing';
import Founders from '../components/Founders/Founders';
import FAQ from '../components/FAQ/FAQ';

function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <VisionHero />
      <VisionStats />
      <VisionCTA />
      <Features />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Founders />
      <FAQ />
    </div>
  );
}

export default Home;