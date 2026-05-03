"use client";

import { motion, Bell, Play, Share2, Download, Smartphone } from "../../../lib/libraries";
import { SectionCtaOne } from "../../../types/strapi.home.model";
import { getTranslation } from "../../../lib/i18n";
import { getStrapiMedia } from "../../../services/strapi.service";
import { VideoPlayer } from "../../elements/VideoPlayer";

interface CaptureSectionProps {
  data: SectionCtaOne;
  language: string;
}

const fallbackIcons = [Bell, Play, Share2, Download];

export default function CaptureSection({ data, language }: CaptureSectionProps) {
  if (!data) return null;

  const badge = getTranslation(data.tooltip, language);
  const title = getTranslation(data.titulo, language);
  const subtitle = getTranslation(data.subtitle, language);
  const buttonText = data.button_section_cta?.text_button ? getTranslation(data.button_section_cta.text_button, language) : "Baixar o App";
  const buttonLink = data.button_section_cta?.link || "#";

  return (
    <section id="capture" className="relative py-16 md:py-24 bg-white overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#94CE00]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#94CE00]/5 rounded-full blur-[120px]" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Content — left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-[#6aa000] text-xs font-black tracking-widest uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-[#94CE00] animate-pulse" />
                {badge}
              </div>
            )}

            {/* Heading */}
            <h2
              className="text-4xl md:text-6xl font-black text-black italic tracking-tight mb-6 leading-tight uppercase"
              style={{ transform: 'skewX(-3deg)' }}
            >
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-600 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-light">
              {subtitle}
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {data.itens?.map((item, i) => {
                const Icon = fallbackIcons[i % fallbackIcons.length];
                return (
                  <li key={item.id || i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#94CE00]/10 border border-[#94CE00]/30 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#94CE00]" />
                    </div>
                    <p className="text-zinc-700 font-medium">{getTranslation(item.item, language)}</p>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <motion.a
              href={buttonLink}
              className="inline-flex items-center gap-2 bg-zinc-900 text-[#94CE00] border border-zinc-800 px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all cursor-pointer shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone size={20} />
              {buttonText}
            </motion.a>
          </motion.div>

          {/* Video — right */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-[#94CE00]/20 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />

            <VideoPlayer
              variant="capture"
              thumbnailUrl={getStrapiMedia(data.video.conteudo.url) || ""}
              videoUrl={data.video.link || ""}
              alt={title}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
