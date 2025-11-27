import { NextRequest, NextResponse } from "next/server";
import { convertToMarkdown } from "../../quicknotes/utils/methods";

export async function POST(req: NextRequest) {
  try {
    // const formData = await req.formData();

    // const numNotes = formData.get("numNotes") as string | null;
    // const file = formData.get("file") as File | null;

    // const markdownText = await convertToMarkdown(file);

    const { numNotes, markdownText } = await req.json();

    if (!markdownText) {
      return NextResponse.json(
        { error: "Falta el texto del PDF." },
        { status: 400 }
      );
    }
    console.log("LLega antes de la api");
    console.log("Usando modelo:", process.env.LLM_MODEL);

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
              content: process.env.SYSTEM_PROMPT_QUICKNOTES,
            },
            {
              role: "user",
              content: `Genera ${numNotes} notas a partir del siguiente texto: ${markdownText}`,
            },
          ],
        }),
      }
    );

    console.log("Sale de la api");

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error desde OpenRouter:", errorText);
      return NextResponse.json(
        { error: "El servicio de notas falló." },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Notas recibidas:", data);

    return NextResponse.json(data.choices?.[0]?.message?.content);
  } catch (error) {
    console.error("Error en el handler de la API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
