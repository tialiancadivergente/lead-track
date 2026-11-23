
"use client";

import SplashScreenOro from "@/app/components/SplashScreen/SplashScreenOro";
import RpcV1 from "../../../v1";
import RpcV2 from "../../../v2";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams<{ version: string }>();
  const Quiz = params.version === "v2" ? RpcV2 : RpcV1;

  return (
    <SplashScreenOro>
      <Quiz />
    </SplashScreenOro>
  );
}
