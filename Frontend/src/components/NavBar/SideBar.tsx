'use client'
import { NavLinks } from "./NavLinks";
import { LogOut, Notebook, X } from "lucide-react"; // Importa un ícono para logout
import { useSideBar } from "@/context/SideBarContext";
import { poppins, lato } from "@/app/ui/fonts";

export function SideBar() {
  const { isOpen, closeSideBar } = useSideBar();

  return (
    <nav className={`fixed top-0 left-0 h-screen w-[85%] sm:w-64 flex flex-col py-2 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 ${lato.className} ${isOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0`}>

      <div className="flex flex-col flex-1">

        <div className="flex items-center justify-between p-4">
          <h1 className={`flex items-center text-xl font-bold ${poppins.className}`}><Notebook className="w-6 h-6 stroke-2 mr-2 text-indigo-600"/>StudyApp</h1>
          <button onClick={closeSideBar} className="p-1 rounded-md hover:bg-gray-200 xl:hidden">
            <X className="w-6 h-6 stroke-2" />
          </button>
        </div>

        <div className="flex-1 py-4">
          <section>
            <p className="mb-4 px-4 text-[15px] font-semibold uppercase text-gray-500 tracking-wider">
              Funcionalidades
            </p>
            <NavLinks />
          </section>
        </div>

        {/* Divider */}
        {/* <div className="w-5/6 mx-auto border-t border-gray-200"/>

        <div className="w-5/6 mx-auto py-4">
          <section>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                N
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Nombre Usuario</p>
                <p className="text-xs text-gray-500">usuario@email.com</p>
              </div>
              <button className="p-2 rounded-md hover:bg-gray-200">
                <LogOut className="w-5 h-5 stroke-2 text-gray-600"/>
              </button>
            </div>
          </section>
        </div> */}
      </div>
    </nav>
  );
}