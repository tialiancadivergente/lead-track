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
// Definição das perguntas e respostas com seus respectivos pesos
const questions = [
    {
        id: 1,
        question: "Em qual faixa etária você se encaixa?",
        options: [
            { value: "18-24", label: "18-24", weight: 6.7 },
            { value: "25-35", label: "25-35", weight: 18.7 },
            { value: "36-45", label: "36-45", weight: 26.9 },
            { value: "46-55", label: "46-55", weight: 27 },
            { value: "56 ou mais", label: "56 ou mais", weight: 26.4 },
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
        question: "Qual seu sexo?",
        options: [
            { value: "feminino", label: "Sou do sexo Feminino", weight: 24.8 },
            { value: "masculino", label: "Sou do sexo Masculino", weight: 28 },
        ],
    },
    {
        id: 4,
        question: "Qual seu estado civil?",
        options: [
            { value: "solteiro", label: "Solteiro(a)", weight: 21.2 },
            { value: "casado", label: "Casado(a)", weight: 25.4 },
            { value: "separado", label: "Separado(a)", weight: 30.3 },
            { value: "viuvo", label: "Viúvo(a)", weight: 23.2 },
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
            { value: "1101a2500", label: "De R$ 1.101,00 a R$ 2.500,00", weight: 18.2 },
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
        question: "Com que frequência você se sente sozinho(a)/travado(a) e com baixos resultados?",
        options: [
            { value: "as vezes", label: "Às vezes", weight: 23.1 },
            { value: "frequentemente", label: "Frequentemente", weight: 28 },
            { value: "sempre", label: "Sempre", weight: 26.5 },
            { value: "raramente", label: "Raramente", weight: 16.6 },
            { value: "nunca", label: "Nunca", weight: 16.4 },
        ],
    },
    {
        id: 9,
        question: "Você já buscou algum tipo de ajuda ou suporte (terapia, coaching, grupos de apoio) para lidar com seus desafios emocionais?",
        options: [
            { value: "sim", label: "Sim", weight: 34.6 },
            { value: "nao", label: "Não", weight: 16.9 },
        ],
    },
    {
        id: 10,
        question: "Se sim, o método utilizado foi eficaz?",
        options: [
            { value: "sim", label: "Sim", weight: 27.8 },
            { value: "parcialmente", label: "Parcialmente", weight: 36.9 },
            { value: "nao", label: "Não", weight: 24.9 },
            { value: "Nunca fiz", label: "Nunca fiz", weight: 17.3 },
        ],
    }
]

const mapTagSendFlow = {
    f: "oro-jun25frio",
    org: "oro-jun25org",
    m: "oro-jun25morno",
    q: "oro-jun25quente",
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

    const launch = "[ORO] [JUN25]"
  
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

          if (paramValue.indexOf('v1') != -1) {
            const tipoValue = parts[0];
            const versaoValue = parts[1];
            const temperaturaValue = parts[2];
            
            console.log('Tipo:', tipoValue);
            console.log('Versão:', versaoValue);
            console.log('Temperatura:', temperaturaValue);
            
            setTipo(tipoValue);
            setVersao(versaoValue);
            setTemperatura(temperaturaValue);
          } else if (paramValue.indexOf('v9') != -1) {
            const tipoValue = parts[0];
            const versaoValue = parts[1];
            const temperaturaValue = parts[2];
            
            console.log('Tipo:', tipoValue);
            console.log('Versão:', versaoValue);
            console.log('Temperatura:', temperaturaValue);
            
            setTipo(tipoValue);
            setVersao(versaoValue);
            setTemperatura(temperaturaValue);
          } else {
            // Caso o formato não seja o esperado, usar o valor completo como temperatura
            console.log('Formato inesperado, usando valor completo');
            setTemperatura(paramValue);
          }
        }
      }, [_params])

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
        if (completed) {
            setIsLoading(true);
            
            const emailParam = searchParams.get('email');
            const phoneParam = searchParams.get('phone');

            // Calculate the faixa based on totalScore
            let faixa;
            if (totalScore >= 256) {
                faixa = 'Faixa A';
            } else if (totalScore >= 239) {
                faixa = 'Faixa B';
            } else if (totalScore >= 213) {
                faixa = 'Faixa C';
            } else {
                faixa = 'Faixa D';
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
                totalScore: Math.round(totalScore),
                faixa: faixa,
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

            // Still send to GTM as before
            TagManager.dataLayer({
                dataLayer: {
                    event: "leadscore",
                    ...gtmData
                },
            });
            
            // Send data to our proxy API
            fetch('/api/quiz-proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setIsLoading(false);
                window.location.href = `https://sendflow.pro/i/${mapTagSendFlow[temperatura || 'f']}` 
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
                window.location.href = `https://sendflow.pro/i/${mapTagSendFlow[temperatura || 'f']}`
            });
        }
    }, [completed, searchParams, answers, totalScore, questions, tipo, versao, temperatura, domain, launch]);

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
            let score = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
            
            // Adicionar pontuação extra baseada na URL
            const publicoScore = window.location.href.indexOf('f-typ') !== -1 || 
                                window.location.href.indexOf('m-typ') !== -1 || 
                                window.location.href.indexOf('q-typ') !== -1 ? 10 : 0;
            
            score += publicoScore;
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

                                <CustomRadio options={currentQuestionData.options} value={selectedValue} onChange={handleAnswer} />

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
                                    onClick={() => window.location.href = `https://sendflow.pro/i/${mapTagSendFlow[temperatura || 'f']}`}
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
        <section className="relative flex items-center justify-center overflow-hidden mb-[-50px] lg:mb-[-150px] h-full font-['Epilogue',_sans-serif]">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#0a3a4a] to-[#000000] opacity-90"></div>
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
                <div className="flex flex-col items-center justify-center min-h-screen text-center py-8">
                    <div className="w-full max-w-xl mx-auto">
                        <div className="mb-6 md:mb-8 flex justify-center">
                        <Image
                            src="/images/logo-resgate-dos-otimistas.png"
                            alt="Logotipo Resgate dos otimistas"
                            width={320}
                            height={196}
                            priority
                            className="object-contain select-none pointer-events-none"
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                            }} />
                        </div>

                        <h1 className="text-xl md:text-4xl font-bold text-custom-primary-gold mb-1 md:mb-2 text-center">FALTA APENAS UM PASSO</h1>
                        <h2 className="text-xl md:text-4xl font-bold text-custom-primary-gold mb-4 md:mb-7 text-center">PARA GARANTIR SUA VAGA!</h2>

                        <p className="text-white text-base md:text-lg mb-5 md:mb-7 text-center" style={{ color: "#fff" }}>Para concluir sua inscrição, responda:</p>

                        {/* <div className="mb-4 md:mb-5">
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                            className="h-full bg-teal-600 transition-all duration-300 ease-in-out"
                            style={{ width: `${progressValue}%` }}
                            ></div>
                        </div>
                            <p className="text-right text-xs md:text-sm text-gray-400 mt-1.5" style={{ color: "#fff" }}>
                                {currentQuestion + 1} de {questions.length}
                            </p>
                        </div> */}

                        <div className="bg-zinc-900 rounded-lg p-4 md:p-7 mb-6 md:mb-8">
                            <h3 className="text-white text-base md:text-lg font-medium mb-4 md:mb-5 text-center" style={{ color: "#fff" }}>{currentQuestionData.question}</h3>

                            <CustomRadio options={currentQuestionData.options} value={selectedValue} onChange={handleAnswer} />

                            <div className="grid grid-cols-2 gap-3 md:gap-5 mt-5 md:mt-7">
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
                                    className="bg-teal-600 hover:bg-teal-700 text-white py-3 md:py-5 text-sm md:text-base"
                                >
                                    {isLastQuestion ? "ENVIAR" : "PRÓXIMA"}
                                </Button>
                            </div>
                        </div>

                        <div className="mb-6 md:mb-8 text-center" style={{ color: "#fff" }}>
                            <p className="text-white text-xs md:text-sm mb-4 md:mb-5">
                                Após responder as questões, toque no botão abaixo
                                <br className="hidden md:block" />
                                para receber o link e materiais do evento:
                            </p>

                            <Button 
                                className="w-full py-4 md:py-6 text-base md:text-lg hover:opacity-90 transition-opacity duration-300 rounded-3xl"
                                onClick={() => window.location.href = `https://sendflow.pro/i/${mapTagSendFlow[temperatura || 'f']}`}
                                style={{ background: 'linear-gradient(96.48deg, #065100 -18.33%, #49E413 159.75%)' }}
                            >
                                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" /> 
                                Clique aqui para entrar no Grupo no WhatsApp
                            </Button>
                        </div>

                        <p className="text-gray-400 text-xs md:text-sm text-center" style={{ color: "#fff" }}>© 2023. All rights reserved. Política de Privacidade.</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

