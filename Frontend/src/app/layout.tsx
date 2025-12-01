import type { Metadata } from "next";
import "./globals.css";
import { inter, montserrat } from "./ui/fonts";
import { FileProvider } from "@/context/fileContext";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | StudyApp - IA para Estudiantes",
    default:
      "StudyApp: Resumidor de Textos y Notas con Inteligencia Artificial",
  },
  description:
    "Maximiza tu productividad académica con StudyApp. Nuestra IA resume documentos PDF, genera apuntes automáticos y crea tarjetas de estudio en segundos. ¡Prueba gratis!",
  keywords: [
    "IA para estudiantes",
    "resumidor de textos",
    "tomar apuntes con IA",
    "resumen PDF",
    "herramientas de estudio",
    "inteligencia artificial educación",
    "resumidor online",
  ],
  authors: [{ name: "StudyApp Team" }],
  creator: "StudyApp",
  publisher: "StudyApp",
  openGraph: {
    title: "StudyApp: Tu Asistente de Estudio con Inteligencia Artificial",
    description:
      "Deja de perder tiempo leyendo documentos interminables. StudyApp resume tus PDFs y crea notas de estudio al instante.",
    url: "https://study-app-kohl.vercel.app/",
    siteName: "StudyApp",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StudyApp Interfaz de Usuario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyApp: Resúmenes y Notas con IA",
    description:
      "Potencia tu estudio con inteligencia artificial. Resúmenes precisos y notas rápidas en un clic.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <FileProvider>
            <Analytics />
            {children}
          </FileProvider>
          <CookieConsent />
        </ThemeProvider>
      </body>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""}
      />
    </html>
  );
}
