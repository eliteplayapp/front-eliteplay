import type { InputLanguages, StrapiMedia } from "./strapi.home.model";

// ─── Re-export para conveniência ─────────────────────────────────────────────
export type { InputLanguages, StrapiMedia };

// ─── Componente Button_info ───────────────────────────────────────────────────

export interface ButtonInfo {
  id: number;
  link: string;
  text_button: InputLanguages;
}

// ─── Componente Header ────────────────────────────────────────────────────────

export interface StrapiHeader {
  id: number;
  menu_header: ButtonInfo[];
  button_cta_header: ButtonInfo;
}

// ─── Componente Contato_footer ────────────────────────────────────────────────

export interface ContatoFooter {
  id: number;
  email: string;
  telefone: string;
}

// ─── Componente Menu_footer ───────────────────────────────────────────────────

export interface MenuFooter {
  id: number;
  link: string;
  title: InputLanguages;
}

// ─── Componente Redes_sociais ─────────────────────────────────────────────────

export interface RedesSociais {
  link_instagram?: string;
  link_facebook?: string;
  link_twiter?: string;
  link_linkedin?: string;
}

// ─── Componente Footer ────────────────────────────────────────────────────────

export interface StrapiFooter {
  id: number;
  description: InputLanguages;
  links?: MenuFooter[];
  contato?: ContatoFooter;
  redes_sociais?: RedesSociais[];
}

// ─── Modelo Raiz do Single Type Global ───────────────────────────────────────

export interface GlobalModel {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  meta_description: string;
  logo_global: StrapiMedia;
  header: StrapiHeader;
  footer: StrapiFooter;
}
