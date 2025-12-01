"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none shadow-inner
        ${isDark ? "bg-slate-700" : "bg-slate-100"}
      `}
      aria-label="Toggle theme"
    >
      <motion.div
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center
          ${isDark ? "bg-slate-900 text-white" : "bg-orange-400 text-white"}
        `}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-white" />
        )}
      </motion.div>
    </button>
  );
}
