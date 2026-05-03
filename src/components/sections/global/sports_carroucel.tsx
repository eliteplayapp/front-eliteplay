"use client";

import {
  motion,
  Trophy
} from '../../../lib/libraries';
import { getTranslation } from '../../../lib/i18n';
import { DynamicIcon } from '../../elements/DynamicIcon';


const sportsData = [
  {
    icon: "Trophy",
    sport: {
      language_pt: "Futebol",
      language_es: "Fútbol",
      language_en: "Football"
    }
  },
  {
    icon: "Target",
    sport: {
      language_pt: "Padel",
      language_es: "Pádel",
      language_en: "Padel"
    }
  },
  {
    icon: "Activity",
    sport: {
      language_pt: "Tênis",
      language_es: "Tenis",
      language_en: "Tennis"
    }
  },
  {
    icon: "Wind",
    sport: {
      language_pt: "Beach Tennis",
      language_es: "Tenis de Playa",
      language_en: "Beach Tennis"
    }
  },
  {
    icon: "Volleyball",
    sport: {
      language_pt: "Vôlei",
      language_es: "Vóleibol",
      language_en: "Volleyball"
    }
  },
  {
    icon: "CircleDot",
    sport: {
      language_pt: "Basquete",
      language_es: "Baloncesto",
      language_en: "Basketball"
    }
  },
];

export default function SportsCarousel({ language }: { language: string }) {
  // Dulicando os itens para o efeito de scroll infinito
  const duplicatedSports = [...sportsData, ...sportsData];

  return (
    <section className="bg-black py-3 md:py-6 border-t border-b border-[#76b900]/15 overflow-hidden relative">
      {/* Efeito de desfoque nas bordas para profundidade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      <div className="relative flex items-center">
        <motion.div
          className="flex gap-10 md:gap-20 items-center whitespace-nowrap"
          animate={{
            x: [0, "-33.33%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedSports.map((item, index) => {
            const sportName = getTranslation(
              { id: index, ...item.sport },
              language
            );

            return (
              <div
                key={`${item.icon}-${index}`}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="p-2 rounded-full bg-[#76b900]/5 group-hover:bg-[#76b900]/20 transition-all duration-300">
                  <DynamicIcon 
                    iconName={item.icon} 
                    size={20} 
                    className="text-[#76b900] group-hover:scale-110 transition-all duration-300" 
                    fallback={Trophy} 
                  />
                </div>

                <span className="text-white/70 text-[10px] md:text-sm font-semibold tracking-[0.18em] uppercase group-hover:text-[#76b900] transition-colors duration-300">
                  {sportName}
                </span>

                <div className="flex gap-1 ml-4 opacity-15 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1 h-1 rounded-full bg-[#76b900]" />
                  <div className="w-1 h-1 rounded-full bg-[#76b900]/50" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
