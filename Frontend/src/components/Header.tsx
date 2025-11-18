import { useSideBar } from "@/context/SideBarContext";
import { Menu } from "lucide-react";

export function Header({ title, description }: { title: string; description: string }) {
  const { isOpen, toggleSideBar } = useSideBar();

  return (
    <div className="flex flex-col w-full mb-15 lg:mb-15">
      <div className="flex  ">
        {!isOpen && (
          <button onClick={toggleSideBar} className="xl:hidden">
            <Menu className="w-6 h-6 stroke-1 mr-4" />
          </button>
        )}
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          {title}
        </h1>
      </div>
      <p className="text-slate-500">
        {description}
      </p>
    </div>
  );
}
