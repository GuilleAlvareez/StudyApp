'use client'
import React, { createContext, useState, useContext } from "react";

// Definir el tipo del contexto
interface SideBarContextType {
  isOpen: boolean;
  closeSideBar: () => void;
  openSideBar: () => void;
  toggleSideBar: () => void;
}

export const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true); // Cambiar a false

  const closeSideBar = () => {
    setIsOpen(false);
  };

  const openSideBar = () => {
    setIsOpen(true);
  };

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const value = {
    isOpen,
    closeSideBar,
    openSideBar,
    toggleSideBar,
  };

  return (
    <SideBarContext.Provider value={value}>
      {children}
    </SideBarContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useSideBar() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error('useSideBar must be used within a SideBarProvider');
  }
  return context;
}

