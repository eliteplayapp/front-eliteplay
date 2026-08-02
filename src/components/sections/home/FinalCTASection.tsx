"use client";

import { motion } from "../../../lib/libraries";
import { SectionDownloadApp } from "../../../types/strapi.home.model";
import { toStr } from "@/src/services/content.service";

interface FinalCTASectionProps {
  data: SectionDownloadApp;
}

const buttonTranslations: Record<string, { apple: string; google: string }> = {
  "pt-br": { apple: "Download na", google: "Download no" },
  "en": { apple: "Download on the", google: "Get it on" },
  "es": { apple: "Descárgalo en la", google: "Disponible en" },
};

export default function FinalCTASection({ data }: FinalCTASectionProps) {
  if (!data) return null;

  const t = buttonTranslations["pt-br"];

  return (
    <section id="app" className="pt-16 pb-24 md:py-32 bg-black relative overflow-hidden border-t border-primary/20">
      {/* Neon glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_80%,transparent)]" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 italic" style={{ transform: 'skewX(-3deg)' }}>
              <span className="text-primary drop-shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_60%,transparent)]">
                {toStr(data.title)}
              </span>
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold text-white/80 mb-8 italic" style={{ transform: 'skewX(-3deg)' }}>
              {toStr(data.subtitle)}
            </h3>
          </motion.div>

          <motion.div
            className="flex flex-row gap-3 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.link_apple_store && (
              <motion.a
                href={data.link_apple_store}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-transparent text-white border border-white/50 px-3 md:px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="-1.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-102.000000, -7439.000000)" fill="currentColor">
                      <g transform="translate(56.000000, 160.000000)">
                        <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-semibold leading-none mb-1">{t.apple}</span>
                <span className="text-sm md:text-xl font-bold leading-none">App Store</span>
              </div>
              </motion.a>
            )}

            {data.link_google_play && (
              <motion.a
                href={data.link_google_play}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-transparent text-white border border-white/50 px-3 md:px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path d="m12.954 11.616 2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462 3.074-1.729c.6-.336.929-.812.929-1.34 0-.527-.329-1.004-.928-1.34l-2.783-1.563-3.133 3.132 2.841 2.84zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098L4.1 4.002zm8.854 8.855L4.902 20.91c.154.059.32.09.495.09.312 0 .637-.092.968-.276l9.255-5.197-2.666-2.67z"></path>
                </g>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-semibold leading-none mb-1">{t.google}</span>
                <span className="text-sm md:text-xl font-bold leading-none">Google Play</span>
              </div>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
