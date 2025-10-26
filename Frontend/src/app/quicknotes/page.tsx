"use client";
import { Header } from "./ui/Header";
import { Content } from "./ui/Content";
import { useFileContext } from "@/context/fileContext";
import { useEffect } from "react";

export default function QuickNotesPage() {
  //  const { clearFile } = useFileContext();

  // // Ahora esto funcionará porque el componente se ejecuta en el cliente
  // useEffect(() => {
  //   // La función que retornamos es la "función de limpieza"
  //   return () => {
  //     // Esta parte se ejecutará CUANDO el usuario navegue FUERA de esta página
  //     clearFile();
  //   };
  // }, [clearFile]);

  return (
   <div className="h-screen w-full p-8 bg-[#f8f9fa]">
      {/* Este div es el que orquesta todo. 
          Con h-full y flex-col, sus hijos se repartirán el espacio vertical. */}
      <div className="flex flex-col h-full w-full items-center text-start lg:py-6 lg:px-10 tracking-wide">
        <Header />
        <Content />
      </div>
    </div>
  );
}
