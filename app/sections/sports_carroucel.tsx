"use client";

import { 
  motion, 
  Trophy, 
  Volleyball, 
  Target, 
  Activity, 
  CircleDot,
  useSearchParams
} from '../global/lib/libraries';
import { getTranslation } from '../global/lib/i18n';

// Ícone de Raquete Customizado (Inspirado no código fornecido)
const RacketIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="10" cy="10" r="7" />
    <path d="M15 15l7 7" />
    <path d="M7 10l6 0" />
    <path d="M10 7l0 6" />
  </svg>
);

// Mapeamento de strings para componentes de ícones
const iconMap: Record<string, any> = {
  trophy: Trophy,
  racket: RacketIcon,
  target: Target,
  volleyball: Volleyball,
  basketball: Activity,
  circle: CircleDot,
};

// Dados mockados seguindo o padrão solicitado
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
    icon: "racket",
    sport: {
      language_pt: "Padel",
      language_es: "Pádel",
      language_en: "Padel"
    }
  },
  {
    icon: "racket",
    sport: {
      language_pt: "Tênis",
      language_es: "Tenis",
      language_en: "Tennis"
    }
  },
  {
    icon: "target",
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
    icon: "basketball",
    sport: {
      language_pt: "Basquete",
      language_es: "Baloncesto",
      language_en: "Basketball"
    }
  },
];

export function SportsCarousel() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "pt-br";

  // Duplicando os itens para o efeito de scroll infinito (3x para garantir fluidez)
  const duplicatedSports = [...sportsData, ...sportsData, ...sportsData];

  return (
    <section className="bg-black py-4 md:py-10 border-t border-b border-[#76b900]/20 overflow-hidden relative">
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
              lang
            );

            return (
              <div
                key={`${item.icon}-${index}`}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="p-2 rounded-full bg-[#76b900]/5 group-hover:bg-[#76b900]/20 transition-all duration-300">
                  <Icon 
                    className="w-5 h-5 md:w-7 md:h-7 text-[#76b900] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" 
                    strokeWidth={1.5} 
                  />
                </div>
                
                <span className="text-white/70 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase group-hover:text-[#76b900] transition-colors duration-300">
                  {sportName}
                </span>

                <div className="flex gap-1 ml-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-1 h-1 rounded-full bg-[#76b900]" />
                   <div className="w-1 h-1 rounded-full bg-[#76b900]/50" />
                   <div className="w-1 h-1 rounded-full bg-[#76b900]/20" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
