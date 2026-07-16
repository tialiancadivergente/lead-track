import type { ReactNode } from "react";

interface IHeadline {
  id: number | string;
  isPicture: boolean;
  isLogo: boolean;
  title: ReactNode;
  text: ReactNode;
}

const description = (
  <p className="font-spectral text-[20px] leading-[135%] text-[#D3CAC0]">
    Descubra quais padrões invisíveis travam o{" "}
    <span className="font-bold text-[#C0964B]">seu financeiro</span>{" "}
    e aprenda como superá-los na{" "}
    <span className="font-bold text-[#C0964B]">
      Última Edição do Resgate dos Otimistas.
    </span>
  </p>
);

export const Headline: IHeadline[] = [
  {
    id: "h0",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral font-extrabold text-[#D3CAC0] leading-[1.05]">
        Faça seu diagnóstico
        <br />
        <span className="text-[#C0964B]">
          de dependência
        </span>
        <br />
        <span className="text-[#C0964B]">
          emocional
        </span>{" "}
        gratuito
      </p>
    ),
    text: description,
  },

  {
    id: "h1",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral font-extrabold text-[#D3CAC0] leading-[1.05]">
        Você já percebeu que
        <br />
        sempre fica no “quase”?
        <br />
        <span className="text-[#C0964B]">
          Quase cresce. Quase prospera.
          <br />
          Quase dá certo.
        </span>
      </p>
    ),
    text: description,
  },

  {
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral font-extrabold text-[#D3CAC0] leading-[1.05]">
        Você não está atrasado.
        <br />
        <span className="text-[#C0964B]">
          Está emocionalmente preso.
        </span>
      </p>
    ),
    text: description,
  },

  {
    id: "h3",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral font-extrabold text-[#D3CAC0] leading-[1.05]">
        Tem gente menos preparada
        <br />
        vivendo melhor que você.
        <br />
        <span className="text-[#C0964B]">
          E isso não é injustiça.
        </span>
      </p>
    ),
    text: (
      <p className="font-spectral text-[20px] leading-[135%] text-[#D3CAC0]">
        Descubra quais padrões invisíveis travam o{" "}
        <span className="font-bold text-[#C0964B]">
          seu financeiro
        </span>{" "}
        e aprenda como superá-los na{" "}
        <span className="font-bold text-[#C0964B]">
          Última Edição do Resgate dos Otimistas.
        </span>
      </p>
    ),
  },
];