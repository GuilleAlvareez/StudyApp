import { useState } from "react";
import { quickNotesService } from "../services/QuickNotesService";

interface Note {
  header: string;
  content: string;
}

export function useQuickNotes() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const parseNotesFromText = (text: string): Note[] => {
    const parsedNotes: Note[] = [];
    const sections = text.split('\n\n');
    
    for (const section of sections) {
      const lines = section.split('\n');
      let header = '';
      let content = '';
      
      for (const line of lines) {
        if (line.startsWith('Titulo:')) {
          header = line.replace('Titulo:', '').trim();
        } else if (line.startsWith('Contenido:')) {
          content = line.replace('Contenido:', '').trim();
        }
      }
      
      if (header && content) {
        parsedNotes.push({ header, content });
      }
    }
    
    console.log("Notas parseadas:", parsedNotes);
    return parsedNotes;
  };

  const generateNotes = async (file: File, numNotes: number) => {
    try {
      setLoading(true);
      const response = await quickNotesService().generateNotes(file, numNotes);
      
      const parsedNotes = parseNotesFromText(response);
      setNotes(parsedNotes);
      
      setLoading(false);
    } catch (error) {
      console.error("Error al generar notas:", error);
      setLoading(false);
      throw error;
    }
  };

  return {
    generateNotes,
    loading,
    notes,
  };
}
