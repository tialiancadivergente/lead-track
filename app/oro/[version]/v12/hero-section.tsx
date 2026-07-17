"use client";

import type { ReactNode } from "react";
import { CalendarDays, Smartphone } from "lucide-react";
import { LeadCaptureForm, type LeadCaptureSubmitData } from "@/app/components/form/lead-capture-form";

interface ContainerProps {
  titleRedLine: ReactNode | null;
  redLine: ReactNode | null;
  formName: string;
  onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
  submitError?: string | null;
}

export default function HeroSection({ titleRedLine, redLine, formName, onSubmit, submitError }: ContainerProps) {
  return (
    <section
      id="hero"
      aria-label="Inscrição para o Último Resgate dos Otimistas"
      className="relative flex min-h-[889px] items-center justify-center overflow-hidden bg-[#071117] bg-[url('/images/oro/v12/bg_primeira_dobra_mobile.png')] bg-cover bg-top px-4 md:min-h-[898px] md:bg-[url('/images/oro/v12/bg_primeira_dobra_desktop.png')] md:px-6"
    >
      <div className="relative mx-auto flex min-h-[889px] w-full min-w-0 max-w-[1200px] items-center justify-center md:min-h-[898px] md:justify-start">
      <div className="flex w-full min-w-0 max-w-[420px] translate-y-[180px] flex-col items-center text-center md:max-w-[780px] md:-translate-y-[60px] md:items-start md:text-left">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 whitespace-nowrap font-raleway text-[12px] font-medium leading-[135%] text-[#07242C] sm:text-[14px] md:justify-start md:gap-x-5">
            <div className="flex items-center justify-center gap-2">
              <CalendarDays className="shrink-0 text-[#A50F13]" size={16} aria-hidden="true" />
              <span>20, 21 e 22/07 | Às 19h55</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Smartphone className="shrink-0 text-[#A50F13]" size={16} aria-hidden="true" />
              <span>Online e Gratuito</span>
            </div>
          </div>

          <div className="mt-5 w-full min-w-0 max-w-full px-0.5 text-center md:px-0 md:text-left">{titleRedLine}</div>

          <div className="mb-7 mt-4 w-full min-w-0 max-w-[560px] text-center md:text-left">{redLine}</div>

          <div className="mx-auto w-full max-w-[460px] text-left md:mx-0">
            <LeadCaptureForm
              formName={formName}
              onSubmit={onSubmit}
              submitError={submitError}
              submitLabel="PARTICIPAR GRATUITAMENTE"
              submittingLabel="ENVIANDO..."
              emailInputClassName="h-[58px] w-full rounded-full border border-[#D9D3BA] bg-[#F4F0E11A] px-5 text-left text-[#07242C] placeholder:text-[#07242C]"
              ddiSelectClassName="h-[58px] rounded-l-full border border-r-0 border-[#D9D3BA] bg-[#F4F0E11A] pl-10 pr-2 text-left text-[#07242C] focus:outline-none [&>option]:bg-white [&>option]:text-[#07242C]"
              phoneInputClassName="!h-[58px] w-full rounded-r-full border border-l-0 border-[#D9D3BA] bg-[#F4F0E11A] px-4 text-left text-[#07242C] placeholder:text-[#07242C] focus:outline-none"
              buttonClassName="h-14 w-full rounded-full border-2 border-transparent px-6 text-center font-raleway text-base font-extrabold uppercase text-[#07242C] shadow-[0_6px_13px_rgba(0,138,19,0.25)] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 [background:linear-gradient(88.53deg,_#16FFA6_0%,_#12ED28_100%)_padding-box,_linear-gradient(180deg,_#90FF9F_0%,_#008A13_100%)_border-box]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}