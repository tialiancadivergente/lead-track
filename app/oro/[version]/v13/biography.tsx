"use client";

import React from "react";
import { handleScroll } from "@/lib/utils";

export default function Biography() {
	const ButtonParticipate = () => (
		<button
			type="button"
			onClick={handleScroll}
			className="h-[40px] w-full max-w-[332px] whitespace-nowrap rounded-[49.24px] border border-transparent px-[12px] text-[14px] font-bold uppercase leading-[125%] text-white shadow-[0_4px_14px_rgba(0,117,70,0.28)] transition-all hover:brightness-110 [background:radial-gradient(42.75%_101.03%_at_50%_50%,#00BC71_0%,rgba(12,112,72,0)_100%)_padding-box,linear-gradient(#007546,#007546)_padding-box,linear-gradient(90deg,#00D47F_0%,rgba(0,212,127,0)_50%,#00D47F_100%)_border-box] md:h-[52px] md:max-w-[470px] md:rounded-[67.3px] md:px-[16px] md:text-[19px]"
		>
			Quero participar gratuitamente
		</button>
	);

	return (
		<section
			id="super-ponto-cego"
			aria-labelledby="super-ponto-cego-titulo"
			className="relative h-[2136px] w-full overflow-hidden bg-black bg-[url('/super_ponto_cego/bg_segunda_dobra_mobile.png')] bg-cover bg-top bg-no-repeat md:h-[2024px] md:bg-[url('/super_ponto_cego/bg_segunda_dobra_desktop.png')]"
			style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
		>
			<div className="relative mx-auto h-full w-full max-w-[1280px]">
				<div className="absolute left-[30px] top-[29px] w-[286px] md:left-[32px] md:top-[213px] md:w-[622px]">
					<h2
						id="super-ponto-cego-titulo"
						className="m-0 text-[20px] font-bold uppercase leading-[150%] tracking-normal text-white md:text-[30px]"
					>
						Um encontro para enxergar aquilo que pode estar comandando anos da
						sua vida sem você perceber.
					</h2>
				</div>

				<div className="absolute left-[30px] top-[201px] h-[65px] w-[318px] overflow-hidden border-[0.42px] border-white font-bold uppercase md:left-[32px] md:top-[376px] md:h-[111px] md:w-[540px] md:border-[0.72px]">
					<div className="flex h-1/2 w-full border-b-[0.42px] border-white md:border-b-[0.72px]">
						<div className="flex w-[58%] items-center justify-center border-r-[0.42px] border-white px-2 text-center text-[12.72px] leading-[150%] text-white md:border-r-[0.72px] md:text-[21.72px]">
							<span className="whitespace-nowrap">Sábado, 29 de agosto</span>
						</div>

						<div className="flex w-[42%] items-center justify-center px-2 text-center text-[12.72px] leading-[150%] text-white md:text-[21.72px]">
							<span className="whitespace-nowrap">Das 10h às 12h</span>
						</div>
					</div>

					<div className="flex h-1/2 items-center justify-center px-2 text-center text-[12.72px] leading-[150%] text-[#F0CB6D] md:text-[21.72px]">
						<span className="whitespace-nowrap">Ao vivo no Zoom</span>
					</div>
				</div>

				<div className="absolute left-[44px] top-[780px] w-[265px] text-[20px] font-light leading-[133%] text-white md:left-[33px] md:top-[527px] md:w-[535px] md:leading-[150%]">
					<p>
						Durante o Super Ponto Cego, você vai entender por que trabalhar
						mais, estudar mais e tentar novas estratégias não produz o
						resultado que você espera.
					</p>
				</div>

				<div className="absolute left-1/2 top-[996px] flex h-[1140px] w-[360px] -translate-x-1/2 flex-col items-center rounded-[19.84px] bg-white px-[24px] pt-[50px] text-[#07242C] shadow-[0_10px_30px_rgba(0,0,0,0.28)] md:left-[220px] md:top-[962px] md:h-[932px] md:w-[840px] md:translate-x-0 md:rounded-[14px] md:px-[53px] md:pt-[58px]">
					<div className="w-full text-center text-[#C0964B]">
						<div className="text-[40px] font-bold leading-[118%] md:hidden">
							<span className="block">Desta vez, você</span>
							<span className="block">não vai pagar</span>
							<span className="block">nada para participar.</span>
						</div>

						<div className="hidden text-[50px] font-bold leading-[118%] md:block">
							<span className="block">Desta vez, você não vai</span>
							<span className="block">pagar nada para participar.</span>
						</div>
					</div>

					<div className="mt-[34px] w-full text-center font-medium text-[#07242C] md:mt-[28px]">
						<div className="text-[20px] leading-[118%] md:hidden">
							<span className="block">
								A imersão O Ponto Cego já foi
							</span>
							<span className="block">
								uma experiência que custou R$ 47.
							</span>

							<span className="mt-[20px] block">
								Mas, nesta edição especial, o
							</span>
							<span className="block">
								acesso ao Super Ponto Cego
							</span>
							<span className="block">
								será 100% gratuito para você.
							</span>
						</div>

						<div className="hidden text-[24px] leading-[118%] md:block">
							<span className="block">
								A imersão O Ponto Cego já foi uma experiência que
							</span>
							<span className="block">custou R$ 47.</span>

							<span className="mt-[20px] block">
								Mas, nesta edição especial, o acesso ao Super Ponto Cego
							</span>
							<span className="block">
								será 100% gratuito para você.
							</span>
						</div>
					</div>

					<div className="mt-[34px] flex w-full flex-col items-center md:mt-[32px]">
						<p className="text-center text-[15.87px] font-medium leading-[23.8px] text-[#07242C] md:text-[19.84px] md:leading-[29.75px]">
							De <span className="line-through">R$47,00</span> por
						</p>

						<div className="mt-[4px] flex items-end justify-center font-bold text-[#07242C]">
							<span className="mb-[12px] mr-[8px] text-[33px] leading-none md:mb-[15px] md:mr-[10px] md:text-[42px]">
								R$
							</span>

							<span className="text-[74px] leading-[0.88] tracking-[-0.04em] md:text-[96px]">
								0,00
							</span>
						</div>
					</div>

					<div className="mt-[20px] flex w-full justify-center md:mt-[24px]">
						<ButtonParticipate />
					</div>

					<div className="mt-[34px] w-full text-center font-medium text-[#07242C] md:mt-[40px]">
						<div className="text-[20px] leading-[118%] md:hidden">
							<span className="block">
								Esta será a única vez que o
							</span>
							<span className="block">Super Ponto Cego</span>
							<span className="block">
								acontecerá gratuitamente
							</span>
							<span className="block">neste formato.</span>

							<span className="mt-[22px] block">
								Você só precisa fazer sua
							</span>
							<span className="block">
								inscrição, reservar o seu
							</span>
							<span className="block">
								sábado e entrar no Zoom às
							</span>
							<span className="block">10h.</span>

							<span className="mt-[22px] block">
								Porque depois que você
							</span>
							<span className="block">
								enxerga um ponto cego,
							</span>
							<span className="block">
								fica muito mais fácil
							</span>
							<span className="block">
								alcançar aqueles resultados
							</span>
							<span className="block">
								que você sabe que merece!
							</span>
						</div>

						<div className="hidden text-[24px] leading-[118%] md:block">
							<span className="block">
								Esta será a única vez que o Super Ponto Cego acontecerá
							</span>
							<span className="block">
								gratuitamente neste formato.
							</span>

							<span className="mt-[24px] block">
								Você só precisa fazer sua inscrição, reservar o seu sábado e
							</span>
							<span className="block">entrar no Zoom às 10h.</span>

							<span className="mt-[24px] block">
								Porque depois que você enxerga um ponto cego, fica muito mais
							</span>
							<span className="block">
								fácil alcançar aqueles resultados que você sabe que merece!
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}