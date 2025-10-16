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

export function ResultViewer() {
  const { file, summaryFile, removeFile } = useFileContext();
  const { summarize } = useSummarizer();
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
          <div className="flex-1 overflow-y-auto">
            {displayFile && fileData ? (
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
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-gray-100">
                <div className="text-center">
                  <div className="inline-block bg-white p-5 rounded-full shadow-lg mb-6">
                    <FileSearch2 className="w-16 h-16 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    La magia sucede aquí
                  </h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    Sube un documento para ver tu resumen generado por IA al
                    instante.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botón de Descarga */}
        <section className="flex flex-col gap-3 py-55 px-4">
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

          <button
            onClick={() => summarize(file as File)}
            className="w-full flex items-center justify-center text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-indigo-400 hover:bg-indigo-600"
            disabled={!file}
          >
            <BookOpenCheck className="w-6 h-6 stroke-2 mr-2" />
            Resumir Documento
          </button>
        </section>
      </section>
    </div>
  );
}
