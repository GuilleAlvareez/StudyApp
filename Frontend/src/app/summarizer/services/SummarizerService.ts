export function summarizerService() {
  const summarize = async (file: File) => {
    console.log("Enviando archivo desde el servicio:", file);

    // 1. Crear un objeto FormData
    const formData = new FormData();
    // 'pdfFile' es el nombre de la clave con la que el backend buscará el archivo.
    formData.append('pdfFile', file);

    const response = await fetch('http://localhost:3000/api/summarizer', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al procesar el resumen');
    }

    const data = await response.json();
    return data;
  }

  return {
    summarize,
  }; 
}