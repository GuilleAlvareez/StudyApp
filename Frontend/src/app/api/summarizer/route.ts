import { NextRequest, NextResponse } from "next/server";
import { convertToMarkdown, convertMarkdownToPdf } from "./service/methods";

export async function POST(req: NextRequest) {
  try {
    const markdownText = await convertToMarkdown(await req.formData());
    
    if (!markdownText) {
      return NextResponse.json({ error: 'No se pudo extraer texto del PDF.' }, { status: 400 });
    }
    
    console.log("Markdown extraído, longitud:", markdownText.length);
    
    const response = await fetch('http://127.0.0.1:8000/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: markdownText }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error desde el servicio de Python:", errorText);
      return NextResponse.json({ error: 'El servicio de resumen falló.' }, { status: response.status });
    }
    
    const data = await response.json();
    console.log("Resumen recibido:", data);
    
    if (!data.summary) {
      console.error("La respuesta del agente no contiene 'summary':", data);
      return NextResponse.json({ error: 'El agente no devolvió un resumen válido.' }, { status: 500 });
    }
    
    console.log("Resumen recibido, longitud:", data.summary.length);
    
    // Convertir el resumen Markdown a PDF
    const pdfBuffer = await convertMarkdownToPdf(data.summary);
    
    if (!pdfBuffer) {
      console.error("convertMarkdownToPdf devolvió null");
      return NextResponse.json({ error: 'Error al generar el PDF del resumen.' }, { status: 500 });
    }

    console.log("PDF generado, tamaño:", pdfBuffer.length);

    // Devolver el PDF como blob
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resumen.pdf"',
      },
    });
    
  } catch (error) {
    console.error("Error en el handler de la API:", error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
