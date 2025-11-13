import { FileUp, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { SettingsBox } from "./SettingsBox";
import { UploadFileBox } from "./UploadFileBox";
import { PostIt } from "./postit";
import { useQuickNotesContext } from "../context/QuickNotesContex";
import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import html2canvas from "html2canvas";
import NotesLoader from "./NotesLoader";
import { Loader } from "@/components/Loader";

// Hook personalizado para detectar el tamaño de la ventana
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function Content() {
  const { notes, loading } = useQuickNotesContext();
  const [currentPage, setCurrentPage] = useState(1);
  const { width } = useWindowSize();

  const isXLScreen = width >= 1280;
  const notesPerPage = isXLScreen ? 4 : 2;

  const postitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const colors = ["#fef08a", "#bfdbfe", "#bbf7d0", "#fbcfe8", "#e9d5ff"];

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = notes.slice(startIndex, startIndex + notesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [isXLScreen]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDownloadZip = async () => {
    if (notes.length === 0 || isDownloading) {
      return;
    }

    setIsDownloading(true);
    const zip = new JSZip();

    for (const [index, note] of notes.entries()) {
      const element = postitRefs.current[index];

      if (element) {
        try {
          const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
          });
          const imageBlob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );

          if (imageBlob) {
            const safeHeader = note.header
              .replace(/[^a-zA-Z0-9]/g, "_")
              .substring(0, 30);
            const fileName = `nota_${index + 1}_${safeHeader}.png`;
            zip.file(fileName, imageBlob);
          }
        } catch (error) {
          console.error("Error al convertir el Post-it a imagen:", error);
        }
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notas_en_imagenes.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsDownloading(false);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-w-full gap-10 tracking-wide">
      <div className="flex flex-col max-w-2xl flex-shrink-0">
        <UploadFileBox />
        <SettingsBox />
      </div>

      <div className="min-h-auto flex-1 bg-white px-6 py-7 shadow rounded-lg flex flex-col">
        <div className="flex justify-between">
          <p className="text-slate-800 font-semibold text-xl mb-6">
            Notas generadas
          </p>
          {notes.length > 0 && (
            <button
              onClick={handleDownloadZip}
              className="flex cursor-pointer justify-center items-center h-full hover:underline"
            >
              <Download className="w-6 h-6 mr-2" />
            </button>
          )}
        </div>

        {!loading ? (
          notes.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <FileUp className="w-20 h-20 stroke-1 text-icons" />
              <p className="text-xl text-[#808290]">
                Tus notas aparecerán aquí
              </p>
              <p className="text-xl text-[#808290]">
                Sube tu documento y pulsa en &quot;Generar notas&quot; para
                empezar
              </p>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 flex-1">
                {currentNotes.map((note, index) => (
                  <PostIt
                    ref={(el) => {
                      postitRefs.current[startIndex + index] = el;
                    }}
                    key={startIndex + index}
                    header={note.header}
                    content={note.content}
                    color={colors[(startIndex + index) % colors.length]}
                    inclination={`note-tilt-${(index % 4) + 1}`}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-gray-200">
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-2 rounded-lg border ${
                            currentPage === page
                              ? "bg-indigo-500 text-white border-indigo-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )
        ) : (
          <Loader text="Generando notas" />
        )}
      </div>
    </div>
  );
}
