import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_ENDPOINT =
  "https://leads-api.aliancadivergente.com.br/lead-registration/start";

const TRACKING_COOKIE_KEYS = [
  "_fbc",
  "_fbp",
  "_gcl_au",
  "_gcl_aw",
  "_ga",
  "ttclid",
] as const;

type TrackingCookieKey = (typeof TRACKING_COOKIE_KEYS)[number];

interface LeadStartRequestBody {
  email?: string;
  telefone?: string;
  launch?: string;
  season?: string;
  tag_id?: string;
  page?: string;
  path?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  utms?: Record<string, string>;
  metadados?: {
    url?: string;
    referer?: string;
    ip?: string;
    user_agent?: string;
    cookies?: Partial<Record<TrackingCookieKey, string>>;
    temperature?: string;
  };
  [key: string]: unknown;
}

function getRequestIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const [firstIp] = xForwardedFor.split(",");
    if (firstIp) {
      return firstIp.trim();
    }
  }

  return (
    request.headers.get("x-real-ip")?.trim() ??
    request.headers.get("cf-connecting-ip")?.trim() ??
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadStartRequestBody;

    if (!body?.email || !body?.telefone) {
      return NextResponse.json(
        { message: "Campos obrigatorios: email e telefone." },
        { status: 400 }
      );
    }

    const mergedCookies = TRACKING_COOKIE_KEYS.reduce<Record<string, string>>(
      (acc, key) => {
        const cookieFromBody = body.metadados?.cookies?.[key] ?? "";
        const cookieFromRequest = request.cookies.get(key)?.value ?? "";
        acc[key] = cookieFromBody || cookieFromRequest;
        return acc;
      },
      {}
    );

    const payloadToExternalApi = {
      ...body,
      metadados: {
        ...body.metadados,
        ip: getRequestIp(request) || body.metadados?.ip || "",
        user_agent:
          request.headers.get("user-agent") || body.metadados?.user_agent || "",
        cookies: mergedCookies,
      },
    };

    const response = await fetch(EXTERNAL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadToExternalApi),
      cache: "no-store",
    });

    const responseType = response.headers.get("content-type") ?? "";
    if (responseType.includes("application/json")) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: response.status });
    }

    const textData = await response.text();
    return NextResponse.json(
      {
        message: textData || "Resposta sem JSON do endpoint externo.",
      },
      { status: response.status }
    );
  } catch (error) {
    console.error("Erro no proxy lead-registration/start:", error);
    return NextResponse.json(
      { message: "Erro ao processar lead-registration/start." },
      { status: 500 }
    );
  }
}
