import type { ReactNode } from "react";

interface IHeadline {
  id: number | string;
  isPicture: boolean;
  isLogo: boolean;
  title: ReactNode;
  text: ReactNode;
}

const description = (
  <p className="font-spectral text-[16px] font-normal leading-[135%] text-[#07242C] md:text-[20px]">
    Descubra quais padrões invisíveis travam o <span className="font-bold text-[#A50F13]">seu financeiro</span> e aprenda como superá-los na{" "}
    <span className="font-bold text-[#A50F13]">Última Edição do Resgate dos Otimistas.</span>
  </p>
);

export const Headline: IHeadline[] = [
  {
    id: "h0",
    isPicture: false,
    isLogo: true,
    title: (
      <h1 className="font-spectral text-[24px] font-extrabold uppercase leading-[120%] text-[#D3CAC0] md:text-[40px]">
        Faça seu diagnóstico
        <br />
        <span className="text-[#C0964B]">de dependência</span>
        <br />
        <span className="text-[#C0964B]">emocional</span> gratuito
      </h1>
    ),
    text: description,
  },
  {
    id: "h1",
    isPicture: false,
    isLogo: true,
    title: (
      <h1 className="w-full max-w-full whitespace-normal break-words font-spectral text-[clamp(20px,6vw,24px)] font-extrabold uppercase leading-[120%] tracking-[0] text-[#07242C] [hyphens:none] md:w-max md:max-w-none md:whitespace-nowrap md:text-[40px]">
        A sua ÚLTIMA chance{" "}
        <br className="hidden md:block" />
        de fazer seu <span className="text-[#A50F13]">Diagnóstico</span>{" "}
        <br className="hidden md:block" />
        <span className="text-[#A50F13]">de Dependência Emocional</span>{" "}
        <br className="hidden md:block" />
        gratuito.
      </h1>
    ),
    text: description,
  },
  {
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <h1 className="w-full max-w-full whitespace-normal break-words font-spectral text-[clamp(20px,6vw,24px)] font-extrabold uppercase leading-[120%] tracking-[0] text-[#07242C] [hyphens:none] md:w-max md:max-w-none md:whitespace-nowrap md:text-[40px]">
        Descubra quais padrões{" "}
        <br className="hidden md:block" />
        travam o seu financeiro{" "}
        <br className="hidden md:block" />
        e aprenda a superá-los{" "}
        <br className="hidden md:block" />
        no <span className="text-[#A50F13]">Último Resgate dos</span>{" "}
        <br className="hidden md:block" />
        <span className="text-[#A50F13]">Otimistas.</span>
      </h1>
    ),
    text: description,
  },
  {
    id: "h3",
    isPicture: false,
    isLogo: true,
    title: (
      <h1 className="font-spectral text-[24px] font-extrabold uppercase leading-[120%] text-[#D3CAC0] md:text-[40px]">
        Tem gente menos preparada
        <br />
        vivendo melhor que você.
        <br />
        <span className="text-[#C0964B]">E isso não é injustiça.</span>
      </h1>
    ),
    text: description,
  },
];