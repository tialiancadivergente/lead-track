"use client";

import React from "react";

export default function Biography() {
	return (
		<section
			id="segunda-dobra"
			aria-labelledby="segunda-dobra-titulo"
			className="
				relative
				min-h-[2369px]
				md:min-h-[2035px]
				flex
				flex-col
				items-center
				justify-start
				overflow-hidden
				bg-[#031B22]
				bg-[url('/images/oro/v11/bg_mobile_segunda_dobra.png')]
				md:bg-[url('/images/oro/v11/bg_desktop_segunda_dobra.png')]
				bg-cover
				bg-top
				md:bg-top
				bg-no-repeat
				z-0
				px-4
				md:px-0
			"
		>
			<div className="mx-auto w-full max-w-[1200px]">
				<article
					className="
						w-full
						pt-[55px]
						md:pt-[160px]
						flex
						flex-col
						items-center
						text-center
						translate-y-[50px]
						md:translate-y-0
					"
				>
					<h2
						id="segunda-dobra-titulo"
						className="
							w-[350px]
							md:w-[543px]
							font-spectral
							font-semibold
							text-[#555555]
							text-[24px]
							md:text-[36px]
							leading-[28.5px]
							md:leading-[40px]
							text-center
						"
					>
						Que bom que você não desistiu.
					</h2>

					<p
						className="
							mt-[12px]
							md:mt-[19px]
							w-[350px]
							md:w-[657px]
							font-mulish
							font-normal
							text-[#000000]
							text-[14px]
							md:text-[18px]
							leading-[19.95px]
							md:leading-[28px]
							text-center
						"
					>
						Chega de dar o seu máximo e no fim ficar se questionando o que
						faltou. Depois desse evento você nunca mais vai se perguntar o que
						falta para você ter o resultado merecido pelo seu esforço. Faça
						parte do Resgate dos Otimistas ou continue se questionando e
						justificando o seu &quot;quase sucesso&quot;.
					</p>
				</article>

				<article
					aria-labelledby="mentor-titulo"
					className="flex justify-center md:justify-end mt-[330px] md:mt-[450px] w-full"
				>
					<div className="w-full max-w-[350px] md:max-w-[520px] text-[#FFFFFF] text-left">
						<h2
							id="mentor-titulo"
							className="
								w-[350px]
								md:w-[520px]
								font-spectral
								font-bold
								text-[24px]
								md:text-[35px]
								leading-[125%]
								tracking-[-0.02em]
								uppercase
							"
						>
							Quem vai ser o seu mentor nessa jornada?
						</h2>

						<h3
							className="
								mt-4
								mb-5
								font-spectral
								font-bold
								text-[20px]
								md:text-[30px]
								leading-[125%]
								text-[#F89500]
							"
						>
							Ramon Galimberti
						</h3>

						<div
							className="
								flex
								flex-col
								gap-5
								w-[350px]
								md:w-[520px]
								font-mulish
								font-normal
								text-[16px]
								leading-[145%]
								text-[#FFFFFF]
							"
						>
							<p>
								Ramon fez tudo o que disseram que daria certo. Estudou, se
								formou, foi até o mestrado. Tinha tudo o que deveria pra dar
								certo. E mesmo assim, não dava.
							</p>

							<p>
								Perto dos 30, se viu morando em cima da casa pais.
								Desempregado. Saindo de um relacionamento que tinha desabado.
								Usando o ticket do pai pra fazer compra no mercado e virar o
								mês. Diploma bonito na parede, mas o bolso vazio. E foi nesse
								momento que ele pensou:{" "}
								<strong>“o sucesso não é pra mim.”</strong>
							</p>

							<p>
								Até descobrir o que realmente travava tudo, e não tinha nada a
								ver com competência. <strong>Era Permissão.</strong> Existia um
								padrão invisível que decidia o resultado por ele, antes que ele
								tivesse qualquer chance. Quando ele quebrou esse padrão, rompeu
								o teto financeiro que o prendia havia anos e que parecia
								impossível de ultrapassar.
							</p>

							<p>
								<strong>
									Hoje Ramon é o primeiro brasileiro autorizado a aplicar a
									Teoria da Permissão e guiou mais de 160 mil pessoas a
									enxergarem o mesmo padrão que as mantém presas: no dinheiro,
									na carreira e nas relações.
								</strong>
							</p>

							<p>
								No Resgate dos Otimistas, você vai entender que todo
								acontecimento ruim tem uma explicação, e a sua falta de
								resultado tem resposta. Uma resposta que você vai identificar,
								pra romper o seu teto financeiro de forma definitiva.
							</p>

							<p className="font-bold text-[#F89500]">
								Você tem coragem de ver?
							</p>

							<a
								href="#hero"
								className="
									mt-1
									flex
									h-[52px]
									w-full
									md:w-[360px]
									items-center
									justify-center
									rounded-[4px]
									bg-[#F89500]
									font-mulish
									text-[14px]
									font-bold
									uppercase
									leading-[145%]
									text-[#FFFFFF]
									transition-opacity
									hover:opacity-90
								"
							>
								Participar gratuitamente
							</a>
						</div>
					</div>
				</article>
			</div>
						{/* Rodapé */}
						<div className="mt-[600px] md:mt-64 w-full px-6 md:px-16 py-10">
				<div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-8">

					<div className="hidden md:block font-raleway text-[14px] leading-[135%] text-white">
						<p>Copyright © O Resgate Dos Otimistas.</p>
						<p>Todos os direitos reservados.</p>
					</div>

					<img
						src="/images/v21/logo-alianca-divergente.png"
						alt="Logo"
						className="w-[220px] md:w-[250px] object-contain"
					/>

					<div className="block md:hidden text-center font-raleway text-[14px] leading-[135%] text-white">
						<p>Copyright © O Resgate Dos Otimistas.</p>
						<p>Todos os direitos reservados.</p>
					</div>

					<div className="flex flex-col items-center md:items-end gap-0">
						<div className="flex items-center gap-2">
							<a
								href="https://www.oresgatedosotimistas.com.br/politica-de-privacidade"
								target="_blank"
								rel="noopener noreferrer"
								className="font-raleway text-[14px] text-white hover:text-[#F89500] transition-colors"
							>
								Política de privacidade
							</a>

							<span className="text-white">|</span>

							<a
								href="https://www.oresgatedosotimistas.com.br/termos-de-uso"
								target="_blank"
								rel="noopener noreferrer"
								className="font-raleway text-[14px] text-white hover:text-[#F89500] transition-colors"
							>
								Termos de uso
							</a>
						</div>

						<p className="text-center md:text-right font-raleway text-[14px] text-white">
							ALIANCA DIVERGENTE LTDA 
						</p>
					</div>

				</div>
			</div>	
		</section>
		
	);
}