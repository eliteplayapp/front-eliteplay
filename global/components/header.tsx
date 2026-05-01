"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

const translations: any = {
  "pt-br": { forArenas: "Para Arenas", howItWorks: "Como Funciona", app: "O App", becomePartner: "Seja um Parceiro" },
  "es": { forArenas: "Para Arenas", howItWorks: "Cómo Funciona", app: "La App", becomePartner: "Hazte Socio" },
  "en": { forArenas: "For Arenas", howItWorks: "How It Works", app: "The App", becomePartner: "Become a Partner" },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "pt-br";
  const t = translations[lang] || translations["pt-br"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLangChange = (code: string) => {
    window.location.search = `?lang=${code}`;
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="relative h-8 w-32 flex items-center">
          <Image src="/img/logo-compact-dark.png" alt="Logo" fill className="object-contain object-left" priority />
        </Link>

        <nav className="hidden md:flex gap-8 text-white text-sm font-medium">
          <Link href="/arenas" className="hover:text-[#94CE00]">{t.forArenas}</Link>
          <Link href="/#how-it-works" className="hover:text-[#94CE00]">{t.howItWorks}</Link>
          <Link href="/#app" className="hover:text-[#94CE00]">{t.app}</Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-colors"
              aria-label="Select language"
            >
              <Globe size={16} className="text-zinc-400" />
              <span className="uppercase">{lang.split("-")[0]}</span>
              <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-zinc-900 border border-white/10 rounded-xl p-1 flex flex-col min-w-[120px] shadow-2xl">
                <button onClick={() => handleLangChange("pt-br")} className="px-3 py-2 text-xs text-white hover:bg-white/10 rounded-lg text-left">Português</button>
                <button onClick={() => handleLangChange("es")} className="px-3 py-2 text-xs text-white hover:bg-white/10 rounded-lg text-left">Español</button>
                <button onClick={() => handleLangChange("en")} className="px-3 py-2 text-xs text-white hover:bg-white/10 rounded-lg text-left">English</button>
              </div>
            )}
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
