import { UploadCloud, FileText, X, Menu, FileUp } from "lucide-react";
// import { useFile } from "@/app/summarizer/hooks/useFile";
import { useFileContext } from "@/context/fileContext";
import { useSideBar } from "@/context/SideBarContext";
import { useSummarizer } from "../hooks/useSummarizer";
import { BaselineCloudUpload } from "@/app/quicknotes/ui/icons";

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
  // const { toggleSideBar } = useSideBar();

  // const { summarize } = useSummarizer();

  return (
    <div className="flex flex-col items-center text-start space-y-6 h-full w-full lg:py-6 lg:px-10 tracking-wide">
      <div className="flex flex-col w-full mb-15 lg:mb-35">
        {/* <button onClick={toggleSideBar}>
          <Menu className="w-6 h-6 stroke-1 mr-4"/>
        </button> */}
        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Crea tu Resumen
        </h2>
        <p className="text-slate-500">
          Transforma tus documentos en résumenes claros y concisos en segundos.
        </p>
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
      <div className="space-y-3 w-5/6 h-3/5">
        <div
          onClick={pressInput}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={handleDrop}
          className={`h-full relative bg-slate-50 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-400 hover:bg-slate-100 transition-all duration-300 shadow-inner ${
            isDragging ? "border-indigo-400 bg-slate-100" : "border-slate-300"
          }`}
        >
          {/* <div className="flex items-center justify-center bg-white w-30 h-30 p-4 rounded-full shadow-md mb-6">
            <UploadCloud className="w-full h-full text-blue-600" />
          </div> */}

          <BaselineCloudUpload className="w-20 h-20 stroke-1 text-icons" />

          <p className="text-textGray font-bold text-2xl mb-2">
            Arrastra y suelta tu documento aquí
          </p>
          <p className="text-lg text-textGray">
            o haz clic para seleccionarlo
          </p>

          <p className="absolute bottom-10 lg:bottom-1/6 text-xs p-2 text-textGray text-center">
            Soporta archivos PDF de hasta 15MB
          </p>
        </div>
      </div>

      {/* Archivo Cargado */}
      {error !== "" && (
        <p className="w-full border border-red-300 bg-red-100 rounded-lg p-3 text-red-500 text-sm">
          {error}
        </p>
      )}
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
    </div>
  );
}
