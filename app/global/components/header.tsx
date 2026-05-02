import Image from "next/image";
import Link from "next/link";
import localLogo from "@/public/img/logo-compact-dark.png";

export default function Header({ logoUrl, logoAlt, navLinks, langOptions }: any) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-[1920px] mx-auto px-24 h-16 flex items-center justify-between">

        <Link href="/" aria-label={`${logoAlt} Home`}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={120}
              height={36}
              className="object-contain"
            />
          ) : (
            <Image
              src={localLogo}
              alt={logoAlt}
              height={36}
              placeholder="blur"
              className="object-contain"
            />
          )}
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-8">
            {navLinks.map((link: any) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {langOptions.map((opt: any, i: number) => (
            <span key={opt.href} className="flex items-center gap-3">
              {i > 0 && <span className="text-white/20" aria-hidden="true">|</span>}
              <a
                href={opt.href}
                aria-label={opt.ariaLabel}
                className={`text-xs font-medium transition-colors duration-200 ${opt.isActive ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
              >
                {opt.label}
              </a>
            </span>
          ))}
        </div>

      </div>
    </header>
  );
}
