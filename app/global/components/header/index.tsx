"use client";

import { useEffect, useState } from 'react';
import { 
  Link, 
  usePathname, 
  useSearchParams,
  motion, 
  AnimatePresence, 
  Globe, 
  Menu, 
  X, 
  ChevronDown,
  Image
} from '../../lib/libraries';
import { getTranslation } from "../../lib/i18n";
import type { StrapiHeader } from "../../types/strapi.global.model";

interface HeaderProps {
  logoUrl?: string | null;
  logoAlt?: string;
  headerData?: StrapiHeader;
}

export default function Header({
  logoUrl,
  logoAlt = "ElitePlay",
  headerData
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const language = (searchParams.get("lang") || "pt-br") as string;

  const menuItems = headerData?.menu_header || [];
  const ctaButton = headerData?.button_cta_header;

  const setLanguage = (newLang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);
    // Força o recarregamento para atualização de dados conforme AGENTS.md
    window.location.href = `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${isMobileMenuOpen
        ? 'bg-black'
        : isScrolled
          ? 'bg-black/90 backdrop-blur-[10px] shadow-lg transition-all duration-500'
          : 'bg-transparent backdrop-blur-[8px] bg-white/[0.02] transition-all duration-500'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        borderBottom: isScrolled || isMobileMenuOpen ? '1px solid rgba(148, 206, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <Image 
              src={logoUrl!} 
              alt={logoAlt} 
              width={180} 
              height={40} 
              className="h-8 md:h-9 w-auto object-contain" 
              priority
              unoptimized
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const label = getTranslation(item.text_button, language);
              return (
                <Link
                  key={item.id}
                  href={item.link!}
                  className={`text-sm transition-all duration-300 ${pathname === item.link ? 'text-[#94CE00]' : 'text-white hover:text-[#94CE00]'}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* CTA and Language Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 200)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-colors"
                aria-label="Select language"
              >
                <Globe size={14} className="text-zinc-400" />
                <span>{language === 'pt-br' ? 'PT' : language === 'es' ? 'ES' : 'EN'}</span>
                <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full mt-2 right-0 bg-zinc-900/90 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl transition-all duration-200 min-w-[140px] flex flex-col p-1 z-50 ${isLangMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <button
                  onClick={() => { setLanguage('pt-br'); setIsLangMenuOpen(false); }}
                  className={`px-3 py-2 text-sm text-left rounded-md transition-colors ${language === 'pt-br' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                >
                  Português
                </button>
                <button
                  onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }}
                  className={`px-3 py-2 text-sm text-left rounded-md transition-colors ${language === 'es' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                >
                  Español
                </button>
                <button
                  onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }}
                  className={`px-3 py-2 text-sm text-left rounded-md transition-colors ${language === 'en' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                >
                  English
                </button>
              </div>
            </div>

            {ctaButton && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={ctaButton.link || "/arenas"}
                  className="bg-[#94CE00] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#7ab300] hover:shadow-[0_0_20px_rgba(148,206,0,0.5)] transition-all duration-300"
                >
                  {getTranslation(ctaButton.text_button, language)}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button and CTA */}
          <div className="md:hidden flex items-center gap-4 z-50">
            {ctaButton && (
              <Link
                href={ctaButton.link || "/arenas"}
                className="bg-[#94CE00] text-black px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider"
              >
                {getTranslation(ctaButton.text_button, language)}
              </Link>
            )}
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black z-40 pt-20"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8 p-8">
              {menuItems.map((item) => {
                const label = getTranslation(item.text_button, language);

                return (
                  <Link
                    key={item.id}
                    href={item.link!}
                    onClick={closeMobileMenu}
                    className={`text-xl transition-colors ${pathname === item.link ? 'text-[#94CE00]' : 'text-white'}`}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Language Selector - Mobile */}
              <div className="relative w-full flex justify-center">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-lg font-medium text-white hover:bg-white/10 transition-colors"
                  aria-label="Select language"
                >
                  <Globe size={18} className="text-zinc-400" />
                  <span>{language === 'pt-br' ? 'Português' : language === 'es' ? 'Español' : 'English'}</span>
                  <ChevronDown size={18} className={`text-zinc-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl min-w-[200px] flex flex-col p-2 z-50"
                    >
                      <button
                        onClick={() => { setLanguage('pt-br'); setIsLangMenuOpen(false); }}
                        className={`px-4 py-3 text-base text-center rounded-md transition-colors ${language === 'pt-br' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                      >
                        Português
                      </button>
                      <button
                        onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }}
                        className={`px-4 py-3 text-base text-center rounded-md transition-colors ${language === 'es' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                      >
                        Español
                      </button>
                      <button
                        onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }}
                        className={`px-4 py-3 text-base text-center rounded-md transition-colors ${language === 'en' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                      >
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
