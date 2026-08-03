"use client";

import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  Image,
  ChevronDown
} from '../../../lib/libraries';
import type { BannerHomePage } from "../../../types/strapi.home.model";
import { getMediaUrl, toStr } from '@/src/services/content.service';
import imagesData from "@/src/data/images.json";

interface BannerOneProps {
  data: BannerHomePage;
}

export default function BannerOne({ data }: BannerOneProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fallbackBanners = Array.isArray(imagesData.home.banner)
    ? imagesData.home.banner
    : [imagesData.home.banner || "/img/image_banner.png"];

  const validPropsImages = (data?.imgs_banner || []).filter((img) => img.url && img.url.trim() !== "");

  const imageList: Array<{ url: string; alternativeText?: string | null }> =
    validPropsImages.length > 0
      ? validPropsImages
      : fallbackBanners.map((url) => ({ url, alternativeText: "Banner ElitePlay" }));

  useEffect(() => {
    if (imageList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageList.length]);

  const currentImage = imageList[currentImageIndex];
  const bgImageUrl = getMediaUrl(currentImage?.url) || "/img/image_banner.png";
  const logoBannerUrl = getMediaUrl(data?.logo_banner?.url) || imagesData.global.logo;

  const rawDescription = toStr(data?.description_banner);
  const periodIndex = rawDescription.indexOf('.');
  let firstLine = rawDescription;
  let secondLine = "";

  if (periodIndex !== -1 && periodIndex < rawDescription.length - 1) {
    firstLine = rawDescription.substring(0, periodIndex + 1).trim();
    secondLine = rawDescription.substring(periodIndex + 1).trim();
  }

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] md:max-h-[90vh] flex items-center justify-start overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 7, ease: "linear" }
          }}
        >
          <Image
            src={bgImageUrl}
            alt={currentImage?.alternativeText || "Sports action banner"}
            fill
            priority
            className="object-cover object-center md:object-[right_center]"
            unoptimized
          />
          {/* Dark gradient overlay: solid dark on left, fading to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30 md:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10 md:hidden" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-20 max-w-[1920px] w-full mx-auto px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start justify-center max-w-2xl py-20"
        >


          {/* Accent Line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "3.5rem" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 bg-primary rounded-full mb-6"
          />

          {/* Description Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-left">
            <span className="block text-white mb-2 drop-shadow-sm">{firstLine}</span>
            {secondLine && (
              <span className="block text-primary font-bold drop-shadow-sm">
                {secondLine}
              </span>
            )}
          </h1>
        </motion.div>
      </div>

      {/* Logo — bottom-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        className="absolute bottom-8 right-6 md:right-12 z-30"
      >
        <Image
          src={logoBannerUrl}
          alt="ElitePlay"
          width={65}
          height={20}
          className="w-16 sm:w-20 md:w-24 h-auto drop-shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
          priority
          unoptimized
        />
      </motion.div>

      {/* Scroll indicator for mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden z-20 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator for desktop */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
