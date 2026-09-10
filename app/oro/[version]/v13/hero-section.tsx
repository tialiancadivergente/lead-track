"use client";

import React from "react";
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
	redLine,
	formName,
	onSubmit,
	submitError
}: ContainerProps) {
	return (
		<section
			id="hero"
			aria-labelledby="hero-title"
			className="relative h-[1177px] w-full overflow-hidden bg-[#F4EBD7] bg-[url('/images/omdp/v1/bg_mobile_lp_curta.png')] bg-cover bg-top bg-no-repeat md:h-[1001px] md:bg-[url('/images/omdp/v1/bg_desktop_lp_curta.png')]"
		>
			<div className="relative mx-auto flex h-full w-full justify-center px-4 pt-[130px] md:w-[1080px] md:justify-start md:px-0 md:pt-[205px]">
				<div className="flex w-full max-w-[455px] flex-col items-center md:items-start">
					{titleRedLine}

					<div className="mt-6 w-full md:mt-7">
						{redLine}
					</div>

					<div className="mt-4 w-full max-w-[397px]">
						<LeadCaptureForm
							formName={formName}
							onSubmit={onSubmit}
							submitError={submitError}
							emailInputClassName="w-full h-[58px] flex-1 rounded-[10px] border border-[#6F6F6F] bg-[#FFFFFF0A] px-4 py-4 text-[#07242C] focus:outline-none"
							ddiSelectClassName="h-[58px] rounded-l-[10px] border border-r-0 border-[#6F6F6F] bg-[#FFFFFF0A] py-4 pl-10 pr-2 text-[#07242C] focus:outline-none"
							phoneInputClassName="w-full !h-[58px] rounded-r-[10px] border border-l-0 border-[#6F6F6F] bg-[#FFFFFF0A] px-4 py-4 text-[#07242C] focus:outline-none"
							buttonClassName="h-14 w-full rounded-[10px] border-[2.35px] border-transparent px-6 font-raleway text-base font-extrabold uppercase tracking-wide text-white transition-all hover:brightness-110 [background:linear-gradient(88.53deg,_#006D71_0%,_#0D313E_100%)_padding-box,_linear-gradient(180deg,_#006D71_0%,_#104448_100%)_border-box]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}