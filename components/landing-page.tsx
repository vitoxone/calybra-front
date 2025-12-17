import Navbar from "./navbar"
import Hero from "./hero"
import StatsSection from "./stats-section"
import FeaturesGrid from "./features-grid"
import HowItWorks from "./how-it-works"
import Pricing from "./pricing"
import CTASection from "./cta-section"
import Footer from "./footer"

export default function LandingPage({ onLogin }: { onLogin?: () => void }) {
  return (
    <div className="min-h-screen">
      <Navbar onLogin={onLogin} />
      <Hero />
      <StatsSection />
      <FeaturesGrid />
      <HowItWorks />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  )
}
