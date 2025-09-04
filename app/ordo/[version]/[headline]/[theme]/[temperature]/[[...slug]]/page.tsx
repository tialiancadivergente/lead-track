"use client";

import SplashScreen from "@/app/components/SplashScreen";
import Formv10 from "@/app/ordo/[version]/v10";
import Formv13 from "@/app/ordo/[version]/v13";
import Formv16 from "@/app/ordo/[version]/v16";
import Formv19 from "@/app/ordo/[version]/v19";
import Formv20 from "@/app/ordo/[version]/v20";
import Formv11 from "@/app/ordo/[version]/v11";
import Formv8 from "@/app/ordo/[version]/v8/indext";
import JourneySection from "@/components/journey-section"
import MentorSection from "@/components/mentor-section"
import Footer from "@/components/footer"
import { useParams } from "next/navigation";
import Formv0 from "@/app/ordo/[version]/v0";

export default function Home() {
  const { version } = useParams();

  // if (version === "v8") {
  //   return (
  //     <SplashScreen>
  //       <Formv8 />
  //       <JourneySection />
  //       <MentorSection />
  //       <Footer />
  //     </SplashScreen>
  //   );
  // }

  // if (version === "v11") {
  //   return (
  //     <SplashScreen>
  //       <Formv11 />
  //     </SplashScreen>
  //   );
  // }

  // if (version === "v13") {
  //   return (
  //     <SplashScreen>
  //       <Formv13 />
  //     </SplashScreen>
  //   );
  // }

  // if (version === "v16") {
  //   return (
  //     <SplashScreen>
  //       <Formv16 />
  //     </SplashScreen>
  //   );
  // }

  // if (version === "v19") {
  //   return (
  //     <SplashScreen>
  //       <Formv19 />
  //     </SplashScreen>
  //   );
  // }

  // if (version === "v20") {
  //   return (
  //     <SplashScreen>
  //       <Formv20 />
  //     </SplashScreen>
  //   );
  // }

  return (
    <SplashScreen>
      <Formv0 />
      {/* <Formv10 /> */}
    </SplashScreen>
  );
}
