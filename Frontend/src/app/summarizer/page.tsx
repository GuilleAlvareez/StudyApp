'use client';
import { SummarizerPanel } from "./ui/SummarizerPanel";
import { ResultViewer } from "./ui/ResultViewer";

export default function SummarizerPage() {
  return (
    // Usamos un fondo ligeramente tintado para toda la página
    <div className="h-screen w-full p-8 bg-slate-50">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <SummarizerPanel />
        </div>

        <div className="lg:col-span-2 overflow-hidden">
          <ResultViewer />
        </div>
      </div>
    </div>
  );
}