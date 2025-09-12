import { NextRequest, NextResponse } from "next/server";
import { convertToMarkdown, convertToPdf } from "./service/methods";

export async function POST(req: NextRequest) {
  try {
    // 1. Obtener los datos del formulario en lugar de JSON
    const markdownText = await convertToMarkdown(await req.formData());
    const pdf = await convertToPdf(markdownText as string);
    // console.log(markdownText, "route");
    return NextResponse.json({ markdownText }, { status: 200 });

    // 5. Enviar el texto extraído a tu servicio de Python
    const response = await fetch('http://127.0.0.1:8000/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enviamos el texto markdown, no el archivo original
      body: JSON.stringify({ text: markdownText }),
    });

    if (!response.ok) {
        // Si el servicio de Python falla, devuelve un error claro
        const errorText = await response.text();
        console.error("Error desde el servicio de Python:", errorText);
        return NextResponse.json({ error: 'El servicio de resumen falló.' }, { status: response.status });
    }

    const data = await response.json();
    
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error en el handler de la API:", error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}