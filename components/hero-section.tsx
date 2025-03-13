"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Phone } from "lucide-react"
import Image from "next/image"
import { useParams, useSearchParams, useRouter } from "next/navigation"

export default function HeroSection() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [temperatura, setTemperatura] = useState<string | null>(null)
  const [tipo, setTipo] = useState<string | null>(null)
  const [versao, setVersao] = useState<string | null>(null)
  const [formFields, setFormFields] = useState<Record<string, string> | null>(null)
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [ddi, setDdi] = useState("+55")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [domain, setDomain] = useState<string>("")

  const launch = "[ORO] [MAR25]"

  // Capturar o domínio da página
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      console.log('Current domain:', currentDomain);
      setDomain(currentDomain);
    }
  }, []);

  // Capturar UTMs da queryString
  useEffect(() => {
    if (searchParams) {
      const utmParams: Record<string, string> = {};
      let hasUtm = false;
      
      // Lista de parâmetros UTM comuns
      const utmKeys = [
        'utm_source', 
        'utm_medium', 
        'utm_campaign', 
        'utm_term', 
        'utm_content',
        'utm_id'
      ];
      
      // Verificar cada parâmetro UTM
      utmKeys.forEach(key => {
        const value = searchParams.get(key);
        if (value) {
          utmParams[key] = value;
          hasUtm = true;
        }
      });
      
      // Adicionar outros parâmetros da query que não são UTM
      searchParams.forEach((value, key) => {
        if (!utmKeys.includes(key) && key !== 'temperatura') {
          utmParams[key] = value;
          hasUtm = true;
        }
      });
      
      // Definir formFields apenas se houver UTMs
      if (hasUtm) {
        console.log('UTM params:', utmParams);
        setFormFields(utmParams);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (params && params.temperatura) {
      console.log('temperatura param', params.temperatura)
      
      // Extrair os valores da string usando split
      const paramValue = params.temperatura as string;
      const parts = paramValue.split('-');
      
      if (parts.length >= 3) {
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
  }, [params])

  // Função para construir a URL de redirecionamento
  const buildRedirectUrl = () => {
    // Construir o path base com os valores dinâmicos
    const basePath = `/quiz/${tipo || 'oro'}-${versao || 'v9'}-${temperatura || 'q'}-typ`;
    
    // Iniciar com os parâmetros de email e telefone
    const queryParams = new URLSearchParams();
    queryParams.append('email', email);
    queryParams.append('phone', `${ddi}${whatsapp.replace(/\s+|-|\(|\)|\./g, "")}`);
    
    // Adicionar UTMs se existirem
    if (formFields) {
      Object.entries(formFields).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
    }
    
    // Construir a URL completa
    return `${basePath}?${queryParams.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const cleanedPhone = whatsapp.replace(/\s+|-|\(|\)|\./g, "");
      
      const fullPhone = `${ddi}${cleanedPhone}`;
      
      // Preparar o payload para a API
      const payload: Record<string, any> = {
        email,
        phone: fullPhone,
        temperature: temperatura,
        tipo,
        version: versao,
        parametroCompleto: params.temperatura,
        domain,
        uri: domain,
        path: window.location.pathname,
      };
      
      // Adicionar formFields ao payload apenas se existir
      if (formFields) {
        payload.formFields = formFields;
      }
      
      const response = await fetch('/api/register-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Falha ao registrar lead');
      }

      // Preparar dados para localStorage
      const leadData: Record<string, any> = { 
        email, 
        whatsapp: fullPhone, 
        temperature: temperatura,
        tipo,
        version: versao,
        launch,
        domain,
        parametroCompleto: params.temperatura,
        date: new Date().toISOString() 
      };
      
      // Adicionar formFields aos dados do localStorage apenas se existir
      if (formFields) {
        leadData.formFields = formFields;
      }
      
      const leads = JSON.parse(localStorage.getItem("leads") || "[]")
      leads.push(leadData)
      localStorage.setItem("leads", JSON.stringify(leads))

      setSuccess(true)
      
      // Redirecionar após um breve delay para mostrar a mensagem de sucesso
      setTimeout(() => {
        const redirectUrl = buildRedirectUrl();
        console.log('Redirecionando para:', redirectUrl);
        
        // Usar window.location.href para navegação completa
        if (typeof window !== 'undefined') {
          window.location.href = redirectUrl;
        }
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-r from-[#000000] via-[#0a3a4a] to-[#000000] mb-[-50px] lg:mb-[-150px] z-0">
      {/* Background com overlay */}
      <div className="absolute inset-0 bg-[url('/images/paper-texture.png')] bg-cover bg-center opacity-15"></div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 z-[0]">
          {/* Coluna da esquerda - Formulário */}
          <div className="w-full md:w-1/2 lg:w-2/5 mb-12 md:mb-0 text-center md:text-left">
            <div className="mb-8 flex justify-center md:justify-start">
            <Image
                  src="/images/logo-resgate-dos-otimistas.png"
                  alt="Logotipo Resgate dos otimistas"
                  width={322}
                  height={171}
                  priority
                  className="object-contain select-none pointer-events-none"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
            </div>

            <div className="my-8">
              <p className="text-[#f4f0e1] text-xl mb-1">Faça seu diagnóstico de</p>
              <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-1">DEPENDÊNCIA</h2>
              <h2 className="text-[#c0964b] text-3xl md:text-4xl font-bold mb-2">EMOCIONAL</h2>
              <p className="text-[#f4f0e1]/90 mb-6">gratuito</p>
            </div>

            <p className="text-[#f4f0e1]/80 mb-8 max-w-md mx-auto md:mx-0">
              Descubra como <span className="font-bold">AUMENTAR O SEU NÍVEL DE PERMISSÃO</span> e melhorar seus
              resultados nas finanças, nos relacionamentos e na saúde.
            </p>

            <form onSubmit={handleSubmit} id="cadastro" name={launch} className="space-y-4 max-w-md mx-auto md:mx-0">
              <div>
                <input
                  type="email"
                  id="form-field-email"
                  placeholder="Seu melhor e-mail"
                  className="w-full px-4 py-3 rounded-md bg-[#f4f0e1]/90 text-[#07242c]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <div className="flex">
                  <select 
                    className="py-3 pl-10 pr-2 rounded-l-md bg-[#f4f0e1]/90 text-[#07242c] border-r border-gray-300 focus:ring-0 focus:outline-none"
                    value={ddi}
                    onChange={(e) => setDdi(e.target.value)}
                  >
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp"
                    id="form-field-telefone"
                    className="flex-1 px-4 py-3 rounded-r-md bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-custom-primary-gold text-white font-medium py-3 px-6 rounded-md transition-all hover:brightness-110 uppercase text-sm tracking-wider" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "PROCESSANDO..." : success ? "SUCESSO! AGUARDE..." : "PARTICIPAR GRATUITAMENTE"}
              </button>
            </form>

            <p className="text-[#C0964B] text-lg mt-4 text-center md:text-left" style={{ color: "#C0964B" }}>ONLINE E GRATUITO. 17, 18 e 19/03 - 19h55</p>
          </div>

          {/* Coluna da direita - Imagem Hero */}
          <div className="w-full md:w-1/2 lg:w-3/5 relative flex justify-center md:justify-end mt-[-50px] mb-[-150px]">
            <div className="relative w-full" style={{ height: "540px" }}>
              <div className="absolute inset-0 flex items-center justify-center md:justify-end">
                <Image
                  src="/images/hero-images.png"
                  alt="Mentor e histórias de transformação"
                  width={600}
                  height={540}
                  priority
                  className="object-contain select-none pointer-events-none -mt-16 md:mt-0"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

