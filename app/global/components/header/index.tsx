"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getTranslation } from "../../lib/i18n";
import LanguageSelector from "./LanguageSelector";
import type { StrapiHeader } from "../../types/strapi.global.model";

interface HeaderProps {
  logoUrl: string | null;
  logoAlt: string;
  headerData?: StrapiHeader;
}

export default function Header({
  logoUrl,
  logoAlt = "ElitePlay",
  headerData
}: HeaderProps) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "pt-br";

  const menuItems = headerData?.menu_header || [];
  const ctaButton = headerData?.button_cta_header;

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-[1920px] mx-auto px-24 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label={`${logoAlt} Home`} className="transition-transform hover:scale-105">
          <Image
            src={logoUrl || "/img/logo.png"}
            alt={logoAlt}
            width={160}
            height={48}
            className="object-contain"
            unoptimized
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.link || "#"}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {getTranslation(item.text_button, lang)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <LanguageSelector />
          
          {ctaButton && (
            <Link
              href={ctaButton.link || "#"}
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {getTranslation(ctaButton.text_button, lang)}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
