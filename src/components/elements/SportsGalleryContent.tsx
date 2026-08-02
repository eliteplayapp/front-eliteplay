"use client";

import { SectionCtaOne } from "../../types/strapi.home.model";
import { getMediaUrl, toStr } from "../../services/content.service";
import { VideoPlayer } from "./VideoPlayer";

interface SportsGalleryContentProps {
  sport: SectionCtaOne;
}

export function SportsGalleryContent({ sport }: SportsGalleryContentProps) {
  const title = toStr(sport.title);
  const subtitle = toStr(sport.subtitle);
  
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
      <div className="space-y-8">
        <h3 
          className="text-4xl md:text-5xl font-black text-white italic leading-tight uppercase" 
          style={{ transform: 'skewX(-3deg)' }}
        >
          {title}
        </h3>
        <p className="text-zinc-400 text-xl leading-relaxed max-w-lg font-light">
          {subtitle}
        </p>
        <ul className="space-y-5">
          {sport.itens?.map((item: any, idx: number) => (
            <li 
              key={item.id || idx} 
              className="flex items-center gap-4 text-white uppercase font-black tracking-wider text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(148,206,0,0.8)]"></div>
              {toStr(item.item)}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-full flex items-center justify-center">
        <VideoPlayer
          variant="gallery"
          thumbnailUrl={getMediaUrl(sport.video.conteudo.url) || ""}
          videoUrl={sport.video.link || ""}
          alt={title}
        />
        
        {/* Decorative glow */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}
