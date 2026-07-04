"use client"

import { useState } from "react"

export default function MentorSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = () => {
    setIsSubmitting(true)

    // Pequeno atraso para garantir que a página tenha tempo de renderizar completamente
    setTimeout(() => {
      const element = document.getElementById("hero")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        console.error("Elemento com id 'cadastro' não encontrado")
      }
      setIsSubmitting(false)
    }, 100)
  }

  return (
    <section id="mentor-section" className="bg-custom-background py-16 md:py-24">

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/5 mb-10 md:mb-0">
            <div className="relative w-full">
              <img
                src="/images/ramon-mentor-image.png"
                alt="Elton Euler - Mentor"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 md:pl-12 mt-[-150px] md:mt-0 p-10 md:p-0">
            <div className="w-full max-w-[512px] text-[#F4F0E1]">
              <div className="font-spectral text-2xl md:text-[32px] font-bold">
                QUEM VAI SER O SEU MENTOR NESSA JORNADA?
              </div>
              <div className="flex flex-col mt-4 mb-6 text-xl md:text-2xl font-bold">
                <p className="text-[#C0964B]">
                  Ramon Galimberti
                </p>
              </div>
              <div className="flex flex-col gap-4 font-regular font-raleway">
                <p>Ramon fez tudo o que disseram que daria certo. Estudou, se formou, foi até o mestrado. Tinha tudo o que deveria pra dar certo. E mesmo assim, não dava.</p>

                <p>Perto dos 30, se viu morando em cima da casa pais. Desempregado. Saindo de um relacionamento que tinha desabado. Usando o ticket do pai pra fazer compra no mercado e virar o mês. Diploma bonito na parede, mas o bolso vazio. E foi nesse momento que ele pensou: "o sucesso não é pra mim."</p>

                <p>Até descobrir o que realmente travava tudo, e não tinha nada a ver com competência. Era Permissão. Existia um padrão invisível que decidia o resultado por ele, antes que ele tivesse qualquer chance. Quando ele quebrou esse padrão, rompeu o teto financeiro que o prendia havia anos e que parecia impossível de ultrapassar.</p>

                <p>Hoje Ramon é o primeiro brasileiro autorizado a aplicar a Teoria da Permissão e guiou mais de 160 mil pessoas a enxergarem o mesmo padrão que as mantém presas: no dinheiro, na carreira e nas relações.</p>

                <p>No Resgate dos Otimistas, você vai entender que todo acontecimento ruim tem uma explicação, e a sua falta de resultado tem resposta. Uma resposta que você vai identificar, pra romper o seu teto financeiro de forma definitiva.</p>

                <p>Você tem coragem de ver?</p>
              </div>
            </div>

            <button onClick={handleClick} className="bg-custom-primary-gold text-custom-foreground mt-8 px-6 py-3 rounded-md font-medium mx-auto md:mx-0 block" disabled={isSubmitting}>
              {isSubmitting ? "PROCESSANDO..." : "PARTICIPAR GRATUITAMENTE"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

