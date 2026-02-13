"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomRadio } from "@/app/components/custom-input";
import { useSearchParams } from "next/navigation";
import { Spectral } from "next/font/google";

const DEFAULT_FORM_VERSION_ID = "2f76bc57-57a2-41fd-9c2c-18a726dd4fe0";

const spectral = Spectral({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spectral",
  weight: ["400", "500", "600", "700"],
});

type AnswerValue = string | string[];

interface BackendOption {
  option_id: string;
  option_key: string;
  option_text: string;
  display_order: number;
}

interface BackendQuestion {
  question_id: string;
  question_key: string;
  question_text: string;
  input_type: string;
  display_order: number;
  required: boolean;
  options?: BackendOption[];
}

interface BackendQuestionsResponse {
  form_version_id: string;
  questions: BackendQuestion[];
}

interface QuizOption {
  value: string;
  label: string;
  optionId: string;
}

interface QuizQuestion {
  id: string;
  key: string;
  question: string;
  inputType: string;
  required: boolean;
  options: QuizOption[];
}

interface LeadScoreAnswerPayload {
  question_id: string;
  option_id?: string;
  answer_text?: string;
  answer_number?: number;
  answer_bool?: boolean;
  answered_at: string;
}

function normalizeInputType(inputType?: string): string {
  return (inputType || "single").toLowerCase().trim();
}

function isOpenInputType(inputType: string): boolean {
  return ["open", "text", "textarea", "short_text", "long_text"].includes(
    normalizeInputType(inputType)
  );
}

function isMultipleInputType(inputType: string): boolean {
  return ["multiple", "multi", "checkbox", "multiple_choice"].includes(
    normalizeInputType(inputType)
  );
}

function isNumericInputType(inputType: string): boolean {
  return ["number", "numeric", "integer", "float", "currency"].includes(
    normalizeInputType(inputType)
  );
}

function isBooleanInputType(inputType: string): boolean {
  return ["boolean", "bool", "switch", "toggle", "yes_no"].includes(
    normalizeInputType(inputType)
  );
}

export default function QuestTestePage() {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmittingAnswers, setIsSubmittingAnswers] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [temperature, setTemperature] = useState("f");

  const formVersionId =
    searchParams.get("formVersionId") || DEFAULT_FORM_VERSION_ID;
  const leadRegistrationRequestId =
    searchParams.get("requestId") ||
    searchParams.get("request_id") ||
    searchParams.get("lead_registration_request_id") ||
    "";

  useEffect(() => {
    const temperatureFromUrl =
      (searchParams.get("temperature") || searchParams.get("temperatura") || "")
        .toLowerCase()
        .trim();

    if (temperatureFromUrl) {
      setTemperature(temperatureFromUrl);
    }
  }, [searchParams]);

  const getWhatsappUrl = useCallback(() => {
    const mapTagSendFlow = {
      f: "https://redirects.aliancadivergente.com.br/oro-pages-f",
      org: "https://redirects.aliancadivergente.com.br/oro-pages-org",
      m: "https://redirects.aliancadivergente.com.br/oro-pages-m",
      q: "https://redirects.aliancadivergente.com.br/oro-pages-q",
    };

    const validKeys = ["f", "m", "q", "org"] as const;
    const resolvedKey = (validKeys as readonly string[]).includes(temperature)
      ? (temperature as keyof typeof mapTagSendFlow)
      : "f";

    return mapTagSendFlow[resolvedKey];
  }, [temperature]);

  const fetchQuestions = useCallback(async () => {
    setIsFetchingQuestions(true);
    setFetchError(null);

    try {
      const response = await fetch(
        `/api/lead-score/questions/${encodeURIComponent(formVersionId)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Falha ao buscar perguntas.");
      }

      const data = (await response.json()) as BackendQuestionsResponse;

      const normalizedQuestions: QuizQuestion[] = (data.questions || [])
        .slice()
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        .map((question) => ({
          id: question.question_id,
          key: question.question_key,
          question: question.question_text,
          inputType: normalizeInputType(question.input_type),
          required: Boolean(question.required),
          options: (question.options || [])
            .slice()
            .sort(
              (a, b) => (a.display_order || 0) - (b.display_order || 0)
            )
            .map((option) => ({
              value: option.option_key || option.option_id,
              label: option.option_text || option.option_key || "Opcao",
              optionId: option.option_id,
            })),
        }));

      if (!normalizedQuestions.length) {
        throw new Error("Nenhuma pergunta encontrada para esta versao.");
      }

      setQuestions(normalizedQuestions);
      setAnswers({});
      setCurrentQuestion(0);
      setSubmitError(null);
      setSubmitSuccess(false);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      setFetchError("Nao foi possivel carregar as perguntas. Tente novamente.");
    } finally {
      setIsFetchingQuestions(false);
    }
  }, [formVersionId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const currentQuestionData = questions[currentQuestion];
  const selectedValue = currentQuestionData
    ? answers[currentQuestionData.id]
    : "";
  const selectedSingleValue =
    typeof selectedValue === "string" ? selectedValue : "";
  const selectedMultipleValue = Array.isArray(selectedValue)
    ? selectedValue
    : [];

  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = questions.length
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;

  const isCurrentQuestionAnswered = useMemo(() => {
    if (!currentQuestionData) {
      return false;
    }

    if (!currentQuestionData.required) {
      return true;
    }

    if (isMultipleInputType(currentQuestionData.inputType)) {
      return selectedMultipleValue.length > 0;
    }

    return selectedSingleValue.trim().length > 0;
  }, [
    currentQuestionData,
    selectedMultipleValue.length,
    selectedSingleValue,
  ]);

  const handleAnswer = (value: string) => {
    if (!currentQuestionData) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestionData.id]: value,
    }));
  };

  const handleMultipleAnswer = (value: string) => {
    if (!currentQuestionData) {
      return;
    }

    setAnswers((previous) => {
      const previousValue = previous[currentQuestionData.id];
      const selectedItems = Array.isArray(previousValue) ? previousValue : [];
      const exists = selectedItems.includes(value);
      const nextItems = exists
        ? selectedItems.filter((item) => item !== value)
        : [...selectedItems, value];

      return {
        ...previous,
        [currentQuestionData.id]: nextItems,
      };
    });
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const buildAnswerItems = (): LeadScoreAnswerPayload[] => {
    const nowIso = new Date().toISOString();
    const payloadAnswers: LeadScoreAnswerPayload[] = [];

    questions.forEach((question) => {
      const answerValue = answers[question.id];

      if (answerValue === undefined || answerValue === null) {
        return;
      }

      if (isMultipleInputType(question.inputType)) {
        const selectedItems = Array.isArray(answerValue)
          ? answerValue
          : [String(answerValue)];

        selectedItems
          .filter((item) => item && item.trim().length > 0)
          .forEach((item) => {
            const matchedOption = question.options.find(
              (option) => option.value === item
            );

            payloadAnswers.push({
              question_id: question.id,
              option_id: matchedOption?.optionId,
              answer_text: matchedOption ? undefined : item,
              answered_at: nowIso,
            });
          });
        return;
      }

      const singleValue = Array.isArray(answerValue)
        ? answerValue[0] || ""
        : String(answerValue);
      const trimmedValue = singleValue.trim();

      if (!trimmedValue) {
        return;
      }

      const matchedOption = question.options.find(
        (option) => option.value === trimmedValue
      );
      const numericValue = isNumericInputType(question.inputType)
        ? Number(trimmedValue.replace(",", "."))
        : NaN;
      const lowerValue = trimmedValue.toLowerCase();
      const booleanValue = isBooleanInputType(question.inputType)
        ? ["true", "1", "sim", "yes"].includes(lowerValue)
        : undefined;

      payloadAnswers.push({
        question_id: question.id,
        option_id: matchedOption?.optionId,
        answer_text: matchedOption ? undefined : trimmedValue,
        answer_number: Number.isFinite(numericValue) ? numericValue : undefined,
        answer_bool: isBooleanInputType(question.inputType)
          ? booleanValue
          : undefined,
        answered_at: nowIso,
      });
    });

    return payloadAnswers;
  };

  const submitLeadScore = async () => {
    if (!leadRegistrationRequestId) {
      throw new Error("requestId nao encontrado na URL.");
    }

    const payload = {
      lead_registration_request_id: leadRegistrationRequestId,
      form_version_id: formVersionId,
      submitted_at: new Date().toISOString(),
      answers: buildAnswerItems(),
      raw_payload: {
        source: "frontend",
        step: "quiz",
      },
    };

    const response = await fetch("/api/lead-score/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText || "Falha ao enviar respostas.");
    }
  };

  const handleNext = async () => {
    if (!currentQuestionData) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      return;
    }

    try {
      setIsSubmittingAnswers(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      await submitLeadScore();
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erro ao enviar respostas do quiz:", error);
      setSubmitError("Nao foi possivel enviar suas respostas agora.");
    } finally {
      setIsSubmittingAnswers(false);
    }
  };

  return (
    <div>
      <section
        className={`relative flex items-center justify-center overflow-hidden h-full `}
      >
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
                Para concluir sua inscricao, responda:
              </p>

              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-zinc-900 rounded-lg border border-white p-4 md:p-7 mb-6 md:mb-8 ">
                  {isFetchingQuestions && (
                    <div className="text-white text-center py-8">
                      Carregando perguntas...
                    </div>
                  )}

                  {!isFetchingQuestions && fetchError && (
                    <div className="text-center py-4">
                      <p className="text-red-300 mb-4">{fetchError}</p>
                      <Button
                        onClick={fetchQuestions}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        TENTAR NOVAMENTE
                      </Button>
                    </div>
                  )}

                  {!isFetchingQuestions && !fetchError && currentQuestionData && (
                    <>
                      {submitError && (
                        <p className="text-red-300 text-sm mb-3 text-left">
                          {submitError}
                        </p>
                      )}
                      {submitSuccess && (
                        <p className="text-green-300 text-sm mb-3 text-left">
                          Respostas enviadas com sucesso.
                        </p>
                      )}

                      <div className="mb-4">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <h3
                        className="text-white text-base md:text-lg font-medium mb-4 md:mb-5 md:text-left text-center"
                        style={{
                          color: "#fff",
                          fontFamily: '"Roboto", Sans-serif',
                        }}
                      >
                        {currentQuestionData.question}
                      </h3>

                      {isOpenInputType(currentQuestionData.inputType) ? (
                        <input
                          type="text"
                          value={selectedSingleValue}
                          onChange={(e) => handleAnswer(e.target.value)}
                          placeholder="Digite sua resposta aqui..."
                          className="w-full px-4 py-3 rounded-lg border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                        />
                      ) : isMultipleInputType(currentQuestionData.inputType) ? (
                        <div className="space-y-2">
                          {currentQuestionData.options.map((option) => {
                            const checked = selectedMultipleValue.includes(
                              option.value
                            );
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleMultipleAnswer(option.value)}
                                className="w-full text-left flex items-center gap-2 text-white"
                              >
                                <span
                                  className={`h-4 w-4 border border-white rounded-sm inline-flex items-center justify-center ${
                                    checked ? "bg-white" : "bg-transparent"
                                  }`}
                                >
                                  {checked && (
                                    <span className="h-2 w-2 bg-teal-700 rounded-sm" />
                                  )}
                                </span>
                                <span>{option.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <CustomRadio
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                          options={currentQuestionData.options}
                          value={selectedSingleValue}
                          onChange={handleAnswer}
                        />
                      )}

                      <div className="grid grid-cols-2 gap-3 md:gap-5 mt-5 md:mt-7">
                        {currentQuestion > 0 ? (
                          <Button
                            variant="outline"
                            onClick={handleBack}
                            className="bg-transparent border-gray-700 text-white hover:bg-gray-800 py-3 md:py-5 text-sm md:text-base"
                            style={{ fontFamily: '"Roboto", Sans-serif' }}
                          >
                            VOLTAR
                          </Button>
                        ) : (
                          <div />
                        )}
                        <Button
                          onClick={handleNext}
                          disabled={!isCurrentQuestionAnswered || isSubmittingAnswers}
                          className={`bg-teal-600 hover:bg-teal-700 text-white py-3 md:py-5 text-sm md:text-base ${
                            currentQuestion === 0 ? "col-span-2" : ""
                          }`}
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                        >
                          {isLastQuestion
                            ? isSubmittingAnswers
                              ? "ENVIANDO..."
                              : submitSuccess
                              ? "ENVIADO"
                              : "ENVIAR"
                            : "PROXIMA"}
                        </Button>
                      </div>
                    </>
                  )}
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
                  Apos responder as questoes, toque no botao abaixo
                  <br className="hidden md:block" />
                  para receber o link e materiais do evento:
                </p>

                <Button
                  className="w-full max-w-sm py-4 md:py-6 text-sm md:text-base hover:opacity-90 transition-opacity duration-300 rounded-3xl"
                  onClick={() => window.open(getWhatsappUrl(), "_blank")}
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
      <footer className="w-full bg-black h-[150px] flex items-center justify-center">
        <p
          className="text-gray-400 text-sm md:text-base text-center"
          style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}
        >
          © 2023. All rights reserved. Politica de Privacidade.
        </p>
      </footer>
    </div>
  );
}
