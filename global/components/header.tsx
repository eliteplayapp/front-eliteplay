"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";

const translations: any = {
  "pt-br": { forArenas: "Para Arenas", howItWorks: "Como Funciona", app: "O App", becomePartner: "Seja um Parceiro" },
  "es": { forArenas: "Para Arenas", howItWorks: "Cómo Funciona", app: "La App", becomePartner: "Hazte Socio" },
  "en": { forArenas: "For Arenas", howItWorks: "How It Works", app: "The App", becomePartner: "Become a Partner" },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "pt-br";
  const t = translations[lang] || translations["pt-br"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="relative h-8 w-32">
          <Image src="/img/logo-compact-dark.png" alt="Logo" fill className="object-contain" />
        </Link>

        <nav className="hidden md:flex gap-8 text-white text-sm font-medium">
          <Link href="/arenas" className="hover:text-[#94CE00]">{t.forArenas}</Link>
          <Link href="/#how-it-works" className="hover:text-[#94CE00]">{t.howItWorks}</Link>
          <Link href="/#app" className="hover:text-[#94CE00]">{t.app}</Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-4 text-xs font-bold text-zinc-500">
            <a href="?lang=pt-br" className={lang === "pt-br" ? "text-[#94CE00]" : "hover:text-white"}>PT</a>
            <a href="?lang=es" className={lang === "es" ? "text-[#94CE00]" : "hover:text-white"}>ES</a>
            <a href="?lang=en" className={lang === "en" ? "text-[#94CE00]" : "hover:text-white"}>EN</a>
          </div>
          <Link href="/arenas" className="bg-[#94CE00] text-black px-5 py-2 rounded-lg font-bold text-sm">
            {t.becomePartner}
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black fixed inset-0 top-[65px] p-8 flex flex-col gap-8 text-white text-xl font-medium">
          <Link href="/arenas" onClick={() => setIsMobileMenuOpen(false)}>{t.forArenas}</Link>
          <Link href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>{t.howItWorks}</Link>
          <Link href="/#app" onClick={() => setIsMobileMenuOpen(false)}>{t.app}</Link>
          <div className="flex gap-6 pt-4 border-t border-white/10 text-sm">
            <a href="?lang=pt-br" className={lang === "pt-br" ? "text-[#94CE00]" : ""}>PT</a>
            <a href="?lang=es" className={lang === "es" ? "text-[#94CE00]" : ""}>ES</a>
            <a href="?lang=en" className={lang === "en" ? "text-[#94CE00]" : ""}>EN</a>
          </div>
        </div>
      )}
    </header>
  );
}
