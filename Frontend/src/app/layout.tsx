import type { Metadata } from "next";
import "./globals.css";
import { inter, montserrat } from "./ui/fonts";
import { SideBarProvider } from "@/context/SideBarContext";
import { SideBar } from "@/components/NavBar/SideBar";
import { FileProvider } from "@/context/fileContext";
import { LayoutContent } from "./LayoutContent";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: {
    template: '%s | StudyApp',
    default: 'StudyApp: Herramientas de Estudio con IA para Estudiantes', // Título por defecto para la página principal
  },
  description: "Potencia tu aprendizaje con StudyApp. Resume documentos, crea notas automáticas y estudia de forma más eficiente con nuestras herramientas de IA gratuitas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SideBarProvider>
          <LayoutContent>
            <FileProvider>
              {/* Analytics de Vercel que ya tenías */}
              <Analytics />
              {children}
            </FileProvider>
          </LayoutContent>
        </SideBarProvider>
      </body>
      {/* 2. Añadir el componente GoogleAnalytics aquí, fuera del body */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />
    </html>
  );
}