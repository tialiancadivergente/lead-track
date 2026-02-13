"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomRadio } from "@/app/components/custom-input";
import { useParams, useSearchParams } from "next/navigation";
import TagManager from "react-gtm-module";
import { Spectral } from "next/font/google";
import { questions } from "@/lib/questions";

const spectral = Spectral({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spectral",
  weight: ["400", "500", "600", "700"],
});

export default function Quiz({ params }: { params: { form: string } }) {
  const searchParams = useSearchParams();
  const _params = useParams();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [weights, setWeights] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [temperatura, setTemperatura] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);
  const [versao, setVersao] = useState<string | null>(null);
  const [domain, setDomain] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [weightsV2, setWeightsV2] = useState<Record<number, number>>({});
  const [totalScoreV2, setTotalScoreV2] = useState(0);
  const [hasSent, setHasSent] = useState(false);

  return (
    <div>
      <section
        className={`relative flex items-center justify-center overflow-hidden h-full `}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#0a3a4a] to-[#000000] opacity-100"></div>
          <Image
            src="https://resgatedosotimistas.com.br/wp-content/uploads/O-Resgate-dos-Otimistas-V7-TYP-Slice-1.webp"
            alt="Background Resgate dos Otimistas"
            fill
            priority
            className="object-cover object-center"
            style={{ opacity: 0.3 }}
          />
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-teal-600 border-r-transparent border-b-teal-600 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p
                className="text-white text-lg font-medium"
                style={{ fontFamily: '"Roboto", Sans-serif' }}
              >
                Processando suas respostas...
              </p>
              <p
                className="text-gray-300 text-sm mt-2"
                style={{ fontFamily: '"Roboto", Sans-serif' }}
              >
                Aguarde um momento, você será redirecionado em breve.
              </p>
            </div>
          </div>
        )}

        {/* Background com overlay */}
        <div className="container mx-auto relative h-full px-4">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-6 md:mb-8 flex justify-center">
                <Image
                  src="/images/logo-resgate-dos-otimistas.png"
                  alt="Logotipo Resgate dos otimistas"
                  width={
                    typeof window !== "undefined" && window.innerWidth > 768
                      ? 320
                      : 158
                  }
                  height={
                    typeof window !== "undefined" && window.innerWidth > 768
                      ? 196
                      : 70
                  }
                  priority
                  className="object-contain select-none pointer-events-none"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>

              <h1
                className={`text-2xl md:text-5xl font-bold text-custom-primary-gold -mt-4 mb-1 md:mb-2 text-center ${spectral.className}`}
              >
                FALTA APENAS UM PASSO
              </h1>
              <h2
                className={`text-2xl md:text-5xl font-bold text-custom-primary-gold mb-4 md:mb-7 text-center ${spectral.className}`}
              >
                PARA GARANTIR SUA VAGA!
              </h2>

              <p
                className="text-white text-base md:text-lg mb-5 md:mb-7 text-center"
                style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}
              >
                Para concluir sua inscrição, responda:
              </p>

              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-zinc-900 rounded-lg border border-white p-4 md:p-7 mb-6 md:mb-8 ">
                  <h3
                    className="text-white text-base md:text-lg font-medium mb-4 md:mb-5 md:text-left text-center"
                    style={{
                      color: "#fff",
                      fontFamily: '"Roboto", Sans-serif',
                    }}
                  >
                    {/* {currentQuestionData.question} */}
                  </h3>

                  {/* {currentQuestionData.type === "open" ? (
                    <input
                      type="text"
                      value={selectedValue}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Digite sua resposta aqui..."
                      className="w-full px-4 py-3 rounded-lg border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      style={{ fontFamily: '"Roboto", Sans-serif' }}
                    />
                  ) : (
                    <CustomRadio
                      style={{ fontFamily: '"Roboto", Sans-serif' }}
                      options={currentQuestionData.options}
                      value={selectedValue}
                      onChange={handleAnswer}
                    />
                  )} */}

                  {/* <div className="grid grid-cols-2 gap-3 md:gap-5 mt-5 md:mt-7">
                    {currentQuestion > 0 && (
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        className="bg-transparent border-gray-700 text-white hover:bg-gray-800 py-3 md:py-5 text-sm md:text-base"
                        style={{ fontFamily: '"Roboto", Sans-serif' }}
                      >
                        VOLTAR
                      </Button>
                    )}
                    {currentQuestion === 0 && <div></div>}
                    <Button
                      onClick={handleNext}
                      disabled={!selectedValue}
                      className={`bg-teal-600 hover:bg-teal-700 text-white py-3 md:py-5 text-sm md:text-base ${
                        currentQuestion === 0 ? "col-span-2" : ""
                      }`}
                      style={{ fontFamily: '"Roboto", Sans-serif' }}
                    >
                      {isLastQuestion ? "ENVIAR" : "PRÓXIMA"}
                    </Button>
                  </div> */}
                </div>
              </div>

              <div
                className="mb-6 md:mb-8 text-center"
                style={{ color: "#fff" }}
              >
                <p
                  className="text-white text-xs md:text-sm mb-4 md:mb-5"
                  style={{ fontFamily: '"Roboto", Sans-serif' }}
                >
                  Após responder as questões, toque no botão abaixo
                  <br className="hidden md:block" />
                  para receber o link e materiais do evento:
                </p>

                <Button
                  className="w-full max-w-sm py-4 md:py-6 text-sm md:text-base hover:opacity-90 transition-opacity duration-300 rounded-3xl"
                  // onClick={() => window.open(getWhatsappUrl(), '_blank')}
                  style={{
                    background:
                      "linear-gradient(96.48deg, #065100 -18.33%, #49E413 159.75%)",
                    fontFamily: '"Roboto", Sans-serif',
                  }}
                >
                  Clique aqui para entrar no Grupo no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Rodapé com copyright */}
      <footer className="w-full bg-black h-[150px] flex items-center justify-center">
        <p
          className="text-gray-400 text-sm md:text-base text-center"
          style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}
        >
          © 2023. All rights reserved. Política de Privacidade.
        </p>
      </footer>
    </div>
  );
}
