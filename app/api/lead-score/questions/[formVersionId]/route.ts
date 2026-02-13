import { NextResponse } from "next/server";

const QUESTIONS_API_BASE =
  "https://leads-api.aliancadivergente.com.br/lead-score/questions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ formVersionId: string }> }
) {
  try {
    const { formVersionId } = await params;

    if (!formVersionId) {
      return NextResponse.json(
        { message: "formVersionId e obrigatorio." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${QUESTIONS_API_BASE}/${encodeURIComponent(formVersionId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const text = await response.text();
    return NextResponse.json(
      { message: text || "Resposta invalida da API de perguntas." },
      { status: response.status }
    );
  } catch (error) {
    console.error("Erro ao buscar perguntas do lead-score:", error);
    return NextResponse.json(
      { message: "Erro ao buscar perguntas." },
      { status: 500 }
    );
  }
}
