"use client";

import React from "react";
import Image from "next/image";
import {
	LeadCaptureForm,
	LeadCaptureSubmitData,
} from "@/app/components/form/lead-capture-form";

interface ContainerProps {
	titleRedLine: React.ReactNode | null;
	redLine: React.ReactNode | null;
	formName: string;
	onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
	submitError?: string | null;
}

export default function HeroSection({
	titleRedLine,
	formName,
	onSubmit,
	submitError,
}: ContainerProps) {
	return (
		<section
			id="hero"
			aria-labelledby="hero-title"
			className="relative h-[816px] w-full overflow-hidden bg-black bg-[url('/super_ponto_cego/bg_primeira_dobra_mobile.png.png')] bg-cover bg-top bg-no-repeat md:h-[975px] md:bg-[url('/super_ponto_cego/bg_primeira_dobra_desktop.png')]"
		>
			<div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col items-center md:block">
				<Image
					src="/super_ponto_cego/logo_super_ponto_cego.svg"
					alt="Super Ponto Cego"
					width={511}
					height={84}
					priority
					className="relative mt-[clamp(202px,54vw,214px)] h-auto w-[clamp(160px,44vw,176px)] shrink-0 select-none md:absolute md:left-0 md:top-[366px] md:mt-0 md:w-[511px]"
				/>

				<div className="relative mt-[16px] w-[calc(100%-24px)] max-w-[350px] text-center md:absolute md:left-0 md:top-[497px] md:mt-0 md:w-[622px] md:max-w-none md:text-left">
					{titleRedLine}
				</div>

				<div className="absolute left-[997px] top-[380px] hidden w-[260px] text-right [font-family:'Bricolage_Grotesque',sans-serif] text-[18px] leading-[24px] text-white md:block">
					<p className="font-normal">29/08/2026 · Sábado</p>
					<p className="font-bold">100% Online e Gratuito</p>
				</div>

				<div className="relative mt-[18px] w-[calc(100%-24px)] max-w-[350px] [&_form]:!gap-2 [&_form]:!space-y-2 md:absolute md:left-[684px] md:top-[762px] md:mt-0 md:w-[611px] md:max-w-none md:[&_form]:!gap-3 md:[&_form]:!space-y-3">
					<LeadCaptureForm
						formName={formName}
						onSubmit={onSubmit}
						submitError={submitError}
						emailInputClassName="h-[40px] w-full rounded-full border border-[#676767] bg-[#171717]/80 px-4 [font-family:'Bricolage_Grotesque',sans-serif] text-[11px] font-light text-white placeholder:text-[#B8B8B8] focus:outline-none md:h-[52px] md:px-5 md:text-[14px]"
						ddiSelectClassName="h-[40px] rounded-l-full border border-r-0 border-[#676767] bg-[#171717]/80 py-0 pl-9 pr-2 [font-family:'Bricolage_Grotesque',sans-serif] text-[11px] text-white focus:outline-none md:h-[52px] md:pl-11 md:text-[14px]"
						phoneInputClassName="!h-[40px] w-full rounded-r-full border border-l-0 border-[#676767] bg-[#171717]/80 px-3 py-0 [font-family:'Bricolage_Grotesque',sans-serif] text-[11px] text-white placeholder:text-[#B8B8B8] focus:outline-none md:!h-[52px] md:px-4 md:text-[14px]"
						buttonClassName="h-[40px] w-full rounded-full border border-[#00B46C] bg-gradient-to-r from-[#008C57] to-[#00A96B] px-4 [font-family:'Bricolage_Grotesque',sans-serif] text-[11px] font-bold uppercase text-white shadow-[0_0_18px_rgba(0,174,105,0.28)] transition-all hover:brightness-110 md:h-[52px] md:text-[12px]"
					/>
				</div>

				<div className="relative mt-[18px] w-[calc(100%-56px)] max-w-[300px] text-center [font-family:'Bricolage_Grotesque',sans-serif] text-[clamp(12px,3.6vw,14px)] font-light leading-[1.45] text-white md:absolute md:left-[684px] md:top-[508px] md:mt-0 md:w-[611px] md:max-w-none md:text-left md:text-[20px] md:leading-[1.5]">
					<p>
						Você provavelmente já tem capacidade, inteligência e disposição
						para ir muito mais longe. O que você ainda não consegue enxergar é
						por que, mesmo assim, continua no mesmo lugar.
					</p>

					<p className="mt-[14px] md:mt-[24px]">
						No <strong className="font-bold">Super Ponto Cego</strong>, Elton
						Euler vai revelar os padrões invisíveis que fazem pessoas
						esforçadas continuarem distantes do sucesso e do dinheiro que já
						poderiam ter alcançado.
					</p>
				</div>
			</div>
		</section>
	);
}