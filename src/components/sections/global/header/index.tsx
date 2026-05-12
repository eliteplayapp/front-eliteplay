"use client";

import { useEffect, useState, Suspense } from 'react';
import {
  Link,
  usePathname,
  useSearchParams,
  motion,
  AnimatePresence,
  Menu,
  X,
  Image
} from '../../../../lib/libraries';
import LanguageSelector from './LanguageSelector';
import { getTranslation } from "../../../../lib/i18n";
import { ButtonCTA } from "../../../elements/ButtonCTA";
import type { StrapiHeader } from "../../../../types/strapi.global.model";

interface HeaderProps {
  logoUrl?: string | null;
  logoAlt?: string;
  headerData?: StrapiHeader;
}

function HeaderContent({
  logoUrl,
  logoAlt = "ElitePlay",
  headerData
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const language = (searchParams.get("lang") || "es") as string;

  const menuItems = headerData?.menu_header || [];
  const ctaButton = headerData?.button_cta_header;


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${isMobileMenuOpen
        ? 'bg-black'
        : isScrolled
          ? 'bg-black/90 backdrop-blur-[10px] shadow-lg transition-all duration-500'
          : 'bg-transparent backdrop-blur-[8px] bg-white/[0.02] transition-all duration-500'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        borderBottom: isScrolled || isMobileMenuOpen ? '1px solid rgba(148, 206, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <Image
              src={logoUrl!}
              alt={logoAlt}
              width={180}
              height={40}
              className="h-8 md:h-9 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const label = getTranslation(item.text_button, language);
              return (
                <Link
                  key={item.id}
                  href={item.link!}
                  className={`text-sm transition-all duration-300 ${pathname === item.link ? 'text-primary' : 'text-white hover:text-primary'}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* CTA and Language Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector variant="desktop" />

            {ctaButton && (
              <ButtonCTA
                link={ctaButton.link || "/arenas"}
                label={getTranslation(ctaButton.text_button, language)}
                variant="primary"
                size="sm"
              />
            )}
          </div>

          {/* Mobile Menu Button and CTA */}
          <div className="md:hidden flex items-center gap-4 z-50">
            {ctaButton && (
              <ButtonCTA
                link={ctaButton.link || "/arenas"}
                label={getTranslation(ctaButton.text_button, language)}
                variant="primary"
                size="sm"
                className="!py-1.5 !px-3 !rounded-lg"
              />
            )}
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black z-40 pt-20"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8 p-8">
              {menuItems.map((item) => {
                const label = getTranslation(item.text_button, language);

                return (
                  <Link
                    key={item.id}
                    href={item.link!}
                    onClick={closeMobileMenu}
                    className={`text-xl transition-colors ${pathname === item.link ? 'text-primary' : 'text-white'}`}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Language Selector - Mobile */}
              <LanguageSelector variant="mobile" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default function Header({
  logoUrl,
  logoAlt = "ElitePlay",
  headerData
}: HeaderProps) {
  return (
    <Suspense fallback={null}>
      <HeaderContent logoUrl={logoUrl} logoAlt={logoAlt} headerData={headerData} />
    </Suspense>
  );
}
