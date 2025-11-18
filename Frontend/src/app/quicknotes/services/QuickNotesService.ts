import { convertToMarkdown } from "../utils/methods";

export function quickNotesService() {
  const generateNotes = async (file: File, numNotes: number): Promise<string> => {
    console.log("Generando notas desde el servicio:");
    
    // const formData = new FormData();
    // formData.append("file", file); // El archivo
    // formData.append("numNotes", numNotes.toString()); // El número convertido a string
    
    const markdownText = await convertToMarkdown(file);

    const bodyToSend = {
      numNotes: numNotes.toString(),
      markdownText: markdownText,
    }

    const response = await fetch('/api/quickNotes', {
      method: 'POST',
      body: JSON.stringify(bodyToSend),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al procesar las notas');
    }

    return response.json();
  }

  return {
    generateNotes,
  };  
}
