'use client';
import { SummarizerPanel } from "./ui/SummarizerPanel";
import { ResultViewer } from "./ui/ResultViewer";
import { useFileContext } from "@/context/fileContext";
import { useEffect } from "react";

export default function SummarizerPage() {
  const { file, clearFile } = useFileContext();

  useEffect(() => {
    return () => {
      clearFile();
    };
  }, []);

  return (
    // Usamos min-h-screen para el fondo.
    // flex-col y flex-1 aseguran que los hijos ocupen el espacio.
    <div className="min-h-screen w-full flex flex-col p-8 pt-24 bg-[#f8f9fa]">
      <div className="flex-1 flex flex-col gap-8 w-full  mx-auto">
        {file ? (
          <div className="flex-1 flex flex-col">
            <ResultViewer />
          </div>
        ) : (
          // Quitamos h-full aquí para dejar que el componente decida su altura
          <div className="w-full flex-1 flex flex-col">
            <SummarizerPanel />
          </div>
        )}
      </div>
    </div>
  );
}