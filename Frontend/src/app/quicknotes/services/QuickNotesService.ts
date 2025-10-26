export function quickNotesService() {
  const generateNotes = async (file: File, numNotes: number): Promise<File> => {
    console.log("Generando notas desde el servicio:");
    
    const formData = new FormData();
    formData.append("file", file); // El archivo
    formData.append("numNotes", numNotes.toString()); // El número convertido a string
    
    const response = await fetch('http://localhost:3000/api/quicknotes', {
      method: 'POST',
      body: formData,
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
