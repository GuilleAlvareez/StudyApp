import { NavLinks } from "./NavLinks";

export function SideBar() {
  return (
    <nav className="w-1/9 py-4 px-6 gap-4 flex flex-col bg-amber-50">
      <h1 className="">SideBar</h1>

     <section className="">
      <h1 className="mb-2">Funcionalidades</h1>

      <NavLinks />
     </section>

     
     <section className="">
      <h1>Usuario</h1>

     </section>
    </nav>
  );
}