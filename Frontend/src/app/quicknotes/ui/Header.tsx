import { useSideBar } from "@/context/SideBarContext";
import { Menu } from "lucide-react";

export function Header() {
  const { isOpen, toggleSideBar } = useSideBar();

  return (
    <div className="flex flex-col w-full mb-15 lg:mb-15">
      <div className="flex  ">
        {!isOpen && (
          <button onClick={toggleSideBar} className="xl:hidden">
            <Menu className="w-6 h-6 stroke-1 mr-4" />
          </button>
        )}
        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Notas rapidas
        </h2>
      </div>
      <p className="text-slate-500">
        Sube tu archivo y genera notas rapidas en base al contenido.
      </p>
    </div>
  );
}
