import { getPaginaInicial } from "../global/services/strapi.service";
import BannerOne from "../sections/banner_one";
import SportsCarroucel from "../sections/sports_carroucel";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const language = (params.lang as string) || "es";
  const pageData = await getPaginaInicial();

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center text-white">Erro ao carregar dados da página.</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <BannerOne data={pageData.banner_home_page} language={language} />
      <SportsCarroucel language={language} />
      {/* Aqui entrarão as outras seções conforme forem criadas */}
    </div>
  );
}
