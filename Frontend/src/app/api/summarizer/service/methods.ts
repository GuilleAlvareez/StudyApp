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

export async function convertMarkdownToPdf(markdownText: string): Promise<Buffer | null> {
  try {
    if (!markdownText || typeof markdownText !== 'string') {
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
    const lines = markdownText.split('\n');
    let yPosition = 20;
    
    for (const line of lines) {
      if (yPosition > 280) { // Nueva página si se acaba el espacio
        doc.addPage();
        yPosition = 20;
      }
      
      // Procesar diferentes elementos de Markdown
      if (line.startsWith('# ')) {
        // H1 - Título principal
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text(line.substring(2).trim(), 15, yPosition);
        yPosition += 12;
      } else if (line.startsWith('## ')) {
        // H2 - Subtítulo
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(line.substring(3).trim(), 15, yPosition);
        yPosition += 10;
      } else if (line.startsWith('### ')) {
        // H3 - Subtítulo menor
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(line.substring(4).trim(), 15, yPosition);
        yPosition += 8;
      } else if (line.startsWith('#### ')) {
        // H4 - Subtítulo menor
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(line.substring(5).trim(), 15, yPosition);
        yPosition += 7;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // Lista con viñetas
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        const bulletText = '• ' + line.substring(2).trim();
        const splitText = doc.splitTextToSize(bulletText, 160);
        doc.text(splitText, 20, yPosition);
        yPosition += splitText.length * 5;
      } else if (/^\d+\.\s/.test(line)) {
        // Lista numerada
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        const splitText = doc.splitTextToSize(line.trim(), 160);
        doc.text(splitText, 20, yPosition);
        yPosition += splitText.length * 5;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Texto en negrita
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        const boldText = line.substring(2, line.length - 2);
        const splitText = doc.splitTextToSize(boldText, 170);
        doc.text(splitText, 15, yPosition);
        yPosition += splitText.length * 5;
      } else if (line.startsWith('> ')) {
        // Cita
        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        const quoteText = line.substring(2).trim();
        const splitText = doc.splitTextToSize(quoteText, 160);
        doc.text(splitText, 25, yPosition);
        yPosition += splitText.length * 4.5;
      } else if (line.trim() !== '') {
        // Texto normal
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        
        // Procesar texto con formato inline (negrita, cursiva)
        let processedLine = line.trim();
        
        // Dividir líneas largas
        const splitText = doc.splitTextToSize(processedLine, 170);
        doc.text(splitText, 15, yPosition);
        yPosition += splitText.length * 5;
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
