"use client";

import { useState, type ReactNode } from "react";
import { useParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { LeadCaptureSubmitData } from "@/app/components/form/lead-capture-form";
import { WhoWeAreCheckSection } from "./who-we-are.check";

interface ContainerProps {
	titleRedLine: ReactNode | null;
	redLine: ReactNode | null;
	formName: string;
	onSubmit: (data: LeadCaptureSubmitData) => void | Promise<void>;
	submitError?: string | null;
}

const lessons = {
	eua: [
		{
			number: "01",
			title: "A Grande Descoberta",
			subtitle: "",
			videoId: "i8Du-jbaAhw",
		},
		{
			number: "02",
			title: "Diagnóstico de Dependência Emocional",
			subtitle: "",
			videoId: "z94vdMPKz5o",
		},
		{
			number: "03",
			title: "Como Romper Seu Teto Financeiro",
			subtitle: "",
			videoId: "wubRxaw3SxE",
		},
	],
	euro: [
		{
			number: "01",
			title: "A Grande Descoberta",
			subtitle: "",
			videoId: "dr83XtivWI0",
		},
		{
			number: "02",
			title: "",
			subtitle: "",
			videoId: "Ewd9cB8vOWI",
		},
		{
			number: "03",
			title: "Como Romper Seu Teto Financeiro",
			subtitle: "",
			videoId: "k0W18dcf1XM",
		},
	],
};

export default function HeroSection(_: ContainerProps) {
	const [selectedLesson, setSelectedLesson] = useState(0);
	const { region } = useParams<{ region: string }>();

	const currentRegion = region === "eua" ? "eua" : "euro";
	const regionLessons = lessons[currentRegion];
	const currentLesson = regionLessons[selectedLesson];

	const marqueeText =
		"• O RESGATE DOS OTIMISTAS • DISPONÍVEL POR TEMPO LIMITADO • MARATONA ESPECIAL ";

	const interestFormUrl =
		region === "eua"
			? "https://aliancadivergentead.typeform.com/to/PDmGoy7L?utm_campaign=oro-eua&utm_source=maratona&utm_medium=maratona&utm_content=maratona&utm_term=maratona"
			: "https://aliancadivergentead.typeform.com/to/WdPZdxg3?utm_campaign=oro-euro&utm_source=maratona&utm_medium=maratona&utm_content=maratona&utm_term=maratona";

	return (
		<section
			id="hero"
			className="relative min-h-[1950px] w-full overflow-hidden bg-[#F0E7DA] pt-[54px] md:min-h-[1620px] md:pt-[76px]"
		>
			<div className="absolute left-0 top-0 z-20 flex h-[54px] w-full items-center overflow-hidden bg-[#FF1616] md:h-[76px]">
				<div className="maratona-marquee flex w-max items-center whitespace-nowrap">
					<span className="pr-4 font-spectral text-[18px] font-bold uppercase leading-none text-white md:pr-6 md:text-[30px]">
						{marqueeText}
					</span>

					<span
						aria-hidden="true"
						className="pr-4 font-spectral text-[18px] font-bold uppercase leading-none text-white md:pr-6 md:text-[30px]"
					>
						{marqueeText}
					</span>
				</div>
			</div>

			<div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 pt-[70px] text-center md:px-0 md:pt-[68px]">
				<h1 className="max-w-[760px] font-spectral text-[29px] font-bold uppercase leading-[105%] text-[#064A55] md:text-[38px] md:leading-[98%]">
					VOCÊ NÃO FOI MAIS LONGE
					<br />
					PORQUE NÃO PODE. AINDA!
				</h1>

				<p className="mt-[36px] max-w-[650px] font-raleway text-[16px] font-normal leading-[135%] text-[#064A55] md:mt-[38px] md:text-[19px]">
					Em três dias, MILHARES de pessoas descobriram o que as impede de
					alcançar o sucesso. Agora, é a sua chance de assistir ou rever o
					conteúdo pela última vez.
				</p>

				<p className="mt-[32px] max-w-[720px] font-raleway text-[16px] font-bold leading-[135%] text-[#064A55] md:mt-[34px] md:text-[18px]">
					Clique em cada aula e assista enquanto está disponível.
				</p>
			</div>

			<div className="mx-auto mt-[78px] w-[calc(100%-32px)] max-w-[1600px] rounded-[28px] bg-[#073F43] p-4 md:mt-[88px] md:w-[90%] md:rounded-[36px] md:p-[40px]">
				<div className="flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,1.65fr)_minmax(360px,0.85fr)] md:gap-[40px]">
					<div>
						<div className="mb-4 flex items-center justify-between px-1 font-raleway text-[11px] font-bold uppercase tracking-[0.12em] text-white md:text-[14px]">
							<div className="flex items-center gap-2">
								<span className="h-[8px] w-[8px] rounded-full bg-[#F2B534]" />
								<span>Maratona Especial</span>
							</div>

							<div className="flex items-center gap-3">
								<span>
									Aula
									<span className="text-[#F2B534]">
										{currentLesson.number}
									</span>
								</span>

								<span className="h-px w-[32px] bg-white/30" />

								<span>03</span>
							</div>
						</div>

						<div className="aspect-video w-full overflow-hidden rounded-[20px] bg-[#0A3034] md:rounded-[28px]">
							<iframe
								key={currentLesson.videoId}
								src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0`}
								title={`Aula ${currentLesson.number}`}
								className="h-full w-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
						</div>

						<div className="relative px-2 pb-2 pt-6 text-left md:px-[92px] md:pt-7">
							<span className="absolute left-0 top-[14px] hidden font-raleway text-[68px] font-extrabold leading-none text-white/10 md:block">
								{currentLesson.number}
							</span>

							<div className="relative">
								<p className="mb-2 font-raleway text-[11px] font-bold uppercase tracking-[0.1em] text-[#F2B534] md:text-[13px]">
									Selecionada para assistir
								</p>

								{currentLesson.title && (
									<h2 className="font-spectral text-[30px] font-bold leading-[105%] text-white md:text-[42px]">
										{currentLesson.title}
									</h2>
								)}

								{currentLesson.subtitle && (
									<p className="mt-3 font-raleway text-[15px] text-[#B9DBD8] md:text-[17px]">
										{currentLesson.subtitle}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="flex min-h-[520px] flex-col rounded-[24px] border border-white/10 bg-[#06363A] p-4 md:min-h-full md:rounded-[28px] md:p-[30px]">
						<div className="border-b border-white/10 pb-6 text-left">
							<div className="flex items-end justify-between gap-4">
								<div>
									<p className="font-raleway text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#F2B534] md:text-[12px]">
										Conteúdo da Maratona
									</p>

									<h3 className="mt-2 font-spectral text-[27px] font-bold leading-none text-white md:text-[34px]">
										Escolha sua aula
									</h3>
								</div>

								<span className="rounded-lg border border-white/15 px-3 py-2 font-raleway text-[10px] font-bold uppercase text-[#B9DBD8]">
									3 aulas
								</span>
							</div>
						</div>

						<div className="mt-5 flex flex-col gap-3">
							{regionLessons.map((lesson, index) => {
								const isSelected = selectedLesson === index;

								return (
									<button
										key={lesson.number}
										type="button"
										onClick={() => setSelectedLesson(index)}
										className={`group flex min-h-[108px] w-full items-center gap-4 rounded-[18px] border p-3 text-left transition-colors duration-200 ${
											isSelected
												? "border-[#D7A62A] bg-white/[0.07]"
												: "border-transparent bg-white/[0.045] hover:border-[#D7A62A] hover:bg-white/[0.07]"
										}`}
									>
										<div className="relative flex h-[82px] w-[118px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#0A3034]">
											<img
												src={`https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg`}
												alt={`Aula ${lesson.number}`}
												className="h-full w-full object-cover"
											/>

											<div className="absolute inset-0 flex items-center justify-center bg-black/10">
												<div
													className={`flex h-[30px] w-[30px] items-center justify-center rounded-full ${
														isSelected
															? "bg-[#F2B534] text-[#073F43]"
															: "bg-[#073F43]/80 text-white"
													}`}
												>
													<span className="ml-[2px] text-[12px]">▶</span>
												</div>
											</div>
										</div>

										<div className="min-w-0 flex-1">
											<p
												className={`font-raleway text-[9px] font-bold uppercase tracking-[0.12em] ${
													isSelected
														? "text-[#F2B534]"
														: "text-[#89B6B4]"
												}`}
											>
												{isSelected ? "Assistindo" : "Disponível"}
											</p>

											<p className="mt-1 font-spectral text-[25px] font-bold uppercase leading-none text-[#F2A936]">
												Aula {lesson.number}
											</p>

											{lesson.title && (
												<p className="mt-2 font-raleway text-[12px] font-medium leading-[120%] text-white">
													{lesson.title}
												</p>
											)}

											{lesson.subtitle && (
												<p className="mt-1 font-raleway text-[11px] leading-[120%] text-[#B9DBD8]">
													{lesson.subtitle}
												</p>
											)}
										</div>

										<span
											className={`shrink-0 text-[30px] font-light transition-colors ${
												isSelected
													? "text-[#F2B534]"
													: "text-white/30 group-hover:text-[#F2B534]"
											}`}
										>
											›
										</span>
									</button>
								);
							})}
						</div>

						<div className="mt-auto border-t border-white/10 pt-5 text-left">
							<p className="font-raleway text-[10px] leading-[140%] text-[#7EAAA8]">
								Ao trocar de aula, o vídeo atual é pausado automaticamente.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto flex w-full flex-col items-center px-5 pb-[80px] pt-[72px] text-center md:pb-[100px] md:pt-[80px]">
				<p className="max-w-[570px] font-raleway text-[19px] font-bold leading-[120%] text-[#063F46] md:text-[27px]">
					Clique no botão abaixo e preencha sua
					<br className="hidden md:block" /> ficha de interesse agora mesmo.
				</p>

				<a
					href={interestFormUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="interest-button mt-[30px] flex h-[68px] w-full max-w-[510px] items-center justify-center gap-3 rounded-full border border-[#F8D27C] bg-[linear-gradient(90deg,#DFA63E_0%,#FFD27A_100%)] px-6 font-raleway text-[15px] font-extrabold uppercase text-[#071117] shadow-[0_8px_20px_rgba(180,126,32,0.15)] md:h-[76px] md:text-[20px]"
				>
					<span>PREENCHER FICHA DE INTERESSE</span>

					<ArrowUpRight
						size={28}
						strokeWidth={2.5}
						className="shrink-0"
					/>
				</a>
			</div>

			<WhoWeAreCheckSection />

			<style jsx>{`
				.maratona-marquee {
					animation: maratona-marquee 22s linear infinite;
					will-change: transform;
				}

				.interest-button:hover {
					animation: interest-pulse 0.7s ease-in-out infinite alternate;
				}

				@keyframes maratona-marquee {
					from {
						transform: translateX(0);
					}

					to {
						transform: translateX(-50%);
					}
				}

				@keyframes interest-pulse {
					from {
						transform: scale(1);
					}

					to {
						transform: scale(1.045);
					}
				}

				@media (max-width: 767px) {
					.maratona-marquee {
						animation-duration: 16s;
					}
				}
			`}</style>
		</section>
	);
}