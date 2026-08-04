"use client";

import {
  motion,
  Image,
  X,
  Check,
} from "../../../lib/libraries";
import { getMediaUrl, toStr } from "@/src/services/content.service";
import imagesData from "@/src/data/images.json";
import { SectionBadge } from "../../elements/SectionBadge";
import { SectionHeading } from "../../elements/SectionHeading";
import { SectionContainer } from "../../elements/SectionContainer";
import { fadeInLeft, fadeInRight } from "../../../lib/animations";
import type { SectionComparative } from "../../../types/strapi.arena.model";

interface ComparisonSectionProps {
  data: SectionComparative;
}

export default function ComparisonSection({ data }: ComparisonSectionProps) {
  if (!data) return null;

  const badge = toStr(data.tooltip);
  const title = toStr(data.title);

  return (
    <SectionContainer className="bg-zinc-950 border-y border-white/5 scroll-mt-20">
      {/* Background Text Decor */}
      <div className="absolute top-20 left-0 w-full text-[20vw] font-black text-white/[0.02] leading-none select-none pointer-events-none italic uppercase -translate-y-1/2 whitespace-nowrap" style={{ transform: 'skewX(-10deg)' }}>
        The Difference • The Difference
      </div>

      {/* Header */}
      <div className="flex flex-col items-center mb-12 md:mb-24">
        <SectionBadge text={badge} />
        <SectionHeading 
          title={title} 
          align="center" 
          dark 
          className="mb-0" 
        />
      </div>

      <div className="relative flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-0">
        {/* VS Badge */}
        <div className="relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-30 flex items-center justify-center order-2 lg:order-none h-0 lg:h-auto">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-zinc-900 border-[6px] lg:border-8 border-zinc-950 flex items-center justify-center shadow-2xl"
          >
            <span className="text-lg lg:text-2xl font-black text-white italic">VS</span>
          </motion.div>
        </div>

        {/* Cards Mapping */}
        {data.cards?.map((card: any, index: number) => {
          const isElite = index === 1; // Assuming second card is Elite Play
          const cardTitle = card.title;
          const cardImage = getMediaUrl(card.image?.url) || imagesData.arenas.comparative[index] || "";
          const animationVariant = isElite ? fadeInLeft : fadeInRight;

          return (
            <motion.div
              key={card.id || index}
              {...animationVariant}
              className={`relative ${isElite ? 'lg:pl-4 mt-8 lg:mt-0 order-1 lg:order-2' : 'lg:pr-4 order-2 lg:order-1'}`}
            >
              {/* Accent glow for Elite side */}
              {isElite && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur-xl opacity-10 transition duration-700" />
              )}

              <div className={`relative h-full bg-zinc-900${!isElite ? '/50 backdrop-blur-sm' : ''} rounded-xl overflow-hidden border border-white/10 shadow-sm transition-all duration-700`}>
                
                {/* Image Header */}
                <div className={`relative h-64 ${!isElite ? 'grayscale-[0.5] opacity-60' : ''}`}>
                  {cardImage && (
                    <Image
                      src={cardImage}
                      alt={card.image?.alternativeText || cardTitle}
                      fill
                      className={`w-full h-full ${cardImage.startsWith('data:') ? 'object-contain p-6' : 'object-cover'}`}
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

                  {isElite && (
                    <div className="absolute top-6 right-6 px-4 py-2 bg-primary rounded-full shadow-[0_0_20px_rgba(148,206,0,0.5)]">
                      <span className="text-black font-black text-[10px] uppercase tracking-tighter">Premium Level</span>
                    </div>
                  )}
                </div>

                <div className="p-10 md:p-14 relative z-10 -mt-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 ${isElite ? 'bg-primary shadow-[0_10px_20px_rgba(148,206,0,0.3)]' : 'bg-zinc-950'}`}>
                      {isElite ? (
                        <Check className="w-6 h-6 text-black" strokeWidth={3} />
                      ) : (
                        <X className="w-6 h-6 text-zinc-500" />
                      )}
                    </div>
                    <h3 className={`text-2xl font-black italic tracking-widest ${isElite ? 'text-primary' : 'text-zinc-400'}`} style={{ transform: 'skewX(-3deg)' }}>
                      {cardTitle}
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {card.itens?.map((item: any, itemIdx: number) => (
                      <motion.li
                        key={item.id || itemIdx}
                        initial={{ opacity: 0, x: isElite ? 10 : -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIdx * 0.1 }}
                        className={`flex items-center gap-4 font-bold uppercase text-sm tracking-tight ${isElite ? 'text-white text-base' : 'text-zinc-500'}`}
                      >
                        {isElite ? (
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30">
                            <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 shrink-0" />
                        )}
                        <span>{item.item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Internal Accent Glow for Elite */}
                {isElite && (
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}

