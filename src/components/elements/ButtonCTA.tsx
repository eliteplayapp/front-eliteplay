"use client";

import { motion } from "../../lib/libraries";
import { DynamicIcon } from "./DynamicIcon";

interface ButtonCTAProps {
  link: string;
  label: string;
  iconName?: string;
  className?: string;
  variant?: "dark" | "primary" | "light";
}

export function ButtonCTA({ link, label, iconName, className, variant = "dark" }: ButtonCTAProps) {
  // Define variant styles
  const variantStyles = {
    dark: "bg-zinc-900 text-[#94CE00] border-zinc-800 hover:bg-zinc-800",
    primary: "bg-[#94CE00] text-black border-[#94CE00] hover:bg-[#7ab300] hover:shadow-[0_0_40px_rgba(148,206,0,0.5)]",
    light: "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-100",
  };

  const currentStyle = variantStyles[variant];

  return (
    <motion.a
      href={link || "#"}
      className={`inline-flex items-center gap-2 border px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xl ${currentStyle} ${className || ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <DynamicIcon iconName={iconName} size={20} fallback={() => null} />
      {label}
    </motion.a>
  );
}
