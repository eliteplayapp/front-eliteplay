import Image from "next/image";
import Link from "next/link";


export default function Header({
  logoUrl,
  logoAlt = "ElitePlay",
  navLinks = [],
  langOptions = []
}: any) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-[1920px] mx-auto px-24 h-16 flex items-center justify-between">
        <Link href="/" aria-label={`${logoAlt} Home`}>
          <Image
            src={logoUrl!}
            alt={logoAlt}
            width={120}
            height={36}
            className="object-contain"
            unoptimized
          />
        </Link>

      </div>
    </header>
  );
}
