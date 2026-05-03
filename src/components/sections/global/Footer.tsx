"use client";

import { motion, Link, Image, useSearchParams } from "../../../lib/libraries";
import { getTranslation } from "../../../lib/i18n";
import { GlobalModel } from "../../../types/strapi.global.model";
import { getStrapiMedia } from "../../../services/strapi.service";
import { DynamicIcon } from "../../elements/DynamicIcon";

interface FooterProps {
  data: GlobalModel;
}

export default function Footer({ data }: FooterProps) {
  const searchParams = useSearchParams();
  const language = searchParams.get('lang') || 'es';
  const currentYear = new Date().getFullYear();
  const { footer, logo_global } = data;
  const redes = footer.redes_sociais?.[0]; // Assuming it's an array with one item from Strapi

  return (
    <footer className="bg-black border-t border-[#94CE00]/30 py-12">
      <div className="max-w-[1920px] mx-auto px-6 md:px-24">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href={`/?lang=${language}`} className="inline-block mb-4">
              <Image
                src={getStrapiMedia(logo_global?.url) || "/img/logo-compact-dark.png"}
                alt="Elite Play Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-white/70 mb-4 max-w-md">
              {getTranslation(footer.description, language)}
            </p>
            {/* Social Media */}
            {redes && (
              <div className="flex gap-4">
                {redes.link_instagram && (
                  <motion.a
                    href={redes.link_instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#94CE00]/10 border border-[#94CE00] flex items-center justify-center text-[#94CE00] hover:bg-[#94CE00] hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DynamicIcon iconName="Instagram" size={20} fallback={() => null} />
                  </motion.a>
                )}
                {redes.link_facebook && (
                  <motion.a
                    href={redes.link_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#94CE00]/10 border border-[#94CE00] flex items-center justify-center text-[#94CE00] hover:bg-[#94CE00] hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DynamicIcon iconName="Facebook" size={20} fallback={() => null} />
                  </motion.a>
                )}
                {redes.link_twiter && (
                  <motion.a
                    href={redes.link_twiter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#94CE00]/10 border border-[#94CE00] flex items-center justify-center text-[#94CE00] hover:bg-[#94CE00] hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DynamicIcon iconName="Twitter" size={20} fallback={() => null} />
                  </motion.a>
                )}
                {redes.link_linkedin && (
                  <motion.a
                    href={redes.link_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#94CE00]/10 border border-[#94CE00] flex items-center justify-center text-[#94CE00] hover:bg-[#94CE00] hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DynamicIcon iconName="Linkedin" size={20} fallback={() => <span className="text-xs font-bold">in</span>} />
                  </motion.a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          {footer.links && footer.links.length > 0 && (
            <div>
              <h3 className="text-white font-bold mb-4 italic" style={{ transform: 'skewX(-2deg)' }}>
                Links
              </h3>
              <ul className="space-y-2">
                {footer.links.map((linkItem) => (
                  <li key={linkItem.id}>
                    <Link
                      href={`${linkItem.link}?lang=${language}`}
                      className="text-white/70 hover:text-[#94CE00] transition-colors"
                    >
                      {getTranslation(linkItem.title, language)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          {footer.contato && (
            <div>
              <h3 className="text-white font-bold mb-4 italic" style={{ transform: 'skewX(-2deg)' }}>
                Contato
              </h3>
              <ul className="space-y-2 text-white/70">
                {footer.contato.email && <li>{footer.contato.email}</li>}
                {footer.contato.telefone && <li>{footer.contato.telefone}</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#94CE00]/30 pt-8 text-center">
          <p className="text-white/50">
            © {currentYear} Elite Play. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
