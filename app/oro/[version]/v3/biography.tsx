"use client";

import { Button } from "@/components/ui/button";
import { handleScroll } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Biography() {

	const ButtonParticipate = () => {
		return (
			<button
				onClick={handleScroll}
				className="
				w-full md:w-[512px]
				h-[56px]
				flex items-center justify-center gap-[10px]
				font-raleway font-extrabold
				text-white
				rounded-[10px]
				py-[16px]
				text-[12px] md:text-base uppercase tracking-wide
				transition-all hover:brightness-110
				bg-[linear-gradient(88.53deg,_#D10C10_0%,_#9B0609_100%)]
			"
			>
				<span className="">Participar gratuitamente</span>
				<ArrowUpRight size={20} strokeWidth={2.5} />
			</button>
		)
	}
	return (
		<section
			className={`min-h-[2060px] md:h-[1608px] md:min-h-[1608px] flex flex-col items-center p-4 md:p-0 justify-start overflow-hidden bg-[#031B22] bg-[url('/images/oro/v3/biografia_ramon_mobile.webp')] md:bg-[url('/images/oro/v3/biografia_ramon.webp')] bg-cover bg-top md:bg-center z-0`}		>
			<div className="mx-auto px-4 w-full max-w-[1200px]">
				<div className="pt-[20px] md:pt-[180px] w-full flex flex-col items-end text-right">
					<div className="text-2xl md:text-[45px]/[54px] w-full md:w-[512px] font-bold uppercase text-[#C0964B] text-left">
						Que bom que você não desistiu.
					</div>
					<div className="font-raleway text-[#F4F0E1] text-base text-left my-8 w-full md:max-w-[512px] md:ml-auto">
						<span className="font-bold">Chega de dar o seu máximo e no fim ficar se questionando o que faltou.</span> {' '}
						Depois desse evento você nunca mais vai se perguntar o que falta para você ter o resultado merecido pelo seu esforço.{' '}
						<p className="mt-4 font-bold">Faça parte do Resgate dos Otimistas</p> ou continue se questionando e justificando o seu "quase sucesso".
					</div>
					<div className="w-full flex md:justify-end justify-center">
						<ButtonParticipate />
					</div>
				</div>

				<div className="flex justify-center md:justify-end mt-[800px] md:mt-[150px] w-full">
					<div className="w-full max-w-[512px] text-[#F4F0E1]">
						<div className="font-spectral text-2xl md:text-[32px] font-bold">
							QUEM VAI SER O SEU MENTOR NESSA JORNADA?
						</div>
						<div className="flex flex-col mt-4 mb-6 text-xl md:text-2xl font-bold">
							<p className="text-[#C0964B]">
								Ramon Galimberti
							</p>
						</div>
						<div className="flex flex-col gap-6 font-regular font-raleway">
							<p>Ramon fez tudo o que disseram que daria certo. Estudou, se formou, foi até o mestrado. Tinha tudo o que deveria pra dar certo. E mesmo assim, não dava.</p>

							<p>Perto dos 30, se viu morando em cima da casa pais. Desempregado. Saindo de um relacionamento que tinha desabado. Usando o ticket do pai pra fazer compra no mercado e virar o mês. Diploma bonito na parede, mas o bolso vazio. E foi nesse momento que ele pensou: "o sucesso não é pra mim."</p>

							<p>Até descobrir o que realmente travava tudo, e não tinha nada a ver com competência. Era Permissão. Existia um padrão invisível que decidia o resultado por ele, antes que ele tivesse qualquer chance. Quando ele quebrou esse padrão, rompeu o teto financeiro que o prendia havia anos e que parecia impossível de ultrapassar.</p>

							<p>Hoje Ramon é o primeiro brasileiro autorizado a aplicar a Teoria da Permissão e guiou mais de 160 mil pessoas a enxergarem o mesmo padrão que as mantém presas: no dinheiro, na carreira e nas relações.</p>

							<p>No Resgate dos Otimistas, você vai entender que todo acontecimento ruim tem uma explicação, e a sua falta de resultado tem resposta. Uma resposta que você vai identificar, pra romper o seu teto financeiro de forma definitiva.</p>

							<p>Você tem coragem de ver?</p>
							<ButtonParticipate />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
