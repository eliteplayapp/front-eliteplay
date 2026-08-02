import { InputLanguages } from "../types/strapi.home.model";

/**
 * Retorna a tradução correta com base no idioma selecionado.
 * Suporta tanto texto direto (string dos arquivos JSON locais) quanto objetos legados (InputLanguages).
 * @param input Texto direto (string) ou objeto contendo traduções (InputLanguages)
 * @param lang Código do idioma ('pt-br', 'es', 'en')
 * @returns Texto traduzido
 */
export function getTranslation(input: string | InputLanguages | any | undefined, lang: string = "es"): string {
  if (!input) return "";

  if (typeof input === "string") {
    return input;
  }

  const normalizedLang = (lang || "es").toLowerCase();

  switch (normalizedLang) {
    case "pt-br":
    case "pt":
      return input.language_pt || input.language_es || "";
    case "en":
      return input.language_en || input.language_es || input.language_pt || "";
    case "es":
    default:
      return input.language_es || input.language_pt || "";
  }
}
