import './Loader.css';

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center">
      {/* Spinner minimalista */}
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-4 border-slate-300 rounded-full" />
        <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin-slow" />
      </div>

      {/* Texto */}
      <p className="text-slate-700 font-medium text-base">
        Procesando documento
      </p>

      <p className="text-slate-500 text-sm mt-1">
        Generando resumen
      </p>
    </div>
  );
}
