'use client';

import { FileSearch2 } from "lucide-react";
import { useFileContext } from "@/context/fileContext";
import { useEffect, useMemo, useState } from 'react'; // Agregamos useState

// Importa los componentes y estilos de la nueva librería
import { DocumentLoadEvent, Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Importa los estilos CSS
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export function ResultViewer() {
    const { file } = useFileContext();
    const [numPages, setNumPages] = useState<number | null>(null);

    // Crea la instancia del plugin de la interfaz
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Envuelve la creación de la URL en useMemo
    const fileUrl = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return null;
    }, [file]);

    // Limpia la URL cuando el componente se desmonte o el archivo cambie
    useEffect(() => {
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileUrl]);

    function onDocumentLoadSuccess(e: DocumentLoadEvent): void {
        setNumPages(e.doc.numPages); // Extraemos el número de páginas del evento
    }

    return (
        <div className="rounded-xl h-full w-full bg-white border border-slate-200 shadow-md overflow-y-auto">
            {file && fileUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <div style={{ height: '100%', width: '100%' }}>
                        <Viewer
                            fileUrl={fileUrl} // Usa la URL memoizada
                            onDocumentLoad={onDocumentLoadSuccess} // Para saber cuántas páginas hay
                            renderLoader={(percentages: number) => (
                                <div style={{ width: '240px' }}>
                                    <p>Cargando... {Math.round(percentages)}%</p>
                                </div>
                            )}
                        />
                    </div>
                </Worker>
            ) : (
                // Estado inicial cuando no hay archivo
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
    );
}
