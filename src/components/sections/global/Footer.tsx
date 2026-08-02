"use client";

import { Suspense } from "react";
import { motion, Link, Image, useSearchParams } from "../../../lib/libraries";
import { GlobalModel } from "../../../types/strapi.global.model";
import { getMediaUrl, getDictionary } from "../../../services/content.service";

interface FooterProps {
  data?: GlobalModel;
}

function FooterContent({ data: _data }: FooterProps) {
  const searchParams = useSearchParams();
  const language = searchParams.get('lang') || 'es';
  const currentYear = new Date().getFullYear();
  
  const dict = getDictionary(language);
  const { footer, logo_global, redes_sociais } = dict.global;
  const redes = redes_sociais?.[0];

  return (

     <footer className="bg-black border-t border-primary/30 py-12">
      <div className="max-w-[1920px] mx-auto px-6 md:px-24">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href={`/?lang=${language}`} className="inline-block mb-4">
              <Image
                src={getMediaUrl(logo_global?.url) || "/img/logo-compact-dark.png"}
                alt="Elite Play Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-white/70 mb-4 max-w-md">
              {typeof footer.description === 'string' ? footer.description : (footer.description as any)?.language_pt || ""}
            </p>
            {/* Social Media */}
            {redes && (
              <div className="flex gap-4">
                {redes.link_instagram && (
                  <motion.a
                    href={redes.link_instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </motion.a>
                )}
                {redes.link_facebook && (
                  <motion.a
                    href={redes.link_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </motion.a>
                )}
                {redes.link_twiter && (
                  <motion.a
                    href={redes.link_twiter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </motion.a>
                )}
                {redes.link_linkedin && (
                  <motion.a
                    href={redes.link_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
                {footer.links.map((linkItem: any) => (
                  <li key={linkItem.id}>
                    <Link
                      href={`${linkItem.link}?lang=${language}`}
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      {typeof linkItem.title === 'string' ? linkItem.title : linkItem.title?.language_pt || ""}
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
        <div className="border-t border-primary/30 pt-8 text-center">
          <p className="text-white/50">
            © {currentYear} Elite Play. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Footer({ data }: FooterProps) {
  return (
    <Suspense fallback={null}>
      <FooterContent data={data} />
    </Suspense>
  );
}
