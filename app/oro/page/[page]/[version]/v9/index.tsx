"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { type LeadCaptureSubmitData } from "@/app/components/form/lead-capture-form";
import {
  getTrackingCookies,
  getTrackingPageInfo,
  getTrackingUtmInfo,
} from "@/lib/tracking/lead-tracking-browser";
import {
  normalizeTemperature,
  type NormalizedTemperature,
} from "@/lib/temperature-utils";
import { useCreateLeadCapture } from "@/app/modules/lead-capture/hook/use-create-lead-capture";
import type {
  LeadRegistrationPayload,
} from "@/app/modules/lead-capture/lead-capture.model";
import {
  useGetPageByAbbreviation,
} from "@/app/modules/lead-capture/hook/use-get-page-by-abbreviation";
import type { PageConfigResponse } from "@/app/modules/lead-capture/page-config.model";
import {
  findHeadlineByUrlParam,
  findTemperatureByUrlParam,
  findVersionByUrlParam,
} from "@/app/modules/lead-capture/page-config.selectors";
import ContainerTeste from "./container";
import { Headline } from "./headline";

function getParamValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

type Formv9Props = {
  initialPageConfig?: PageConfigResponse | null;
};

export default function Formv9({ initialPageConfig = null }: Formv9Props) {
  const params = useParams();
  const pageAbbreviation = getParamValue(params?.page) ?? "";
  const urlVersion = getParamValue(params?.version);
  const urlHeadline = getParamValue(params?.headline);
  const urlTemperature = getParamValue(params?.temperature);
  const [pageConfig, setPageConfig] = useState<PageConfigResponse | null>(
    initialPageConfig
  );
  const [titleRedLine, setTitleRedLine] = useState<React.ReactNode | null>(
    null
  );
  const [hedlineTitle, setHedlineTitle] = useState<React.ReactNode | null>(null);
  const [temperatura, setTemperatura] = useState<NormalizedTemperature | undefined>(
    undefined
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const mutationCreate = useCreateLeadCapture();
  const {
    mutateAsync: getPageByAbbreviation,
    isPending: isLoadingPageConfig,
  } = useGetPageByAbbreviation();

  const pageTemperature = findTemperatureByUrlParam(
    pageConfig,
    urlTemperature
  );
  const pageVersion = findVersionByUrlParam(pageConfig, urlVersion);
  const pageHeadline = findHeadlineByUrlParam(pageConfig, urlHeadline);

  useEffect(() => {
    if (!pageAbbreviation || pageConfig) {
      return;
    }

    async function fetchPageConfig() {
      try {
        const response = await getPageByAbbreviation(pageAbbreviation);
        setPageConfig(response.data);
      } catch (error) {
        console.error("Erro ao buscar page por abbreviation:", error);
      }
    }

    fetchPageConfig();
  }, [pageAbbreviation, getPageByAbbreviation, pageConfig]);

  useEffect(() => {
      const temperaturaValue = normalizeTemperature(pageTemperature!.temperature_abbreviation);

      const redLineText = Headline.find(
        (benefit) => benefit.id === urlHeadline
      )?.text;

      const titleRedLineText = Headline.find(
        (benefit) => benefit.id === urlHeadline
      )?.title;

      if (titleRedLineText) {
        setTitleRedLine(titleRedLineText);
      }

      setTemperatura(temperaturaValue);
  }, [pageHeadline, urlHeadline, pageTemperature]);

  const handleLeadCaptureSubmit = async (data: LeadCaptureSubmitData) => {
    setSubmitError(null);

    try {
      if (!pageConfig || !pageTemperature) {
        throw new Error("Configuracao da page ainda nao carregada.");
      }

      const { currentUrl, currentPath, currentPage } = getTrackingPageInfo();
      const { utmObject, getUtmValue } = getTrackingUtmInfo();
      const cookies = getTrackingCookies();

      const payload: LeadRegistrationPayload = {
        email: data.email,
        telefone: data.normalizedPhone,
        launch: pageConfig.launch_name ?? "",
        season: pageConfig.season_name ?? "",
        tag_id: pageTemperature.tag_id,
        page: currentPage,
        path: currentPath,
        utm_source: getUtmValue("utm_source"),
        utm_medium: getUtmValue("utm_medium"),
        utm_campaign: getUtmValue("utm_campaign"),
        utm_content: getUtmValue("utm_content"),
        utm_term: getUtmValue("utm_term"),
        utm_id: getUtmValue("utm_id"),
        utms: utmObject,
        metadados: {
          url: currentUrl,
          referer: document.referrer || "",
          ip: "",
          user_agent: navigator.userAgent || "",
          cookies,
          temperature: temperatura,
          form_version_id: pageConfig?.form_version_id,
          page_version_id: pageVersion?.id,
          page_headline_id: pageHeadline?.id,
        },
      };

      const response = await mutationCreate.mutateAsync(payload);

      const requestId = response.data?.requestId;

      if (!requestId) {
        throw new Error("requestId nao retornado na resposta.");
      }

      window.location.href = `/quiz-oro/?temperature=${temperatura}&requestId=${encodeURIComponent(
        requestId
      )}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.normalizedPhone)}`;
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);
      setSubmitError("Nao foi possivel enviar seu cadastro agora.");
    }
  };

  return (
    <>
      {isLoadingPageConfig || !pageConfig ? (
        <div>carregando...</div>
      ) : (
        <ContainerTeste
          titleRedLine={titleRedLine}
          redLine={pageHeadline!.content}
          formName={pageConfig.launch_name}
          onSubmit={handleLeadCaptureSubmit}
          submitError={submitError}
        />
      )}
    </>
  );
}
