'use client';
import { SummarizerPanel } from "./ui/SummarizerPanel";
import { ResultViewer } from "./ui/ResultViewer";
import { useFileContext } from "@/context/fileContext";
import { useEffect } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Resumidor de Textos y PDF con IA Gratis',
  description: 'Ahorra horas de estudio. Sube tu documento PDF o pega un texto y nuestra IA creará un resumen preciso en segundos. ¡Prueba el resumidor inteligente gratis!',
};

export default function SummarizerPage() {
  const { file, clearFile } = useFileContext();

  useEffect(() => {
    return () => {
      clearFile();
    };
  }, []);

  return (
    // Usamos un fondo ligeramente tintado para toda la página
    <div className="h-screen w-full p-8 bg-[#f8f9fa]">
      <div className="h-full gap-8">
        {file ? (
          <div className="overflow-hidden h-full">
            <ResultViewer />
          </div>
        ) : (
          <div className="h-full">
            <SummarizerPanel />
          </div>
        )}
      </div>
    </div>
  );
}