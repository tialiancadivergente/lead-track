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
    id: "h1",
    isPicture: false,
    isLogo: true,
    title: (
      <p
        className="uppercase font-spectral text-[#07242C] font-extrabold"
      >
        Você foi indicado para fazer <span className="text-[#006D71]">seu diagnóstico de dependência emocional</span> gratuito
      </p>
    ),
    text: (
      <p>
        Descubra como <span className="uppercase font-bold">aumentar o seu nível de permissão</span> e melhorar seus resultados nas finanças, nos relacionamentos e na saúde.
      </p>
    ),
  },
];
