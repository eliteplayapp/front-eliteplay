"use client";

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  Plus,
  Minus,
} from "../../../lib/libraries";
import { toStr } from "@/src/services/content.service";
import type { SectionFaq } from "../../../types/strapi.arena.model";

interface FAQSectionProps {
  data: SectionFaq;
  language: string;
}

export default function FAQSection({ data, language }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) return null;

  const title = toStr(data.title);
  const subtitle = toStr(data.subtitle);

  return (
    <section className="py-24 bg-zinc-900/20 relative border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-6 md:px-24">
        {/* Header */}
        <motion.div
          className="text-left md:text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 italic uppercase tracking-tight" style={{ transform: 'skewX(-3deg)' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-primary font-bold uppercase tracking-widest italic" style={{ transform: 'skewX(-2deg)' }}>
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {data.itens?.map((faq: any, index: number) => {
            const question = faq.question;
            const answer = faq.answer;
            const isOpen = openFaq === index;

            return (
              <motion.div
                key={faq.id || index}
                className={`bg-black/40 backdrop-blur-sm border transition-all duration-300 rounded-2xl overflow-hidden ${isOpen ? 'border-primary/30' : 'border-white/5'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between group"
                >
                  <span className={`text-xl font-bold transition-colors pr-8 ${isOpen ? 'text-primary' : 'text-white'}`}>
                    {question}
                  </span>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shrink-0 ${isOpen ? 'bg-primary border-primary' : 'border-white/10'}`}>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-black" />
                    ) : (
                      <Plus className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-white/60 leading-relaxed max-w-3xl text-lg font-light">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
