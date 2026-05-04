import BannerTwo from "../../../components/sections/arenas/banner_two";
import { getPaginaArenas } from "@/src/services/strapi.service";

export default async function ArenasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const language = (params.lang as string) || "es";
  const pageData = await getPaginaArenas();

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center text-white">Erro ao carregar dados da página.</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <BannerTwo data={pageData.banner} language={language} />
    </div>
  );
}
