"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { quickNotesService } from '../services/QuickNotesService';

interface Note {
  header: string;
  content: string;
}

interface QuickNotesContextType {
  notes: Note[];
  loading: boolean;
  generateNotes: (file: File, numNotes: number) => Promise<void>;
  clearNotes: () => void;
}

const QuickNotesContext = createContext<QuickNotesContextType | undefined>(undefined);

const parseNotesFromText = (text: string): Note[] => {
    if (typeof text !== 'string') {
        console.error("Se esperaba un string para parsear, pero se recibió:", text);
        return [];
    }
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

export const QuickNotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNotes = async (file: File, numNotes: number) => {
    try {
      setLoading(true);
      const responseText = await quickNotesService().generateNotes(file, numNotes);
      const parsed = parseNotesFromText(responseText);
      setNotes(parsed);
    } catch (error) {
      console.error("Error al generar notas:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearNotes = () => {
    setNotes([]);
  };

  const value = { notes, loading, generateNotes, clearNotes };

  return (
    <QuickNotesContext.Provider value={value}>
      {children}
    </QuickNotesContext.Provider>
  );
};

export const useQuickNotesContext = () => {
  const context = useContext(QuickNotesContext);
  if (context === undefined) {
    throw new Error('useQuickNotesContext must be used within a QuickNotesProvider');
  }
  return context;
};
