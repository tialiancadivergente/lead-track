import { Suspense } from 'react'
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import JourneySection from "@/components/journey-section"
import MentorSection from "@/components/mentor-section"
import Footer from "@/components/footer"
import SplashScreen from './components/SplashScreen'
import HomeContent from './components/HomeContent'
import LoadingFallback from './components/LoadingFallback'

export default function Home() {
  return (
    <SplashScreen>
      <main>
        <Header />
        <HeroSection />
        <JourneySection />
        <MentorSection />
        <Footer />
      </main>
    </SplashScreen>
  )
} 