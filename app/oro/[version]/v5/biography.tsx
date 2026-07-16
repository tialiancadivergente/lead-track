"use client";

import Image from "next/image";
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
      <ArrowUpRight size={18} strokeWidth={2.5} />
    </button>
  );
}

export default function Biography() {
  return (
    <section className="relative z-0 flex h-[1992px] flex-col items-center justify-start overflow-hidden bg-[#031B22] bg-[url('/images/oro/v5.1/bg_segunda_dobra_mobile.png')] bg-cover bg-top px-4 pb-14 md:h-[1607px] md:bg-[url('/images/oro/v5.1/bg_sugunda_dobra_desktop.png')] md:bg-center md:px-0">
      <div className="mx-auto w-full max-w-[348px] md:w-[1080px] md:max-w-none">
        <div className="mt-7 text-center md:mt-14">
          <h2 className="h-[140px] font-teramo text-[24px] font-bold uppercase leading-[145%] text-[#C0964B] md:mx-auto md:h-auto md:max-w-[760px] md:text-[32px]">
            Chega de dar o seu máximo e só ficar se perguntando o que faltou.
          </h2>

          <div className="mt-6 min-h-[345px] font-raleway text-[16px] leading-[145%] text-[#F4F0E1] md:mx-auto md:min-h-0 md:max-w-[760px] md:text-[20px]">
            <p>
              <strong>Chegou o momento de entender de verdade o que falta para você ter o resultado que realmente merece.</strong>{" "}
              Toda demora nos resultados esconde uma espera nas relações, e através do seu Diagnóstico de Dependência Emocional você conseguirá mapear exatamente o que ou quem está te impedindo de destravar a sua vida.
            </p>

            <p className="mt-5">
              Mas esta será a <strong>Última Edição do Resgate dos Otimistas</strong>. A sua última chance de ter acesso <strong>GRATUITO</strong> às nossas ferramentas de análise emocional e ao diagnóstico completo. <strong>Garanta sua vaga agora.</strong>
            </p>
          </div>

          <div className="mx-auto mt-7 w-full max-w-[348px]">
            <ParticipateButton />
          </div>
        </div>

        <div className="mt-[300px] flex w-full justify-center md:mt-[200px] md:justify-end">
          <div className="w-full text-[#F4F0E1] md:max-w-[512px]">
            <h3 className="font-spectral text-[24px] font-bold uppercase leading-[120%] md:text-[32px]">
              Quem vai ser o seu mentor nessa jornada?
            </h3>

            <p className="mb-6 mt-4 font-raleway text-[20px] font-bold text-[#C0964B] md:text-[24px]">
              Ramon Galimberti
            </p>

            <div className="flex flex-col gap-4 font-raleway text-[16px] font-normal leading-[145%]">
              <p>
                Ramon fez tudo o que disseram que daria certo. Estudou, se formou, foi até o mestrado. Tinha tudo o que deveria pra dar certo. E mesmo assim, não dava.
              </p>

              <p>
                Perto dos 30, se viu morando em cima da casa pais. Desempregado. Saindo de um relacionamento que tinha desabado. Usando o ticket do pai pra fazer compra no mercado e virar o mês. Diploma bonito na parede, mas o bolso vazio bonito na parede, mas o bolso vazio. E foi nesse momento que ele pensou: &quot;o sucesso não é pra mim.&quot;
              </p>

              <p>
                Até descobrir o que realmente travava tudo, e não tinha nada a ver com competência. Era Permissão. Existia um padrão invisível que decidia o resultado por ele, antes que ele tivesse qualquer chance. Quando ele quebrou esse padrão, rompeu o teto financeiro que o prendia havia anos e que parecia impossível de ultrapassar.
              </p>

              <p>
                Hoje Ramon é o primeiro brasileiro autorizado a aplicar a Teoria da Permissão e guiou mais de 160 mil pessoas a enxergarem o mesmo padrão que as mantém presas: no dinheiro, na carreira e nas relações.
              </p>

              <p>
                No Resgate dos Otimistas, você vai entender que todo acontecimento ruim tem uma explicação, e a sua falta de resultado tem resposta. Uma resposta que você vai identificar, pra romper o seu teto financeiro de forma definitiva.
              </p>

              <p className="font-bold">Você tem coragem de ver?</p>

              <div className="mt-2">
                <ParticipateButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Image src="/images/oro/v5.1/bg_segunda_dobra_mobile.png" alt="" width={1} height={1} className="hidden" />
    </section>
  );
}