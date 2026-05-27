"use client";

import React from "react";

export default function BiographyRamon() {
	return (
		<section
			className={`min-h-[1068px] md:min-h-[893px] flex flex-col items-center pb-14 p-4 md:p-0 justify-start overflow-hidden bg-[#000000] bg-[url('/images/oro/v9/bg_bio_ramon_mobile.webp.webp')] md:bg-[url('/images/oro/v9/bg_bio_ramon_desktop.webp.webp')] bg-contain md:bg-cover bg-top md:bg-center bg-no-repeat z-0`}
		>
			<div className="mx-auto lg:w-[1080px] w-full">
				<div className="flex flex-col md:flex-row items-start justify-start pt-[320px] md:pt-[90px]">
					<div className="w-full md:max-w-[520px] order-2 md:order-1 mt-[40px] md:mt-0 md:ml-[-450px] text-left">
						<h2 className="font-spectral font-bold text-[#C0964B] text-[16px] leading-[24px] md:text-[24px] md:leading-[36px] mb-[24px]">
							Ramon Galimberti
						</h2>

						<div className="flex flex-col gap-[14px] font-spectral font-normal text-[#F4F0E1] text-[14px] leading-[22px] md:text-[20px] md:leading-[26px]">
							<p>
								Acredita que a transformação real acontece quando{" "}
								<span className="text-[#C0964B] font-bold">
									consciência e estratégia
								</span>{" "}
								andam juntas.
							</p>

							<p>
								Engenheiro formado pela{" "}
								<span className="text-[#C0964B] font-bold">
									Universidade Federal do Espírito Santo,
								</span>{" "}
								Ramon percebeu que o sucesso não está apenas no{" "}
								<span className="text-[#C0964B] font-bold">
									conhecimento técnico, mas na capacidade de romper barreiras emocionais e mentais.
								</span>{" "}
								Sua trajetória é marcada por desafios que o levaram a entender que{" "}
								<span className="text-[#C0964B] font-bold">
									crescimento não é apenas uma questão de inteligência, mas de permissão e mentalidade de expansão.
								</span>
							</p>

							<p>
								Hoje, Ramon é referência em{" "}
								<span className="text-[#C0964B] font-bold">
									implementação de estratégias para a superação de travas emocionais e financeiras.
								</span>{" "}
								Ele lidera um movimento de pessoas que decidiram romper suas limitações e conquistar resultados reais.
							</p>

							<p>
								No{" "}
								<span className="text-[#C0964B] font-bold">
									DESTRAVE,
								</span>{" "}
								Ramon trará o{" "}
								<span className="text-[#C0964B] font-bold">
									passo a passo prático para aplicar as mudanças necessárias
								</span>{" "}
								e garantir que você não apenas entenda o problema,{" "}
								<span className="text-[#C0964B] font-bold">
									mas saiba como resolvê-lo definitivamente.
								</span>
							</p>

							<p>
								Você não precisa continuar travado.{" "}
								<span className="text-[#C0964B] font-bold">
									O DESTRAVE é o seu momento de virada.
								</span>{" "}
								A decisão está em suas mãos.
							</p>
						</div>
					</div>

					<div className="hidden md:block w-[430px]" />
				</div>
			</div>
		</section>
	);
}