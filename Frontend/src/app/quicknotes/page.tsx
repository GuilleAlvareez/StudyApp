import { Header } from "./ui/Header";
import { Content } from "./ui/Content";

export default function QuickNotesPage() {
  return (
   <div className="h-screen w-full p-8 bg-[#f8f9fa]">
      {/* Este div es el que orquesta todo. 
          Con h-full y flex-col, sus hijos se repartirán el espacio vertical. */}
      <div className="flex flex-col h-full w-full items-center text-start lg:py-6 lg:px-10 tracking-wide">
        <Header />
        <Content />
      </div>
    </div>
  );
}
