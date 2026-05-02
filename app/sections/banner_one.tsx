"use client";

import { useEffect, useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  Image, 
  ChevronDown 
} from '../global/lib/libraries';
import { getTranslation } from "../global/lib/i18n";
import { getStrapiMedia } from "../global/services/strapi.service";
import type { BannerHomePage } from "../global/types/strapi.home.model";

interface BannerOneProps {
  data: BannerHomePage;
  language: string;
}

export default function BannerOne({ data, language }: BannerOneProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = data?.imgs_banner || [];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];


  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      <AnimatePresence>
        {currentImage && (
          <motion.div
            key={currentImage.id}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: 7, ease: "linear" }
            }}
          >
            <Image
              src={getStrapiMedia(currentImage.url)!}
              alt={currentImage.alternativeText || "Sports action"}
              fill
              priority
              className="object-cover"
              unoptimized
            />
            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Content */}
      <div className="relative z-10 max-w-[1920px] w-full mx-auto px-6 md:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Logo / Image Banner from public folder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8"
          >
            <Image 
              src="/img/image_banner.png" 
              alt="Elite Play Banner" 
              width={600}
              height={200}
              className="w-full max-w-[600px] h-auto drop-shadow-[0_0_20px_rgba(148,206,0,0.3)]"
              priority
            />
          </motion.div>
          
          <p className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed px-6 tracking-[0.2em] uppercase text-center max-w-4xl">
            {getTranslation(data?.description_banner, language)}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator for mobile (Arrow) */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-[#94CE00]" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator for desktop (Mouse) */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#94CE00]/30 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-[#94CE00] rounded-full" 
          />
        </div>
      </motion.div>
      
    </section>
  );
}
