import type { ReactNode } from "react";

interface IHeadline {
  id: number | string;
  isPicture: boolean;
  isLogo: boolean;
  title: ReactNode;
  text: ReactNode;
}

const description = (
  <p className="font-spectral text-[16px] leading-[135%] text-[#D3CAC0] md:text-[20px]">
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
      <p className="font-spectral font-extrabold uppercase leading-[1.05] text-[#D3CAC0]">
        Faça seu diagnóstico
        <br />
        <span className="text-[#C0964B]">de dependência</span>
        <br />
        <span className="text-[#C0964B]">emocional</span> gratuito
      </p>
    ),
    text: description,
  },

  {
    id: "h1",
    isPicture: false,
    isLogo: true,
    title: (
      <>
        <p className="font-spectral font-extrabold uppercase leading-[1.05] text-[#D3CAC0] md:hidden">
          <span className="block whitespace-nowrap">Quantas vezes você</span>
          <span className="block whitespace-nowrap">
            já disse: <span className="text-[#C0964B]">“Esse ano vai</span>
          </span>
          <span className="block whitespace-nowrap">
            <span className="text-[#C0964B]">ser diferente”</span> e passa
          </span>
          <span className="block whitespace-nowrap">o ano e nada muda?</span>
        </p>

        <p className="hidden font-spectral text-[34px] font-extrabold uppercase leading-[1.02] text-[#D3CAC0] md:block">
          <span className="block whitespace-nowrap">Quantas vezes você já</span>
          <span className="block whitespace-nowrap">
            disse: <span className="text-[#C0964B]">“Esse ano vai ser</span>
          </span>
          <span className="block whitespace-nowrap">
            <span className="text-[#C0964B]">diferente”</span>
          </span>
          <span className="block whitespace-nowrap">e passa o ano e nada</span>
          <span className="block whitespace-nowrap">muda?</span>
        </p>
      </>
    ),
    text: (
      <p className="font-spectral text-[16px] leading-[135%] text-[#D3CAC0] md:text-[20px]">
        Descubra quais padrões invisíveis travam a sua vida financeira e aprenda
        como superá-los no{" "}
        <span className="font-bold text-[#C0964B]">
          Resgate dos Otimistas.
        </span>
      </p>
    ),
  },

  {
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <>
        <p className="font-spectral text-[20px] font-extrabold uppercase leading-[1.05] text-[#D3CAC0] md:hidden">
          <span className="block whitespace-nowrap">Descubra porque você</span>
          <span className="block whitespace-nowrap">
            sabe mais do que muitas
          </span>
          <span className="block whitespace-nowrap">
            pessoas, mas mesmo assim
          </span>
          <span className="block whitespace-nowrap text-[#C0964B]">
            não é tão bem sucedido
          </span>
          <span className="block whitespace-nowrap text-[#C0964B]">
            financeiramente quanto
          </span>
          <span className="block whitespace-nowrap text-[#C0964B]">elas.</span>
        </p>

        <p className="hidden font-spectral text-[33px] font-extrabold uppercase leading-[1.03] text-[#D3CAC0] md:block">
          <span className="block whitespace-nowrap">Descubra porque você</span>
          <span className="block whitespace-nowrap">
            sabe mais do que muitas
          </span>
          <span className="block whitespace-nowrap">
            pessoas, mas mesmo assim
          </span>
          <span className="block whitespace-nowrap text-[#C0964B]">
            não é tão bem sucedido
          </span>
          <span className="block whitespace-nowrap text-[#C0964B]">
            financeiramente quanto
          </span>
          <span className="block whitespace-nowrap text-[#C0964B]">elas.</span>
        </p>
      </>
    ),
    text: (
      <p className="font-spectral text-[16px] leading-[135%] text-[#D3CAC0] md:text-[20px]">
        Identifique os padrões invisíveis que travam a sua vida financeira e
        aprenda como superá-los no{" "}
        <span className="font-bold text-[#C0964B]">
          Resgate dos Otimistas.
        </span>
      </p>
    ),
  },

  {
    id: "h3",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="font-spectral font-extrabold uppercase leading-[1.05] text-[#D3CAC0]">
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
    id: "h4",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="font-spectral font-extrabold uppercase leading-[1.05] text-[#D3CAC0]">
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
    id: "h5",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="font-spectral font-extrabold uppercase leading-[1.05] text-[#D3CAC0]">
        Tem gente menos preparada
        <br />
        vivendo melhor que você.
        <br />
        <span className="text-[#C0964B]">E isso não é injustiça.</span>
      </p>
    ),
    text: description,
  },
];