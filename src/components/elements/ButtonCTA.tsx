"use client";

import { motion } from "../../lib/libraries";
import * as Icons from "../../lib/libraries";

interface ButtonCTAProps {
  link: string;
  label: string;
  iconName?: string;
  className?: string;
}

export function ButtonCTA({ link, label, iconName, className }: ButtonCTAProps) {
  // Resolve icon dynamically if iconName is provided
  const iconFormatted = iconName ? iconName.charAt(0).toUpperCase() + iconName.slice(1) : "";
  const Icon = iconFormatted ? (Icons as any)[iconFormatted] : null;

  return (
    <motion.a
      href={link || "#"}
      className={`inline-flex items-center gap-2 bg-zinc-900 text-[#94CE00] border border-zinc-800 px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all cursor-pointer shadow-xl ${className || ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon size={20} />}
      {label}
    </motion.a>
  );
}
