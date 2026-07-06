"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
	LeadCaptureForm,
	LeadCaptureSubmitData,
} from "./lead-capture-form";

interface ContainerProps {
	titleRedLine: React.ReactNode | null;
	redLine: React.ReactNode | null;
	formName: string;
	onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
	submitError?: string | null;
}

export default function HeroSection({
	formName,
	onSubmit,
	submitError,
}: ContainerProps) {
	return (
		<section
			id="hero"
			aria-labelledby="hero-headline"
			className="
				relative
				h-[697px]
				md:h-[812px]
				flex
				flex-col
				items-center
				justify-start
				md:justify-center
				overflow-hidden
				p-4
				md:p-0
				bg-[#071117]
				bg-[url('/images/oro/v11/bg_mobile_primeira_dobra.png')]
				md:bg-[url('/images/oro/v11/bg_desktop_primeira_dobra.png')]
				bg-cover
				bg-top
				md:bg-center
				bg-no-repeat
				z-0
			"
		>
			<div
				className="
					relative
					mx-auto
					w-full
					lg:w-[1080px]
					pt-2
					2md:pt-6
					sm:px-4
					flex
					justify-center
					md:justify-center
				"
			>
				<div className="w-full max-w-[350px] md:max-w-[665px] pt-[220px] md:pt-[360px] flex flex-col items-center">
				<div className="mb-3 md:mb-1 text-center">
						<h1
							id="hero-headline"
							className="
								w-[350px]
								md:w-[626px]
								font-spectral
								text-[#FFFFFF]
								text-[24px]
								md:text-[30px]
								leading-[145%]
								md:leading-[36px]
								text-center
							"
						>
							<span className="hidden md:block">
								<span className="font-bold">
									FAÇA SEU DIAGNÓSTICO DE
								</span>
								<br />
								<span className="font-semibold">
									DEPENDÊNCIA EMOCIONAL GRATUITO
								</span>
							</span>

							<span className="block md:hidden">
								<span className="font-bold">
									FAÇA SEU DIAGNÓSTICO
								</span>
								<br />
								<span className="font-bold">
									DE DEPENDÊNCIA EMOCIONAL
								</span>
								<br />
								<span className="font-semibold">
									GRATUITO
								</span>
							</span>
						</h1>
					</div>

					<div
						className="
							w-[350px]
							md:w-[665px]
							mb-4
							md:mb-8
							font-mulish
							text-[#FFFFFF]
							text-[16px]
							md:text-[24px]
							leading-[145%]
							md:leading-[32px]
							text-center
						"
					>
						Descubra como{" "}
						<span className="font-bold">
							aumentar seu nível de permissão
						</span>{" "}
						e melhorar seus resultados nas finanças, nos relacionamentos e na
						saúde
					</div>

					<div className="w-full max-w-[350px] md:max-w-[462px]">
						<LeadCaptureForm
							formName={formName}
							onSubmit={onSubmit}
							submitError={submitError}
							submitLabel={
								<span className="inline-flex items-center gap-2">
									PARTICIPAR GRATUITAMENTE
									<ArrowUpRight size={18} aria-hidden="true" />
								</span>
							}
							emailInputClassName="w-full h-[50px] border border-[#FFFFFF] flex rounded-[4px] flex-1 px-4 py-4 bg-transparent text-[#FFFFFF] focus:text-[#FFFFFF] placeholder:text-[#FFFFFF] focus:placeholder:text-[#FFFFFF]"
							ddiSelectClassName="h-[50px] py-4 pl-10 pr-2 bg-transparent rounded-l-[4px] border border-[#FFFFFF] border-r-0 text-[#FFFFFF] focus:outline-none"
							phoneInputClassName="w-full !h-[50px] px-4 py-4 rounded-r-[4px] bg-transparent text-[#FFFFFF] focus:text-[#FFFFFF] placeholder:text-[#FFFFFF] focus:placeholder:text-[#FFFFFF] focus:outline-none border border-[#FFFFFF] border-l-0"
							buttonClassName="w-full max-w-[350px] md:max-w-[462px] h-[50px] flex items-center justify-center gap-2 whitespace-nowrap font-raleway font-extrabold text-[#FFFFFF] rounded-[4px] px-[48px] py-[16px] text-base uppercase tracking-wide transition-all hover:brightness-110 border border-transparent bg-[#F89500] shadow-[0px_6px_13px_0px_#00000033]"
						/>

						<p
							className="
								mt-3
								w-[350px]
								md:w-[462px]
								h-[24px]
								font-mulish
								font-semibold
								text-[#F89500]
								text-[14px]
								md:text-[16.53px]
								leading-[23.14px]
								text-center
							"
						>
							ONLINE E GRATUITO. 20, 21 e 22/07 – 19h55
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}