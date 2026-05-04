"use client";

import {
  motion,
  Image,
} from "../../../lib/libraries";
import { getTranslation } from "../../../lib/i18n";
import { getStrapiMedia } from "@/src/services/strapi.service";
import { DynamicIcon } from "../../elements/DynamicIcon";
import type { SectionInstallation } from "../../../types/strapi.arena.model";

interface ProcessSectionProps {
  data: SectionInstallation;
  language: string;
}

export default function ProcessSection({ data, language }: ProcessSectionProps) {
  if (!data) return null;

  const badge = getTranslation(data.tooltip, language);
  const title = getTranslation(data.title, language);
  const subtitle = getTranslation(data.subtitle || undefined, language);

  const bgImage = getStrapiMedia(data.image?.url);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-[1920px] mx-auto px-6 md:px-24">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-24 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
          
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-4 italic uppercase" style={{ transform: 'skewX(-3deg)' }}>
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-primary font-bold uppercase tracking-widest italic" style={{ transform: 'skewX(-2deg)' }}>
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row-reverse gap-16 relative items-start">
          {/* Sticky Visual Side */}
          <div className="w-full lg:w-1/2 relative lg:sticky lg:top-32 h-64 md:h-[40vh] lg:h-[60vh] rounded-2xl lg:rounded-3xl overflow-hidden bg-zinc-100 border border-black/5 z-10 shadow-2xl">
            {bgImage ? (
              <Image
                src={bgImage}
                alt={data.image?.alternativeText || "Process Visual"}
                fill
                className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-black/20 to-black/70 z-10" />
          </div>

          {/* Scrolling Steps */}
          <div className="w-full lg:w-1/2 space-y-8 pb-12 lg:pb-32">
            {data.cards?.map((step, index) => {
              const stepTitle = getTranslation(step.title, language);
              const stepSubtitle = getTranslation(step.subtitle, language);
              const stepNumber = (index + 1).toString().padStart(2, '0');

              return (
                <motion.div
                  key={step.id || index}
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Background Number */}
                  <div className="text-[80px] lg:text-[120px] font-black text-black/[0.03] absolute -top-10 lg:-top-16 -left-4 lg:-left-8 italic leading-none select-none pointer-events-none" style={{ transform: 'skewX(-10deg)' }}>
                    {stepNumber}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 bg-white border-2 border-primary rounded-2xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    <div className="flex items-center gap-4 mb-6 lg:mb-8">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(148,206,0,0.3)]">
                        <DynamicIcon iconName={step.icon} className="w-7 h-7 lg:w-8 lg:h-8 text-black" />
                      </div>
                      <div className="text-xl lg:text-2xl font-black text-primary tracking-widest uppercase italic" style={{ transform: 'skewX(-2deg)' }}>
                        Passo {stepNumber}
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-black text-black mb-3 lg:mb-4 italic uppercase tracking-tight" style={{ transform: 'skewX(-2deg)' }}>
                      {stepTitle}
                    </h3>
                    <p className="text-zinc-600 text-lg lg:text-xl leading-relaxed font-light">
                      {stepSubtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
