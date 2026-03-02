# 🎓 StudyApp - Tu Asistente de Estudio con IA

> Maximiza tu productividad académica con StudyApp. Nuestra plataforma utiliza Inteligencia Artificial para resumir documentos PDF extensos y generar notas de estudio rápidas en segundos. ¡Estudia de forma más inteligente, no más dura!

**🌐 ¡Pruébalo ahora gratis! [Visitar StudyApp](https://study-app-kohl.vercel.app/)**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-FF6B6B?style=for-the-badge)](https://openrouter.ai/)

## 🚀 Cómo usar StudyApp

StudyApp es una aplicación web 100% en la nube. **No necesitas descargar, instalar ni configurar nada en tu ordenador.**

1. Entra a [**StudyApp**](https://study-app-kohl.vercel.app/).
2. Sube tu documento PDF (apuntes, artículos, libros, etc.).
3. Elige tu herramienta:
   - **Resumidor:** Para obtener un texto claro y conciso de todo el documento.
   - **Notas Rápidas:** Para extraer los conceptos clave en formato de tarjetas de estudio.
4. ¡Descarga tus resultados y comienza a estudiar al instante!

## ✨ Características Principales

- **📄 Resumidor de PDFs Inteligente**: Sube cualquier documento PDF y obtén un resumen generado por IA. El resultado se puede visualizar en la app y descargar como un nuevo PDF.
- **💡 Notas Rápidas (QuickNotes)**: Transforma tus textos en tarjetas de estudio (estilo Post-it). Elige cuántas notas necesitas (del 1 al 16) y descárgalas todas juntas en un archivo `.zip` con imágenes de alta calidad.
- **🌓 Modo Oscuro/Claro**: Interfaz adaptable a tus preferencias visuales con transiciones fluidas.
- **📱 Diseño Responsivo**: Experiencia de usuario optimizada tanto para estudiar desde el ordenador como desde tu teléfono móvil.
- **⭐ Sistema de Reseñas**: Comparte tu experiencia y ayúdanos a mejorar dejando tu valoración directamente en la plataforma.
- **🛡️ Alta Disponibilidad**: Sistema de respaldo automático para los modelos de Inteligencia Artificial que garantiza que siempre puedas generar tus apuntes.

## 🛠️ Stack Tecnológico (Para Desarrolladores)

Este proyecto ha sido construido utilizando las siguientes tecnologías modernas:

**Frontend:**
- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (Animaciones)

**Backend & Servicios:**
- Next.js API Routes
- [Supabase](https://supabase.com/) (Base de datos PostgreSQL)
- [OpenRouter API](https://openrouter.ai/) (Proveedor de modelos LLM)

**Procesamiento de Archivos:**
- `@opendocsg/pdf2md` (Extracción de texto)
- `jspdf` & `@react-pdf-viewer` (Generación y visualización de PDFs)
- `html2canvas` & `jszip` (Exportación de imágenes)

## 📂 Estructura del Código

Si estás interesado en explorar cómo está construida la aplicación, esta es la estructura principal:

```text
Frontend/src/
├── app/
│   ├── api/            # Endpoints del backend (OpenRouter, Supabase)
│   ├── quicknotes/     # Módulo de Notas Rápidas (UI, Context, Services)
│   ├── summarizer/     # Módulo de Resúmenes (UI, Hooks, Services)
│   ├── reviews/        # Página de reseñas de usuarios
│   └── ...             # Páginas legales y layout principal
├── components/         # Componentes UI reutilizables (Navbar, Footer, Loader, etc.)
├── context/            # Estados globales (FileContext, SideBarContext)
└── utils/              # Utilidades y configuración (Supabase client/server)
