import { FileText, X } from "lucide-react";
import { useFileContext } from "@/context/fileContext";
import { BaselineCloudUpload } from "@/app/quicknotes/ui/icons";
import { Header } from "@/components/Header";

export function SummarizerPanel() {
  const {
    file,
    isDragging,
    MAX_FILE_SIZE,
    error,
    pressInput,
    onDragEnter,
    onDragOver,
    onDragLeave,
    handleDrop,
    handleFileChange,
    removeFile,
    inputRef,
  } = useFileContext();

  return (
    <div className="flex flex-1 flex-col items-center text-start space-y-6 w-full lg:pt-6 lg:px-10 tracking-wide lg:overflow-y-hidden">
      <Header
        title="Crea tu Resumen"
        description="Transforma tus documentos en resúmenes claros y concisos en segundos."
      />

      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".pdf"
        onChange={handleFileChange}
        size={MAX_FILE_SIZE}
      />

      {/* 
         SOLUCIÓN AQUÍ:
         1. w-5/6: Ancho al 83%.
         2. h-[50vh] lg:h-[60vh]: Altura fija basada en la ventana (viewport height). 
            Esto recupera el tamaño grande original sin depender del padre.
         3. min-h-[400px]: Evita que se colapse si la pantalla es muy bajita.
      */}
      <div className="w-5/6 h-[50vh] lg:h-[60vh] min-h-[400px] mt-10 lg:mt-10 mb-10">
        <div
          onClick={pressInput}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={handleDrop}
          className={`h-full w-full relative bg-slate-50 dark:bg-slate-900 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 shadow-inner ${
            isDragging
              ? "border-indigo-400 bg-slate-100 dark:bg-slate-800"
              : "border-slate-300 dark:border-slate-700"
          }`}
        >
          <BaselineCloudUpload className="w-20 h-20 stroke-1 text-icons dark:text-slate-400 mb-6" />

          <p className="text-textGray dark:text-slate-300 font-bold text-2xl mb-2">
            Arrastra y suelta tu documento aquí
          </p>
          <p className="text-lg text-textGray dark:text-slate-400">
            o haz clic para seleccionarlo
          </p>

          <p className="absolute bottom-6 text-xs p-2 text-textGray dark:text-slate-500 text-center">
            Soporta archivos PDF de hasta 15MB
          </p>
        </div>
      </div>

      {/* Archivo Cargado */}
      {error !== "" && (
        <p className="w-5/6 border border-red-300 bg-red-100 rounded-lg p-3 text-red-500 text-sm">
          {error}
        </p>
      )}
      {file && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 flex items-center justify-between shadow-sm w-5/6">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {file.name}
            </span>
          </div>
          <button
            onClick={removeFile}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </button>
        </div>
      )}
    </div>
  );
}
