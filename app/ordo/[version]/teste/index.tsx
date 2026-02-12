"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Award, Calendar, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { getTagIdByTemperature } from "@/lib/temperature-utils";

const TRACKING_COOKIE_KEYS = [
  "_fbc",
  "_fbp",
  "_gcl_au",
  "_gcl_aw",
  "_ga",
  "ttclid",
] as const;

export default function FormvTeste() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [titleRedLine, setTitleRedLine] = useState<React.ReactNode | null>(
    null
  );
  const [tipo, setTipo] = useState<string | null>(null);
  const [versao, setVersao] = useState<string | null>(null);
  const [redLine, setRedLine] = useState<string | null>(null);
  const [temperatura, setTemperatura] = useState<string | null>(null);
  const [tagId, setTagId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [ddi, setDdi] = useState("+55");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const launch = "oro";
  const season = "nov25";
  const tag_id = "120566";

  useEffect(() => {
    if (params && params.temperature) {
      console.log("temperatura param", params.temperature);
      let tipoValue = params.headline;
      const versaoValue = params.version;
      const temperaturaValue = params.temperature;

      const redLineVersion = params.headline;
      tipoValue = `redline-${redLineVersion}`;
      console.log("RedLine Version:", redLineVersion);
      const redLineText = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.text;
      const titleRedLineText = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.title;
      const _isLogo = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.isLogo;
      const _isPicture = benefitsMapping.find(
        (benefit) => benefit.id === redLineVersion
      )?.isPicture;
      if (redLineText) {
        setRedLine(redLineText as unknown as string);
        console.log("RedLine:", redLineText);
      }

      if (titleRedLineText) {
        setTitleRedLine(titleRedLineText);
        console.log("Title RedLine:", titleRedLineText);
      }

      console.log("Tipo:", tipoValue);
      console.log("Versão:", versaoValue);
      console.log("Temperatura:", temperaturaValue);

      setTipo(tipoValue);
      setVersao(versaoValue as string);
      setTemperatura(temperaturaValue as string);

      // Definir tagId baseado na temperatura
      const calculatedTagId = getTagIdByTemperature(temperaturaValue as string);
      setTagId(calculatedTagId);
      console.log("TagId definido:", calculatedTagId);
    }
  }, [params]);

  const benefitsMapping = [
    {
      id: 1,
      isPicture: false,
      isLogo: true,
      title: (
        <p
          className={`text-3xl md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 `}
        >
          Pare de assistir pessoas que sabem menos do que você ganharem mais
        </p>
      ),
      text: (
        <p
          className={`text-2xl md:text-xl md:uppercase capitalize text-center`}
        >
          Você não está ficando para trás por falta de conhecimento ou de força
          de vontade,{" "}
          <span
            className="text-[#c0964b]"
          >
            você está ficando para trás por falta de permissão.
          </span>
        </p>
      ),
    },
    {
      id: 2,
      isPicture: false,
      isLogo: true,
      title: (
        <p
          className={`text-3x max-w-xl md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 `}
        >
          Tem gente que estudou menos que você e ganhando bem mais
        </p>
      ),
      text: (
        <p className={`text-2xl md:text-2xl max-w-sm mx-auto text-center`}>
          E esse ciclo se repete pela sua falta de permissão
        </p>
      ),
    },
    {
      id: 3,
      isPicture: true,
      isLogo: true,
      title: (
        <p
          className={`text-3x max-w-lg md:text-4xl uppercase font-bold mx-auto leading-10 md:-leading-10 text-center md:text-left`}
        >
          Essa advogada saiu de R$3 mil para R$85 mil em menos de 60 dias
        </p>
      ),
      text: (
        <p
          className={`text-2xl md:text-2xl max-w-lg mx-auto text-center md:text-left`}
        >
          Destrave o seu teto financeiro eliminando o seu bloqueio e permissão.
          Capacidade e força de vontade você já tem.
        </p>
      ),
    },
    {
      id: "h2",
      isPicture: false,
      isLogo: true,
      title: (
        <p
          className={`text-3x max-w-xl md:text-4xl uppercase font-bold leading-10 md:-leading-10 `}
        >
          Tem gente que estudou menos que você e ganhando bem mais
        </p>
      ),
      text: (
        <p className={`text-2xl md:text-2xl max-w-sm text-left`}>
          E esse ciclo se repete pela sua falta de permissão
        </p>
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
  
      if (name === "whatsapp") {
        // Remove todos os caracteres não numéricos
        const numericValue = value.replace(/\D/g, "");
  
        // Aplica a formatação de acordo com a quantidade de dígitos
        let formattedValue = numericValue;
        if (ddi === "+55") {
          // Formato brasileiro: (XX) XXXXX-XXXX
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
        } else {
          // Formato genérico para outros países
          if (numericValue.length > 3 && numericValue.length <= 7) {
            formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
              3
            )}`;
          } else if (numericValue.length > 7) {
            formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
              3,
              7
            )}-${numericValue.slice(7)}`;
          }
        }
  
        setWhatsapp(formattedValue);
      } else {
        setWhatsapp(value);
      }
    };

  const getCookieValue = (cookieName: string): string => {
    if (typeof document === "undefined" || !document.cookie) {
      return "";
    }

    const match = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${cookieName}=`));

    if (!match) {
      return "";
    }

    return decodeURIComponent(match.split("=").slice(1).join("="));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const normalizedPhone = `${ddi}${whatsapp.replace(/\D/g, "")}`;
      const currentUrl = window.location.href;
      const currentPath = window.location.pathname;
      const currentPage = window.location.hostname;

      const utmObject: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        if (key.toLowerCase().startsWith("utm_")) {
          utmObject[key] = value;
        }
      });

      const cookies = TRACKING_COOKIE_KEYS.reduce<Record<string, string>>(
        (acc, key) => {
          acc[key] = getCookieValue(key);
          return acc;
        },
        {}
      );

      const payload = {
        email,
        telefone: normalizedPhone,
        launch,
        season,
        tag_id,
        page: currentPage,
        path: currentPath,
        utm_source: searchParams.get("utm_source") ?? "",
        utm_medium: searchParams.get("utm_medium") ?? "",
        utm_campaign: searchParams.get("utm_campaign") ?? "",
        utm_content: searchParams.get("utm_content") ?? "",
        utm_term: searchParams.get("utm_term") ?? "",
        utm_id: searchParams.get("utm_id") ?? "",
        utms: utmObject,
        metadados: {
          url: currentUrl,
          referer: document.referrer || "",
          ip: "",
          user_agent: navigator.userAgent || "",
          cookies,
          temperature: temperatura ?? "",
        },
      };

      const response = await fetch("/api/lead-registration/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || "Falha ao registrar lead");
      }

      const leads = JSON.parse(localStorage.getItem("leads") || "[]");
      leads.push({
        email,
        whatsapp: normalizedPhone,
        launch,
        season,
        tag_id,
        date: new Date().toISOString(),
      });
      localStorage.setItem("leads", JSON.stringify(leads));
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);
      setSubmitError("Nao foi possivel enviar seu cadastro agora.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section
        id="hero"
        className={`relative min-h-screen flex flex-col items-center p-4 md:p-0 justify-center overflow-hidden bg-[url('/images/v16/bg.png')] bg-cover bg-center z-0`}
      >
        <div className="absolute lg:top-0 top-[-300px] lg:right-[-50px] right-[-180px] bg-no-repeat block lg:w-[545px] w-[350px]">
          <Image
            src="/images/v16/bg-right-top.png"
            alt="Background top right and left"
            width={545}
            height={1106}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute sm:top-28 top-24 xl:right-60 lg:right-[-100px] right-[-30px] lg:w-[680px] sm:w-[400px] w-[280px] bg-no-repeat">
          <Image
            src="/images/v16/Elton-Euler-Resgate-dos-Otimistas-Dependencia-emocional.png"
            alt="DEPENDÊNCIA EMOCIONAL"
            width={764}
            height={852}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-0 w-full bg-no-repeat md:block hidden">
          <Image
            src="/images/v16/bg-left-bottom.png"
            alt="Background top right and left"
            width={563}
            height={617}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute sm:left-0 left-[300px] bottom-0 bg-no-repeat block lg:w-[329px] w-[200px]">
          <Image
            src="/images/v16/bg-bottom-left.png"
            alt="Background top right and left"
            width={329}
            height={364}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 bg-no-repeat block lg:w-[400px] w-[200px]">
          <Image
            src="/images/v16/bg-left-top.png"
            alt="Background top right and left"
            width={400}
            height={583}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div
          className={`container mx-auto sm:px-4 pt-6 relative lg:w-[1080px] w-auto`}
        >
          {/* Coluna única centralizada ou duas colunas */}
          <div className="w-full">
            <div className="mb-8 flex justify-start">
              <Image
                src="/images/logo-resgate-dos-otimistas.png"
                alt="Logotipo Resgate dos otimistas"
                width={322}
                height={171}
                priority
                className="object-contain select-none pointer-events-none lg:w-[322px] sm:w-[250px] w-[200px]"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="mt-8 mb-2 font-bebas-neue text-left">
              <div
                className={`text-4xl md:text-5xl max-w-2xl leading-none text-left text-[#f4f0e1]`}
              >
                {titleRedLine}
              </div>
            </div>

            <p
              className="mb-12 sm:mt-0 mt-0 text-[#f4f0e1] lg:text-xl sm:text-[16px] sm:text-[14px]/[20px] text-[12px]/[18px] max-w-[180px] sm:max-w-[200px] lg:max-w-[350px] md:max-w-[350px]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {redLine ? (
                <span>{redLine}</span>
              ) : (
                <>
                  Descubra como{" "}
                  <span className="font-bold text-[#C0964B]">
                    AUMENTAR O SEU NÍVEL DE PERMISSÃO
                  </span>{" "}
                  e melhorar seus resultados nas finanças, nos relacionamentos e
                  na saúde.
                </>
              )}
            </p>
            <form
              onSubmit={handleSubmit}
              id="cadastro"
              name={launch}
              className={`space-y-4 sm:max-w-md`}
            >
              <div className="">
                <input
                  type="email"
                  id="form-field-email"
                  placeholder="Seu melhor e-mail"
                  className={`w-full flex rounded-none flex-1 px-4 py-4 bg-[#f4f0e1]/90 text-[#07242c]`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
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
                    className={`py-4 pl-10 pr-2 bg-[#f4f0e1]/90 rounded-none text-[#07242c] border-r border-gray-300 focus:ring-0 focus:outline-none`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
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
                    className={`w-full px-4 py-4 rounded-none bg-[#f4f0e1]/90 text-[#07242c] focus:outline-none`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    value={whatsapp}
                    onChange={handleChange}
                    name="whatsapp"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0a6d6d] to-[#0e7c7b] text-[#f4f0e1] py-5 px-6 shadow-md text-base md:text-lg uppercase tracking-wide transition-all hover:brightness-110"
                disabled={isSubmitting}
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <span className="text-[#f4f0e1]">
                  {isSubmitting ? "ENVIANDO..." : "PARTICIPAR GRATUITAMENTE"}
                </span>
              </button>
              {submitError && (
                <p className="text-sm text-red-300">{submitError}</p>
              )}
            </form>

            <div
              className={`text-[#fff] flex items-center mt-8 justify-start sm:gap-8 gap-2 xl:text-2xl sm:text-2xl text-sm`}
            >
              <div className="flex items-center justify-center leading-none gap-1 text-[#fff]">
                <Award color="#C0964B" size={16} /> 100% GRATUITO
              </div>
              <div className="flex items-center justify-center leading-none gap-1 text-[#fff]">
                <Calendar color="#C0964B" size={16} />
                24, 25 E 26/11
              </div>
              <div className="flex items-center justify-center leading-none gap-1 text-[#fff]">
                <Clock color="#C0964B" size={16} />
                ÀS 19H55
              </div>
            </div>
          </div>

          <div className="w-full h-full -mt-14 md:mt-6">
            <Image
              src="/images/foto.png"
              alt="Picture"
              width={600}
              height={400}
            />
          </div>
        </div>
        <footer className="container mb-24 mt-8 sm:px-4 z-10 mx-auto lg:w-[1080px] w-auto">
          <div className="text-left text-[#f4f0e1] text-xs md:text-sm font-serif tracking-wide">
            <div
              className="text-[#f4f0e1]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              © 2025 . All rights reserved. Política de Privacidade
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
