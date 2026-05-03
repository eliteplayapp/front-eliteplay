"use client";

import { useState } from "react";
import { 
  motion, 
  AnimatePresence, 
  ChevronDown
} from "../../../lib/libraries";
import * as Icons from "../../../lib/libraries";
import { SectionSports } from "../../../types/strapi.home.model";
import { getTranslation } from "../../../lib/i18n";
import { getStrapiMedia } from "../../../services/strapi.service";
import { GalleryTabButton } from "../../elements/GalleryTabButton";
import { SportsGalleryContent } from "../../elements/SportsGalleryContent";

interface SportsGallerySectionProps {
  data: SectionSports;
  language: string;
}

export default function SportsGallerySection({ data, language }: SportsGallerySectionProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  if (!data || !data.sports || data.sports.length === 0) return null;

  const badge = getTranslation(data.tooltip, language);
  const title = getTranslation(data.title, language);

  const activeSport = data.sports[activeTabIndex];
  const activeIconName = activeSport.tooltip ? getTranslation(activeSport.tooltip, language) : "Sparkles";
  
  // Resolve icon for the active tab (mobile dropdown)
  const iconFormatted = activeIconName.charAt(0).toUpperCase() + activeIconName.slice(1);
  const ActiveIcon = (Icons as any)[iconFormatted] || Icons.Sparkles;

  return (
    <section id="sports-gallery" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-40"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        <div className="text-left md:text-center mb-12">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-[#94CE00] text-xs font-black tracking-widest uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#94CE00] animate-pulse" />
              {badge}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white italic tracking-tight mb-8 uppercase"
            style={{ transform: 'skewX(-3deg)' }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Tab Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          {/* Mobile Select (Custom Dropdown) */}
          <div className="md:hidden relative w-full z-50">
            <button
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              className="w-full bg-zinc-900 text-white px-6 py-4 rounded-xl border border-white/10 font-bold uppercase tracking-widest flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ActiveIcon className="w-5 h-5 text-[#94CE00]" />
                <span>{getTranslation(activeSport.tooltip, language)}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[#94CE00] transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSelectOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[60]"
                >
                  {data.sports.map((sport, index) => (
                    <GalleryTabButton
                      key={sport.id || index}
                      variant="mobile"
                      iconName={getTranslation(sport.tooltip, language)}
                      label={getTranslation(sport.titulo, language)}
                      isActive={activeTabIndex === index}
                      onClick={() => {
                        setActiveTabIndex(index);
                        setIsSelectOpen(false);
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {data.sports.map((sport, index) => (
              <GalleryTabButton
                key={sport.id || index}
                iconName={getTranslation(sport.tooltip, language)}
                label={getTranslation(sport.titulo, language)}
                isActive={activeTabIndex === index}
                onClick={() => setActiveTabIndex(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Active Content */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 border border-white/5 min-h-[500px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <SportsGalleryContent sport={activeSport} language={language} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
