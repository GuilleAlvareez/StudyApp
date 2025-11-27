import { NextRequest, NextResponse } from "next/server";
import { convertToMarkdown } from "../../quicknotes/utils/methods";
import { callOpenRouterWithFallback } from "../summarizer/service/methods";

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
    const systemPrompt =
      process.env.SYSTEM_PROMPT_QUICKNOTES || "Eres un experto tomando notas.";
    const userPrompt = `Genera ${numNotes} notas a partir del siguiente texto: ${markdownText}`;

    console.log("Primary Model:", process.env.LLM_MODEL);
    console.log("Fallback Model:", process.env.FALLBACK_LLM_MODEL);

    let notesContent: string | undefined;

    try {
      notesContent = await callOpenRouterWithFallback(
        process.env.LLM_MODEL || "",
        systemPrompt,
        userPrompt
      );
    } catch (error) {
      console.error("Primary model failed. Error details:", error);
      console.warn("Attempting fallback...");
      try {
        notesContent = await callOpenRouterWithFallback(
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

    if (!notesContent) {
      return NextResponse.json(
        { error: "El servicio de notas falló." },
        { status: 500 }
      );
    }

    console.log("Notas recibidas:", notesContent);

    return NextResponse.json(notesContent);
  } catch (error) {
    console.error("Error en el handler de la API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
