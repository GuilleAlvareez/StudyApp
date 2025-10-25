"use client";
import { FileUp } from "lucide-react";
import { useFileContext } from "@/context/fileContext";
import { BaselineCloudUpload } from "./icons";

export function UploadFileBox() {
  const {
    isDragging,
    MAX_FILE_SIZE,
    pressInput,
    onDragEnter,
    onDragOver,
    onDragLeave,
    handleDrop,
    handleFileChange,
    inputRef,
  } = useFileContext();

  return (
    <div className="w-full max-w-2xl flex flex-col bg-white px-6 py-7 rounded-lg shadow mb-6">
      <p className="text-slate-800 font-semibold text-xl">Subir archivo</p>

      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".pdf"
        onChange={handleFileChange}
        size={MAX_FILE_SIZE}
      />

      {/* Área de Carga de Archivos - La he descomentado para que veas el resultado completo */}
      <div className="space-y-3 mt-4">
        <div
          onClick={pressInput}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={handleDrop}
          className={`relative bg-slate-50 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-400 hover:bg-slate-100 transition-all duration-300 shadow-inner border-slate-300`}
        >
          <BaselineCloudUpload className="w-20 h-20 stroke-1 text-icons" />

          <p className="text-textGray font-bold text-lg mb-2">
            Arrastra y suelta tu documento aquí
          </p>
          <p className="text-xs text-textGray">
            o haz clic para seleccionarlo
          </p>

          {/* <p className="absolute bottom-4 text-xs p-2 text-slate-500 text-center">
            Soporta archivos PDF de hasta 15MB
          </p> */}
        </div>
      </div>
    </div>
  );
}
