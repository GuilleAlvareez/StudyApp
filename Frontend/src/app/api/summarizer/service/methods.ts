import pdf2md from "@opendocsg/pdf2md";
import { jsPDF } from "jspdf";
import { marked } from "marked";

export async function convertToMarkdown(formData: FormData) {
  // 2. Obtener el archivo usando la clave que definimos en el frontend ('pdfFile')
  const file = formData.get("pdfFile") as File | null;

  // 3. Validar que el archivo exista
  if (!file) {
    return null;
  }

  // 4. Convertir el archivo a un Buffer para usarlo con pdf2md
  const arrayBuffer = await file.arrayBuffer();
  const pdfBuffer = Buffer.from(arrayBuffer);

  const markdownText = await pdf2md(pdfBuffer);

  if (!markdownText) {
    return null;
  }

  return markdownText;
}

export async function convertToPdf(pdfText: string) {
  try {
    console.log("Iniciando conversión a PDF...");
    const htmlContent = await marked.parse(pdfText);

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    await doc.html(htmlContent, {
      x: 15, // Margen izquierdo
      y: 15, // Margen superior
      width: 170, // Ancho del contenido (A4 es 210mm, dejamos márgenes)
      windowWidth: 650, // Ancho "virtual" de la ventana para renderizar el HTML
    });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    console.log("Conversión con jsPDF exitosa.");
    return pdfBuffer;
  } catch (error) {
    console.error("Error al convertir a PDF:", error);
    return null;
  }
}

// Biblioteca con mas calidad de renderizado
// export async function convertToPdf(pdfText: string) {
//   try {
//     const launchOptions = {
//       args: chromium.args,
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       defaultViewport: (chromium as any).defaultViewport,
//       executablePath: await chromium.executablePath(),
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       headless: (chromium as any).headless,
//     };

//     const pdf = await mdToPdf(
//       { content: pdfText },
//       { launch_options: launchOptions }
//     );

//     console.log(pdf, "pdf");
//     return pdf;
//   } catch (error) {
//     console.error("Error al convertir a PDF:", error);
//     return null;
//   }
// }
