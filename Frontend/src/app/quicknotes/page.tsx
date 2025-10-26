"use client";
import { Header } from "./ui/Header";
import { Content } from "./ui/Content";
import { useFileContext } from "@/context/fileContext";
import { useEffect } from "react";

export default function QuickNotesPage() {
  const { clearFile } = useFileContext();

  useEffect(() => {
    return () => {
      clearFile();
    };
  }, []);

  return (
    <div className="h-screen w-full p-8 bg-[#f8f9fa]">
      <div className="flex flex-col h-full w-full items-center text-start lg:py-6 lg:px-10 tracking-wide">
        <Header />
        <Content />
      </div>
    </div>
  );
}
