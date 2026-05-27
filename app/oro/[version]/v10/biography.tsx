"use client";

import React from "react";
import { Laptop, ChartNoAxesCombined, SquarePen } from "lucide-react";

export default function Biography() {
	return (
		<section className="w-full overflow-hidden bg-[#001313] border-y border-[#007C83]">
			<div className="mx-auto lg:w-[1080px] w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 py-[42px] md:py-[40px] px-6 md:px-0 bg-[radial-gradient(50%_75.08%_at_50%_100.2%,_rgba(16,68,72,0.5)_0%,_rgba(16,68,72,0.2)_34.73%,_rgba(16,68,72,0)_100%)]">
				<div className="flex flex-col items-center justify-center text-center">
					<Laptop
						size={46}
						strokeWidth={2.5}
						className="text-[#007C83] mb-6"
					/>

					<p className="font-raleway font-extrabold text-white text-[20px] leading-[24px]">
						100% Online
					</p>
				</div>

				<div className="flex flex-col items-center justify-center text-center">
					<ChartNoAxesCombined
						size={46}
						strokeWidth={2.5}
						className="text-[#007C83] mb-6"
					/>

					<p className="font-raleway font-extrabold text-white text-[20px] leading-[24px]">
						Do zero ao
						<br />
						avançado
					</p>
				</div>

				<div className="flex flex-col items-center justify-center text-center">
					<SquarePen
						size={46}
						strokeWidth={2.5}
						className="text-[#007C83] mb-6"
					/>

					<p className="font-raleway font-extrabold text-white text-[20px] leading-[24px]">
						Aula prática
						<br />
						(passo a passo)
					</p>
				</div>
			</div>
		</section>
	);
}