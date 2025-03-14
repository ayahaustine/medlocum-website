import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { ChatBubble } from "@/components/chat-bubble"
import { TrustedBy } from "@/components/trusted-by"
import { CursorEffects } from "@/components/cursor-effects"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingElements } from "@/components/floating-elements"
import { FaqSection } from "@/components/faq-section"
import { BenefitsSection } from "@/components/benefits-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ScrollProgress />
      <CursorEffects />
      <FloatingElements />
      <HeroSection />
      <ProductsSection />
      <BenefitsSection />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <TrustedBy />
      <ChatBubble />
    </main>
  )
}

