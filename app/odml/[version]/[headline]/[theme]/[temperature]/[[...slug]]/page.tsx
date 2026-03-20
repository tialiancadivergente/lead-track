"use client";

import { useParams } from "next/navigation";
import Formv1 from "@/app/odml/[version]/v1";
import SplashScreenOro from "@/app/components/SplashScreen/SplashScreenOro";


export default function Home() {
  const { version } = useParams();


  return (
    <SplashScreenOro>
      <Formv1 />
    </SplashScreenOro>
  );
}
