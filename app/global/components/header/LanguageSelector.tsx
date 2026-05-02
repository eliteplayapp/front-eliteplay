"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Globe } from "../../lib/libraries";

export default function LanguageSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentLang = searchParams.get("lang") || "pt-br";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);
    
    // Força o recarregamento da página conforme regra do AGENTS.md
    window.location.href = `?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full transition-colors hover:bg-white/10">
      <Globe className="w-4 h-4 text-white/60" />
      <select
        value={currentLang}
        onChange={handleChange}
        className="bg-transparent text-sm text-white outline-none cursor-pointer appearance-none pr-1"
        aria-label="Selecionar idioma"
      >
        <option value="pt-br" className="bg-zinc-900 text-white">PT</option>
        <option value="es" className="bg-zinc-900 text-white">ES</option>
        <option value="en" className="bg-zinc-900 text-white">EN</option>
      </select>
    </div>
  );
}
