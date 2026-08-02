"use client";

import { motion, Image, Sparkles } from "../../lib/libraries";
import { InstructionItem } from "../../types/strapi.home.model";
import { getMediaUrl } from "../../services/content.service";
import { DynamicIcon } from "./DynamicIcon";

interface HowItWorksCardProps {
  data: InstructionItem;
  index: number;
}

export function HowItWorksCard({ data, index }: HowItWorksCardProps) {
  const title = typeof data.title_card === 'string' ? data.title_card : (data.title_card as any)?.language_pt || "";
  const description = typeof data.subtitle_card === 'string' ? data.subtitle_card : (data.subtitle_card as any)?.language_pt || "";
  const imageUrl = getMediaUrl(data.img_instruction.url) || "";
  const stepNumber = (index + 1).toString().padStart(2, '0');

  return (
    <div className="relative flex items-stretch gap-0 h-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        className="relative flex-1 bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col transition-all duration-300"
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            width={700}
            height={480}
            className="w-full h-full object-cover"
            unoptimized
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/30 to-transparent" />

          {/* Step number badge over image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_16px_rgba(148,206,0,0.6)]">
              <span className="text-black text-xs font-black">{index + 1}</span>
            </div>
          </div>

          {/* Icon over image bottom-right */}
          <div className="absolute bottom-4 right-4">
            <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
              <DynamicIcon iconName={data.icon} size={20} className="text-primary" fallback={Sparkles} />
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col flex-1 p-6 relative">
          {/* Step number watermark */}
          <div className="absolute bottom-2 right-4 text-[5rem] font-black text-white/[0.03] select-none leading-none pointer-events-none">
            {stepNumber}
          </div>

          <h3 className="text-xl font-black text-white mb-3 italic leading-tight uppercase">
            {title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed font-light">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
