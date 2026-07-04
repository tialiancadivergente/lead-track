import type { PageConfigResponse } from "./page-config.model";

const PAGE_BY_ABBREVIATION_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/page/by-abbreviation`;
const BBF_X_API_KEY = process.env.BBF_X_API_KEY?.trim();

export async function fetchPageConfigByAbbreviation(
  abbreviation: string
): Promise<PageConfigResponse | null> {
  if (!abbreviation || !BBF_X_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      `${PAGE_BY_ABBREVIATION_ENDPOINT}/${encodeURIComponent(abbreviation)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": BBF_X_API_KEY,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        `Erro ao buscar page por abbreviation: status=${response.status}`
      );
      return null;
    }

    return (await response.json()) as PageConfigResponse;
  } catch (error) {
    console.error("Erro ao buscar page por abbreviation no servidor:", error);
    return null;
  }
}
