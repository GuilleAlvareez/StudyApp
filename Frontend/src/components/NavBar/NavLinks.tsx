"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, BookText, Grid2X2Check, House, StickyNote } from "lucide-react";

export function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: House },
    { href: "/summarizer", label: "Summarizer", icon: BookOpenCheck },
    // { href: "/quicknotes", label: "QuickNotes", icon: StickyNote },
    // { href: "/exam", label: "Exam", icon: Grid2X2Check },
  ];

  return (
    <article>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`w-5/6 flex mb-3 mx-auto px-4 py-2 rounded-xl
            ${pathname === link.href ? "text-indigo-600 bg-indigo-100 rounded-lg hover:text-indigo-600 hover:bg-indigo-100" : "hover:bg-gray-100"}`}
          >
            <LinkIcon className="w-6 h-6 stroke-2 mr-2" />

            <span className="font-semibold">{link.label}</span>
          </Link>
        );
      })}
    </article>
  );
}
