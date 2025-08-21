"use client";

import SplashScreen from "@/app/components/SplashScreen";
import Formv10 from "@/app/ordo/[version]/v10";
import Formv19 from "@/app/ordo/[version]/v19";
import Formv20 from "@/app/ordo/[version]/v20";
import { useParams } from "next/navigation";

export default function Home() {
  const { version } = useParams();

  if (version === "v19") {
    return (
      <SplashScreen>
        <Formv19 />
      </SplashScreen>
    );
  }

  if (version === "v20") {
    return (
      <SplashScreen>
        <Formv20 />
      </SplashScreen>
    );
  }

  return (
    <SplashScreen>
      <Formv10 />
    </SplashScreen>
  );
}
