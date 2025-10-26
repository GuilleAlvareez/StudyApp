import { useState } from "react";
import { quickNotesService } from "../services/QuickNotesService";

export function useQuickNotes() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<object[]>([]);

  const generateNotes = async (file: File, numNotes: number) => {
    try {
      setLoading(true);
      const response = await quickNotesService().generateNotes(file, numNotes);

      // Procesar la respuesta y guardar las notas


      setLoading(false);
      return response;
    } catch (error) {
      console.error("Error al generar notas:", error);
      throw error;
    }
  }

  return {
    generateNotes, loading,
  };
}
