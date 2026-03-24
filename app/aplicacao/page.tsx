"use client";

import Link from "next/link";

export default function Application() {

	return (
		<div className="min-h-screen w-full bg-[#01251e]">
			<iframe
				src="https://aliancadivergentead.typeform.com/to/ctOpWA5Y"
				title="Ficha de Interesse - ORO"
				className="min-h-screen h-full w-full border-0"
				allow="camera; microphone; autoplay; encrypted-media;"
				allowFullScreen
			/>
			<footer className="w-full bg-[#02201a]">
				<div className="w-full max-w-[1024px] mx-auto flex justify-between items-center p-4 text-white/50 text-sm font-mulish">
					<div>
						Este site não é afiliado ao Google. Os resultados podem variar.
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col text-right">
							<Link href="https://crm.imperio55.com.br/_assets/editora/politica/alianca_divergente_politicas_de_privacidade.pdf" target="_blank" rel="noopener noreferrer">Política de Privacidade</Link>
							<Link href="https://crm.imperio55.com.br/_assets/editora/politica/alianca_divergente_politicas_de_privacidade.pdf" target="_blank" rel="noopener noreferrer">Termos de Uso</Link>
						</div>
						<div className="w-px border border-white/10" />
						<div className="text-left">
							<p>⁠Editora Aliança Divergente LTDA</p>
							<p>48.424.807/0001-88</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
