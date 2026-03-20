"use client";

import { handleScroll } from "@/lib/utils";
import React from "react";

export default function Biography() {
	const ButtonParticipate = () => {
		return (
			<button
				onClick={handleScroll}
				className="w-full md:w-[423px] h-14 md:h-16 font-raleway font-extrabold text-[#F4F0E1] rounded-[8px] px-6 text-[13px] md:text-base uppercase tracking-wide transition-all hover:brightness-105 border border-transparent [background:linear-gradient(90deg,_#8DCDC9_0%,_#02252C_100%)_padding-box,_linear-gradient(180deg,_#8DCDC9_0%,_#02252C_100%)_border-box] shadow-[0px_6px_25px_0px_#FDF4D775] flex items-center justify-center"
			>
				<span>Quero participar gratuitamente</span>
			</button>
		);
	};

	return (
		<section className={`md:min-h-[2074px] md:h-[2025px] flex flex-col items-center pb-14 p-4 md:p-0 justify-start overflow-hidden bg-[#031B22] bg-[url('/images/odml/v1/bg_segunda_dobra_mobile.webp')] md:bg-[url('/images/odml/v1/bg_segunda_dobra_desktop.webp')] bg-cover bg-top md:bg-top z-0`}>
			<div className="mx-auto px-4 md:px-0 lg:w-[1280px] w-full">

				<div className="mt-2 md:mt-[40px] flex justify-center md:justify-end text-left md:text-left">
					<div className="w-full max-w-[640px] md:max-w-[600px]">

						<div className="font-spectral font-medium text-[#161307] text-[28px] md:text-[45px] leading-[112%] md:leading-[45px] text-left">
							<p>Toda demora nos</p>
							<p>resultados, esconde uma</p>
							<p>espera nas relações.</p>
						</div>

						<div className="mt-5 md:mt-8 font-raleway font-regular text-[#1B1706] text-[14px] md:text-[20px] leading-[135%] md:leading-[145%] text-left">
							<p>
								Você se esforça, trabalha, corre atrás, tenta melhorar de vida…
								mas, mesmo fazendo tudo certo, sente que algo não avança como deveria.
							</p>

							<p className="mt-4 md:mt-5">
								Você cresce, amadurece, busca mais, mas em algum ponto parece
								que a vida volta para o mesmo lugar, seja nos relacionamentos, na
								saúde ou no financeiro.
							</p>

							<p className="mt-4 md:mt-5">
								No fundo existe uma sensação difícil de explicar:
								<br />
								<span className="font-bold">
									como se algo invisível estivesse segurando sua vida e te puxando para trás.
								</span>
							</p>

							<p className="mt-4 md:mt-5">
								A verdade é uma só:{" "}
								<span className="font-bold">
									o que trava sua vida e sua prosperidade, não é financeiro, é relacional.
								</span>
							</p>

							<p className="mt-4 md:mt-5">
								Por isso criamos o evento O Despertar da Mulher Livre,
								um encontro online e gratuito onde você fará um diagnóstico exclusivo de dependência emocional e entenderá qual é o primeiro passo para se libertar.
							</p>
						</div>

						<div className="mt-8 md:mt-10 flex justify-center md:justify-start">
							<ButtonParticipate />
						</div>
					</div>
				</div>

				<div className="flex justify-center md:justify-start mt-[750px] xs:mt-[800px] 2xs:mt-[850px] sm:mt-[1100px] md:mt-[250px] w-full">
					<div className="w-full max-w-[580px] text-[#FCF3D4] text-left md:text-left">

						<div className="font-spectral font-medium text-[28px] md:text-[45px] leading-[112%] md:leading-[45px] text-left md:text-left">
							<p>Quem vai</p>
							<p>conduzir o evento</p>
						</div>

						<div className="flex flex-col mt-4 mb-6 font-bold text-left md:text-left">
							<p className="text-[#DFD2A7] text-[20px] md:text-[30px]">
								CIDA TORRES
							</p>
						</div>

						<div className="font-raleway font-normal text-[14px] md:text-[20px] leading-[135%] md:leading-[145%] text-left md:text-left">
							<p>
								“A verdadeira liberdade da mulher começa quando ela deixa de carregar tudo sozinha e aprende a se colocar no centro da própria vida.”
							</p>

							<p className="mt-4 md:mt-6">
								Esposa de Márcio, mãe de Arthur e mentora da @aliancadivergente — comunidade com mais de 150 mil aliados — Cida construiu sua trajetória cuidando de todos ao redor. Foram 24 anos na enfermagem, sustentando o papel da mulher forte que dá conta de tudo.
							</p>

							<p className="mt-4 md:mt-6">
								Até perceber o custo disso.
							</p>

							<p className="mt-4 md:mt-6">
								Aos 46 anos, teve uma percepção que mudou sua forma de viver: parou de se colocar por último nas próprias relações.
							</p>

							<p className="mt-4 md:mt-6">
								Hoje, conduz mulheres a romper padrões de dependência emocional e reconstruir uma vida com leveza, prosperidade e relações saudáveis.
							</p>

							<p className="mt-4 md:mt-6">
								No Despertar da Mulher Livre, traduz esse caminho em prática: a mulher não precisa sustentar tudo para, finalmente, sustentar a si mesma.
							</p>
						</div>

					</div>
				</div>
			</div>
		</section>
	);
}