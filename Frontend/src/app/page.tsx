'use client';
import { Menu, FileText, Cpu, StickyNote, UploadCloud, WandSparkles, BookOpenCheck, Lightbulb } from "lucide-react";
import { useSideBar } from "@/context/SideBarContext";
import { poppins, lato } from "./ui/fonts";

// --- SUB-COMPONENTE: Sección Héroe ---
const HeroSection = () => {
  return (
    <section className="flex items-center justify-center min-h-screen px-4 py-20 text-center lg:text-left bg-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Columna de Texto */}
        <div className="flex flex-col items-center lg:items-start">
          <h1 className={`${poppins.className} text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight`}>
            Estudia de forma más inteligente, no más dura.
          </h1>
          <p className={`${lato.className} mt-6 text-lg md:text-xl text-slate-600 max-w-xl`}>
            Ahorra horas de lectura y acelera tu aprendizaje. Genera resúmenes y notas de estudio con un solo clic.
          </p>
          <button className="mt-10 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
            Genera tu primer resumen
          </button>
        </div>
        
        {/* Columna Visual (Animación) */}
        <div className="relative h-96 w-full flex items-center justify-center">
          {/* Placeholder para la animación. Un desarrollador usaría Framer Motion aquí. */}
          <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center p-4">
             <div className="flex flex-col items-center text-slate-400">
                <FileText size={48} className="mb-4 opacity-50"/>
                <Cpu size={64} className="mb-4 text-indigo-400"/>
                <div className="flex gap-4">
                    <StickyNote size={32} className="opacity-50"/>
                    <p className="font-lato">Resumen...</p>
                </div>
                <p className="mt-4 text-sm font-semibold tracking-wider">[ Aquí iría la animación &quot;La Transformación Mágica&quot; ]</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: Cómo Funciona ---
const HowItWorksSection = () => {
  const steps = [
    {
      icon: <UploadCloud size={40} className="text-indigo-500" />,
      title: "Sube tu Documento",
      description: "Arrastra y suelta cualquier archivo PDF. Apuntes de clase, libros, artículos... lo que necesites."
    },
    {
      icon: <div className="relative"><Lightbulb size={30} className="text-indigo-500" /><BookOpenCheck size={30} className="text-indigo-500 absolute top-1 left-1 opacity-70" /></div>,
      title: "Elige tu Herramienta",
      description: "Decide si necesitas un resumen detallado para entender a fondo o notas rápidas para un repaso ágil."
    },
    {
      icon: <WandSparkles size={40} className="text-indigo-500" />,
      title: "Transforma y Descarga",
      description: "Observa cómo la IA hace su trabajo y descarga tus nuevos materiales de estudio listos para usar."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-slate-800`}>
          Empieza en segundos
        </h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 rounded-full mb-6">
                {step.icon}
              </div>
              <h3 className={`${poppins.className} text-xl font-semibold text-slate-800 mb-3`}>{step.title}</h3>
              <p className={`${lato.className} text-slate-600`}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: Superpoderes de Estudio ---
const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-slate-800`}>
            Tus Superpoderes de Estudio
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Tarjeta Summarizer */}
          <div className="bg-slate-50 p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <BookOpenCheck size={32} className="text-indigo-500"/>
              <h3 className={`${poppins.className} text-2xl font-semibold text-slate-800`}>La esencia, sin el ruido.</h3>
            </div>
            <p className={`${lato.className} text-slate-600 mb-6`}>
              Perfecto para esos documentos largos y complejos. Nuestro Summarizer extrae las ideas principales, los datos clave y los argumentos centrales, presentándolos en un formato limpio y digerible. Entiende a fondo cualquier tema en una fracción del tiempo.
            </p>
            <div className="h-48 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 text-sm font-semibold">
              [ Visual &quot;Antes y Después&quot; del Resumen ]
            </div>
          </div>
          {/* Tarjeta QuickNotes */}
          <div className="bg-slate-50 p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <Lightbulb size={32} className="text-indigo-500"/>
              <h3 className={`${poppins.className} text-2xl font-semibold text-slate-800`}>Ideas clave, listas para memorizar.</h3>
            </div>
            <p className={`${lato.className} text-slate-600 mb-6`}>
              ¿Examen a la vista? QuickNotes descompone el contenido en conceptos clave y los presenta en formato de notas adhesivas visuales. Ideal para repasos rápidos, memorización y para tener tus apuntes siempre a mano de la forma más ágil.
            </p>
            <div className="h-48 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 text-sm font-semibold">
              [ Visual &quot;Antes y Después&quot; de las Notas ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: Demo Visual ---
const DemoSection = () => {
    return (
        <section className="py-20 bg-slate-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-white mb-12`}>
                    La magia en acción
                </h2>
                <div className="max-w-4xl mx-auto h-96 bg-slate-900/50 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-center">
                    <p className="text-slate-400 font-semibold">[ Aquí iría la simulación animada e interactiva ]</p>
                </div>
            </div>
        </section>
    );
};

// --- SUB-COMPONENTE: CTA Final ---
const FinalCTASection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center max-w-3xl">
                <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-slate-800`}>
                    Empieza a transformar tus documentos ahora.
                </h2>
                <p className={`${lato.className} mt-6 text-lg md:text-xl text-slate-600`}>
                    Tu primer resumen está a solo un clic de distancia. Sin registros, sin complicaciones.
                </p>
                <button className="mt-10 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
                    Genera tu primer resumen
                </button>
                <div className="mt-12 border-t border-slate-200 pt-8">
                    <p className={`${lato.className} text-slate-500 italic`}>
                        &quot;StudyApp me ha ahorrado incontables horas. ¡Es una herramienta esencial para cualquier estudiante!&quot;
                    </p>
                    <p className={`${poppins.className} mt-2 font-semibold text-slate-700`}>
                        - Alex, Estudiante de Ingeniería
                    </p>
                </div>
            </div>
        </section>
    );
};


// --- COMPONENTE PRINCIPAL: Home ---
export default function Home() {
  const { isOpen, toggleSideBar } = useSideBar();

  return (
    <div className="flex-1 w-full bg-white">
      {/* Botón de menú para móvil, se superpone al contenido */}
      {!isOpen && (
        <button
          onClick={toggleSideBar}
          className="fixed top-4 left-4 z-50 xl:hidden m-4 p-2 rounded-md hover:bg-gray-200 bg-white border border-gray-300 shadow-sm"
        >
          <Menu className="w-6 h-6 stroke-2"/>
        </button>
      )}
      
      {/* Contenedor principal de la página */}
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DemoSection />
        <FinalCTASection />
      </main>
    </div>
  );
}