// Frontend/src/app/quicknotes/layout.tsx

import type { Metadata } from "next";

// Aquí es donde debe vivir el metadata para esta sección
export const metadata: Metadata = {
  title: 'Creador de Apuntes y Notas Automáticas con IA',
  description: 'Transforma cualquier documento en notas de estudio perfectas para repasar. Nuestra IA extrae las ideas clave y te las presenta en un formato fácil de memorizar.',
};

// Este layout simplemente envolverá tu página
export default function QuickNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}