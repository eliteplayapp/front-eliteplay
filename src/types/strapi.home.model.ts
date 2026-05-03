/**
 * Interface para textos multi-idioma (Padrão ElitePlay)
 */
export interface InputLanguages {
  id: number;
  language_pt: string;
  language_es?: string | null;
  language_en?: string | null;
}

/**
 * Formatos de mídia do Strapi
 */
export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

/**
 * Modelo de Mídia do Strapi 5
 */
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    large?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Componente genérico de Botão
 */
export interface ButtonInfo {
  id: number;
  text_button: InputLanguages;
  link: string;
}

/**
 * Componente de Vídeo
 */
export interface VideoItem {
  id: number;
  link?: string | null;
  conteudo: StrapiMedia;
}

/**
 * Item de Instrução (Componente repetível)
 */
export interface InstructionItem {
  id: number;
  img_instruction: StrapiMedia;
  icon: string; // Custom field (ícone em formato string/slug)
  title_card: InputLanguages;
  subtitle_card: InputLanguages;
}

/**
 * Item de CTA / Lista (Componente repetível)
 */
export interface ItemCta {
  id: number;
  icon: string;
  item: InputLanguages;
}

/**
 * Card CTA Simples (Componente repetível)
 */
export interface CardCtaSimple {
  id: number;
  icon_tooltip: string;
  text_tooltip_one: InputLanguages;
  title_card: InputLanguages;
  subtitle_card: InputLanguages;
}

/**
 * Componente de Banner da Home
 */
export interface BannerHomePage {
  id: number;
  description_banner: InputLanguages;
  imgs_banner: StrapiMedia[];
  logo_banner: StrapiMedia;
}

/**
 * Seção de Instruções (Infos)
 */
export interface SectionInstructions {
  id: number;
  tooltip_one: InputLanguages;
  title: InputLanguages;
  subtitle: InputLanguages;
  instructions: InstructionItem[];
  tooltip_two: InputLanguages;
}

/**
 * Seção de CTA Padrão (Cta_one)
 */
export interface SectionCtaOne {
  id: number;
  icon_tab: string;
  tooltip: InputLanguages;
  title: InputLanguages;
  subtitle: InputLanguages;
  itens: ItemCta[];
  button: ButtonInfo;
  video: VideoItem;
}

/**
 * Seção de Esportes (Infos)
 */
export interface SectionSports {
  id: number;
  tooltip: InputLanguages;
  title: InputLanguages;
  sports: SectionCtaOne[];
}

/**
 * Seção de CTA Simples (Cta_two)
 */
export interface SectionCtaSimple {
  id: number;
  tooltip: InputLanguages;
  title: InputLanguages;
  cards: CardCtaSimple[];
  button_section_cta_simple: ButtonInfo;
}

/**
 * Seção de Download do App (Cta_three)
 */
export interface SectionDownloadApp {
  id: number;
  title: InputLanguages;
  subtitle: InputLanguages;
}

/**
 * Modelo Raiz da Página Inicial (Single Type)
 */
export interface HomePageModel {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  banner_home_page: BannerHomePage;
  section_instructions: SectionInstructions;
  section_cta: SectionCtaOne;
  section_sports: SectionSports;
  section_cta_simple: SectionCtaSimple;
  section_download_app: SectionDownloadApp;
}
