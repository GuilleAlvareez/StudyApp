// Frontend/src/app/quicknotes/page.tsx

"use client";
import { Header } from "../../components/Header";
import { Content } from "./ui/Content";
import { useFileContext } from "@/context/fileContext";
import { useEffect } from "react";
import { QuickNotesProvider } from "./context/QuickNotesContex";
// Ya no importamos Metadata aquí

// --- CAMBIO: HEMOS ELIMINADO EL OBJETO "metadata" DE ESTE ARCHIVO ---

export default function QuickNotesPage() {
  const { clearFile } = useFileContext();

  useEffect(() => {
    return () => {
      clearFile();
    };
  }, []);

  return (
    <QuickNotesProvider>
      <div className="h-screen w-full p-8 bg-[#f8f9fa] overflow-x-hidden">
        <div className="flex flex-col h-full w-full items-center text-start lg:py-6 lg:px-10 tracking-wide">
          <Header title="Genera Notas Rápidas de tus Documentos" description="Sube tu archivo y genera notas rapidas en base al contenido." />
          <Content />
        </div>
      </div>
    </QuickNotesProvider>
  );
}