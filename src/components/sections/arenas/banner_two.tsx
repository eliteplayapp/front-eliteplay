"use client";

import {
  motion,
  ChevronDown,
  Image,
} from "../../../lib/libraries";
import { getMediaUrl, toStr } from "@/src/services/content.service";
import { ButtonCTA } from "../../elements/ButtonCTA";
import type { BannerArenas } from "../../../types/strapi.arena.model";

interface BannerTwoProps {
  data: BannerArenas;
}

export default function BannerTwo({ data }: BannerTwoProps) {
  if (!data) return null;

  const badge = toStr(data.tooltip_one);
  const title = toStr(data.title);
  const description = toStr(data.subtitle);
  const cta = toStr(data.button_cta_banner?.text_button);
  const socialProof = toStr(data.tooltip_two);

  const bgImage = getMediaUrl(data.image?.url);

  return (
    <section className="relative min-h-[100svh] md:min-h-[90vh] py-32 md:py-0 flex items-center justify-center overflow-hidden bg-black text-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
          <Image
            src={bgImage!}
            alt={data.image?.alternativeText || "Arena esportiva"}
            fill
            priority
            className="object-cover opacity-50"
            unoptimized
          />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />

        {/* Neon Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1920px] w-full mx-auto px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-primary/30 text-primary text-xs font-black tracking-widest uppercase mb-6 md:mb-8 mt-8 md:mt-0"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {badge}
            </motion.div>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 italic leading-tight"
            style={{ transform: "skewX(-3deg)" }}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-2xl text-white/80 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              {description}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <ButtonCTA
              link={data.button_cta_banner?.link || "#contact"}
              label={cta}
              iconName="ArrowRight"
              variant="primary"
              className="w-full sm:w-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator — desktop */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
