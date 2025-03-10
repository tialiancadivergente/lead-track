import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import JourneySection from "@/components/journey-section"
import MentorSection from "@/components/mentor-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <JourneySection />
      <MentorSection />
      <Footer />
    </main>
  )
}

