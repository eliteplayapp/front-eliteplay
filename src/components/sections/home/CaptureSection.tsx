"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Bell, Play, Share2, Download, Smartphone, Sparkles, CheckCircle2 } from "../../../lib/libraries";
import { SectionCtaOne } from "../../../types/strapi.home.model";
import { toStr } from "@/src/services/content.service";
import { ButtonCTA } from "../../elements/ButtonCTA";
import { DynamicIcon } from "../../elements/DynamicIcon";
import { getMediaUrl } from "../../../services/content.service";

import enLocale from "@/src/data/locales/en.json";
import imagesData from "@/src/data/images.json";

interface CaptureSectionProps {
  data: SectionCtaOne;
}

interface SlideItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  desc: string;
  icon: string;
}

const fallbackIcons = [Play, Share2, Download, Bell];

export default function CaptureSection({ data }: CaptureSectionProps) {
  if (!data) return null;

  const badge = toStr(data.tooltip);
  const title = toStr(data.title);
  const subtitle = toStr(data.subtitle);

  /* ─── All Carousel App data sourced directly from JSON / Props ─── */
  const fallbackCarousel = (enLocale.home.section_cta as any).carousel_app;
  const carouselData = data.carousel_app ?? fallbackCarousel;

  const badgeLive = toStr(carouselData?.badge_live) || toStr(fallbackCarousel?.badge_live);
  const labelApp = toStr(carouselData?.label_app) || toStr(fallbackCarousel?.label_app);
  const subtitleApp = toStr(carouselData?.subtitle_app) || toStr(fallbackCarousel?.subtitle_app);
  const footerText = toStr(carouselData?.footer_text) || toStr(fallbackCarousel?.footer_text);

  const rawImgs = carouselData?.imgs && carouselData.imgs.length > 0
    ? carouselData.imgs
    : (fallbackCarousel?.imgs ?? []);

  const slides: SlideItem[] = rawImgs.map((img: any, i: number) => {
    const fallbackImg = fallbackCarousel?.imgs?.[i % (fallbackCarousel?.imgs?.length || 1)];
    const sectionCtaImgs = imagesData.home.section_cta?.carousel_app || imagesData.home.carousel_app || [];
    const defaultImgUrl = sectionCtaImgs[i % (sectionCtaImgs.length || 1)] || "/img/app_1.png";
    return {
      id: img.id || i + 1,
      src: img.url ? (img.url.startsWith("http") ? img.url : getMediaUrl(img.url) || defaultImgUrl) : defaultImgUrl,
      alt: toStr(img.alternativeText) || toStr(fallbackImg?.alternativeText) || "",
      title: toStr(img.title) || toStr(fallbackImg?.title) || "",
      desc: toStr(img.desc) || toStr(fallbackImg?.desc) || "",
      icon: img.icon || fallbackImg?.icon || "Play",
    };
  });

  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  /* Auto-switch active slide every 5 seconds */
  useEffect(() => {
    if (slides.length === 0) return;
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

          {/* ── Left Column: Text & Features from JSON ── */}
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

            {/* CTA Button */}
            {data.button && (
              <ButtonCTA
                link={data.button.link}
                label={toStr(data.button.text_button)}
                iconName={data.button.icon}
              />
            )}
          </motion.div>

          {/* ── Right Column: Interactive App Showcase Dashboard (100% JSON data-driven) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            {/* Dashboard Container Card */}
            <div className="relative w-full rounded-3xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 shadow-2xl overflow-hidden">
              
              {/* Internal glow accents */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/15 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Dashboard Header Bar */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    {labelApp && <h4 className="text-sm font-bold text-white uppercase tracking-wider">{labelApp}</h4>}
                    {subtitleApp && <p className="text-xs text-zinc-400">{subtitleApp}</p>}
                  </div>
                </div>
                {badgeLive && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                    <Sparkles size={12} />
                    <span>{badgeLive}</span>
                  </div>
                )}
              </div>

              {/* Dashboard Main Grid */}
              <div className="grid sm:grid-cols-12 gap-6 items-center">

                {/* Left Tabs List (5 cols) */}
                <div className="sm:col-span-6 flex flex-col gap-3">
                  {slides.map((slide, idx) => {
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
                          <DynamicIcon
                            iconName={slide.icon}
                            size={18}
                            fallback={fallbackIcons[idx % fallbackIcons.length]}
                          />
                        </div>

                        <div>
                          {slide.title && (
                            <h5 className={`text-sm font-bold leading-tight mb-1 ${isActive ? "text-white" : "text-zinc-300"}`}>
                              {slide.title}
                            </h5>
                          )}
                          {slide.desc && (
                            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                              {slide.desc}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {/* Feature Check Pill from JSON */}
                  {footerText && (
                    <div className="mt-2 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-300">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>{footerText}</span>
                    </div>
                  )}
                </div>

                {/* Right Phone Mockup */}
                <div className="sm:col-span-6 flex flex-col items-center justify-center relative">

                  {/* Phone frame */}
                  <div
                    className="relative z-10 rounded-[2.6rem] overflow-hidden shadow-2xl ring-4 ring-zinc-800 bg-black"
                    style={{
                      width: "min(100%, 300px)",
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
                        {slides[current]?.src && (
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
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Home bar */}
                    <div className="absolute bottom-0 inset-x-0 h-6 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center">
                      <div className="w-24 h-1 bg-white/40 rounded-full" />
                    </div>
                  </div>

                  {/* Floating Action Badge on phone bottom right */}
                  {slides[current]?.title && (
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-2 right-0 sm:-right-2 z-20 bg-primary text-black font-black text-[11px] px-3.5 py-1.5 rounded-full shadow-xl uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Sparkles size={12} />
                      {slides[current].title}
                    </motion.div>
                  )}

                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
