"use client";

import {
  motion,
  Image,
} from "../../../lib/libraries";
import { getMediaUrl, toStr } from "@/src/services/content.service";
import { DynamicIcon } from "../../elements/DynamicIcon";
import { SectionBadge } from "../../elements/SectionBadge";
import { SectionHeading } from "../../elements/SectionHeading";
import type { SectionInstallation } from "../../../types/strapi.arena.model";

interface ProcessSectionProps {
  data: SectionInstallation;
}

export default function ProcessSection({ data }: ProcessSectionProps) {
  if (!data) return null;

  const badge = toStr(data.tooltip);
  const title = toStr(data.title);
  const subtitle = toStr(data.subtitle);
  const bgImage = getMediaUrl(data.image?.url);

  return (
    // Usando <section> direto (sem SectionContainer) para evitar overflow-hidden
    // que quebraria o position:sticky da imagem
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-[1920px] mx-auto px-6 md:px-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12">
          <div>
            <SectionBadge text={badge} />
            <SectionHeading
              title={title}
              subtitle={subtitle}
              className="mb-0 lg:mb-0"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
          {/* Sticky Visual Side — position:sticky requer que nenhum ancestral tenha overflow:hidden */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 shrink-0 h-64 md:h-[40vh] lg:h-[60vh] rounded-2xl lg:rounded-3xl overflow-hidden bg-zinc-100 border border-black/5 shadow-2xl relative">
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

            {/* Mensagem fixa sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
              <div className="flex items-end justify-between gap-4">
                <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl px-5 py-4 flex-1">
                  <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-1 opacity-80">
                    {badge}
                  </p>
                  <p
                    className="text-white font-black text-sm md:text-base lg:text-lg uppercase italic leading-tight"
                    style={{ transform: "skewX(-1deg)" }}
                  >
                    {title}
                  </p>
                </div>
                {data.cards?.length > 0 && (
                  <div className="backdrop-blur-md bg-primary/90 border border-primary rounded-xl px-4 py-4 flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_40%,transparent)]">
                    <span className="text-black font-black text-2xl leading-none">
                      {data.cards.length}
                    </span>
                    <span className="text-black/70 text-[9px] font-bold tracking-widest uppercase mt-0.5">
                      passos
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrolling Steps */}
          <div className="w-full lg:w-1/2 space-y-8 pb-12 lg:pb-32">
            {data.cards?.map((step: any, index: number) => {
              const stepTitle = step.title;
              const stepSubtitle = step.subtitle;
              const stepNumber = (index + 1).toString().padStart(2, "0");

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
                  <div
                    className="text-[80px] lg:text-[120px] font-black text-black/[0.03] absolute -top-10 lg:-top-16 -left-4 lg:-left-8 italic leading-none select-none pointer-events-none"
                    style={{ transform: "skewX(-10deg)" }}
                  >
                    {stepNumber}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 bg-white border-2 border-primary rounded-2xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    <div className="flex items-center gap-4 mb-6 lg:mb-8">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(148,206,0,0.3)]">
                        <DynamicIcon
                          iconName={step.icon}
                          className="w-7 h-7 lg:w-8 lg:h-8 text-black"
                        />
                      </div>
                      <div
                        className="text-xl lg:text-2xl font-black text-primary tracking-widest uppercase italic"
                        style={{ transform: "skewX(-2deg)" }}
                      >
                        Passo {stepNumber}
                      </div>
                    </div>

                    <h3
                      className="text-2xl lg:text-3xl font-black text-black mb-3 lg:mb-4 italic uppercase tracking-tight"
                      style={{ transform: "skewX(-2deg)" }}
                    >
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
