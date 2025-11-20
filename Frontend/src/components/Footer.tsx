import { Sparkles, ChevronRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Columna 1: Sobre StudyApp */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
              <Sparkles size={24} className="text-indigo-400" />
              StudyApp
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              La plataforma de IA que revoluciona la forma en que estudias. Genera resúmenes y notas inteligentes en segundos.
            </p>
          </div>

          {/* Columna 2: Herramientas */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">Herramientas</h4>
            <ul className="space-y-3">
              <li>
                <a href="/summarizer" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Summarizer
                </a>
              </li>
              <li>
                <a href="/quicknotes" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  QuickNotes
                </a>
              </li>
              <li>
                <a href="/exam" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Generador de Exámenes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">Recursos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#demoSection" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Demo Interactiva
                </a>
              </li>
              <li>
                <a href="/#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Guía de Uso
                </a>
              </li>
              <li>
                <a href="/#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Blog
                </a>
              </li>
              <li>
                <a href="/#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="/politica-privacidad" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/aviso-legal" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="/politica-cookies" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="/#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © 2025 StudyApp. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Todos los sistemas operativos
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
