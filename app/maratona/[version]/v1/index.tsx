"use client";

import type { LeadCaptureSubmitData } from "@/app/components/form/lead-capture-form";
import ContainerTeste from "./container";

export default function Formv1() {
  const handleSubmit = async (_data: LeadCaptureSubmitData) => {};

  return (
    <ContainerTeste
      titleRedLine={null}
      redLine={null}
      formName="maratona"
      onSubmit={handleSubmit}
      submitError={null}
    />
  );
}