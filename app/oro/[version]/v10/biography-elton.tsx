"use client";

import React from "react";

export default function BiographyElton() {
	return (
		<section
			className={`min-h-[1256px] md:min-h-[1200px] flex flex-col items-center pb-14 p-4 md:p-0 justify-start overflow-hidden bg-[#000000] bg-[url('/images/oro/v9/bg_bio_elton_mobile.webp.webp')] md:bg-[url('/images/oro/v9/bg_bio_elton_desktop.webp')] bg-contain md:bg-cover bg-top md:bg-center bg-no-repeat z-0`}
		>
			<div className="mx-auto lg:w-[1080px] w-full">
				<div className="flex flex-col items-center pt-[10px] md:pt-[60px]">
					<h2 className="font-spectral font-bold text-[#F4F0E1] text-[18px] leading-[135%] md:text-[34px] md:leading-[50px] text-center">
						Quem vai te destravar?
					</h2>

					<div className="flex flex-col md:flex-row items-start justify-end gap-[30px] md:gap-[60px] mt-[340px] md:mt-[70px] w-full">
						<div className="w-full md:max-w-[520px] md:ml-auto md:mr-[-80px]">
							<h3 className="font-spectral font-bold text-[#C0964B] text-[14px] leading-[22px] md:text-[24px] md:leading-[36px] mb-[24px]">
								Elton Euler
							</h3>

							<div className="flex flex-col gap-[14px] font-spectral font-normal text-[#F4F0E1] text-[14px] leading-[22px] md:text-[20px] md:leading-[26px]">
								<p>
									É a personificação da <span className="text-[#C0964B]">persistência e da superação.</span> Ele entende como ninguém a frustração de <span className="text-[#C0964B]">se esforçar ao máximo e, ainda assim, não alcançar os resultados esperados.</span> Antes de se tornar um multimilionário e referência no desenvolvimento humano, Elton enfrentou <span className="text-[#C0964B]">17 fracassos em seus negócios</span> e chegou a acreditar que o sucesso não era para ele.
								</p>

								<p>
									Elton percebeu que o <span className="text-[#C0964B]">problema não era esforço ou capacidade, mas a permissão para avançar.</span> Ele entendeu que muitas pessoas vivem a mesma realidade que ele enfrentou no passado — <span className="text-[#C0964B]">trabalham duro, mas não rompem a barreira do sucesso.</span>
								</p>

								<p>
									Foi então que decidiu ajudar outros a <span className="text-[#C0964B]">destravar suas vidas,</span> mostrando o que realmente <span className="text-[#C0964B]">falta para sair da estagnação e alcançar a prosperidade.</span>
								</p>

								<p>
									Hoje, Elton é reconhecido por <span className="text-[#C0964B]">métodos autênticos e revolucionários</span> que entregam uma clareza única – sua marca registrada. Ele é <span className="text-[#C0964B]">criador da Análise Corporal, idealizador de A Lógica da Vida e fundador da Aliança Divergente,</span> que já conta com mais de <span className="text-[#C0964B]">100 mil aliados</span> no Brasil e no mundo.
								</p>

								<p>
									Sua capacidade de <span className="text-[#C0964B]">decifrar padrões invisíveis e eliminar bloqueios emocionais</span> inspira milhares de pessoas a finalmente <span className="text-[#C0964B]">avançarem sem retrocessos.</span>
								</p>

								<p>
									<span className="text-[#C0964B]">O DESTRAVE</span> não é mais um evento motivacional. Ele é um divisor de águas, e Elton Euler é a pessoa certa para conduzir essa transformação.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}