import { NextRequest, NextResponse } from "next/server";
import { convertToMarkdown } from "../quickNotes/service/methods";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const numNotes = formData.get("numNotes") as string | null;
    const file = formData.get("file") as File | null;

    const markdownText = await convertToMarkdown(file);

    if (!markdownText) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF." },
        { status: 400 }
      );
    }
    console.log("Texto extraído:", markdownText);
    
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
              content: `Genera ${numNotes} notas a partir del siguiente texto: ${markdownText}`,
            },
          ],
        }),
      }
    );

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
    
  } catch (error) {}
}
