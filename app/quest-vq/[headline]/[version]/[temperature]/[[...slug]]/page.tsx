"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";
import TagManager from "react-gtm-module";
import { Spectral } from "next/font/google";
import { questionsQv } from "@/lib/questions-qv";
import { CustomInputRadio } from "@/app/components/custom-input-radio";
import { Calendar, MoveUpRight, Phone, Smartphone } from "lucide-react";
import { getTagIdByTemperature } from "@/lib/temperature-utils";

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
  const [isAnswered, setIsAnswered] = useState(false);
  const [formLead, setFormLead] = useState(false);
  const [formFields, setFormFields] = useState<Record<string, string> | null>(
    null
  );
  const [hasSent, setHasSent] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showFirstInterstitial, setShowFirstInterstitial] = useState(false);
  const [showSecondInterstitial, setShowSecondInterstitial] = useState(false);
  const [tagId, setTagId] = useState<number | null>(null);
  const fullUrl = Object.values(_params).flat().join("/");

  const mapTagSendFlow = useCallback(
    () => ({
      f: "https://redirects.aliancadivergente.com.br/oro-pages-f",
      org: "https://redirects.aliancadivergente.com.br/oro-pages-org",
      m: "https://redirects.aliancadivergente.com.br/oro-pages-m",
      q: "https://redirects.aliancadivergente.com.br/oro-pages-q",
    }),
    [_params.slug]
  )();

  const getWhatsappUrl = () => {
    const validKeys = ["f", "m", "q", "org"] as const;
    const key = (temperatura || "").toLowerCase();
    const resolvedKey = (validKeys as readonly string[]).includes(key)
      ? key
      : "f";
    return (
      mapTagSendFlow[resolvedKey as keyof typeof mapTagSendFlow] ||
      mapTagSendFlow["f"]
    );
  };

  const launch = "[ORO][NOV25]";

  // Capturar o domínio da página
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== "undefined") {
      const currentDomain = window.location.hostname;
      console.log("Current domain:", currentDomain);
      setDomain(currentDomain);
    }
  }, []);

  useEffect(() => {
    if (_params.slug) {
      setIsDark(_params.slug[0] === "1");
    } else {
      setIsDark(false);
    }
  }, [_params.slug]);

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (_params && _params.temperature) {
      console.log("temperatura param quest", _params.temperature);

      let tipoValue = _params.headline;
      let versaoValue = _params.version;
      let temperaturaValue = _params.temperature;

      console.log("Tipo:", tipoValue);
      console.log("Versão:", versaoValue);
      console.log("Temperatura:", temperaturaValue);

      setTipo(tipoValue as string);
      setVersao(versaoValue as string);
      setTemperatura(temperaturaValue as string);

      const calculatedTagId = getTagIdByTemperature(temperaturaValue as string);
      setTagId(calculatedTagId);
    }
  }, [_params]);

  // Capturar UTMs da queryString
  useEffect(() => {
    if (searchParams) {
      const utmParams: Record<string, string> = {};
      let hasUtm = false;

      // Lista de parâmetros UTM comuns
      const utmKeys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "utm_id",
      ];

      // Verificar cada parâmetro UTM
      utmKeys.forEach((key) => {
        const value = searchParams.get(key);
        if (value) {
          utmParams[key] = value;
          hasUtm = true;
        }
      });

      // Adicionar outros parâmetros da query que não são UTM
      searchParams.forEach((value, key) => {
        if (!utmKeys.includes(key) && key !== "temperatura") {
          utmParams[key] = value;
          hasUtm = true;
        }
      });

      // Definir formFields apenas se houver UTMs
      if (hasUtm) {
        console.log("UTM params:", utmParams);
        setFormFields(utmParams);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Atualiza o valor do progresso quando a pergunta atual muda
    const newProgress = ((currentQuestion + 1) / questionsQv.length) * 100;
    setProgressValue(newProgress);
  }, [currentQuestion]);

  useEffect(() => {
    if (!completed || hasSent) {
      return;
    }

    if (completed) {
      setIsLoading(true);
      const cleanedPhone = whatsapp.replace(/\s+|-|\(|\)|\./g, "");

      //Calculate the faixa based on totalScore
      let faixa;
      if (totalScore >= 180.3) {
        faixa = "Faixa A";
      } else if (totalScore >= 162.7) {
        faixa = "Faixa B";
      } else if (totalScore >= 136.3) {
        faixa = "Faixa C";
      } else if (totalScore >= 124.9) {
        faixa = "Faixa D";
      } else {
        faixa = "Faixa";
      }

      let faixaV2;
      if (totalScoreV2 >= 200) {
        faixaV2 = "Faixa A";
      } else if (totalScoreV2 >= 182) {
        faixaV2 = "Faixa B";
      } else if (totalScoreV2 >= 151) {
        faixaV2 = "Faixa C";
      } else {
        faixaV2 = "Faixa";
      }

      // Prepare detailed answers with questions and selected options
      const detailedAnswers: Record<string, string> = {};
      Object.entries(answers).forEach(([questionId, answerValue]) => {
        const questionObj = questionsQv.find(
          (q) => q.id === parseInt(questionId)
        );
        const selectedOption = questionObj?.options.find(
          (opt) => opt.value === answerValue
        );
        if (questionObj) {
          if (questionObj.phrase) {
            detailedAnswers[questionObj.phrase] =
              selectedOption?.label || answerValue;
          } else {
            detailedAnswers[questionObj.question] =
              selectedOption?.label || answerValue;
          }
        }
      });

      const payloadLead: Record<string, any> = {
        email,
        phone: cleanedPhone,
        temperature: temperatura,
        tipo,
        version: versao,
        parametroCompleto: fullUrl,
        domain,
        uri: domain,
        tagId: tagId,
        launch,
        path: window.location.pathname,
      };

      if (formFields) {
        payloadLead.formFields = formFields;
      }

      // Prepare the data to be sent to GTM
      const gtmData = {
        email,
        phone: cleanedPhone,
        answers: answers,
        totalScore: Math.round(totalScore),
        totalScoreV2: Math.round(totalScoreV2),
        faixa: faixa,
        faixaV2: faixaV2,
        tipo: tipo,
        version: versao,
        temperature: temperatura,
      };

      const payload = {
        ...gtmData,
        detailedAnswers: detailedAnswers,
        domain: domain,
        launch: launch,
        utm_source: searchParams.get("utm_source") || "",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || "",
        utm_content: searchParams.get("utm_content") || "",
        utm_term: searchParams.get("utm_term") || "",
        path: window.location.pathname,
      };

      // Still send to GTM as before
      TagManager.dataLayer({
        dataLayer: {
          event: "leadscore",
          ...gtmData,
        },
      });

      fetch("/api/register-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadLead),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorMsg = await response.text();
            console.error("Erro ao registrar lead:", errorMsg);
          }
        })
        .catch((error) => {
          console.error("Erro na requisição para /api/register-lead:", error);
        });

      // Send data to our proxy API
      fetch("/api/quiz-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setHasSent(true);
          window.location.replace(getWhatsappUrl());
        })
        .catch((error) => {
          console.error("Error:", error);
          setHasSent(true);
          window.location.replace(getWhatsappUrl());
        });
    }
  }, [completed, hasSent]); // envia apenas uma vez ao completar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const leads = JSON.parse(localStorage.getItem("leads") || "[]");
    leads.push({ email, whatsapp, date: new Date().toISOString() });
    localStorage.setItem("leads", JSON.stringify(leads));

    setSuccess(true);
    setIsSubmitting(false);
    setCompleted(true);

    setTimeout(() => {
      setSuccess(false);
      setEmail("");
      setWhatsapp("");
    }, 3000);
  };

  const handleAnswer = (value: string) => {
    const question = questionsQv[currentQuestion];

    // Se for uma pergunta aberta (open), apenas salva a resposta
    if (question.type === "open") {
      const newAnswers = { ...answers, [question.id]: value };
      setAnswers(newAnswers);
      return;
    }

    // Para perguntas com opções (radio), busca a opção selecionada
    const selectedOption = question.options.find(
      (option) => option.value === value
    );

    if (selectedOption) {
      const newAnswers = { ...answers, [question.id]: value };
      const newWeights = { ...weights, [question.id]: selectedOption.weight };
      const newWeightsV2: Record<number, number> = {
        ...weightsV2,
        [question.id]: selectedOption.weightV2 || 0,
      };

      setAnswers(newAnswers);
      setWeights(newWeights);
      setWeightsV2(newWeightsV2);
    }
  };

  const handleNext = () => {
    // Verificar se acabou de responder a pergunta 13
    if (currentQuestionData.id === 13) {
      setShowFirstInterstitial(true);
      return;
    }

    if (currentQuestion < questionsQv.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular pontuação total
      setIsLoading(true);
      let score = Object.values(weights).reduce(
        (sum, weight) => sum + weight,
        0
      );
      let scoreV2 = Object.values(weightsV2).reduce(
        (sum, weight) => sum + weight,
        0
      );

      // // Adicionar pontuação extra baseada na URL
      // const publicoScore = window.location.href.indexOf('f-typ') !== -1 ||
      //     window.location.href.indexOf('m-typ') !== -1 ||
      //     window.location.href.indexOf('q-typ') !== -1 ? 10 : 0;

      // score += publicoScore;
      setTotalScore(score);
      setTotalScoreV2(scoreV2);
      setIsAnswered(true);
      // setCompleted(true);
    }
  };

  const handleBack = () => {
    // Se estiver nos componentes intermediários, não permitir voltar
    if (showFirstInterstitial || showSecondInterstitial) {
      return;
    }

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFirstInterstitialContinue = () => {
    setShowFirstInterstitial(false);
    setShowSecondInterstitial(true);
  };

  const handleSecondInterstitialContinue = () => {
    setShowSecondInterstitial(false);
    // Encontrar o índice da pergunta 14 e avançar para ela
    const question14Index = questionsQv.findIndex((q) => q.id === 14);
    if (question14Index !== -1) {
      setCurrentQuestion(question14Index);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "whatsapp") {
      // Remove todos os caracteres não numéricos
      const numericValue = value.replace(/\D/g, "");

      // Aplica a formatação de acordo com a quantidade de dígitos
      let formattedValue = numericValue;
      if (numericValue.length <= 2) {
        formattedValue = numericValue;
      } else if (numericValue.length <= 7) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
          2
        )}`;
      } else {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
          2,
          7
        )}-${numericValue.slice(7, 11)}`;
      }

      setWhatsapp(formattedValue);
    } else {
      setWhatsapp(value);
    }
  };

  const currentQuestionData = questionsQv[currentQuestion];
  const selectedValue = currentQuestionData
    ? answers[currentQuestionData.id] || ""
    : "";
  const isLastQuestion = currentQuestion === questionsQv.length - 1;

  // Se não estamos no cliente, não renderize nada
  if (!isClient) {
    return null;
  }

  return (
    <div>
      {!isAnswered && !formLead && (
        <section
          className={`relative flex flex-col items-center justify-start pt-10 overflow-hidden h-full sm:bg-[url('/images/vq-1/bg-quiz.webp')] bg-[url('/images/vq-1/bg-quiz-mobile.webp')] bg-center bg-cover bg-no-repeat w-full min-h-screen `}
        >
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
          <div className="mb-0 flex justify-center">
            <Image
              src={
                isDark
                  ? "/images/logo-o-resgate-dos-otimistas-white.png"
                  : "/images/logo-o-resgate-dos-otimistas.png"
              }
              alt="Logotipo Resgate dos otimistas"
              width={424}
              height={164}
              priority
              className="object-contain select-none pointer-events-none"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>

          <div className="container mx-auto relative h-full px-4">
            <div className="flex flex-col items-center justify-center text-center pb-8">
              <div className="w-full max-w-4xl mx-auto">
                <div className="w-full mx-auto">
                  {showFirstInterstitial ? (
                    <div className="p-4 md:p-7 mb-6 md:mb-8">
                      <h3 className="sm:text-[40px]/[44px] text-[30px]/[34px] text-[#07242c] font-medium mb-4 md:mb-5 text-center max-w-[688px] mx-auto">
                        Você não está sozinho(a) nessa jornada.
                      </h3>
                      <div className="hidden sm:block">
                        <Image
                          src="/images/vq-1/plateia.webp"
                          alt="Interstitial 1"
                          width={1000}
                          height={1000}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="block sm:hidden">
                        <Image
                          src="/images/vq-1/plateia-mobile.webp"
                          alt="Interstitial 1"
                          width={1000}
                          height={1000}
                          className="w-full h-auto"
                        />
                      </div>

                      <p className="sm:text-2xl text-base text-[#07242c] mb-6 max-w-[688px] mx-auto font-roboto">
                        Milhares de pessoas já passaram por aqui — e encontraram
                        no Resgate dos Otimistas o caminho para romper seus
                        bloqueios emocionais, aumentar sua Permissão e destravar
                        resultados na saúde, nos relacionamentos e na vida
                        financeira.
                      </p>
                      <p className="sm:text-2xl text-base text-[#07242c] mb-6 max-w-[688px] mx-auto font-roboto">
                        Foi assim que começaram a construir{" "}
                        <span className="font-bold text-[#006D71]">
                          uma vida bem-sucedida, abundante e memorável
                        </span>
                        .
                      </p>
                      <Button
                        onClick={handleFirstInterstitialContinue}
                        className="w-full flex items-center justify-center max-w-[380px] mx-auto bg-gradient-to-r from-[#16FFA6] to-[#12ED28] text-black font-extrabold font-roboto py-5 px-6 rounded-xl text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110 hover:shadow-lg"
                        style={{
                          boxShadow:
                            "inset 0 -3px 1px #00000040, inset 0 0 6px #0eac45",
                          transition:
                            "transform 0.2s, box-shadow 0.2s, filter 0.2s",
                        }}
                      >
                        CONTINUAR
                      </Button>
                    </div>
                  ) : showSecondInterstitial ? (
                    <div className="p-4 md:p-7 mb-6 md:mb-8">
                      <h3 className="sm:text-[40px]/[44px] text-[30px]/[34px] text-[#07242c] font-medium mb-0 md:mb-5 text-center">
                        Essa transformação também pode ser sua!
                      </h3>
                      <div className="hidden sm:block">
                        <Image
                          src="/images/vq-1/depoimentos.webp"
                          alt="Interstitial 1"
                          width={1000}
                          height={1000}
                          className="w-full h-auto mt-10"
                        />
                      </div>
                      <div className="block sm:hidden">
                        <Image
                          src="/images/vq-1/depoimentos-mobile.webp"
                          alt="Interstitial 1"
                          width={1000}
                          height={1000}
                          className="w-full h-auto mt-1"
                        />
                      </div>
                      <Button
                        onClick={handleSecondInterstitialContinue}
                        className="w-full mt-10 flex items-center justify-center max-w-[380px] mx-auto bg-gradient-to-r from-[#16FFA6] to-[#12ED28] text-black font-extrabold font-roboto py-5 px-6 rounded-xl text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110 hover:shadow-lg"
                        style={{
                          boxShadow:
                            "inset 0 -3px 1px #00000040, inset 0 0 6px #0eac45",
                          transition:
                            "transform 0.2s, box-shadow 0.2s, filter 0.2s",
                        }}
                      >
                        CONTINUAR
                      </Button>
                    </div>
                  ) : currentQuestionData ? (
                    <div className="p-4 md:p-7 mb-6 md:mb-8 ">
                      <h3 className="sm:text-[40px]/[44px] text-[30px]/[34px] text-[#07242c] font-medium mb-4 md:mb-5 text-center">
                        {currentQuestionData.question}
                      </h3>
                      {currentQuestionData.phrase && (
                        <p className="text-xl text-[#07242c] mb-6">
                          "{currentQuestionData.phrase}"
                        </p>
                      )}
                      {currentQuestionData.type === "open" ? (
                        <input
                          type="text"
                          value={selectedValue}
                          onChange={(e) => handleAnswer(e.target.value)}
                          placeholder="Digite sua resposta aqui..."
                          className="w-full px-4 py-3 rounded-lg border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                        />
                      ) : (
                        <CustomInputRadio
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                          options={currentQuestionData.options}
                          value={selectedValue}
                          onChange={handleAnswer}
                        />
                      )}

                      <div className="grid grid-cols-2 gap-3 md:gap-5 mt-5 md:mt-7">
                        {currentQuestion > 0 && (
                          <Button
                            onClick={handleBack}
                            className="bg-[#F4F0E1] hover:text-white border-gray-700 text-[#07242c] hover:bg-gray-800 py-3 md:py-5 text-sm md:text-base"
                            style={{ fontFamily: '"Roboto", Sans-serif' }}
                          >
                            VOLTAR
                          </Button>
                        )}
                        {currentQuestion === 0 && <div></div>}
                        <Button
                          onClick={handleNext}
                          disabled={!selectedValue}
                          className={`bg-[#07242c] hover:bg-teal-700 text-white py-3 md:py-5 text-sm md:text-base ${
                            currentQuestion === 0 ? "col-span-2" : ""
                          }`}
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                        >
                          {isLastQuestion ? "ENVIAR" : "PRÓXIMA"}
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isAnswered && !formLead && (
        <section
          className={`relative flex flex-col items-end justify-center pt-10 overflow-hidden h-full sm:bg-[url('/images/vq-1/bg-quiz-oro.webp')] bg-[url('/images/vq-1/bg-quiz-oro-mobile.webp')] bg-top bg-cover bg-no-repeat w-full min-h-screen `}
        >
          <div className="container mx-auto relative w-full h-full px-4 flex items-center justify-end mt-60 sm:mt-0">
            <div className="w-full lg:max-w-[520px] max-w-[400px] flex flex-col items-start justify-start gap-4 sm:pb-0 pb-10">
              <h1 className="sm:text-4xl text-2xl text-[#D3CAC0]">
                E quem vai ser o seu mentor nessa jornada?
              </h1>
              <h2 className="sm:text-2xl text-xl text-[#c0964b] font-bold">Elton Euler</h2>
              <h3 className="text-base text-[#F4F0E1] font-bold">
                É um dos maiores exemplos de superação e transformação da
                atualidade.
              </h3>
              <p className="text-base text-[#D3CAC0]">
                Antes de se tornar multimilionário e referência no
                desenvolvimento humano, quebrou 17 vezes e chegou a acreditar
                que sua vida não tinha mais solução.
              </p>
              <p className="text-base text-[#D3CAC0]">
                Decidido a mudar sua história, Elton descobriu o que realmente
                bloqueava seus resultados e, em menos de 3 anos, saiu das
                dívidas e construiu uma vida de prosperidade.
              </p>
              <p className="text-base text-[#D3CAC0]">
                Hoje,{" "}
                <span className=" text-[#F4F0E1] font-bold">
                  já ajudou mais de 150 mil pessoas em 75 países{" "}
                </span>
                a destravarem suas vidas financeiras, relacionais, emocionais e
                sua saúde com técnicas práticas e poderosas.
              </p>
              <p className="text-base text-[#D3CAC0]">
                Agora, ele vai te mostrar o que está faltando para você
                desbloquear sua Permissão e elevar sua vida a um novo patamar.
              </p>
              <p className="text-[#F4F0E1] font-bold">
                Você está pronto para descobrir?
              </p>
              <Button
                onClick={() => setFormLead(true)}
                className="w-full mt-10 flex items-center justify-center max-w-[460px] bg-gradient-to-r from-[#16FFA6] to-[#12ED28] text-black font-extrabold font-roboto py-8 px-6 rounded-xl sm:text-base text-sm uppercase tracking-wide transition-all hover:brightness-110 hover:shadow-lg"
                style={{
                  boxShadow:
                    "inset 0 -3px 1px #00000040, inset 0 0 6px #0eac45",
                  transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
                }}
              >
                PARTICIPAR DO RESGATE GRATUITAMENTE
              </Button>
            </div>
          </div>
        </section>
      )}

      {formLead && (
        <section
          className={`relative flex flex-col items-end justify-center sm:pt-10 pt-0 overflow-hidden h-full sm:bg-[url('/images/vq-1/bg-quiz-oro-lead.webp')] bg-[url('/images/vq-1/bg-quiz-oro-lead-mobile.webp')] bg-top bg-cover bg-no-repeat w-full min-h-screen `}
        >
          <div
            className={`lg:container mx-auto px-4 sm:py-10 pt-0 pb-5 relative lg:w-[1080px] w-full`}
          >
            {/* Coluna única centralizada ou duas colunas */}
            <div className="w-full flex flex-col items-center justify-center max-w-[696px] mx-auto">
              <div
                className={`flex sm:justify-start justify-center mt-0`}
              >
                <Image
                  src={"/images/vq-1/logo_ORO_V3.png"}
                  alt="Logotipo Resgate dos otimistas"
                  width={424}
                  height={164}
                  priority
                  className="object-contain select-none w-[424px] pointer-events-none"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div
                className={`sm:mt-8 text-center sm:text-[40px]/[44px] text-[30px]/[34px] text-[#D3CAC0] uppercase`}
              >
                <span className="text-[#c0964b]">
                  Faça parte do Resgate dos Otimistas
                </span>{" "}
                ou continue se questionando e justificando o seu “quase
                sucesso”.
              </div>

              <div
                className={`flex items-center gap-8 text-[#f4f0e1] mt-4 mb-8 font-roboto text-xs sm:text-[14px]/[16px]`}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="text-[#c0964b]" size={20} />
                  Online e Gratuito
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-[#c0964b]" size={20} />
                  24, 25 e 26/11 | ÀS 19h55
                </div>
              </div>
              <p
                className={`text-left max-w-[486px] text-[#f4f0e1] mb-2 font-roboto text-base`}
              >
                Preencha os campos abaixo agora:
              </p>
              <form
                onSubmit={handleSubmit}
                id="cadastro"
                name={launch}
                className={`space-y-4 w-full md:max-w-[550px] max-w-[420px]`}
              >
                <input
                  type="email"
                  id="form-field-email"
                  placeholder="Seu melhor e-mail"
                  className={`w-full px-4 py-3 rounded-full bg-[#f4f0e1]/10 text-[#f4f0e1] border border-[#f4f0e1] placeholder:text-[#f4f0e1]/50 font-roboto`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="relative">
                  <div className="flex">
                    <input
                      type="tel"
                      placeholder="Seu WhatsApp"
                      id="form-field-telefone"
                      className={`flex-1 px-4 py-3 rounded-full bg-[#f4f0e1]/10 text-[#f4f0e1] focus:outline-none border border-[#f4f0e1] placeholder:text-[#f4f0e1]/50 font-roboto`}
                      value={whatsapp}
                      onChange={handleChange}
                      name="whatsapp"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-[#16FFA6] to-[#12ED28] text-black font-extrabold font-roboto py-4 px-6 rounded-full text-xs md:text-lg uppercase tracking-wide transition-all hover:brightness-110 hover:shadow-lg"
                  disabled={isSubmitting}
                  style={{
                    boxShadow:
                      "inset 0 -3px 1px #00000040, inset 0 0 6px #0eac45",
                    transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
                  }}
                >
                  PARTICIPAR DO RESGATE GRATUITAMENTE
                  <MoveUpRight size={20} className="sm:block hidden" />
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
