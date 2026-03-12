"use client";

import { useParams } from "next/navigation";
import Formv1 from "@/app/cida/[version]/v1";

export default function Home() {
  const { version } = useParams();

  return (
    <Formv1 />
  );
}
