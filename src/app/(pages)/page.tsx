import BannerOne from "../../components/sections/home/banner_one";
import SportsCarroucel from "../../components/sections/global/sports_carroucel";
import HowItWorksSection from "../../components/sections/home/HowItWorksSection";
import SportsGallerySection from "../../components/sections/home/SportsGallerySection";
import CaptureSection from "../../components/sections/home/CaptureSection";
import { getPaginaInicial } from "@/src/services/strapi.service";

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
      <HowItWorksSection data={pageData.section_instructions} language={language} />
      <SportsGallerySection data={pageData.section_sports} language={language} />
      <CaptureSection data={pageData.section_cta} language={language} />
      {/* Aqui entrarão as outras seções conforme forem criadas */}
    </div>
  );
}
