import { UploadCloud, FileText, X } from "lucide-react";
import { useRef, useState } from "react";

export function SummarizerPanel() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

  const pressInput = () => {
    inputRef.current?.click();
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const dt = e.dataTransfer;
    if (dt.files && dt.files.length > 0) {
      const droppedFile = dt.files[0];

      if (droppedFile.type !== "application/pdf") {
        alert("Solo se permiten archivos PDF");
        dt.clearData();
        return;
      }

      if (droppedFile.size > MAX_FILE_SIZE) {
        alert("El archivo supera el límite de 10MB");
        dt.clearData();
        return;
      }

      setFile(droppedFile);
      dt.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("El archivo supera el límite de 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col space-y-6 h-full">
      <h2 className="text-3xl font-bold text-slate-800">Crea tu Resumen</h2>

      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".pdf"
        onChange={handleFileChange}
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
