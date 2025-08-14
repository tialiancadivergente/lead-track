export interface QuestionOption {
  value: string;
  label: string;
  weight: number;
  weightV2?: number;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Em qual faixa etária você se encaixa?",
    options: [
      { value: "18-24", label: "18-24", weight: 9.2, weightV2: 10.6 },
      { value: "25-35", label: "25-35", weight: 19.5, weightV2: 16.48 },
      { value: "36-45", label: "36-45", weight: 22.7, weightV2: 18.68 },
      { value: "46-55", label: "46-55", weight: 20.4, weightV2: 24.07 },
      { value: "56+", label: "56 ou mais", weight: 15.9, weightV2: 26.52 },
    ],
  },
  {
    id: 2,
    question: "Qual é o seu nível de escolaridade?",
    options: [
      { value: "fundamental1", label: "Ensino Fundamental 1 (1º ao 5º ano)", weight: 7.5, weightV2: 14.5 },
      { value: "fundamental2", label: "Ensino Fundamental 2 (6º ao 9º ano)", weight: 7.7, weightV2: 18.6 },
      { value: "medio", label: "Ensino Médio (1º ao 3º)", weight: 11, weightV2: 15.37 },
      { value: "superior-incompleto", label: "Ensino Superior Incompleto", weight: 16.2, weightV2: 12.01 },
      { value: "superior", label: "Ensino Superior (Graduação/Faculdade)", weight: 23.3, weightV2: 28.6 },
      { value: "pos", label: "Pós-Graduação", weight: 28.7, weightV2: 35.8 },
      { value: "mestrado", label: "Mestrado", weight: 37.4, weightV2: 54.1 },
      { value: "doutorado", label: "Doutorado", weight: 41.4, weightV2: 56.8 },
    ],
  },
  {
    id: 3,
    question: "Qual seu sexo?",
    options: [
      { value: "feminino", label: "Sou do sexo Feminino", weight: 15.8, weightV2: 0 },
      { value: "masculino", label: "Sou do sexo Masculino", weight: 24.4, weightV2: 0 },
    ],
  },
  {
    id: 4,
    question: "Qual seu estado civil?",
    options: [
      { value: "solteiro", label: "Solteiro(o)", weight: 17.7, weightV2: 21.83 },
      { value: "casado", label: "Casado(o)", weight: 17, weightV2: 20.58 },
      { value: "separado", label: "Separado(o)", weight: 23.5, weightV2: 24.37 },
      { value: "viuvo", label: "Viúvo(o)", weight: 15.7, weightV2: 12.01 },
    ],
  },
  {
    id: 5,
    question: "Você tem filhos?",
    options: [
      { value: "sim", label: "Sim", weight: 16.7, weightV2: 19.97 },
      { value: "nao", label: "Não", weight: 23.5, weightV2: 28.29 },
    ],
  },
  {
    id: 6,
    question: "Qual das opções representa a sua renda mensal hoje?",
    options: [
      { value: "ate1000", label: "Até R$ 1.000,00", weight: 8.3, weightV2: 14.40 },
      { value: "1101a2500", label: "De R$ 1.101,00 a R$ 2.500,00", weight: 10.6, weightV2: 14.77 },
      { value: "2501a4000", label: "De R$ 2.501,00 a R$ 4.000,00", weight: 18.4, weightV2: 21.60 },
      { value: "4001a10000", label: "De R$ 4.001,00 a R$ 10.000,00", weight: 29.7, weightV2: 32.68 },
      { value: "acima10000", label: "Acima de R$ 10.000,00", weight: 51.5, weightV2: 52.59 },
    ],
  },
  {
    id: 7,
    question: "Você trabalha como (marque o trabalho que te gera mais renda):",
    options: [
      { value: "clt", label: "Funcionário CLT", weight: 12.7, weightV2: 16.72 },
      { value: "pj", label: "Funcionário PJ", weight: 23.8, weightV2: 38.08 },
      { value: "publico", label: "Funcionário Público", weight: 11.2, weightV2: 24.85 },
      { value: "autonomo", label: "Autônomo", weight: 24.2, weightV2: 22.00 },
      { value: "aposentado", label: "Aposentado", weight: 6.9, weightV2: 6.9 },
      { value: "liberal", label: "Profissional Liberal", weight: 34.4, weightV2: 31.76 },
      { value: "empresario", label: "Empresário", weight: 52, weightV2: 34.40 },
      { value: "desempregado", label: "Estou desempregado no momento", weight: 12.6, weightV2: 20.30 },
    ],
  },
  {
    id: 8,
    question: "Com que frequência você se sente sozinho(a)/travado(a) e com baixos resultados?",
    options: [
      { value: "as vezes", label: "Às vezes", weight: 16.7, weightV2: 22.70 },
      { value: "frequentemente", label: "Frequentemente", weight: 28.8, weightV2: 23.59 },
      { value: "sempre", label: "Sempre", weight: 27, weightV2: 23.15 },
      { value: "raramente", label: "Raramente", weight: 10.8, weightV2: 18.25 },
      { value: "nunca", label: "Nunca", weight: 6.3, weightV2: 0.00 },
    ],
  },
  {
    id: 9,
    question: "Você já buscou algum tipo de ajuda ou suporte (terapia, coaching, grupos de apoio) para lidar com seus desafios emocionais?",
    options: [
      { value: "sim", label: "Sim", weight: 34, weightV2: 33.52 },
      { value: "nao", label: "Não", weight: 9.3, weightV2: 8.71 },
    ],
  },
  {
    id: 10,
    question: "Se sim, o método utilizado foi eficaz?",
    options: [
      { value: "sim", label: "Sim", weight: 16.3, weightV2: 0 },
      { value: "parcialmente", label: "Parcialmente", weight: 31.7, weightV2: 0 },
      { value: "nao", label: "Não", weight: 18.6, weightV2: 18.6 },
      { value: "Nunca fiz", label: "Nunca fiz", weight: 12.6, weightV2: 12.6 },
    ],
  },
];