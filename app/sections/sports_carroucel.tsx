"use client";

import { 
  motion, 
  Trophy, 
  Volleyball, 
  Target, 
  Activity, 
  CircleDot,
  Wind,
  Medal
} from '../global/lib/libraries';
import { getTranslation } from '../global/lib/i18n';

// Mapeamento de strings para componentes de ícones do Lucide
const iconMap: Record<string, any> = {
  trophy: Trophy,
  target: Target,
  volleyball: Volleyball,
  activity: Activity,
  ball: CircleDot,
  wind: Wind,
  medal: Medal
};

const sportsData = [
  {
    icon: "trophy",
    sport: {
      language_pt: "Futebol",
      language_es: "Fútbol",
      language_en: "Football"
    }
  },
  {
    icon: "target",
    sport: {
      language_pt: "Padel",
      language_es: "Pádel",
      language_en: "Padel"
    }
  },
  {
    icon: "activity",
    sport: {
      language_pt: "Tênis",
      language_es: "Tenis",
      language_en: "Tennis"
    }
  },
  {
    icon: "wind",
    sport: {
      language_pt: "Beach Tennis",
      language_es: "Tenis de Playa",
      language_en: "Beach Tennis"
    }
  },
  {
    icon: "volleyball",
    sport: {
      language_pt: "Vôlei",
      language_es: "Vóleibol",
      language_en: "Volleyball"
    }
  },
  {
    icon: "ball",
    sport: {
      language_pt: "Basquete",
      language_es: "Baloncesto",
      language_en: "Basketball"
    }
  },
];

export default function SportsCarousel({ language }: { language: string }) {
  // Duplicando os itens para o efeito de scroll infinito (3x para garantir fluidez)
  const duplicatedSports = [...sportsData, ...sportsData, ...sportsData];

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
            const Icon = iconMap[item.icon] || Trophy;
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
                  <Icon 
                    className="w-5 h-5 md:w-6 md:h-6 text-[#76b900] group-hover:scale-110 transition-all duration-300" 
                    strokeWidth={1.5} 
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
