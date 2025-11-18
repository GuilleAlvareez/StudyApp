// Frontend/src/app/summarizer/page.tsx

'use client';
import { SummarizerPanel } from "./ui/SummarizerPanel";
import { ResultViewer } from "./ui/ResultViewer";
import { useFileContext } from "@/context/fileContext";
import { useEffect } from "react";
// Ya no importamos Metadata aquí

// --- CAMBIO: HEMOS ELIMINADO EL OBJETO "metadata" DE ESTE ARCHIVO ---

export default function SummarizerPage() {
  const { file, clearFile } = useFileContext();

  useEffect(() => {
    return () => {
      clearFile();
    };
  }, []);

  return (
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