"use client";

import SplashScreen from "@/app/components/SplashScreen";
import { useParams } from "next/navigation";
import Formv1 from "@/app/oro/[version]/v1";

export default function Home() {
  const { version } = useParams();

  return (
    <SplashScreen>
      <Formv1 />
    </SplashScreen>
  );
}
