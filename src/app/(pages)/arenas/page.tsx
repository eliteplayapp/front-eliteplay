import BannerTwo from "../../../components/sections/arenas/banner_two";
import ProcessSection from "../../../components/sections/arenas/ProcessSection";
import ComparisonSection from "../../../components/sections/arenas/ComparisonSection";
import BenefitsSection from "../../../components/sections/arenas/BenefitsSection";
import ImpactSection from "../../../components/sections/arenas/ImpactSection";
import LeadFormSection from "../../../components/sections/arenas/LeadFormSection";
import FAQSection from "../../../components/sections/arenas/FAQSection";
import SportsCarroucel from "../../../components/sections/global/sports_carroucel";
import { getPaginaArenas } from "@/src/services/content.service";
import { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPaginaArenas("es");
  return {
    title: "Arenas",
    description: pageData?.meta_description || "",
  };
}

export default async function ArenasPage() {
  const pageData = await getPaginaArenas("es");

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Erro ao carregar dados da página.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <BannerTwo data={pageData.banner} />
      <SportsCarroucel />
      <ProcessSection data={pageData.section_installation} />
      <ComparisonSection data={pageData.section_comparative} />
      <BenefitsSection data={pageData.section_differential} />
      <ImpactSection data={pageData.section_impact} />
      <LeadFormSection data={pageData.section_partners} />
      <FAQSection data={pageData.section_faq} />
    </div>
  );
}
