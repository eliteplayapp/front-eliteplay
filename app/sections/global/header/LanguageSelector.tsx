"use client";

import { useState, useEffect } from 'react';
import { 
  usePathname, 
  useSearchParams,
  motion, 
  AnimatePresence, 
  Globe, 
  ChevronDown 
} from '../../../lib/libraries';

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
  if (!mounted) return null;

  const languages = [
    { code: 'pt-br', label: 'Português', short: 'PT' },
    { code: 'es', label: 'Español', short: 'ES' },
    { code: 'en', label: 'English', short: 'EN' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[1];

  return (
    <div className={`relative ${!isMobile ? 'hidden sm:block' : 'w-full flex justify-center'}`}>
      {/* O Botão Principal (Select Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => !isMobile && setTimeout(() => setIsOpen(false), 200)}
        className={`flex items-center justify-between gap-2 bg-[#333] hover:bg-[#444] border border-[#444] text-white transition-all cursor-pointer select-none ${
          isMobile 
            ? 'px-6 py-3 rounded-[24px] text-lg w-full max-w-[280px]' 
            : 'px-4 py-2 rounded-[20px] text-sm min-w-[110px]'
        }`}
        aria-label="Select language"
      >
        <div className="flex items-center gap-2">
          <Globe size={isMobile ? 18 : 14} className="text-zinc-400" />
          <span className="current-value font-medium">
            {isMobile ? currentLang.label : currentLang.short}
          </span>
        </div>
        <ChevronDown 
          size={isMobile ? 18 : 14} 
          className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* A Lista de Opções (Dropdown) */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute z-50 bg-[#252525] border border-white/5 rounded-[12px] p-2 shadow-[0_10px_25px_rgba(0,0,0,0.5)] list-none flex flex-col ${
              isMobile 
                ? 'bottom-full mb-4 left-1/2 -translate-x-1/2 w-[180px]' 
                : 'top-full mt-2 right-0 w-[180px]'
            }`}
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                className={`px-4 py-3 text-sm rounded-[8px] cursor-pointer transition-all duration-200 select-none ${
                  language === lang.code 
                    ? 'bg-[#3d4a1a] text-[#76b900] font-bold' 
                    : 'text-[#bbb] hover:bg-[#333] hover:text-white'
                } ${isMobile ? 'text-center' : 'text-left'}`}
              >
                {lang.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
