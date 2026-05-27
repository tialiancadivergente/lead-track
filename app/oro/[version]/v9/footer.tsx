import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="bg-[#07242C] py-[40px] px-4">
			<footer className="mx-auto lg:w-[1080px] w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">

				<div className="font-normal font-raleway text-[14px] leading-[22px] text-white text-center lg:text-left order-2 lg:order-1">
					<p>
						Copyright © O Destrave.
					</p>

					<p>
						Todos os direitos reservados.
					</p>
				</div>

				<div className="order-1 lg:order-2">
					<Image
						src="/images/oro/v9/o-destrave-logotipo.webp"
						alt="Logotipo O Destrave"
						width={150}
						height={50}
						priority
						className="object-contain"
					/>
				</div>

				<div className="font-normal font-raleway text-[14px] leading-[22px] text-white text-center lg:text-right order-3 lg:order-3 flex flex-col">
					<Link
						href="COLE_O_LINK_DA_POLITICA_AQUI"
						className="hover:opacity-80 transition-opacity"
					>
						Política de privacidade
					</Link>

					<Link
						href="COLE_O_LINK_DOS_TERMOS_AQUI"
						className="hover:opacity-80 transition-opacity"
					>
						Termos de uso
					</Link>
				</div>

			</footer>
		</div>
	);
}