"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Bell, Play, Share2, Download, Smartphone, Layers, History, Sparkles, CheckCircle2 } from "../../../lib/libraries";
import { SectionCtaOne } from "../../../types/strapi.home.model";
import { toStr } from "@/src/services/content.service";
import { ButtonCTA } from "../../elements/ButtonCTA";
import { DynamicIcon } from "../../elements/DynamicIcon";
import { getMediaUrl } from "../../../services/content.service";

interface CaptureSectionProps {
  data: SectionCtaOne;
}

const fallbackIcons = [Bell, Play, Share2, Download];

/** Fallback screenshots with titles & descriptions for tabs */
const FALLBACK_SLIDES = [
  {
    id: 1,
    url: "/img/app-screenshot-1.png",
    alternativeText: "Reproductor de jogadas",
    title: "Reproductor de Jogadas",
    desc: "Assista suas melhores jogadas em alta definição logo após o término da partida.",
    icon: Play,
  },
  {
    id: 2,
    url: "/img/app-screenshot-2.png",
    alternativeText: "Cortes recentes",
    title: "Cortes Recentes",
    desc: "Acesse rapidamente a lista dos lances mais marcantes das suas últimas partidas.",
    icon: Layers,
  },
  {
    id: 3,
    url: "/img/app-screenshot-3.png",
    alternativeText: "Histórico por quadra",
    title: "Histórico por Quadra",
    desc: "Filtre e organize todo o seu histórico de vídeos por data, horário e quadra.",
    icon: History,
  },
];

export default function CaptureSection({ data }: CaptureSectionProps) {
  if (!data) return null;

  const badge = toStr(data.tooltip);
  const title = toStr(data.title);
  const subtitle = toStr(data.subtitle);

  /* ─── Carousel / Tab state ─── */
  const rawImgs = data.carousel_app?.imgs ?? [];
  const slides = rawImgs.length > 0
    ? rawImgs.map((img, i) => ({
        id: img.id,
        src: img.url.startsWith("http") ? img.url : getMediaUrl(img.url) || img.url,
        alt: img.alternativeText ?? "",
        title: FALLBACK_SLIDES[i % FALLBACK_SLIDES.length].title,
        desc: FALLBACK_SLIDES[i % FALLBACK_SLIDES.length].desc,
        icon: FALLBACK_SLIDES[i % FALLBACK_SLIDES.length].icon,
      }))
    : FALLBACK_SLIDES.map((s) => ({ ...s, src: s.url, alt: s.alternativeText }));

  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  /* Auto-switch tabs every 5s */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="capture" className="relative py-16 md:py-24 bg-white overflow-hidden scroll-mt-20">
      {/* Ambient background decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Section Details ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-[#6aa000] text-xs font-black tracking-widest uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {badge}
              </div>
            )}

            {/* Heading */}
            <h2
              className="text-4xl md:text-6xl font-black text-black italic tracking-tight mb-6 leading-tight uppercase"
              style={{ transform: "skewX(-3deg)" }}
            >
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-600 text-lg md:text-xl mb-10 max-w-3xl leading-relaxed font-light">
              {subtitle}
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {data.itens?.map((item: any, i: number) => (
                <li key={item.id || i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <DynamicIcon
                      iconName={item.icon}
                      size={20}
                      className="text-primary"
                      fallback={fallbackIcons[i % fallbackIcons.length]}
                    />
                  </div>
                  <p className="text-zinc-700 font-medium">{toStr(item.item)}</p>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {data.button && (
              <ButtonCTA
                link={data.button.link}
                label={toStr(data.button.text_button)}
                iconName={data.button.icon}
              />
            )}
          </motion.div>

          {/* ── Right Column: Interactive App Showcase Dashboard ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            {/* Dashboard Container Card */}
            <div className="relative w-full rounded-3xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 shadow-2xl overflow-hidden">
              
              {/* Subtle ambient light gradient inside card */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/15 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Dashboard Header Bar */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">App ElitePlay</h4>
                    <p className="text-xs text-zinc-400">Explore os recursos do aplicativo</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <Sparkles size={12} />
                  <span>Ao vivo</span>
                </div>
              </div>

              {/* Dashboard Main Grid: Interactive Tabs (Left) + Phone Screen (Right) */}
              <div className="grid sm:grid-cols-12 gap-6 items-center">

                {/* Left Tabs List (5 cols) */}
                <div className="sm:col-span-6 flex flex-col gap-3">
                  {slides.map((slide, idx) => {
                    const IconComponent = slide.icon;
                    const isActive = idx === current;
                    return (
                      <button
                        key={slide.id || idx}
                        onClick={() => goTo(idx)}
                        className={`text-left p-4 rounded-2xl transition-all duration-300 border flex items-start gap-3.5 relative overflow-hidden group ${
                          isActive
                            ? "bg-zinc-800/90 border-primary/50 shadow-lg text-white"
                            : "bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:bg-zinc-850 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        {/* Active Indicator Bar */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}

                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? "bg-primary text-black font-bold"
                              : "bg-zinc-800 text-zinc-400 group-hover:text-white"
                          }`}
                        >
                          <IconComponent size={18} />
                        </div>

                        <div>
                          <h5 className={`text-sm font-bold leading-tight mb-1 ${isActive ? "text-white" : "text-zinc-300"}`}>
                            {slide.title}
                          </h5>
                          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                            {slide.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}

                  {/* Feature Check Pill at bottom of tabs */}
                  <div className="mt-2 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-300">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span>Disponível para iOS e Android com sincronização instantânea.</span>
                  </div>
                </div>

                {/* Right Phone Mockup (6 cols centered) */}
                <div className="sm:col-span-6 flex flex-col items-center justify-center relative">

                  {/* Phone frame */}
                  <div
                    className="relative z-10 rounded-[2.6rem] overflow-hidden shadow-2xl ring-4 ring-zinc-800 bg-black"
                    style={{
                      width: "min(100%, 250px)",
                      aspectRatio: "9 / 19.5",
                    }}
                  >
                    {/* Status bar notch */}
                    <div className="absolute top-0 inset-x-0 h-7 bg-black z-30 flex items-center justify-center">
                      <div className="w-24 h-5 bg-black rounded-b-2xl" />
                    </div>

                    {/* Animated screen image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={current}
                          src={slides[current].src}
                          alt={slides[current].alt}
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.35 }}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </AnimatePresence>
                    </div>

                    {/* Home bar */}
                    <div className="absolute bottom-0 inset-x-0 h-6 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center">
                      <div className="w-24 h-1 bg-white/40 rounded-full" />
                    </div>
                  </div>

                  {/* Floating Action Badge on phone bottom right */}
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-2 right-0 sm:-right-2 z-20 bg-primary text-black font-black text-[11px] px-3.5 py-1.5 rounded-full shadow-xl uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Sparkles size={12} />
                    {slides[current].title}
                  </motion.div>

                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
