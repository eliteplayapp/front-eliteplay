export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: StrapiMediaFormat;
      small?: StrapiMediaFormat;
      medium?: StrapiMediaFormat;
      large?: StrapiMediaFormat;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiInputLanguages {
  id: number;
  language_es: string;
  language_pt: string;
  language_en?: string;
}

export interface StrapiButtonCtaHeader {
  id: number;
  text_button: StrapiInputLanguages;
  link: string;
}

export interface StrapiContatoFooter {
  id: number;
  email: string;
  telefone: string;
}

export interface StrapiMenuFooter {
  id: number;
  title: StrapiInputLanguages;
  link: string;
}

export interface StrapiFooter {
  id: number;
  description: StrapiInputLanguages;
  links?: StrapiMenuFooter[];
  contato?: StrapiContatoFooter;
}

export interface StrapiHeader {
  id: number;
  menu_header: StrapiButtonCtaHeader[];
  button_cta_header: StrapiButtonCtaHeader;
}

export interface StrapiRedesSociais {
  id: number;
  link_instagram?: string;
  link_facebook?: string;
  link_twiter?: string;
  link_linkedin?: string;
}

export interface StrapiLinksDownloadApp {
  id: number;
  link_google_play?: string;
  link_apple_store?: string;
}

export interface StrapiSectionBannerOne {
  id: number;
  imgs_banner: StrapiMedia[];
  description_banner: StrapiInputLanguages;
}

export interface StrapiSectionBannerTwoArenas {
  id: number;
  image: StrapiMedia;
  tooltip_one: StrapiInputLanguages;
  title: StrapiInputLanguages[];
  subtitle?: StrapiInputLanguages[];
  button_cta_banner: StrapiButtonCtaHeader;
  tooltip_two: StrapiInputLanguages[];
}

export interface StrapiSectionCtaCardSimple {
  id: number;
  icon_tooltip: string;
  text_tooltip_one?: StrapiInputLanguages;
  title_card: StrapiInputLanguages;
  subtitle_card: StrapiInputLanguages;
}

export interface StrapiSectionCtaItens {
  id: number;
  icon?: string;
  item: StrapiInputLanguages;
}

export interface StrapiSectionCtaVideo {
  id: number;
  link?: string;
  conteudo: StrapiMedia;
}

export interface StrapiSectionCtaOne {
  id: number;
  tooltip?: StrapiInputLanguages;
  titulo: StrapiInputLanguages;
  subtitle: StrapiInputLanguages;
  itens: StrapiSectionCtaItens[];
  button_section_cta?: StrapiButtonCtaHeader;
  video: StrapiSectionCtaVideo;
}

export interface StrapiSectionCtaTwo {
  id: number;
  tooltip: StrapiInputLanguages;
  title: StrapiInputLanguages;
  cards: StrapiSectionCtaCardSimple[];
  button_section_cta_simple: StrapiButtonCtaHeader;
}

export interface StrapiSectionCtaThree {
  id: number;
  title: StrapiInputLanguages;
  subtitle?: StrapiInputLanguages;
}

export interface StrapiSectionCategoryInfos {
  id: number;
  tooltip: StrapiInputLanguages;
  title: StrapiInputLanguages;
  sports: StrapiSectionCtaOne[];
}

export interface StrapiSectionInstructionInstructions {
  id: number;
  img_instruction: StrapiMedia;
  icon: string;
  title_card?: StrapiInputLanguages;
  subtitle_card?: StrapiInputLanguages;
}

export interface StrapiSectionInstructionInfos {
  id: number;
  tooltip_one: StrapiInputLanguages;
  title: StrapiInputLanguages;
  subtitle: StrapiInputLanguages;
  instructions: StrapiSectionInstructionInstructions[];
  tooltip_two: StrapiInputLanguages;
}

export interface StrapiSectionPageArenasCardsImpact {
  id: number;
  metric: StrapiInputLanguages;
  category: StrapiInputLanguages;
  outcome: StrapiInputLanguages;
}

export interface StrapiSectionPageArenasCardsStep {
  id: number;
  icon?: string;
  title: StrapiInputLanguages;
  subtitle: StrapiInputLanguages;
}

export interface StrapiSectionPageArenasComparativeCards {
  id: number;
  image: StrapiMedia;
  icon?: string;
  title: StrapiInputLanguages;
  itens?: StrapiSectionCtaItens[];
}

export interface StrapiSectionPageArenasComparative {
  id: number;
  tooltip: StrapiInputLanguages;
  title: StrapiInputLanguages[];
  cards: StrapiSectionPageArenasComparativeCards[];
}

export interface StrapiSectionPageArenasDifferential {
  id: number;
  tooltip: StrapiInputLanguages;
  title: StrapiInputLanguages;
  cards?: StrapiSectionPageArenasCardsStep[];
}

export interface StrapiSectionPageArenasImpact {
  id: number;
  image: StrapiMedia;
  tooltip: StrapiInputLanguages;
  title: StrapiInputLanguages;
  subtitle: StrapiInputLanguages;
  button_section_impact?: StrapiButtonCtaHeader;
  cards?: StrapiSectionPageArenasCardsImpact[];
}

export interface StrapiSectionPageArenasInstallation {
  id: number;
  tooltip: StrapiInputLanguages[];
  title: StrapiInputLanguages;
  subtitle?: StrapiInputLanguages;
  cards: StrapiSectionPageArenasCardsStep[];
  image: StrapiMedia;
}

export interface StrapiSectionPageArenasItensFaq {
  id: number;
  question: StrapiInputLanguages;
  answer: StrapiInputLanguages;
}

export interface StrapiSectionPageArenasItensPartners {
  id: number;
  icon: string;
  item: StrapiInputLanguages;
  subitem: StrapiInputLanguages;
}

export interface StrapiSectionPageArenasFaq {
  id: number;
  title: StrapiInputLanguages;
  subtitle?: StrapiInputLanguages;
  itens: StrapiSectionPageArenasItensFaq[];
}

export interface StrapiSectionPageArenasPartners {
  id: number;
  tooltip: StrapiInputLanguages;
  title: StrapiInputLanguages;
  subtitle?: StrapiInputLanguages;
  itens: StrapiSectionPageArenasItensPartners[];
}
