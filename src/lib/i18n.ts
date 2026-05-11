import { InputLanguages } from "../types/strapi.home.model";

/**
 * Retorna a tradução correta com base no idioma selecionado.
 * @param input Objeto contendo as traduções (InputLanguages)
 * @param lang Código do idioma ('pt-br', 'es', 'en')
 * @returns Texto traduzido ou o padrão (es)
 */
export function getTranslation(input: InputLanguages | undefined, lang: string): string {
  if (!input) return "";

  switch (lang) {
    case "pt-br":
      return input.language_pt || input.language_es || "";
    case "en":
      return input.language_en || input.language_es || input.language_pt || "";
    case "es":
    default:
      return input.language_es || input.language_pt || "";
  }
}
