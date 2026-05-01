'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface BannerProps {
  data: {
    description: string;
    images: string[];
  };
}

export function Banner({ data }: BannerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { description, images } = data;

  useEffect(() => {
    if (!images || images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 5, ease: 'linear' }}
        >
          {images && images[currentImageIndex] && (
            <Image
              src={images[currentImageIndex]}
              alt="Sports action"
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-[1920px] w-full mx-auto px-6 md:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mx-auto"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8"
            >
              <Image 
                src="/img/image_banner.png" 
                alt="Elite Play Logo" 
                width={600}
                height={200}
                className="w-full max-w-[600px] h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              />
            </motion.div>
            
            <p className="text-base md:text-lg lg:text-xl text-white font-light leading-relaxed px-6 tracking-widest uppercase lg:whitespace-nowrap text-center">
              {description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator for mobile (Arrow) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator for desktop (Mouse) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
