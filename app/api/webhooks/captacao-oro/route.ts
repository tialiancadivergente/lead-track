import { NextResponse } from "next/server";
import {
  CAPTACAO_ORO_WEBHOOK_URL,
  captacaoOroPayloadSchema,
} from "@/lib/webhooks/captacao-oro";

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  try {
    const body = await request.json();
    const parsed = captacaoOroPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Dados invalidos para a automacao de captacao ORO." },
        { status: 400, headers }
      );
    }

    const response = await fetch(CAPTACAO_ORO_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      // Upstream bodies may contain contact data; return only a generic error.
      console.error("Falha no webhook captacao-oro:", response.status);
      return NextResponse.json(
        { success: false, message: "Nao foi possivel enviar os dados para a automacao de captacao ORO." },
        { status: 502, headers }
      );
    }

    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    const invalidJson = error instanceof SyntaxError;
    return NextResponse.json(
      { success: false, message: invalidJson ? "JSON invalido." : "Erro ao enviar a automacao de captacao ORO." },
      { status: invalidJson ? 400 : 502, headers }
    );
  }
}
