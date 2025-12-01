import { NextRequest, NextResponse } from "next/server";
import {
  convertToMarkdown,
  convertMarkdownToPdf,
  callOpenRouterWithFallback,
} from "./service/methods";

export async function POST(req: NextRequest) {
  try {
    const markdownText = await convertToMarkdown(await req.formData());

    if (!markdownText) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF." },
        { status: 500 }
      );
    }

    let summary: string | undefined;

    const systemPrompt =
      process.env.SYSTEM_PROMPT_SUMMARIZER || "Eres un experto resumidor.";
    const userPrompt = `Resume el siguiente texto. No lo analices ni crees guías de estudio sobre él. Empieza directamente con el contenido resumido. Aquí está el texto:\n\n${markdownText}`;

    try {
      summary = await callOpenRouterWithFallback(
        process.env.LLM_MODEL || "",
        systemPrompt,
        userPrompt
      );
    } catch (error) {
      console.error("Primary model failed. Error details:", error);
      console.warn("Attempting fallback...");
      try {
        summary = await callOpenRouterWithFallback(
          process.env.FALLBACK_LLM_MODEL || "",
          systemPrompt,
          userPrompt
        );
      } catch (fallbackError) {
        console.error(
          "Fallback model also failed. Error details:",
          fallbackError
        );
      }
    }

    if (!summary) {
      console.error("La respuesta de OpenRouter no contiene contenido válido.");
      return NextResponse.json(
        { error: "El LLM no devolvió un resumen válido." },
        { status: 500 }
      );
    }

    console.log("Resumen recibido, longitud:", summary.length);

    // Convertir el resumen Markdown a PDF
    const pdfBuffer = await convertMarkdownToPdf(summary);

    if (!pdfBuffer) {
      console.error("convertMarkdownToPdf devolvió null");
      return NextResponse.json(
        { error: "Error al generar el PDF del resumen." },
        { status: 500 }
      );
    }

    console.log("PDF generado, tamaño:", pdfBuffer.length);

    // Devolver el PDF como blob
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="resumen.pdf"',
      },
    });
  } catch (error) {
    console.error("Error en el handler de la API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
