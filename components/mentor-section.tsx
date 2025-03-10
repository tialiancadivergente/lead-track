"use client"

import { useState } from "react"

export default function MentorSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = () => {
    setIsSubmitting(true)
    const element = document.getElementById("form-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <section id="mentor-section" className="bg-background py-16 md:py-24 torn-paper-top">
      <div className="absolute inset-0 bg-mentor-pattern bg-cover bg-center opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/5 mb-10 md:mb-0">
            <div className="relative h-96 w-full">
              {/* Placeholder para a imagem do mentor */}
              <div className="w-full h-full bg-accent/20 relative">
                {/* Efeitos decorativos */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 z-0"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 z-0"></div>
              </div>
            </div>
          </div>

          <div className="md:w-3/5 md:pl-12">
            <h2 className="text-2xl md:text-3xl text-foreground mb-6 font-bold">
              QUEM VAI SER O SEU
              <br />
              <span className="text-foreground">MENTOR NESSA JORNADA?</span>
            </h2>

            <h3 className="text-primary text-xl md:text-2xl mb-2 font-bold">Elton Euler</h3>
            <p className="text-primary/90 mb-6">Líder e Idealizador da Aliança Divergente</p>

            <div className="space-y-4 text-foreground/80">
              <p>Elton Euler é um dos maiores exemplos de superação e transformação da atualidade.</p>

              <p>
                Antes de se tornar multimilionário e referência no desenvolvimento humano, quebrou 17 vezes e chegou a
                acreditar que sua vida não tinha mais solução.
              </p>

              <p>
                Decidido a mudar sua história, Elton descobriu o que realmente bloqueava seus resultados e, em menos de
                3 anos, saiu das dívidas e construiu uma vida de prosperidade.
              </p>

              <p>
                Hoje, já ajudou mais de 100 mil pessoas em 60 países a destraverem suas vidas financeiras, relacionais,
                emocionais e sua saúde com técnicas práticas e poderosas.
              </p>

              <p>
                Agora, ele vai te mostrar o que está faltando para você desbloquer sua Permissão e elevar sua vida a um
                novo patamar.
              </p>

              <p className="font-semibold">Você está pronto para descobrir?</p>
            </div>

            <button onClick={handleClick} className="btn-primary mt-8" disabled={isSubmitting}>
              {isSubmitting ? "PROCESSANDO..." : "PARTICIPAR GRATUITAMENTE"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

