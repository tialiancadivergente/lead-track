"use client";

import React from "react";
import { CalendarDays, Smartphone } from "lucide-react";
import Image from "next/image";
import {
	LeadCaptureForm,
	LeadCaptureSubmitData,
} from "@/app/components/form/lead-capture-form";

interface ContainerProps {
	titleRedLine: React.ReactNode | null,
	redLine: React.ReactNode | null,
	formName: string,
	onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
	submitError?: string | null;
}

export default function HeroSection({
	titleRedLine,
	redLine,
	formName,
	onSubmit,
	submitError
}: ContainerProps) {
	return (
		<section
			id="hero"
			className={`relative h-[882px] md:h-[928px] flex flex-col items-center p-4 md:p-0 justify-start overflow-hidden bg-[#071117] bg-[url('/images/odml/v1/bg_primeira_dobra_mobile.webp')] md:bg-[url('/images/odml/v1/bg_primeira_dobra_desktop.webp')] bg-cover bg-center z-0`}
		>
			<div
				className={`mx-auto sm:px-4 2md:pt-6 pt-1 relative lg:w-[1080px] w-full flex justify-center md:justify-start`}
			>
				<div className="w-full max-w-[440px] md:max-w-[680px] flex flex-col items-center md:items-start">

					{/* LOGO */}
					<div className="mt-[4px] md:mt-[2px] flex justify-center md:justify-start md:ml-[-25px]">
						<Image
							src="/images/odml/v1/o_despertar_da_mulher_livre.png"
							alt="Logo o Despertar da Mulher Livre"
							width={487}
							height={178}
							priority
							className="object-contain w-[260px] md:w-[424px] h-auto select-none pointer-events-none"
						/>
					</div>

					{/* HEADLINE */}
					<div className="mt-1 mb-1 font-bebas-neue text-center md:text-left">
						<div
							className={`2md:text-[36px] text-[22px] leading-tight text-center md:text-left text-[#f4f0e1] font-spectral font-extrabold`}
						>
							{titleRedLine}
						</div>
					</div>

					{/* SUBHEADLINE */}
					<div
						className="mb-4 mt-2 text-[#D3CAC0] 2md:text-2xl text-[14px] leading-snug font-extralight font-spectral text-center md:text-left"
					>
						{redLine ? (
							redLine
						) : (
							<>
								Descubra como{" "}
								<span className="font-bold text-[#C0964B]">
									AUMENTAR O SEU NÍVEL DE PERMISSÃO
								</span>{" "}
								e melhorar seus resultados nas finanças, nos relacionamentos e
								na saúde.
							</>
						)}
					</div>

					{/* FORM */}
					<div className="max-w-lg mt-1 w-full flex justify-center md:justify-start">					
						<LeadCaptureForm
						formName={formName}
						onSubmit={onSubmit}
						submitError={submitError}
						emailInputClassName="w-full h-[58px] border border-[#D9D3BA] flex rounded-[8px] flex-1 px-4 py-4 bg-[#FFFFFF33] placeholder:text-[#FFFFFF] text-[#FFFFFF] font-raleway font-medium text-[16px]"
						ddiSelectClassName="h-[58px] min-w-[120px] max-w-[120px] flex items-center gap-2 pl-9 pr-3 bg-[#D9CFC31A] rounded-l-[8px] border border-[#D9D3BA] border-r-0 text-[#FFFFFF] font-raleway font-medium text-[16px] whitespace-nowrap focus:outline-none"
						phoneInputClassName="w-full !h-[58px] px-4 py-4 rounded-r-[8px] bg-[#FFFFFF33] placeholder:text-[#FFFFFF] text-[#FFFFFF] font-raleway font-medium text-[16px] focus:outline-none border border-[#D9D3BA] border-l-0"
						buttonClassName="w-full h-14 font-raleway font-extrabold text-[#000000] rounded-[8px] px-6 text-base uppercase tracking-wide transition-all hover:brightness-110 border border-transparent [background:linear-gradient(90deg,_#E1C371_0%,_#FCF3D4_100%)_padding-box,_linear-gradient(180deg,_rgba(255,255,255,0.25)_0%,_#FFF9E5_100%)_border-box] shadow-[0px_6px_18.9px_0px_#F7EDCC85]"
					/>
					</div>

				</div>
			</div>
		</section>
	);
}