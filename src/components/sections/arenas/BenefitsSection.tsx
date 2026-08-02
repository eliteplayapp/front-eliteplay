"use client";

import {
  motion,
} from "../../../lib/libraries";
import { DynamicIcon } from "../../elements/DynamicIcon";
import { SectionBadge } from "../../elements/SectionBadge";
import { SectionHeading } from "../../elements/SectionHeading";
import { SectionContainer } from "../../elements/SectionContainer";
import { fadeInUp, } from "../../../lib/animations";
import { toStr } from "../../../services/content.service";
import type { SectionDifferential } from "../../../types/strapi.arena.model";

interface BenefitsSectionProps {
  data: SectionDifferential;
  language: string;
}

export default function BenefitsSection({ data, language }: BenefitsSectionProps) {
  if (!data) return null;

  const badge = toStr(data.tooltip);
  const title = toStr(data.title);

  return (
    <SectionContainer className="bg-zinc-950">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-primary/20" />

      {/* Header */}
      <div className="flex flex-col items-center mb-12 md:mb-20">
        <SectionBadge text={badge} />
        <SectionHeading 
          title={title} 
          align="center" 
          dark 
          className="mb-0" 
        />
      </div>

      {/* Horizontal Timeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {data.cards?.map((step: any, index: number) => {
            const stepTitle = step.title;
            const stepDescription = step.subtitle;
            const stepNumber = (index + 1).toString().padStart(2, '0');

            return (
              <motion.div
                key={step.id || index}
                className="relative"
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative h-full bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8">
                  {/* Large number background */}
                  <div className="absolute -top-8 -right-4 text-9xl font-bold text-primary/5 italic pointer-events-none select-none" style={{ transform: 'skewX(-5deg)' }}>
                    {stepNumber}
                  </div>

                  {/* Icon with animated circle */}
                  <div className="relative mb-10">
                    <div
                      className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[#7ab300] shadow-[0_0_20px_rgba(148,206,0,0.3)]"
                    >
                      <DynamicIcon iconName={step.icon} className="w-10 h-10 text-black" />
                    </div>

                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute top-0 left-0 w-20 h-20 rounded-full border-2 border-primary"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 italic uppercase" style={{ transform: 'skewX(-2deg)' }}>
                      {stepTitle}
                    </h3>
                    <p className="text-white/70 leading-relaxed font-light">
                      {stepDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

