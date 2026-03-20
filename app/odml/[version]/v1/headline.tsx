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
      <p className="uppercase font-spectral text-[#D3CAC0] font-extrabold">
        Em apenas 1 dia, descubra<br className="hidden md:block" />
        como seus relacionamentos<br className="hidden md:block" />
        estão travando sua vida<br className="hidden md:block" />
        financeira...
      </p>
    ),
    text: (
      <div>
        <p className="md:hidden">
          E o caminho para se tornar uma MULHER LIVRE:
          prosperar, construir uma vida estável e ter um relacionamento saudável, sem carregar o mundo nas costas.
        </p>

        <div className="hidden md:block">
          <p>
            E o caminho para se tornar uma MULHER LIVRE:
          </p>
          <p>
            prosperar, construir uma vida estável e ter um relacionamento
          </p>
          <p>
            saudável, sem carregar o mundo nas costas.
          </p>
        </div>

        <p className="mt-2 text-[#C0964B] font-bold">
          Faça sua inscrição gratuita
        </p>
      </div>
    ),
  },

  {
    id: "h1",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral text-[#D3CAC0] font-extrabold">
        Conheça o plano que “improváveis”
        estão usando para destravar
        a vida financeira depois dos 30 —
        corrigindo os padrões que impedem
        você de avançar.<br className="hidden md:block" />
      </p>
    ),
    text: (
      <div>
        <p className="md:hidden">
          E o caminho para se tornar uma MULHER LIVRE:
          prosperar, construir uma vida estável e ter um relacionamento saudável, sem carregar o mundo nas costas.
        </p>

        <div className="hidden md:block">
          <p>
            E o caminho para se tornar uma MULHER LIVRE:
          </p>
          <p>
            prosperar, construir uma vida estável e ter um relacionamento
          </p>
          <p>
            saudável, sem carregar o mundo nas costas.
          </p>
        </div>

        <p className="mt-2 text-[#C0964B] font-bold">
          Faça sua inscrição gratuita
        </p>
      </div>
    ),
  },

  {
    id: "h2",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral text-[#D3CAC0] font-extrabold">
        Um processo prático para destravar
        sua vida financeira depois dos 30,
        corrigindo relacionamentos que travam
        suas decisões sem você perceber.<br className="hidden md:block" />
      </p>
    ),
    text: (
      <div>
        <p className="md:hidden">
          E o caminho para se tornar uma MULHER LIVRE:
          prosperar, construir uma vida estável e ter um relacionamento saudável, sem carregar o mundo nas costas.
        </p>

        <div className="hidden md:block">
          <p>
            E o caminho para se tornar uma MULHER LIVRE:
          </p>
          <p>
            prosperar, construir uma vida estável e ter um relacionamento
          </p>
          <p>
            saudável, sem carregar o mundo nas costas.
          </p>
        </div>

        <p className="mt-2 text-[#C0964B] font-bold">
          Faça sua inscrição gratuita
        </p>
      </div>
    ),
  },

  {
    id: "h3",
    isPicture: false,
    isLogo: true,
    title: (
      <p className="uppercase font-spectral text-[#D3CAC0] font-extrabold">
        Livre-se dos padrões que travam
        sua vida financeira, mesmo com todo
        seu esforço, capacidade e dedicação.

        <br />
        <span className="block mt-2">
          Ou ignore este movimento e repita
          o mesmo erro por mais 10 anos…
        </span>
      </p>
    ),
    text: (
      <div>
        <p className="md:hidden">
          E o caminho para se tornar uma MULHER LIVRE:
          prosperar, construir uma vida estável e ter um relacionamento saudável, sem carregar o mundo nas costas.
        </p>

        <div className="hidden md:block">
          <p>
            E o caminho para se tornar uma MULHER LIVRE:
          </p>
          <p>
            prosperar, construir uma vida estável e ter um relacionamento
          </p>
          <p>
            saudável, sem carregar o mundo nas costas.
          </p>
        </div>

        <p className="mt-2 text-[#C0964B] font-bold">
          Faça sua inscrição gratuita
        </p>
      </div>
    ),
  },
];