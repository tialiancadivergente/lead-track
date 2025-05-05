"use client"

import { Suspense } from 'react'
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import JourneySection from "@/components/journey-section"
import MentorSection from "@/components/mentor-section"
import Footer from "@/components/footer"
import SplashScreen from '../components/SplashScreen'
import HomeContent from '../components/HomeContent'
import LoadingFallback from '../components/LoadingFallback'
import { useParams, useSearchParams, useRouter } from "next/navigation"
import Form from './form-v1'


export default function Home() {
  const params = useParams()
  const temperatura = params.temperatura as string;
  let form;
  if (temperatura.indexOf('v1') != -1) {
    form = 'v1';
  } else {
    form = 'v9';
  }

  if (form === 'v1') {
    return <Form />
  }

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