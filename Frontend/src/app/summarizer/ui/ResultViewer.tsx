'use client';

import { FileSearch2, Download } from "lucide-react";
import { useFileContext } from "@/context/fileContext";
import { useEffect, useMemo, useState } from 'react';

// Importa los componentes y estilos de la nueva librería
import { DocumentLoadEvent, Viewer, Worker } from '@react-pdf-viewer/core';

// Importa los estilos CSS
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export function ResultViewer() {
    const { file, summaryFile } = useFileContext();
    const [numPages, setNumPages] = useState<number | null>(null);

    // Usar el archivo resumido si está disponible, sino el original
    const displayFile = summaryFile || file;

    const fileUrl = useMemo(() => {
        if (displayFile) {
            return URL.createObjectURL(displayFile);
        }
        return null;
    }, [displayFile]);

    useEffect(() => {
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileUrl]);

    function onDocumentLoadSuccess(e: DocumentLoadEvent): void {
        setNumPages(e.doc.numPages);
    }

    const handleDownload = () => {
        if (summaryFile) {
            const url = URL.createObjectURL(summaryFile);
            const a = document.createElement('a');
            a.href = url;
            a.download = summaryFile.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="rounded-xl h-full w-full bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col">
            {/* Header con botón de descarga */}
            {summaryFile && (
                <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-lg font-semibold text-slate-800">Resumen Generado</h3>
                    <button
                        onClick={handleDownload}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        <span>Descargar PDF</span>
                    </button>
                </div>
            )}
            
            {/* Visor de PDF */}
            <div className="flex-1 overflow-y-auto">
                {displayFile && fileUrl ? (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <div style={{ height: '100%', width: '100%' }}>
                            <Viewer
                                fileUrl={fileUrl}
                                onDocumentLoad={onDocumentLoadSuccess}
                                renderLoader={(percentages: number) => (
                                    <div style={{ width: '240px' }}>
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
                                Sube un documento para ver tu resumen generado por IA al instante.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
