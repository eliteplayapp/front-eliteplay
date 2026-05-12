"use client";

import { motion } from "../../lib/libraries";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  align = "left", 
  dark = false,
  className = "" 
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = dark ? "text-white" : "text-black";
  
  return (
    <motion.div
      className={`mb-12 lg:mb-16 ${alignClasses} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 
        className={`text-4xl md:text-6xl font-black ${titleColor} mb-4 italic uppercase tracking-tight leading-[1.1]`}
        style={{ transform: 'skewX(-3deg)' }}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p 
          className="text-xl md:text-2xl text-primary font-bold uppercase tracking-widest italic" 
          style={{ transform: 'skewX(-2deg)' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
