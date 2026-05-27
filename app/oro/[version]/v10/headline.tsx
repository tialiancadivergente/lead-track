import type { ReactNode } from "react";

interface IHeadline {
  id: number | string;
  isPicture: boolean;
  isLogo: boolean;
  title: ReactNode;
  text: ReactNode;
}

export const Headline: IHeadline[] = [
  {
    id: "h0",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral text-[#D3CAC0] text-[38px] font-extrabold">
        <span className="text-[#C0964B]">
          Destrave sua profissão e alcance promoção,
          reconhecimento e liberdade em 1 dia.
        </span>
      </p>
    ),

    text: (
      <div className="flex flex-col gap-6 text-[#F4F0E1] font-spectral">
        
        <p className="text-[24px] leading-[120%] font-bold">
          Sem trocar de carreira, sem mais
          cursos, sem continuar travado.
        </p>

        <p className="text-[20px] leading-[140%] font-normal">
          Descubra o que está te bloqueando de evoluir e vire essa chave de forma definitiva.
        </p>

        <p className="text-[20px] leading-[140%] font-bold">
          Faça sua inscrição 100% grátis para o evento online:
        </p>

      </div>
    ),
  },
];