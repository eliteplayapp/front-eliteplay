"use client";

import { useState, useEffect } from 'react';
import { 
  usePathname, 
  useSearchParams,
  motion, 
  AnimatePresence, 
  Globe, 
  ChevronDown 
} from '../../lib/libraries';

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile';
}

export default function LanguageSelector({ variant = 'desktop' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const language = (searchParams.get("lang") || "es") as string;

  // Garante que o componente só renderize conteúdo dinâmico após a hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  const setLanguage = (newLang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);
    window.location.href = `${pathname}?${params.toString()}`;
  };

  const isMobile = variant === 'mobile';

  // Enquanto não estiver montado no cliente, renderizamos uma versão estática segura (ou null)
  // Isso evita qualquer erro de hidratação sem precisar de suppressHydrationWarning
  if (!mounted) return null;

  return (
    <div className={`relative ${!isMobile ? 'hidden sm:block' : 'w-full flex justify-center'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => !isMobile && setTimeout(() => setIsOpen(false), 200)}
        className={`flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-medium text-white hover:bg-white/10 transition-colors ${
          isMobile ? 'px-6 py-3 text-lg w-full max-w-[280px] justify-center' : 'px-3 py-1.5 text-sm'
        }`}
        aria-label="Select language"
      >
        <Globe size={isMobile ? 18 : 14} className="text-zinc-400" />
        <span>
          {isMobile 
            ? (language === 'pt-br' ? 'Português' : language === 'es' ? 'Español' : 'English')
            : (language === 'pt-br' ? 'PT' : language.toUpperCase())
          }
        </span>
        <ChevronDown 
          size={isMobile ? 18 : 14} 
          className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 10 : 10 }}
            className={`absolute z-50 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl flex flex-col p-2 ${
              isMobile 
                ? 'bottom-full mb-4 left-1/2 -translate-x-1/2 min-w-[200px]' 
                : 'top-full mt-2 right-0 min-w-[140px]'
            }`}
          >
            <button
              onClick={() => { setLanguage('pt-br'); setIsOpen(false); }}
              className={`px-4 py-2 text-left rounded-md transition-colors ${
                isMobile ? 'text-base py-3 text-center' : 'text-sm'
              } ${language === 'pt-br' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
            >
              Português
            </button>
            <button
              onClick={() => { setLanguage('es'); setIsOpen(false); }}
              className={`px-4 py-2 text-left rounded-md transition-colors ${
                isMobile ? 'text-base py-3 text-center' : 'text-sm'
              } ${language === 'es' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
            >
              Español
            </button>
            <button
              onClick={() => { setLanguage('en'); setIsOpen(false); }}
              className={`px-4 py-2 text-left rounded-md transition-colors ${
                isMobile ? 'text-base py-3 text-center' : 'text-sm'
              } ${language === 'en' ? 'bg-[#94CE00]/20 text-[#94CE00] font-bold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
            >
              English
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
