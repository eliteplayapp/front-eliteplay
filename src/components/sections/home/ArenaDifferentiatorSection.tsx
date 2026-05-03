"use client";

import { motion, X, Zap, ArrowRight } from "../../../lib/libraries";
import { SectionCtaSimple } from "../../../types/strapi.home.model";
import { getTranslation } from "../../../lib/i18n";
import { ButtonCTA } from "../../elements/ButtonCTA";
import { DynamicIcon } from "../../elements/DynamicIcon";

interface ArenaDifferentiatorSectionProps {
  data: SectionCtaSimple;
  language: string;
}

export default function ArenaDifferentiatorSection({ data, language }: ArenaDifferentiatorSectionProps) {
  if (!data) return null;

  const badge = getTranslation(data.tooltip, language);
  const title = getTranslation(data.title, language);

  return (
    <section id="arena-differentiator" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#94CE00_0%,_transparent_60%)] opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#94CE00]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#94CE00]/30 to-transparent" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        {/* Badge + Title */}
        <div className="text-center mb-16">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-[#94CE00] text-xs font-black tracking-widest uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#94CE00] animate-pulse" />
              {badge}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-black text-white italic tracking-tight uppercase"
            style={{ transform: 'skewX(-3deg)' }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-16">
          {data.cards?.map((card, index) => {
            // Usually index 0 is common arena, index 1 is Elite Play
            const isElite = index === 1;
            
            return (
              <motion.div
                key={card.id || index}
                initial={{ opacity: 0, x: isElite ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: isElite ? 0.1 : 0 }}
                className={`relative rounded-3xl border ${isElite ? 'border-2 border-[#94CE00] shadow-[0_0_60px_rgba(148,206,0,0.12)]' : 'border-white/10'} bg-zinc-900/60 backdrop-blur-sm p-8 md:p-10 flex flex-col gap-6 overflow-hidden`}
              >
                {/* Background tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${isElite ? 'from-[#94CE00]/8' : 'from-red-900/5'} to-transparent pointer-events-none rounded-3xl`} />

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isElite ? 'bg-[#94CE00] shadow-[0_0_20px_rgba(148,206,0,0.5)]' : 'bg-zinc-800 border border-white/10'}`}>
                    <DynamicIcon 
                      iconName={card.icon} 
                      size={20} 
                      className={isElite ? 'text-black fill-black' : 'text-zinc-500'} 
                      fallback={isElite ? Zap : X} 
                    />
                  </div>
                  <span className={`font-black uppercase tracking-widest text-sm ${isElite ? 'text-[#94CE00]' : 'text-zinc-400'}`}>
                    {getTranslation(card.text_tooltip_one, language)}
                  </span>
                </div>

                <p className={`text-3xl md:text-4xl font-black leading-snug italic ${isElite ? 'text-white' : 'text-zinc-300'}`} style={{ transform: 'skewX(-2deg)' }}>
                  {getTranslation(card.title_card, language)}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-3 h-3 rounded-full ${isElite ? 'bg-[#94CE00] shadow-[0_0_8px_rgba(148,206,0,0.8)]' : 'bg-zinc-600'}`} />
                  <span className={`${isElite ? 'text-[#94CE00]/80' : 'text-zinc-500'} text-sm font-medium`}>
                    {getTranslation(card.subtitle_card, language)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <ButtonCTA 
            link={data.button_section_cta_simple.link || "/arenas"}
            label={getTranslation(data.button_section_cta_simple.text_button, language)}
            iconName={data.button_section_cta_simple.icon || "ArrowRight"}
            className="px-12 py-5 text-lg"
            variant="primary"
          />
        </motion.div>
      </div>
    </section>
  );
}
