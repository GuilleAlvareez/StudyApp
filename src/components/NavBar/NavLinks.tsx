'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookText, House } from "lucide-react";

export function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: House },
    { href: "/summarizer", label: "Summarizer", icon: BookText },
  ];

  return (
    <>
    {
      links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link key={link.href} href={link.href} className={`w-full flex mb-3 hover:bg-gray-200`}>
            <LinkIcon className='w-6 h-6 stroke-1'/>
            
            <span>{link.label}</span>
          </Link>
        )
      })
        
    }
    </>
  )
}