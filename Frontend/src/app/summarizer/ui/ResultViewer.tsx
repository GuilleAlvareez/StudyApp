"use client";

import {
  FileSearch2,
  Download,
  FileText,
  X,
  BookOpenCheck,
} from "lucide-react";
import { useFileContext } from "@/context/fileContext";
import { useEffect, useMemo, useState } from "react";
import { useSummarizer } from "../hooks/useSummarizer";

// Importa los componentes y estilos de la nueva librería
import { DocumentLoadEvent, Viewer, Worker } from "@react-pdf-viewer/core";

// Importa los estilos CSS
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Loader } from "./Loader";

export function ResultViewer() {
  const { file, summaryFile, removeFile } = useFileContext();
  const { summarize, loading } = useSummarizer();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  // Usar el archivo resumido si está disponible, sino el original
  const displayFile = summaryFile || file;

  useEffect(() => {
    if (displayFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          // Convertimos el ArrayBuffer a Uint8Array
          setFileData(new Uint8Array(e.target.result as ArrayBuffer));
        }
      };
      reader.readAsArrayBuffer(displayFile);
    } else {
      setFileData(null);
    }
  }, [displayFile]);

  // const fileUrl = useMemo(() => {
  //     if (displayFile) {
  //         return URL.createObjectURL(displayFile);
  //     }
  //     return null;
  // }, [displayFile]);

  // useEffect(() => {
  //     return () => {
  //         if (fileUrl) {
  //             URL.revokeObjectURL(fileUrl);
  //         }
  //     };
  // }, [fileUrl]);

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
    <div className="flex flex-col items-center text-start space-y-6 h-full w-full lg:py-6 lg:px-10 tracking-wide">
      <div className="flex flex-col w-full mb-15 lg:mb-15">
        {/* <button onClick={toggleSideBar}>
                    <Menu className="w-6 h-6 stroke-1 mr-4"/>
                    </button> */}
        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Crea tu Resumen
        </h2>
        <p className="text-slate-500">
          Transforma tus documentos en resúmenes claros y concisos en segundos.
        </p>
      </div>

      <section className="h-full w-full flex flex-col lg:pr-60 lg:px-50 lg:flex-row">
        {/* Visor de PDF */}
        <div className="rounded-xl h-full w-full lg:h-6/7 lg:w-4/7 lg:mr-10 bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto relative">
            {displayFile && fileData ? (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
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

                {/* Loader superpuesto mientras se resume */}
                {loading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                    <Loader />
                  </div>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>

        {/* Botón de Descarga */}
        <section className="flex flex-col gap-3 py-40 px-4">
          <p className="text-3xl font-semibold">¡Listo para empezar!</p>
          <p className="text-lg text-slate-800">
            Su archivo ha sido cargado. ¿Qué te gustaría hacer ahora?
          </p>

          <div className="bg-white border border-slate-200 rounded-lg mt-5 mb-2 p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-red-700" />

              <div className="flex flex-col">
                <span className="text-sm font-semibold">{file?.name}</span>
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
                  className="w-full flex items-center justify-center text-slate-700 font-semibold py-3 px-6 rounded-lg bg-white hover:bg-slate-50 duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none"
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
              disabled={!file}
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
