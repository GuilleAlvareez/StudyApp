import { FileUp } from "lucide-react";
import { SettingsBox } from "./SettingsBox";
import { UploadFileBox } from "./UploadFileBox";

export function Content() {
  return (
    <div className="flex-1 flex w-full gap-10 tracking-wide">
      <div className="flex flex-col">
        <UploadFileBox />
        <SettingsBox />
      </div>

      <div className="flex-1 bg-white px-6 py-7 shadow rounded-lg">
        <p className="text-slate-800 font-semibold text-xl">Notas generadas</p>

        <div className="flex flex-col items-center justify-center h-full">
          <FileUp className="w-20 h-20 stroke-1 text-icons" />
          <p className="text-xl text-[#808290]">Tus notas apareceran aqui</p>
          <p className="text-xl text-[#808290]">
            Sube tu documento y pulsa en &quot;Generar notas&quot; para empezar
          </p>
        </div>
      </div>
    </div>
  );
}
