'use client';
import Image from "next/image";
import { Menu } from "lucide-react";
import { useSideBar } from "@/context/SideBarContext";

export default function Home() {
  const { toggleSideBar } = useSideBar();

  return (
    <div className="flex-1 h-screen w-full">
      <button onClick={toggleSideBar}>
        <Menu className="w-6 h-6 stroke-1"/>
      </button>
      <h1>Home</h1>
    </div>
  );
}
