"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Phone } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CustomRadio } from "@/app/components/custom-input"
import SplashScreen from "@/app/components/SplashScreen"
import { useParams, useSearchParams } from "next/navigation"
import TagManager from "react-gtm-module";
import { LogoResgate } from "@/app/components/LogoResgate"
import { Spectral } from 'next/font/google'
import { questions } from "@/lib/questions";
import { sendLeadScoreTracking } from "@/lib/tracking/leadScoreTracking";
import {
    TRACKING_GA_PROPERTY_ID,
    TRACKING_LEADSCORE_RESPONSES_WEBHOOK,
    TRACKING_LEADSCORE_SUMMARY_WEBHOOK,
    TRACKING_LEADSCORE_EVENT_ID,
    TRACKING_LEADSCORE_EVENT_NAME,
} from "@/lib/config/tracking";
import { sendLeadTracking } from "@/lib/tracking/leadTracking";
import useUserIP from "@/app/hooks/useUserIP";
import { getTagByTemperatureOro } from "@/lib/temperature-utils";

const spectral = Spectral({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-spectral',
    weight: ['400', '500', '600', '700']
});

const mapTagSendFlow = {
    f: "https://redirects.aliancadivergente.com.br/q6xh",
    org: "https://redirects.aliancadivergente.com.br/oro-pages-org",
    m: "https://redirects.aliancadivergente.com.br/oro-pages-m",
    q: "https://redirects.aliancadivergente.com.br/oro-pages-q",
} as any;

export default function Quiz({ params }: { params: { form: string } }) {
    const searchParams = useSearchParams()
    const _params = useParams()
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [weights, setWeights] = useState<Record<number, number>>({})
    const [completed, setCompleted] = useState(false)
    const [totalScore, setTotalScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [email, setEmail] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [progressValue, setProgressValue] = useState(0)
    const [isClient, setIsClient] = useState(false)
    const [temperatura, setTemperatura] = useState<string | null>(null)
    const [tipo, setTipo] = useState<string | null>(null)
    const [versao, setVersao] = useState<string | null>(null)
    const [domain, setDomain] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [weightsV2, setWeightsV2] = useState<Record<number, number>>({})
    const [totalScoreV2, setTotalScoreV2] = useState(0)
    const [hasSent, setHasSent] = useState(false)
    const [launch, setLaunch] = useState<string>("[ORO][NOV25]");
    const userIp = useUserIP();

    const getWhatsappUrl = () => {
        const validKeys = ["f", "m", "q", "org"] as const;
        const key = (temperatura || "").toLowerCase();
        const resolvedKey = (validKeys as readonly string[]).includes(key) ? key : "f";
        return mapTagSendFlow[resolvedKey] || mapTagSendFlow["f"];
    }

    // Capturar o domínio da página
    useEffect(() => {
        // Verificar se estamos no navegador
        if (typeof window !== 'undefined') {
            const currentDomain = window.location.hostname;
            console.log('Current domain:', currentDomain);
            setDomain(currentDomain);
        }
    }, []);

    // Verificar se estamos no cliente
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (_params && _params.form) {
            console.log('temperatura param', _params.form)

            // Extrair os valores da string usando split
            const paramValue = _params.form as string;
            const parts = paramValue.split('-');
            const versionsV9 = ['v9', 'adv058f', 'adv212', 'adv28', 'adv58f'];
            let versaoValueWithoutVersion = parts[1];

            if (parts[2] === 'V10') {
                let tipoValue = parts[0];
                let versaoValue = parts[1];
                let temperaturaValue = parts[2];

                if (parts.length >= 5) {
                    temperaturaValue = parts[3];
                    versaoValue = parts[2];
                    tipoValue = parts[1];
                    console.log('Temperatura:', temperaturaValue);
                }

                console.log('Tipo:', tipoValue);
                console.log('Versão:', versaoValue);
                console.log('Temperatura:', temperaturaValue);

                setTipo(tipoValue);
                setVersao(versaoValue);
                setTemperatura(temperaturaValue);  
            } else if (paramValue.indexOf('v1') != -1) {
                const tipoValue = parts[0];
                const versaoValue = parts[1];
                const temperaturaValue = parts[parts.length - 2];

                console.log('Tipo:', tipoValue);
                console.log('Versão:', versaoValue);
                console.log('Temperatura:', temperaturaValue);

                setTipo(tipoValue);
                setVersao(versaoValue);
                setTemperatura(temperaturaValue);
            } else if (paramValue.indexOf('v9') != -1 || versionsV9.includes(versaoValueWithoutVersion)) {
                let tipoValue = parts[0];
                let versaoValue = parts[1];
                let temperaturaValue = parts[2];

                if (parts.length >= 5) {
                    temperaturaValue = parts[3];
                    versaoValue = parts[2];
                    tipoValue = parts[1];
                    console.log('Temperatura:', temperaturaValue);
                }

                console.log('Tipo:', tipoValue);
                console.log('Versão:', versaoValue);
                console.log('Temperatura:', temperaturaValue);

                setTipo(tipoValue);
                setVersao(versaoValue);
                setTemperatura(temperaturaValue);
            }
            else {
                // Caso o formato não seja o esperado, usar o valor completo como temperatura
                console.log('Formato inesperado, usando valor completo');
                setTemperatura(paramValue);
            }
        }
    }, [_params])

    // Calcular launch baseado na temperatura usando getTagByTemperatureOro
    useEffect(() => {
        if (temperatura) {
            const calculatedLaunch = getTagByTemperatureOro(temperatura);
            if (calculatedLaunch) {
                setLaunch(calculatedLaunch);
                console.log("Launch definido:", calculatedLaunch);
            }
        }
    }, [temperatura])

    // Capturar email e telefone da URL
    useEffect(() => {
        if (searchParams) {
            const emailParam = searchParams.get('email');
            const phoneParam = searchParams.get('phone');

            if (emailParam) {
                setEmail(emailParam);
            }

            if (phoneParam) {
                setWhatsapp(phoneParam);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        // Atualiza o valor do progresso quando a pergunta atual muda
        const newProgress = ((currentQuestion + 1) / questions.length) * 100
        setProgressValue(newProgress)
    }, [currentQuestion])

    useEffect(() => {
        if (!completed || hasSent) {
            return;
        }

        const executeTracking = async () => {
            setIsLoading(true);

            const emailParam = searchParams.get('email');
            const phoneParam = searchParams.get('phone');

            // Calculate the faixa based on totalScore
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
                faixa = "Faixa E";
            }

            let faixaV2;
            if (totalScoreV2 >= 200) {
                faixaV2 = 'Faixa A';
            } else if (totalScoreV2 >= 182) {
                faixaV2 = 'Faixa B';
            } else if (totalScoreV2 >= 151) {
                faixaV2 = 'Faixa C';
            } else {
                faixaV2 = 'Faixa D';
            }

            // Prepare detailed answers with questions and selected options
            const detailedAnswers: Record<string, string> = {};
            Object.entries(answers).forEach(([questionId, answerValue]) => {
                const questionObj = questions.find(q => q.id === parseInt(questionId));
                const selectedOption = questionObj?.options.find(opt => opt.value === answerValue);

                if (questionObj) {
                    detailedAnswers[questionObj.question] = selectedOption?.label || answerValue
                }
            });

            // Prepare the data to be sent to GTM
            const gtmData = {
                email: emailParam,
                phone: phoneParam,
                answers: answers,
                totalScore: Number(totalScore.toFixed(1)),
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
                utm_source: searchParams.get('utm_source') || '',
                utm_medium: searchParams.get('utm_medium') || '',
                utm_campaign: searchParams.get('utm_campaign') || '',
                utm_content: searchParams.get('utm_content') || '',
                utm_term: searchParams.get('utm_term') || '',
                path: window.location.pathname,
            }

            const leadScoreAnswers = questions.slice(0, 10).map((question) => {
                const answerValue = answers[question.id];
                if (answerValue === undefined || answerValue === null) {
                    return "";
                }

                if (question.type === "open") {
                    return String(answerValue);
                }

                const selectedOption = question.options?.find(opt => opt.value === answerValue);
                return selectedOption?.label || answerValue || "";
            });

            // Still send to GTM as before
            if (TagManager.dataLayer) {
                TagManager.dataLayer({
                    dataLayer: {
                        event: "leadscore",
                        ...gtmData
                    },
                });
            }

            const eventId = TRACKING_LEADSCORE_EVENT_ID || `${Date.now()}.${Math.random().toString().slice(2, 8)}`;

            try {
                await sendLeadTracking(
                    {
                        baseUrl: TRACKING_LEADSCORE_SUMMARY_WEBHOOK,
                        eventName: TRACKING_LEADSCORE_EVENT_NAME,
                        eventId,
                        gaPropertyId: TRACKING_GA_PROPERTY_ID,
                    },
                    {
                        leadEmail: emailParam ?? undefined,
                        leadPhone: phoneParam ?? undefined,
                        ipAddress: userIp ?? null,
                        extraParams: {
                            faixa,
                            faixaV2,
                            totalScore: totalScore.toFixed(1),
                            totalScoreV2: Math.round(totalScoreV2).toString(),
                            tipo: tipo ?? undefined,
                            version: versao ?? undefined,
                            temperature: temperatura ?? undefined,
                            domain,
                            launch,
                            path: window.location.pathname,
                        },
                    },
                );
            } catch (error) {
                console.error("Erro ao enviar leadscore resumo:", error);
            }

            try {
                await sendLeadScoreTracking({
                    baseUrl: TRACKING_LEADSCORE_RESPONSES_WEBHOOK,
                    gaPropertyId: TRACKING_GA_PROPERTY_ID,
                    answers: leadScoreAnswers,
                    resultadoV2: faixaV2,
                    pontuacaoV2: Math.round(totalScoreV2),
                    extras: {
                        email: emailParam ?? undefined,
                        phone: phoneParam ?? undefined,
                        faixa,
                        totalScore: Number(totalScore.toFixed(1)),
                    },
                });
            } catch (error) {
                console.error("Erro ao enviar leadscore tracking:", error);
            }

            try {
                const response = await fetch('/api/quiz-proxy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setHasSent(true);
                window.location.replace(getWhatsappUrl())
            }
        };

        void executeTracking();
    }, [
        answers,
        completed,
        hasSent,
        launch,
        questions,
        searchParams,
        temperatura,
        userIp,
        tipo,
        totalScore,
        totalScoreV2,
        versao,
        domain,
    ]); // envia apenas uma vez ao completar

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const leads = JSON.parse(localStorage.getItem("leads") || "[]")
        leads.push({ email, whatsapp, date: new Date().toISOString() })
        localStorage.setItem("leads", JSON.stringify(leads))

        setSuccess(true)
        setIsSubmitting(false)

        setTimeout(() => {
            setSuccess(false)
            setEmail("")
            setWhatsapp("")
        }, 3000)
    }

    const handleAnswer = (value: string) => {
        const question = questions[currentQuestion]

        // Se for uma pergunta aberta (open), apenas salva a resposta
        if (question.type === "open") {
            const newAnswers = { ...answers, [question.id]: value };
            setAnswers(newAnswers);
            return;
        }
        
      // Para perguntas com opções (radio), busca a opção selecionada
        const selectedOption = question.options.find((option) => option.value === value)

        if (selectedOption) {
            const newAnswers = { ...answers, [question.id]: value }
            const newWeights = { ...weights, [question.id]: selectedOption.weight }
            const newWeightsV2: Record<number, number> = { ...weightsV2, [question.id]: selectedOption.weightV2 || 0 }

            setAnswers(newAnswers)
            setWeights(newWeights)
            setWeightsV2(newWeightsV2)
        }
    }

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            // Calcular pontuação total
            setIsLoading(true)
            let score = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
            let scoreV2 = Object.values(weightsV2).reduce((sum, weight) => sum + weight, 0)

            // // Adicionar pontuação extra baseada na URL
            // const publicoScore = window.location.href.indexOf('f-typ') !== -1 ||
            //     window.location.href.indexOf('m-typ') !== -1 ||
            //     window.location.href.indexOf('q-typ') !== -1 ? 10 : 0;

            // score += publicoScore;
            setTotalScore(score)
            setTotalScoreV2(scoreV2)
            setCompleted(true)
        }
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100

    const currentQuestionData = questions[currentQuestion]
    const selectedValue = answers[currentQuestionData.id] || ""
    const isLastQuestion = currentQuestion === questions.length - 1

    // Se não estamos no cliente, não renderize nada
    if (!isClient) {
        return null;
    }

    if (versao === 'v1') {
        return (
            <div>
                <section className="relative flex items-center justify-center overflow-hidden  h-full font-['Epilogue',_sans-serif]">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 z-0 h-[890px]">
                        <Image
                            src="/images/Elton-Euller-O-Resgate-dos-Otimistas-V2-Obrigado-Desktop.webp"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Loading overlay */}
                    {isLoading && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-t-teal-600 border-r-transparent border-b-teal-600 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-white text-lg font-medium">Processando suas respostas...</p>
                                <p className="text-gray-300 text-sm mt-2">Aguarde um momento, você será redirecionado em breve.</p>
                            </div>
                        </div>
                    )}

                    {/* Background com overlay */}
                    <div className="container mx-auto relative h-full px-4">
                        <div className="flex flex-col items-center justify-center text-center h-[890px]">
                            <div className="w-full mx-auto">
                                <div className="mb-3 md:mb-8 flex justify-center">
                                    <LogoResgate
                                        className="object-contain select-none pointer-events-none"
                                        width={window.innerWidth <= 768 ? 150 : 220}
                                        height={window.innerWidth <= 768 ? 60 : 100}
                                    />
                                </div>

                                <h1 className="text-xl  md:text-5xl font-bold text-[#F89500] -mb-1 md:mb-2 text-center">FALTA APENAS UM PASSO</h1>
                                <h2 className="text-xl  md:text-5xl font-bold text-[#F89500] mb-4 md:mb-7 text-center">PARA GARANTIR SUA VAGA!</h2>

                                <p className="text-white text-base md:text-lg mb-5 md:mb-7 text-center" style={{ color: "#fff" }}>Para concluir sua inscrição, responda:</p>

                                <div className="rounded-lg p-4 md:p-7 mb-6 md:mb-8 border border-white max-w-xl mx-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0.79)' }}>
                                    <h3 className="text-white text-base md:text-lg font-medium mb-4 md:mb-5 text-left" style={{ color: "#fff" }}>{currentQuestionData.question}</h3>

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
                                        <CustomRadio
                                        style={{ fontFamily: '"Roboto", Sans-serif' }}
                                        options={currentQuestionData.options}
                                        value={selectedValue}
                                        onChange={handleAnswer}
                                        />
                                    )}

                                    <div className="grid grid-cols-2 gap-3 md:gap-2 mt-5 md:mt-7">
                                        {currentQuestion > 0 && (
                                            <Button
                                                variant="outline"
                                                onClick={handleBack}
                                                className="bg-transparent border-gray-700 text-white hover:bg-gray-800 py-3 md:py-5 text-sm md:text-base"
                                            >
                                                VOLTAR
                                            </Button>
                                        )}
                                        {currentQuestion === 0 && <div></div>}
                                        <Button
                                            onClick={handleNext}
                                            disabled={!selectedValue}
                                            className={`bg-[#F89500] hover:bg-[#e08600] text-white py-3 md:py-5 text-sm md:text-base ${currentQuestion === 0 ? 'col-span-2' : ''}`}
                                        >
                                            {isLastQuestion ? "ENVIAR" : "PRÓXIMA"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="mb-6 md:mb-8 text-center" style={{ color: "#fff" }}>
                                    <p className="text-white text-base md:text-xl mb-4 md:mb-5 max-w-xl mx-auto">
                                        Após responder as questões, toque no botão abaixo
                                        para receber o link e materiais do evento:
                                    </p>

                                    <Button
                                        className="w-full py-4 md:py-6 text-sm md:text-base hover:opacity-90 transition-opacity duration-300 rounded-3xl max-w-sm"
                                        onClick={() => window.location.href = getWhatsappUrl()}
                                        style={{ background: 'linear-gradient(96.48deg, #065100 -18.33%, #49E413 159.75%)' }}
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
                    <p className="text-gray-400 text-sm md:text-base text-center" style={{ color: "#fff" }}>© 2023. All rights reserved. Política de Privacidade.</p>
                </footer>
            </div>
        )
    }

    return (
        <div>
            <section className={`relative flex items-center justify-center overflow-hidden h-full `}>
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
                            <p className="text-white text-lg font-medium" style={{ fontFamily: '"Roboto", Sans-serif' }}>Processando suas respostas...</p>
                            <p className="text-gray-300 text-sm mt-2" style={{ fontFamily: '"Roboto", Sans-serif' }}>Aguarde um momento, você será redirecionado em breve.</p>
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
                                    width={typeof window !== 'undefined' && window.innerWidth > 768 ? 320 : 158}
                                    height={typeof window !== 'undefined' && window.innerWidth > 768 ? 196 : 70}
                                    priority
                                    className="object-contain select-none pointer-events-none"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                    }} />
                            </div>

                            <h1 className={`text-2xl md:text-5xl font-bold text-custom-primary-gold -mt-4 mb-1 md:mb-2 text-center ${spectral.className}`}>FALTA APENAS UM PASSO</h1>
                            <h2 className={`text-2xl md:text-5xl font-bold text-custom-primary-gold mb-4 md:mb-7 text-center ${spectral.className}`}>PARA GARANTIR SUA VAGA!</h2>

                            <p className="text-white text-base md:text-lg mb-5 md:mb-7 text-center" style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}>Para concluir sua inscrição, responda:</p>

                            <div className="w-full max-w-2xl mx-auto">
                                <div className="bg-zinc-900 rounded-lg border border-white p-4 md:p-7 mb-6 md:mb-8 ">
                                    <h3 className="text-white text-base md:text-lg font-medium mb-4 md:mb-5 md:text-left text-center" style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}>{currentQuestionData.question}</h3>
                                    {currentQuestionData.type === "open" ? (
                                        <input
                                        type="text"
                                        value={selectedValue}
                                        onChange={(e) => handleAnswer(e.target.value)}
                                        placeholder={currentQuestionData.placeholder || "Digite sua resposta aqui..."}
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
                                    )}
                                    <div className="grid grid-cols-2 gap-3 md:gap-5 mt-5 md:mt-7">
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
                                            className={`bg-teal-600 hover:bg-teal-700 text-white py-3 md:py-5 text-sm md:text-base ${currentQuestion === 0 ? 'col-span-2' : ''}`}
                                            style={{ fontFamily: '"Roboto", Sans-serif' }}
                                        >
                                            {isLastQuestion ? "ENVIAR" : "PRÓXIMA"}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 md:mb-8 text-center" style={{ color: "#fff" }}>
                                <p className="text-white text-xs md:text-sm mb-4 md:mb-5" style={{ fontFamily: '"Roboto", Sans-serif' }}>
                                    Após responder as questões, toque no botão abaixo
                                    <br className="hidden md:block" />
                                    para receber o link e materiais do evento:
                                </p>

                                <Button
                                    className="w-full max-w-sm py-4 md:py-6 text-sm md:text-base hover:opacity-90 transition-opacity duration-300 rounded-3xl"
                                    onClick={() => window.location.href = getWhatsappUrl()}
                                    style={{ background: 'linear-gradient(96.48deg, #065100 -18.33%, #49E413 159.75%)', fontFamily: '"Roboto", Sans-serif' }}
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
                <p className="text-gray-400 text-sm md:text-base text-center" style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}>© 2023. All rights reserved. Política de Privacidade.</p>
            </footer>
        </div>
    )
}