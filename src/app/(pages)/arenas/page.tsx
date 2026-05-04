import BannerTwo from "../../../components/sections/arenas/banner_two";
import ProcessSection from "../../../components/sections/arenas/ProcessSection";
import ComparisonSection from "../../../components/sections/arenas/ComparisonSection";
import BenefitsSection from "../../../components/sections/arenas/BenefitsSection";
import ImpactSection from "../../../components/sections/arenas/ImpactSection";
import SportsCarroucel from "../../../components/sections/global/sports_carroucel";
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
      <SportsCarroucel language={language} />
      <ProcessSection data={pageData.section_installation} language={language} />
      <ComparisonSection data={pageData.section_comparative} language={language} />
      <BenefitsSection data={pageData.section_differential} language={language} />
      <ImpactSection data={pageData.section_impact} language={language} />
    </div>
  );
}
