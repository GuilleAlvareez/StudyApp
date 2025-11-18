export function summarizerService() {
  const summarize = async (file: File): Promise<File> => {
    console.log("Enviando archivo desde el servicio:", file);

    const formData = new FormData();
    formData.append('pdfFile', file);

    const response = await fetch('/api/summarizer', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al procesar el resumen');
    }

    // Obtener el PDF como blob
    const pdfBlob = await response.blob();
    
    // Crear un File object del PDF resumido
    const summaryFile = new File([pdfBlob], `resumen_${file.name}`, {
      type: 'application/pdf',
    });

    return summaryFile;
  }

  return {
    summarize,
  }; 
}
