import pdf2md from "@opendocsg/pdf2md";

export async function convertToMarkdown(file: File | null) {
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
