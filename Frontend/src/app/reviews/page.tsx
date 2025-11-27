"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, MessageSquare, User, CheckCircle } from "lucide-react";

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, content, rating }),
    });

    const result = await response.json();

    if (!result.success) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setContent("");
      setRating(0);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl mb-6 shadow-sm">
            <MessageSquare className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
            Tu opinión nos importa
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            Ayúdanos a mejorar StudyApp compartiendo tu experiencia. ¿Qué te
            gusta? ¿Qué podemos hacer mejor?
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-slate-950/60 overflow-hidden border border-slate-100 dark:border-slate-800"
        >
          {isSubmitted ? (
            <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                ¡Gracias por tu reseña!
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Valoramos mucho tus comentarios para seguir mejorando.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              {/* Rating Section */}
              <div className="mb-10 text-center">
                <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Califica tu experiencia
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="relative p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        size={40}
                        className={`transition-colors duration-200 ${
                          star <= (hoveredRating || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200 dark:text-slate-700 fill-slate-50 dark:fill-slate-800"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                <div className="h-6 mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {rating === 1 && "Necesita mejorar"}
                  {rating === 2 && "Podría ser mejor"}
                  {rating === 3 && "Está bien"}
                  {rating === 4 && "Muy buena"}
                  {rating === 5 && "¡Excelente!"}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Nombre (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Tu comentario
                  </label>
                  <div className="relative">
                    <textarea
                      id="content"
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="block w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                      placeholder="Cuéntanos qué te parece la aplicación..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-semibold text-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 ${
                    rating === 0 || isSubmitting
                      ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:translate-y-[-2px] hover:shadow-indigo-500/40"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Reseña</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-400 dark:text-slate-500 text-sm mt-8"
        >
          Tus comentarios son anónimos a menos que decidas compartir tu nombre.
        </motion.p>
      </div>
    </div>
  );
}
