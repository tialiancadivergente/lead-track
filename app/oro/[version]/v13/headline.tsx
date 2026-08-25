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
		isLogo: true,
		title: (
			<h1
				id="hero-title"
				className="[font-family:'Bricolage_Grotesque',sans-serif] text-[24px] font-bold uppercase leading-[1.5] tracking-normal text-white md:text-[50px]"
			>
				<span className="block whitespace-nowrap text-[#F0CB6D]">
					Enxergue o seu Ponto
				</span>
				<span className="block whitespace-nowrap text-[#F0CB6D]">
					Cego e enriqueça. Ou
				</span>
				<span className="block whitespace-nowrap">
					continue ignorando
				</span>
				<span className="block whitespace-nowrap">
					aquilo que está
				</span>
				<span className="block whitespace-nowrap">
					atrasando a sua vida.
				</span>
			</h1>
		),
		text: null,
	},
];