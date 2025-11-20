"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl md:bottom-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-black/80 md:p-8">
            {/* Decorative gradient blob */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-accentSideBar)] opacity-10 blur-3xl" />
            
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  🍪 Valoramos tu privacidad
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. 
                  Al hacer clic en &quot;Aceptar&quot;, consientes el uso de todas las cookies.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={handleDecline}
                  className="rounded-xl px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAccept}
                  className="rounded-xl bg-[var(--color-accentSideBar)] px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-blue-500/40 active:scale-95"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
