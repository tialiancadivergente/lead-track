"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Montserrat } from 'next/font/google'
import { useParams, useSearchParams } from 'next/navigation'
// @ts-ignore - Adding temporary type ignore for react-gtm-module
import TagManager from 'react-gtm-module'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
})

// Mapeamento para redirecionamento SendFlow
const mapTagSendFlow = {
  f: "orofrio26-jun25",
  org: "oro-jun2554988org",
  m: "oro-jun2534988m",
  q: "oroquente26-jun24",
} as any;

// Objeto com as perguntas e pesos
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
      { value: "fundamental1", label: "Ensino Fundamental 1 (1º ao 5º ano)", weight: 7.5 },
      { value: "fundamental2", label: "Ensino Fundamental 2 (6º ao 9º ano)", weight: 7.7 },
      { value: "medio", label: "Ensino Médio (1º ao 3º)", weight: 11 },
      { value: "superior-incompleto", label: "Ensino Superior Incompleto", weight: 16.2 },
      { value: "superior", label: "Ensino Superior (Graduação/Faculdade)", weight: 23.3 },
      { value: "pos-graduacao", label: "Pós-Graduação", weight: 28.7 },
      { value: "mestrado", label: "Mestrado", weight: 37.4 },
      { value: "doutorado", label: "Doutorado", weight: 41.4 },
    ],
  },
  {
    id: 3,
    question: "Qual seu sexo?",
    options: [
      { value: "feminino", label: "Sou do sexo Feminino", weight: 15.8 },
      { value: "masculino", label: "Sou do sexo Masculino", weight: 24.4 },
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
      { value: "sim", label: "Sim", weight: 16.7 },
      { value: "nao", label: "Não", weight: 23.5 },
    ],
  },
  {
    id: 6,
    question: "Qual das opções representa a sua renda mensal hoje?",
    options: [
      { value: "ate-1000", label: "Até R$ 1.000,00", weight: 8.3 },
      { value: "1001-2500", label: "De R$ 1.101,00 a R$ 2.500,00", weight: 10.6 },
      { value: "2501-4000", label: "De R$ 2.501,00 a R$ 4.000,00", weight: 18.4 },
      { value: "4001-10000", label: "De R$ 4.001,00 a R$ 10.000,00", weight: 29.7 },
      { value: "10001+", label: "Acima de R$ 10.000,00", weight: 51.5 },
    ],
  },
  {
    id: 7,
    question: "Você trabalha como (marque o trabalho que te gera mais renda):",
    options: [
      { value: "clt", label: "Funcionário CLT", weight: 12.7 },
      { value: "pj", label: "Funcionário PJ", weight: 23.8 },
      { value: "publico", label: "Funcionário Público", weight: 11.2 },
      { value: "autonomo", label: "Autônomo", weight: 24.2 },
      { value: "aposentado", label: "Aposentado", weight: 6.9 },
      { value: "liberal", label: "Profissional Liberal", weight: 34.4 },
      { value: "empresario", label: "Empresário", weight: 52 },
      { value: "desempregado", label: "Estou desempregado no momento", weight: 12.6 },
    ],
  },
  {
    id: 8,
    question: "Com que frequência você se sente sozinho(a)/travado(a) e com baixos resultados?",
    options: [
      { value: "as-vezes", label: "Às vezes", weight: 16.7 },
      { value: "frequentemente", label: "Frequentemente", weight: 28.8 },
      { value: "sempre", label: "Sempre", weight: 27 },
      { value: "raramente", label: "Raramente", weight: 10.8 },
      { value: "nunca", label: "Nunca", weight: 6.3 },
    ],
  },
  {
    id: 9,
    question:
      "Você já buscou algum tipo de ajuda ou suporte (terapia, coaching, grupos de apoio) para lidar com seus desafios emocionais?",
    options: [
      { value: "sim", label: "Sim", weight: 34 },
      { value: "nao", label: "Não", weight: 9.3 },
    ],
  },
  {
    id: 10,
    question: "Se sim, o método utilizado foi eficaz?",
    options: [
      { value: "sim", label: "Sim", weight: 16.3 },
      { value: "parcialmente", label: "Parcialmente", weight: 31.7 },
      { value: "nao", label: "Não", weight: 18.6 },
      { value: "nunca-fiz", label: "Nunca fiz", weight: 12.6 },
    ],
  },
]

// Mapeamento dos passos do formulário para os IDs das perguntas
const stepToQuestionMap: Record<number, number | null> = {
  1: null, // Tela inicial (email e whatsapp)
  2: 3, // Sexo
  3: 1, // Faixa etária
  4: null, // Tela informativa
  5: 2, // Escolaridade
  6: 4, // Estado civil
  7: 5, // Filhos
  8: 6, // Renda
  9: 7, // Ocupação
  10: 8, // Frequência de sentimentos
  11: 9, // Busca de ajuda
  12: 10, // Eficácia do método
  13: null, // Tela de processamento/resultado
  14: null, // Tela de interesse
  15: null, // Tela final
}

export default function QuizFormInlead() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(6.25)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [permissionLevel, setPermissionLevel] = useState(0)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [buttonText, setButtonText] = useState("Participar do Resgate dos Otimistas")
  const [formError, setFormError] = useState<{email: string; whatsapp: string} | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
    gender: "",
    age: "",
    education: "",
    maritalStatus: "",
    hasChildren: "",
    income: "",
    occupation: "",
    feelings: "",
    support: "",
    supportEffective: "",
    relationship: "",
    interest: "",
  })
  const [whatsapp, setWhatsapp] = useState('');

  // Armazena os pesos das respostas selecionadas
  const [weights, setWeights] = useState<Record<number, number>>({})
  
  // Parâmetros da URL e variáveis para processamento
  const _params = useParams();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [tipo, setTipo] = useState('');
  const [versao, setVersao] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [domain, setDomain] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const launch = "[ORO] [JUN25]";

  // Reduzido para 15 steps após remover a pergunta sobre saúde
  const totalSteps = 15

  // Efeito para capturar o domínio da página
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

  // Efeito para extrair parâmetros da URL
  useEffect(() => {
    if (_params && _params.temperatura) {
      console.log('temperatura param', _params.temperatura)

      // Extrair os valores da string usando split
      const paramValue = _params.temperatura as string;
      const parts = paramValue.split('-');

      let tipoValue = parts[0];
      let versaoValue = parts[2];
      let temperaturaValue = parts[1];

      if (paramValue.indexOf('ordo') !== -1) {
        temperaturaValue = parts[parts.length - 1];
        tipoValue = parts[1];
        versaoValue = parts[2];
      }

      console.log('Tipo:', tipoValue);
      console.log('Versão:', versaoValue);
      console.log('Temperatura:', temperaturaValue);

      setTipo(tipoValue);
      setVersao(versaoValue);
      setTemperatura(temperaturaValue);
    }
  }, [_params])

  // Capturar email e telefone da URL
  useEffect(() => {
    if (searchParams) {
      const emailParam = searchParams.get('email');
      const phoneParam = searchParams.get('phone');

      if (emailParam) {
        setFormData(prev => ({...prev, email: emailParam}));
      }

      if (phoneParam) {
        setFormData(prev => ({...prev, whatsapp: phoneParam}));
      }
    }
  }, [searchParams]);

  // Calcula o nível de permissão com base nos pesos das respostas
  const calculatePermissionLevel = () => {
    // Soma todos os pesos
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

    // Calcula a média (ajustada para um valor entre 0 e 100)
    // Considerando que a soma máxima possível seria aproximadamente 300 (baseado nos pesos máximos)
    // e queremos um resultado final de 18%
    const maxPossibleWeight = 300
    const calculatedLevel = (totalWeight / maxPossibleWeight) * 100

    // Limitamos a 18% conforme solicitado
    return Math.min(calculatedLevel, 18)
  }

  // Efeito para simular o carregamento na tela 13
  useEffect(() => {
    if (step === 13 && !showResult) {
      // Simula o progresso de carregamento
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setShowResult(true)
            }, 500) // Pequeno delay antes de mostrar o resultado
            return 100
          }
          return prev + 5 // Incrementa 5% a cada intervalo
        })
      }, 150) // Atualiza a cada 150ms para completar em ~3 segundos

      return () => clearInterval(interval)
    }
  }, [step, showResult])

  // Efeito para animar a barra de progresso e controlar o botão continuar
  useEffect(() => {
    if (step === 13 && showResult) {
      // Calcula o nível de permissão final
      const finalLevel = 18 // Fixado em 18% conforme solicitado

      // Anima a barra de progresso de 0 a 18%
      setPermissionLevel(0)
      const progressInterval = setInterval(() => {
        setPermissionLevel((prev) => {
          if (prev >= finalLevel) {
            clearInterval(progressInterval)
            return finalLevel
          }
          return prev + 0.5
        })
      }, 50)

      // Mostra o botão continuar após 5 segundos
      const buttonTimer = setTimeout(() => {
        setShowContinueButton(true)
      }, 5000)

      return () => {
        clearInterval(progressInterval)
        clearTimeout(buttonTimer)
      }
    } else {
      // Reset quando sair da tela
      setShowContinueButton(false)
    }
  }, [step, showResult])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "whatsapp") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Atualiza o peso da resposta se for uma pergunta mapeada
    const questionId = stepToQuestionMap[step]
    if (questionId !== null) {
      const question = questions.find((q) => q.id === questionId)
      if (question) {
        const option = question.options.find((opt) => opt.value === value)
        if (option) {
          setWeights((prev) => ({
            ...prev,
            [questionId]: option.weight,
          }))
        }
      }
    }

    // Avança automaticamente para a próxima página após selecionar uma opção
    if (step < totalSteps) {
      // Inicia a transição
      setIsTransitioning(true)

      setTimeout(() => {
        setStep(step + 1)
        setProgress(((step + 1) / totalSteps) * 100)

        // Finaliza a transição após um pequeno delay para permitir a animação de entrada
        setTimeout(() => {
          setIsTransitioning(false)
        }, 300)
      }, 400) // Delay para a animação de saída
    }
  }

  const sendEvent = () => {
    // Calcular pontuação total
    console.log(`passou aqui`)
    let score = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    
    // Adicionar pontuação extra baseada na URL
    const publicoScore = window.location.href.indexOf('f-typ') !== -1 ||
      window.location.href.indexOf('m-typ') !== -1 ||
      window.location.href.indexOf('q-typ') !== -1 ? 10 : 0;
    
    score += publicoScore;
    setTotalScore(score);
    
    // Calculate the faixa based on totalScore
    let faixa;
    if (score >= 215) {
      faixa = 'Faixa A';
    } else if (score >= 194) {
      faixa = 'Faixa B';
    } else if (score >= 162) {
      faixa = 'Faixa C';
    } else if (score >= 148) {
      faixa = 'Faixa D';
    } else {
      faixa = 'Faixa E';
    }
    
    // Prepare detailed answers with questions and selected options
    const detailedAnswers: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const questionId = Object.entries(stepToQuestionMap).find(([step, id]) => {
        if (id === null) return false;
        const question = questions.find(q => q.id === id);
        const fieldMapping = {
          gender: 3,
          age: 1,
          education: 2,
          maritalStatus: 4,
          hasChildren: 5,
          income: 6,
          occupation: 7,
          feelings: 8,
          support: 9,
          supportEffective: 10
        };
        return fieldMapping[key as keyof typeof fieldMapping] === id;
      });
      
      if (questionId) {
        const id = stepToQuestionMap[parseInt(questionId[0])];
        const question = questions.find(q => q.id === id);
        if (question) {
          const selectedOption = question.options.find(opt => opt.value === value);
          detailedAnswers[question.question] = selectedOption?.label || value.toString();
        }
      }
    });
    // Prepare the data to be sent to GTM
    const gtmData = {
      email: formData.email,
      phone: formData.whatsapp,
      answers: Object.entries(formData).reduce((acc, [key, value]) => {
        const fieldMapping = {
          gender: 3,
          age: 1,
          education: 2,
          maritalStatus: 4,
          hasChildren: 5,
          income: 6,
          occupation: 7,
          feelings: 8,
          support: 9,
          supportEffective: 10
        };
        const questionId = fieldMapping[key as keyof typeof fieldMapping];
        if (questionId) {
          acc[questionId] = value;
        }
        return acc;
      }, {} as Record<number, string>),
      totalScore: Math.round(score),
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
      utm_source: searchParams?.get('utm_source') || '',
      utm_medium: searchParams?.get('utm_medium') || '',
      utm_campaign: searchParams?.get('utm_campaign') || '',
      utm_content: searchParams?.get('utm_content') || '',
      utm_term: searchParams?.get('utm_term') || '',
      path: window.location.pathname,
    }
    console.log('payload', payload)
    
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const nextStep = () => {
    if (step < totalSteps) {
      // For step 1, validate email and whatsapp
      if (step === 1) {
        const errors = {email: "", whatsapp: ""};
        let hasError = false;
        
        // Validate email
        if (!formData.email) {
          errors.email = "Por favor, preencha seu email";
          hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = "Por favor, insira um email válido";
          hasError = true;
        }
        
        // Validate whatsapp
        if (!formData.whatsapp) {
          errors.whatsapp = "Por favor, preencha seu WhatsApp";
          hasError = true;
        } else if (formData.whatsapp.length < 10) {
          errors.whatsapp = "Por favor, insira um número válido com DDD";
          hasError = true;
        }
        
        if (hasError) {
          setFormError(errors);
          return;
        } else {
          setFormError(null);
        }

      // Save lead data to our database
      try {
        // Prepare payload for the API
        const payload: Record<string, any> = {
          email: formData.email,
          phone: formData.whatsapp,
          temperature: temperatura,
          domain: window.location.hostname,
          uri: window.location.hostname,
          path: window.location.pathname,
        };
        
        // Add formFields to payload if they exist
        if (searchParams) {
          const utmParams: Record<string, string> = {};
          let hasUtm = false;
          
          // Common UTM parameters
          const utmKeys = [
            'utm_source', 
            'utm_medium', 
            'utm_campaign', 
            'utm_term', 
            'utm_content',
            'utm_id'
          ];
          
          // Check each UTM parameter
          utmKeys.forEach(key => {
            const value = searchParams.get(key);
            if (value) {
              utmParams[key] = value;
              hasUtm = true;
            }
          });
          
          // Add other query parameters that aren't UTMs
          searchParams.forEach((value, key) => {
            if (!utmKeys.includes(key) && key !== 'temperatura') {
              utmParams[key] = value;
              hasUtm = true;
            }
          });
          
          // Add formFields to payload if UTMs exist
          if (hasUtm) {
            payload.formFields = utmParams;
          }
        }
        
        // Send data to register-lead API
        fetch('/api/register-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => {
          if (!response.ok) {
            console.error('Failed to register lead');
          } else {
            console.log('Lead registered successfully');
          }
        })
        .catch(error => {
          console.error('Error sending request:', error);
        });
      } catch (error) {
        console.error('Error registering lead:', error);
      }
      }
      
      // Inicia a transição
      setIsTransitioning(true)

      setTimeout(() => {
        setStep(step + 1)
        setProgress(((step + 1) / totalSteps) * 100)

        // Finaliza a transição após um pequeno delay
        setTimeout(() => {
          setIsTransitioning(false)
        }, 300)
      }, 400)
    }
  }

  useEffect(() => {
    if (showResult) {
      sendEvent();
    }
  }, [showResult])

  const prevStep = () => {
    if (step > 1) {
      // Inicia a transição
      setIsTransitioning(true)

      setTimeout(() => {
        setStep(step - 1)
        setProgress(((step - 1) / totalSteps) * 100)

        // Finaliza a transição após um pequeno delay
        setTimeout(() => {
          setIsTransitioning(false)
        }, 300)
      }, 400)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "whatsapp") {
      // Remove todos os caracteres não numéricos
      const numericValue = value.replace(/\D/g, "");
      
      // Aplica a formatação de acordo com a quantidade de dígitos
      let formattedValue = numericValue;
      
      setWhatsapp(formattedValue);
    } else {
      setWhatsapp(value);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      nextStep();
      return;
    }

    // Update button text to show processing
    setButtonText("Processando sua resposta...")

    console.log(mapTagSendFlow[temperatura || 'f']);

    // Adiciona um delay de 1 segundo antes de redirecionar
    setTimeout(() => {
      window.location.href = `https://sendflow.pro/i/${mapTagSendFlow[temperatura || 'f']}`
    }, 1000)
    
    // Retorna false para evitar o redirecionamento imediato
    return false
  
  }

  // Calcula a altura aproximada do cabeçalho para usar como padding-top
  const headerHeight = 200

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: montserrat.style.fontFamily }}>
      {/* Estilos para as animações dos botões */}
      <style jsx global>{`
  @keyframes shine-effect {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  @keyframes pulse-elegant {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
    }
    70% {
      transform: scale(1.03);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  
  .btn-animate {
    position: relative;
    overflow: hidden;
    animation: pulse-elegant 2s infinite;
    transition: all 0.3s ease;
  }
  
  .btn-animate::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      rgba(255,255,255,0) 0%, 
      rgba(255,255,255,0.2) 50%, 
      rgba(255,255,255,0) 100%
    );
    background-size: 200% 100%;
    animation: shine-effect 3s infinite;
    z-index: 1;
  }
  
  .btn-animate span, .btn-animate a {
    position: relative;
    z-index: 2;
  }
  
  .btn-animate:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  
  .btn-animate:active {
    transform: translateY(1px);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .error-message {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    animation: fadeIn 0.3s ease-out forwards;
  }
`}</style>

      {/* Cabeçalho fixo */}
      <div className=" bg-white z-50 px-4 pt-6 shadow-sm" style={{ fontFamily: montserrat.style.fontFamily }}>
        <div className="max-w-md mx-auto">
          {step > 1 && step <= totalSteps && (
            <div className="mb-6">
              <button
                onClick={prevStep}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Voltar"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
          )}

          <div className="mb-8 flex justify-center">
            <div className="h-auto relative">
              <Image
                src="/logo-resgate-dos-otimistas.png"
                alt="O Resgate dos Otimistas"
                width={window.innerWidth <= 768 ? 175 : 200}
                height={window.innerWidth <= 768 ? 25 : 25}
                className="max-w-full"
                priority
              />
            </div>
          </div>

          {/* {step <= totalSteps && (
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
                <div
                  className="h-full bg-gray-900 transition-all duration-500 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* Conteúdo principal centralizado com padding-top fixo maior */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}  id="cadastro" name={launch}>
            <div
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
              }`}
            >
              {step === 1 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">DESCUBRA O SEU NÍVEL DE PERMISSÃO</h1>
                    <p className="text-gray-700 italic mb-6">
                      Conclua um questionário de 2 minutos para receber o cálculo personalizado do seu nível de
                      Permissão para viver uma vida memorável, com dinheiro, saúde e um relacionamento leve e feliz.
                    </p>
                    <p className="text-gray-700 mt-4">Preencha com as suas informações abaixo para continuar...</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-gray-700">
                        Email
                      </label>
                      <input
                        id="form-field-email"
                        name="email"
                        type="email"
                        placeholder="Digite seu melhor e-mail..."
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-3 border ${formError?.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                      />
                      {formError?.email && <p className="error-message">{formError.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="block text-gray-700">
                        Whatsapp
                      </label>
                      <input
                        id="form-field-telefone"
                        name="whatsapp"
                        type="tel"
                        placeholder="DDD + Número - Exemplo: (11) 988601204"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-3 border ${formError?.whatsapp ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                      />
                      {formError?.whatsapp && <p className="error-message">{formError.whatsapp}</p>}
                    </div>

                    <button
                      type="submit"
                      id="inicio-inlead"
                      className="w-full mt-4 p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors btn-animate"
                    >
                      <span>QUERO MEDIR MINHA PERMISSÃO</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold">Selecione seu sexo pra começar.</h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleRadioChange("gender", value)}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="relative">
                        <label
                          className={`block cursor-pointer rounded-lg border ${
                            formData.gender === "masculino" ? "border-gray-900" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-center h-[200px]">
                            <Image
                              src="/img-masculina.png"
                              alt="Homem"
                              width={120}
                              height={120}
                              className="h-full w-auto max-h-[160px] object-contain"
                            />
                          </div>
                          <div className="flex items-center justify-between bg-gray-100 p-3">
                            <span className="font-medium text-sm">Sou do sexo Masculino</span>
                            <RadioGroupItem value="masculino" id="masculino" className="h-5 w-5" />
                          </div>
                          <input
                            type="radio"
                            className="sr-only"
                            name="gender"
                            value="masculino"
                            checked={formData.gender === "masculino"}
                            onChange={() => handleRadioChange("gender", "masculino")}
                          />
                        </label>
                      </div>

                      <div className="relative">
                        <label
                          className={`block cursor-pointer rounded-lg border ${
                            formData.gender === "feminino" ? "border-gray-900" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-center h-[200px]">
                            <Image
                              src="/mulher.png"
                              alt="Mulher"
                              width={120}
                              height={120}
                              className="h-full w-auto max-h-[160px] object-contain"
                            />
                          </div>
                          <div className="flex items-center justify-between bg-gray-100 p-3">
                            <span className="font-medium text-sm">Sou do sexo Feminino</span>
                            <RadioGroupItem value="feminino" id="feminino" className="h-5 w-5" />
                          </div>
                          <input
                            type="radio"
                            className="sr-only"
                            name="gender"
                            value="feminino"
                            checked={formData.gender === "feminino"}
                            onChange={() => handleRadioChange("gender", "feminino")}
                          />
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">Em qual faixa etária você se encaixa?</h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.age}
                      onValueChange={(value) => handleRadioChange("age", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-lg overflow-hidden cursor-pointer ${formData.age === "18-24" ? "border-gray-900" : "border-gray-200"}`}
                      >
                        <label htmlFor="age-18-24" className="flex items-center cursor-pointer">
                          <div className="w-20 h-20 flex-shrink-0">
                            <Image
                              src="/idade-18-24.png"
                              alt="18-24 anos"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow px-4 py-3">
                            <span className="font-medium">18-24</span>
                          </div>
                          <div className="pr-4">
                            <RadioGroupItem value="18-24" id="age-18-24" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-lg overflow-hidden cursor-pointer ${formData.age === "25-35" ? "border-gray-900" : "border-gray-200"}`}
                      >
                        <label htmlFor="age-25-35" className="flex items-center cursor-pointer">
                          <div className="w-20 h-20 flex-shrink-0">
                            <Image
                              src="/idade-25-35.png"
                              alt="25-35 anos"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow px-4 py-3">
                            <span className="font-medium">25-35</span>
                          </div>
                          <div className="pr-4">
                            <RadioGroupItem value="25-35" id="age-25-35" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-lg overflow-hidden cursor-pointer ${formData.age === "36-45" ? "border-gray-900" : "border-gray-200"}`}
                      >
                        <label htmlFor="age-36-45" className="flex items-center cursor-pointer">
                          <div className="w-20 h-20 flex-shrink-0">
                            <Image
                              src="/idade-36-45.png"
                              alt="36-45 anos"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow px-4 py-3">
                            <span className="font-medium">36-45</span>
                          </div>
                          <div className="pr-4">
                            <RadioGroupItem value="36-45" id="age-36-45" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-lg overflow-hidden cursor-pointer ${formData.age === "46-55" ? "border-gray-900" : "border-gray-200"}`}
                      >
                        <label htmlFor="age-46-55" className="flex items-center cursor-pointer">
                          <div className="w-20 h-20 flex-shrink-0">
                            <Image
                              src="/idade-46-55.png"
                              alt="46-55 anos"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow px-4 py-3">
                            <span className="font-medium">46-55</span>
                          </div>
                          <div className="pr-4">
                            <RadioGroupItem value="46-55" id="age-46-55" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-lg overflow-hidden cursor-pointer ${formData.age === "56+" ? "border-gray-900" : "border-gray-200"}`}
                      >
                        <label htmlFor="age-56+" className="flex items-center cursor-pointer">
                          <div className="w-20 h-20 flex-shrink-0">
                            <Image
                              src="/idade-56-mais.png"
                              alt="56 ou mais"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow px-4 py-3">
                            <span className="font-medium">56 ou mais.</span>
                          </div>
                          <div className="pr-4">
                            <RadioGroupItem value="56+" id="age-56+" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="w-full">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center mb-10 mt-8">
                      <h1 className="text-2xl font-bold mb-4 leading-tight">
                        + de 130 mil pessoas aumentaram o seu nível de permissão e estão vivendo vidas memoráveis, com
                        muito dinheiro, saúde e relacionamentos incríveis!
                      </h1>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full max-w-xs p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors btn-animate"
                    >
                      <span>Continuar</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">Qual o seu nível de escolaridade?</h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.education}
                      onValueChange={(value) => handleRadioChange("education", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "fundamental1" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Ensino Fundamental 1 (1º ao 5º ano)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="fundamental1" id="edu-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "fundamental2" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Ensino Fundamental 2 (6º ao 9º ano)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="fundamental2" id="edu-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "medio" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-3" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Ensino Médio (1º ao 3º)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="medio" id="edu-3" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "superior-incompleto" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-4" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Ensino Superior Incompleto</span>
                          </div>
                          <div>
                            <RadioGroupItem value="superior-incompleto" id="edu-4" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "superior" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-5" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Ensino Superior (Graduação/Faculdade)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="superior" id="edu-5" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "pos-graduacao" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-6" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Pós-Graduação</span>
                          </div>
                          <div>
                            <RadioGroupItem value="pos-graduacao" id="edu-6" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "mestrado" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-7" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Mestrado</span>
                          </div>
                          <div>
                            <RadioGroupItem value="mestrado" id="edu-7" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.education === "doutorado" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="edu-8" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Doutorado</span>
                          </div>
                          <div>
                            <RadioGroupItem value="doutorado" id="edu-8" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">Qual seu estado civil?</h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleRadioChange("maritalStatus", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.maritalStatus === "solteiro" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="marital-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Solteira(o)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="solteiro" id="marital-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.maritalStatus === "casado" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="marital-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Casada(o)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="casado" id="marital-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.maritalStatus === "viuvo" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="marital-3" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Viúva(o)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="viuvo" id="marital-3" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.maritalStatus === "separado" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="marital-4" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Separada(o)</span>
                          </div>
                          <div>
                            <RadioGroupItem value="separado" id="marital-4" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">Você tem filhos?</h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.hasChildren}
                      onValueChange={(value) => handleRadioChange("hasChildren", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.hasChildren === "sim" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="children-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">👶</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Sim</span>
                          </div>
                          <div>
                            <RadioGroupItem value="sim" id="children-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.hasChildren === "nao" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="children-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">🚫</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Não</span>
                          </div>
                          <div>
                            <RadioGroupItem value="nao" id="children-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">Qual das opções representa a sua renda mensal hoje?</h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.income}
                      onValueChange={(value) => handleRadioChange("income", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.income === "ate-1000" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="income-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">💵</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Até R$ 1.000,00</span>
                          </div>
                          <div>
                            <RadioGroupItem value="ate-1000" id="income-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.income === "1001-2500" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="income-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">💶</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">De R$ 1.101,00 a R$ 2.500,00</span>
                          </div>
                          <div>
                            <RadioGroupItem value="1001-2500" id="income-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.income === "2501-4000" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="income-3" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">💰</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">De R$ 2.501,00 a R$ 4.000,00</span>
                          </div>
                          <div>
                            <RadioGroupItem value="2501-4000" id="income-3" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.income === "4001-10000" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="income-4" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">🤑</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">De R$ 4.001,00 a R$ 10.000,00</span>
                          </div>
                          <div>
                            <RadioGroupItem value="4001-10000" id="income-4" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.income === "10001+" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="income-5" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">📈</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Acima de R$ 10.000,00</span>
                          </div>
                          <div>
                            <RadioGroupItem value="10001+" id="income-5" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 9 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">
                      Você trabalha como (marque o trabalho que te gera mais renda):
                    </h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.occupation}
                      onValueChange={(value) => handleRadioChange("occupation", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "clt" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Funcionário CLT</span>
                          </div>
                          <div>
                            <RadioGroupItem value="clt" id="occupation-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "pj" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Funcionário PJ</span>
                          </div>
                          <div>
                            <RadioGroupItem value="pj" id="occupation-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "publico" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-publico" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Funcionário Público</span>
                          </div>
                          <div>
                            <RadioGroupItem value="publico" id="occupation-publico" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "autonomo" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-3" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Autônomo</span>
                          </div>
                          <div>
                            <RadioGroupItem value="autonomo" id="occupation-3" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "aposentado" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-aposentado" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Aposentado</span>
                          </div>
                          <div>
                            <RadioGroupItem value="aposentado" id="occupation-aposentado" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "liberal" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-4" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Profissional Liberal</span>
                          </div>
                          <div>
                            <RadioGroupItem value="liberal" id="occupation-4" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "empresario" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-5" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Empresário</span>
                          </div>
                          <div>
                            <RadioGroupItem value="empresario" id="occupation-5" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.occupation === "desempregado" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="occupation-6" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-grow">
                            <span className="font-medium">Estou desempregado no momento</span>
                          </div>
                          <div>
                            <RadioGroupItem value="desempregado" id="occupation-6" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 10 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">
                      Com que frequência você se sente sozinho(a)/travado(a) e com baixos resultados?
                    </h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.feelings}
                      onValueChange={(value) => handleRadioChange("feelings", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.feelings === "nunca" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="feelings-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">😎</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Nunca</span>
                          </div>
                          <div>
                            <RadioGroupItem value="nunca" id="feelings-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.feelings === "raramente" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="feelings-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">🙂</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Raramente</span>
                          </div>
                          <div>
                            <RadioGroupItem value="raramente" id="feelings-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.feelings === "as-vezes" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="feelings-3" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">🤔</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Às vezes</span>
                          </div>
                          <div>
                            <RadioGroupItem value="as-vezes" id="feelings-3" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.feelings === "frequentemente" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="feelings-4" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">😔</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Frequentemente</span>
                          </div>
                          <div>
                            <RadioGroupItem value="frequentemente" id="feelings-4" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.feelings === "sempre" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="feelings-5" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">😩</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Sempre</span>
                          </div>
                          <div>
                            <RadioGroupItem value="sempre" id="feelings-5" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 11 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">Você já buscou algum tipo de ajuda ou suporte?</h1>
                    <p className="text-gray-600 mb-6">
                      (terapia, coaching, grupos de apoio) para lidar com seus desafios emocionais?
                    </p>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.support}
                      onValueChange={(value) => handleRadioChange("support", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.support === "sim" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="support-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">✅</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Sim</span>
                          </div>
                          <div>
                            <RadioGroupItem value="sim" id="support-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.support === "nao" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="support-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">❌</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Não</span>
                          </div>
                          <div>
                            <RadioGroupItem value="nao" id="support-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 12 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">
                      Se você respondeu "SIM" na questão anterior, o método utilizado foi eficaz?
                    </h1>
                  </div>

                  <div className="space-y-2">
                    <RadioGroup
                      value={formData.supportEffective}
                      onValueChange={(value) => handleRadioChange("supportEffective", value)}
                      className="space-y-2"
                    >
                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.supportEffective === "sim" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="effective-1" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">👍</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Sim</span>
                          </div>
                          <div>
                            <RadioGroupItem value="sim" id="effective-1" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.supportEffective === "parcialmente" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="effective-2" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">🤔</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Parcialmente</span>
                          </div>
                          <div>
                            <RadioGroupItem value="parcialmente" id="effective-2" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.supportEffective === "nao" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="effective-3" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">👎</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Não</span>
                          </div>
                          <div>
                            <RadioGroupItem value="nao" id="effective-3" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-full overflow-hidden cursor-pointer ${
                          formData.supportEffective === "nunca-fiz" ? "border-gray-900" : "border-gray-200"
                        }`}
                      >
                        <label htmlFor="effective-4" className="flex items-center cursor-pointer py-3 px-4">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-2xl">😐</span>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Nunca fiz</span>
                          </div>
                          <div>
                            <RadioGroupItem value="nunca-fiz" id="effective-4" className="h-5 w-5" />
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 13 && !showResult && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold mb-4">PROCESSANDO SUAS RESPOSTAS</h1>
                    <p className="text-gray-700 mb-8">
                      Estamos analisando os seus padrões de comportamento e calculando com base neles o seu nível de{" "}
                      <strong>Permissão</strong> atual.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="w-full">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Calculando Nível de Permissão...</span>
                        <span className="text-sm font-medium">{loadingProgress}%</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-900 transition-all duration-300"
                          style={{ width: `${loadingProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-center text-gray-600 mt-8">
                      Em alguns segundos você saberá o quanto está próximo ou distante de viver uma vida rica, com saúde
                      e relacionamentos leves e felizes, uma vida memorável
                    </p>
                  </div>
                </div>
              )}

              {step === 13 && showResult && (
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-6 text-center">Nível de Permissão Atual</h2>
                  <div className="space-y-6">
                    <div className="w-full">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Nível de Permissão Atual</span>
                        <span className="text-sm font-medium">{permissionLevel.toFixed(0)}%</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 transition-all duration-300"
                          style={{ width: `${permissionLevel}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-center space-y-6 mt-8">
                      <p className="font-medium text-lg flex items-center justify-center">
                        <span className="text-yellow-500 text-2xl mr-2">⚠️</span> Seu nível de Permissão está baixo,
                        nesse nível atual você terá muita dificuldade de conquistar resultados expressivos.
                      </p>

                      <div className="text-left text-gray-700 space-y-4">
                        <p>
                          Uma pessoa com baixo nível de permissão vive em um ciclo constante de <strong>"quase"</strong>{" "}
                          — quase foi promovida, quase ficou rica, quase foi feliz. Quando as coisas começam a dar
                          certo, algo acontece para puxá-la de volta: um problema inesperado, uma emergência financeira
                          ou uma crise emocional. Ela até ganha dinheiro, mas o dinheiro sempre desaparece. Nos
                          relacionamentos, ela sabota o que está funcionando porque tem medo de perder ou de ser
                          rejeitada. Para se proteger, ela ajusta os próprios sonhos para algo mais "seguro" e
                          conforma-se com menos do que realmente deseja.
                        </p>
                        <p className="font-medium">
                          Enquanto o nível de permissão não aumentar, ela continuará presa nesse ciclo, sem entender por
                          que o esforço nunca traz o resultado que ela merece.
                        </p>
                      </div>

                      <p className="text-gray-700 mt-8">
                        Toque em continuar para descobrir o que (ou quem) tira sua Permissão e como aumentá-la para
                        conquistar sua vida memorável
                      </p>

                      {showContinueButton && (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="w-full p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors btn-animate fade-in"
                        >
                          <span>Continuar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 14 && (
                <div className="w-full">
                  <div className="text-center mb-10">
                    <h1 className="text-xl font-bold mb-4 leading-tight">
                      Quer entender melhor o que tira a sua Permissão, saber como aumentar o nível dela e ganhar um
                      Diagnóstico de Dependência Emocional, GRATUITAMENTE?
                    </h1>
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`border rounded-full overflow-hidden cursor-pointer ${
                        formData.interest === "sim" ? "border-gray-900" : "border-gray-200"
                      }`}
                      onClick={() => handleRadioChange("interest", "sim")}
                    >
                      <div className="flex items-center justify-between py-4 px-5">
                        <span className="font-medium">Sim, quero entender melhor.</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.interest === "sim" ? "border-gray-900" : "border-gray-300"
                          }`}
                        >
                          {formData.interest === "sim" && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-full overflow-hidden cursor-pointer ${
                        formData.interest === "talvez" ? "border-gray-900" : "border-gray-200"
                      }`}
                      onClick={() => handleRadioChange("interest", "talvez")}
                    >
                      <div className="flex items-center justify-between py-4 px-5">
                        <span className="font-medium">Talvez, estou curioso para saber mais.</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.interest === "talvez" ? "border-gray-900" : "border-gray-300"
                          }`}
                        >
                          {formData.interest === "talvez" && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-full overflow-hidden cursor-pointer ${
                        formData.interest === "explorar" ? "border-gray-900" : "border-gray-200"
                      }`}
                      onClick={() => handleRadioChange("interest", "explorar")}
                    >
                      <div className="flex items-center justify-between py-4 px-5">
                        <span className="font-medium">Quero explorar mais sobre isso.</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.interest === "explorar" ? "border-gray-900" : "border-gray-300"
                          }`}
                        >
                          {formData.interest === "explorar" && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-full overflow-hidden cursor-pointer ${
                        formData.interest === "aumentar" ? "border-gray-900" : "border-gray-200"
                      }`}
                      onClick={() => handleRadioChange("interest", "aumentar")}
                    >
                      <div className="flex items-center justify-between py-4 px-5">
                        <span className="font-medium">Interessado em aumentar meu nível de Permissão.</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.interest === "aumentar" ? "border-gray-900" : "border-gray-300"
                          }`}
                        >
                          {formData.interest === "aumentar" && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-full overflow-hidden cursor-pointer ${
                        formData.interest === "nao" ? "border-gray-900" : "border-gray-200"
                      }`}
                      onClick={() => handleRadioChange("interest", "nao")}
                    >
                      <div className="flex items-center justify-between py-4 px-5">
                        <span className="font-medium">Não, continuarei desse jeito mesmo</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.interest === "nao" ? "border-gray-900" : "border-gray-300"
                          }`}
                        >
                          {formData.interest === "nao" && <div className="w-3 h-3 bg-gray-900 rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 15 && (
                <div className="w-full">
                  <div className="space-y-6 text-center">
                    <h1 className="text-xl font-bold leading-tight">
                      Participe do Resgate dos Otimistas, o evento que vou realizar nos dias 02, 03 e 04 de junho, será
                      ao vivo, online e dessa vez, gratuito.
                    </h1>

                    <p className="text-gray-700 leading-relaxed">
                      No Resgate você vai descobrir como aumentar o seu nível de Permissão, e também vai ganhar um
                      diagnóstico de Dependência Emocional para saber exatamente o que precisa fazer para viver uma vida
                      rica, leve e feliz.
                    </p>

                    <div className="pt-6">
                      <button type="submit"
                        className="w-full py-4 px-6 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors btn-animate"
                      >
                        <span>{buttonText}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-gray-500">
        <p>
          © 2025. All rights reserved. Política de Privacidade.
        </p>
      </footer>
    </div>
  )
}
