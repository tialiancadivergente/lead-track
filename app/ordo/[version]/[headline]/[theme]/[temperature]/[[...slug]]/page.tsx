"use client"

import SplashScreen from "@/app/components/SplashScreen"
import Formv10 from "@/app/ordo/[version]/v10"
import Formv19 from "@/app/ordo/[version]/v19"
import { useParams } from "next/navigation"


export default function Home() {
  const { version } = useParams()

  if (version === 'v19') {
    
    return (
        <SplashScreen>
          <Formv19 />
        </SplashScreen>
    )
  }

  return (
    <SplashScreen>
      <Formv10 />
    </SplashScreen>
  )
} 