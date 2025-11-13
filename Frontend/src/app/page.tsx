'use client';
import Image from "next/image";
import { Menu } from "lucide-react";
import { useSideBar } from "@/context/SideBarContext";

export default function Home() {
  const { isOpen, toggleSideBar } = useSideBar();

  return (
    <div className="flex-1 h-screen w-full">
      {!isOpen && (
        <button
          onClick={toggleSideBar}
          className="xl:hidden m-4 p-2 rounded-md hover:bg-gray-200 bg-white border border-gray-300 shadow-sm"
        >
          <Menu className="w-6 h-6 stroke-2"/>
        </button>
      )}
      <h1>Home</h1>
    </div>
  );
}
