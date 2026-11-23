
"use client";

import SplashScreenOro from "@/app/components/SplashScreen/SplashScreenOro";
import RpcV1 from "../../../v1";
import RpcV2 from "../../../v2";
import RpcV3 from "../../../v3";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams<{ version: string }>();

  const versions = {
    v1: RpcV1,
    v2: RpcV2,
    v3: RpcV3,
  };

  const Quiz = versions[params.version as keyof typeof versions] || RpcV1;

  return (
    <SplashScreenOro>
      <Quiz />
    </SplashScreenOro>
  );
}
