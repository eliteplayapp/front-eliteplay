import { getPaginaInicial } from "../global/services/strapi.service";

export default async function Home() {
  const pageData = await getPaginaInicial();

  return (
    <div className="min-h-screen pt-24 px-6 md:px-24">
      <h1 className="text-4xl font-bold text-white mb-8">
        Bem-vindo à ElitePlay
      </h1>
      <p className="text-zinc-400 text-lg">
        {pageData ? "Dados carregados do Strapi com sucesso!" : "Página inicial em desenvolvimento."}
      </p>
      
      {/* Aqui entrarão as seções como Hero, Sports, etc */}
      <div className="mt-12 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
        <p className="text-white/60 italic">
          O conteúdo principal da página será construído utilizando os componentes das seções.
        </p>
      </div>
    </div>
  );
}
