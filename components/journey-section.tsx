"use client"

import { useState } from "react"

export default function JourneySection() {
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
    <section className="relative py-32 md:py-48 overflow-hidden torn-paper-top torn-paper-bottom z-[9999]">
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-100 z-9999" style={{ backgroundImage: "url('/images/journey-background-top-com-opacidade.png')"}}></div>
      {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/journey-background.png')", opacity: 0.3 }}></div> */}
      {/* <div className="absolute inset-0 gradient-overlay-gold"></div> */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-gold to-[#000000] opacity-20"></div> */}

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
        <h2 className="text-2xl md:text-4xl text-secondary font-bold mb-8">Que bom que você não desistiu.</h2>

        <p className="text-background font-medium mb-8 md:text-lg max-w-3xl mx-auto">
          Chega de dar o seu máximo e só ficar se perguntando o que faltou. Depois, fazer aquela velha mania inútil vai
          se perguntar o que falta para você ter o resultado merecido pelo seu esforço.
          <span className="font-bold"> Faça parte do Resgate dos Otimistas</span> ou continue se questionando e
          justificando o seu "quase sucesso".
        </p>

        <button onClick={handleClick} className="btn-secondary mt-6" disabled={isSubmitting}>
          {isSubmitting ? "PROCESSANDO..." : "PARTICIPAR GRATUITAMENTE"}
        </button>
      </div>
    </section>
  )
}

