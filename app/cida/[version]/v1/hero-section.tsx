"use client";

import React from "react";
import { CalendarDays, Smartphone } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
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
	const [videoSrc, setVideoSrc] = React.useState("about:blank");

	React.useEffect(() => {
		const search = window.location.search || "?";
		const source = `https://scripts.converteai.net/38ceed6c-8f63-40f6-95cd-d6fd1194b3c6/players/69bd47beb1f8e9f7f4f1822e/v4/embed.html${search}&vl=${encodeURIComponent(window.location.href)}`;
		setVideoSrc(source);
	}, []);

	return (
		<section
			id="hero"
			className={`relative h-[894px] md:h-[902px] flex flex-col items-center p-4 md:p-0 justify-start overflow-hidden bg-[#071117] bg-[url('/images/cida/v1/background_mobile.webp')] md:bg-[url('/images/cida/v1/background_desktop.webp')] bg-cover bg-center z-0`}
		>
			<Script
				src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js"
				strategy="afterInteractive"
			/>

			<div className="mt-[350px] mb-[16px] text-center">
				<h1
					className="
					w-full max-w-[350px]
					mx-auto
					font-spectral
					font-bold
					text-[20px]
					leading-[115%]
					text-white
					text-center

					md:max-w-[880px]
					md:text-[28px]
					md:leading-[115%]
					"
				>
					<span className="block md:hidden">
						O que essas três personagens da
						<br />
						ficção têm em comum com a trava na
						<br />
						sua vida financeira e amorosa?
					</span>

					<span className="hidden md:block">
						{titleRedLine}
					</span>
				</h1>
			</div>

			<div
				className="
					mt-0
					w-full max-w-[350px]
					mx-auto
					font-spectral
					font-medium
					text-[16px]
					leading-[128%]
					text-white
					text-center

					md:max-w-[880px]
					md:text-[20px]
					md:leading-[125%]
				"
			>
				<span className="block md:hidden">
					Assista ao vídeo gratuito e descubra o padrão
					<br />
					que castra a sua Permissão para enriquecer.
				</span>

				<span className="hidden md:block">
					{redLine}
				</span>
			</div>

			<div
				className="
					mt-9
					w-[350px]
					h-[196.875px]
					relative
					flex
					items-center
					justify-center
					rounded-[16px]
					border-[2px]
					border-[#006D71]
					bg-[#252525]
					shadow-[0px_0px_80px_0px_rgba(0,109,113,0.5)]

					md:w-[460px]
					md:h-[260px]
				"
			>
				<div
					id="ifr_69bd47beb1f8e9f7f4f1822e_wrapper"
					className="w-full"
				>
					<div
						id="ifr_69bd47beb1f8e9f7f4f1822e_aspect"
						className="relative pt-[56.25%]"
					>
						<iframe
							id="ifr_69bd47beb1f8e9f7f4f1822e"
							frameBorder="0"
							allowFullScreen
							referrerPolicy="origin"
							src={videoSrc}
							className="absolute left-0 top-0 h-full w-full rounded-[14px]"
						/>
					</div>
				</div>
			</div>

			{/* BUTTON */}
			<div
				className="
				mt-9
				w-[350px]
				md:w-[460px]
				h-[56px]
				p-[2px]
				rounded-[12px]
				shadow-[0px_10px_12.9px_0px_rgba(0,0,0,0.5)]
				"
				style={{
					background: "linear-gradient(360deg, #04770E 0%, #5ADB66 100%)",
				}}
			>
				<button
					className="
					w-full
					h-full
					rounded-[10px]
					flex
					items-center
					justify-center
					text-center
					font-raleway
					font-bold
					text-[16px]
					leading-[125%]
					uppercase
					text-black
					"
					style={{
						background:
							"radial-gradient(50% 75.61% at 50% 50%, #7AD783 0%, #32A43D 100%)",
					}}
				>
					PREENCHER FICHA DE INTERESSE
				</button>
			</div>

		</section>
	);
}