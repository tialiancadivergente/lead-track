"use client";

import { useParams } from "next/navigation";
import Formv1 from "@/app/oro/[version]/v1";
import Formv2 from "@/app/oro/[version]/v2";
import SplashScreenOro from "@/app/components/SplashScreen/SplashScreenOro";

export default function Home() {
  const { version } = useParams();

  if (version === "v2") {
    return (
      <SplashScreenOro>
        <Formv2 />
      </SplashScreenOro>
    )
  }

  return (
    <SplashScreenOro>
      <Formv1 />
    </SplashScreenOro>
  );
}
