"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ChevronRight, Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/summarizer", label: "Resumidor" },
    { href: "/quicknotes", label: "Notas Rápidas" },
    { href: "/reviews", label: "Reseñas" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm py-3 dark:bg-slate-950/80 dark:border-slate-800/60"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* --- LOGO --- */}
            <Link
              href="/"
              className="flex items-center gap-2 group relative z-50"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors dark:text-slate-100 dark:group-hover:text-indigo-400">
                StudyApp
              </span>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/50 dark:bg-slate-700 dark:border-slate-600/50"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          isActive
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* --- CTA BUTTONS (Desktop) --- */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* --- MOBILE MENU BUTTON --- */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden dark:bg-slate-950"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-2xl font-bold py-4 border-b border-slate-100 dark:border-slate-800 ${
                      pathname === link.href
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-8"
              >
                <div className="flex justify-center pt-4">
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
