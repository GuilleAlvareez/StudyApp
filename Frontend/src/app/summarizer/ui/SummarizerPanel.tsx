import { UploadCloud, FileText, X, Menu } from "lucide-react";
import { useFile } from "@/app/summarizer/hooks/useFile";
import { useSideBar } from "@/context/SideBarContext";
import { useSummarizer } from "../hooks/useSummarizer";

export function SummarizerPanel() {
  const { file, isDragging, MAX_FILE_SIZE, error, pressInput, onDragEnter, onDragOver, onDragLeave, handleDrop, handleFileChange, removeFile, inputRef } = useFile();
  const { toggleSideBar } = useSideBar();

  const { summarize } = useSummarizer();

  return (
    <div className="flex flex-col space-y-6 h-full">
      <div className="flex">
        <button onClick={toggleSideBar}>
          <Menu className="w-6 h-6 stroke-1 mr-4"/>
        </button>
        <h2 className="text-3xl font-bold text-slate-800">Crea tu Resumen</h2>
      </div>

      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".pdf"
        onChange={handleFileChange}
        size={MAX_FILE_SIZE}
      />

      {/* Área de Carga de Archivos */}
      <div className="space-y-3">
        <div
          onClick={pressInput}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={handleDrop}
          className={`bg-slate-50 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center space-y-4 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-100 transition-all duration-300 shadow-inner ${
            isDragging ? "border-blue-500 bg-slate-100" : "border-slate-300"
          }`}
        >
          <div className="bg-white p-4 rounded-full shadow-md">
            <UploadCloud className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-slate-700 font-medium">
            Arrastra y suelta tu documento aquí
          </p>
          <p className="text-sm text-slate-500">o haz clic para seleccionarlo</p>
        </div>
        <p className="text-xs text-slate-500 text-center">
          Soporta archivos PDF de hasta 15MB
        </p>
      </div>

      {/* Archivo Cargado */}
      {error !== '' && <p className="w-full border border-red-300 bg-red-100 rounded-lg p-3 text-red-500 text-sm">{error}</p>}
      {file && (
        <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-800">
              {file.name}
            </span>
          </div>
          <button
            onClick={removeFile}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      )}

      {/* Botón de Acción Principal */}
      <button
        onClick={() => summarize(file as File)}
        className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
          file
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-slate-300 cursor-not-allowed"
        }`}
        disabled={!file}
      >
        Resumir Documento
      </button>
    </div>
  );
}
