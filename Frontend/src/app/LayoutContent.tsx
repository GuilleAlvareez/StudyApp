'use client'
import { SideBar } from "@/components/NavBar/SideBar";
import { useSideBar } from "@/context/SideBarContext";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, closeSideBar } = useSideBar();

  return (
    <div className="flex min-h-screen">
      <SideBar />
      
      {/* Overlay para pantallas pequeñas */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
          onClick={closeSideBar}
        />
      )}

      <main className="flex-1 bg-gray-100 xl:ml-64">
        {children}
      </main>
    </div>
  );
}

