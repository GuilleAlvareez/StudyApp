import type { Metadata } from "next";
import "./globals.css";
import { inter, montserrat } from "./ui/fonts";
import { SideBarProvider } from "@/context/SideBarContext";
import { SideBar } from "@/components/NavBar/SideBar";
import { FileProvider } from "@/context/fileContext";
import { LayoutContent } from "./LayoutContent";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: {
    template: '%s | StudyApp',
    default: 'StudyApp: Herramientas de Estudio con IA para Estudiantes',
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
              <Analytics />
              {children}
            </FileProvider>
          </LayoutContent>
        </SideBarProvider>
        <CookieConsent />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />
    </html>
  );
}