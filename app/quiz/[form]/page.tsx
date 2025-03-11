"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Phone } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CustomRadio } from "@/app/components/custom-input"
import SplashScreen from "@/app/components/SplashScreen"
import { useSearchParams } from "next/navigation"
import TagManager from "react-gtm-module";
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

export default function Quiz({ params }: { params: { form: string } }) {
    const searchParams = useSearchParams()
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

    // Verificar se estamos no cliente
    useEffect(() => {
        setIsClient(true)
    }, [])

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

            // Prepare the data to be sent to GTM
            const gtmData = {
                email: emailParam,
                phone: phoneParam,
                answers: answers,
                totalScore: totalScore,
                faixa: faixa // Include the faixa in the data
            };

            TagManager.dataLayer({
                dataLayer: {
                  event: "leadscore",
                  ...gtmData
                },
              });

            console.log('gtmData', gtmData);
            
            // Redirecionar o usuário para a URL especificada
            window.location.href = "https://i.sendflow.pro/invite/oromar25f1?force=true";
        }
    }, [completed, searchParams, answers, totalScore]);

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

    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#000000] via-[#0a3a4a] to-[#000000] mb-[-50px] lg:mb-[-150px] h-full">
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
                            }}
                            />
                        </div>

                        <h1 className="text-xl md:text-4xl font-bold text-custom-primary-gold mb-1 md:mb-2 text-center">FALTA APENAS UM PASSO</h1>
                        <h2 className="text-xl md:text-4xl font-bold text-custom-primary-gold mb-4 md:mb-7 text-center">PARA GARANTIR SUA VAGA!</h2>

                        <p className="text-white text-base md:text-lg mb-5 md:mb-7 text-center" style={{ color: "#fff" }}>Para concluir sua inscrição, responda:</p>

                        <div className="mb-4 md:mb-5">
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                            className="h-full bg-teal-600 transition-all duration-300 ease-in-out"
                            style={{ width: `${progressValue}%` }}
                            ></div>
                        </div>
                            <p className="text-right text-xs md:text-sm text-gray-400 mt-1.5" style={{ color: "#fff" }}>
                                {currentQuestion + 1} de {questions.length}
                            </p>
                        </div>

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
                                className="w-full py-4 md:py-6 text-base md:text-lg bg-green-600 hover:bg-green-700"
                                onClick={() => window.location.href = "https://i.sendflow.pro/invite/oromar25f1?force=true"}
                            >
                                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" /> 
                                Entrar no Grupo no WhatsApp
                            </Button>
                        </div>

                        <p className="text-gray-400 text-xs md:text-sm text-center" style={{ color: "#fff" }}>© 2023. All rights reserved. Política de Privacidade.</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

