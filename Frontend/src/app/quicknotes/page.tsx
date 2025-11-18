"use client";
import { Header } from "../../components/Header";
import { Content } from "./ui/Content";
import { useFileContext } from "@/context/fileContext";
import { useEffect } from "react";
import { QuickNotesProvider } from "./context/QuickNotesContex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Creador de Apuntes y Notas Automáticas con IA',
  description: 'Transforma cualquier documento en notas de estudio perfectas para repasar. Nuestra IA extrae las ideas clave y te las presenta en un formato fácil de memorizar.',
};

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
          <Header title="Notas rapidas" description="Sube tu archivo y genera notas rapidas en base al contenido." />
          <Content />
        </div>
      </div>
    </QuickNotesProvider>
  );
}
