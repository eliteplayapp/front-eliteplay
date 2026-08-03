"use client";

import { useState, useEffect } from "react";
import { motion } from "../../../lib/libraries";
import { SectionInstructions } from "../../../types/strapi.home.model";
import { toStr, getMediaUrl } from "../../../services/content.service";
import Image from "next/image";
import imagesData from "../../../data/images.json";

interface HowItWorksSectionProps {
  data: SectionInstructions;
}

const STEP_DURATION = 2500;

interface StepCardProps {
  title: string;
  desc: string;
  imageUrl: string;
  index: number;
  isActive: boolean;
  align?: "left" | "right";
}

function StepCard({ title, desc, imageUrl, index, isActive, align = "left" }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative w-full rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-500 bg-zinc-950/90 ${
        isActive
          ? "border-primary/80 shadow-[0_0_30px_rgba(148,206,0,0.25)] scale-[1.02]"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className={`flex flex-col sm:flex-row items-stretch ${align === "right" ? "sm:flex-row-reverse" : ""}`}>
        {/* Imagem com altura expandida */}
        <div className="relative w-full sm:w-44 md:w-48 lg:w-56 shrink-0 aspect-[16/9] sm:aspect-auto overflow-hidden min-h-[140px] md:min-h-[160px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: isActive ? "scale(1.08)" : "scale(1)" }}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-zinc-950/95 via-zinc-950/40 to-transparent" />

          {/* Número Badge */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-black font-black text-xs flex items-center justify-center shadow-[0_0_14px_rgba(148,206,0,0.85)]">
            {index + 1}
          </div>
        </div>

        {/* Conteúdo textual */}
        <div className={`flex-1 p-5 md:p-6 flex flex-col justify-center ${align === "right" ? "sm:text-right" : "sm:text-left"}`}>
          <h3
            className={`text-base md:text-lg font-black uppercase italic leading-tight mb-2 transition-colors duration-500 ${
              isActive ? "text-primary" : "text-white"
            }`}
          >
            {title}
          </h3>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">{desc}</p>
        </div>
      </div>

      {/* Bar de passo ativo */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary"
          layoutId="activeStepLine"
        />
      )}
    </motion.div>
  );
}

export default function HowItWorksSection({ data }: HowItWorksSectionProps) {
  if (!data) return null;

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, []);

  const badge = toStr(data.tooltip_one);
  const title = toStr(data.title);
  const subtitle = toStr(data.subtitle);
  const callout = toStr(data.tooltip_two);
  const steps = data.instructions ?? [];

  const getStepData = (idx: number) => {
    const s = steps[idx];
    if (!s) return { title: "", desc: "", imageUrl: "" };
    const t = typeof s.title_card === "string" ? s.title_card : (s.title_card as any)?.language_pt ?? "";
    const d = typeof s.subtitle_card === "string" ? s.subtitle_card : (s.subtitle_card as any)?.language_pt ?? "";
    const fallback = (imagesData as any).home?.how_it_works?.[idx % 4] ?? "/img/passo1.jpg";
    const img = getMediaUrl((s.img_instruction as any)?.url) || fallback;
    return { title: t, desc: d, imageUrl: img };
  };

  return (
    <section id="how-it-works" className="relative bg-black overflow-hidden py-14 md:py-20">
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(148,206,0,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 relative z-20">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-primary text-xs font-black tracking-widest uppercase mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {badge}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tight mb-3 leading-tight uppercase"
            style={{ transform: "skewX(-3deg)" }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-base md:text-lg max-w-3xl mx-auto font-light"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Layout Principal: Cards nas laterais e Botão com 4 Setas no Centro */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Coluna Esquerda: Cards 1 e 2 */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-5 z-10 relative">
            <StepCard {...getStepData(0)} index={0} isActive={activeStep === 0} align="right" />
            <StepCard {...getStepData(1)} index={1} isActive={activeStep === 1} align="right" />
          </div>

          {/* Coluna Central: BOTÃO DESTAQUE + 4 SETAS ELEGANTES */}
          <div className="md:col-span-2 lg:col-span-4 flex flex-col items-center justify-center relative py-6 z-10">
            {/* 1. Seta Superior Esquerda: Descendo para o Botão */}
            <div className="hidden lg:block absolute -left-16 top-0 w-36 h-28 pointer-events-none overflow-visible drop-shadow-[0_0_8px_rgba(148,206,0,0.5)]">
              <svg viewBox="0 0 140 100" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="arrowGradTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94CE00" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#94CE00" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 15 25 C 50 15, 90 25, 110 65"
                  stroke="url(#arrowGradTopLeft)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon points="110,72 98,59 112,56" fill="#94CE00" />
              </svg>
            </div>

            {/* 2. Seta Superior Direita: Descendo para o Botão */}
            <div className="hidden lg:block absolute -right-16 top-0 w-36 h-28 pointer-events-none overflow-visible drop-shadow-[0_0_8px_rgba(148,206,0,0.5)]">
              <svg viewBox="0 0 140 100" fill="none" className="w-full h-full overflow-visible scale-x-[-1]">
                <defs>
                  <linearGradient id="arrowGradTopRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94CE00" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#94CE00" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 15 25 C 50 15, 90 25, 110 65"
                  stroke="url(#arrowGradTopRight)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon points="110,72 98,59 112,56" fill="#94CE00" />
              </svg>
            </div>

            {/* 3. Seta Inferior Esquerda: Subindo para o Botão */}
            <div className="hidden lg:block absolute -left-16 bottom-0 w-36 h-28 pointer-events-none overflow-visible drop-shadow-[0_0_8px_rgba(148,206,0,0.5)]">
              <svg viewBox="0 0 140 100" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="arrowGradBottomLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94CE00" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#94CE00" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 15 75 C 50 85, 90 75, 110 30"
                  stroke="url(#arrowGradBottomLeft)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon points="110,24 98,37 112,40" fill="#94CE00" />
              </svg>
            </div>

            {/* 4. Seta Inferior Direita: Subindo para o Botão */}
            <div className="hidden lg:block absolute -right-16 bottom-0 w-36 h-28 pointer-events-none overflow-visible drop-shadow-[0_0_8px_rgba(148,206,0,0.5)]">
              <svg viewBox="0 0 140 100" fill="none" className="w-full h-full overflow-visible scale-x-[-1]">
                <defs>
                  <linearGradient id="arrowGradBottomRight" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94CE00" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#94CE00" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 15 75 C 50 85, 90 75, 110 30"
                  stroke="url(#arrowGradBottomRight)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon points="110,24 98,37 112,40" fill="#94CE00" />
              </svg>
            </div>

            {/* Elemento do Botão em Destaque no Meio */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[330px] lg:h-[330px] rounded-3xl bg-zinc-900/90 border border-white/10 p-4 shadow-[0_0_60px_rgba(148,206,0,0.25)] flex items-center justify-center backdrop-blur-md"
            >
              {/* Anéis de brilho pulsantes */}
              <motion.div
                className="absolute inset-[-14px] rounded-[34px] border border-primary/30 pointer-events-none"
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative w-full h-full">
                <Image
                  src="/img/button_quadra.png"
                  alt="Botão Quadra ElitePlay"
                  fill
                  className="object-contain drop-shadow-[0_0_35px_rgba(148,206,0,0.4)]"
                  unoptimized
                />
              </div>

              {/* Tag / Badge no topo do botão */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-primary text-black text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(148,206,0,0.8)] whitespace-nowrap flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                Aperte para gravar
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita: Cards 3 e 4 */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-5 z-10 relative">
            <StepCard {...getStepData(2)} index={2} isActive={activeStep === 2} align="left" />
            <StepCard {...getStepData(3)} index={3} isActive={activeStep === 3} align="left" />
          </div>
        </div>

        {/* Callout Inferior */}
        {callout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 md:mt-12 flex items-center justify-center"
          >
            <div className="flex items-center gap-3 bg-zinc-950/90 border border-white/10 rounded-xl px-6 py-3 shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0 shadow-[0_0_10px_rgba(148,206,0,0.8)]" />
              <p className="text-white/80 text-xs md:text-sm font-medium">
                {callout.includes("30 segundos") ? (
                  <>
                    {callout.split("30 segundos")[0]}
                    <span className="text-primary font-black">30 segundos</span>
                    {callout.split("30 segundos")[1]}
                  </>
                ) : (
                  callout
                )}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
