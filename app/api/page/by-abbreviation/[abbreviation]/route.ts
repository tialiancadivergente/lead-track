import { NextResponse } from "next/server";

const PAGE_BY_ABBREVIATION_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/page/by-abbreviation`;
const BBF_X_API_KEY = process.env.BBF_X_API_KEY?.trim();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ abbreviation: string }> }
) {
  try {
    if (!BBF_X_API_KEY) {
      return NextResponse.json(
        { message: "BBF_X_API_KEY nao configurada no servidor." },
        { status: 500 }
      );
    }

    const { abbreviation } = await params;

    if (!abbreviation) {
      return NextResponse.json(
        { message: "abbreviation e obrigatoria." },
        { status: 400 }
      );
    }

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

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: response.status });
    }

    const textData = await response.text();
    return NextResponse.json(
      { message: textData || "Resposta invalida de page/by-abbreviation." },
      { status: response.status }
    );
  } catch (error) {
    console.error("Erro no proxy page/by-abbreviation:", error);
    return NextResponse.json(
      { message: "Erro ao buscar page por abbreviation." },
      { status: 500 }
    );
  }
}
