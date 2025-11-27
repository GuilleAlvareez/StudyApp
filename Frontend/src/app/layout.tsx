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
    template: "%s | StudyApp",
    default: "StudyApp: Herramientas de Estudio con IA para Estudiantes",
  },
  description:
    "Potencia tu aprendizaje con StudyApp. Resume documentos, crea notas automáticas y estudia de forma más eficiente con nuestras herramientas de IA gratuitas.",
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
