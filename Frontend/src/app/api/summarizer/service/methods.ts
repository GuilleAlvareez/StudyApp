import pdf2md from '@opendocsg/pdf2md';

export const convertToMarkdown = async (formData: FormData) => {
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
};
