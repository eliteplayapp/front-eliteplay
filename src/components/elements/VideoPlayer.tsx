"use client";

import { useState } from "react";
import { 
  motion, 
  AnimatePresence, 
  Play, 
  X, 
  Image,
  Smartphone
} from "../../lib/libraries";

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  alt: string;
  variant?: "gallery" | "capture";
}

export function VideoPlayer({ thumbnailUrl, videoUrl, alt, variant = "gallery" }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert YouTube link to embed if needed
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1";
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1";
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (variant === "capture") {
    return (
      <>
        <div 
          onClick={() => setIsOpen(true)}
          className="relative rounded-[2.5rem] p-4 border border-zinc-200/50 shadow-2xl transform transition-all duration-500 hover:rotate-1 hover:scale-[1.02] cursor-pointer overflow-hidden bg-white/40 backdrop-blur-md group"
        >
          <div className="aspect-video relative rounded-3xl overflow-hidden border border-zinc-200/50 bg-zinc-100">
            <Image
              src={thumbnailUrl}
              alt={alt}
              width={1200}
              height={675}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Play Button Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-[#94CE00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(148,206,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(148,206,0,0.8)] transition-all duration-500 z-10">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-black fill-black ml-1" />
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 left-6 right-6 hidden md:block">
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#94CE00] flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-white font-bold text-base uppercase tracking-wide leading-tight">Elite Play TV</p>
                  <p className="text-[#94CE00] text-sm font-medium">Assista em ação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VideoModal isOpen={isOpen} onClose={() => setIsOpen(false)} embedUrl={embedUrl} />
      </>
    );
  }

  // Default "gallery" variant
  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="w-full relative aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden shadow-2xl cursor-pointer group"
      >
        <Image
          src={thumbnailUrl}
          alt={alt}
          width={1000}
          height={750}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/40 transition-colors duration-300" />

        {/* Play Button Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#94CE00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(148,206,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(148,206,0,0.8)] transition-all duration-500">
          <Play className="w-8 h-8 text-black fill-black ml-1" />
        </div>

        <div className="absolute bottom-8 left-8 z-10">
          <div className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#94CE00]">
              Elite Play Camera
            </span>
          </div>
        </div>
      </div>
      <VideoModal isOpen={isOpen} onClose={() => setIsOpen(false)} embedUrl={embedUrl} />
    </>
  );
}

// Sub-component for the modal to avoid duplication
function VideoModal({ isOpen, onClose, embedUrl }: { isOpen: boolean, onClose: () => void, embedUrl: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>

            {embedUrl ? (
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title="Elite Play Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl">
                Vídeo não disponível
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
