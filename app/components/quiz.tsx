"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { CustomRadio } from "@/app/components/custom-input"

// Definição das perguntas e respostas com seus respectivos pesos
const questions = [
  {
    id: 1,
    question: "Em qual faixa etária você se encaixa?",
    options: [
      { value: "18-24", label: "18-24", weight: 9.2 },
      { value: "25-35", label: "25-35", weight: 19.5 },
      { value: "36-45", label: "36-45", weight: 22.7 },
      { value: "46-55", label: "46-55", weight: 20.4 },
      { value: "56+", label: "56 ou mais", weight: 15.9 },
    ],
  },
  {
    id: 2,
    question: "Qual é o seu nível de escolaridade?",
    options: [
      { value: "fundamental1", label: "Ensino Fundamental 1 (1º ao 5º ano)", weight: 14.5 },
      { value: "fundamental2", label: "Ensino Fundamental 2 (6º ao 9º ano)", weight: 18.6 },
      { value: "medio", label: "Ensino Médio (1º ao 3º)", weight: 17.3 },
      { value: "superior-incompleto", label: "Ensino Superior Incompleto", weight: 26.8 },
      { value: "superior", label: "Ensino Superior (Graduação/Faculdade)", weight: 28.6 },
      { value: "pos", label: "Pós-Graduação", weight: 35.8 },
      { value: "mestrado", label: "Mestrado", weight: 54.1 },
      { value: "doutorado", label: "Doutorado", weight: 56.8 },
    ],
  },
  {
    id: 3,
    question: "Como você se identifica?",
    options: [
      { value: "feminino", label: "Feminino", weight: 24.8 },
      { value: "masculino", label: "Masculino", weight: 28 },
    ],
  },
  {
    id: 4,
    question: "Qual seu estado civil?",
    options: [
      { value: "solteiro", label: "Solteiro(o)", weight: 17.7 },
      { value: "casado", label: "Casado(o)", weight: 17 },
      { value: "separado", label: "Separado(o)", weight: 23.5 },
      { value: "viuvo", label: "Viúvo(o)", weight: 15.7 },
    ],
  },
  {
    id: 5,
    question: "Você tem filhos?",
    options: [
      { value: "sim", label: "Sim", weight: 24.6 },
      { value: "nao", label: "Não", weight: 28.6 },
    ],
  },
  {
    id: 6,
    question: "Qual das opções representa a sua renda mensal hoje?",
    options: [
      { value: "ate1000", label: "Até R$ 1.000,00", weight: 15.4 },
      { value: "1001a2500", label: "De R$ 1.001,00 a R$ 2.500,00", weight: 18.2 },
      { value: "2501a4000", label: "De R$ 2.501,00 a R$ 4.000,00", weight: 26.5 },
      { value: "4001a10000", label: "De R$ 4.001,00 a R$ 10.000,00", weight: 36.5 },
      { value: "acima10000", label: "Acima de R$ 10.000,00", weight: 51.5 },
    ],
  },
  {
    id: 7,
    question: "Você trabalha como (marque o trabalho que te gera mais renda):",
    options: [
      { value: "clt", label: "Funcionário CLT", weight: 0 },
      { value: "pj", label: "Funcionário PJ", weight: 0 },
      { value: "publico", label: "Funcionário Público", weight: 0 },
      { value: "autonomo", label: "Autônomo", weight: 0 },
      { value: "aposentado", label: "Aposentado", weight: 0 },
      { value: "liberal", label: "Profissional Liberal", weight: 0 },
      { value: "empresario", label: "Empresário", weight: 0 },
      { value: "desempregado", label: "Estou desempregado no momento", weight: 0 },
    ],
  },
  {
    id: 8,
    question: "Com que frequência você lê livros ou conteúdos educativos?",
    options: [
      { value: "sempre", label: "Sempre", weight: 26.5 },
      { value: "frequentemente", label: "Frequentemente", weight: 28 },
      { value: "asvezes", label: "Às vezes", weight: 23.1 },
      { value: "raramente", label: "Raramente", weight: 16.6 },
      { value: "nunca", label: "Nunca", weight: 16.4 },
    ],
  },
  {
    id: 9,
    question: "Você já fez algum curso online?",
    options: [
      { value: "sim", label: "Sim", weight: 34.6 },
      { value: "nao", label: "Não", weight: 16.9 },
    ],
  },
  {
    id: 10,
    question: "Com que frequência você se sente sozinho(a)/travado(a) e com baixos resultados?",
    options: [
      { value: "nunca", label: "Nunca", weight: 0 },
      { value: "raramente", label: "Raramente", weight: 0 },
      { value: "asvezes", label: "Às vezes", weight: 0 },
      { value: "frequentemente", label: "Frequentemente", weight: 0 },
      { value: "sempre", label: "Sempre", weight: 0 },
    ],
  },
  {
    id: 11,
    question:
      "Você já buscou algum tipo de ajuda ou suporte (terapia, coaching, grupos de apoio) para lidar com seus desafios emocionais?",
    options: [
      { value: "sim", label: "Sim", weight: 27.8 },
      { value: "parcialmente", label: "Parcialmente", weight: 36.9 },
      { value: "nao", label: "Não", weight: 24.9 },
      { value: "nuncafiz", label: "Nunca fiz", weight: 17.3 },
    ],
  },
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [weights, setWeights] = useState<Record<number, number>>({})
  const [completed, setCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  const handleAnswer = (value: string) => {
    const question = questions[currentQuestion]
    const selectedOption = question.options.find((option) => option.value === value)

    if (selectedOption) {
      const newAnswers = { ...answers, [question.id]: value }
      const newWeights = { ...weights, [question.id]: selectedOption.weight }

      setAnswers(newAnswers)
      setWeights(newWeights)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calcular pontuação total
      const score = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
      setTotalScore(score)
      setCompleted(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=110&width=320"
              alt="O Resgate dos Otimistas"
              width={320}
              height={110}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl font-bold text-amber-500 mb-5">OBRIGADO POR PARTICIPAR!</h1>

          <div className="bg-zinc-900 rounded-lg p-8 mb-8">
            <p className="text-white text-lg mb-7">
              Com base nas suas respostas, temos um conteúdo especial para você. Clique no botão abaixo para acessá-lo!
            </p>

            <Button
              className="w-full py-6 text-lg bg-green-600 hover:bg-green-700"
              onClick={() => window.open("#", "_blank")}
            >
              Clique aqui para entrar no Grupo no WhatsApp
            </Button>
          </div>

          <p className="text-gray-400 text-sm">© 2023. All rights reserved. Política de Privacidade.</p>
        </div>
      </div>
    )
  }

  const currentQuestionData = questions[currentQuestion]
  const selectedValue = answers[currentQuestionData.id] || ""
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="mb-8">
          <Image
            src="/placeholder.svg?height=110&width=320"
            alt="O Resgate dos Otimistas"
            width={320}
            height={110}
            className="mx-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-amber-500 mb-2">FALTA APENAS UM PASSO</h1>
        <h2 className="text-4xl font-bold text-amber-500 mb-7">PARA GARANTIR SUA VAGA!</h2>

        <p className="text-white text-lg mb-7">Para concluir sua inscrição, responda:</p>

        <div className="mb-5">
          <Progress value={progress} className="h-1.5 bg-gray-700" />
          <p className="text-right text-sm text-gray-400 mt-1.5">
            {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-7 mb-8">
          <h3 className="text-white text-lg font-medium mb-5">{currentQuestionData.question}</h3>

          <CustomRadio options={currentQuestionData.options} value={selectedValue} onChange={handleAnswer} />

          <div className="grid grid-cols-2 gap-5 mt-7">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="bg-transparent border-gray-700 text-white hover:bg-gray-800 py-5 text-base"
              >
                VOLTAR
              </Button>
            )}
            {currentQuestion === 0 && <div></div>}
            <Button
              onClick={handleNext}
              disabled={!selectedValue}
              className="bg-teal-600 hover:bg-teal-700 text-white py-5 text-base"
            >
              {isLastQuestion ? "ENVIAR" : "PRÓXIMA"}
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-white text-sm mb-5">
            Após responder as questões, toque no botão abaixo
            <br />
            para receber o link e materiais do evento:
          </p>

          <Button className="w-full py-6 text-lg bg-green-600 hover:bg-green-700" disabled>
            Clique aqui para entrar no Grupo no WhatsApp
          </Button>
        </div>

        <p className="text-gray-400 text-sm">© 2023. All rights reserved. Política de Privacidade.</p>
      </div>
    </div>
  )
}

