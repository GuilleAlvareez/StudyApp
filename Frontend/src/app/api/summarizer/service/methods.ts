import pdf2md from "@opendocsg/pdf2md";
import { jsPDF } from "jspdf";
import { marked } from "marked";

export async function convertToMarkdown(formData: FormData) {
  const file = formData.get("pdfFile") as File | null;

  if (!file) {
    return null;
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdfBuffer = Buffer.from(arrayBuffer);

  const markdownText = await pdf2md(pdfBuffer);

  if (!markdownText) {
    return null;
  }

  return markdownText;
}

export async function convertMarkdownToPdf(
  markdownText: string
): Promise<Buffer | null> {
  try {
    if (!markdownText || typeof markdownText !== "string") {
      console.error("Texto Markdown inválido:", markdownText);
      return null;
    }

    // Crear documento PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Dividir el contenido en líneas y procesar Markdown
    const lines = markdownText.split("\n");
    let yPosition = 20;

    // Set default font to Helvetica
    doc.setFont("helvetica", "normal");

    for (const line of lines) {
      if (yPosition > 280) {
        // Nueva página si se acaba el espacio
        doc.addPage();
        yPosition = 20;
      }

      const trimmedLine = line.trim();

      // Procesar diferentes elementos de Markdown
      if (trimmedLine.startsWith("# ")) {
        // Añadir espacio antes del título si no es el principio de la página
        if (yPosition > 30) yPosition += 8;

        // H1 - Título principal
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(trimmedLine.substring(2).trim(), 15, yPosition);
        yPosition += 8; // Reduced from 8
      } else if (trimmedLine.startsWith("## ")) {
        if (yPosition > 30) yPosition += 7;

        // H2 - Subtítulo
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(trimmedLine.substring(3).trim(), 15, yPosition);
        yPosition += 6; // Reduced from 7
      } else if (trimmedLine.startsWith("### ")) {
        if (yPosition > 30) yPosition += 6;

        // H3 - Subtítulo menor
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(trimmedLine.substring(4).trim(), 15, yPosition);
        yPosition += 2; // Reduced from 6
      } else if (trimmedLine.startsWith("#### ")) {
        if (yPosition > 30) yPosition += 5;

        // H4 - Subtítulo menor
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(trimmedLine.substring(5).trim(), 15, yPosition);
        yPosition += 5; // Reduced from 5
      } else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        // Lista con viñetas (soporta indentación básica)
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        // Calcular indentación basada en espacios al inicio
        const leadingSpaces = line.search(/\S|$/);
        const indentX = 20 + (leadingSpaces > 0 ? leadingSpaces * 2 : 0);

        const bulletText = "• " + trimmedLine.substring(2).trim();

        // Limpiar negritas para el cálculo de tamaño (simplificado)
        const cleanText = bulletText.replace(/\*\*/g, "");
        const splitText = doc.splitTextToSize(cleanText, 160 - (indentX - 20));

        // Renderizar texto (simple, sin negritas inline complejas por ahora para listas)
        doc.text(splitText, indentX, yPosition);
        yPosition += splitText.length * 5;
      } else if (/^\d+\.\s/.test(trimmedLine)) {
        // Lista numerada
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        const leadingSpaces = line.search(/\S|$/);
        const indentX = 20 + (leadingSpaces > 0 ? leadingSpaces * 2 : 0);

        const splitText = doc.splitTextToSize(
          trimmedLine,
          160 - (indentX - 20)
        );
        doc.text(splitText, indentX, yPosition);
        yPosition += splitText.length * 5;
      } else if (trimmedLine.startsWith("> ")) {
        // Cita
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        const quoteText = trimmedLine.substring(2).trim();
        const splitText = doc.splitTextToSize(quoteText, 160);

        // Barra vertical de cita
        doc.setDrawColor(150);
        doc.setLineWidth(1);
        doc.line(20, yPosition, 20, yPosition + splitText.length * 4.5);

        doc.text(splitText, 25, yPosition + 3); // Ajuste ligero
        yPosition += splitText.length * 5 + 2;
      } else if (trimmedLine !== "") {
        // Texto normal con soporte básico para negrita inline
        doc.setFontSize(11);

        // Detectar si la línea empieza y termina con negrita (título o énfasis completo)
        if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
          doc.setFont("helvetica", "bold");
          const boldText = trimmedLine.substring(2, trimmedLine.length - 2);
          const splitText = doc.splitTextToSize(boldText, 170);
          doc.text(splitText, 15, yPosition);
          yPosition += splitText.length * 5;
        } else {
          // Texto mixto: dividir por **
          const parts = trimmedLine.split(/(\*\*.*?\*\*)/g);
          let currentX = 15;

          // Nota: Este renderizado inline es básico y no maneja saltos de línea perfectos en textos largos mixtos.
          // Para textos largos, usamos splitTextToSize estándar y perdemos el formato inline complejo,
          // o asumimos que cabe en una línea para fragmentos cortos.
          // Dado que es un resumen, priorizamos legibilidad general.

          // Si el texto es muy largo, mejor renderizarlo normal para evitar desbordes complejos
          if (doc.getTextWidth(trimmedLine) > 170) {
            doc.setFont("helvetica", "normal");
            const splitText = doc.splitTextToSize(trimmedLine, 170);
            doc.text(splitText, 15, yPosition);
            yPosition += splitText.length * 5;
          } else {
            // Renderizado inline para líneas cortas
            for (const part of parts) {
              if (part.startsWith("**") && part.endsWith("**")) {
                doc.setFont("helvetica", "bold");
                const text = part.substring(2, part.length - 2);
                doc.text(text, currentX, yPosition);
                currentX += doc.getTextWidth(text);
              } else {
                doc.setFont("helvetica", "normal");
                doc.text(part, currentX, yPosition);
                currentX += doc.getTextWidth(part);
              }
            }
            yPosition += 5;
          }
        }
      } else {
        // Línea vacía - añadir espacio
        yPosition += 5;
      }
    }

    // Retornar como Buffer
    const pdfArrayBuffer = doc.output("arraybuffer");
    return Buffer.from(pdfArrayBuffer);
  } catch (error) {
    console.error("Error al convertir Markdown a PDF:", error);
    return null;
  }
}
