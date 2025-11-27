import { NextRequest, NextResponse } from "next/server";
import { convertToMarkdown, convertMarkdownToPdf } from "./service/methods";

export async function POST(req: NextRequest) {
  try {
    const markdownText = await convertToMarkdown(await req.formData());

    if (!markdownText) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.YOUR_SITE_URL || "",
          "X-Title": process.env.YOUR_SITE_NAME || "StudyApp",
        },
        body: JSON.stringify({
          model: process.env.LLM_MODEL,
          messages: [
            {
              role: "system",
              content: process.env.SYSTEM_PROMPT_SUMMARIZER,
            },
            {
              role: "user",
              content: `Resume el siguiente texto. No lo analices ni crees guías de estudio sobre él. Empieza directamente con el contenido resumido. Aquí está el texto:\n\n${markdownText}`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error desde OpenRouter:", errorText);
      return NextResponse.json(
        { error: "El servicio de resumen falló." },
        { status: response.status }
      );
    }

    const data = await response.json();

    const summary = data.choices?.[0]?.message?.content;
    if (!summary) {
      console.error(
        "La respuesta de OpenRouter no contiene contenido válido:",
        data
      );
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
