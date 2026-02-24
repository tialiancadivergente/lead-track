"use client";

import SplashScreen from "@/app/components/SplashScreen";
import { useParams } from "next/navigation";
import Formv1 from "@/app/oro/[version]/v1";
import Formv2 from "@/app/oro/[version]/v2";

export default function Home() {
  const { version } = useParams();

  if (version === "v2") {
    return (
      <SplashScreen>
        <Formv2 />
      </SplashScreen>
    )
  }

  return (
    <SplashScreen>
      <Formv1 />
    </SplashScreen>
  );
}
