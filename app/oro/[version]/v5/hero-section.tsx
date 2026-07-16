"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { CalendarDays, Smartphone } from "lucide-react";
import { LeadCaptureForm, type LeadCaptureSubmitData } from "@/app/components/form/lead-capture-form";

interface ContainerProps {
  titleRedLine: ReactNode | null;
  redLine: ReactNode | null;
  formName: string;
  onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
  submitError?: string | null;
}

const marqueeItems = Array.from({ length: 8 });

export default function HeroSection({ titleRedLine, redLine, formName, onSubmit, submitError }: ContainerProps) {
  return (
    <>
      <section
        id="hero"
        className="relative flex h-[1120px] flex-col items-center justify-start overflow-hidden bg-[#071117] bg-[url('/images/oro/v5.1/bg_primeira_dobra_mobile.png')] bg-cover bg-top px-4 pt-2 md:h-[902px] md:bg-[url('/images/oro/v5.1/bg_primeira_dobra_desktop.png')] md:px-0"
      >
        <div className="relative mx-auto flex w-full flex-col items-center justify-start pt-2 md:w-[1080px] md:flex-row md:items-start md:justify-start md:pt-6">
          <div className="flex h-[135px] w-full max-w-[348px] justify-center md:hidden">
            <Image
              src="/images/oro/v5.1/logo.svg"
              alt="Resgate dos Otimistas"
              width={348}
              height={135}
              priority
              className="pointer-events-none h-[135px] w-[348px] max-w-full translate-x-[35px] select-none object-contain"
            />
          </div>

          <div className="pointer-events-none absolute hidden md:left-[-100px] md:top-[20px] md:block">
            <Image
              src="/images/oro/v5.1/logo.svg"
              alt="Resgate dos Otimistas"
              width={723}
              height={225}
              priority
              className="h-auto w-[723px] select-none object-contain"
            />
          </div>

          <div className="w-full max-w-[348px] md:mt-[250px] md:max-w-[520px]">
            <div className="mt-3 flex h-[18px] w-full items-center gap-4 whitespace-nowrap font-raleway text-[14px] font-medium leading-[135%] text-[#F4F0E1] md:hidden">
              <div className="flex items-center gap-2">
                <CalendarDays className="shrink-0 text-[#C0964B]" size={14} />
                <span>20, 21 e 22/Julho | Às 19h55</span>
              </div>

              <div className="flex items-center gap-2">
                <Smartphone className="shrink-0 text-[#C0964B]" size={14} />
                <span>Online e Gratuito</span>
              </div>
            </div>

            <div className="mt-3 hidden items-center gap-5 text-[#F4F0E1] md:flex">
              <div className="flex items-center gap-2 text-[14px] font-medium">
                <CalendarDays className="text-[#C0964B]" size={16} />
                <span>20, 21 e 22/Julho | Às 19h55</span>
              </div>

              <div className="flex items-center gap-2 text-[14px] font-medium">
                <Smartphone className="text-[#C0964B]" size={16} />
                <span>Online e Gratuito</span>
              </div>
            </div>

            <div className="mt-4 h-[87px] w-full font-spectral text-[24px] font-extrabold uppercase leading-[120%] text-[#F4F0E1] md:hidden">
              Faça seu diagnóstico de dependência <span className="text-[#C0964B]">emocional</span> gratuito
            </div>

            <div className="mt-6 hidden text-left md:block">
              <div className="font-spectral text-[36px] font-extrabold leading-none text-[#F4F0E1]">{titleRedLine}</div>
            </div>

            <div className="mb-5 mt-3 h-[66px] w-full font-spectral text-[16px] font-normal leading-[135%] text-[#D3CAC0] md:hidden">
              Descubra quais padrões invisíveis travam o seu financeiro e aprenda como superá-los na{" "}
              <span className="font-bold text-[#C0964B]">Última Edição do Resgate dos Otimistas.</span>
            </div>

            <div className="mb-8 mt-4 hidden max-w-[460px] font-spectral text-[20px] leading-[135%] text-[#D3CAC0] md:block">
              {redLine || (
                <>
                  Descubra como <span className="font-bold text-[#C0964B]">aumentar o seu nível de permissão</span> e melhorar seus resultados nas finanças, nos relacionamentos e na saúde.
                </>
              )}
            </div>

            <div className="w-full md:max-w-[460px]">
              <LeadCaptureForm
                formName={formName}
                onSubmit={onSubmit}
                submitError={submitError}
                submitLabel="PARTICIPAR GRATUITAMENTE"
                submittingLabel="ENVIANDO..."
                emailInputClassName="h-[58px] w-full rounded-full border border-[#D9D3BA] bg-[#F4F0E11A] px-5 text-[#F4F0E1] placeholder:text-[#F4F0E1]"
                ddiSelectClassName="h-[58px] rounded-l-full border border-r-0 border-[#D9D3BA] bg-[#F4F0E11A] pl-10 pr-2 text-[#F4F0E1] focus:outline-none [&>option]:bg-black [&>option]:text-white"
                phoneInputClassName="!h-[58px] w-full rounded-r-full border border-l-0 border-[#D9D3BA] bg-[#F4F0E11A] px-4 text-[#F4F0E1] placeholder:text-[#F4F0E1] focus:outline-none"
                buttonClassName="h-14 w-full rounded-full border-2 border-transparent px-6 font-raleway text-base font-extrabold uppercase text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 [background:linear-gradient(88.53deg,_#FFD17E_0%,_#B37E21_100%)_padding-box,_linear-gradient(180deg,_#FFDA99_0%,_#AD7512_100%)_border-box] shadow-[0_6px_13px_rgba(179,126,33,0.25)]"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 flex h-[25px] w-screen -translate-x-1/2 items-center overflow-hidden border border-[#C0964B] bg-[#07242C] md:hidden">
          <div className="hero-mobile-marquee flex w-max shrink-0 items-center whitespace-nowrap">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 items-center gap-[8px] pr-[8px]">
                {marqueeItems.map((_, index) => (
                  <div key={index} className="flex shrink-0 items-center gap-[8px]">
                    <span className="font-raleway text-[8px] font-medium uppercase leading-none tracking-[0.02em] text-[#F4F0E1]">
                      O ÚLTIMO RESGATE DOS OTIMISTAS
                    </span>
                    <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-white" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-mobile-marquee {
          animation: hero-mobile-marquee 22s linear infinite;
          will-change: transform;
        }

        @keyframes hero-mobile-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}