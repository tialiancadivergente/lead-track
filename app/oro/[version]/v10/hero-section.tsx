"use client";

import React from "react";
import { CalendarDays, Smartphone } from "lucide-react";
import {
	LeadCaptureForm,
	LeadCaptureSubmitData,
} from "./lead-capture-form-wod";

interface ContainerProps {
	titleRedLine: React.ReactNode | null;
	redLine: React.ReactNode | null;
	formName: string;
	onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
	submitError?: string | null;
}

export default function HeroSection({
	titleRedLine,
	redLine,
	formName,
	onSubmit,
	submitError,
}: ContainerProps) {
	return (
		<section
			id="hero"
			className={`relative h-[894px] md:h-[860px] flex flex-col items-center p-4 md:p-0 justify-start md:justify-center overflow-hidden bg-[#071117] bg-[url('/images/oro/v9/bg_hero_wod_mobile.webp')] md:bg-[url('/images/oro/v9/bg_hero_wod_desktop.webp')] bg-cover bg-center z-0`}
		>
			<div
				className={`mx-auto sm:px-4 2md:pt-6 pt-2 relative lg:w-[1080px] w-full flex justify-center md:justify-start`}
			>
				<div className="w-full 2md:max-w-[528px] max-w-[440px] -mt-[20px] md:-mt-[100px] md:ml-[-40px]">
					<div className="mt-[180px] md:mt-0 mb-0 flex justify-start">
						<img
							src="/images/oro/v9/logo_destrave.png"
							alt="Logotipo Destrave"
							className="w-full max-w-[240px] md:max-w-[300px] h-auto object-contain select-none pointer-events-none -ml-[28px]"
						/>
					</div>

					<div className="-mt-20 md:-mt-24">
						<div
							className={`text-[#fff] font-spectral font-normal text-[14px] flex items-center mt-0 justify-start sm:gap-8 gap-2`}
						>
							<div className="flex items-center justify-center leading-none gap-2 text-[#F4F0E1] font-spectral font-normal text-xs md:text-[14px]">
								<CalendarDays className="text-[#C0964B]" size={18} />
								Terça-feira, às 20h
							</div>

							<div className="flex items-center justify-center leading-none gap-2 text-[#F4F0E1] font-spectral font-normal text-xs md:text-[14px]">
								<Smartphone className="text-[#C0964B]" size={18} />
								Online e Gratuito
							</div>
						</div>

						<div className="mt-2 mb-2 text-left">
							<div
								className={`2md:text-[36px] text-[24px] md:text-[36px] leading-[120%] text-left text-[#f4f0e1] font-spectral font-normal normal-case [&_*]:normal-case max-md:[&_*]:!text-[24px]`}
							>
								{titleRedLine}
							</div>
						</div>

						<div className="mb-5 mt-2 text-[#D3CAC0] 2md:text-2xl text-base font-extralight font-spectral max-md:!text-[18px] max-md:[&_*]:!text-[18px]">
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

						<div className="max-w-lg">
							<LeadCaptureForm
								formName={formName}
								onSubmit={onSubmit}
								submitError={submitError}
								emailInputClassName="w-full h-[58px] border border-[#B7A36D] flex rounded-full flex-1 px-7 py-3 bg-[#0F1717]/80 text-[#F4F0E1]"
								ddiSelectClassName="h-[58px] py-3 pl-10 pr-2 bg-[#0F1717]/80 rounded-l-full border border-[#B7A36D] border-r-[0px] text-[#F4F0E1] focus:outline-none"
								phoneInputClassName="w-full !h-[58px] px-4 py-3 rounded-r-full bg-[#0F1717]/80 text-[#F4F0E1] focus:outline-none border border-[#B7A36D] border-l-[0px]"
								buttonClassName="w-full h-[58px] font-raleway font-extrabold text-[#000000] rounded-full px-6 text-[15px] uppercase tracking-wide transition-all hover:brightness-105 bg-[#C0964B]"
							/>

							<div className="mt-4 flex items-center justify-start md:justify-center gap-2 text-left md:text-center">
								<div className="text-[16px] leading-none">⚠️</div>

								<p className="text-white font-spectral text-[12px] md:text-[16px] font-normal md:font-semibold leading-[140%]">
									Cadastre-se para entrar no Grupo Exclusivo e receber os
									materiais.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}