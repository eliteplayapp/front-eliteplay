import { getTranslation } from "../../../lib/i18n";

export default function ArenasPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const language = (searchParams.lang as string) || "es";

  return (
    <div className="min-h-screen pt-32 px-6 md:px-24">
      <h1 className="text-4xl font-bold text-white mb-8">
        Nossas Arenas
      </h1>
      <p className="text-zinc-400 text-lg max-w-2xl">
        Conheça os espaços ElitePlay parceiros onde você pode desfrutar da melhor experiência de entretenimento.
      </p>

      {/* Exemplo de grid de conteúdo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-video bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:border-[#94CE00]/50 transition-colors cursor-pointer group">
            <span className="text-white/40 group-hover:text-[#94CE00] transition-colors font-medium">Arena Exemplo {i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
