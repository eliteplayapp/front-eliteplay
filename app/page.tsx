'use client';

import { Banner } from "@/app/sections/banner";
import { Suspense } from "react";
import { useSearchParams } from "@/app/global/lib/libraries";
import { mockData, getLangKey } from "@/app/global/lib/translations";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Suspense fallback={<div className="min-h-[85vh] bg-black" />}>
        <HomeContent />
      </Suspense>

      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Em breve mais novidades</h2>
        <p className="text-zinc-400">
          Estamos preparando a melhor experiência para você.
        </p>
      </section>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'es';
  const langKey = getLangKey(lang);

  const bannerData = {
    description: mockData.banner[`description_${langKey}`],
    images: mockData.banner.images,
  };

  return <Banner data={bannerData} />;
}


