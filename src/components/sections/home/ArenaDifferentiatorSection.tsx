"use client";

import { motion, X, Zap, ArrowRight } from "../../../lib/libraries";
import { SectionCtaSimple } from "../../../types/strapi.home.model";
import { ButtonCTA } from "../../elements/ButtonCTA";
import { DynamicIcon } from "../../elements/DynamicIcon";
import { toStr } from "@/src/services/content.service";

interface ArenaDifferentiatorSectionProps {
  data: SectionCtaSimple;
}

export default function ArenaDifferentiatorSection({ data }: ArenaDifferentiatorSectionProps) {
  if (!data) return null;

  const badge = toStr(data.tooltip);
  const title = toStr(data.title);

  return (
    <section id="arena-differentiator" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--primary)_0%,_transparent_60%)] opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        {/* Badge + Title */}
        <div className="text-center mb-16">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-primary text-xs font-black tracking-widest uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1920px] mx-auto mb-16">
          {data.cards?.map((card: any, index: number) => {
            const isElite = index === 1;
            
            return (
              <motion.div
                key={card.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative rounded-3xl border ${isElite ? 'border-2 border-primary shadow-[0_0_60px_color-mix(in_srgb,var(--primary)_12%,transparent)]' : 'border-white/10 hover:border-white/20'} bg-zinc-900/60 backdrop-blur-sm p-6 lg:p-8 flex flex-col gap-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5`}
              >
                {/* Background tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${isElite ? 'from-primary/10' : 'from-zinc-800/10'} to-transparent pointer-events-none rounded-3xl`} />

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isElite ? 'bg-primary shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_50%,transparent)]' : 'bg-zinc-800 border border-white/10'}`}>
                    <DynamicIcon 
                      iconName={card.icon} 
                      size={20} 
                      className={isElite ? 'text-black fill-black' : 'text-primary'} 
                      fallback={isElite ? Zap : X} 
                    />
                  </div>
                  <span className={`font-black uppercase tracking-widest text-xs lg:text-sm ${isElite ? 'text-primary' : 'text-zinc-400'}`}>
                    {card.text_tooltip_one}
                  </span>
                </div>

                <p className={`text-2xl lg:text-3xl font-black leading-snug italic ${isElite ? 'text-white' : 'text-zinc-300'}`} style={{ transform: 'skewX(-2deg)' }}>
                  {card.title_card}
                </p>

                <div className="flex items-center gap-3 mt-auto pt-2">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isElite ? 'bg-primary shadow-[0_0_8px_color-mix(in_srgb,var(--primary)_80%,transparent)]' : 'bg-zinc-600'}`} />
                  <span className={`${isElite ? 'text-primary/90' : 'text-zinc-400'} text-xs lg:text-sm font-medium`}>
                    {card.subtitle_card}
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
            label={toStr(data.button_section_cta_simple.text_button)}
            iconName={data.button_section_cta_simple.icon || "ArrowRight"}
            className="px-12 py-5 text-lg"
            variant="primary"
          />
        </motion.div>
      </div>
    </section>
  );
}
