"use client";

import {
  FileSearch2,
  Download,
  FileText,
  X,
  BookOpenCheck,
} from "lucide-react";
import { useFileContext } from "@/context/fileContext";
import { useEffect, useState } from "react";
import { useSummarizer } from "../hooks/useSummarizer";
import { DocumentLoadEvent, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Loader } from "../../../components/Loader";
import { Header } from "@/components/Header";

export function ResultViewer() {
  const { file, summaryFile, removeFile } = useFileContext();
  const { summarize, loading } = useSummarizer();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [fileData, setFileData] = useState<Uint8Array | null>(null);

  const displayFile = summaryFile || file;

  useEffect(() => {
    if (displayFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFileData(new Uint8Array(e.target.result as ArrayBuffer));
        }
      };
      reader.readAsArrayBuffer(displayFile);
    } else {
      setFileData(null);
    }
  }, [displayFile]);

  function onDocumentLoadSuccess(e: DocumentLoadEvent): void {
    setNumPages(e.doc.numPages);
  }

  const handleDownload = () => {
    if (summaryFile) {
      const url = URL.createObjectURL(summaryFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = summaryFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

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
    // Quitamos lg:overflow-y-hidden del contenedor principal para evitar cortes si la pantalla es muy pequeña en altura
    <div className="flex flex-1 flex-col items-center text-start space-y-6 w-full lg:py-6 lg:px-10 tracking-wide lg:overflow-y-hidden dark:text-slate-200">
      <Header
        title="Crea tu Resumen"
        description="Transforma tus documentos en resúmenes claros y concisos en segundos."
      />

      <section className="flex-1 w-full flex flex-col lg:pr-60 lg:px-50 lg:flex-row items-start">
        {/* Visor de PDF */}
        <div className="rounded-xl h-[500px] lg:h-[70vh] w-full lg:w-5/6 lg:mr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto relative">
            {displayFile && fileData ? (
              <>
                <Worker workerUrl="/pdf.worker.min.js">
                  <div style={{ height: "100%", width: "100%" }}>
                    <Viewer
                      fileUrl={fileData}
                      onDocumentLoad={onDocumentLoadSuccess}
                      renderLoader={(percentages: number) => (
                        <div style={{ width: "240px" }}>
                          <p>Cargando... {Math.round(percentages)}%</p>
                        </div>
                      )}
                    />
                  </div>
                </Worker>

                {loading && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                    <Loader text="Generando resumen" />
                  </div>
                )}
              </>
            ) : (
              <Loader text="Generando resumen" />
            )}
          </div>
        </div>

        {/* Botón de Descarga y Panel Derecho */}
        {/* Ajustamos el padding vertical para que se alinee mejor */}
        <section className="flex flex-col gap-3 py-10 lg:py-40 px-4 w-full lg:w-3/7">
          <p className="text-3xl font-semibold">¡Listo para empezar!</p>
          <p className="text-lg text-slate-800 dark:text-slate-300">
            Su archivo ha sido cargado. ¿Qué te gustaría hacer ahora?
          </p>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg mt-5 mb-2 p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-red-700 dark:text-red-500" />

              <div className="flex flex-col">
                <span className="text-sm font-semibold">{file?.name}</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {formatFileSize(file)}
                </span>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          {summaryFile ? (
            <>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  disabled={!summaryFile}
                >
                  <Download className="w-5 h-5 stroke-2 mr-2" />
                  Descargar resumen
                </button>

                <button
                  onClick={removeFile}
                  className="w-full flex items-center justify-center text-slate-700 dark:text-slate-200 font-semibold py-3 px-6 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!file}
                >
                  <FileSearch2 className="w-5 h-5 stroke-2 mr-2" />
                  Resumir otro archivo
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => summarize(file as File)}
              className="w-full flex items-center justify-center text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-indigo-400 hover:bg-indigo-600"
              disabled={loading}
            >
              <BookOpenCheck className="w-6 h-6 stroke-2 mr-2" />
              Resumir Documento
            </button>
          )}
        </section>
      </section>
    </div>
  );
}
