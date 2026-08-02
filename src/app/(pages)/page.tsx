import BannerOne from "../../components/sections/home/banner_one";
import SportsCarroucel from "../../components/sections/global/sports_carroucel";
import HowItWorksSection from "../../components/sections/home/HowItWorksSection";
import SportsGallerySection from "../../components/sections/home/SportsGallerySection";
import CaptureSection from "../../components/sections/home/CaptureSection";
import ArenaDifferentiatorSection from "../../components/sections/home/ArenaDifferentiatorSection";
import FinalCTASection from "../../components/sections/home/FinalCTASection";
import { getPaginaInicial } from "@/src/services/content.service";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const language = (params.lang as string) || "es";
  const pageData = await getPaginaInicial(language);

  return {
    title: {
      absolute: "ElitePlay",
    },
    description: pageData?.meta_description || "",
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const language = (params.lang as string) || "es";
  const pageData = await getPaginaInicial(language);

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center text-white">Erro ao carregar dados da página.</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <BannerOne data={pageData.banner_home_page} />
      <SportsCarroucel />
      <HowItWorksSection data={pageData.section_instructions} />
      <CaptureSection data={pageData.section_cta} />
      <SportsGallerySection data={pageData.section_sports} />
      <ArenaDifferentiatorSection data={pageData.section_cta_simple} />
      <FinalCTASection data={pageData.section_download_app} />
    </div>
  );
}
