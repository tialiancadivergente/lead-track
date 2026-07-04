import type {
  PageConfigResponse,
  PageHeadlineConfig,
  PageTemperatureConfig,
  PageVersionConfig,
} from "./page-config.model";

export function findTemperatureByUrlParam(
  pageConfig: PageConfigResponse | null,
  temperature: string | undefined
): PageTemperatureConfig | undefined {
  if (!pageConfig || !temperature) return undefined;

  return pageConfig.temperatures.find(
    (item) =>
      item.temperature_abbreviation?.toLowerCase() === temperature.toLowerCase()
  );
}

export function findVersionByUrlParam(
  pageConfig: PageConfigResponse | null,
  version: string | undefined
): PageVersionConfig | undefined {
  if (!pageConfig || !version) return undefined;

  return pageConfig.versions.find(
    (item) => item.abbreviation.toLowerCase() === version.toLowerCase()
  );
}

export function findHeadlineByUrlParam(
  pageConfig: PageConfigResponse | null,
  headline: string | undefined
): PageHeadlineConfig | undefined {
  if (!pageConfig || !headline) return undefined;

  return pageConfig.headlines.find(
    (item) => item.abbreviation.toLowerCase() === headline.toLowerCase()
  );
}
