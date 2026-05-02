import { InputLanguages } from "../types/strapi.home.model";

/**
 * Retorna a tradução correta com base no idioma selecionado.
 * @param input Objeto contendo as traduções (InputLanguages)
 * @param lang Código do idioma ('pt-br', 'es', 'en')
 * @returns Texto traduzido ou o padrão (pt-br)
 */
export function getTranslation(input: InputLanguages | undefined, lang: string): string {
  if (!input) return "";

  switch (lang) {
    case "es":
      return input.language_es || input.language_pt;
    case "en":
      return input.language_en || input.language_pt;
    default:
      return input.language_pt;
  }
}
