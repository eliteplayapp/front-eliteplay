"use client";

import { 
  motion, 
  ArrowRight
} from "../../../lib/libraries";
import { HowItWorksCard } from "../../elements/HowItWorksCard";
import { SectionInstructions } from "../../../types/strapi.home.model";
import { getTranslation } from "../../../lib/i18n";

interface HowItWorksSectionProps {
  data: SectionInstructions;
  language: string;
}

export default function HowItWorksSection({ data, language }: HowItWorksSectionProps) {
  if (!data) return null;

  const badge = getTranslation(data.tooltip_one, language);
  const title = getTranslation(data.title, language);
  const subtitle = getTranslation(data.subtitle, language);
  const callout = getTranslation(data.tooltip_two, language);

  return (
    <section id="how-it-works" className="py-24 md:py-36 bg-black relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(148,206,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
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
            className="text-4xl md:text-6xl font-black text-white italic tracking-tight mb-6 leading-tight uppercase"
            style={{ transform: 'skewX(-3deg)' }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {data.instructions?.map((step, index) => (
            <div key={step.id || index} className="relative h-full">
              <HowItWorksCard
                data={step}
                language={language}
                index={index}
              />

              {/* Arrow between cards */}
              {index < data.instructions.length - 1 && (
                <motion.div
                  className="hidden lg:flex items-center justify-center absolute -right-[1.5rem] top-1/2 -translate-y-1/2 z-20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.12 }}
                >
                  <ArrowRight className="w-5 h-5 text-[#94CE00]/50" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        {callout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 flex items-center justify-center"
          >
            <div className="flex items-center gap-3 bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4">
              <div className="w-3 h-3 rounded-full bg-[#94CE00] animate-pulse shrink-0 shadow-[0_0_10px_rgba(148,206,0,0.6)]" />
              <p className="text-white/70 text-sm font-medium">
                {callout.includes('30 segundos') ? (
                  <>
                    {callout.split('30 segundos')[0]}
                    <span className="text-[#94CE00] font-black">30 segundos</span>
                    {callout.split('30 segundos')[1]}
                  </>
                ) : callout}
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
