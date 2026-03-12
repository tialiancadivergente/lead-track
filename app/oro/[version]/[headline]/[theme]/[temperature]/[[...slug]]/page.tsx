"use client";

import { useParams } from "next/navigation";
import Formv1 from "@/app/oro/[version]/v1";
import Formv2 from "@/app/oro/[version]/v2";
import SplashScreenOro from "@/app/components/SplashScreen/SplashScreenOro";
import Formv3 from "@/app/oro/[version]/v3";
import Formv4 from "@/app/oro/[version]/v4";
import Formv5 from "@/app/oro/[version]/v5";

export default function Home() {
  const { version } = useParams();

  if (version === "v5") {
    return (
      <SplashScreenOro>
        <Formv5 />
      </SplashScreenOro>
    );
  }

 if (version === "v4") {
    return (
      <SplashScreenOro>
        <Formv4 />
      </SplashScreenOro>
    )
  }
  if (version === "v3") {
    return (
      <SplashScreenOro>
        <Formv3 />
      </SplashScreenOro>
    )
  }

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
