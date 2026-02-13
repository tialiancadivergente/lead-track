import { NextRequest, NextResponse } from "next/server";

const LEAD_SCORE_START_ENDPOINT =
  "https://leads-api.aliancadivergente.com.br/lead-score/start";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(LEAD_SCORE_START_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: response.status });
    }

    const textData = await response.text();
    return NextResponse.json(
      { message: textData || "Resposta invalida de lead-score/start." },
      { status: response.status }
    );
  } catch (error) {
    console.error("Erro no proxy lead-score/start:", error);
    return NextResponse.json(
      { message: "Erro ao processar lead-score/start." },
      { status: 500 }
    );
  }
}
