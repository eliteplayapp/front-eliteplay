"use client";

import { motion } from "../../lib/libraries";
import * as Icons from "../../lib/libraries";

interface GalleryTabButtonProps {
  iconName: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: "desktop" | "mobile";
}

export function GalleryTabButton({ 
  iconName, 
  label, 
  isActive, 
  onClick, 
  variant = "desktop" 
}: GalleryTabButtonProps) {
  // Resolve icon dynamically
  const iconFormatted = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const Icon = (Icons as any)[iconFormatted] || Icons.Sparkles;

  if (variant === "mobile") {
    return (
      <button
        onClick={onClick}
        className={`w-full px-6 py-4 flex items-center gap-3 hover:bg-zinc-800 transition-colors ${
          isActive ? 'text-[#94CE00] bg-zinc-800/50' : 'text-zinc-400'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="font-bold uppercase tracking-widest text-xs">{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all cursor-pointer ${
        isActive
          ? 'bg-[#94CE00] text-black shadow-[0_0_30px_rgba(148,206,0,0.4)] scale-105'
          : 'bg-zinc-900 text-zinc-400 border border-white/5 hover:bg-zinc-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}
