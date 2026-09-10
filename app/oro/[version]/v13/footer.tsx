export default function Footer() {
	return (
		<footer className="flex w-full items-center justify-center bg-[#D29F5B] px-4 py-[28px] md:py-[34px]">
			<p className="text-center font-raleway text-[13px] font-normal leading-[150%] text-[#0D313E] md:text-[14px]">
				© 2026 O Mapa da Permissão.
				<br className="md:hidden" />
				{" "}Todos os direitos reservados.
			</p>
		</footer>
	);
}