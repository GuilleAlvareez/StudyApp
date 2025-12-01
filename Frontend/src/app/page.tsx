"use client";
import { Footer } from "@/components/Footer";
import {
  FileText,
  Cpu,
  UploadCloud,
  WandSparkles,
  BookOpenCheck,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Download,
  ChevronRight,
  Check,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// Fonts simulados
const poppins = { className: "font-sans" };
const lato = { className: "font-sans" };

// --- Hook Personalizado para Animaciones en Scroll ---
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

// --- SUB-COMPONENTE: Partículas Flotantes ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-indigo-300 opacity-20"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            bottom: "-10px",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-400px) translateX(20px);
          }
          50% {
            transform: translateY(-800px) translateX(-20px);
          }
          75% {
            transform: translateY(-1200px) translateX(15px);
          }
          100% {
            transform: translateY(-1600px) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

// --- SUB-COMPONENTE: Sección Héroe Mejorada ---
const HeroSection = () => {
  const [animationState, setAnimationState] = useState("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sequence = ["idle", "processing", "summarized", "notes"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setAnimationState(sequence[currentIndex]);
      setProgress(0);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animationState === "processing") {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 100));
      }, 50);
      return () => clearInterval(progressInterval);
    }
  }, [animationState]);

  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 py-20 text-center lg:text-left bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "StudyApp",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Herramienta de IA para estudiantes que resume documentos y genera notas de estudio automáticamente.",
            featureList:
              "Resumidor de PDF, Generador de Notas, Tarjetas de Estudio",
          }),
        }}
      />
      <FloatingParticles />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Columna de Texto */}
        <div className="flex flex-col items-center lg:items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-600 dark:text-indigo-300 text-sm font-semibold animate-pulse">
            <Sparkles size={16} />
            <span>Potenciado por IA</span>
          </div>

          <h1
            className={`${poppins.className} text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 leading-tight`}
          >
            Estudia de forma más{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              inteligente con IA
            </span>
            , no más dura.
          </h1>

          <p
            className={`${lato.className} text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed`}
          >
            Ahorra horas de lectura y acelera tu aprendizaje. Nuestra IA genera
            resúmenes de textos y notas de estudio precisas con un solo clic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="/summarizer"
              title="Ir al Resumidor de Textos con IA"
              className="group px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Genera tu primer resumen
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#demoSection"
              title="Ver Demo Interactiva de StudyApp"
              className="px-8 py-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              Ver demo
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-slate-200 dark:border-slate-700 w-full justify-center lg:justify-start">
            <div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                10K+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Documentos procesados
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                1min
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Tiempo promedio
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                98%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Satisfacción
              </div>
            </div>
          </div>
        </div>

        {/* Columna Visual (Animación Mejorada) */}
        <div className="relative h-[500px] w-full flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Círculo de fondo animado */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 rounded-full opacity-20 animate-pulse" />
            </div>

            {/* Documento Original */}
            <div
              className={`absolute top-16 left-8 transition-all duration-700 ${
                animationState === "idle"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-8"
              }`}
            >
              <div className="w-48 h-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={20} className="text-slate-400" />
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                    Documento.pdf
                  </div>
                </div>
                <div className="space-y-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 bg-slate-200 dark:bg-slate-700 rounded"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Procesamiento */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                animationState === "processing"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
            >
              <div className="relative">
                <Cpu
                  size={80}
                  className="text-indigo-500 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* <Sparkles size={40} className="text-purple-500 animate-pulse" /> */}
                </div>
              </div>
              <div className="mt-6 w-64">
                <div className="text-sm text-slate-600 dark:text-slate-300 font-semibold mb-2">
                  Procesando con IA...
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Resumen Generado */}
            <div
              className={`absolute top-12 right-8 transition-all duration-700 ${
                animationState === "summarized"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="w-56 bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-5 border-2 border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpenCheck size={20} className="text-indigo-500" />
                  <div className="text-xs text-slate-700 dark:text-slate-200 font-bold">
                    Resumen
                  </div>
                  <Download
                    size={16}
                    className="ml-auto text-slate-400 cursor-pointer hover:text-indigo-500"
                  />
                </div>
                <div className="space-y-3 text-left">
                  <div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      💡 Idea Principal
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      La innovación tecnológica transforma...
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      📊 Datos Clave
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      • Incremento del 45%
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      • 3 factores principales
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notas Rápidas */}
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                animationState === "notes" ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative w-full h-full">
                <div className="absolute top-20 left-12 w-40 h-40 bg-yellow-200 rounded-lg shadow-lg p-3 transform -rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    🔑 Concepto A
                  </div>
                  <div className="text-xs text-slate-600">
                    Definición fundamental del tema principal
                  </div>
                </div>
                <div className="absolute top-32 right-16 w-40 h-40 bg-blue-200 rounded-lg shadow-lg p-3 transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    📌 Idea B
                  </div>
                  <div className="text-xs text-slate-600">
                    Punto importante a recordar
                  </div>
                </div>
                <div className="absolute bottom-24 left-20 w-40 h-40 bg-green-200 rounded-lg shadow-lg p-3 transform rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    ✨ Conclusión
                  </div>
                  <div className="text-xs text-slate-600">
                    Resumen final del documento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: Cómo Funciona Mejorado ---
const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const steps = [
    {
      icon: <UploadCloud size={40} className="text-indigo-500" />,
      title: "Sube tu Documento",
      description:
        "Arrastra y suelta cualquier archivo PDF. Apuntes de clase, libros, artículos... lo que necesites.",
    },
    {
      icon: <WandSparkles size={40} className="text-purple-500" />,
      title: "Elige tu Herramienta",
      description:
        "Decide si necesitas un resumen detallado para entender a fondo o notas rápidas para un repaso ágil.",
    },
    {
      icon: <Download size={40} className="text-green-500" />,
      title: "Transforma y Descarga",
      description:
        "Observa cómo la IA hace su trabajo y descarga tus nuevos materiales de estudio listos para usar.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

      <div
        ref={ref}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-semibold mb-4">
            Proceso simple
          </div>
          <h2
            className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4`}
          >
            Empieza a estudiar mejor en segundos
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-16">
            Solo tres pasos te separan de tus materiales de estudio optimizados
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Línea conectora (solo en desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 z-0" />
              )}

              <article
                className={`relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Número del paso */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-white/20 backdrop-blur-3xl border-indigo-200 dark:border-indigo-800 border text-slate-800 dark:text-slate-200 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>

                <div className="flex items-center justify-center h-20 w-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3
                  className={`${poppins.className} text-xl font-bold text-slate-800 dark:text-slate-100 mb-3`}
                >
                  {step.title}
                </h3>
                <p
                  className={`${lato.className} text-slate-600 dark:text-slate-400 leading-relaxed`}
                >
                  {step.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: Características Mejoradas ---
const FeaturesSection = () => {
  const { ref: ref1, isVisible: isVisible1 } = useScrollAnimation();
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation();

  const features = [
    { icon: <Check size={16} />, text: "Algoritmos de IA avanzados" },
    { icon: <Check size={16} />, text: "Procesamiento en segundos" },
    { icon: <Check size={16} />, text: "Exportación en múltiples formatos" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4`}
          >
            Herramientas de Estudio con IA
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Herramientas potentes diseñadas para maximizar tu eficiencia de
            aprendizaje
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Tarjeta Summarizer */}
          <article
            ref={ref1}
            className={`group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 ${
              isVisible1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
                <BookOpenCheck size={32} className="text-white" />
              </div>
              <h3
                className={`${poppins.className} text-2xl font-bold text-slate-800 dark:text-slate-100`}
              >
                Resumidor
              </h3>
            </div>

            <p
              className={`${lato.className} text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed`}
            >
              Perfecto para documentos largos y complejos.
            </p>

            <ul className="space-y-3 mb-6">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
                >
                  <span className="text-green-500">{feature.icon}</span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="relative h-52 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-6 overflow-hidden group-hover:border-indigo-300 dark:group-hover:border-indigo-600 transition-colors">
              <div className="absolute top-4 left-4 w-8 h-1 bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="absolute top-8 left-4 right-4">
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 bg-slate-200 dark:bg-slate-600 rounded animate-pulse"
                      style={{
                        width: `${90 - i * 10}%`,
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 right-4 px-4 py-2 bg-indigo-500 text-white text-xs rounded-lg font-semibold shadow-lg">
                Resumen listo ✓
              </div>
            </div>
          </article>

          {/* Tarjeta QuickNotes */}
          <article
            ref={ref2}
            className={`group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-slate-100 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 ${
              isVisible2
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <Lightbulb size={32} className="text-white" />
              </div>
              <h3
                className={`${poppins.className} text-2xl font-bold text-slate-800 dark:text-slate-100`}
              >
                Notas Rapidas
              </h3>
            </div>

            <p
              className={`${lato.className} text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed`}
            >
              Ideas clave, listas para memorizar. Perfecto para repasos rápidos.
            </p>

            <ul className="space-y-3 mb-6">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
                >
                  <span className="text-green-500">{feature.icon}</span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="relative h-52 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4 overflow-hidden group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-colors">
              <div className="absolute top-3 left-3 w-24 h-24 bg-[#fef08a] rounded-lg shadow-md p-2 text-xs font-semibold text-slate-700 transform -rotate-6">
                💡 Idea 1
              </div>
              <div className="absolute top-8 right-6 w-24 h-24 bg-[#bfdbfe] rounded-lg shadow-md p-2 text-xs font-semibold text-slate-700 transform rotate-3">
                📌 Concepto 2
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#bbf7d0]  rounded-lg shadow-md p-2 text-xs font-semibold text-slate-700 transform rotate-6">
                ✨ Nota 3
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: Demo Interactiva Mejorada ---
const DemoSection = () => {
  const [step, setStep] = useState("idle");
  const [showResult, setShowResult] = useState(false);

  const handleButtonClick = (nextStep: string) => {
    setShowResult(false);
    setStep(nextStep);
    setTimeout(() => setShowResult(true), 800);
  };

  return (
    <section
      id="demoSection"
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-12">
          <h2
            className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4`}
          >
            La magia en acción
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Prueba nuestra demo interactiva y ve el poder de la IA en tiempo
            real
          </p>
        </div>

        <div className="max-w-4xl mx-auto min-h-[450px] bg-slate-900/80 backdrop-blur-sm rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col items-center justify-center p-8 transition-all duration-500">
          {step === "idle" && (
            <div className="text-center space-y-6">
              <button
                onClick={() => setStep("uploaded")}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-slate-800 p-8 rounded-2xl border-2 border-slate-600 group-hover:border-indigo-400 transition-colors">
                  <UploadCloud
                    size={64}
                    className="text-slate-400 group-hover:text-white transition-colors mx-auto mb-4"
                  />
                  <p className="text-slate-300 font-semibold group-hover:text-white transition-colors text-lg">
                    Haz clic para simular la carga de un archivo
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    o arrastra y suelta aquí
                  </p>
                </div>
              </button>
            </div>
          )}

          {step === "uploaded" && (
            <div className="text-center space-y-6 animate-in">
              <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4">
                <Check size={48} className="text-green-400" />
              </div>
              <p className="text-white font-bold text-xl mb-8">
                ✓ Archivo cargado exitosamente
              </p>
              <p className="text-slate-300 mb-6">
                ¿Qué quieres hacer con este documento?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleButtonClick("summarizing")}
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
                >
                  <BookOpenCheck size={20} />
                  Generar Resumen
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={() => handleButtonClick("quicknoting")}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
                >
                  <Lightbulb size={20} />
                  Crear Notas Rápidas
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          )}

          {(step === "summarizing" || step === "quicknoting") && (
            <div className="w-full max-w-2xl">
              <div
                className={`transition-all duration-700 ${
                  showResult
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {step === "summarizing" && (
                  <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-indigo-500/50">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500 rounded-lg">
                          <BookOpenCheck size={24} className="text-white" />
                        </div>
                        <h4 className="text-white font-bold text-xl">
                          Resumen Generado
                        </h4>
                      </div>
                      <Download
                        size={20}
                        className="text-slate-400 hover:text-white cursor-pointer transition-colors"
                      />
                    </div>
                    <div className="space-y-4 text-left">
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <p className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                          <span className="text-xl">💡</span> Idea Principal
                        </p>
                        <p className="text-slate-200 text-sm leading-relaxed">
                          El documento explora los fundamentos de la
                          inteligencia artificial moderna, destacando el impacto
                          del aprendizaje profundo en diversas industrias.
                        </p>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <p className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                          <span className="text-xl">📊</span> Datos Clave
                        </p>
                        <ul className="text-slate-200 text-sm space-y-1">
                          <li>
                            • Incremento del 45% en adopción de IA (2020-2024)
                          </li>
                          <li>
                            • 3 factores principales: computación, datos y
                            algoritmos
                          </li>
                          <li>
                            • Inversión global de $500B proyectada para 2025
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <p className="font-bold text-green-300 mb-2 flex items-center gap-2">
                          <span className="text-xl">✨</span> Conclusiones
                        </p>
                        <p className="text-slate-200 text-sm leading-relaxed">
                          La IA transformará significativamente el futuro del
                          trabajo, requiriendo adaptación continua y nuevas
                          habilidades.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {step === "quicknoting" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Lightbulb size={24} className="text-white" />
                        </div>
                        <h4 className="text-white font-bold text-xl">
                          Notas Rápidas Generadas
                        </h4>
                      </div>
                      <Download
                        size={20}
                        className="text-slate-400 hover:text-white cursor-pointer transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-yellow-200 text-slate-800 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="font-bold mb-2 flex items-center gap-2">
                          <span className="text-lg">🔑</span> Concepto Clave
                        </div>
                        <p className="text-sm">
                          <strong>Aprendizaje Profundo:</strong> Redes
                          neuronales con múltiples capas que aprenden
                          representaciones jerárquicas de datos.
                        </p>
                      </div>
                      <div className="bg-blue-200 text-slate-800 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="font-bold mb-2 flex items-center gap-2">
                          <span className="text-lg">📌</span> Definición
                          Importante
                        </div>
                        <p className="text-sm">
                          <strong>Machine Learning:</strong> Sistemas que
                          mejoran automáticamente con la experiencia sin ser
                          programados explícitamente.
                        </p>
                      </div>
                      <div className="bg-green-200 text-slate-800 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="font-bold mb-2 flex items-center gap-2">
                          <span className="text-lg">💭</span> Punto Clave
                        </div>
                        <p className="text-sm">
                          Los datos son el combustible de la IA moderna. Más
                          datos = mejores modelos.
                        </p>
                      </div>
                      <div className="bg-purple-200 text-slate-800 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="font-bold mb-2 flex items-center gap-2">
                          <span className="text-lg">⚡</span> Ejemplo
                        </div>
                        <p className="text-sm">
                          GPT-4 utiliza 1.76 billones de parámetros para generar
                          texto coherente y contextual.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setStep("idle");
                  setShowResult(false);
                }}
                className="mt-8 text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 mx-auto group"
              >
                <ArrowRight
                  size={16}
                  className="rotate-180 group-hover:-translate-x-1 transition-transform"
                />
                Probar de nuevo
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-slate-400 text-sm">
          Esta es solo una demostración. Los resultados reales pueden variar
          según el contenido del documento.
        </p>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: Testimonios ---
const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      text: "StudyApp me ha ahorrado incontables horas. Es una herramienta esencial para cualquier estudiante que quiera optimizar su tiempo.",
      author: "Alex Martínez",
      role: "Estudiante de Ingeniería",
      avatar: "AM",
      color: "bg-indigo-500",
    },
    {
      text: "La calidad de los resúmenes es impresionante. Captura exactamente lo que necesito saber sin perder información importante.",
      author: "Sofia Chen",
      role: "Estudiante de Medicina",
      avatar: "SC",
      color: "bg-purple-500",
    },
    {
      text: "Las notas rápidas son perfectas para mis repasos antes de exámenes. Súper visual y fácil de memorizar.",
      author: "Carlos López",
      role: "Estudiante de Derecho",
      avatar: "CL",
      color: "bg-pink-500",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-semibold mb-4">
            Testimonios
          </div>
          <h2
            className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4`}
          >
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Miles de estudiantes ya confían en StudyApp para mejorar su
            aprendizaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-100">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p
                className={`${lato.className} text-slate-700 dark:text-slate-300 italic leading-relaxed`}
              >
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: CTA Final Mejorado ---
const FinalCTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

      <div
        ref={ref}
        className="container mx-auto px-4 text-center max-w-4xl relative z-10"
      >
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-semibold mb-4">
            Comienza ahora
          </div>
          <h2
            className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6`}
          >
            Transforma tu forma de estudiar hoy
          </h2>
          <p
            className={`${lato.className} text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed`}
          >
            Únete a miles de estudiantes que ya están aprendiendo de forma más
            inteligente. Tu primer resumen está a solo un clic de distancia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/summarizer"
              className="group px-10 py-5 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center gap-2"
            >
              Comenzar gratis
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Check size={20} className="text-green-500" />
              <span>100% gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={20} className="text-green-500" />
              <span>Sin registro necesario</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={20} className="text-green-500" />
              <span>Ilimitado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL: Home Mejorado ---
export default function Home() {
  return (
    <div className="w-full bg-white dark:bg-slate-950">
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DemoSection />
        <TestimonialsSection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  );
}
