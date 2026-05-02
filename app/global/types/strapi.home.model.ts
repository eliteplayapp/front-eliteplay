// ─── Primitivo compartilhado ────────────────────────────────────────────────

/** Componente Input_languages: texto multilíngue */
export interface InputLanguages {
  language_es: string;
  language_pt: string;
  language_en?: string;
}

/** Mídia do Strapi (imagem ou vídeo) */
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  mime?: string;
}

// ─── Componentes Atômicos ────────────────────────────────────────────────────

/** Componente Button_info */
export interface ButtonInfo {
  text_button: InputLanguages;
  link: string;
}

/** Componente Video */
export interface VideoComponent {
  link?: string;
  conteudo: StrapiMedia;
}

/** Componente Itens (item de lista dentro de Cta_one) */
export interface CtaItem {
  icon?: string;
  item: InputLanguages;
}

// ─── Seção Banner (Section_banner_one) ──────────────────────────────────────

/** Componente Instructions (repetível) */
export interface Instruction {
  img_instruction: StrapiMedia;
  icon: string;
  title_card?: InputLanguages;
  subtitle_card?: InputLanguages;
}

/** Componente Infos — usado em section_instructions e section_sports */
export interface SectionInstructions {
  tooltip_one: InputLanguages;
  title: InputLanguages;
  subtitle: InputLanguages;
  instructions: Instruction[];
  tooltip_two: InputLanguages;
}

/** Componente Section_banner_one */
export interface BannerHomePage {
  imgs_banner: StrapiMedia[];
  description_banner: InputLanguages;
  section_instructions: SectionInstructions;
}

// ─── Seção CTA Principal (Cta_one) ──────────────────────────────────────────

/** Componente Cta_one */
export interface CtaOne {
  tooltip?: InputLanguages;
  titulo: InputLanguages;
  subtitle: InputLanguages;
  itens: CtaItem[];
  button_section_cta?: ButtonInfo;
  video: VideoComponent;
}

// ─── Seção Esportes (section_sports → Infos com sports: Cta_one[]) ──────────

export interface SectionSports {
  tooltip: InputLanguages;
  title: InputLanguages;
  sports: CtaOne[];
}

// ─── Seção CTA Simples (Cta_two) ─────────────────────────────────────────────

/** Componente Card_cta_simple (repetível) */
export interface CardCtaSimple {
  icon_tooltip: string;
  text_tooltip_one?: InputLanguages;
  title_card: InputLanguages;
  subtitle_card: InputLanguages;
}

/** Componente Cta_two */
export interface CtaTwo {
  tooltip: InputLanguages;
  title: InputLanguages;
  cards: CardCtaSimple[];
  button_section_cta_simple?: ButtonInfo;
}

// ─── Seção Download App (Cta_three) ──────────────────────────────────────────

/** Componente Cta_three */
export interface CtaThree {
  title: InputLanguages;
  subtitle?: InputLanguages;
}

// ─── Modelo Raiz da Home Page ─────────────────────────────────────────────────

export interface HomePageModel {
  banner_home_page: BannerHomePage;
  section_cta: CtaOne;
  section_sports: SectionSports;
  section_cta_simple: CtaTwo;
  section_download_app: CtaThree;
}
