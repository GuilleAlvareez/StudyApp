// Frontend/src/app/summarizer/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Resumidor de Textos y PDF con IA Gratis',
  description: 'Ahorra horas de estudio. Sube tu documento PDF o pega un texto y nuestra IA creará un resumen preciso en segundos. ¡Prueba el resumidor inteligente gratis!',
};

export default function SummarizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}