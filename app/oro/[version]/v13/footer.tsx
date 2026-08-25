"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { handleScroll } from "@/lib/utils";

export default function Footer() {
	return (
		<footer className="relative h-[270px] w-full overflow-hidden bg-black md:h-[320px]">
			<div className="pointer-events-none absolute bottom-[-150px] left-1/2 h-[300px] w-[700px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,#F0CB6D_0%,rgba(240,203,109,0)_100%)] opacity-30 md:bottom-[-170px] md:h-[340px] md:w-[900px]" />

			<div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col items-center pt-[62px] md:block md:pt-0">
				<Image
					src="/super_ponto_cego/logo.svg"
					alt="Super Ponto Cego"
					width={91}
					height={50}
					className="h-auto w-[91px] object-contain md:absolute md:left-[116px] md:top-[135px]"
				/>

				<div className="mt-[22px] text-center font-raleway text-[14px] font-normal leading-[24px] text-white md:absolute md:left-1/2 md:top-[137px] md:mt-0 md:-translate-x-1/2 md:whitespace-nowrap md:text-[16px] md:leading-[16px]">
					<p className="md:inline">© 2026. All rights reserved.</p>
					<span className="hidden md:inline">{" "}Política de Privacidade</span>
					<p className="md:hidden">Política de Privacidade</p>
				</div>

				<button
					type="button"
					onClick={handleScroll}
					aria-label="Voltar ao topo da página"
					className="absolute right-[116px] top-[132px] hidden items-center gap-[7px] font-roboto text-[16px] font-normal leading-[22px] text-[#F0CB6D] transition-opacity hover:opacity-80 md:flex"
				>
					<span>Voltar ao topo</span>
					<ArrowUp size={17} strokeWidth={1.8} />
				</button>
			</div>
		</footer>
	);
}