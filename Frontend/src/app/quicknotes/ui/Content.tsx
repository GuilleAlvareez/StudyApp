import { FileUp } from "lucide-react";
import { SettingsBox } from "./SettingsBox";
import { UploadFileBox } from "./UploadFileBox";
import { PostIt } from "./postit";
import { useQuickNotes } from "../hooks/useQuickNotes";

export function Content() {
  const { notes } = useQuickNotes();
  const colors = [
    "#fef08a",
    "#bfdbfe",
    "#bbf7d0",
    "#fbcfe8",
    "#e9d5ff",
  ]

  return (
    <div className="flex-1 flex w-full gap-10 tracking-wide">
      <div className="flex flex-col max-w-2xl flex-shrink-0">
        <UploadFileBox />
        <SettingsBox />
      </div>

      <div className="flex-1 bg-white px-6 py-7 shadow rounded-lg">
        <p className="text-slate-800 font-semibold text-xl mb-6">Notas generadas</p>

        {/* Contenido cuadno no hay notas */}
        
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
          <FileUp className="w-20 h-20 stroke-1 text-icons" />
          <p className="text-xl text-[#808290]">Tus notas apareceran aqui</p>
          <p className="text-xl text-[#808290]">
            Sube tu documento y pulsa en &quot;Generar notas&quot; para empezar
          </p>
        </div>
        ) : (
          notes.map((note, index) => (
            <PostIt key={index} header={note.header} content={note.content} />
          ))
        )}
      </div>
    </div>
  );
}
