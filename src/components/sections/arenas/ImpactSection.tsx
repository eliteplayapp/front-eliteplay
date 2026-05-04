"use client";

import {
  motion,
  Image,
  Users,
} from "../../../lib/libraries";
import { getTranslation } from "../../../lib/i18n";
import { getStrapiMedia } from "@/src/services/strapi.service";
import { ButtonCTA } from "../../elements/ButtonCTA";
import type { SectionImpact } from "../../../types/strapi.arena.model";

interface ImpactSectionProps {
  data: SectionImpact;
  language: string;
}

export default function ImpactSection({ data, language }: ImpactSectionProps) {
  if (!data) return null;

  const badge = getTranslation(data.tooltip, language);
  const title = getTranslation(data.title, language);
  const description = getTranslation(data.subtitle, language);
  const bgImage = getStrapiMedia(data.image?.url);

  return (
    <section className="py-24 lg:py-40 bg-zinc-950 relative overflow-hidden">
      {/* Background Texture & Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        {bgImage && (
          <Image
            src={bgImage}
            alt={data.image?.alternativeText || "Stadium Background"}
            fill
            className="w-full h-full object-cover"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-primary/30 text-primary text-xs font-black tracking-widest uppercase mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {badge}
              </motion.div>
            )}

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 italic uppercase tracking-tighter leading-[0.9]" style={{ transform: 'skewX(-3deg)' }}>
              {title}
            </h2>

            {description && (
              <p className="text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed mb-12 max-w-xl">
                {description}
              </p>
            )}

            {data.button_section_impact && (
              <ButtonCTA
                link={data.button_section_impact.link || "#contact"}
                label={getTranslation(data.button_section_impact.text_button, language)}
                iconName="ArrowRight"
                variant="primary"
                className="italic"
              />
            )}
          </motion.div>

          {/* Right Side: Metrics Grid */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {data.cards?.map((card, index) => {
              const metric = getTranslation(card.metric, language);
              const category = getTranslation(card.category, language);
              const outcome = getTranslation(card.outcome, language);

              // Apply different offsets to match the staggered design
              const offsetClass = index === 1 ? "sm:mt-12" : index === 2 ? "sm:-mt-6" : "";

              return (
                <motion.div
                  key={card.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  className={`bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl relative group overflow-hidden ${offsetClass}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                  <div className="text-5xl lg:text-6xl font-black text-primary mb-4 italic" style={{ transform: 'skewX(-5deg)' }}>
                    {metric}
                  </div>
                  <p className="text-zinc-500 font-black uppercase text-xs tracking-widest mb-2">{category}</p>
                  <p className="text-white font-bold text-lg leading-tight uppercase italic">{outcome}</p>
                </motion.div>
              );
            })}

            {/* Decoration Card */}
            <div className="hidden sm:flex bg-gradient-to-br from-primary to-emerald-500 p-8 rounded-3xl flex-col justify-end mt-6">
              <Users className="w-12 h-12 text-black mb-4" />
              <p className="text-black font-black text-xl leading-snug italic uppercase" style={{ transform: 'skewX(-2deg)' }}>
                Junte-se a rede Elite
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
