"use client";
import { FileText, FileUp, X } from "lucide-react";
import { useFileContext } from "@/context/fileContext";
import { BaselineCloudUpload } from "./icons";

export function UploadFileBox() {
  const {
    file,
    isDragging,
    MAX_FILE_SIZE,
    pressInput,
    onDragEnter,
    onDragOver,
    onDragLeave,
    handleDrop,
    handleFileChange,
    removeFile,
    inputRef,
  } = useFileContext();

  function formatFileSize(file?: File | Blob | null): string {
    if (!file) return "0 B";

    const bytes = file.size;
    const sizes = ["B", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 B";

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);

    return `${size.toFixed(2)} ${sizes[i]}`;
  }

  return (
    <div className="w-96 flex flex-col bg-white px-6 py-7 rounded-lg shadow mb-6">
      <p className="text-slate-800 font-semibold text-xl">Subir archivo</p>

      {!file ? (
        <>
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
        </>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg mt-5 mb-2 p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <FileText className="w-5 h-5 text-red-700 flex-shrink-0" />

            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold truncate">{file?.name}</span>
              <span className="text-sm font-medium text-slate-800">
                {formatFileSize(file)}
              </span>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      )}
      {/* Input oculto para la selección de archivos */}
    </div>
  );
}
