"use client";

import { motion } from "../../lib/libraries";

interface SectionBadgeProps {
  text: string;
  className?: string;
}

export function SectionBadge({ text, className = "" }: SectionBadgeProps) {
  if (!text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-primary text-xs font-black tracking-widest uppercase mb-6 ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      {text}
    </motion.div>
  );
}
