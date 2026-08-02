"use client";

import {
  motion,
  Trophy
} from '../../../lib/libraries';
import { DynamicIcon } from '../../elements/DynamicIcon';


const sportsData = [
  { icon: "Trophy",    sport: { "pt-br": "Futebol",      "es": "Fútbol",        "en": "Football" } },
  { icon: "Target",    sport: { "pt-br": "Padel",        "es": "Pádel",         "en": "Padel" } },
  { icon: "Activity",  sport: { "pt-br": "Tênis",        "es": "Tenis",         "en": "Tennis" } },
  { icon: "Wind",      sport: { "pt-br": "Beach Tennis", "es": "Tenis de Playa","en": "Beach Tennis" } },
  { icon: "Volleyball",sport: { "pt-br": "Vôlei",        "es": "Vóleibol",      "en": "Volleyball" } },
  { icon: "CircleDot", sport: { "pt-br": "Basquete",     "es": "Baloncesto",    "en": "Basketball" } },
];

export default function SportsCarousel({ language }: { language: string }) {
  // Duplicando os itens para o efeito de scroll infinito
  const duplicatedSports = [...sportsData, ...sportsData];
  const langKey = language as keyof typeof sportsData[0]['sport'];

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
            const sportName = item.sport[langKey] || item.sport["es"];

            return (
              <div
                key={`${item.icon}-${index}`}
                className="flex items-center gap-4"
              >
                <div className="p-2 rounded-full bg-[#76b900]/5">
                  <DynamicIcon 
                    iconName={item.icon} 
                    size={20} 
                    className="text-[#76b900]" 
                    fallback={Trophy} 
                  />
                </div>

                <span className="text-white/70 text-[10px] md:text-sm font-semibold tracking-[0.18em] uppercase">
                  {sportName}
                </span>

                <div className="flex gap-1 ml-4 opacity-15">
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
