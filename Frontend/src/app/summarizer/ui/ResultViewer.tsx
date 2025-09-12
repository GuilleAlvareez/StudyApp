import { FileSearch2 } from "lucide-react";
// import { useFile } from "@/app/summarizer/hooks/useFile";
import { useEffect, useState } from "react";
import { useFileContext } from "@/context/fileContext";
import { Document, Page, pdfjs } from 'react-pdf';
import { pdfjs as pdfjsWorker } from 'pdfjs-dist/build/pdf.worker.entry';

// Configuración importante para que el worker funcione
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// Estilos para que el PDF se vea bien
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export function ResultViewer() {
  const { file } = useFileContext();
  const [urlFileMemory, setUrlFileMemory] = useState<string>('');
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // useEffect(() => {
  //   // if (file) setUrlFileMemory(URL.createObjectURL(file));
  // }, [file]);
  
  return (
    <div className="rounded-xl h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200">
      {file && urlFileMemory !== '' ? (
        // <embed src={urlFileMemory} type="application/pdf" width="100%" height="100%" />
        <Document 
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Cargando PDF..."
          error="Error al cargar PDF"
        >
          {/* Hacemos un bucle para mostrar todas las páginas */}
          {Array.from(new Array(numPages || 0), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              // Hacemos que la página se ajuste al ancho del contenedor
              width={800} // Puedes ajustar este valor
              renderTextLayer={false} // Opcional: mejora el rendimiento si no necesitas seleccionar texto
              className="mb-4 shadow-lg" // Añadimos una sombra para que las páginas resalten
            />
          ))}
        </Document>
      ) : (
        <div className="text-center">
          <div className="inline-block bg-white p-5 rounded-full shadow-lg mb-6">
            <FileSearch2 className="w-16 h-16 text-blue-500" />
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">La magia sucede aquí</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Sube un documento para ver tu resumen generado por IA al instante.</p>
        </div>
      )}
      
    </div>
  );
}