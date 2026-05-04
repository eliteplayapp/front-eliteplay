import type { InputLanguages, StrapiMedia, ButtonInfo } from "./strapi.home.model";

// ─── Componentes reutilizáveis ────────────────────────────────────────────────

/**
 * Card de passo (Cards_step) — usado em section_installation e section_differential
 */
export interface CardStep {
  id: number;
  icon?: string;
  title: InputLanguages;
  subtitle: InputLanguages;
}

/**
 * Item de lista simples (Itens) — usado dentro de Cards_comparative
 */
export interface ItemList {
  id: number;
  icon?: string;
  item: InputLanguages;
}

/**
 * Card comparativo (Cards_comparative)
 */
export interface CardComparative {
  id: number;
  image: StrapiMedia;
  icon?: string;
  title: InputLanguages;
  itens?: ItemList[];
}

/**
 * Card de impacto com métricas (Cards_impact)
 */
export interface CardImpact {
  id: number;
  metric: InputLanguages;
  category: InputLanguages;
  outcome: InputLanguages;
}

/**
 * Item de parceiro (Itens_partners)
 */
export interface ItemPartner {
  id: number;
  icon: string;
  item: InputLanguages;
  subitem: InputLanguages;
}

/**
 * Item de FAQ (Itens_faq)
 */
export interface ItemFaq {
  id: number;
  question: InputLanguages;
  answer: InputLanguages;
}

// ─── Seções da página de Arenas ───────────────────────────────────────────────

/**
 * Banner principal da página de Arenas (Section_banner_two-arenas)
 */
export interface BannerArenas {
  id: number;
  image: StrapiMedia;
  tooltip_one: InputLanguages;
  title: InputLanguages;
  subtitle?: InputLanguages | null;
  button_cta_banner: ButtonInfo;
  tooltip_two: InputLanguages;
}

/**
 * Seção de instalação / onboarding (Section_installation)
 */
export interface SectionInstallation {
  id: number;
  tooltip: InputLanguages;
  title: InputLanguages;
  subtitle?: InputLanguages | null;
  cards: CardStep[];
  image: StrapiMedia;
}

/**
 * Seção comparativa (Section_comparative)
 */
export interface SectionComparative {
  id: number;
  tooltip: InputLanguages;
  title: InputLanguages;
  cards: CardComparative[];
}

/**
 * Seção de diferenciais (Section_differential)
 */
export interface SectionDifferential {
  id: number;
  tooltip: InputLanguages;
  title: InputLanguages;
  cards?: CardStep[];
}

/**
 * Seção de impacto / métricas (Section_impact)
 */
export interface SectionImpact {
  id: number;
  image: StrapiMedia;
  tooltip: InputLanguages;
  title: InputLanguages;
  subtitle: InputLanguages;
  button_section_impact?: ButtonInfo | null;
  cards?: CardImpact[];
}

/**
 * Seção de parceiros / benefícios (Section_partners)
 */
export interface SectionPartners {
  id: number;
  tooltip: InputLanguages;
  title: InputLanguages;
  subtitle?: InputLanguages | null;
  itens: ItemPartner[];
}

/**
 * Seção de perguntas frequentes (Section_faq)
 */
export interface SectionFaq {
  id: number;
  title: InputLanguages;
  subtitle?: InputLanguages | null;
  itens: ItemFaq[];
}

// ─── Modelo raiz da página de Arenas (Single Type) ────────────────────────────

export interface ArenasPageModel {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  banner: BannerArenas;
  section_installation: SectionInstallation;
  section_comparative: SectionComparative;
  section_differential: SectionDifferential;
  section_impact: SectionImpact;
  section_partners: SectionPartners;
  section_faq: SectionFaq;
}
