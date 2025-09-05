'use client'
import { useSideBar } from "@/context/SideBarContext";
import { SideBar } from "./NavBar/SideBar";
import { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  const { isOpen } = useSideBar();

  return (
    <div className="relative min-h-screen">
      <SideBar />

      <main className={`transition-all duration-300 ease-in-out ${isOpen ? 'ml-60' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  )
}