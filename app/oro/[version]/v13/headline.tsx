import type { ReactNode } from "react";

interface IHeadline {
	id: number | string;
	isPicture: boolean;
	isLogo: boolean;
	title: ReactNode;
	text: ReactNode;
}

export const Headline: IHeadline[] = [
	{
		id: "h1",
		isPicture: false,
		isLogo: false,
		title: (
			<h1
				id="hero-title"
				className="w-full max-w-[350px] text-center font-spectral text-[32px] font-normal uppercase leading-[110%] tracking-[0] text-[#07242C] md:max-w-[455px] md:text-left md:text-[55.2px] md:leading-[94%]"
			>
				UMA <span className="font-bold">SEGUNDA</span>
				<br />
				<span className="font-bold">CHANCE</span> PARA
				<br />
				NÓS DOIS.
			</h1>
		),
		text: (
			<div className="flex w-full flex-col items-center md:items-start">
				<p className="w-full max-w-[346px] text-center [font-family:Inter,sans-serif] text-[18px] font-bold leading-[145%] text-[#07242C] md:max-w-[328px] md:text-left">
					45 dias de conteúdo gratuito exclusivo para Aliados e ex-Aliados.
				</p>

				<p className="mt-3 w-full max-w-[350px] text-center [font-family:Inter,sans-serif] text-[14px] font-normal leading-[145%] text-[#07242C] md:max-w-[397px] md:text-left md:text-[15px]">
					Confirme o e-mail que você usava para acessar o Marca-Passos e valide se você já foi Aliado:
				</p>
			</div>
		),
	},
];