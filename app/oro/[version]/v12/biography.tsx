"use client";

import { ArrowUpRight } from "lucide-react";
import { handleScroll } from "@/lib/utils";

function ParticipateButton() {
  return (
    <button
      type="button"
      onClick={handleScroll}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-transparent px-6 font-raleway text-base font-extrabold uppercase tracking-wide text-black transition-all hover:brightness-110 [background:linear-gradient(88.53deg,_#16FFA6_0%,_#12ED28_100%)_padding-box,_linear-gradient(180deg,_#90FF9F_0%,_#008A13_100%)_border-box]"
    >
      <span>Participar gratuitamente</span>
      <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}

export default function Biography() {
  return (
    <section
      aria-labelledby="biography-title"
      className="relative left-1/2 z-0 -mt-[2px] flex h-[2212px] w-screen -translate-x-1/2 flex-col items-center justify-start overflow-hidden bg-[#031B22] bg-[url('/images/oro/v12/bg_segunda_dobra_mobile.png')] bg-cover bg-top bg-no-repeat px-4 pb-14 md:h-[1618px] md:bg-[url('/images/oro/v12/bg_segunda_dobra_desktop.png')] md:bg-center md:px-0"
    >
      <div className="mx-auto w-full max-w-[348px] md:w-[1080px] md:max-w-none">
        <div className="mt-7 text-center md:mt-14 md:-translate-y-[60px]">
          <h2 id="biography-title" className="h-[140px] font-teramo text-[24px] font-bold uppercase leading-[145%] text-[#C0964B] md:mx-auto md:h-auto md:max-w-[760px] md:text-[32px]">
            A sua última chance de descobrir por que você não foi mais longe
          </h2>

          <div className="mt-6 min-h-[345px] font-raleway text-[16px] leading-[145%] text-[#F4F0E1] md:mx-auto md:min-h-0 md:max-w-[760px] md:text-[20px]">
            <p>
              Durante os últimos anos,{" "}
              <strong>O Resgate dos Otimistas teve um propósito muito claro: Encontrar pessoas que ainda acreditavam em uma vida diferente, em uma vida melhor.</strong>
            </p>

            <p className="mt-5">E esse propósito foi cumprido.</p>

            <p className="mt-5">
              <strong>Mais de 4 milhões de pessoas passaram por esse movimento.</strong> E uma coisa ficou clara: o Otimista que precisava ser resgatado… já foi.
            </p>

            <p className="mt-5">
              <strong>Por isso, a próxima edição do Resgate dos Otimistas será a última da nossa história.</strong> A última e a mais importante de todas.
            </p>

            <p className="mt-5">
              <strong>O Resgate dos Otimistas – Edição Final</strong>
              <br />
              se inicia no dia <strong>20 de julho, segunda-feira, 19h55.</strong>
            </p>

            <p className="mt-5">
              <strong>Garanta sua vaga agora.</strong>
            </p>
          </div>

          <div className="mx-auto mt-7 w-full max-w-[348px]">
            <ParticipateButton />
          </div>
        </div>

        <div className="mt-[640px] flex w-full justify-center md:mt-[40px] md:translate-x-[-10px] md:translate-y-[60px] md:justify-end">
          <article aria-labelledby="mentor-title" className="w-full max-w-[348px] text-[#07242C] md:max-w-[512px]">
            <h3 id="mentor-title" className="font-teramo text-[24px] font-bold uppercase leading-[110%] tracking-[0] md:text-[32px] md:leading-[112%]">
              <span className="block">Quem vai ser o seu</span>
              <span className="block">
                Mentor <span className="text-[#A50F13]">nessa jornada?</span>
              </span>
            </h3>

            <div className="mt-5 w-full max-w-[284px] font-teramo leading-[145%] text-[#104448] md:mt-6 md:max-w-[512px]">
              <p className="text-[25.13px] font-bold md:text-[24px]">Elton Euler</p>
              <p className="mt-3 text-[25.13px] font-normal md:mt-3 md:text-[24px]">Líder e Idealizador da Aliança Divergente</p>
            </div>

            <div className="mt-5 flex w-full flex-col gap-4 font-mulish text-[16px] font-normal leading-[145%] tracking-[0] text-[#07242C] md:mt-6 md:gap-5">
              <p className="font-bold">Elton Euler é um dos maiores exemplos de superação e transformação da atualidade.</p>

              <p>Antes de se tornar multimilionário e referência no desenvolvimento humano, quebrou 17 vezes e chegou a acreditar que o sucesso não era para ele.</p>

              <p>Decidido a mudar sua história, Elton descobriu o que realmente bloqueava seus resultados e, em menos de 3 anos, saiu das dívidas e construiu uma vida de prosperidade.</p>

              <p>Hoje, já apoiou mais de 160 mil pessoas em 40 países a destravarem suas vidas financeiras, relacionais, emocionais e sua saúde com técnicas práticas e poderosas.</p>

              <p>Agora, ele vai te mostrar o que está faltando para você desbloquear sua Permissão e elevar sua vida a um novo patamar.</p>

              <p className="font-bold">Você está pronto para descobrir?</p>

              <div className="mt-2">
                <ParticipateButton />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}