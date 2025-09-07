'use client';
import { UploadCloud, FileText, X, FileSearch2, ZoomIn, ZoomOut, Download } from "lucide-react";
import { SummarizerPanel } from "./ui/SummarizerPanel";
// --- WIDGETS ---

// Widget: Panel de Acciones (Columna Izquierda)


// Widget: Visor de Resultados (Columna Derecha)
function ResultViewer() {
  // Por ahora, solo mostramos el estado inicial.
  // Los otros estados (Loading, Result) se pueden crear como componentes separados aquí.
  return (
    <div className="rounded-xl h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200">
      <div className="text-center">
        <div className="inline-block bg-white p-5 rounded-full shadow-lg mb-6">
          <FileSearch2 className="w-16 h-16 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">La magia sucede aquí</h3>
        <p className="text-slate-500 max-w-sm mx-auto">Sube un documento para ver tu resumen generado por IA al instante.</p>
      </div>
    </div>
  );
}


// --- PAGE ---

export default function SummarizerPage() {
  return (
    // Usamos un fondo ligeramente tintado para toda la página
    <div className="h-screen w-full p-8 bg-slate-50">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <SummarizerPanel />
        </div>

        <div className="lg:col-span-2">
          <ResultViewer />
        </div>
      </div>
    </div>
  );
}